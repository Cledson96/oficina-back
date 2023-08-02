-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255),
    "phone" TEXT NOT NULL,
    "phonecontact" DECIMAL,
    "cpf" TEXT,
    "password" TEXT NOT NULL,
    "cep" TEXT,
    "payment" TEXT,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos" (
    "id" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "caminho" TEXT NOT NULL,

    CONSTRAINT "fotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "data_compra" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "compra" JSONB,
    "preferencia" TEXT,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "marca" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "vendidos" INTEGER DEFAULT 0,
    "codigo" TEXT,
    "preco" TEXT NOT NULL,
    "promocao" TEXT DEFAULT 0,
    "foto" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "peso" TEXT,
    "altura" INTEGER,
    "largura" INTEGER,
    "profundidade" INTEGER,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" SERIAL NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cliente_id" INTEGER NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" SERIAL NOT NULL,
    "valor_produto" DOUBLE PRECISION NOT NULL,
    "valor_frete" DOUBLE PRECISION NOT NULL,
    "comprovante" TEXT NOT NULL,
    "data_venda" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" INTEGER NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "tipo_pagamento" TEXT NOT NULL,
    "rastreio" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "parcelas" INTEGER,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos_vendidos" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "venda_id" INTEGER NOT NULL,
    "marca" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "produtos_vendidos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_vendidos" ADD CONSTRAINT "produtos_vendidos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
