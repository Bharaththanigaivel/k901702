const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const dotenv =require("dotenv")
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.mongo_db_connection
).then(console.log("DB connected succfully!")).catch((error) => console.log(error.message));

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connected");
});

app.use("/api/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
