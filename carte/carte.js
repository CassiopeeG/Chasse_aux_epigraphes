// Déclaration d'objet(s)  
const objCarte = {
	// Déclaration des attributs de l'objet (accessibles à toutes les méthodes de l'objet)
	objMap: null,
	arrMarqueurs: [],
	fltLatCentreCarte: 46.811638,
	fltLngCentreCarte: -71.223758,
	strUrlImages: '../assets/images/',
	intZoomCarte: 14,

	/**
	 * Permet de créer la carte Google Maps avec des marqueurs
	 */
	initialiser: function (strIdCarte) {
		// Création de la carte à l'aide de l'api Google Maps
		this.objMap = new google.maps.Map(document.getElementById(strIdCarte), {
			center: {
				lat: this.fltLatCentreCarte,
				lng: this.fltLngCentreCarte
			},
			scrollwheel: false,
			zoom: this.intZoomCarte
		});
		// demande de création des marqueurs
		this.creerMarqueurs();
	},

	/**
	 * Permet de créer tous les marqueurs sur la carte à partir du JSON
	 */
	creerMarqueurs: function () {
		// Boucle for qui se répétera tant qu'il y aura 
		// des clés de premier niveau (strIdEpigraphe) 
		// dans l'objet objJSONepigraphes
		for (let strIdEpigraphe in objJSONepigraphes) {
			const objEpigrapheCourant = objJSONepigraphes[strIdEpigraphe];

			const strGabaritContenuInfobulle =
			`<div class="infobulle">
				<div class="image">
				<img width="120" src="../assets/images/ImgGalerie/mobile/${strIdEpigraphe}.png"/></img>
				</div>
				<div class="titre">${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}</div>
				<div class="adresse">Adresse : ${objEpigrapheCourant.ADRESSE}</div>
				<a class="btn" href="../fiches/fiche.html?id=${strIdEpigraphe}&titre=${objEpigrapheCourant.PRENOM}-${objEpigrapheCourant.NOM}">Consulter la fiche de ${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}</a>
			</div>`;

			const objInfobulle = new google.maps.InfoWindow({
				content: strGabaritContenuInfobulle
			});

			//Récupère le tableau des fiches visitées disponible dans le local storage
			let refArrFichesVisites = localStorage.getItem("arrFichesVisites")
			let refUrlMarqueur = "marqueurs/landmark-orchid.svg"

			//Si une fiche a été visitée, et si le tableau contient l'Id d'un épigraphe, le marqueur est changé pour une autre couleur
			if(refArrFichesVisites){
				if(refArrFichesVisites.includes(strIdEpigraphe) == true){
					refUrlMarqueur = "marqueurs/landmark-navy.svg"
				}
			}
			
			const objMarqueur = new google.maps.Marker({
				position: new google.maps.LatLng(objEpigrapheCourant.LATITUDE, objEpigrapheCourant.LONGITUDE),
				title: objEpigrapheCourant.IMAGE.TITRE,
				map: this.objMap,
				icon: `${this.strUrlImages}${refUrlMarqueur}`,
				infowindow: objInfobulle
			});

			// Ajout de l'écouteur d'événements click qui lancera 
			// la fermeture de toutes les infobulles
			// avant d'ouvrir l'infobulle liée au marqueur cliqué
			objMarqueur.addListener('click', function () {
				objCarte.fermerToutesInfobulles();
				this.infowindow.open(objCarte.objMap, this);
			});

			this.arrMarqueurs.push(objMarqueur);
		}
	},

	/**
	 * Permet de fermer toute les infobulles de la carte
	 */
	fermerToutesInfobulles: function () {
		this.arrMarqueurs.forEach(function (objMarqueur) {
			objMarqueur.infowindow.close();
		});
	}
};

objCarte.initialiser('carte');