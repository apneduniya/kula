import asyncio
from app.services.agent.core.base import ICommunicator


# TODO: replaceable with Kafka/RabbitMQ
class PubSubCommunicator(ICommunicator):
    """In-memory pub/sub"""
    _topics = {}

    def __init__(self, topic: str):
        self.topic = topic
        PubSubCommunicator._topics.setdefault(topic, asyncio.Queue())

    async def send(self, to_agent: str, message: dict):
        await PubSubCommunicator._topics[to_agent].put(message)

    async def receive(self) -> dict:
        return await PubSubCommunicator._topics[self.topic].get()
