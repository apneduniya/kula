-- CreateTable
CREATE TABLE "_agentTodecision" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_agentTodecision_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_agentTodecision_B_index" ON "_agentTodecision"("B");

-- AddForeignKey
ALTER TABLE "_agentTodecision" ADD CONSTRAINT "_agentTodecision_A_fkey" FOREIGN KEY ("A") REFERENCES "agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_agentTodecision" ADD CONSTRAINT "_agentTodecision_B_fkey" FOREIGN KEY ("B") REFERENCES "decision"("id") ON DELETE CASCADE ON UPDATE CASCADE;
