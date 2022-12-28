let profile = new Profile('Player', 10000);
const affichageScore = document.querySelector('.affichageScore');
const chatACliquer1 = document.querySelector('.chatACliquer1');
const clicPlusUnImage = document.querySelector('.clicPlusUnImage');
const pattouneHeader = document.querySelector('.pattouneHeader > div');
const affichageCostPattoune = document.querySelector('.costPattoune');
const buildingsPanel = document.querySelector('.buildings-panel');
const mainHeader = document.querySelector(".main-header");
const cpsGeneral = document.getElementById("cpsGeneral");
const mainHeaderContent = document.querySelector(".main-header-content");
const refugeName = document.getElementById("refuge-name");
const buttonCheck = document.querySelector(".button-check");
const refugeNameContainer = document.querySelector(".refuge-title");
const headlineTitle = document.querySelector(".headline-title");
const headlineContent = document.querySelector(".headline-content");

function loadingListeners(){
  refugeName.addEventListener("input", (e) => {
    pseudo = e.target.value; 
    refugeNameContainer.innerHTML = `${pseudo}`
  });

  buttonCheck.addEventListener("click", () => {
    refugeName.style.display = "none";
    buttonCheck.style.display = "none";
    profile.name = pseudo;
    profile.saveData();
  })

    chatACliquer1.addEventListener('click', () => {
      profile.cats++;
      clicPlusUnImage.classList.add('clicAnimPlusUn') // Erreur : clicPlusUnImage n'est pas trouvé
      setTimeout(function () { clicPlusUnImage.classList.remove('clicAnimPlusUn')}, 150)
     })
}

function affichageMain (buildingLevel, buildingData) {

  let calcBuildingParSeconde = buildingLevel * buildingData.catPerSecond;

  const mainHeaderContent = document.querySelector(".main-header-content");

  let buildingHTML = `<div class="main-building${buildingData.id} main-building-style" style="display: none;"> 
  <div>
  Nombre de <b>${buildingData.name}</b> acheté(es) ; <span class="mainCount${buildingData.id}"> ${buildingLevel} <i class="fas fa-paw"></i></span>
    <br/>
    Ce bonus rapporte  <span class = "cps${buildingData.id}">${nFormatter(calcBuildingParSeconde, 3)}</span> chat(s) toutes les secondes !
    </div>`;

    mainHeaderContent.innerHTML += buildingHTML;
}

function spawnBuilding(building) {
  // Simplifier tout ça, ou alors faire un générateur directement
  buildingsPanel.innerHTML += `
         <div class="building${building.id}"> 
         <div class="building-hover">${building.description}
         </div>
                <span class="titre-bonus">${building.name} <span id = titleCount${building.id}>(${profile.buildings[building.id - 1]})</span></span> 
                <div class="infosbonus${building.id} infosbonus"></div>
                <div class="buildingPrix${building.id} prix">${building.costBase}</div>
                <img class="Bonus${building.id}" src="./assets/${building.asset}">
            </div>
        `      
    affichageMain(profile.buildings[building.id-1], building);
}

function buildingDelegate(building) {
  let panel = document.querySelector(`.building${building.id}`);

  refreshNextCost(building);

  panel.addEventListener('click', () => buildingClick(building));
}

function buildingClick(building) {
  let cost = getBuildingCost(building.id - 1);
  cost = Math.ceil(cost);

  if (cost <= profile.cats)
  {
    profile.buildings[building.id - 1]++;
    profile.spendCats(cost);
  }

  refreshNextCost(building);
}

function refreshNextCost(building) {
  let infosBonus = document.querySelector(`.infosbonus${building.id}`);
  let titleBonus = document.getElementById(`titleCount${building.id}`);
  let calcBuildingParSecondeNext = (profile.buildings[building.id - 1] + 1) * building.catPerSecond;

  infosBonus.innerHTML = `${nFormatter(calcBuildingParSecondeNext)} chat(s) / s`;
  titleBonus.innerHTML = `(${profile.buildings[building.id - 1]})`;
}

function changeHeadlines() {
  let headline = pickRandomHeadline(profile);

  headlineTitle.innerHTML = headline.title;
  headlineContent.innerHTML = headline.content;
}

function refreshMain(building) {

  let calcBuildingParSeconde = profile.buildings[building.id - 1] * buildingsData[building.id - 1].catPerSecond;

  let mainBuilding = document.querySelector(`.main-building${[building.id]}`);
  let spanCount = document.querySelector(`.mainCount${building.id}`);
  let spanCPS = document.querySelector(`.cps${[building.id]}`);

  spanCPS.innerHTML = `${nFormatter(calcBuildingParSeconde, 3)}`;
  spanCount.innerHTML = `<span class="mainCount${building.id}"> ${profile.buildings[building.id -1]} <i class="fas fa-paw"></i></span>`; // Simplifier comme au dessus

  if (profile.buildings[building.id -1] > 0){
    mainBuilding.style.display = "";
  }
}

function refreshScore(){

  let catPerLoop = getTotalCatsPerSecond() / 100;

  profile.cats += catPerLoop;

  affichageScore.textContent = `${nFormatter(profile.cats, 3)}`;
}

function gameLoop() {
    //profile.cats += getTotalCatsPerSecond();
}

function checkLoop() {
  refreshScore();

  cpsGeneral.innerHTML = `${nFormatter(getTotalCatsPerSecond(), 1)}`;

  for (let i = 0; i < buildingsData.length; i++) // TODO : Mettre tout ça dans une méthode a part
  {
    let costArrondi = getBuildingCost(i) * 1.15; // TODO : Appeller directement la méthode qu'il faut

    costArrondi = Math.ceil(costArrondi);
    
    var currentPanel = document.querySelector(`.buildingPrix${buildingsData[i].id}`);
    let bonus = document.querySelector(`.Bonus${buildingsData[i].id}`);

    currentPanel.innerHTML = `${nFormatter(costArrondi, 3)}`;
    
    if (profile.cats <= costArrondi) {
      bonus.style.display = "none";
    } 
    
    else {
       bonus.style.display = "block";
    }

    refreshMain(buildingsData[i]);
  }
}

function metaLoop(){
  profile.saveData();
  changeHeadlines();
}

function initialize(){
  loadingListeners();
  loadingGameData();
  loadingNewsData(); 
  profile.loadData();
  refugeNameContainer.innerHTML = profile.name;

  if (profile.name != "Player")
  {
    refugeName.style.display = "none";
    buttonCheck.style.display = "none";
  }
}

initialize();