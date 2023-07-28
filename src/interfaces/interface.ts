export interface signUpBody {
  name: string;
  address: string;
  cep: number;
  password: string;
  phone: number;
  phonecontact: number;
  cpf: number;
  payment: string;
  email: string;
}

export interface signInBody {
  email: string;
  password: string;
}

export interface produtoBody {
  nome: string;
  categoria_id: number;
  categoria: string;
  foto: string;
  id: number;
  marca: string;
  qtd: number;
  vendidos: number;
  codigo: string;
  preco: number;
  promocao: number;
  descricao: string;
  altura: number;
  largura: number;
  peso: number;
  profundidade: number;
  quantidade: number;
}

export function isValidProduct(produto: any): produto is produtoBody {
  return (
    produto &&
    typeof produto.nome === "string" &&
    typeof produto.categoria_id === "number" &&
    typeof produto.categoria === "string" &&
    typeof produto.foto === "string" &&
    typeof produto.id === "number" &&
    typeof produto.marca === "string" &&
    typeof produto.qtd === "number" &&
    typeof produto.vendidos === "number" &&
    typeof produto.codigo === "string" &&
    typeof produto.preco === "number" || "string" &&
    typeof produto.promocao === "number" || "string" &&
    typeof produto.descricao === "string" &&
    typeof produto.altura === "number" &&
    typeof produto.largura === "number" &&
    typeof produto.peso === "number" || "string" &&
    typeof produto.profundidade === "number" &&
    typeof produto.quantidade === "number"
  );
}
