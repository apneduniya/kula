import { PrismaClient } from "../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { title, chatId } = await req.json();

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

    if (!chatId) {
      return NextResponse.json(
        { error: "ChatId is required" },
        { status: 400 }
      );
    }
    
    // Convert chatId to number if it's a string
    const numericChatId = typeof chatId === 'string' ? parseInt(chatId, 10) : chatId;

    const decision = await prisma.decision.create({
      data: {
        title,
        chatId: numericChatId,
        isResolved: false,
        passPrice: null,
        failPrice: null,
      },
    });

    return NextResponse.json(decision, { status: 201 });
  } catch (error) {
    console.error("Error creating decision:", error);
    return NextResponse.json(
      { error: "Failed to create decision" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, isResolved, passPrice, failPrice } = await req.json();

    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: "Decision ID is required and must be a number" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    
    if (typeof isResolved === 'boolean') {
      updateData.isResolved = isResolved;
    }
    
    if (passPrice !== undefined) {
      updateData.passPrice = passPrice;
    }
    
    if (failPrice !== undefined) {
      updateData.failPrice = failPrice;
    }

    const decision = await prisma.decision.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(decision, { status: 200 });
  } catch (error) {
    console.error("Error updating decision:", error);
    return NextResponse.json(
      { error: "Failed to update decision" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const chatIdParam = url.searchParams.get('chatId');

    if (id) {
      const decision = await prisma.decision.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!decision) {
        return NextResponse.json(
          { error: "Decision not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(decision);
    } else if (chatIdParam) {
      // Convert chatId string to number for database query
      const numericChatId = parseInt(chatIdParam, 10);
      
      // If chatId is provided, return decisions for that chat
      const decisions = await prisma.decision.findMany({
        where: { chatId: numericChatId },
        orderBy: { id: 'desc' },
      });
      return NextResponse.json(decisions);
    } else {
      // Return all decisions if no filter is provided
      const decisions = await prisma.decision.findMany({
        orderBy: { id: 'desc' },
      });
      return NextResponse.json(decisions);
    }
  } catch (error) {
    console.error("Error fetching decisions:", error);
    return NextResponse.json(
      { error: "Failed to fetch decisions" },
      { status: 500 }
    );
  }
} 