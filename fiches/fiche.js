
function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam)
}

let intIdFicheCourante = obtenirValeurUrlParam("id")

function initialiser(id){
    let prenom = objJSONepigraphes[id].PRENOM
    let nom = objJSONepigraphes[id].NOM
    let nomComplet = prenom + " " + nom

    //Title
    document.querySelector("title").innerHTML = nomComplet

    //Nom et Prénom
    document.getElementById("nomComplet").innerHTML = nomComplet

    //Domaine
    document.getElementById("domaine").innerHTML = objJSONepigraphes[id].DOMAINE
        
    //Image Principale Source
    document.getElementById("url_image").src = "../assets/images/ImgGalerie/table/" + id + ".png"
    //Image Principale Alt
    document.getElementById("url_image").alr = "Image de " + nomComplet + ".png"

    //Titre Image
    document.getElementById("titre_image").innerHTML = objJSONepigraphes[id].IMAGE.TITRE

    //Credit Image
    document.getElementById("credit_image").innerHTML = objJSONepigraphes[id].IMAGE.CREDIT

    //Notes Biographiques
    document.querySelector("#notes_biographiques > p").innerHTML = objJSONepigraphes[id].BIOGRAPHIE

    //Image Localisation
    document.getElementById("carteZoom").src = "../assets/images/imgGoogleMap/" + id + "-zoom-google-maps.png"

    //Arrondissement
    document.getElementById("arrondissement").innerHTML = objJSONepigraphes[id].ARRONDISSEMENT

    //Quartier
    document.getElementById("quartier").innerHTML = objJSONepigraphes[id].QUARTIER
    
    //Adresse
    document.getElementById("adresse").innerHTML = objJSONepigraphes[id].ADRESSE

    // Épigraphe Source
    document.getElementById("url_plaque").src = "../assets/images/epigraphes/epigraphe_" + id + ".png"
    // Épigraphe Alt
    document.getElementById("url_plaque").alt = "Épigraphe de " + nomComplet

    //Transcription
    document.getElementById("transcript").innerHTML = objJSONepigraphes[id].PLAQUE_TRANSCRIPTION

    //Capsule Sonore URL
    document.getElementById("audio_url").src = objJSONepigraphes[id].AUDIO.URL

    //Capsule Sonore Preambule
    document.getElementById("audio_preambule").innerHTML = objJSONepigraphes[id].AUDIO.DESCRIPTION
    
    //Capsule Sonore Transcription
    document.getElementById("audio_transcription").innerHTML = objJSONepigraphes[id].AUDIO.TRANSCRIPTION
    
    //Capsule Sonore Credit
    document.getElementById("audio_credit").innerHTML = objJSONepigraphes[id].AUDIO.CREDIT
    
    //Capsule Sonore Credit
    document.getElementById("audio_credit").innerHTML = objJSONepigraphes[id].AUDIO.CREDIT

    
}

obtenirValeurUrlParam()

initialiser(intIdFicheCourante)




