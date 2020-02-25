const mtz = require('moment-timezone');
const moment = require('moment-timezone');

const generateRandom = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const calculateTotal = function(scores) {
  const {total, ...remaining} = scores;
  let sum = 0
  for (const score of Object.values(remaining)) {
    sum+=score;
  }
  return sum;
}


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

const beforeGameStart = function(gameData, status) {
  const {callPeriod, timeBuffer, date, games, gameDuration, avgGamePoints} = gameData;
  let numCalls = 0;
  let avgGamePointsPerCall = 0;
  const quarterDict = {Q1: 'quarter_1', Q2: 'quarter_2', Q3: 'quarter_3', Q4: 'quarter_4'};

  const copyGamesData = {...gamesData};

  if (status === "NS") {
    numCalls = parseInt(timeBuffer*(1/callPeriod));
  } else if (["Q1", "Q2", "Q3", "Q4"].includes(status)) {
    numCalls = parseInt(gameDuration/4*(1/callPeriod));
    avgGamePointsPerCall = parseInt(avgGamePoints/4/numCalls);

  }
  console.log('numCalls', numCalls);
  console.log('avgGamePointsPerCall', avgGamePointsPerCall);
  console.log('copyGamesData', copyGamesData);

  const calls = []
  for (let i = 0; i < numCalls; i++) {
    const responses = []
    const adjustedDate = offsetDate(date, i*callPeriod, "seconds")
    // console.log('date adjust', adjustedDate.toDate());
    // create a list of game object for each call
    for (const [key, value] of Object.entries(games)) {
      // set random score for a call
      const scoresUpdate = {...games[key].scores};       
      const stat = quarterDict[status];
      if (stat) {
        scoresUpdate.home[stat] += generateRandom(1, avgGamePointsPerCall);
        scoresUpdate.away[stat] += generateRandom(1, avgGamePointsPerCall); 
        scoresUpdate.home.total = calculateTotal(scoresUpdate.home);
        scoresUpdate.away.total = calculateTotal(scoresUpdate.away);
      }
      console.log(status, "statusUpdate", scoresUpdate);
      // console.log('scoreUpdate after gen', scoresUpdate);
      const call =  {
        id: key,
        date: adjustedDate.toDate(),
        timestamp: getTimestamp(adjustedDate),
        status: {short: status},
        teams: {home: {name: value.home}, away: {name: value.away}},
        scores: scoresUpdate
      };
      responses.push(call);
      // get scores updated to gamesData to pass down to next status
      copyGamesData.games[call.id].scores = scoresUpdate;
    }
    // format the list of object to rapidsports api and add to list of calls
    calls.push({response: responses})

  }
  return [calls, copyGamesData];
}

const generateMockGame = function(gameData) {
  // const beforeGameStart;
  // const Q1;
  // const Q2;
  // const Q3;
  // const Q4;
  // //const AOT;
  // const gameFinished;
  // return [...beforeGameStart, ...Q1, ...Q2, ...Q3, ...Q4, ...gameFinished];
}

// date - moment object
const getTimestamp = function (date) {
  return date.toDate().getTime();
}

const offsetDate = function(date, value, quantifier) {
  let newDate = date.clone();
  newDate.add(value, quantifier);
  return newDate;
}

// main
const date = moment();
const initScores = 
{
  home: {quarter_1: 0, quarter_2: 0, quarter_3: 0, quarter_4: 0, total: 0},
  away: {quarter_1: 0, quarter_2: 0, quarter_3: 0, quarter_4: 0, total: 0}
};
const gamesData = {
  games:{
    1: {home: 'A', away: 'B', offsetStart: {value: 3, quantifier: 'minutes'}, scores: initScores},
    2: {home: 'C', away: 'D', offsetStart: {value: 6, quantifier: 'minutes'}, scores: initScores}
  },
  date: date,
  gameDuration: 240, // 4min game
  callPeriod: 15, // 3sec make 1 call
  timeBuffer: 10, // 180s or 3min
  avgGamePoints: 120
}

// const games = generateMockGame(gamesData)
// console.log('games', games);
// console.log('gamesData', gamesData);
const [Q1, Q1Update] = beforeGameStart(gamesData, "Q1");
// console.log('Q1Update', JSON.stringify(Q1Update, null, 4));
const [Q2, Q2Update] = beforeGameStart(Q1Update, "Q2");
const [Q3, Q3Update] = beforeGameStart(Q2Update, "Q3");
const [Q4, Q4Update] = beforeGameStart(Q3Update, "Q4");
console.log('Q3', JSON.stringify(Q4, null, 3));
// console.log('beforeStart', JSON.stringify(beforeGameStart(gamesData, "Q1"), null, 4)); //OK


// Basketball
// Each quarter is 12min each
// 4 quarters is 48min

// Each game is 4min (240s)
// Each quarter is 1min (60s)
// 1 call/3s
// 20 calls every min

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

