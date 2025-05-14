import typing as t
import uuid
from datetime import datetime
from app.models.repository.message import MessageOrm
from app.schemas.core.base import BaseSchema
# from app.schemas.repository.chat import ChatSchema

class MessageSchema(BaseSchema):
    __orm__ = MessageOrm

    chat_id: uuid.UUID
    content: str
    type: str
    is_from_user: bool
    media: t.Optional[str] = None

    # chat: ChatSchema