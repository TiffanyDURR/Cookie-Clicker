let buildingsData;

async function initialize() {
    buildingsData = await getJSON('./data/buildings.json');

    for (let i = 0; i < buildingsData.length ; i++)
    {
        spawnBuilding(buildingsData[i]);
    }

    for (let i = 0; i < buildingsData.length ; i++)
    {
        buildingDelegate(buildingsData[i]);
    }

    setInterval(gameLoop, 1000)
    setInterval(checkLoop, 1);
}

function getBuildingCost(index) {
    var building = buildingsData[index];

    return building.costBase * 1.15 ** profile.buildings[index];
}

class Profile
{
    constructor(name, cats) {
        this.name = name;
        this.cats = cats;
        this.startDateTime = new Date();
        this.lastSaveDateTime = new Date();
        this.buildings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    saveData() {
        localStorage.setItem('name', this.name);
        localStorage.setItem('cats', this.cats);
        localStorage.setItem('start', this.startDateTime);
        localStorage.setItem('lastSave', new Date());
        localStorage.setItem('buildings', JSON.stringify(this.buildings));
    }

    loadData() {
        this.name = localStorage.getItem('name');
        this.cats = localStorage.getItem('cats');
        this.startDateTime = localStorage.getItem('start');
        this.lastSaveDateTime = localStorage.getItem('lastSave');
        this.buildings = JSON.parse(localStorage.getItem('buildings'));
    }
}