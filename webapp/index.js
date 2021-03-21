const express = require("express")

const app = express();

app.get('/hello', (req, res) => {
    res.send("Hello World from car service");
});

const PORT = 9090;

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});