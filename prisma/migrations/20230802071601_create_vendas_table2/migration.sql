/*
  Warnings:

  - Added the required column `promocao` to the `produtos_vendidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos_vendidos" ADD COLUMN     "promocao" TEXT NOT NULL;
