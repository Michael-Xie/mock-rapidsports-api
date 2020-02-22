// ---------- imports -----------------------
const fs   = require("fs")
const path = require("path")
const moment = require("moment");

const express    = require("express")
const bodyparser = require("body-parser")
const helmet     = require("helmet")
const cors       = require("cors")

const app = express();

const axios = require("axios")

const db = require("./db")
const getGames   = require("./models/getGames")

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
  let date = ["2020-02-22"]
  // axios.get(`http://localhost:8001/api/global/1`)
  //   .catch(err => console.log(err))

  // setInterval(() => {
  //   getScores(date, db)
  //   axios.get(`http://localhost:8001/api/global/1`)
  //     .catch(err => console.log(err))
  // }, 30000)

  // setInterval(() => {
  //   getGames(date, db, true)
  // }, 120000)

  app.use(cors())
  app.use(helmet())
  app.use(bodyparser.json())
  app.get('/', (req, res) => {

    res.send('Hello World!')
  })
  app.get('/games', (req, res) => {
    let date = (new Date()).toISOString().split('T')[0];
    for (const key in req.query) {
      console.log(key, req.query[key])
      if (key==='date') {
        date = req.query[key];
        console.log('key recognizes date', date);
      }
    }
    getGames([date], db, true)

    res.send('Hello World from Games!')
  })
  // app.use("/api/pay", payRoute(db, moneyHelper));
  // app.use("/api/test", testRoute(db, betsHelper))
  // app.use("/api", gameRoute(db, actions.updateState))
  // app.use("/api", scoreRoute(db, actions.updateState))
  // app.use("/api", userRoute(db))
  // app.use("/api", globalRoute(db, actions.updateState))
  // app.use("/api", parlayRoute(db, actions.updateState))

  // if (ENV === "development" || ENV === "test") {
  //   Promise.all([
  //     read(path.resolve(__dirname, `db/schema/create.sql`)),
  //     read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
  //   ])
  //     .then(([create, seed]) => {
  //       app.get("/api/debug/reset", (request, response) => {
  //         db.query(create)
  //           .then(() => db.query(seed))
  //           .then(() => {
  //             console.log("Database Reset");
  //             response.status(200).send("Database Reset")
  //           })
  //       })
  //     })
  //     .catch(error => {
  //       console.log(`Error setting up the reset route: ${error}`)
  //     })
  // }

  // app.close = function() {
  //   return db.end()
  // };

  return app;
};
