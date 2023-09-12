import express, { Router } from 'express';
import { productService } from '../persistence/index.js';

const router = Router();

// recibir información de las peticiones en formato JSON
router.use(express.json());

// esta ruta debe listar todos los productos de la base (incluyendo la limitacion ?limit) => http://localhost:8080/api/products
router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const limitNumber = parseInt(limit);
        const products = await productService.getProducts();
        if (limit) {
            // [1,2,3,4] => slice [1,2,3]
            const productsLimit = products.slice(0, limitNumber);
            res.send(productsLimit);
        } else {
            res.send(products);
        }
    } catch (error) {
        res.send(error.message);
    }
});

// esta ruta debe traer solo el producto con el id proporcionado
router.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const getProductsById = await productService.getProductsById(productId);

        res.send(getProductsById);
    } catch (error) {
        res.send(error.message);
    }
});

// esta ruta debe agregar un nuevo producto con los campos obligatorios (id, title, description, code, price, status=true, stock, category, thumbnail)
router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        await productService.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock);
        res.json({ "Producto Agregado": newProduct });
    } catch (error) {
        res.send(error.message);
    }
});

// esta ruta tomar un producto y actualizarlo por los campos enviados desde el body
router.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const putProduct = req.body;
        await productService.updateProduct(productId, putProduct.title, putProduct.description, putProduct.price, putProduct.thumbnail, putProduct.code, putProduct.stock)
        res.json({ "Producto Actualizado": putProduct });
    } catch (error) {
        res.send(error.message);
    }
});

// esta ruta debera eliminar el producto con el pid indicado
router.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productService.deleteProduct(productId);
    } catch (error) {
        res.send(error.message);
    }
});

export { router as productsRouter };







