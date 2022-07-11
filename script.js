let score = 3000;
let compteurBonusPattoune = 0;
let pattouneBuilding = 0;
let costPattoune = 100 * 1.15 ** (compteurBonusPattoune);
const affichageScore = document.querySelector(".affichageScore");
const chatACliquer1 = document.querySelector(".chatACliquer1");
const clicPlusUnImage = document.querySelector(".clicPlusUnImage");
const superPattouneBonus = document.querySelector(".superPattouneBonus");
const pattouneHeader = document.querySelector(".pattouneHeader > div");


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
    costPattoune = 100 * 1.15 ** (compteurBonusPattoune);
    costPattoune = Math.ceil(costPattoune);
    score = score - costPattoune;
    score = Math.ceil(score);
    setInterval(superPattouneCalc, 10000);
  })
  }

  function superPattouneCalc () {
    score = score + (1 * compteurBonusPattoune / compteurBonusPattoune);
  }


setInterval(() => {
  let costPattouneArrondi = costPattoune * 1.15;
  costPattouneArrondi = Math.ceil(costPattouneArrondi);
  if (compteurBonusPattoune == 0) {
    pattouneHeader.style.display = "none";
  } if (compteurBonusPattoune >= 1) {
    pattouneHeader.style.display = "block";
  }
  pattouneHeader.innerHTML = `Nombre de pattounes achetées <span>${compteurBonusPattoune}</span> prochain cout de pattoune ${costPattouneArrondi}
  <br/>
  Ce bonus rapporte ${compteurBonusPattoune / 10} chat(s) toutes les secondes !`;
  affichageScore.textContent = `${score}`;
    if (score <= costPattouneArrondi) {
      superPattouneBonus.style.display = "none";
    } else {
      superPattouneBonus.style.display = "block";
    }
}, 1)


clicPlusUn();
superPattouneFunction();


