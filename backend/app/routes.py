from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from . import db
from .models import Person
from .schemas import RegisterSchema, LoginSchema
from .auth import *

# creating a flask blueprint objct for routes
api = Blueprint('api', __name__)

# registration route
@api.route('/register', methods=['POST'])
def register():
    schema = RegisterSchema()
    data = schema.load(request.json) # this will throw 400 incase data isn't as per validation requirements
    
    # first() method returns the first matching row, if none found it will return "None"
    if Person.query.filter_by(email=data['email']).first():
        return jsonify(message='Email id already exists!'), 409
    
    person = Person(
        # note to self- in python we can either write data['name'] or, data.get('name')
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        password=hash_password(data['password']),
        # if role will not be provided it will default to "user", like option chaining in js
        role=data.get("role", "user"),
        city=data.get("city", "")
    )
    
    db.session.add(person)
    # until we commit, all the changes will be in memory only, we can do a single commit after multiple add
    db.session.commit()
    return jsonify("User successfully registerd!"), 201

# login route
@api.route('/login', methods=['POST'])
def login():
    schema = LoginSchema
    data = schema.load(request.json)

    person = Person.query.filter_by(email=data['email']).first()
    if not person or not check_password(person.password, data['password']):
        return jsonify('Invalid credentials!'), 401
    #create jwt token and return the same to client
    token = create_access_token
    return jsonify(access_token=token), 200


# USER APIs

# get user/own details
@api.route('/me',methods=['GET'])
@jwt_required()
def get_me():
    user = get_current_user()
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "city": user.city
    })
    
#update user/own details
@api.route('/me', methods=['PUT'])
@jwt_required()
def update_me():
    user = get_current_user()
    data = request.json
    # update field if data available otherwise keep it as it is
    user.name = data.get('name', user.name)
    user.phone = data.get("phone", user.phone)
    user.city = data.get("city", user.city)
    # Note to self- we are not including user.role so that user can not elevate its own role
    db.session.commit()
    return jsonify(message="Updated"), 200


# ADMIN ONLY APIs

# get details of all users
@api.route('/people', methods=['GET'])
@jwt_required()
def get_all_people():
    user = get_current_user()
    if not is_admin(user):
        return jsonify("Admins only!"), 403
    
    people = Person.query.all()
    return jsonify([
        {"id":p.id, "name":p.name, "email":p.email, "city":p.city}
        for p in people
    ])
    

# get, update, or delete any user by ID
@api.route("/person/<int:id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def handle_person_by_id(id):
    user = get_current_user()
    if not is_admin(user):
        return jsonify(message="Admins only"), 403

    person = Person.query.get_or_404(id)

    if request.method == "GET":
        return jsonify({
            "id": person.id,
            "name": person.name,
            "email": person.email,
            "phone": person.phone,
            "city": person.city,
            "age": person.age,
            "dob": person.dob,
            "photo_url": person.photo_url,
            "role": person.role
        })

    elif request.method == "PUT":
        data = request.json
        person.name = data.get("name", person.name)
        person.phone = data.get("phone", person.phone)
        person.city = data.get("city", person.city)
        person.age = data.get("age", person.age)
        person.dob = data.get("dob", person.dob)
        person.photo_url = data.get("photo_url", person.photo_url)
        person.role = data.get("role", person.role)
        db.session.commit()
        return jsonify(message="User updated"), 200

    elif request.method == "DELETE":
        db.session.delete(person)
        db.session.commit()
        return jsonify(message="User deleted"), 200

    