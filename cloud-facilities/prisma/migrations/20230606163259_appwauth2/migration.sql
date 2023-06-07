/*
  Warnings:

  - You are about to drop the column `providerAccountId` on the `RegisteredUsers` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `RegisteredUsers` table. All the data in the column will be lost.
  - You are about to drop the column `providerType` on the `RegisteredUsers` table. All the data in the column will be lost.
  - You are about to drop the column `user_emailVerified` on the `RegisteredUsers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "RegisteredUsers_providerId_providerAccountId_key";

-- AlterTable
ALTER TABLE "RegisteredUsers" DROP COLUMN "providerAccountId",
DROP COLUMN "providerId",
DROP COLUMN "providerType",
DROP COLUMN "user_emailVerified";
