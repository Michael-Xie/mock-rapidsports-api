const mtz = require('moment-timezone');
const moment = require('moment-timezone');

const generateRandom = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

 /**
 * Return a mock response objects
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
const createMockData = function (teams, startTime, durationInSec, callPeriod, status) {
  
  const averagePointsPerGame = 120;
  const averagePointsPerQuarter = averagePointsPerGame / 4;
  const quarterTime = durationInSec / 4;
  const callsPerGame = parseInt(durationInSec*(1/ callPeriod));
  const callsPerQuarter = quarterTime * (1 / callPeriod);
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  for (let [key, value] of Object.entries(gameData)) {
    const game = {};

  }
  return {response: [
    {
      id: id,
      date: date,
      timestamp: timestamp,
      status: {short: status},
      teams: {home: {name: homeTeam}, away: {name: awayTeam}},
      scores: {home: {quarter_1: quarter_1, quarter_2: quarter_2, quarter_3: quarter_3, quarter_4: quarter_4, total: homeTotal}}
    }
  ]
  }
};
// const game_id = game.id
// const date = game.date
// const timestamp = game.timestamp
// const status = game.status.short
// const home_team = game.teams.home.name
// const away_team = game.teams.away.name
// const home_first = game.scores.home.quarter_1 || 0
// const home_second = game.scores.home.quarter_2 || 0
// const home_third = game.scores.home.quarter_3 || 0
// const home_fourth = game.scores.home.quarter_4 || 0
// const away_first = game.scores.away.quarter_1 || 0
// const away_second = game.scores.away.quarter_2 || 0
// const away_third = game.scores.away.quarter_3 || 0
// const away_fourth = game.scores.away.quarter_4 || 0
// const home_total = game.scores.home.total || 0
// const away_total = game.scores.away.total || 0

const generateMockGame = function(gameData) {
  const {date} = gameData;
  const timestamp = date.toDate().getTime();
  const beforeGameStart;
  const Q1 = createMockData([{home: 'A', away: 'B'}]);
  const Q2;
  const Q3;
  const Q4;
  //const AOT;
  const gameFinished;
  return [...beforeGameStart, ...Q1, ...Q2, ...Q3, ...Q4, ...gameFinished];
}

// date - moment object
const setTimestamp = function (date) {
  return date.toDate().getTime();
}

const offsetDate = function(date, value, quantifier) {
  let newDate = date.clone();
  newDate.add(value, quantifier);
  return newDate;
}

// main
const date = moment();
const timestamp = date.toDate().getTime();

const gamesData = {
  1: {home: {name: 'A', timestamp: }}
}
const games = generateMockGame({home: 'A', away: 'B', timestamp: timestamp, date: date, })
const gameDuration = 4*60;



// Basketball
// Each quarter is 12min each
// 4 quarters is 48min

// Each game is 4min (240s)
// Each quarter is 1min (60s)
// 1 call/3s
// 20 calls every min
