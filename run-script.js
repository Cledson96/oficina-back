const fs = require('fs');
const { execSync } = require('child_process');

// Função para executar os comandos shell
const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

// Executa o script para popular o banco (node seed.js)
runCommand('node seeds/seed.js');

// Executa a migração com o Prisma (npx prisma migrate dev)
runCommand('npx prisma migrate dev --name atualizacao');

// Gera os arquivos do Prisma (npx prisma generate)
runCommand('npx prisma generate');


