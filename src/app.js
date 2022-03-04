import express from "express";
import routes from "./routes/index.js";
import db from "./models";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

try {
    app.use(cors());
    app.use(express.json());
    app.use("/api/v1/", routes);

    const { sequelize } = db;

    sequelize.authenticate().then(() => console.log("Database connected..."));

    app.listen(port, () => {
        console.log(`The server is running on port ${port}`);
    });
} catch (error) {
    console.log(error);
}
export default app;