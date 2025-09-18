import { API_KEY } from "../config.js"

async function getComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
  }

  getComponent("navbar", "./htmlcomponet/navbar.html");
  getComponent("barkingnewscomponet", "./htmlcomponet/breakingnews.html");
  getComponent("footer", "./htmlcomponet/footer.html");
    
  const city = "Surat"
  
  // Call Weather&Forecast 
  loadWeather(city , API_KEY)
  //button
  document.getElementById('Search').addEventListener('click', () => {
    const city = document.getElementById("cityInput").value;
    loadWeather(city , API_KEY)
  })
  
  async function loadWeather(city, API_KEY) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;    
    const res = await fetch(url);
    const data = await res.json();

    //icon
    const weathericon = data?.weather[0]?.icon
    const iconurl = `http://openweathermap.org/img/wn/${weathericon}@2x.png` 
    
    const now = new Date();// 2025-09-17T10:06:18.267Z
    const utcTime = now.getTime();

    // API timezone in seconds → convert to ms
    const timezoneOffset = data?.timezone * 1000;

    const cityTime = new Date(utcTime + timezoneOffset);
    const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const weathertime = `${weeks[cityTime.getUTCDay()]} ${cityTime.getUTCDate()}, ${months[cityTime.getUTCMonth()]} ${cityTime.getUTCFullYear()}`;
    document.getElementById('dateweather').innerHTML = weathertime;

    // Data
    const cityname = data?.name;
    const country = data?.sys?.country;
    const temp = data?.main?.temp;

    const description = data?.weather[0]?.description;
    const temp_max = data?.main?.temp_max;
    const temp_min = data?.main?.temp_min;
    const wind = data?.wind?.speed;
    const humidity = data?.main?.humidity;
    const variation = Math.abs(temp_max - temp_min);

    // Main card 
    document.getElementById("country").innerHTML = country;
    document.getElementById("cityname").innerText = cityname;
    document.getElementById("tempindex").innerText = `${Math.round(temp)}°`;
    document.getElementById("desc").innerText = description;
    document.getElementById("wind").innerText = `${wind} km/h`;
    document.getElementById("humidity").innerText = `${humidity}%`;
    document.getElementById("weathericon").src = `${iconurl}`
    document.getElementById('temp_max').innerHTML = `${temp_max}°`
    document.getElementById('temp_min').innerHTML = `${temp_min}°`
    // Highlight section
    document.getElementById("highlightDate").innerText = new Date().toDateString();
    document.getElementById("lowHighlight").innerText = `${Math.round(temp_min)}°`;
    document.getElementById("highHighlight").innerText = `${Math.round(temp_max)}°`;
    document.getElementById("variation").innerText = `${variation}°`
 
  } catch (error) {
    console.error("Error loading weather:", error);
  }
  finally{
    loadforecast(city , API_KEY)
  }
}

async function loadforecast(city,API_KEY ) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    // By Defult data
    document.getElementById('Forecast').innerHTML = ""

    for (let i = 0; i < 9 ; i++) {

    //icon
    const weathericon = data?.list[i]?.weather[0]?.icon
    const iconurl = `http://openweathermap.org/img/wn/${weathericon}@2x.png`
    
    //Forecast Data
    const Foretime = data?.list[i]?.dt_txt;
    const ForetDesc = data?.list[i]?.weather[0]?.main;
    const Foretemp = data?.list[i]?.main?.temp;
    const Forehumidity = data?.list[i]?.main?.humidity;
    const ForeFahernheit = `${Math.floor(Foretemp * 1.8 +32)}.${Math.ceil(Foretemp * 1.8 +32)}`;

    document.getElementById('Forecast').innerHTML +=
    `<div class="border bg-gray-300 border-violet-500 rounded-2xl flex flex-col p-5 "> 
     <p class="font-bold text-sm">${Foretime} ${city}</p>
     <div class="flex justify-between"> <p class="font-semibold text-gray-600">${ForetDesc}</p> <img class="w-10" src="${iconurl}" alt=""> </div>
     <div class="flex"><img class="p-2" src="./assets/icon/Vector (2).png" alt="">${Foretemp}°C & ${ForeFahernheit}°F</div>
     <div class="flex"><img src="./assets/icon/droplet (1).png" alt="">${Forehumidity}%</div>
     </div>`
    }
    
    // WEEKLY DATA
    document.getElementById('Week').addEventListener('click', ()=> {

      document.getElementById('Forecast').innerHTML = ""
      for (let i = 0; i < data?.list?.length ; i++) {
     //icon
    const weathericon = data?.list[i]?.weather[0]?.icon
    const iconurl = `http://openweathermap.org/img/wn/${weathericon}@2x.png`

    //Forecast Data
    const Foretime = data?.list[i]?.dt_txt;
    const ForetDesc = data?.list[i]?.weather[0]?.main;
    const Foretemp = data?.list[i]?.main?.temp;
    const Forehumidity = data?.list[i]?.main?.humidity;
    const ForeFahernheit = `${Math.floor(Foretemp * 1.8 +32)}.${Math.ceil(Foretemp * 1.8 +32)}`;
    document.getElementById('Forecast').innerHTML +=
    `<div class="border bg-gray-300 border-violet-500 rounded-2xl flex flex-col p-5 "> 
     <p class="font-bold text-sm">${Foretime} ${city}</p>
     <div class="flex justify-between"> <p class="font-semibold text-gray-600">${ForetDesc}</p> <img class="w-10" src="${iconurl}" alt=""> </div>
     <div class="flex"><img class="p-2" src="./assets/icon/Vector (2).png" alt="">${Foretemp}°C & ${ForeFahernheit}°F</div>
     <div class="flex"><img src="./assets/icon/droplet (1).png" alt="">${Forehumidity}%</div>
     </div>` 
    }
    })

      // TODAY DATA
    document.getElementById('Today').addEventListener('click' , ()=>{
 
      document.getElementById('Forecast').innerHTML = ""  
    
    for (let i = 0; i < 9; i++) {
     //icon
    const weathericon = data?.list[i]?.weather[0]?.icon
    const iconurl = `http://openweathermap.org/img/wn/${weathericon}@2x.png`
    //Forecast Data
    const Foretime = data?.list[i]?.dt_txt;
    const ForetDesc = data?.list[i]?.weather[0]?.main;
    const Foretemp = data?.list[i]?.main?.temp;
    const Forehumidity = data?.list[i]?.main?.humidity;
    const ForeFahernheit = `${Math.floor(Foretemp * 1.8 +32)}.${Math.ceil(Foretemp * 1.8 +32)}`;
    document.getElementById('Forecast').innerHTML +=
    `<div class="border bg-gray-300 border-violet-500 rounded-2xl flex flex-col p-5 "> 
     <p class="font-bold text-sm">${Foretime} ${city}</p>
     <div class="flex justify-between"> <p class="font-semibold text-gray-600">${ForetDesc}</p> <img class="w-10" src="${iconurl}" alt=""> </div>
     <div class="flex"><img class="p-2" src="./assets/icon/Vector (2).png" alt="">${Foretemp}°C  &  ${ForeFahernheit}°F</div>
     <div class="flex"><img src="./assets/icon/droplet (1).png" alt="">${Forehumidity}%</div>
     </div>`
    }
     })
  } catch (error) {
    console.error("Error loading weather:", error);
  }
}