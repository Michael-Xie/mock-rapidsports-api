const axios = require("axios")
const fs = require("fs");

// source: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

module.exports = (dates, db, update) => {
  dates.map(date => {
    axios(`https://api-basketball.p.rapidapi.com/games?date=${date}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        "x-rapidapi-key": "d8dfc5cbfdmshbb0b69d2a790b3dp1ba90ejsn8f36ab430b8b"
      }
    })
      .then(res => {
        // get all the games for the current date.
        const nbaGames = res.data.response.filter((game) => {
          return game.league.name === "NBA"
        })
        const today = new Date();
        let fileName = `./${formatDate(today)}-mock.txt`;
        fs.appendFile(fileName, JSON.stringify(nbaGames), (err) => {
          if (err) throw err;
          console.log(`The file ${fileName} has been updated! ${today.toTimeString()}`);
        });

        // res.data.response.forEach(game => {
        //   if (game.league.name === "NBA") {
        //     const game_id = game.id
        //     const date = game.date
        //     const timestamp = game.timestamp
        //     const status = game.status.short
        //     const home_team = game.teams.home.name
        //     const away_team = game.teams.away.name
        //     const home_first = game.scores.home.quarter_1 || 0
        //     const home_second = game.scores.home.quarter_2 || 0
        //     const home_third = game.scores.home.quarter_3 || 0
        //     const home_fourth = game.scores.home.quarter_4 || 0
        //     const away_first = game.scores.away.quarter_1 || 0
        //     const away_second = game.scores.away.quarter_2 || 0
        //     const away_third = game.scores.away.quarter_3 || 0
        //     const away_fourth = game.scores.away.quarter_4 || 0
        //     const home_total = game.scores.home.total || 0
        //     const away_total = game.scores.away.total || 0
        //     if (game_id) {
        //       const today = new Date();
        //       let fileName = `./${formatDate(today)}-mock.txt`;
        //       // fs.appendFile(fileName, JSON.stringify(res.data), (err) => {
        //       //   if (err) throw err;
        //       //   console.log(`The file ${fileName} has been updated!`);
        //       // });
        //       fs.writeFile(fileName, JSON.stringify(game), (err) => {
        //         if (err) throw err;
        //         console.log(`The file ${fileName} has been updated!`);
        //       });

        //     }
        //   }
        // })
      })
      .catch(err => console.log("ERROR in getGames: ", err))
  })
}
