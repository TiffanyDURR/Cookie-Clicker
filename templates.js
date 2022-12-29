function createBuildingTemplate(building) {
    let template = `
    <div class="building${building.id}"> 
       <div class="building-hover">${building.description}</div>
       <span class="titre-bonus">${building.name} <span id = titleCount${building.id}>(${profile.buildings[building.id - 1]})</span></span> 
       <div class="infosbonus${building.id} infosbonus"></div>
       <div class="buildingPrix${building.id} prix">${building.costBase}</div>
       <img class="Bonus${building.id}" src="./assets/${building.asset}">
     </div>`;  

   return template;
}

function createMainBuildingTemplate(buildingData, buildingLevel, calcBuildingParSeconde) {
    let template = 
    `<div id="main-building${buildingData.id}" class= "main-building-style main-building${buildingData.id}" style="display: none;"> 
    <div>
    Nombre de <b>${buildingData.name}</b> acheté(es) ; <span id="mainCount${buildingData.id}"> ${buildingLevel}</span> <i class="fas fa-paw"></i>
    <br/>
    Ce bonus rapporte  <span class = "cps${buildingData.id}">${nFormatter(calcBuildingParSeconde, 3)}</span> chat(s) toutes les secondes !
    </div>`;

    return template;
}