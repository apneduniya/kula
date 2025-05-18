import uuid

from app.core.logging import logger

from app.services.agent.core.base import IPersonalityFactory
from app.services.agent.communicator import PubSubCommunicator
from app.services.agent.core.model import AgentModel
from app.services.agent.child import ChildAgent


class MotherAgent:
    """Creates and manages child agents based on proposals."""
    def __init__(self, personality_factory: IPersonalityFactory):
        self.factory = personality_factory
        self.children = {}

    def create_child(self, proposal: str) -> ChildAgent:
        # Defining the personality, agent id and communicator (way to communicate with other agents)
        personality = self.factory.create_personality(proposal)
        agent_id = str(uuid.uuid4())
        communicator = PubSubCommunicator(topic=agent_id)

        # Creating the model - the model is the core of the agent
        # It contains the personality, the agent id and the communicator
        model = AgentModel(agent_id, personality, communicator)

        # Creating the child agent
        child = ChildAgent(model)
        self.children[agent_id] = child

        logger.info(f"Created {agent_id} as {personality}")
        return child

    async def broadcast(self, message: str):
        for aid, child in self.children.items(): # aid: agent id
            child: ChildAgent = child

            await child.model.communicator.send(aid, {
                'from': 'Mother',
                'body': message
            })
