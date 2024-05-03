import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/api/books', async (c) => {
  const { results } = await c.env.DB.prepare(`select * from books`).all();
  const a = 1;
  return c.json({
    data: results,
  });
});

app.get('/api/books/:id', async (c) => {
  const { results } = await c.env.DB.prepare(`select * from books where isbn = $id`)
    .bind(c.req.param('id'))
    .all();
  return c.json({
    data: results,
  });
});

export default app;
