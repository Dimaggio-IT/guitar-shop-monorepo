/*
  Warnings:

  - You are about to drop the column `Price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `StringCount` on the `products` table. All the data in the column will be lost.
  - Added the required column `string_count` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "Price",
DROP COLUMN "StringCount",
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "string_count" INTEGER NOT NULL;
