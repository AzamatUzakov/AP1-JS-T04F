-- CreateTable
CREATE TABLE "TicTacToeGameOnline" (
    "id" TEXT NOT NULL,
    "playerX" TEXT NOT NULL,
    "playerO" TEXT,
    "board" TEXT NOT NULL DEFAULT '[null,null,null,null,null,null,null,null,null]',
    "current" TEXT NOT NULL DEFAULT 'X',
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "winner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicTacToeGameOnline_pkey" PRIMARY KEY ("id")
);
