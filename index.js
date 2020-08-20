document.getElementById('rock').addEventListener('click', playGame);
document.getElementById('paper').addEventListener('click', playGame);
document.getElementById('scissors').addEventListener('click', playGame);
document.getElementById('results').style.visibility = 'hidden';

function playGame(e) {
    document.getElementById('resultHeader').innerHTML = '';
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
    let resultText;

    document.getElementById('man').innerHTML = document.getElementById(manOption).outerHTML;
    document.getElementById('machine').innerHTML = document.getElementById(machineOption).outerHTML;

    if (result == 1) {
        resultText = 'Victory to Man!'
    } else if (result == 2) {
        resultText = 'Stalemate!';
    } else {
        resultText = 'The Machines have Won!'
    }

    document.getElementById('resultHeader').innerHTML = resultText;

    document.getElementById('results').style.visibility = 'visible';
}