/* Variables globales */
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");
const arrIndicesAValider = ["personnage", "objet", "lieu"]

//*************************
// Écouteurs d'événements 
//*************************
window.addEventListener("load", afficherIndice)
window.addEventListener("load", initialiser)
document.getElementById("btnDebuterChasse").addEventListener("click", demarrerChasse);
document.getElementById("btnDemarrerNouvelleChasse").addEventListener("click", reactiverBoutonDebuterChasse);

//*************************
// Fonctions 
//*************************

/**
 * Sert à démarrer la Chasse, soit piger l'énigme, 
 */
function demarrerChasse() {
    //Tirage au sort dans les tableaux des possibilités et mise en localStorage

    //Personnages
    let intNumeroPigee = tirerAuSort(arrIdsPersonnagesAPiger.length)
    const strIdPersonnage = arrIdsPersonnagesAPiger[intNumeroPigee]
    localStorage.id_personnage = strIdPersonnage
    localStorage.personnage_est_trouve = false
    localStorage.personnage_reponse = ""
    //Objets
    intNumeroPigee = tirerAuSort(arrIdsObjetsAPiger.length)
    const strIdObjet = arrIdsObjetsAPiger[intNumeroPigee]
    localStorage.id_objet = strIdObjet
    localStorage.objet_est_trouve = false
    localStorage.objet_reponse = ""
    //Lieux
    intNumeroPigee = tirerAuSort(arrIdsLieuxAPiger.length)
    const strIdLieu = arrIdsLieuxAPiger[intNumeroPigee]
    localStorage.id_lieu = strIdLieu
    localStorage.lieu_est_trouve = false
    localStorage.lieu_reponse = ""
    
    localStorage.id_chasseEnCours = "true"
    localStorage.arrFichesVisites = ""

    afficherIndice()
    initialiser()
}

/**
 * Sert à afficher les indices et la zoneÉnigme
 */
function afficherIndice(){
    if(localStorage.getItem("id_chasseEnCours") == "true"){
        //Afficher la zoneÉnigme
        document.getElementById("zoneEnigme").removeAttribute("hidden")
        //Afficher le segment qui parle du personnage
        document.getElementById("segmentPersonnage").innerHTML = objJSONepigraphes[localStorage.getItem("id_personnage")].CHASSE.INDICE;
        //Afficher le segment qui parle de l'objet
        document.getElementById("segmentObjet").innerHTML = objJSONepigraphes[localStorage.getItem("id_objet")].CHASSE.INDICE;
        //Afficher le segment qui parle du lieu
        document.getElementById("segmentLieu").innerHTML = objJSONepigraphes[localStorage.getItem("id_lieu")].CHASSE.INDICE;

        // Afficher l'indice personnage
        document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[localStorage.getItem("id_personnage")].CHASSE.INDICE;
        // Afficher l'indice objet
        document.getElementById("objetIndice").innerHTML = objJSONepigraphes[localStorage.getItem("id_objet")].CHASSE.INDICE;
        // Afficher l'indice lieu
        document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[localStorage.getItem("id_lieu")].CHASSE.INDICE;
    }
}
    

/**
 * Fonction appelé lors de la pige de la chasse pour tirer un nombre au sort
 * @param {*} max nombre maximum qui peut être pigé
 * @returns un numéro au hasard
 */
function tirerAuSort(max) {
    return Math.floor(Math.random() * max);
  }

/**
 * Fonction pour réactiver le bouton "Débuter Chasse", et autoriser de piger une nouvelle chasse
 */
function reactiverBoutonDebuterChasse() {
    document.getElementById("btnDebuterChasse").removeAttribute("hidden")
}


/**
 * Fonction pour mettre à jour les messages, indices et boutons 
 */
function initialiser() {
    if(localStorage.getItem("id_chasseEnCours") == "true"){

    //Afficher le message de chasse en cour
    document.getElementById("messageEtatChasse").innerHTML = "Chasse en cours"

    //Désactiver le bouton débuterChasse
    document.getElementById("btnDebuterChasse").setAttribute("hidden", true)
    //Affiher le bouton debuterNouvelleChasse
    document.getElementById("btnDemarrerNouvelleChasse").removeAttribute("hidden")

    // Afficher le lien "Chercher des indices"
    document.getElementById("lienChercherIndices").removeAttribute("hidden")
    }

    //Boucle pour valider si un indice à été trouvé
    for(let indiceAValider in arrIndicesAValider){
        //Variables
        let nomCategorie = arrIndicesAValider[indiceAValider]
        let refIndiceEstTrouve = localStorage.getItem(nomCategorie + "_est_trouve")

        //Si un indice à été trouvé
        if(refIndiceEstTrouve == "true"){

            //Afficher la rétroaction "trouvé"
            document.getElementById(nomCategorie + "MessageTrouve").removeAttribute("hidden")

            //Remplacer le "?" par la réponse
            document.getElementById(nomCategorie + "Indice").innerHTML = localStorage.getItem(nomCategorie + "_reponse")
        }
    }

    //Si les trois indices ont été trouvés
    if(localStorage.getItem("personnage_est_trouve") == "true" 
        && localStorage.getItem("objet_est_trouve") == "true"
        && localStorage.getItem("lieu_est_trouve") == "true"){

        //Enlever le message "chasse en cour"
        document.getElementById("messageEtatChasse").setAttribute("hidden", true)

        //Enlever la zone chercherIndices
        document.getElementById("lienChercherIndices").setAttribute("hidden", true)

        //Ajouter message Chasse Completé
        document.getElementById("zoneMessageChasseCompletee").removeAttribute("hidden")
    }
}

