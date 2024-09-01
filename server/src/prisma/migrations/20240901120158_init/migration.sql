/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isAdmin`,
    DROP COLUMN `password`,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL,
    ADD COLUMN `profilePicture` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'EDITOR', 'WRITER', 'READER') NOT NULL DEFAULT 'READER',
    ADD COLUMN `subscriptionPlan` ENUM('FREE', 'BASIC', 'PREMIUM') NULL DEFAULT 'FREE';
