class ProductManager {
    #impuestoIVA = 0.21
    constructor() {
        this.products = [];
    };

    getProducts() {
        console.log(this.products)
    };

    addProduct(title, description, price, thumbail, code, stock) {
        if (!title || !description || !price || !thumbail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            console.log("Ya existe un producto con este código");
            return;
        }

        let newId;
        if (this.products.length == 0) {
            newId = 1
        } else {
            newId = this.products[this.products.length - 1].id + 1
        }
        const newProduct = {
            id: newId,
            title,
            description,
            price: price * (1 + this.#impuestoIVA),
            thumbail,
            code,
            stock
        }
        this.products.push(newProduct);
    };

    getProductById(idProduct) {
        const productFind = this.products.find(product => product.id === idProduct);
        if (!productFind) {
            console.log("Producto no encontrado:\n",productFind);
        } else {
            console.log("Producto encontrado:\n", productFind);
        }
    };
};

const productManager = new ProductManager();

productManager.addProduct("Metamorfosis", "El ciclo de la vida en un cuarteto visual.", 2500, "backend-desafios-clase2/assets/images/Captura de pantalla 2023-08-22 a la(s) 16.23.35.png", "PROD_0001", 1);
productManager.addProduct("Vidrio Soleado", "El vidiro del sol reunido en un mismo lugar.", 2500, "backend-desafios-clase2/assets/images/Captura de pantalla 2023-08-22 a la(s) 16.23.35.png", "PROD_0002", 1);
productManager.getProducts();

productManager.getProductById(2);
productManager.getProductById(3);

