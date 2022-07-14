let profile = new Profile('Player', 3000)
const affichageScore = document.querySelector('.affichageScore')
const chatACliquer1 = document.querySelector('.chatACliquer1')
const clicPlusUnImage = document.querySelector('.clicPlusUnImage')
const pattouneHeader = document.querySelector('.pattouneHeader > div')
const affichageCostPattoune = document.querySelector('.costPattoune')
const buildingsPanel = document.querySelector('.buildings-panel')
const mainHeader = document.querySelector(".main-header");

mainHeader.innerHTML = `
<span>Nombre de chats par seconde</span>
<p>000</p>`

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


const mainHeaderContent = document.querySelector(".main-header-content");

function affichageMain (data, building) {

  let calcBuildingParSeconde = profile.buildings[building.id] * building.catPerSecond;
  const mainHeaderContent = document.querySelector(".main-header-content");

if(data > 0){

  let mainBuilding = document.querySelector(`.main-building${[building.id]}`);

  if (mainBuilding)
  {
  mainHeaderContent.innerHTML = `
  <div class="main-building${building.id} main-building-style"> 
  <div>
  Nombre de <b>${building.name}</b> acheté(es) ; <span> ${profile.buildings[building.id]} <i class="fas fa-paw"></i></span>
    <br/>
    <p>Ce bonus rapporte ${calcBuildingParSeconde} chat(s) toutes les secondes !</p>
    </div>`
} else {
  mainHeaderContent.innerHTML += `
<div class="main-building${building.id} main-building-style"> 
<div>
Nombre de <b>${building.name}</b> acheté(es) ; <span> ${profile.buildings[building.id]} <i class="fas fa-paw"></i></span>
  <br/>
  <p>Ce bonus rapporte ${calcBuildingParSeconde} chat(s) toutes les secondes !</p>
  </div>`
}
}
}


function spawnBuilding(building) {
  let calcBuildingParSeconde = profile.buildings[building.id] * building.catPerSecond; 
  let calcBuildingParSecondeNext = calcBuildingParSeconde * 1.15;
  let calcBuildingParSecondeNextArrondi = Math.ceil(calcBuildingParSecondeNext);


  buildingsPanel.innerHTML += `
         <div class="building${building.id}"> 
         <div class="building-hover"><div>${building.description}
         <br>
         <span>Rapporte ${calcBuildingParSecondeNextArrondi} chat(s) par seconde.<span></div></div>
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
  }
}

function checkLoop() {
  for (let i = 0; i < buildingsData.length; i++) 
  {
    let costArrondi = getBuildingCost(i) * 1.15

    costArrondi = Math.ceil(costArrondi)
    
    var currentPanel = document.querySelector(`.buildingPrix${buildingsData[i].id}`);
    let bonus = document.querySelector(`.Bonus${buildingsData[i].id}`);

    currentPanel.innerHTML = `${nFormatter(costArrondi,3)}`;
    
    affichageScore.textContent = `${nFormatter(profile.cats,3)}`
    if (profile.cats <= costArrondi) {
      bonus.style.display = "none";
    } else {
       bonus.style.display = "block";
    }
    affichageMain(profile.buildings[i], buildingsData[i]);
  }
}

function metaLoop(){
 profile.saveData();
}

initialize();
clicPlusUn();
profile.loadData();
