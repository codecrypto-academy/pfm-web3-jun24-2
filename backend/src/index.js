const express = require("express");
const session = require("express-session");
const Web3 = require("web3");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Crear una instancia de Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_URL)
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Mock de base de datos de usuarios con roles
const usersDb = {
  "0xYourWalletAddress1": "donante",
  "0xYourWalletAddress2": "empresa",
  // Agregar más usuarios y roles según sea necesario
};

app.post("/connect_wallet", (req, res) => {
  const walletAddress = req.body.wallet_address;

  if (!web3.utils.isAddress(walletAddress)) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  req.session.walletAddress = walletAddress;

  // Verificar si el usuario está en la base de datos y obtener su rol
  const userRole = usersDb[walletAddress];

  if (!userRole) {
    return res.status(401).json({ error: "User not registered" });
  }

  // Redirigir según el rol del usuario
  if (userRole === "donante") {
    return res.redirect("/dashboard/donante");
  } else if (userRole === "empresa") {
    return res.redirect("/dashboard/empresa");
  } else {
    return res.status(400).json({ error: "Invalid user role" });
  }
});

app.get("/dashboard/:role", (req, res) => {
  const walletAddress = req.session.walletAddress;

  if (!walletAddress) {
    return res.status(401).json({ error: "No wallet connected" });
  }

  const role = req.params.role;

  if (!["donante", "empresa"].includes(role)) {
    return res.status(400).json({ error: "Invalid dashboard role" });
  }

  res.json({ message: `Welcome to the ${role} dashboard`, walletAddress });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
