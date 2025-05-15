import typing as t
import uuid

from pydantic import BaseModel
from app.schemas.repository.message import MessageSchema


class RequestSendMessage(BaseModel):
    content: str
    # type: str = "text"
    # media: t.Optional[str] = None


class ResponseSendMessage(BaseModel):
    messages: t.List[MessageSchema]



