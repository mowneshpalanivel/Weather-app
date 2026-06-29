let weatherform = document.querySelector(".weatherform");
let cityinput = document.querySelector(".cityinput");
let card = document.querySelector(".card");
let apikey = "7c47b6ac35ee6b9329659e5e58223c5d ";
weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    let city = cityinput.value;
    if (city) {
        try {
            let weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch (error) {
            //console.error(error)
            displayerror(error)
        }
    }
    else {
        displayerror("please  enter a city")
    }
})
async function getweatherdata(city) {
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}\&appid=${apikey}`

    let response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("could not fetch weather data (or) you want to enter correct city name")
    }
    return await response.json();
}
function displayweatherinfo(data) {
    let { name: city,
        main: { temp, humidity }, weather: [{ description, id }] } = data
    card.textContent = ""
    card.style.display = "block"
    let citydisplay = document.createElement('h1');
    let tempdisplay = document.createElement('p');
    let humiditydisplay = document.createElement('p');
    let descdisplay = document.createElement('p');
    let weatheremoji = document.createElement('p');
    citydisplay.textContent = city;
    weatheremoji.textContent = getweatheremoji(id);
    tempdisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
humiditydisplay.textContent = `Humidity:${humidity}% `
descdisplay.textContent=description
citydisplay.classList.add("citydisplay");
tempdisplay.classList.add("tempdisplay");
humiditydisplay.classList.add("humiditydisplay");
descdisplay.classList.add("descdisplay");
weatheremoji.classList.add("weatheremoji")
card.appendChild(citydisplay);
card.appendChild(tempdisplay);
card.appendChild(humiditydisplay);
card.appendChild(descdisplay);
card.appendChild(weatheremoji);
}
function getweatheremoji(weatherid) {
    switch(true){
        case(weatherid>=200 && weatherid<300):
            return "🌩️";
        case(weatherid>=300 && weatherid<400):
            return "🌧️";
        case(weatherid>=500 && weatherid<600):
            return "🌨️";
        case(weatherid>=600 && weatherid<700):
            return "❄️";
        case(weatherid>=700 && weatherid<800):
            return "🌫️";
        case(weatherid==800):
            return "🌞";
        case(weatherid>=801 && weatherid<810):
            return ` ☁️`;
        default:
            return "❓";
    }
}
function displayerror(message) {
    let errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}
