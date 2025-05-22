import typing as t
from bson import ObjectId
from datetime import datetime

from pydantic import BaseModel, Field


class MongoModel(BaseModel):
    id: t.Optional[str] = str(ObjectId())


class PyObjectId(ObjectId):
    """MongoDB stores data as BSON. FastAPI encodes and decodes data as JSON strings. 
    BSON has support for additional non-JSON-native data types, 
    including ObjectId which can't be directly encoded as JSON. 
    Because of this, we convert ObjectIds to strings before storing them as the _id.
    """
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class BaseMongoModel(BaseModel):
    """
    Base model for all MongoDB models.
    """
    id: PyObjectId
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}



