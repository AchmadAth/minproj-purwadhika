/*
  Warnings:

  - You are about to drop the column `price` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `updaterAt` on the `event` table. All the data in the column will be lost.
  - Added the required column `priceType` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `price`,
    DROP COLUMN `updaterAt`,
    ADD COLUMN `priceIDR` VARCHAR(191) NULL,
    ADD COLUMN `priceType` ENUM('FREE', 'PAID') NOT NULL,
    ADD COLUMN `seats` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
