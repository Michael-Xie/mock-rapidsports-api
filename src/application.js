// ---------- imports -----------------------
const fs = require("fs")
const readline = require('readline');

const path = require("path")
const moment = require("moment");

const express = require("express")
const bodyparser = require("body-parser")
const helmet = require("helmet")
const cors = require("cors")

const app = express();

const axios = require("axios")

const db = require("../lib/in-memory-db")

const getGames = require("./models/getGames")
const {createMockGame} = require("./models/mockData");
// -------------------------------------------

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

let games = createMockGame();


module.exports = function application(ENV) {
  let date = (moment().subtract(0, 'days')).toISOString(true).split('T')[0];

  // const isUpdate = false;
  // if (isUpdate) {
  //   setInterval(() => {
  //     getGames([date], db, true)
  //   }, 30000)
  // }

  app.use(cors())
  app.use(helmet())
  app.use(bodyparser.json())
  app.get('/', (req, res) => {

    res.send('Hello World!')
  })
  // app.get('/games', (req, res) => {
  //   for (const key in req.query) {
  //     console.log(key, req.query[key])
  //     if (key === 'date') {
  //       date = req.query[key];
  //       console.log('key recognizes date', date);
  //     }
  //   }
  //   console.log("date used", date);
  //   const games = getGames([date], db, true)
  //   res.send('Hello World from Games!')
  // })

  // app.get('/create_mock', async(req, res) => {
  //   let fileName = `./data-files/game_scores-mock.json`;
  //   // const scoreUpdates = require('./../lib/in-memory-db').scoreUpdates;
  //   // // very hacky, need to initialize with [{}] in file to not crash, this just takes that out
  //   // if (Object.keys(scoreUpdates[0]).length === 0) {
  //   //   scoreUpdates.pop();
  //   // }
  //   // scoreUpdates.push(...createMockGame());
  //   const today = new Date();
  //   // write newly appended update
  //   fs.writeFileSync(fileName, JSON.stringify(...createMockGame()), (err) => {
  //     if (err) throw res.status(404).send(err);
  //     res.send("success in writing file");
  //     console.log(`The file ${fileName} has been updated! ${today.toTimeString()}`);
  //   });
  //   res.send('creating data');
  // })

  // Use this route to grab live mock data
  app.get('/mock_data', async (req, res) => {
    // let fileName = `./data-files/game_scores-mock.json`;
    // const gameData = require("../lib/in-memory-db").scoreUpdates;
    // console.log('game data num element', gameData.length);
    // res.json(gameData[0]);
    // // remove the first item and update file
    // gameData.shift();
    // console.log('game data after popping one from top', gameData.length)
    // fs.writeFileSync(fileName, JSON.stringify(gameData), (err) => {
    //   if (err) throw err;
    //   console.log(`The file ${fileName} has been updated with item removed from top of array! ${today.toTimeString()}`);
    // });
    console.log(games.length);
    if (games.length < 2) {
      games = [...games, ...createMockGame()];
    }
    res.json(games.shift());
  })

  // app.get('/view_mock_data', async (req, res) => {
  //   let fileName = `./data-files/game_scores-mock.json`;
  //   const gameData = require("../lib/in-memory-db").scoreUpdates;
  //   console.log('game data num element', gameData.length);
  //   res.json(gameData);
  // })

  return app;
};
