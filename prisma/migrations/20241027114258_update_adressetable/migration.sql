/*
  Warnings:

  - You are about to drop the column `lineOne` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `lineTwo` on the `address` table. All the data in the column will be lost.
  - Added the required column `street` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `lineOne`,
    DROP COLUMN `lineTwo`,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;
