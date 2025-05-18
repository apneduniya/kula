from abc import ABC, abstractmethod


class IPersonalityFactory(ABC):
    """Factory for creating agent personalities."""
    @abstractmethod
    def create_personality(self, proposal: str) -> str:
        pass


class ICommunicator(ABC):
    """Defines send/receive for inter-agent messaging."""
    @abstractmethod
    async def send(self, to_agent: str, message: dict):
        pass

    @abstractmethod
    async def receive(self) -> dict:
        pass