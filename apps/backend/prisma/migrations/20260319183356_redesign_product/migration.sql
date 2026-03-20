/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
ADD COLUMN     "battery" TEXT,
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "camera" TEXT,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "chip" TEXT,
ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "connectivity" TEXT,
ADD COLUMN     "display" TEXT,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "ram" TEXT,
ADD COLUMN     "storage" TEXT,
ADD COLUMN     "taglineLines" TEXT[],
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Product_id_seq";
