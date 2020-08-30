document.getElementById('rock').addEventListener('click', playGame);
document.getElementById('paper').addEventListener('click', playGame);
document.getElementById('scissors').addEventListener('click', playGame);
document.getElementById('reset-button').addEventListener('click', clearGame);
document.getElementById('results').style.visibility = 'hidden';

let gameCount = window.localStorage.getItem('gameCount') || 0;
let manWins = window.localStorage.getItem('manWins') || 0;
let machineWins = window.localStorage.getItem('machineWins') || 0;

displayScores();

function playGame(e) {
    gameCount++;

    document.getElementsByClassName('result-header').innerHTML = '';

    const manChoice = e.target.id;
    const machineChoice = getMachineChoice();

    const gameResult = getGameResult(manChoice, machineChoice);

    if (gameResult === 'W') manWins++;
    if (gameResult === 'L') machineWins++;

    displayResults(manChoice, machineChoice, gameResult);

    window.localStorage.setItem('gameCount', gameCount);
    window.localStorage.setItem('manWins', manWins);
    window.localStorage.setItem('machineWins', machineWins);
}

function clearGame() {
    gameCount = 0;
    manWins = 0;
    machineWins = 0;

    window.localStorage.setItem('gameCount', gameCount);
    window.localStorage.setItem('manWins', manWins);
    window.localStorage.setItem('machineWins', machineWins);

    document.getElementById('results').style.visibility = 'hidden';
    document.getElementById('result-header').style.visibility = 'hidden';

    displayScores();
}

function displayScores() {
    document.getElementById('man-score').innerHTML = 'Man : ' + `${manWins}`;
    document.getElementById('machine-score').innerHTML = `${machineWins}` + ' : Machine';
}

function getMachineChoice() {
    let randomOption = Math.floor(Math.random() * 3) + 1;
    if (randomOption == 1)
        return 'rock';
    else if (randomOption == 2)
        return 'paper';
    else
        return 'scissors';
}

function getGameResult(man, machine) {
    if ((man == 'rock' && machine == 'scissors')
        || (man == 'paper' && machine == 'rock')
        || (man == 'scissors' && machine == 'paper')) {
        return 'W';
    } else if (man === machine) {
        return 'T';
    } else
        return 'L';
}

function displayResults(manOption, machineOption, result) {
    document.getElementById('man').innerHTML = document.getElementById(manOption).outerHTML;
    document.getElementById('machine').innerHTML = document.getElementById(machineOption).outerHTML;

    document.getElementById('result-label-man').innerHTML = 'Man chooses ' + `${manOption}`;
    document.getElementById('result-label-machine').innerHTML = 'Machine chooses ' + `${machineOption}`;

    let resultHeader;
    if (result == 'W') {
        resultHeader = 'Victory to Man!'
        document.getElementById('result-header').className = 'manWinner';
    } else if (result == 'T') {
        resultHeader = 'Stalemate!';
        document.getElementById('result-header').className = 'stalemate';
    } else {
        resultHeader = 'The Machines have Won!'
        document.getElementById('result-header').className = 'machineWinner';
    }

    displayScores();
    document.getElementById('result-header').innerHTML = resultHeader;
    document.getElementById('results').style.visibility = 'visible';
    document.getElementById('result-header').style.visibility = 'visible';
}