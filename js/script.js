const input = document.querySelector('.top__mainInfo--input');
const btn = document.querySelector('.top__mainInfo--sendButton');
const body= document.querySelector('body')
const cityName = document.querySelector('.top__mainInfo--cityName');
const warning = document.querySelector('.top__mainInfo--info');
const photo = document.querySelector('.top__img');

const weather = document.querySelector('.weatherInfo__p--weather');
const temperature = document.querySelector('.weatherInfo__p--temperature');
const humidity = document.querySelector('.weatherInfo__p--humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=7f1c5a35006ba0207ec25baa34b4d169';
const units = '&units=metric';
const pl = '&lang=pl'
let city;
let url;

const getWeather = () => {
    city = input.value; 
    url = apiLink + city + apiKey + units + pl;

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            temp2 = Math.round(temp);
            const hum = res.data.main.humidity;
            const weat = res.data.weather[0].main;
            cityName.textContent = res.data.name;
            temperature.textContent = `${temp2}°C`;
            humidity.textContent = `${hum}%`;
            weather.textContent = weat;
            warning.style.display = 'none';
            input.value = ''
            
            changePicture(weat)
        })
        .catch(err => {
            warning.style.display = 'block'
            photo.setAttribute('src', './img/unknown.png')
        })
};




function changePicture(x){
    let status = x;
if (status === 'Clouds') {
    photo.setAttribute('src', './img/cloud.png')
    body.style.backgroundImage = "linear-gradient(315deg, #b1bfd8 0%, #6782b4 74%)"
} else if(status === 'Drizzle'){
    photo.setAttribute('src','./img/drizzle.png')
    body.style.backgroundImage = "linear-gradient(315deg, #2884b8 0%, #d1bad2 74%)"
} else if(status === 'Rain'){
    photo.setAttribute('src','./img/rain.png')
    body.style.backgroundImage = "linear-gradient(315deg, #485461 0%, #28313b 74%)"
} else if(status === 'Mist'){
    photo.setAttribute('src','./img/fog.png')
    body.style.backgroundImage = "linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)"
} else if(status === 'Snow'){
    photo.setAttribute('src','./img/ice.png')
    body.style.backgroundImage = "linear-gradient(315deg, #ffffff 0%, #5899e2 74%)"
} else if(status === 'Clear'){
    photo.setAttribute('src','./img/sun.png');
    body.style.backgroundImage = "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)"
} else if(status === 'Thunderstorm'){
    photo.setAttribute('src','./img/thunderstorm.png')
    body.style.backgroundImage = "linear-gradient(315deg, #9dc5c3 0%, #5e5c5c 74%)"
} else{
    photo.setAttribute('src','./img/unknown.png')

};
};

btn.addEventListener('click', getWeather)

input.addEventListener('keyup', ()=>{
    if(event.keyCode === 13){
        getWeather()
    }
})