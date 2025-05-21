from composio_agno import Action

from app.agent.tools.base import composio_toolset


research_tools = composio_toolset.get_tools(actions=[
    Action.COMPOSIO_SEARCH_TAVILY_SEARCH,
    # Action.PERPLEXITYAI_PERPLEXITY_AI_SEARCH,
])
