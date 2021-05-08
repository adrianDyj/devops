const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors());

app.get("/hello", (req, res) => {
    res.send("Hello world!");
});

const PORT=4000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});