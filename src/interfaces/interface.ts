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
export interface EnvioFrete {
  from: {
    postal_code: string;
  };
  to: {
    postal_code: string;
  };
  products: ProdutoFrete[];
}

export interface ProdutoFrete {
  id: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  insurance_value: number;
  quantity: number;
}

export interface Cliente {
  info: {
    id: number;
    name: string;
    price: string;
    custom_price: string;
    discount: string;
    currency: string;
    delivery_time: number;
    delivery_range: { min: number; max: number };
    custom_delivery_time: number;
    custom_delivery_range: { min: number; max: number };
    packages: {
      price: string;
      discount: string;
      format: string;
      dimensions: { height: number; width: number; length: number };
      weight: string;
      insurance_value: string;
      products: { id: string; quantity: number }[];
    }[];
    additional_services: {
      receipt: boolean;
      own_hand: boolean;
      collect: boolean;
    };
    company: {
      id: number;
      name: string;
      picture: string;
    };
    endereco: {
      logradouro: string;
      numero: string;
      complemento: string;
      bairro: string;
      cidade: string;
      estado: string;
      cep: string;
    };
    produtos: {
      id: number;
      categoria_id: number;
      marca: string;
      qtd: number;
      vendidos: number;
      codigo: string;
      preco: string;
      promocao: string;
      foto: string;
      descricao: string;
      nome: string;
      peso: string;
      altura: number;
      largura: number;
      profundidade: number;
      categoria: string;
      quantidade: number;
    }[];
    valorProdutos: number;
  };
  cliente: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    contato: string;
    cpf: string;
  };
}
export interface Envio {
  items: {
    [key: string]: any;
  }[];
  payer: {
    name: string;
    surname: string;
    email: string;
    address: {
      [key: string]: any;
    };
  };
  back_urls: {
    success: string;
    failure: string;
  };
  auto_return: "approved" | "all" | undefined;
  external_reference: string;
}

export function isValidProduct(produto: any): produto is produtoBody {
  return (
    (produto &&
      typeof produto.nome === "string" &&
      typeof produto.categoria_id === "number" &&
      typeof produto.categoria === "string" &&
      typeof produto.foto === "string" &&
      typeof produto.id === "number" &&
      typeof produto.marca === "string" &&
      typeof produto.qtd === "number" &&
      typeof produto.vendidos === "number" &&
      typeof produto.codigo === "string" &&
      typeof produto.preco === "number") ||
    ("string" && typeof produto.promocao === "number") ||
    ("string" &&
      typeof produto.descricao === "string" &&
      typeof produto.altura === "number" &&
      typeof produto.largura === "number" &&
      typeof produto.peso === "number") ||
    ("string" &&
      typeof produto.profundidade === "number" &&
      typeof produto.quantidade === "number")
  );
}
