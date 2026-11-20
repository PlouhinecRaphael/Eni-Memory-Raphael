
document.addEventListener("DOMContentLoaded", () => {

     
    // RÉCUPÉRATION DES ÉLÉMENTS HTML
    

    // Récupérer toutes les cartes du jeu
    const cartes = document.querySelectorAll(".carte");

    // Récupérer le plateau qui contient les cartes
    const plateau = document.getElementById("plateau");

    // Récupérer le message qui s'affiche lorsque le joueur gagne
    const messageVictoire = document.getElementById("message-victoire");

    // Récupérer l'élément qui affiche le nombre de coups
    const compteurCoups = document.getElementById("compteur-coups");
 

    // Stocker la première carte sélectionnée
    let premiereCarte = null;

    // Stocker la deuxième carte sélectionnée
    let deuxiemeCarte = null;

    // Empêcher les clics pendant le délai où les cartes se cachent
    let verrouillage = false;

    // Compter le nombre de coups joués
    let nombreDeCoups = 0;

    // Compter le nombre de paires trouvées
    let pairesTrouvees = 0;

    // Indiquer si la partie est terminée
    let partieTerminee = false;


    // ==========================================
    // FONCTION : VÉRIFIER SI LES CARTES FORMENT UNE PAIRE
    // ==========================================

    function verifierPaire() {

        // Comparer l'identifiant de paire des deux cartes
        if (premiereCarte.dataset.paire === deuxiemeCarte.dataset.paire) {

            // Les deux cartes correspondent
            console.log("Bravo ! C'est une paire identique.");

            // Ajouter la classe pour indiquer que les cartes sont trouvées
            premiereCarte.classList.add("trouvee");
            deuxiemeCarte.classList.add("trouvee");

            // Augmenter le nombre de paires trouvées
            pairesTrouvees++;

            // Vérifier si toutes les paires ont été trouvées
            if (pairesTrouvees === 6) {

                // Indiquer que la partie est terminée
                partieTerminee = true;

                // Afficher le message de victoire
                messageVictoire.classList.remove("d-none");
            }

            // Libérer les cartes sélectionnées pour le prochain tour
            premiereCarte = null;
            deuxiemeCarte = null;

        } else {

            // Les deux cartes ne correspondent pas
            console.log("Dommage ! Les cartes sont différentes.");

            // Bloquer les clics pendant que les cartes restent visibles
            verrouillage = true;

            // Attendre 5 secondes avant de cacher les deux cartes
            setTimeout(() => {

                // Retourner les cartes face cachée
                premiereCarte.classList.remove("retournee");
                deuxiemeCarte.classList.remove("retournee");

                // Réinitialiser les cartes sélectionnées
                premiereCarte = null;
                deuxiemeCarte = null;

                // Autoriser à nouveau les clics
                verrouillage = false;

            }, 5000);

        }

    }


    // ==========================================
    // GESTION DES CLICS SUR LES CARTES
    // ==========================================

    // Parcourir toutes les cartes du jeu
    cartes.forEach((carte) => {

        // Ajouter un événement au clic sur chaque carte
        carte.addEventListener("click", () => {

            // Bloquer le clic si le jeu est verrouillé
            // ou si la partie est déjà terminée
            if (verrouillage || partieTerminee) {
                return;
            }

            // Vérifier que la carte n'est pas déjà retournée
            // pour éviter de la sélectionner plusieurs fois
            if (carte.classList.contains("retournee")) {
                return;
            }

            // Retourner la carte pour révéler son contenu
            carte.classList.add("retournee");


            // ------------------------------------------
            // SÉLECTION DE LA PREMIÈRE CARTE
            // ------------------------------------------

            // Si aucune première carte n'a encore été sélectionnée
            if (premiereCarte === null) {

                // Mémoriser la carte cliquée comme première carte
                premiereCarte = carte;

                console.log("Première carte mémorisée");

                // Arrêter ici : attendre le clic sur une deuxième carte
                return;
            }


            // ------------------------------------------
            // SÉLECTION DE LA DEUXIÈME CARTE
            // ------------------------------------------

            // Mémoriser la carte cliquée comme deuxième carte
            deuxiemeCarte = carte;

            console.log("Deuxième carte mémorisée");


            // ------------------------------------------
            // COMPTEUR DE COUPS
            // ------------------------------------------

            // Augmenter le nombre de coups à chaque deuxième sélection
            nombreDeCoups++;

            // Mettre à jour l'affichage du compteur dans la page
            compteurCoups.textContent = "Nombre de coups : " + nombreDeCoups;


            // ------------------------------------------
            // COMPARAISON DES DEUX CARTES
            // ------------------------------------------

            // Appeler la fonction qui vérifie si les cartes correspondent
            verifierPaire();

        });

    });


    // ==========================================
    // FONCTION : RÉINITIALISER LA PARTIE
    // ==========================================

    function reinitialiserJeu() {

        console.log("Le jeu va être réinitialisé !");


        // ------------------------------------------
        // REMETTRE TOUTES LES CARTES FACE CACHÉE
        // ------------------------------------------

        // Parcourir toutes les cartes pour retirer
        // les classes indiquant qu'elles sont retournées ou trouvées
        cartes.forEach((carte) => {
            carte.classList.remove("retournee");
            carte.classList.remove("trouvee");
        });


        // ------------------------------------------
        // REMISE À ZÉRO DES VARIABLES
        // ------------------------------------------

        // Remettre le nombre de coups à zéro
        nombreDeCoups = 0;

        // Mettre à jour l'affichage du compteur
        compteurCoups.textContent = "Nombre de coups : " + nombreDeCoups;

        // Effacer les cartes sélectionnées
        premiereCarte = null;
        deuxiemeCarte = null;

        // Désactiver le verrouillage
        verrouillage = false;

        // Remettre le nombre de paires trouvées à zéro
        pairesTrouvees = 0;

        // Indiquer que la partie n'est plus terminée
        partieTerminee = false;


        // ------------------------------------------
        // MASQUER LE MESSAGE DE VICTOIRE
        // ------------------------------------------

        // Retirer la classe qui rend le message visible
        messageVictoire.classList.add("d-none");


        // ------------------------------------------
        // MÉLANGER LES CARTES
        // ------------------------------------------

        // Appeler la fonction qui mélange les cartes
        melangerCartes();

    }


    // ==========================================
    // GESTION DE LA BARRE ESPACE
    // ==========================================

    // Écouter les touches du clavier
    document.addEventListener("keydown", (event) => {

        // Vérifier si la touche espace a été pressée
        if (event.code === "Space") {

            // Relancer une nouvelle partie
            reinitialiserJeu();
        }

    });


    // ==========================================
    // FONCTION : MÉLANGER LES CARTES
    // ==========================================

    function melangerCartes() {

        // Convertir la liste des cartes en tableau JavaScript
        const cartesArray = Array.from(cartes);

        // Mélanger les cartes de manière aléatoire
        cartesArray.sort(() => Math.random() - 0.5);


        // ------------------------------------------
        // REMETTRE LES CARTES DANS LE PLATEAU
        // ------------------------------------------

        // Parcourir les cartes mélangées
        cartesArray.forEach((carte) => {

            // Ajouter chaque carte dans le plateau
            // leur position change selon l'ordre du tableau
            plateau.appendChild(carte);

        });

    }


    // ==========================================
    // LANCEMENT INITIAL DU JEU
    // ==========================================

    melangerCartes();

});