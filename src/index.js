import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

//Here we just connect the db and listen to a port

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR before listening: ", error);
      throw error;
    });
    
    app.listen(process.env.PORT || 3000, () => {
      console.log(`app is listening on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });

/*
const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });

    app.listen(process.env.PORT),
      () => {
        console.log(`app is listing on http://localhost:${process.env.PORT}`);
      };
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
})();
*/
