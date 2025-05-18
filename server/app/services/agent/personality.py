from app.services.agent.core.base import IPersonalityFactory
from app.services.core.llm import LLM


class LLMPersonalityFactory(IPersonalityFactory):
    """Creates a personality based on the agent's proposal"""

    def __init__(self, llm: LLM):
        self.llm = llm

    def create_personality(self, proposal: str) -> str:
        return "I'm a child agent"


