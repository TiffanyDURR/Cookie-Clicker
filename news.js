let headlines;
let lastHeadlineId;

async function initializeNews() {
 headlines = await getJSON('./data/headlines.json');
}

/*
A faire aussi pour Title ?
*/
function pickRandomHeadline(profile){

    let availableHeadlines = [];

    for (let i = 1 ; i < headlines.length; i++)
    {
        if (headlines[i].id != lastHeadlineId)
        {
            if (!headlines[i].limits && !headlines[i].triggers) // Aucunes conditions, on ajoute juste
            {
                availableHeadlines.push(headlines[i]);
            }

            else
            {
                if (headlines[i].limits && !headlines[i].triggers) // Que les limites
                {
                    if (profile.usedCats >= headlines[i].limits.minCat && profile.usedCats <= headlines[i].limits.maxCat)
                    {
                        availableHeadlines.push(headlines[i]);
                    }
                }

                else if (!headlines[i].limits && headlines[i].triggers) // Que les triggers
                {
                    if (profile.buildings[headlines[i].triggers.buildingId - 1] >= headlines[i].triggers.buildingAmount)
                    {
                        availableHeadlines.push(headlines[i]);
                    }
                }

                else
                {
                    if ((profile.usedCats >= headlines[i].limits.minCat && profile.usedCats <= headlines[i].limits.maxCat) && profile.buildings[headlines[i].triggers.buildingId - 1] >= headlines[i].triggers.buildingAmount)
                    {
                        availableHeadlines.push(headlines[i]);
                    }
                }
            }
        }
    }

    // console.log(availableHeadlines);

    let randomHeadline =  availableHeadlines[Math.floor(Math.random() * availableHeadlines.length)];

    if (!randomHeadline) // Si aucune disponible
    {
        randomHeadline = headlines[0]; // Mettre celle par défaut
    }

    lastHeadlineId = randomHeadline.id;

    return formatHeadline(randomHeadline);
}

function formatHeadline(headline)
{
    let temp = JSON.parse(JSON.stringify(headline)); // Cloner le JSON pour pas remplacer la source

    var result = temp.content.split('{').pop().split('}'); // Récupérer le keyword

    if (result.length > 0) // On évite de chercher des keywords dans les headlines qui n'en n'ont pas
    {
        var keyword = result[0];
        
        temp.content = temp.content.replace(`{${keyword}}`,`<b>${profile[keyword]}</b>`); // Remplacer dans la texte par la propriété JSON adéquat
    }


    return temp;
}