const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./src/config/db');
const jugadoresRoutes = require('./src/routes/jugadores');

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/jugadores', jugadoresRoutes);

async function start() {
  let retries = 10;

  while (retries > 0) {
    try {
      await pool.query('SELECT 1');
      console.log('Conexión a la base de datos establecida');
      break;
    } catch (err) {
      retries--;
      console.log(`Esperando base de datos... (${retries} intentos restantes)`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  if (retries === 0) {
    console.error('No se pudo conectar a la base de datos');
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
  });
}

start();
