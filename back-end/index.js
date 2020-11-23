const express = require("express");
const bodyParser = require("body-parser");
const debug = require("debug")("app");

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    debug(`Server running in port: ${port}`);
});
