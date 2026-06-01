const expresse = require("express");

const app = expresse();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
