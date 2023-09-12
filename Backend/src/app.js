import express from "express";
import cors from "cors";

import {productsRouter} from "./routes/products.routes.js";
import {cartsRouter} from "./routes/carts.routes.js";

// crear puerto donde se ejecuta el servidor
const port = 8080;

// instanciar Express
const app = express();

// poner a escuchar el servidor en el puerto
app.listen(port, () => console.log(`Servidor ejeuctandose en el puerto ${port}`));

// definir caracteres especiales a través de la ruta (query params)
app.use(express.urlencoded({extended:true}));

app.use(cors());

// routes => "/api/xxx" es el patron de la ruta que se repite en cada router
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)


























// console.log(ProductManagerFiles)
// console.log(operations)

// const managerProductService = new ProductManagerFiles("./src/files/products.json");
// console.log(managerProductService)

// const port = 8282;
// const app = express();

// app.use(cors());
// app.use(express.json())

// app.listen(port, () => console.log("Servidor Funcionando"));

// // rutas del servidor
// app.get("/products", async (req, res) => {
//     try {
//         const { limit } = req.query;
//         const limitNumber = parseInt(limit);
//         const products = await managerProductService.getProducts();
//         if (limit) {
//             // [1,2,3,4] => slice [1,2,3]
//             const productsLimit = products.slice(0, limitNumber);
//             res.send(productsLimit);
//         } else {
//             res.send(products);
//         }
//     } catch (error) {
//         res.send(error.message);
//     }
// })

// app.get("/products/:productId", async (req, res) => {
//     try {
//         const productsId = parseInt(req.params.productId);
//         const getProductById = await managerProductService.getProductById(productsId);
//         res.send(getProductById)
//     } catch (error) {
//         response.send(error.message)
//     }
// });

