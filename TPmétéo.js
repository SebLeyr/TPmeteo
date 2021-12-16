// je crée une variable dans laquelle je stocke la base de l'url de l'api
const url = "https://www.prevision-meteo.ch/services/json/";
const btn = document.getElementById("envoyer");
const display = document.querySelector("#display");
let jsonData ;

// je fais une fonction de requete de l'api
function requestApi(event){
    event.preventDefault();
    //je récupère l'input de la ville
    const city = document.querySelector("form input[name='city']");
    console.log(city.value); // à commenter plus tard
    // je fais l'envoie de la requete en concaténant la base url avce la valeur de la city
    fetch(`${url}${city.value}`)
        //quand j'obtient une reponse je met le body en json
        .then(response => response.json())
        // puis je traite les données reçues
        .then(data => {
            //console.log('sucess:', data);
            jsonData = data;
            console.log(jsonData);
            meteoVille(jsonData);
            //to do plus tard
        })
        // en cas d'erreur je lève une exeecption et j'affiche l'erreur
        .catch((error) => {
            console.error('Error:', error);
        })
}

btn.addEventListener("click", requestApi);

function meteoVille(jsonData) {

    display.innerHTML ="";
    let titre = document.createElement("h2");
    titre.textContent=`La météo pour ${jsonData.city_info.name}, ${jsonData.city_info.country}`;
    display.appendChild(titre);

    let date = document.createElement("h3");
    date.textContent=`${jsonData.current_condition.date}, ${jsonData.current_condition.hour}`;
    display.appendChild(date);

    let cond_actu = document.createElement("h3");
    cond_actu.textContent=`Conditions actuelles :`;
    display.appendChild(cond_actu);

    let icon = document.createElement("img")
    icon.setAttribute("src", `${jsonData.current_condition.icon_big}`);
    display.appendChild(icon);

    let condition = document.createElement("div");
    condition.textContent=`${jsonData.current_condition.condition}`;
    display.appendChild(condition);

    let temp = document.createElement("div");
    temp.textContent=`Température : ${jsonData.current_condition.tmp}°C`;
    display.appendChild(temp);

    let hum = document.createElement("div");
    hum.textContent=`Humidité : ${jsonData.current_condition.humidity}`;
    display.appendChild(hum);

    let pression = document.createElement("div");
    pression.textContent=`Pression : ${jsonData.current_condition.pressure}`;
    display.appendChild(pression);

    let dir_vent = document.createElement("div");
    dir_vent.textContent=`Direction du vent : ${jsonData.current_condition.wnd_dir}`;
    display.appendChild(dir_vent);

    let vit_vent = document.createElement("div");
    vit_vent.textContent=`Vitesse du vent : ${jsonData.current_condition.wnd_spd} km/h`;
    display.appendChild(vit_vent);

    const days = [];
    days.push(jsonData.fcst_day_0,jsonData.fcst_day_1,jsonData.fcst_day_2,jsonData.fcst_day_3,jsonData.fcst_day_4);
    
    for(let i = 0;i<=4;i++) {
        let dateJ = document.createElement("h3");
        dateJ.textContent=`${days[i].day_long}, ${days[i].date}`;
        display.appendChild(dateJ);

        let iconJ = document.createElement("img")
        iconJ.setAttribute("src", `${days[i].icon_big}`);
        display.appendChild(iconJ);

        let conditionJ = document.createElement("div");
        conditionJ.textContent=`${days[i].condition}`;
        display.appendChild(conditionJ);

        let tempM = document.createElement("div");
        tempM.textContent=`Température minimale : ${days[i].tmin}°C, température maximale : ${days[i].tmax}°C`;
        display.appendChild(tempM);

        for(let j = 0; j<=23; j++) {
            let heureJ = document.createElement("div");
            let iconH = document.createElement("img");
            let conditionH = document.createElement("div");
            let divHeure = document.createElement("div");
            iconH.setAttribute("src", `${days[i].hourly_data[`${j}H00`].ICON}`);
            heureJ.textContent=`${j}H00`;
            conditionH.textContent=`${days[i].hourly_data[`${j}H00`].CONDITION}`;
            display.appendChild(divHeure);
            divHeure.appendChild(heureJ);
            divHeure.appendChild(iconH);
            divHeure.appendChild(conditionH);
            divHeure.style.display = "flex";
            divHeure.style.margin = "5px"
        }
    }
}