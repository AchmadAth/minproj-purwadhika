/*
  Warnings:

  - The values [ADMIN] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[refcode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refcode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `point` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `refcode` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('USER', 'ORGANIZER') NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX `User_refcode_key` ON `User`(`refcode`);
