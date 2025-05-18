import typing as t

from app.static.llm import OpenAIModel


LLMModelType = t.TypeVar("LLMModelType", bound=t.Union[OpenAIModel])


