/* 
 * NAME: Kyla Yu-Swanson
 * DATE: June 2, 2022
 * 
 * This is the JS file for the Animal API. It manages the GET requests to obtain data.
 */

"use strict";

const express = require("express");
const fs = require("fs/promises");
const app = express();
const multer = require("multer");
const DEBUG = true;

app.use(express.static("public")); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(multer().none());

const SERVER_ERR_CODE = 500;
const SERVER_ERROR = "Something went wrong on the server, please try again later.";
const CLIENT_ERR_CODE = 404;

/*****************************Endpoints*****************************/
app.get("/animals", async (req, res, next) => {
  try {
    let animals = await fs.readdir("animals");
    res.json(animals);
  } catch (err) {
    res.status(SERVER_ERR_CODE);
    err.message = SERVER_ERROR;
    next(err);
  }
});

app.get("/animals/:animal", async (req, res, next) => {
  try {
    let animal = req.params['animal'];
    let result = await getAnimalData(res, next, animal);
    res.json(result);
  } catch (err) {
    res.status(SERVER_ERR_CODE); 
    err.message = SERVER_ERROR;
    next(err);
  }
});

app.get("/animals-data", async (req, res, next) => {
  try {
    let result = await getAnimalsData(res, next);
    res.json(result);
  } catch (err) {
    res.status(SERVER_ERR_CODE);
    err.message = SERVER_ERROR;
    next(err);
  }
});

app.get("/animal/random", async (req, res, next) => {
  try {
    let animals = await fs.readdir("animals");
    let result = animals[Math.floor(Math.random() * animals.length)];
    res.type("text");
    res.write(result);
    res.end();
  } catch (err) {
    res.status(SERVER_ERR_CODE);
    err.message = SERVER_ERROR;
    next(err);
  }
});

/*****************************Helper Functions*****************************/
/**
 * Get JSON information from the API for the given animal. Includes common name, 
 * genus, a description, and a picture path.
 * @param {ResponseObject} res - the response, for error handling
 * @param {string} animal - the animal we want data for
 * @returns {JSON} - JSON data about the animal
 */
async function getAnimalData(res, next, animal) {
  let animals = await fs.readdir("animals");
  if (!animals.includes(animal)) {
    res.status(CLIENT_ERR_CODE);
    next(Error(`Animal ${animal} not found in the database.`));
    return;
  }
  try {
    let fileContents = await fs.readFile(`animals/${animal}/info.txt`, "utf8");
    fileContents = fileContents.split("\n");
    let genusName = fileContents[0];
    let desc = fileContents[1];
    let imgName = fileContents[2];
    let animalData = {
      name : animal,
      genus : genusName,
      description : desc,
      image : imgName
    };
    return animalData;
  }
  catch (err) {
    res.status(SERVER_ERR_CODE);
    err.message = SERVER_ERROR;
    next(err);
  }
}

/**
 * Retrieves data for all the animals in a JSON. Includes common name, genus, a 
 * description, and a picture path for each animal.
 * @param {ResponseObject} res - the response, for error handling
 * @returns {JSON} - data about all the animals
 */
async function getAnimalsData(res, next) {
  try {
    let animals = await fs.readdir("animals");
    let animalsData = {};
    for (let animal of animals) {
      animalsData[animal] = await getAnimalData(res, next, animal);
    }
    return animalsData;
  } catch(err) {
    res.status(SERVER_ERR_CODE);
    err.message = SERVER_ERROR;
    next(err);
  }
}

/**
 * Error-handling middleware to cleanly handle different types of errors.
 * Any function that calls next with an Error object will hit this error-handling
 * middleware since it's defined with app.use at the end of the middleware stack.
 */
 function errorHandler(err, req, res, next) {
  if (DEBUG) {
    console.error(err);
  }
  res.type("text");
  res.send(err.message);
}

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
