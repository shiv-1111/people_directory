from . import bcrypt
from flask_jwt_extended import get_jwt_identity
from .models import Person
from . import db

def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

def check_password(hashed_password, password):
    return bcrypt.check_password_hash(hashed_password, password)

def get_current_user():
    user_id = get_jwt_identity()
    return db.session.get(Person, user_id)

# to check whether user is admin, return type will be booleam
def is_admin(user):
    person = Person.query.filter_by(id=user.id).first()
    return person is not None and person.role == "admin"

def check_email(email):
    return Person.query.filter_by(email=email).first()

def return_user_by_email(email):
    return Person.query.filter_by(email=email).first()