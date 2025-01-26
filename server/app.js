import morgan from "morgan";
import expres from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = expres();

app.use(cors());
app.use(morgan("dev"));

app.use("/health",(req,res)=>{
    res.send("Server running")
})

app.listen(4000,()=>{
    console.log("server running on port 4000")
});