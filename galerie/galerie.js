document.addEventListener("DOMContentLoaded", function () {
    const boutonsType = document.querySelectorAll('input[name="type_indice"]');
    const boutonsSecteur = document.querySelectorAll('input[name="secteur_activite"]');
    const elementsGalerie = document.querySelectorAll(".galerie a");


    function filtrerGalerie() {
        let typeChoisi = "";
        for (let bouton of boutonsType) {
            if (bouton.checked) {
                typeChoisi = bouton.value; 
                break;
            }
        }


        let typeConverti = typeChoisi;
        if (typeChoisi === "personnages") {
            typeConverti = "personnage";
        } else if (typeChoisi === "objets") {
            typeConverti = "objet";
        } else if (typeChoisi === "lieux") {
            typeConverti = "lieu";
        }


        let secteurChoisi = "";
        for (let bouton of boutonsSecteur) {
            if (bouton.checked) {
                secteurChoisi = bouton.value; 
                break;
            }
        }

        for (let element of elementsGalerie) { 
            const lien = element.getAttribute("href");
            const id = lien.split("id=")[1]; 


            const donnees = objJSONepigraphes[id];
            if (!donnees) {
                element.style.display = "none";
                continue;
            }

   
            const categorie = donnees.CHASSE.CATEGORIE;
            let domaine = donnees.DOMAINE;

   
            if (domaine === "Arts visuels") {
                domaine = "art_visuels";
            } else if (domaine === "Sciences et Lettres") {
                domaine = "sciences_et_lettres";
            } else if (domaine === "Sports et spectacles") {
                domaine = "sport_et_spectacles";
            } else if (domaine === "Économie et politique") {
                domaine = "economie_et_politique";
            }

 
            let correspondType = true; 
            if (typeChoisi !== "") {
                correspondType = (categorie === typeConverti); 
            }

            let correspondSecteur = true; 
            if (secteurChoisi !== "") {
                correspondSecteur = (domaine === secteurChoisi);
            }


            if (correspondType && correspondSecteur) {
                element.style.display = ""; 
            } else {
                element.style.display = "none"; 
            }
        }
    }

    for (let bouton of boutonsType) {
        bouton.addEventListener("change", filtrerGalerie);
    }
    for (let bouton of boutonsSecteur) {
        bouton.addEventListener("change", filtrerGalerie);
    }

    filtrerGalerie();
});