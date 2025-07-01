from marshmallow import Schema, fields, validate

class RegisterSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True, validate=validate.Length(equal=10))
    password = fields.Str(required=True, validate=validate.Length(min=6))
    city = fields.Str()
    role = fields.Str(validate=validate.OneOf(["admin", "user"]))

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)
