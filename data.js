var buildingsData;

async function initialize() {
    buildingsData = await getJSON('./data/buildings.json');

    for (var i = 0; i < buildingsData.length;i++)
    {
        spawnBuilding(buildingsData[i]);
    }

    setInterval(gameLoop, 1) // Set interval ici pour qu'il attende le JSON 
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