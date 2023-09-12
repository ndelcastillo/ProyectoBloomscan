import fs from "fs";

export class CartsManagerFiles {
    constructor(filePath) {
        this.filePath = filePath;
    }

    // existe el archivo?
    fileExist() {
        return fs.existsSync(this.filePath);
    }

    // metodo obtener carritos
    async getCarts() {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const carts = JSON.parse(contenido);
                return carts;
            } else {
                throw new Error("No es posible leer el archivo")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // metodo crear carrito
    async createCart() {
        try {
            if (this.fileExist()) {
                const contenidoString = await fs.promises.readFile(this.filePath, "utf-8");
                const carts = JSON.parse(contenidoString);

                let idCart;
                carts.length === 0 ? idCart = 1 : idCart = carts.length + 1

                const newCart = {
                    idCart,
                    products: []
                };
                carts.push(newCart);

                await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));
                return newCart;
            } else {
                throw new Error("No es posible leer el carrito")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // metodo obtener carrito por ID
    async getCartById(idCart) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJsonEnString = JSON.parse(contenido);

                const idExists = contenidoJsonEnString.find((item) => item.idCart === idCart);
                if (idExists) {
                    return `${JSON.stringify(idExists, null, 2)}`;
                } else {
                    return `Not Found`;
                };
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };

    // metodo agregar producto al carrito
    async addProductInCart(cartId, productId) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const carts = JSON.parse(contenido);

                const cart = carts.find((item) => item.idCart === cartId);
                if (cart) {
                    const existingProduct = cart.products.find((product) => product.idProduct === productId);
                    if (existingProduct) {
                        // incrementar la cantidad del producto
                        existingProduct.quantity += 1;
                        console.log("Aumemta la cantidad 1 vez");
                    } else {
                        // agregar un nuevo producto al carrito
                        const newProduct = {
                            idProduct: productId,
                            quantity: 1,
                        };
                        cart.products.push(newProduct);
                    }
                    // escribir los cambios en el archivo
                    await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));
                    return `Se agregó el producto al carrito ${cartId}`;
                } else {
                    return `No se encontró el carrito con el ID ${cartId}`;
                }
            } else {
                throw new Error("No se pudo agregar el producto al carrito");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };
}