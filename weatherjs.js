const api={
    key:"84264794a9a9e3d5adbb5eb58bbf249d",
    base:"https://api.openweathermap.org/data/2.5/"
};

const searchbox=document.querySelector(".searchbox");
searchbox.addEventListener("keypress",setQuery);

function setQuery(e){
    if(e.keyCode==13){
        getResults(searchbox.value);
    }
}
function getResults(val){
    fetch(`${api.base}weather?q=${val}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}
function displayResults(weather){
    let city=document.querySelector(".location .city");
    city.innerText= `${weather.name}, ${weather.sys.country}`;

    let now=new Date();
    let date=document.querySelector(".location .date");
    date.innerText=dateBuilder(now);

    let temp=document.querySelector(".current .temp");
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
    
    let weatherConditions=document.querySelector(".current .conditions");
    weatherConditions.innerText=weather.weather[0].main;

    let hilow=document.querySelector(".current .hi-low");
    hilow.innerText=`${Math.round(weather.main.temp_max)}°c /${Math.round(weather.main.temp_min)}°c `;
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}