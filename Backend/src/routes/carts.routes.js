import express, { Router } from 'express';
import { cartsService } from '../persistence/index.js';

const router = Router();

// recibir información de las peticiones en formato JSON
router.use(express.json());

// esta ruta debe mostrar los carritos
router.get("/", async(req,res)=>{
    try {
        const carts = await cartsService.getCarts();
        res.json({data:carts});
    } catch (error) {
        res.json({error:error.message});
    }
});

// esta ruta debe listar los productos que pertenezcan al carrito con el paramtro cid proporcionados => http://localhost:8080/api/carts/:cid
router.get("/:cid", async (req, res) => {
    try {
        const carts = await cartsService.getCarts();
        res.json({ data: carts });
    } catch (error) {
        ;
    }
});

// esta ruta debera crear un nuevo carrito con los campos Id y products 
router.post("/", async (req, res) => {
    try {
        const cartCreated = await cartsService.createCart();
        res.json({ data: cartCreated });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// esta ruta debera agrgear el producto al arreglo "products" del carrito seleccionado bajo el formato: product y quantity
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.cid);

        const log = await cartsService.addProductInCart(cartId, productId);
        console.log(log);
    } catch (error) {
        res.json({ error: error.message });
    }
});

export { router as cartsRouter };