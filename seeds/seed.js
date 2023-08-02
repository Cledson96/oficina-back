const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function seed() {
  try {
    const clients = await prisma.clients.findMany();
    const categoria = await prisma.categoria.findMany();
    const fotos = await prisma.fotos.findMany();
    const produtos = await prisma.produtos.findMany();
    const pagamentos = await prisma.pagamento.findMany();
    const sessions = await prisma.sessions.findMany();
    const enderecos = await prisma.enderecos.findMany();
    const vendas = await prisma.vendas.findMany();
    const produtos_vendidos = await prisma.produtos_vendidos.findMany();

    const data = {
      clients,
      categoria,
      produtos,
      fotos,
      sessions,
      enderecos,
      vendas,
      pagamentos,
      produtos_vendidos
    };
    
    fs.writeFileSync('seeds/data-seed.json', JSON.stringify(data, null, 2));

    console.log('Dados extraídos e salvos em data-seed.json.');
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
