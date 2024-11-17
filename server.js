const express = require(`express`);
const app = express();

const PORT = 3000;

app.use(express.json());

app.use((req, res, next)=>{
  console.log(`${req.method} ${req.originalUrl}`);
  next();
})

app.get("/", (req, res) => {
  res.send(`Welcome to the Prismatic Employees API.`);
})

app.use("/employees", require(`./API/employees.js`));

app.use((req, res, next) => {
  next({status: 400, message: `Endpoint does not exist.`})
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.message ?? 500);
  res.json(err.message ?? `Something went wrong.`);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})