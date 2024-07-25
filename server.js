const express = require('express');
// const mongoose = require('mongoose');
const sql = require('mssql');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const transInfo = require('./routes/transInfoRoute');
const transWalletInfo = require('./routes/transWalletInforoute');
const sellAndBuy = require('./routes/BuyAndSellRoute');
const butterfactoryinfoRoute = require('./routes/butterfactoryinfoRoute')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 1300;



const config = {
  user: process.env.USER, // Database username
  password: process.env.PSWRD, // Database password
  server: process.env.SERVER, // SQL Server instance name
  database: process.env.DATABASE, // Database name
  options: {
    encrypt: true, // Set to true if you need encryption
    trustServerCertificate: true // Set to true if using self-signed certificates
  }
};


sql.connect(config).then(pool => {
  if (pool.connected) {
    console.log('Connected to MSSQL');
  }
}).catch(err => {
  console.error('Connection error', err);
  process.exit();
});


// mongoose.connect(process.env.MONGO_URI).then((res) => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Connection error', err);
//   process.exit();
// });

app.use(cors({
  credentials: true,
  origin: 'http://45.55.97.152:1000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes)
app.use('/transinfo', transInfo);
app.use('/transwalletinfo', transWalletInfo)
app.use('/butterfactoryinfo', butterfactoryinfoRoute)
app.use('/buyandsell', sellAndBuy)




app.listen(PORT, () => {

  console.log(`Server is running on port ${1300}`);
});
