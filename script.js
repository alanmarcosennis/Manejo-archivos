class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = this.generateId();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = new Product(title, description, price, thumbnail, code, stock);
    this.products.push(product);
    return product;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error('No se encontró ningún producto con el ID especificado.');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);
    Object.assign(product, updatedFields);
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('No se encontró ningún producto con el ID especificado.');
    }
    return this.products.splice(index, 1)[0];
  }
}

// Ejemplo de uso del script

const productManager = new ProductManager();

// Se llama a getProducts y se devuelve un arreglo vacío []
console.log(productManager.getProducts());

// Se llama a addProduct para agregar un producto
const addedProduct = productManager.addProduct(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
);
console.log('Producto agregado:', addedProduct);

// Se llama a getProducts nuevamente, esta vez debería aparecer el producto recién agregado
console.log(productManager.getProducts());

// Se llama a getProductById con el id del producto recién agregado
const foundProduct = productManager.getProductById(addedProduct.id);
console.log('Producto encontrado:', foundProduct);

// Se llama a updateProduct para cambiar el campo "description" del producto
const updatedProduct = productManager.updateProduct(addedProduct.id, { description: 'Nueva descripción' });
console.log('Producto actualizado:', updatedProduct);

// Se llama a deleteProduct para eliminar el producto
const deletedProduct = productManager.deleteProduct(addedProduct.id);
console.log('Producto eliminado:', deletedProduct);

// Se llama a getProductById nuevamente para corroborar que el producto se haya eliminado
productManager.getProductById(addedProduct.id); // Esto debería arrojar un error
