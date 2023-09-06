import fs from "fs";

export class ProductManagerFiles {
    constructor(filePath) {
        this.filePath = filePath;
    }

    fileExist() {
        return fs.existsSync(this.filePath);
    }

    async addProduct(productInfo) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJson = JSON.parse(contenido);

                const existingProduct = contenidoJson.find(product => product.code === productInfo.code);
                if (existingProduct) {
                    console.log("Ya existe un producto con este código");
                    return;
                } else {
                    let newId = 1;
                    if (contenidoJson.length > 0) {
                        newId = contenidoJson[contenidoJson.length - 1].id + 1
                    }
                    productInfo.id = newId;
                    contenidoJson.push(productInfo);
                    await fs.promises.writeFile(this.filePath, JSON.stringify(contenidoJson, null, "\t"));
                    console.log("Producto agregado")
                    // await fs.promises.unlink(this.filePath);
                }
            } else {
                throw new Error("No es posible guardar el archivo")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

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
        const manager = new ProductManagerMemory("../products.json");

        await manager.addProduct({
            title: "Metamorfosis",
            description: "El ciclo de la vida en un cuarteto visual.",
            price: 2500,
            thumbnail: null,
            code: "PROD_0001",
            stock: 1
        });
        await manager.addProduct({
            title: "Vidrio Soleado",
            description: "El vidiro del sol reunido en un mismo lugar.",
            price: 2500,
            thumbnail: null,
            code: "PROD_0002",
            stock: 1
        });

        // get all products form array
        const products = await manager.getProducts();
        console.log("Productos: \n", products);

        // find product by Id
        await manager.getProductById(3);

        // update product
        await manager.updateProduct(2, {
            title: "Ola Sarmiento",
            description: "lalaland",
            price: 3000
        });

        // delete product
        await manager.deleteProduct(4);

    } catch (error) {
        console.log(error.message);
    }
}
operations();





