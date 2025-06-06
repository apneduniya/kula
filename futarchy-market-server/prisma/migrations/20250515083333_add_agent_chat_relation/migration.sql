-- CreateTable
CREATE TABLE "decision" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "isResolved" BOOLEAN,
    "passPrice" DOUBLE PRECISION,
    "failPrice" DOUBLE PRECISION,
    "chatId" INTEGER,

    CONSTRAINT "decision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "createdAt" DATE,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT,
    "personality" TEXT,
    "encryptedKeypair" TEXT,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
