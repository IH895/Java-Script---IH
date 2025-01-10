
//lager en object, har den utenfor function slik at den lagrer stillingen
//bruker JSON til å endre tilbake til vanlig object
//denne gjør at når du refresher siden starter den fra stillingen som var på forje spill
let score = JSON.parse(localStorage.getItem
    ('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();


//Reset knappen
document.querySelector('#resetButton').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
});


//pickComputerMove tar først fra dem som er nederst, som velger hva pcen skal velge ved random

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    //hvis du tar saks, og hva som skjer når pc-en velger en
    if (playerMove === 'saks') {
        if (computerMove === 'stein') {
            result = 'Du tapte';
        } else if (computerMove === 'papir') {
            result = 'Du vant';
        } else if (computerMove === 'saks') {
            result = 'Likt'
        }
    }

    //hvis du tar papir, og hva som skjer når pc-en velger en
    if (playerMove === 'papir') {
        if (computerMove === 'saks') {
            result = 'Du tapte';
        } else if (computerMove === 'stein') {
            result = 'Du vant';
        } else if (computerMove === 'papir') {
            result = 'Likt'
        }
    }

    //hvis du tar stein, og hva som skjer når pc-en velger en
    if (playerMove === 'stein') {
        if (computerMove === 'papir') {
            result = 'Du tapte';
        } else if (computerMove === 'saks') {
            result = 'Du vant';
        } else if (computerMove === 'stein') {
            result = 'Likt'
        }
    }



    //Viser en midlertidig melding mens brukeren venter
    document.querySelector('.js-result').innerHTML = 'Vent...'; // Midlertidig melding
    document.querySelector('.js-moves').innerHTML = ''; // Tømmer trekkene midlertidig

    // Forsinker visningen av resultat, trekk og oppdatering av stillingen
    setTimeout(() => {
        // Viser resultatet
        document.querySelector('.js-result').innerHTML = result;

        // Viser trekkene
        document.querySelector('.js-moves').innerHTML =
            'Deg <img src="bilder/' + playerMove + '-emoji.png" class="bilde-bevegelse"> <img src="bilder/' + computerMove + '-emoji.png" class="bilde-bevegelse"> PC';

        // Oppdaterer stillingen basert på resultatet
        if (result === 'Du vant') {
            score.wins += 1;
        } else if (result === 'Du tapte') {
            score.losses += 1;
        } else if (result === 'Likt') {
            score.ties += 1;
        }

        // Lagrer ny stilling i localStorage og oppdaterer på skjermen
        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();
    }, 2000); // 2000 millisekunder = 2 sekunder
}

// Oppdaterer score-elementet
function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = 'Vunnet: ' + score.wins + ', Tapte: ' + score.losses + ', Likt: ' + score.ties;
}


//velger pc-en sin bevegelse, går for et random. Når det blir et visst tall, blir det enten stein saks eller papir

function pickComputerMove() {
    const randomNumber = Math.random()


    let computerMove = '';


    if (randomNumber >= 0 &&
        randomNumber < 1 / 3) {
        computerMove = 'stein';
    } else if (randomNumber >= 1 / 3 &&
        randomNumber < 2 / 3
    ) {
        computerMove = 'papir';
    } else if (randomNumber >= 2 / 3 &&
        randomNumber < 1) {
        computerMove = 'saks';
    }

    return computerMove;

}