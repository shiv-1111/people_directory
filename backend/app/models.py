from . import db
from datetime import datetime

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    address = db.Column(db.String(200))
    city = db.Column(db.String(50))
    age = db.Column(db.Integer)
    dob = db.Column(db.String(20))
    photo_url = db.Column(db.String(255))

    password = db.Column(db.String(255), nullable=False)
    # 'admin' or 'user'
    role = db.Column(db.String(10), default='user')

    created_at = db.Column(db.DateTime, default=datetime.now(datetime.timezone.utc))
