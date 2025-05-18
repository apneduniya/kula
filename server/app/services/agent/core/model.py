from app.services.agent.core.base import ICommunicator


class AgentModel:
    """Holds agent metadata."""
    def __init__(self, agent_id: str, personality: str, communicator: ICommunicator):
        self.agent_id = agent_id
        self.personality = personality
        self.communicator = communicator


