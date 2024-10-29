/*
  Warnings:

  - You are about to drop the column `productId` on the `order_events` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_events` DROP FOREIGN KEY `order_events_productId_fkey`;

-- AlterTable
ALTER TABLE `order_events` DROP COLUMN `productId`;
