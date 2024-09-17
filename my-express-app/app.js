const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:8080'
}));

const items = [
  { id: 1, name: "Item 1", description: "Ma 1ere description", categorie: "Informatique"},
  { id: 2, name: "Item 2", description: "Ma 2e description", categorie: "Voiture"},
  { id: 3, name: "Item 3", description: "Ma 3e description", categorie: "Informatique"}
]

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/items', (req, res) => {
  res.json(items);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
