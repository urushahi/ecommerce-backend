import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleWare } from "./middlewares/errors";

const app: Express = express();

app.use(express.json());

app.use("/", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  result:{
    address:{
      formattedAddress: {
        needs:{
          street: true,
          city: true,
          country: true,
          pincode: true
        },
        compute:(addr) =>{
          return`${addr.street}, ${addr.city}, ${addr.country}, ${addr.pincode}`
        }
      }
    }
  }
})

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
