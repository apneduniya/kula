from app.core.logging import logger
from app.services.agent.core.model import AgentModel


class ChildAgent:
    """Child agent that can be created by the mother."""
    def __init__(self, model: AgentModel):
        self.model = model
        self._running = False

    async def start(self):
        self._running = True
        logger.info(f"[{self.model.agent_id}] Started ({self.model.personality})")
        while self._running:
            msg = await self.model.communicator.receive()
            logger.info(f"[{self.model.agent_id}] Received: {msg}")
            # Simple echo response
            response = {'from': self.model.agent_id, 'body': f"Ack by {self.model.agent_id}"}
            await self.model.communicator.send(msg['from'], response)

    def stop(self):
        self._running = False


