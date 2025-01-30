const apiKey = "8fd2244f000b331ab6e965bf688370b6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const input_field = document.querySelector('input');


async function checkWeather(city_name) {

    // updating city , temp , humidity , wind values from api
    const response = await fetch(apiUrl + `&q=${city_name}` + `&appid=${apiKey}`);

    // if wrong city name is entered
    if(response.status == 404 || city_name.trim() == ""){
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
    else{
        var data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

        // updating the weather images according to weather conditions
        
        const weather_icon = document.querySelector('.weather-icon');
        const weather_condition = data.weather[0].main;

        if(weather_condition == "Clouds" ){
            weather_icon.src = "images/clouds.png";
        }
        else if(weather_condition == "Clear" ){
            weather_icon.src = "images/clear.png";
        }
        else if(weather_condition == "Rain" ){
            weather_icon.src = "images/rain.png";
        }
        else if(weather_condition == "Drizzle" ){
            weather_icon.src = "images/drizzle.png";
        }
        else if(weather_condition == "Mist" ){
            weather_icon.src = "images/mist.png";
        }

        // changing display none(don't want to show) and block(want to show) 
        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
        
    }
}

// this function will call the updation(check weater) fxn 
const updating_values = function(e){

    e.preventDefault();
    const city_name = input_field.value;
    checkWeather(city_name);

    // making input field clear for the next value
    input_field.value="";

}

// updating values when i press enter in input tag
input_field.addEventListener('keydown',(e)=>{
    if(e.key === "Enter"){
        updating_values(e);
    }
})

// updating values when i click on search icon
document.querySelector('button').addEventListener("click" , updating_values);  
