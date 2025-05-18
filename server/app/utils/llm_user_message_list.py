import typing as t

from app.schemas.repository.chat import ChatSchema
from app.schemas.repository.message import MessageSchema


def get_llm_user_message_list(chat_schema: ChatSchema) -> t.List[t.Dict[str, t.Any]] | None:
    """
    Get the list of messages from ChatOrm for using it as a list of messages for LLM class.
    """
    chat_messages: t.List[MessageSchema] = chat_schema.messages
    llm_user_message_list: t.List[t.Dict[str, t.Any]] = []

    for message in chat_messages:
        if message.is_from_user:
            llm_user_message_list.append({"role": "user", "content": message.content})
        else:
            llm_user_message_list.append({"role": "assistant", "content": message.content})

    return llm_user_message_list if llm_user_message_list else None


