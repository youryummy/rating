import { logger } from "@oas-tools/commons";
import Rating from "../mongo/rating.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import server from "../server.js";

logger.configure({ level: "off" });
process.env.NODE_ENV = "test";

if (process.argv.includes("tests/integration")) {
  mongoose.set("strictQuery", false);

  await mongoose
    .connect("mongodb://localhost:27017/database")
    .then(async () => {
      await Rating.insertMany([
        { like: true, comment: "test1", idUser: "test1", idRecipe: "test1" },
        { like: false, comment: "test2", idUser: "test2", idRecipe: "test2" },
        { like: true, comment: "test3", idUser: "test3", idRecipe: "test3" },
        { like: false, comment: "test4", idUser: "test4", idRecipe: "test4" },
        { like: true, comment: "test5", idUser: "test5", idRecipe: "test5" },
      ]);

      const oldExit = process.exit;
      process.exit = async (code) => {
        await mongoose.connection.db.dropCollection("ratings");
        await mongoose.disconnect();
        oldExit(code);
      };
    })
    .catch((err) => {
      console.log("Failed to connect to test db: ", err.message);
      process.exit(1);
    });
} else if (process.argv.includes("tests/components")) {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect("mongodb://localhost:27017/database")
    .then(async () => {
      // populate test db
      await Rating.insertMany([
        { like: true, comment: "test1", idUser: "test1", idRecipe: "test1" },
        { like: false, comment: "test2", idUser: "test2", idRecipe: "test2" },
        { like: true, comment: "test3", idUser: "test3", idRecipe: "test3" },
        { like: false, comment: "test4", idUser: "test4", idRecipe: "test4" },
        { like: true, comment: "test5", idUser: "test5", idRecipe: "test5" },
      ]);

      // Cleans db after tests
      const oldExit = process.exit;
      process.exit = async (code) => {
        await mongoose.connection.db.dropCollection("ratings");
        await mongoose.disconnect();
        oldExit(code);
      };

      // Starts server
      await server.deploy(process.env.NODE_ENV).catch((err) => {
        console.log(err);
      });
     
    })
    .catch((err) => {
      console.log("Failed to connect to test db: ", err.message);
      process.exit(1);
    });
}
