CREATE TABLE "clients" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(100) NOT NULL,
"address" VARCHAR(255),
"phone" TEXT NOT NULL,
"phonecontact" NUMERIC ,
"cpf" TEXT,
"password" TEXT NOT NULL,
"cep" TEXT ,
"payment" TEXT NOT NULL,
"email" VARCHAR(255) NOT NULL
);

CREATE TABLE "sessions" (
"id" SERIAL PRIMARY KEY,
"clientId" INTEGER NOT NULL REFERENCES "clients"("id"),
"name" VARCHAR(100) NOT NULL,
"token" TEXT NOT NULL
);
