const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

app.use(bodyParser.json());

const pool = new Pool({
  host: 'localhost',
  port: 10000,
  database: 'usuariodb',
  user: 'postgres',
  password: '123',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

app.post('/usuario', async (req, res) => {

  const client = await pool.connect()

  try {
    const { id, nome, senha } = req.body;

    const queryText = 'INSERT INTO usuario (id, nome, senha) VALUES ($1, $2, $3)';
    const responsedb = await client.query(queryText, [id, nome, senha])

    await client.query('COMMIT')

    res.json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    await client.query('ROLLBACK')
    res.status(500).send(err.message);
  } finally {
    client.release()
  }
});

app.get('/usuario', async (_, res) => {

  const client = await pool.connect()

  try {
      const result = await client.query('SELECT * from usuario')
      res.send(result.rows);
  } catch (err) {
      res.status(500).send(err.message);
  } finally {
    client.release()
  }
});

app.get('/usuario/:id', async (req, res) => {

  const client = await pool.connect()

  try {
      const result = await client.query('SELECT * FROM usuario WHERE id = $1', [req.params.id])
      res.send(result.rows);
  } catch (err) {
      res.status(500).send(err.message);
  } finally {
    client.release()
  }
});

app.delete('/usuario/:id', async (req, res) => {

  const client = await pool.connect()

  try {
      await client.query('DELETE FROM usuario WHERE id = $1', [req.params.id])
      res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
      res.status(500).send(err.message);
  } finally {
    client.release()
  }
});

app.put('/usuario/:id', async (req, res) => {

  const client = await pool.connect()

  try {

      await client.query('UPDATE usuario SET nome = $1, senha = $2 WHERE id = $3', [req.body.nome, req.body.senha, req.params.id])
      res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
      res.status(500).send(err.message);
  } finally {
    client.release()
  }
});

app.listen(3000, () => {});