/*
  Warnings:

  - You are about to drop the column `trip_date` on the `Trips` table. All the data in the column will be lost.
  - Added the required column `trip_end_date` to the `Trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_start_date` to the `Trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trips" DROP COLUMN "trip_date",
ADD COLUMN     "trip_end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "trip_start_date" TIMESTAMP(3) NOT NULL;
