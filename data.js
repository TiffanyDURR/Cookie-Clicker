let buildingsData;

async function initializeData() {
  buildingsData = await getJSON('./data/buildings.json');

  for (let i = 0; i < buildingsData.length; i++) {
    spawnBuilding(buildingsData[i]);
  }

  for (let i = 0; i < buildingsData.length; i++) {
    buildingDelegate(buildingsData[i]);
  }

  setInterval(gameLoop, 1000);
  setInterval(checkLoop, 10);
  setInterval(metaLoop, 10000);
}

function getBuildingCost(index) {
  var building = buildingsData[index];

  return building.costBase * 1.15 ** profile.buildings[index];
}

class Profile {
  constructor(name, cats) {
    this.name = name;
    this.cats = cats;
    this.usedCats = 0;
    this.startDateTime = new Date();
    this.lastSaveDateTime = new Date();
    this.buildings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  spendCats(amount){
    this.cats -= amount;
    this.usedCats += amount;
  }

  saveData() {
    localStorage.setItem('name', this.name);
    localStorage.setItem('cats', this.cats);
    localStorage.setItem('buildings', JSON.stringify(this.buildings));
    localStorage.setItem('start', this.startDateTime);
    localStorage.setItem('lastSave', new Date());
    localStorage.setItem('usedCats', this.usedCats);
  }

  loadData() {
    if (localStorage.length > 0) {
      this.name = localStorage.getItem('name');
      this.cats = parseInt(localStorage.getItem('cats'));
      this.buildings = JSON.parse(localStorage.getItem('buildings'));
      this.startDateTime = Date.parse(localStorage.getItem('start'));
      this.lastSaveDateTime = Date.parse(localStorage.getItem('lastSave'));
      this.usedCats = parseInt(localStorage.getItem('usedCats'));
    }

    console.log("Used cats : " + this.usedCats); 
  }

  clearData() {
    localStorage.clear();
  }
}
