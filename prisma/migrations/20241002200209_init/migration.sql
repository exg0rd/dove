/*
  Warnings:

  - You are about to drop the column `completed` on the `todoTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todoTask" DROP COLUMN "completed",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'not started';
