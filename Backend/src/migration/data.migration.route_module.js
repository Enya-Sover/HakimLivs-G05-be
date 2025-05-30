import express from "express";
import { readFile,writeFile } from "fs/promises";

/**
 * @description This function is used to create a route for data migration and teardown
 * @param {import("mongoose").Model} model
 * @param {string} dataPath - The path to the data file absolute or relative to the root of the project as .json
 * @returns {import("express").Router}
 */
function dataMigrationRouter(model, dataPath) {
  const router = express.Router();

  router.post("/migrate/", async (req, res) => {
    try {
      const fileContent = await readFile(dataPath, "utf8");
      const data = JSON.parse(fileContent);
      
      await model.bulkWrite(
        data.map((item) => {
          if (item._id) {
            return {
              updateOne: {
                filter: { _id: item._id },
                update: { $set: item },
                upsert: true,
              },
            };
          } else {
            return {
              insertOne: {
                document: item,
              },
            };
          }
        })
      );

      res.status(200).json({
        message: "Data migrated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error migrating data",
        error: error.message,
      });
    }
  });

  router.delete("/teardown/", async (req, res) => {
    try {
      await model.deleteMany({});
      res.status(200).json({
        message: "Data teared down successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error tearing down data",
        error: error.message,
      });
    }
  });

  router.get("/export/", async (req, res) => {
    try {
      const data = await model.find().lean(); // lean() for plain JS objects
      await writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");

      res.status(200).json({
        message: "Data exported to JSON file successfully",
        filePath: dataPath,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error exporting data",
        error: error.message,
      });
    }
  });

  return router;
}

export default dataMigrationRouter;