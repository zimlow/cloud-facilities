-- CreateEnum
CREATE TYPE "Activity" AS ENUM ('SKYDIVE', 'SNOWSLOPES', 'SCUBADIVING');

-- CreateEnum
CREATE TYPE "Contacts" AS ENUM ('MOBILE', 'HOME', 'OFFICE_NO');

-- CreateTable
CREATE TABLE "Destinations" (
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "destination_highlights" TEXT[],
    "destination_image" JSONB[]
);

-- CreateTable
CREATE TABLE "Trips" (
    "trip_id" TEXT NOT NULL,
    "activity" "Activity" NOT NULL,
    "trip_date" TIMESTAMP(3) NOT NULL,
    "trip_availability" INTEGER NOT NULL,
    "trip_itinerary" TEXT[],
    "trip_inclusions" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "TripType" (
    "activity" "Activity" NOT NULL
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "trip_accommo" TEXT NOT NULL,
    "accommo_highlights" TEXT[],
    "accommo_pics" JSONB[],
    "trip_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_lastName" TEXT NOT NULL,
    "user_firstName" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_dob" TIMESTAMP(3) NOT NULL,
    "user_address" TEXT NOT NULL,
    "user_passport_no" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "booking_reference" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserContacts" (
    "user_id" TEXT NOT NULL,
    "contact_value" TEXT NOT NULL,
    "contact_type" "Contacts" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Destinations_city_key" ON "Destinations"("city");

-- CreateIndex
CREATE UNIQUE INDEX "TripType_activity_key" ON "TripType"("activity");

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_trip_id_key" ON "Accommodation"("trip_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_lastName_key" ON "Users"("user_lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_firstName_key" ON "Users"("user_firstName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_email_key" ON "Users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_passport_no_key" ON "Users"("user_passport_no");

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_booking_reference_key" ON "Bookings"("booking_reference");

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_trip_id_key" ON "Bookings"("trip_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_user_id_key" ON "Bookings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserContacts_user_id_key" ON "UserContacts"("user_id");

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_activity_fkey" FOREIGN KEY ("activity") REFERENCES "TripType"("activity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_city_fkey" FOREIGN KEY ("city") REFERENCES "Destinations"("city") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trips"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
