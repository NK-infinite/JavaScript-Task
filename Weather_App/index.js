
async function getComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

getComponent("navbar", "./htmlcomponet/navbar.html");
getComponent("barkingnewscomponet", "./htmlcomponet/breakingnews.html");
getComponent("footer", "./htmlcomponet/footer.html");
getComponent("rightnewscomponet" , "./htmlcomponet/bbcnews.html")
getComponent("weathertripnewscomponet" , './htmlcomponet/WeatherTripnew.html')

import { API_KEY } from "../config.js"
// //NABBAR LOAD
//    fetch('./htmlcomponet/navbar.html')
//    .then(response => response.text())
//    .then(data => {
//      document.getElementById('navbar').innerHTML = data;
//     })
//     .catch(error => console.error('Error loading navbar:', error));
 
// //footer load
// fetch('./htmlcomponet/footer.html')
// .then(response => response.text())
// .then(data => {
//     document.getElementById('footer').innerHTML = data;
// })
// .catch(error => console.error('Error loading footer:', error));

// //barking news
// fetch('./htmlcomponet/breakingnews.html')
// .then(response => response.text())
// .then(data => {
//     document.getElementById('barkingnewscomponet').innerHTML = data;
// })
// .catch(error => console.error('Error loading barkingnews:', error));


// right side news
fetch('./htmlcomponet/bbcnews.html')
.then(response => response.text())
.then(data => {
   document.querySelectorAll('.rightnewscomponet').forEach((el) => {
      el.innerHTML = data;
    });
})
.catch(error => console.error('Error loading rightnews:', error));


// //weathertripnews
// fetch('./htmlcomponet/WeatherTripnew.html')
// .then(response => response.text())
// .then(data => {
//     document.getElementById('weathertripnewscomponet').innerHTML = data;
// })
// .catch(error => console.error('Error loading weathertripnews:', error));



//time and date
    const date = new Date();
    const options = { month: 'short', day: 'numeric', weekday: 'long' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    //index.html date and time
    document.getElementById('timeindex').innerText = date.toLocaleTimeString('en-US', timeOptions);
    document.getElementById('dateindex').innerText = date.toLocaleDateString('en-US', options); 

  //Weather api
 const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=${API_KEY}&units=metric`;
 const API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?q=Surat&appid=${API_KEY}&units=metric`;
          
                 
async function loadWeather() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const response2 = await fetch(API_URL2);
    const data2 = await response2.json();
   
    // Weather Data
    const weatherDescription = data?.weather[0]?.description || null;
    const temperature = Math.round(data?.main?.temp);
    const windSpeed = (data?.wind?.speed );
    const humidity = data?.main?.humidity;
     
 for (let i = 0; i < 4; i++) {
  //icon
  const weathericon = data2?.list[i]?.weather[0]?.icon
  const iconurl = `http://openweathermap.org/img/wn/${weathericon}@2x.png`
  
  // forecast Data
  const forecasfullttime = `${(data2?.list[i]?.dt_txt).split(" ")[1]}`;
  const forecasttime = `${forecasfullttime.slice(0 ,5)}`
  const forecasttemp = `${Math.round( data2?.list[i]?.main?.temp)}`;
  
  document.getElementById('indexforecast').innerHTML += `    
  <div class= " bg-violet-500 flex-col p-3 rounded-2xl">
  <p>${forecasttime == 0 ? `Now` : forecasttime}</p>
  <img class="h-10" src="${iconurl}" alt="">
  <p >${forecasttemp}°</p>
  </div>`
  }

    // Update the HTML elements
    document.getElementById("weatherDescript").innerText = weatherDescription;
    document.getElementById("tempindex").innerText = `${temperature}°C`;
    document.getElementById("wind").innerText = ` ${windSpeed} km/h`;
    document.getElementById("humidity").innerText = ` ${humidity}%`;

  } catch (error) {
    console.error("Error loading weather:", error);
  }
}


loadWeather();