/*
  Warnings:

  - Made the column `token` on table `passwordreset` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `passwordreset` MODIFY `token` VARCHAR(191) NOT NULL;
