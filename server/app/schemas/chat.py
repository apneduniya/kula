import typing as t
import uuid

from pydantic import BaseModel


class RequestCreateNewChat(BaseModel):
    user_id: int
    title: str

class ResponseCreateNewChat(BaseModel):
    chat_id: uuid.UUID


