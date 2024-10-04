/*
  Warnings:

  - Made the column `publishedAt` on table `article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publishedAt` on table `video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `video` MODIFY `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
