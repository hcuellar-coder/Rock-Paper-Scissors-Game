document.getElementById('rock').addEventListener('click', playGame);
document.getElementById('paper').addEventListener('click', playGame);
document.getElementById('scissors').addEventListener('click', playGame);
document.getElementById('resetButton').addEventListener('click', clearGame);
document.getElementById('results').style.visibility = 'hidden';

let gameCount = 0;
let manWins = 0;
let machineWins = 0;

if (window.localStorage.getItem('gameCount')) {
    getCounts();
} else {
    zeroCounts();
}

function clearGame() {
    window.localStorage.removeItem('gameCount');
    window.localStorage.removeItem('manWins');
    window.localStorage.removeItem('machineWins');
    zeroCounts();
    getCounts();
    document.getElementById('results').style.visibility = 'hidden';
    document.getElementById('resultHeader').style.visibility = 'hidden';
}

function getCounts() {
    gameCount = window.localStorage.getItem('gameCount');
    manWins = window.localStorage.getItem('manWins');
    machineWins = window.localStorage.getItem('machineWins');
    document.getElementById('manScore').innerHTML = 'Man : ' + `${manWins}`;
    document.getElementById('machineScore').innerHTML = `${machineWins}` + ' : Machine';
}

function zeroCounts() {
    window.localStorage.setItem('gameCount', 0);
    window.localStorage.setItem('manWins', 0);
    window.localStorage.setItem('machineWins', 0);
}

function playGame(e) {
    gameCount++;
    window.localStorage.setItem('gameCount', gameCount);
    document.getElementsByClassName('resultHeader').innerHTML = '';
    computeWinner(e.target.id, machineOption());
}

function machineOption() {
    let randomOption = Math.floor(Math.random() * 3) + 1;
    if (randomOption == 1)
        return 'rock';
    else if (randomOption == 2)
        return 'paper';
    else
        return 'scissors';
}

function computeWinner(man, machine) {
    if ((man == 'rock' && machine == 'scissors')
        || (man == 'paper' && machine == 'rock')
        || (man == 'scissors' && machine == 'paper')) {
        displayResults(man, machine, 1);
    } else if (man === machine) {
        displayResults(man, machine, 2);
    } else
        displayResults(man, machine, 3);
}

function displayResults(manOption, machineOption, result) {
    let resultHeader;
    document.getElementById('man').innerHTML = document.getElementById(manOption).outerHTML;
    document.getElementById('machine').innerHTML = document.getElementById(machineOption).outerHTML;
    document.getElementById('resultLabelMan').innerHTML = 'Man chooses ' + `${manOption}`;
    document.getElementById('resultLabelMachine').innerHTML = 'Machine chooses ' + `${machineOption}`;

    if (result == 1) {
        resultHeader = 'Victory to Man!'
        manWins++;
        window.localStorage.setItem('manWins', manWins);
        document.getElementById('manScore').innerHTML = 'Man : ' + `${manWins}`;
        document.getElementById('resultHeader').className = 'manWinner';
    } else if (result == 2) {
        resultHeader = 'Stalemate!';
        document.getElementById('resultHeader').className = 'stalemate';
    } else {
        resultHeader = 'The Machines have Won!'
        machineWins++;
        window.localStorage.setItem('machineWins', machineWins);
        document.getElementById('machineScore').innerHTML = `${machineWins}` + ' : Machine';
        document.getElementById('resultHeader').className = 'machineWinner';
    }
    document.getElementById('resultHeader').innerHTML = resultHeader;
    document.getElementById('results').style.visibility = 'visible';
    document.getElementById('resultHeader').style.visibility = 'visible';



}