export class Conversacion {
  nomEntrada: string;
  nomUsuario: string;
  emailEntrada: string;
  emailUsuario: string;
  mensajes: {
    texto:string,
    emisor:string,
    hora:Date
  }[];
  active: string;
}
