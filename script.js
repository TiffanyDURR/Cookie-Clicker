let profile = new Profile('Player', 5000)
const affichageScore = document.querySelector('.affichageScore')
const chatACliquer1 = document.querySelector('.chatACliquer1')
const clicPlusUnImage = document.querySelector('.clicPlusUnImage')
const superPattouneBonus = document.querySelector('.superPattouneBonus')
const pattouneHeader = document.querySelector('.pattouneHeader > div')
const affichageCostPattoune = document.querySelector('.costPattoune')
const buildingsPanel = document.querySelector('.buildings-panel')

// AU CLIC

function clicPlusUn() {
  chatACliquer1.addEventListener('click', () => {
    profile.cats++
    animationPlusUn()
  })
}

function animationPlusUn() {
  clicPlusUnImage.classList.add('clicAnimPlusUn')
  setTimeout(function () {
    clicPlusUnImage.classList.remove('clicAnimPlusUn')
  }, 150)
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
function spawnBuilding(building) {
  buildingsPanel.innerHTML += `
         <div class="building${building.id}"> 
                <span class="titre-bonus">${building.name}</span>
                <div class="${building.id} prix">${building.costBase}</div>
                <img class="${building.id}Bonus" src="./assets/${building.asset}">
            </div>
        `
}

function buildingDelegate(building){
 
  let test = `.building${building.id}`
  let panel = document.querySelector(test)

  panel.addEventListener("click", () => buildingClick(building))
}

function buildingClick(building) {
  console.log('Building click' + building.id)
  profile.buildings[building.id - 1]++
  let cost = getBuildingCost(building.id - 1)
  cost = Math.ceil(cost)
  profile.cats = profile.cats - cost
  profile.cats = Math.ceil(profile.cats)
}

function superPattouneCalc() {
  profile.cats = profile.cats + (1 * profile.buildings[0]) / profile.buildings[0]
}

function gameLoop() {
  
  for (let i = 0; i < profile.buildings.length;i++)
  {
    profile.cats += buildingsData[i].catPerSecond * profile.buildings[i];
  }
}

function checkLoop() {
  let costArrondi = getBuildingCost(0) * 1.15
  costArrondi = Math.ceil(costArrondi)
  if (profile.buildings[0] == 0) {
    pattouneHeader.style.display = 'none'
  }
  if (profile.buildings[0] >= 1) {
    pattouneHeader.style.display = 'block'
  }
  //affichageCostPattoune.innerHTML = `${costPattouneArrondi}`;
  pattouneHeader.innerHTML = `Nombre de pattounes achetées <span>${
    profile.buildings[0]
  }</span>
  <br/>
  Ce bonus rapporte ${profile.buildings[0] / 10} chat(s) toutes les secondes !`
  affichageScore.textContent = `${profile.cats}`
  if (profile.cats <= costArrondi) {
    //superPattouneBonus.style.display = "none";
  } else {
    // superPattouneBonus.style.display = "block";
  }
}

initialize()
clicPlusUn()
//superPattouneFunction();
