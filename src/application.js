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

module.exports = function application(ENV) {
  let date = (moment().subtract(1, 'days')).toISOString(true).split('T')[0];
  // axios.get(`http://localhost:8001/api/global/1`)
  //   .catch(err => console.log(err))

  // setInterval(() => {
  //   getScores(date, db)
  //   axios.get(`http://localhost:8001/api/global/1`)
  //     .catch(err => console.log(err))
  // }, 30000)

  // setInterval(() => {
  //   getGames([date], db, true)
  // }, 120000)

  app.use(cors())
  app.use(helmet())
  app.use(bodyparser.json())
  app.get('/', (req, res) => {

    res.send('Hello World!')
  })
  app.get('/games', (req, res) => {
    let date = (moment().subtract(1, 'days')).toISOString(true).split('T')[0];
    for (const key in req.query) {
      console.log(key, req.query[key])
      if (key === 'date') {
        date = req.query[key];
        console.log('key recognizes date', date);
      }
    }
    console.log("date used", date);
    const games = getGames([date], db, true)
    res.send('Hello World from Games!')
  })

  app.get('/mock_data', async (req, res) => {
    let fileName = `./data-files/game_scores-mock.json`;
    const gameData = require("../lib/in-memory-db").scoreUpdates;
    console.log('game data num element', gameData.length);
    res.json(gameData[0]);
    // remove the first item and update file
    gameData.shift();
    console.log('game data after popping one from top', gameData.length)
    fs.writeFileSync(fileName, JSON.stringify(gameData), (err) => {
      if (err) throw err;
      console.log(`The file ${fileName} has been updated with item removed from top of array! ${today.toTimeString()}`);
    });
  })

  app.get('/view_mock_data', async (req, res) => {
    let fileName = `./data-files/game_scores-mock.json`;
    const gameData = require("../lib/in-memory-db").scoreUpdates;
    console.log('game data num element', gameData.length);
    res.json(gameData);
  })

  return app;
};
