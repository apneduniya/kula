from agno.playground import Playground

from app.agent.workflows.chat import get_chat_workflow


chat_workflow = get_chat_workflow(debug_mode=True)

# Create a playground instance
playground = Playground(
    workflows=[
        chat_workflow
    ]
)

# Get the router for the playground
playground_router = playground.get_async_router()


