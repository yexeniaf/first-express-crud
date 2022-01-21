import express from "express";
import logger from "morgan";
import products  from "./products/products.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger("dev"));

// Home Route
app.get("/products", (req, res) => {
    res.json(products)
}) 

// Show Route
app.get("/products/:id", (req, res) => {
	// console.log(req.params);
	const id = req.params.id;
	const product = products.find(product => product._id === id);
	res.json(product);
})

// Posting 
app.post("/products", (req, res) => {
    // console.log(req.body);
	const product = req.body;
	product.price = `$${req.body.price}`;
	// console.log(product);
	products.push(product);
	res.json(products);
})

// Updating a product

app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex(product => product._id === id);

    const updatePorduct = {
        ...products[productIndex], 
        _id: req.body._id,
        name: req.body.name,
        imgURL: req.body.imgURL,
        price: req.body.price
    };
    
    products.splice(productIndex, 1, updatePorduct);
    res.json(updatePorduct);
})

// Deleting  a product

app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
	const productIndex = products.findIndex(product => product._id === id);

	const deletedProduct = products.find(p => p._id === id);
	console.log(deletedProduct);

	products.splice(productIndex, 1);
	res.json(products);
})


app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
});