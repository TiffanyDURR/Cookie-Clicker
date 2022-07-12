let profile = new Profile('Player', 3000)
const affichageScore = document.querySelector('.affichageScore')
const chatACliquer1 = document.querySelector('.chatACliquer1')
const clicPlusUnImage = document.querySelector('.clicPlusUnImage')
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

function spawnBuilding(building) {
  buildingsPanel.innerHTML += `
         <div class="building${building.id}"> 
                <span class="titre-bonus">${building.name}</span>
                <div class="buildingPrix${building.id} prix">${building.costBase}</div>
                <img class="Bonus${building.id}" src="./assets/${building.asset}">
            </div>
        `
}

function buildingDelegate(building) {
  let test = `.building${building.id}`
  let panel = document.querySelector(test)

  panel.addEventListener('click', () => buildingClick(building))
}

function buildingClick(building) {
  console.log('Building click' + building.id)
  let cost = getBuildingCost(building.id - 1)
  cost = Math.ceil(cost)

  if (cost <= profile.cats)
  {
  profile.buildings[building.id - 1]++
  profile.cats = profile.cats - cost
  profile.cats = Math.ceil(profile.cats)
}
}

function gameLoop() {
  for (let i = 0; i < profile.buildings.length; i++) {
    profile.cats += buildingsData[i].catPerSecond * profile.buildings[i];

    console.log(profile.cats);
    console.log("add : " + buildingsData[i].catPerSecond * profile.buildings[i]);
  }
}

function checkLoop() {
  for (let i = 0; i < buildingsData.length; i++) 
  {
    let costArrondi = getBuildingCost(i) * 1.15

    costArrondi = Math.ceil(costArrondi)

    if (profile.buildings[0] == 0) { // A enlever quand chaque building aura son texte au milieu
      pattouneHeader.style.display = 'none'
    }

    if (profile.buildings[0] >= 1) {
      pattouneHeader.style.display = 'block'
    }
    
    var currentPanel = document.querySelector(`.buildingPrix${buildingsData[i].id}`);
    let bonus = document.querySelector(`.Bonus${buildingsData[i].id}`);

    currentPanel.innerHTML = `${nFormatter(costArrondi,3)}`;
    pattouneHeader.innerHTML = `Nombre de pattounes achetées <span>${profile.buildings[0]}</span>
  <br/>
  Ce bonus rapporte ${profile.buildings[0] / 10} chat(s) toutes les secondes !`
   // affichageScore.textContent = `${nFormatter(profile.cats,3)}`
    affichageScore.textContent = `${nFormatter(profile.cats,3)}`
    if (profile.cats <= costArrondi) {
      bonus.style.display = "none";
    } else {
       bonus.style.display = "block";
    }
  }
}

function metaLoop(){
 profile.saveData();
}

initialize();
clicPlusUn();
profile.clearData();
profile.loadData();
