const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
app.use(cors());
app.use(express.json());

//routers
const rolesRouter = require("./routes/role");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const shopsRouter = require("./routes/shops");
const subCategoriesRouter = require("./routes/subCategories");

// router middleware
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/shops", shopsRouter);
app.use("/subCategories", subCategoriesRouter);

const PORT = process.env.PORT || 5001;

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
