import express, { response } from "express";
import cors from "cors";
import { ProductManagerFiles, operations } from "./persistence/productManagerFiles.js";

console.log(ProductManagerFiles)
console.log(operations)

const managerProductService = new ProductManagerFiles("./src/files/products.json");
console.log(managerProductService)

const port = 8080;
const app = express();

app.use(cors());

app.listen(port, () => console.log("Servidor Funcionando"));

// rutas del servidor
app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;
        const limitNumber = parseInt(limit);
        const products = await managerProductService.getProducts();
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
})

app.get("/products/:productId", async (req, res) => {
    try {
        const productsId = parseInt(req.params.productId);
        const getProductById = await managerProductService.getProductById(productsId);
        res.send(getProductById)
    } catch (error) {
        response.send(error.message)
    }
});