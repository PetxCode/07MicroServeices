/*
  Warnings:

  - You are about to drop the column `reply` on the `postModel` table. All the data in the column will be lost.
  - Added the required column `userID` to the `postModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "postModel" DROP COLUMN "reply",
ADD COLUMN     "userID" TEXT NOT NULL;
