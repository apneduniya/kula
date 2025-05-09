import typing as t
from pydantic import BaseModel


class RequestSaveMessage(BaseModel):
    chat_id: int
    user_id: int
    username: t.Optional[str] = None
    message_id: int
    message_content: str
    chat_type: str
    media: t.Optional[str] = None


