/*
  Warnings:

  - You are about to drop the column `posts` on the `authModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authModel" DROP COLUMN "posts";
ALTER TABLE "authModel" ADD COLUMN     "myPosts" JSONB;
