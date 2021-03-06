let profile = new Profile('Player', 10000);
const affichageScore = document.querySelector('.affichageScore');
const chatACliquer1 = document.querySelector('.chatACliquer1');
const clicPlusUnImage = document.querySelector('.clicPlusUnImage');
const pattouneHeader = document.querySelector('.pattouneHeader > div');
const affichageCostPattoune = document.querySelector('.costPattoune');
const buildingsPanel = document.querySelector('.buildings-panel');
const mainHeader = document.querySelector(".main-header");
const mainHeaderContent = document.querySelector(".main-header-content");
const refugeName = document.getElementById("refuge-name");
const buttonCheck = document.querySelector(".button-check");
const refugeNameContainer = document.querySelector(".refuge-title");
const headlineTitle = document.querySelector(".headline-title");
const headlineContent = document.querySelector(".headline-content");

// TODO : dans un big Init
refugeName.addEventListener("input", (e) => {
  pseudo = e.target.value; 
  console.log(pseudo)
  refugeNameContainer.innerHTML = `${pseudo}`
});

// TODO : dans un big Init
buttonCheck.addEventListener("click", () => {
  refugeName.style.display = "none";
  buttonCheck.style.display = "none";
})

// TODO : a revoir dans la 0.3
function clicPlusUn() {
  chatACliquer1.addEventListener('click', () => {
    profile.cats++;
    animationPlusUn();
  })
}

// TODO : a revoir dans la 0.3
function animationPlusUn() {
  clicPlusUnImage.classList.add('clicAnimPlusUn')
  setTimeout(function () {
    clicPlusUnImage.classList.remove('clicAnimPlusUn')
  }, 150)
}

function affichageMain (buildingLevel, buildingData) {

  let calcBuildingParSeconde = buildingLevel * buildingData.catPerSecond;
  const mainHeaderContent = document.querySelector(".main-header-content");

  let buildingHTML = `<div class="main-building${buildingData.id} main-building-style" style="display: none;"> 
  <div>
  Nombre de <b>${buildingData.name}</b> acheté(es) ; <span class="mainCount${buildingData.id}"> ${buildingLevel} <i class="fas fa-paw"></i></span>
    <br/>
    <p>Ce bonus rapporte ${nFormatter(calcBuildingParSeconde, 3)} chat(s) toutes les secondes !</p>
    </div>`;

    mainHeaderContent.innerHTML += buildingHTML;
}

function spawnBuilding(building) {

  buildingsPanel.innerHTML += `
         <div class="building${building.id}"> 
         <div class="building-hover">${building.description}
         </div>
                <span class="titre-bonus">${building.name} (x)</span> // TODO: Mettre ça dans un fichier à part avec des const
                <div class="infosbonus${building.id} infosbonus"></div>
                <div class="buildingPrix${building.id} prix">${building.costBase}</div>
                <img class="Bonus${building.id}" src="./assets/${building.asset}">
            </div>
        `      
    affichageMain(profile.buildings[building.id-1], building);
}

/// TODO : Check si c'est toujours utile
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
    profile.buildings[building.id - 1]++
    profile.spendCats(cost);
}

refreshNextCost(building);

}

function refreshNextCost(building){
  let infosBonus = document.querySelector(`.infosbonus${building.id}`);
  let calcBuildingParSecondeNext = (profile.buildings[building.id - 1] + 1) * building.catPerSecond;

  infosBonus.innerHTML = `${nFormatter(calcBuildingParSecondeNext)} chat(s) / s`;
}

function changeHeadlines(){
  let headline = pickRandomHeadline(profile);

  headlineTitle.innerHTML = headline.title;
  headlineContent.innerHTML = headline.content;
}

// TODO : mettre ça dans Data ?
function getTotalCatsPerSecond(){

  let total = 0;

  for (let i = 0; i < profile.buildings.length; i++) {
    total += buildingsData[i].catPerSecond * profile.buildings[i];
  }

  return total;
}

function refreshMain(building){
  let mainBuilding = document.querySelector(`.main-building${[building.id]}`);
  let spanCount = document.querySelector(`.mainCount${building.id}`);

  spanCount.innerHTML = `<span class="mainCount${building.id}"> ${profile.buildings[building.id -1]} <i class="fas fa-paw"></i></span>`; // TODO : Isoler le Count dans un span ou une div pour simplifier

  if (profile.buildings[building.id -1] > 0){
    mainBuilding.style.display = "";
  }
}

function refreshScore(){

  let catPerLoop = getTotalCatsPerSecond() / 100;

  profile.cats += catPerLoop;

  affichageScore.textContent = `${nFormatter(profile.cats, 3)}`;
}

// TODO : Garder ?
function gameLoop() {
    //profile.cats += getTotalCatsPerSecond();
}

function checkLoop() {
  refreshScore();

  mainHeader.innerHTML = `<span>Nombre de chats par seconde</span><p>${nFormatter(getTotalCatsPerSecond(),1)}</p>`; // TODO : isole aussi le CPS ?

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

initializeData();
initializeNews(); // TODO : big initialize
clicPlusUn();
profile.loadData();
