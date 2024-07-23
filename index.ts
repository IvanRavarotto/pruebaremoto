import { FileTextChanges } from "typescript";

class Producto {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getPrice() {
    return this.price;
  }
}

class ProductoAlimenticio extends Producto {
  fechaCaducidad: Date;
  constructor(name: string, price: number, fechaCaducidad: any) {
    super(name, price);
    this.fechaCaducidad = new Date(fechaCaducidad);
  }
  checkCaducidad(): boolean {
    return this.fechaCaducidad > new Date();
  }
}

class ProductoCongelado extends ProductoAlimenticio {
  temperaturaRecomendada: number;
  private margen: number = 5;
  constructor(
    name: string,
    price: number,
    fechaCaducidad: any,
    temperaturaRecomendada: number
  ) {
    super(name, price, fechaCaducidad);
    this.temperaturaRecomendada = temperaturaRecomendada;
  }

  estaAlmacenadoCorrectamente(temperaturaActual: number): boolean {
    let diferencia: number;
    if (this.temperaturaRecomendada < 0 || temperaturaActual < 0) {
      diferencia = (temperaturaActual*-1) + this.temperaturaRecomendada;
      if (diferencia > this.margen || diferencia < -5) {
        return false;
      } else {
        return true;
      }
    } else {
      diferencia = temperaturaActual - this.temperaturaRecomendada;
      if (diferencia > this.margen || diferencia < -5) {
        return false;
      } else {
        return true;
      }
    }
  }
}

function main() {
  // Creación de la instancia
  const pan = new ProductoAlimenticio("Pan Integral", 3.5, "2024-05-30");

  const estaVencido = pan.checkCaducidad();
  console.log("¿El producto está vencido?:", estaVencido ? "Sí" : "No");

  // Mostrar detalles del producto
  console.log("Nombre del Producto:", pan.name);
  console.log("Precio:", pan.getPrice());
  console.log("Fecha de Caducidad:", pan.fechaCaducidad);

  // Creación de la instancia
  const helado = new ProductoCongelado(
    "Helado de Vainilla",
    2.99,
    "2024-12-31",
    -18
  );

  // Temperatura actual de almacenamiento
  const temperaturaActual = -20; // Supongamos que esta es la temperatura actual

  // Verificar si el producto está almacenado correctamente
  const estaAlmacenadoCorrectamente =
    helado.estaAlmacenadoCorrectamente(temperaturaActual);
  console.log(
    "¿Está almacenado correctamente?:",
    estaAlmacenadoCorrectamente ? "Sí" : "No"
  );

  // Verificar si el producto está caducado
  const esCaducado = helado.checkCaducidad();
  console.log("¿El producto está caducado?:", esCaducado ? "Sí" : "No");

  // Mostrar detalles del producto
  console.log("Nombre del Producto:", helado.name);
  console.log("Precio:", helado.getPrice());
  console.log("Fecha de Caducidad:", helado.fechaCaducidad.toDateString());
  console.log(
    "Temperatura Recomendada:",
    helado.temperaturaRecomendada,
    "grados"
  );
}

main();
