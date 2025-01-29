import morgan from "morgan";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./utils/dbConnection.js";
import cookie from "cookie-parser";
import user from "./routes/userRoute.js"
import Company from "./routes/companyRoute.js";
import Job from "./routes/jobRoute.js";
import Application from "./routes/applicationRoute.js"


dotenv.config();

const app = express();


app.use(
    cors({
      origin: [
        "https://job-portal-hyrio-ai.vercel.app",
        process.env.FRONTEND_URL,
        "http://localhost:5173",
      ],
      credentials: true,
    })
  );
app.use(morgan("dev"));
app.use(express.json());
app.use(cookie());


app.use("/health", (req, res) => {
  res.status(200).send("Server running");
});

//Routes middlewares
app.use("/api/v1/user", user);
app.use("/api/v1/company", Company); 
app.use("/api/v1/Job",Job);
app.use("/api/v1/application",Application); 


const PORT = process.env.PORT || 8000;

//MongoDb connection
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}..🚀`);
  });
});
