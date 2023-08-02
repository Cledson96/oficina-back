-- AlterTable
ALTER TABLE "produtos" ALTER COLUMN "promocao" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "produtos_vendidos" ADD CONSTRAINT "produtos_vendidos_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
