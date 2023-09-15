-- CreateTable
CREATE TABLE "postModel" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "reply" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postModel_pkey" PRIMARY KEY ("id")
);
