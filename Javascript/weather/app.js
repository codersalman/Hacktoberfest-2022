var btn = document.querySelector(".submit");
var input = document.querySelector("#input");
var display = document.querySelector(".display");
var cityname = document.querySelector("#city-name");
var wind    = document.querySelector(".wind");
var clouds  = document.querySelector(".clouds");
var temp    = document.querySelector(".temp");
var humidity  = document.querySelector(".humidity");
var weatherIcon    = document.querySelector(".logo");
var lat;
var long;
let message;
function getData(){
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=d051b119410eccb47463b12e9f73cf47")
	.then(response => response.json())
	.then(data => {
		console.log(data);
		var temperatue = data.main.temp;
		var windSpeed = data.wind;
		var {icon, description} = data.weather[0];
		var cloudCover = data.clouds;
		var name = data.name;
		var humid = data.main.humidity;
		
			lat = data.coord.lat;
			long = data.coord.lon;
		message = data.message;

		temp.innerText = Math.round(temperatue - 273.15) + " °C";
		humidity.innerText = humid + "%";
		clouds.innerText = cloudCover.all.toString() + "%";
		wind.innerText = Math.round(windSpeed.speed) + "Km/h";
		cityname.innerText = name;
		display.style.display = "flex";
		weatherIcon.style.display = "block";
		weatherIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";

		console.log("latitude : ", lat);
    	console.log("longitude : ", long);


		let url = "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d224134.42862338305!2d"+long+"!3d"+lat+"!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1658848877412!5m2!1sen!2sin";
    	frame.src = url;

	})

	.catch(err => console.log(err) 	)

}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log("latitude : ", lat);
      console.log("longitude : ", long);

      // let url ="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5112.738789863014!2d"+long+"!3d"+lat+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1658848010840!5m2!1sen!2sin";
      // frame.style.visibility="visible";
      // frame.src = url;
	  getData();

    });
  } else {
  /* geolocation IS NOT available */
  console.log("no geolocation");
}

input.addEventListener("keydown", (event) => {
	if(event.which == 13){
		getData();
	}
})


btn.addEventListener("click", getData);




