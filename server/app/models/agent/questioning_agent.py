import typing as t

from pydantic import BaseModel


class QuestioningAgentResponseModel(BaseModel):
    is_asking_question: bool
    question: t.Optional[str]


