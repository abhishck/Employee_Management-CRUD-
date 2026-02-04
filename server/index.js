import express from "express"
import dotenv from "dotenv"
import dbConnection from "./config/dbConfig.js";
import cors from "cors"
import router from "./routes/empRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
dbConnection();

const app=express();

console.log("PORT from env:", process.env.PORT);


const Port= 3000;
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use("/api/employees",router)
app.use("/api/users",authRouter)
app.use(errorHandler)
app.get("/", (req, res) => {
  res.send("Server is alive");
});



app.listen(Port,()=>{
    console.log(`Server is running on the port : ${Port}`)
})



