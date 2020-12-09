const express = require("express")
const { get } = require("http")
const app = express()
const https = require("https")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, rep) =>{
    
    
    rep.sendFile(__dirname + "/index.html")
});

app.post("/", (req, reps) =>{
    const query = req.body.cityName;
    const apiId = "5ca0eff9dc45546bdc8dce7782bdc281"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiId + "&units=" + unit
    
    // console.log(" Post request received")
    // console.log(req.body.cityName) 
    https.get(url, (response) =>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            
            const temp =  weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const WeatherCity = weatherData.name
            const weatherIcon  = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon  + "@2x.png"
    
            reps.write("<h1>the temperature in " +query+ " is : " + temp + " degree celcuis </h1>")
            reps.write("<p>the weather description is:" + weatherDescription + "</p>")
            reps.write("<img src="+imageUrl +">")
            reps.send()
        })
        
    })
})












app.listen(3000, () =>{
    console.log(" your server is running")
})

