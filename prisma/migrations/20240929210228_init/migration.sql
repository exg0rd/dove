-- CreateTable
CREATE TABLE "todoTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,

    CONSTRAINT "todoTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todoTask" ADD CONSTRAINT "todoTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
