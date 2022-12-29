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
  });
}

function affichageMain (buildingLevel, buildingData) {
  let calcBuildingParSeconde = buildingLevel * buildingData.catPerSecond;
  let buildingHTML = createMainBuildingTemplate(buildingData, buildingLevel, calcBuildingParSeconde)
  
  mainHeaderContent.innerHTML += buildingHTML;
}

function spawnBuilding(building) {
  buildingsPanel.innerHTML += createBuildingTemplate(building); 
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

  if (cost <= profile.cats) {
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
  let mainBuilding = document.getElementById(`main-building${building.id}`);
  let spanCount = document.getElementById(`mainCount${building.id}`);
  let spanCPS = document.querySelector(`.cps${building.id}`);

  spanCPS.innerHTML = `${nFormatter(calcBuildingParSeconde, 3)}`;
  spanCount.innerHTML = `${profile.buildings[building.id -1]}`;

  if (profile.buildings[building.id -1] > 0) {
    mainBuilding.style.display = "";
  }
}

function refreshScore() {
  let catPerLoop = getTotalCatsPerSecond() / 100;

  profile.cats += catPerLoop;

  affichageScore.textContent = `${nFormatter(profile.cats, 3)}`;
}

function refreshBuildings() {
  for (let i = 0; i < buildingsData.length; i++)
  {
    let costArrondi = getBuildingCost(i) * 1.15;

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

function gameLoop() {
    //profile.cats += getTotalCatsPerSecond();
}

function checkLoop() {
  refreshScore();
  refreshBuildings();

  cpsGeneral.innerHTML = `${nFormatter(getTotalCatsPerSecond(), 1)}`;
}

function metaLoop() {
  profile.saveData();
  changeHeadlines();
}

function initialize() {
  loadingListeners();
  loadingGameData();
  loadingNewsData(); 
  profile.loadData();
  refugeNameContainer.innerHTML = profile.name;

  if (profile.name != "Player") {
    refugeName.style.display = "none";
    buttonCheck.style.display = "none";
  }
}

initialize();