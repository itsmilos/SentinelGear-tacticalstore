/*
  Warnings:

  - Added the required column `customerEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCountry` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPostal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingStreet` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ADD COLUMN     "shippingCity" TEXT NOT NULL,
ADD COLUMN     "shippingCountry" TEXT NOT NULL,
ADD COLUMN     "shippingPostal" TEXT NOT NULL,
ADD COLUMN     "shippingStreet" TEXT NOT NULL;
