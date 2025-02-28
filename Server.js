const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/marketplace', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  contactNumber: String,
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// API Endpoints
app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.send(item);
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.send(item);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});