/*
  Warnings:

  - The `trip_inclusions` column on the `Trips` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.
  - Added the required column `CVV` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_country` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_postal` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_no` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiry_month` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiry_year` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_no` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile_no` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_on_card` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passport_no` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `region` on the `Destinations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `trip_price` to the `Trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_title` to the `Trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_country` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_postal_code` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Regions" AS ENUM ('ASIA', 'EUROPE', 'AMERICAS', 'OCEANIA');

-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserContacts" DROP CONSTRAINT "UserContacts_user_id_fkey";

-- DropIndex
DROP INDEX "Users_user_firstName_key";

-- DropIndex
DROP INDEX "Users_user_lastName_key";

-- DropIndex
DROP INDEX "Users_username_key";

-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "CVV" INTEGER NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "address_country" TEXT NOT NULL,
ADD COLUMN     "address_postal" INTEGER NOT NULL,
ADD COLUMN     "card_no" BIGINT NOT NULL,
ADD COLUMN     "dob" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "expiry_month" INTEGER NOT NULL,
ADD COLUMN     "expiry_year" INTEGER NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "home_no" INTEGER NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "mobile_no" INTEGER NOT NULL,
ADD COLUMN     "name_on_card" TEXT NOT NULL,
ADD COLUMN     "passport_no" TEXT NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ADD CONSTRAINT "Bookings_pkey" PRIMARY KEY ("booking_reference");

-- AlterTable
ALTER TABLE "Destinations" DROP COLUMN "region",
ADD COLUMN     "region" "Regions" NOT NULL;

-- AlterTable
ALTER TABLE "TripType" ADD CONSTRAINT "TripType_pkey" PRIMARY KEY ("activity");

-- AlterTable
ALTER TABLE "Trips" ADD COLUMN     "trip_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "trip_title" TEXT NOT NULL,
DROP COLUMN "trip_inclusions",
ADD COLUMN     "trip_inclusions" TEXT[],
ALTER COLUMN "trip_end_date" SET DATA TYPE TEXT,
ALTER COLUMN "trip_start_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "username",
ADD COLUMN     "user_country" TEXT NOT NULL,
ADD COLUMN     "user_postal_code" INTEGER NOT NULL,
ALTER COLUMN "user_password" DROP NOT NULL,
ALTER COLUMN "user_dob" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "UserPayment" (
    "user_id" TEXT NOT NULL,
    "name_on_card" TEXT NOT NULL,
    "card_no" BIGINT NOT NULL,
    "expiry_month" INTEGER NOT NULL,
    "expiry_year" INTEGER NOT NULL,
    "cvv" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPayment_user_id_key" ON "UserPayment"("user_id");

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("trip_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("trip_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
