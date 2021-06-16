// Initialisation des variables
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeleft = document.querySelector('#time-left');
let score = document.querySelector('#score');

let result = 0;
let currentTime = timeleft.textContent;

// Fonction permettant de mettre en random l'image à l'interieur des carrés de classe square
function randomSquare() {
    // Pour chaque square dont la className est 'mole', remove it
    square.forEach(className => {
        className.classList.remove('mole');
    })
    // Changer la position grace à Math.random * le nbre de Square et arrondi à 1 entier Math.floor et à laquelle on ajoute la classe 'mole'
    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');

    // Assign the id of the randomPosition to hitPosition for us to use later
    // Assigner une position grace à l'id de la variable randomPosition
    hitPosition = randomPosition.id;
}
/**
 * Ajouter un écouteur d'évènement à l'id de square :
 * à chaque relachement de clickMouse
 * SI l'id de id est strictement égale à hitPosition 
 *      ALORS on incrémente de 1 le résultat
 *      le contenu textuel de score prend la valeur de result
 */
square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result = result + 1;
            score.textContent = result;
        }
    })
})

// 
function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 1000);
}

moveMole();

/**
 * Fonction de compteur :
 * Incrémentation du temps
 * le contenu textuel de timeLeft prend la valeur de currentTime
 * 
 * SI currentTime est à 0
 *      ALORS efface timerId
 *            Affiche un message d'alert
 */
function countDown() {
    currentTime--;
    timeleft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        alert('GAME OVER ! Your final score is ' + result);
    }
}

// timerId est incrémenté toutes les secondes afin d'afficher un décompte
let timerId = setInterval(countDown, 1000)