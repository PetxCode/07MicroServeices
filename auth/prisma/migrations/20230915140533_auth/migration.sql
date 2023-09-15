/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `authModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "authModel_email_key" ON "authModel"("email");
