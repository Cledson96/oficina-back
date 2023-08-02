/*
  Warnings:

  - Added the required column `juros` to the `vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_total` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendas" ADD COLUMN     "juros" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valor_total" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "rastreio" DROP NOT NULL;
