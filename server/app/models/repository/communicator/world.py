import uuid

from app.models.core.mongo.base import BaseMongoModel


class WorldCommunicatorMessageModel(BaseMongoModel):
    content: str                # message content
    sender_id: uuid.UUID        # sender agent id


