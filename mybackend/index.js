const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Redis configuration
const redis = require('redis');

const redisClient = redis.createClient({
    host: "myredis",
    port: 6379,
    // retry_strategy: () => 1000
})

redisClient.on('connect',  () => {
    console.log("Connected to redis client.");
});

// Postgres configuration
const { Pool } = require('pg');

const pgClient = new Pool({
    user: "postgres",
    password: "1qaz2wsx",
    databease: "postgres",
    host: "mypostgres",
    port: "5432"
});

pgClient.on('error', () => {
    console.log("Postgres not connected");
});

pgClient.query('CREATE TABLE IF NOT EXISTS cars (id UUID UNIQUE, brand VARCHAR, color VARCHAR, topSpeed INT, PRIMARY KEY (id))')
        .catch( (err) => {
            console.log(err);
        });

// API
app.get("/cars", (req, res) => {
    pgClient.query('SELECT * FROM cars;', (err, result) => {
        if (err) {
            console.log(err.stack);
        } else {
            const data = result.rows;
            res.send(data)
            console.log('Postgres : read cars from database');
        }
    });
});

app.get("/cars/:id", (req, res) => {
    const id = req.params.id;

    redisClient.exists(id, (err, result) => { 
        if (result < 1) {

            redisClient.hgetall(id, (err, redis) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    const car = redis
                    res.send(redis);
                    console.log(`Redis : read cars from redis`);
                }
            });

        } else {
            pgClient.query(`SELECT * FROM cars WHERE id='${id}';`, (err, result) => {
                if (err) {
                    res.send("No data found in database")
                    console.log("Postgres : no data found in database")
                } else {
                    const data = result.rows[0];
                    res.send(data.rows[0]);
                    console.log(`Postgres : read cars from database`);
                }
            });
        }
    })
    
});

const PORT = 8090;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});

