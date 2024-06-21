const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Simulación de almacenamiento en memoria
let stakeholders = {};

// Ruta para registrar un stakeholder
app.post('/registerStakeholder', (req, res) => {
  const { wallet, stakeholderType, info } = req.body;
  if (!wallet || stakeholders[wallet]) {
    return res.status(400).json({ error: 'Stakeholder ya registrado' });
  }
  stakeholders[wallet] = { stakeholderType, info };
  res.status(200).json({ message: 'Stakeholder registrado exitosamente' });
});

// Ruta para verificar si un stakeholder está registrado
app.get('/isStakeholderRegistered/:wallet', (req, res) => {
  const { wallet } = req.params;
  if (!wallet || !stakeholders[wallet]) {
    return res.status(200).json({ registered: false });
  }
  res.status(200).json({ registered: true, stakeholder: stakeholders[wallet] });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
