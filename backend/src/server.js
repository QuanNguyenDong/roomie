const express = require("express");
const app = express();
const port = 3001;

app.use("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
