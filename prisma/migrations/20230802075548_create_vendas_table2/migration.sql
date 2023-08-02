/*
  Warnings:

  - The `promocao` column on the `produtos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `preco` on the `produtos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `preco` on the `produtos_vendidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `promocao` on the `produtos_vendidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "preco",
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL,
DROP COLUMN "promocao",
ADD COLUMN     "promocao" DOUBLE PRECISION DEFAULT 0;

-- AlterTable
ALTER TABLE "produtos_vendidos" DROP COLUMN "preco",
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL,
DROP COLUMN "promocao",
ADD COLUMN     "promocao" DOUBLE PRECISION NOT NULL;
