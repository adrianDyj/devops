const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const redis = require("redis");
const redisClient = redis.createClient({
  host: "myredis",
  port: 6379,
  // retry_strategy: () => 1000
});

redisClient.on("connect", () => {
  console.log("REDIS CONNECTED!");
});

const { Pool } = require("pg");
const pgClient = new Pool({
  user: "postgres",
  password: "1qaz2wsx",
  database: "postgres",
  host: "mypostgres",
  port: "5432",
});

pgClient.on("error", () => {
  console.log("Cannot connect with database");
});

// pgClient.query(`INSERT INTO cars (name) VALUES ('TEST NAME');`).
// catch((err) => {console.log(err)});

const PORT = 5000;

// app.get("api/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/cars", (req, res) => {
  pgClient
  .query(
    `CREATE TABLE IF NOT EXISTS cars (id SERIAL PRIMARY KEY, name TEXT);`
  )
  .catch((err) => {
    console.log(err);
  });
  pgClient.query(`SELECT * FROM cars;`, (err, postgres) => {
    if (err) {
      console.log(err.stack);
    } else {
      const data = postgres.rows;
      res.send(data);
    }
  });
});

app.get("/cars/:id", (req, res) => {
  const id = req.params.id;
  redisClient.exists(id, (err, redis) => {
    if (redis == 1) {
      redisClient.get(id, (err, redis) => {
        if (err) {
          console.log(err.stack);
        } else {
          const data = redis;
          console.log("Response from REDIS");
          res.send(data);
        }
      });
    } else {
      pgClient.query(
        `SELECT * FROM cars WHERE id='${id}';`,
        (err, postgres) => {
          if (err) {
            console.log(err.stack);
          } else {
            const data = postgres.rows[0];
            console.log("Response from POSTGRES");
            res.send(data);
          }
        }
      );
    }
  });
});

app.post("/cars", function (req, res) {
  const { name } = req.body;
  pgClient.query(
    `INSERT INTO cars (name) VALUES ('${name}') RETURNING id`,
    (error, result) => {
      if (error) {
        throw error;
      }
      const id = result.rows[0].id;
      redisClient.set(id, name);
      console.log(`Car with id: ` + id + `has been added`);
      res.send("Car has been added.");
    }
  );
});

app.put("/cars/:id", (req, res) => {
  const id = req.params.id; 
  const body = req.body;

  redisClient.exists(id, (error, response_exist) => {
      if (response_exist == 1) {
          redisClient.hmset(`${id}`, {'name': `${body.name}`}, function (err) {
            console.log(`Redis error when updating.`);
          })
          console.log(`Car with id ${id} has been edited in Redis.`);
      }
  });

  pgClient.query(`UPDATE cars SET name = '${body.name}' WHERE id = '${id}';`);
  console.log(`Car with id ${id} has been updated in Postgres.`);

  res.end();
});

app.delete("/car/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  redisClient.exists(id, (err, redis) => {
      if (redis == 1) {
          redisClient.del(`${id}`);
      }
  });

  pgClient.query(`DELETE FROM cars WHERE id = ${id};`);
  res.send("Car has been deleted.");
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
