const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const cors = require('cors');

const PokeModel = require('./src/models/pokeModel');
const pokeRouter = require('./src/routes/pokeRouter')(PokeModel);

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://admin:admin@admira-pokecluster.yxysw.mongodb.net/pokedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

// Routes config
app.use('/api/pokemons', pokeRouter);

app.listen(port, () => {
  debug(`Server running in port: ${port}`);
});
