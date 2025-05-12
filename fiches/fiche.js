
function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam)
}

//Variable globale
let intIdFicheCourante = obtenirValeurUrlParam("id")

//*************************
// Écouteurs d'événements 
//*************************
window.addEventListener("load", initialiser);
document.getElementById("btnSoumettre").addEventListener("click", validerPieceConviction);

//*************************
// Fonctions 
//*************************
/**
 * Fonction pour initialiser la fiche, et ainsi la mettre à jour grâce à l'id dans l'URL
 */
function initialiser(){
    let prenom = objJSONepigraphes[intIdFicheCourante].PRENOM
    let nom = objJSONepigraphes[intIdFicheCourante].NOM
    let nomComplet = prenom + " " + nom

    // AJOUT DU LOCAL STORAGE POUR LA CARTE GOOGLE MAP
    localStorage.arrFichesVisites += ", " + intIdFicheCourante 

    //Title
    document.querySelector("title").innerHTML = nomComplet

    //Nom et Prénom
    document.getElementById("nomComplet").innerHTML = nomComplet

    //Domaine
    document.getElementById("domaine").innerHTML = objJSONepigraphes[intIdFicheCourante].DOMAINE
        
    //Image Principale Source
    document.getElementById("url_image").src = "../assets/images/ImgGalerie/table/" + intIdFicheCourante + ".png"
    //Image Principale Alt
    document.getElementById("url_image").alr = "Image de " + nomComplet + ".png"

    //Titre Image
    document.getElementById("titre_image").innerHTML = objJSONepigraphes[intIdFicheCourante].IMAGE.TITRE

    //Credit Image
    document.getElementById("credit_image").innerHTML = objJSONepigraphes[intIdFicheCourante].IMAGE.CREDIT

    //Notes Biographiques
    document.querySelector("#notes_biographiques > p").innerHTML = objJSONepigraphes[intIdFicheCourante].BIOGRAPHIE

    //Image Localisation
    document.getElementById("carteZoom").src = "../assets/images/imgGoogleMap/" + intIdFicheCourante + "-zoom-google-maps.png"

    //Arrondissement
    document.getElementById("arrondissement").innerHTML = objJSONepigraphes[intIdFicheCourante].ARRONDISSEMENT

    //Quartier
    document.getElementById("quartier").innerHTML = objJSONepigraphes[intIdFicheCourante].QUARTIER
    
    //Adresse
    document.getElementById("adresse").innerHTML = objJSONepigraphes[intIdFicheCourante].ADRESSE

    // Épigraphe Source
    document.getElementById("url_plaque").src = "../assets/images/epigraphes/epigraphe_" + intIdFicheCourante + ".png"
    // Épigraphe Alt
    document.getElementById("url_plaque").alt = "Épigraphe de " + nomComplet

    //Transcription
    document.getElementById("transcript").innerHTML = objJSONepigraphes[intIdFicheCourante].PLAQUE_TRANSCRIPTION

    //Capsule Sonore URL
    document.getElementById("audio_url").src = objJSONepigraphes[intIdFicheCourante].AUDIO.URL

    //Capsule Sonore Preambule
    document.getElementById("audio_preambule").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.DESCRIPTION
    
    //Capsule Sonore Transcription
    document.getElementById("audio_transcription").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.TRANSCRIPTION
    
    //Capsule Sonore Credit
    document.getElementById("audio_credit").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.CREDIT
    
    //Capsule Sonore Credit
    document.getElementById("audio_credit").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.CREDIT

    //Sert à afficher la zone pour soumettre un indice si la chasse est en cour
    if(localStorage.id_chasseEnCours == "true"){
        document.getElementById("zoneAucuneChasseEnCours").hidden = true
        document.getElementById("zoneChasseEnCours").hidden = false
    }
}

obtenirValeurUrlParam()

/**
 * Fonction pour valider si l'indice soumis est le bon, et afficher les rétroaction
 */
function validerPieceConviction() {
    const refRadioCoche = document.querySelector('[name="formChasse"]:checked');
    const refMessage = document.getElementById('message'); 

    //Si bouton pas coché
    if(refRadioCoche == null){
        refMessage.innerHTML = "Veuillez sélectionner un élément."
    } //Si bonne réponse
    else if(intIdFicheCourante == localStorage.getItem("id_" + refRadioCoche.value)){
        //Variables locales
        const categorie = refRadioCoche.value
        let strReponse = objJSONepigraphes[intIdFicheCourante].CHASSE.REPONSE
        let strPersonnageTrouvé = objJSONepigraphes[intIdFicheCourante].PRENOM + " " + objJSONepigraphes[intIdFicheCourante].NOM
        let indiceTrouve = categorie + "_est_trouve"

        //Affiche la réponse
        refMessage.innerHTML = "Bravo! Vous avez trouvé " + strReponse 
        //Change [l'indice]_est_trouve dans le local storage pour true
        localStorage.setItem(indiceTrouve, "true")
        //Mettre la reponse dans le localStorage pour afficher dans la chasse
        localStorage.setItem(categorie + "_reponse", strPersonnageTrouvé)

        //Si c'est le dernier indice trouvé
        if(localStorage.getItem("personnage_est_trouve") == "true" 
        && localStorage.getItem("objet_est_trouve") == "true"
        && localStorage.getItem("lieu_est_trouve") == "true"){

            refMessage.innerHTML = "Bravo! Vous avez terminé la chasse, vous pouvez maintenant participer au Concours!"
        }
    }
    //Si mauvaise réponse
    else{ 
        refMessage.innerHTML = "Désolé. Ce n’est pas le bon élément."
    }
}


