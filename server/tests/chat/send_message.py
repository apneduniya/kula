import asyncio
import uuid
import aiohttp
import json
from typing import AsyncGenerator


USER_ID = 1111111

CHAT_TITLE = "Test Chat"
CHAT_ID = None


async def stream_response(response) -> AsyncGenerator[str, None]:
    """Helper function to stream the response"""
    async for line in response.content:
        if line:
            yield line.decode('utf-8').strip()

async def chat_with_agent(chat_id: uuid.UUID, message: str):
    """Function to send a message and stream the response"""
    async with aiohttp.ClientSession() as session:
        # Send the message
        print(f"\nYou: {message}")
        
        async with session.post(
            f"http://localhost:8000/chat/{chat_id}/send-message",
            json={"content": message},
            headers={"Accept": "text/event-stream"}
        ) as response:
            print("\nAgent: ", end="", flush=True)
            async for chunk in stream_response(response):
                if chunk:
                    print(chunk, end="", flush=True)
            print("\n")

async def main():
    chat_id = CHAT_ID or None

    # First create a new chat if needed
    if not chat_id:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "http://localhost:8000/chat/new",
                json={"user_id": USER_ID, "title": CHAT_TITLE}
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    chat_id = data["data"]["chat_id"]
                    print(f"Created new chat with ID: {chat_id}")
                else:
                    print("Failed to create chat")
                    return

    # Example chat interaction
    messages = ["I am a twitter intern at Superteam (you can search about superteam). I am planning to tweet - Solana is best forever. Tell me whether my twitter audience will find it good or not."]

    for message in messages:
        await chat_with_agent(chat_id, message)
        # Add a small delay between messages
        await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(main())
