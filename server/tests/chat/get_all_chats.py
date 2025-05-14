from app.schemas.core.pageable import PageRequestSchema
from app.schemas.repository.chat import ChatSchema

from app.repositories.chat import ChatRepository


pageable = PageRequestSchema(page=1, size=10)


async def main():
    chat_repo = ChatRepository()
    chats, total = await chat_repo.get_paged_items(pageable, {})

    for chat in chats:
        chat_schema = ChatSchema.model_validate(chat)
        print(chat_schema)


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
