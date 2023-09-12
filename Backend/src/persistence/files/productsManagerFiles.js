import fs from "fs";

export class ProductsManagerFiles {
    constructor(filePath) {
        this.filePath = filePath;
    }

    // existe el archivo?
    fileExist() {
        return fs.existsSync(this.filePath);
    }

    // metodo agregar producto
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf8");
                const contenidoJsonEnString = JSON.parse(contenido);

                if (!title || !description || !price || !stock || !thumbnail || !code) {
                    return console.log("Todos los campos son obligatorios")
                } else {
                    let idProduct;
                    contenidoJsonEnString.length === 0 ? idProduct = 1 : idProduct = contenidoJsonEnString.length + 1

                    const codeExists = contenidoJsonEnString.find((item) => item.code === code);
                    if (codeExists) {
                        return console.log(`No se puede crear el producto "${title}". Ya existe un producto con el código ingresado`);
                    } else {
                        const newProduct = {
                            idProduct,
                            title,
                            description,
                            price,
                            thumbnail,
                            code,
                            stock
                        };
                        contenidoJsonEnString.push(newProduct);
                        console.log(`El producto ${newProduct.title} ha sido agregado`);

                        await fs.promises.writeFile(this.filePath, JSON.stringify(contenidoJsonEnString, null, "\t"));
                        console.log("Producto agregado");
                    };
                };
            };
        } catch (error) {
            throw new Error("No es posible guardar el producto")
        };
    };

    // metodo obtener productos
    async getProducts() {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                return contenidoJson;
            } else {
                throw new Error("No es posible leer el archivo")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // metodo obtener producto por id
    async getProductById(idProduct) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                const findProduct = contenidoJson.find(product => product.id === idProduct);
                if (findProduct) {
                    console.log("Producto encontrado:\n", findProduct);
                } else {
                    console.log("Producto que buscas no encontrado.");
                    return null;
                }
            } else {
                throw new Error('El archivo no existe.');
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // metodo actualizar producto
    async updateProduct(idProduct, productInfo) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJson = JSON.parse(contenido);

                const productIndex = contenidoJson.findIndex(product => product.id === idProduct)

                if (productIndex === -1) {
                    return console.log("Producto no encontrado")
                }
                if (productInfo.id) {
                    return console.log("No puede modificar el Id")
                }
                contenidoJson[productIndex] = { ...contenidoJson[productIndex], ...productInfo }
                const productString = JSON.stringify(contenidoJson, null, "\t");
                await fs.promises.writeFile(this.filePath, productString);
                return console.log("Producto actualizado correctamente");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // metodo eliminar producto
    async deleteProduct(idProduct) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJson = JSON.parse(contenido);

                const indexToDelete = contenidoJson.findIndex(product => product.id === idProduct);

                if (indexToDelete !== -1) {
                    contenidoJson.splice(indexToDelete, 1);
                    await fs.promises.writeFile(this.filePath, JSON.stringify(contenidoJson, null, "\t"));
                    console.log(`Producto con ID ${idProduct} eliminado.`);
                } else {
                    console.log("Producto que deseas eliminar no encontrado.");
                    return null;
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
};

export const operations = async () => {
    try {
        const manager = new ProductsManagerFiles("../products.json");

        await manager.addProduct({
            title: "Metamorfosis",
            description: "El ciclo de la vida en un cuarteto visual.",
            price: 2500,
            thumbnail: null,
            code: "PROD_0001",
            stock: 1
        });
        
        const products = await manager.getProducts();
        console.log("Productos: \n", products);

        await manager.getProductById(3);

        await manager.updateProduct(2, {
            title: "Ola Sarmiento",
            description: "lalaland",
            price: 3000
        });

        await manager.deleteProduct(4);

    } catch (error) {
        console.log(error.message);
    }
}
operations();





