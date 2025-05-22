import uuid

from app.models.core.mongo.base import BaseMongoModel


class PrivateCommunicatorMessageModel(BaseMongoModel):
    content: str                # message content
    sender_id: uuid.UUID        # sender agent id
    receiver_id: uuid.UUID      # receiver agent id


