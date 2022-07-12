let profile = new Profile("Player", 5000);
const affichageScore = document.querySelector(".affichageScore");
const chatACliquer1 = document.querySelector(".chatACliquer1");
const clicPlusUnImage = document.querySelector(".clicPlusUnImage");
const superPattouneBonus = document.querySelector(".superPattouneBonus");
const pattouneHeader = document.querySelector(".pattouneHeader > div");
const affichageCostPattoune = document.querySelector(".costPattoune");
const buildingsPanel = document.querySelector(".buildings-panel");

// AU CLIC 

function clicPlusUn () {
chatACliquer1.addEventListener("click", () => {
profile.cats++;
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

/*function superPattouneFunction () {
  superPattouneBonus.addEventListener("click", () => {
    profile.buildings[0]++;
    var costPattoune = getBuildingCost(0);
    costPattoune = Math.ceil(costPattoune);
    profile.cats = profile.cats - costPattoune;
    profile.cats = Math.ceil(profile.cats);
    setInterval(superPattouneCalc, 10000);
  })
  }
*/
function spawnBuilding(building){

        buildingsPanel.innerHTML += `
         <div class="${building.name}Container"> 
                <span class="titre-bonus">${building.name}</span>
                <div class="${building.name} prix">${building.costBase}</div>
                <img class="${building.name}Bonus" src="${building.asset}">
            </div>
        `
}

  function superPattouneCalc () {
    profile.cats = profile.cats + (1 * profile.buildings[0] / profile.buildings[0]);
  }


function gameLoop() {
  let costPattouneArrondi = getBuildingCost(0) * 1.15;
  costPattouneArrondi = Math.ceil(costPattouneArrondi);
  if (profile.buildings[0] == 0) {
    pattouneHeader.style.display = "none";
  } if (profile.buildings[0] >= 1) {
    pattouneHeader.style.display = "block";
  }
  //affichageCostPattoune.innerHTML = `${costPattouneArrondi}`;
  pattouneHeader.innerHTML = `Nombre de pattounes achetées <span>${profile.buildings[0]}</span>
  <br/>
  Ce bonus rapporte ${profile.buildings[0] / 10} chat(s) toutes les secondes !`;
  affichageScore.textContent = `${profile.cats}`;
  if (profile.cats <= costPattouneArrondi) {
      //superPattouneBonus.style.display = "none";
    } else {
     // superPattouneBonus.style.display = "block";
    }
}

initialize();
clicPlusUn();
//superPattouneFunction();