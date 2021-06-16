/**
 * Jeu de Mémoire : le but est de retourner 2 cartes, si elles sont identiques,
 * on gagne la paire, sinon, on les laisse et on retente sa chance !
 */


document.addEventListener('DOMContentLoaded', () => {
    // Déclarer les cards
    const cardArray = [
        {
            name: 'mononoke',
            img: 'images/mononoke.png'
        },
        {
            name: 'ponyo',
            img: 'images/ponyo.png'
        },
        {
            name: 'porco-rosso',
            img: 'images/porco-rosso.png'
        },
        {
            name: 'totoro-noir',
            img: 'images/totoro-noir.png'
        },
        {
            name: 'totoro',
            img: 'images/totoro.png'
        },
        {
            name: 'chateau-ambulant',
            img: 'images/chateau-ambulant.png'
        },
        {
            name: 'mononoke',
            img: 'images/mononoke.png'
        },
        {
            name: 'ponyo',
            img: 'images/ponyo.png'
        },
        {
            name: 'porco-rosso',
            img: 'images/porco-rosso.png'
        },
        {
            name: 'totoro-noir',
            img: 'images/totoro-noir.png'
        },
        {
            name: 'totoro',
            img: 'images/totoro.png'
        },
        {
            name: 'chateau-ambulant',
            img: 'images/chateau-ambulant.png'
        }
    ]
    // Permet de randomiser les cards
    // Même si je n'ai pas encore trop compris comment...
    cardArray.sort(() => 0.5 - Math.random());

    // Déclaration des variables :
    // grid qui appelle la div 
    const grid = document.querySelector('.grid');
    // Permet de changer le score au fur et à mesure dans la span du titre
    const resultDisplay = document.querySelector('#result');
    // Tableaux
    // Sélection de cartes
    let cardsChosen = [];
    // Choix des cartes en récupérant l'ID
    let cardsChosenId = [];
    // Paire de cartes gagnées
    let cardsWon = [];


    // CREATE BOARD
    /**
     * Fonction qui permet de créer la grille de jeu :
     * Une boucle qui permet de lire le tableau d'objet contenant les cartes
     * Dans cette boucle, la constante card qui permet de créer l'image
     * Lui donner le visuel blank,
     * Venir attribuer un index à chaque carte
     * Ajouter l'écouteur d'évènement clique et retourne la carte (=> fonction)
     * Ajouter la carte dans la grille
     */
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/fond.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard)
            grid.appendChild(card);
        }
    }
    // Check for matches
    /**
     * Function qui permet de mettre la sélection choisie dans le tableau cardsChosenId
     * et donne la condition
     */
    function checkForMatch() {
        // Venir récupérer l'image
        const cards = document.querySelectorAll('img');
        // Mettre la 1ere sélection dans le tableau en lui attribuant l'indice 0
        const optionOneId = cardsChosenId[0];
        // Mettre la 2e sélection dans le tableau en lui attribuant l'indice 1
        const optionTwoId = cardsChosenId[1];

        // Si la sélection 1 est la même que la sélection 2
        if (cardsChosenId[0] === cardsChosenId[1]) {
            // Remettre les cartes sélectionnées avec le visuel blank
            cards[optionOneId].setAttribute('src', 'images/fond.png');
            cards[optionTwoId].setAttribute('src', 'images/fond.png');
            // Alerte
            alert('You have clicked the same image !')

        // Sinon Si les 2 cartes choisies sont les mêmes
        } else if (cardsChosen[0] === cardsChosen[1]){
            // Alerte
            alert('Yeah, you found a match !');
            // Remplacer chaque carte par une image blanche
            cards[optionOneId].setAttribute('src', 'images/natural.png');
            cards[optionTwoId].setAttribute('src', 'images/natural.png');
            // Annuler l'écouteur d'event qui clique et retourne la carte
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            // Venir ajouter dans le tableau pour afficher le score
            cardsWon.push(cardsChosen);
        // Sinon,
        } else {
            // Remettre les cartes sélectionnées avec le visuel blank
            cards[optionOneId].setAttribute('src', 'images/fond.png');
            cards[optionTwoId].setAttribute('src', 'images/fond.png');
            // et Afficher le message en alerte
            alert('Sorry, try again...');
        }
        // Remettre le choix des cartes dans un tableau ?
        cardsChosen = [];
        // Idem ?
        cardsChosenId = [];
        // Ajouter dans la span du titre les paires de cartes gagnées grace à length
        resultDisplay.textContent = cardsWon.length;
        // SI la taille du tableau de paires est égale à la taille /2 du tableau initial des cartes
        if (cardsWon.length === cardArray.length/2) {
            // ALORS Affichage du message
            resultDisplay.textContent = 'Congrat\'s ! You found them all !!!';
        }
    }
       

        // Flip your card
        /**
         * Fonction qui permet de "retourner" les cartes:
         * 
         */
        function flipCard() {
            // Déclarer une variable et lui attribuer la valeur de data-id
            let cardId = this.getAttribute('data-id');
            // Ajouter dans le tableau le nom de larte du tableau initial selon son ID
            cardsChosen.push(cardArray[cardId].name);
            // Mettre dans le tableau de choix
            cardsChosenId.push(cardId);
            // Venir attribuer l'image de l'id d'une carte du tableau initial
            this.setAttribute('src', cardArray[cardId].img)
            // SI le total des cartes choisies est égal à 2
            if (cardsChosen.length === 2) {
                // Laisser les cartes affichées pendant 500ms
                setTimeout(checkForMatch, 500);
            }
        }
        
        // Appeler la fonction du jeu
        createBoard();

});


