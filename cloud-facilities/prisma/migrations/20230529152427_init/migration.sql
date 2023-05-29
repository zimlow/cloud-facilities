-- CreateTable
CREATE TABLE `Destinations` (
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `destination_highlights` VARCHAR(191) NOT NULL,
    `destination_image` JSON NOT NULL,

    UNIQUE INDEX `Destinations_city_key`(`city`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
