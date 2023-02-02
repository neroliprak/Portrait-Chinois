document.addEventListener("DOMContentLoaded", function () {
  // Texte qui s'affichera en HTML 7 fois

  const texte = `    
  <div class="reponse-portrait" id="div-{{NB-DIV}}">
        <p class="analogie-portrait">Si j'étais <span class="analogie-titre"><span class="analogie-donne">{{ANALOGIE}}</span>...</span> </p>
        <div class="bloc-reponse">
          <div class="bloc-portrait">
            <img class="img-portait" src="{{IMAGE}}" alt="{{DESCRIPTION}}" />
            <p class="explication-portrait">
              <span class="valeur"> Je serais <span class="couleur-analogie blur-valeur">{{VALEUR}}</span><br><br></span> {{EXPLICATION}}
            </p>
          </div>
        </div>
  </div>
`;

  // Lien entre JS et JSON

  fetch("portraitsChinois.json")
    .then((response) => {
      return response.json();
    })
    // Remplace les différentes valeurs par les données en JSON, permet de l'afficher pour les 7 analogies.
    .then((listePortraitChinois) => {
      var count = 1;
      listePortraitChinois.forEach((portraitChinois) => {
        document.querySelector(".liste-analogies").innerHTML += texte
          .replace("{{ANALOGIE}}", portraitChinois.analogie)
          .replace("{{VALEUR}}", portraitChinois.valeur)
          .replace("{{EXPLICATION}}", portraitChinois.explication)
          .replace("{{IMAGE}}", portraitChinois.img)
          .replace("{{DESCRIPTION}}", portraitChinois.description)
          .replace("{{NB-DIV}}", count);
        count += 1;
      });
    });

  // Mode jour et mode nuit : Lorsque l'on clique sur la pastille "dans la barre de navigation"
  // Variable permettant de savoir dans quel mode on est.

  var night = true;
  document
    .querySelector(".change-color")
    .addEventListener("click", function (e) {
      if (night == true) {
        document.body.style.color = "black";
        document.querySelector(".navbar").style.color = "white";
        document.querySelector(".switch").classList.remove("switch-night");
        document.querySelector(".switch").classList.add("switch-light");
        document.querySelector(".text-change-color").classList.remove("light");
        document.querySelector(".text-change-color").classList.add("night");
        document.querySelector(".text-change-color").innerHTML = "Jour";
        document.querySelector(".home-page").classList.add("home-page-jour");
        document.querySelector(".down-arrow").classList.add("down-arrow-jour");
        document
          .querySelector(".down-arrow-fluide")
          .classList.add("down-arrow-jour");
        night = false;
      } else {
        document.body.style.color = "white";
        document.querySelector(".navbar").style.color = "white";
        document.querySelector(".switch").classList.remove("switch-light");
        document.querySelector(".switch").classList.add("switch-night");
        document.querySelector(".text-change-color").classList.remove("night");
        document.querySelector(".text-change-color").classList.add("light");
        document.querySelector(".text-change-color").innerHTML = "Nuit";
        document.querySelector(".home-page").classList.remove("home-page-jour");
        document
          .querySelector(".down-arrow")
          .classList.remove("down-arrow-jour");
        document
          .querySelector(".down-arrow-fluide")
          .classList.remove("down-arrow-jour");
        night = true;
      }
    });

  // Bouton permettant d'enlever le "blur" du formulaire

  document
    .querySelector(".bouton-formulaire")
    .addEventListener("mouseover", function (e) {
      document.querySelector(".bouton-formulaire").classList.add("supp");
      document.querySelector(".creation-portrait").classList.remove("blur");
    });

  // Lorsque l'on clique sur un des inputs, l'input change de couuleur de fond

  var inputs = document.querySelectorAll(".input-formulaire");

  inputs.forEach(function (input) {
    input.addEventListener("focus", function () {
      input.style.backgroundColor = "lightgray";
      input.style.color = "black";
      input.style.transition = "0.5s";
    });
    input.addEventListener("blur", function () {
      input.style.backgroundColor = "white";
      input.style.color = "black";
      input.style.transition = "0.5s";
    });
  });

  // Ajout d'une nouvelle analogie du portrait chinois

  const texteAnalogie = document.getElementById("analogies");
  const valeurAnalogie = document.getElementById("valeurAnalogie");
  const explicationAnalogie = document.getElementById("explication");
  const imageAnalogie = document.getElementById("image");

  // Fonction permettant d'afficher la suggestion de l'utilisateur lorsqu'il y a eu une insertion dans les inputs.

  function remplacerValeurFormulaire() {
    document.querySelector(".text-formulaire").innerHTML = texte
      .replace("{{ANALOGIE}}", texteAnalogie.value)
      .replace("{{VALEUR}}", valeurAnalogie.value)
      .replace("{{EXPLICATION}}", explicationAnalogie.value)
      .replace("{{IMAGE}}", imageAnalogie.value)
      .replace("{{DESCRIPTION}}", "");
  }

  // Lorsque l'utilisateur insère des éléments dans l'input, cela appelle la fonction du dessus.

  texteAnalogie.addEventListener("keyup", remplacerValeurFormulaire);
  valeurAnalogie.addEventListener("keyup", remplacerValeurFormulaire);
  explicationAnalogie.addEventListener("keyup", remplacerValeurFormulaire);
  imageAnalogie.addEventListener("keyup", remplacerValeurFormulaire);

  // Lors du clic sur le bouton "Envoyer", cela permet de remplacer l'URL par nos informations personnels.

  var click = document.getElementById("envoyer");
  click.addEventListener("click", function (e) {
    var url =
      "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=neroli.prak&courriel=" +
      document.getElementById("courriel").value +
      "&message=Si j'étais " +
      document.getElementById("analogies").value +
      " je serais " +
      document.getElementById("valeurAnalogie").value +
      " parceque " +
      document.getElementById("explication").value;
    console.log(url);

    //Envoi des données
    fetch(url).then(function (response) {
      response.json().then(function (data) {
        if ((data.status = "succes")) {
          document.querySelector(".erreur").innerHTML = "Le message a été reçu";
          console.log("Reçu");
        } else {
          document.querySelector(".erreur").innerHTML =
            "Le message n'a pas été envoyé";
          console.log("Non reçu");
        }
      });
    });
  });

  // Pop-up des mentions légales

  var cliquable = document.querySelector(".apparaitre-mention");
  // Lors du clique dans le texte "Mentions Légales", permet l'affichage d'une pop-up
  cliquable.addEventListener("click", function (e) {
    document.querySelector(".popup").classList.remove("popup-invisible");
    document.querySelector(".popup").classList.add("popup-visible");
  });
  // Une croix permettant de fermer la pop-up
  document.querySelector(".cross").addEventListener("click", function (e) {
    document.querySelector(".popup").classList.remove("popup-visible");
    document.querySelector(".popup").classList.add("popup-invisible");
  });
});
