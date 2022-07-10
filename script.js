let score = 4000;
let compteurBonusPattoune = 0;
let pattouneBuilding = 0;
let buildings;
let costPattoune = 100 * 1.5 * compteurBonusPattoune * pattouneBuilding;
const affichageScore = document.querySelector(".affichageScore");
const chatACliquer1 = document.querySelector(".chatACliquer1");
const clicPlusUnImage = document.querySelector(".clicPlusUnImage");
const superPattouneBonus = document.querySelector(".superPattouneBonus");
const pattouneHeader = document.querySelector(".pattouneHeader");


// AU CLIC 

function clicPlusUn () {
chatACliquer1.addEventListener("click", () => {
score++;
animationPlusUn();
});
};


function animationPlusUn () {
  clicPlusUnImage.classList.add("clicAnimPlusUn");
setTimeout(function () {
  clicPlusUnImage.classList.remove("clicAnimPlusUn");
}, 150);
}

// SUPER PATTOUNE

function superPattouneFunction () {
  superPattouneBonus.addEventListener("click", () => {
    compteurBonusPattoune++;
    pattouneBuilding = 1;
    costPattoune = 100 * 1.5 * compteurBonusPattoune * pattouneBuilding;
    console.log("pattouneBuilding " + pattouneBuilding);
    console.log("Compteur bonus Pattoune " + compteurBonusPattoune);
    setInterval(superPattouneCalc, 5000);

    console.log(costPattoune);
    score = score - costPattoune;
  })
  }

  function superPattouneCalc () {
    score = score + compteurBonusPattoune * 1;
  }




setInterval(() => {
  pattouneHeader.textContent = `Nombre de pattounes achetées ${compteurBonusPattoune} prochain cout de pattoune ${costPattoune + 150}`;
  affichageScore.textContent = `${score}`;

  function affichageSuperPattouneBonus () {
    if (score <= costPattoune + 150) {
      console.log("costPattoune " + costPattoune);
      superPattouneBonus.style.display = "none";
    } else {
      superPattouneBonus.style.display = "block";
    }
  };

  affichageSuperPattouneBonus();
}, 1)


clicPlusUn();
superPattouneFunction();


