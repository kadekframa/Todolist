import express from "express";
import cors from "cors";
import routes from "./routes.js";
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(PORT, () => {
  console.info(`Server running on port : ${PORT}`);
});
