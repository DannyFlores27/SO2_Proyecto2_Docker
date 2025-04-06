const express = require('express');
const { createClient } = require('@clickhouse/client');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const client = createClient({
  url: 'http://clickhouse:8123',
  username: 'admin',
  password: 'admin123',
});

async function initDB() {
  await client.command({
    query: `
      CREATE TABLE IF NOT EXISTS mydatabase.usuarios (
        id UInt32,
        nombre String,
        correo String
      ) ENGINE = MergeTree()
      ORDER BY id
    `
  });
}
initDB();

app.get('/usuarios', async (req, res) => {
  try {
    const result = await client.query({
      query: 'SELECT * FROM mydatabase.usuarios',
      format: 'JSONEachRow',
    });
    const data = await result.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query({
      query: `SELECT * FROM mydatabase.usuarios WHERE id = ${id}`,
      format: 'JSONEachRow',
    });
    const data = await result.json();
    res.json(data[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/usuarios', async (req, res) => {
  const { id, nombre, correo } = req.body;
  try {
    await client.insert({
      table: 'mydatabase.usuarios',
      values: [{ id, nombre, correo }],
      format: 'JSONEachRow',
    });
    res.json({ mensaje: 'Usuario creado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  try {
    await client.command({ query: `ALTER TABLE mydatabase.usuarios DELETE WHERE id = ${id}` });
    await client.insert({
      table: 'mydatabase.usuarios',
      values: [{ id: parseInt(id), nombre, correo }],
      format: 'JSONEachRow',
    });
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.command({ query: `ALTER TABLE mydatabase.usuarios DELETE WHERE id = ${id}` });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
