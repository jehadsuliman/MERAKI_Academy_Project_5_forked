const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
app.use(cors());
app.use(express.json());

//routers
const rolesRouter = require("./routes/role");



// router middleware
app.use("/roles", rolesRouter);



const PORT = process.env.PORT || 5001;



app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
