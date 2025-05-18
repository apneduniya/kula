from app.repositories.message import MessageRepository
from app.schemas.repository.message import MessageSchema


class MessageService:
    """
    Service class for handling message-related operations in the application.
    """
    def __init__(self):
        """Initialize the MessageService with a MessageRepository instance."""
        self.message_repository: MessageRepository = MessageRepository()

    async def save_message(self, message: MessageSchema) -> MessageSchema:
        """Save a message to the database"""
        message_orm = message.to_orm()
        result = await self.message_repository.save(message_orm)
        return MessageSchema.model_validate(result)
