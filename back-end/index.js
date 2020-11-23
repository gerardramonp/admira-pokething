const express = require("express");
const bodyParser = require("body-parser");
const debug = require("debug")("app");
const mongoose = require("mongoose");

const PokeModel = require("./src/models/pokeModel");
const pokeRouter = require("./src/routes/pokeRouter")(PokeModel);

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/pokedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes config
app.use("/api/pokemons", pokeRouter);

app.listen(port, () => {
    debug(`Server running in port: ${port}`);
});
