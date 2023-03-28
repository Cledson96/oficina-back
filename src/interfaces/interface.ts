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

  export interface signInBody{
    email: string;
    password: string;
  }