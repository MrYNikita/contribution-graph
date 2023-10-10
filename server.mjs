import fs from "fs";
import express from "express";

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {

    const result = fs.readFile('./../frontend/index.html');

    res.send(result);

});

app.listen(3000);