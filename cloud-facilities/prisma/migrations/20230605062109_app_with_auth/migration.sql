/*
  Warnings:

  - You are about to drop the column `CVV` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `card_no` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `expiry_month` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `expiry_year` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `name_on_card` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the `UserPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contact_value]` on the table `UserContacts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_activity_fkey";

-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_city_fkey";

-- DropForeignKey
ALTER TABLE "UserContacts" DROP CONSTRAINT "UserContacts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_user_id_fkey";

-- DropIndex
DROP INDEX "Bookings_trip_id_key";

-- DropIndex
DROP INDEX "Bookings_user_id_key";

-- DropIndex
DROP INDEX "UserContacts_user_id_key";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "CVV",
DROP COLUMN "card_no",
DROP COLUMN "expiry_month",
DROP COLUMN "expiry_year",
DROP COLUMN "name_on_card";

-- AlterTable
ALTER TABLE "Trips" ALTER COLUMN "activity" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- DropTable
DROP TABLE "UserPayment";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredUsers" (
    "user_id" TEXT NOT NULL,
    "user_lastName" TEXT NOT NULL,
    "user_firstName" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_hash" TEXT NOT NULL,
    "user_dob" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "user_country" TEXT NOT NULL,
    "user_postal_code" TEXT NOT NULL,
    "user_passport_no" TEXT NOT NULL,
    "user_image" TEXT,
    "user_emailVerified" TIMESTAMP(3),
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegisteredUsers_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredUsers_user_email_key" ON "RegisteredUsers"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredUsers_user_passport_no_key" ON "RegisteredUsers"("user_passport_no");

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredUsers_providerId_providerAccountId_key" ON "RegisteredUsers"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "UserContacts_contact_value_key" ON "UserContacts"("contact_value");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "RegisteredUsers"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_activity_fkey" FOREIGN KEY ("activity") REFERENCES "TripType"("activity") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_city_fkey" FOREIGN KEY ("city") REFERENCES "Destinations"("city") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("trip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "RegisteredUsers"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "RegisteredUsers"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
