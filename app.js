const express = require("express")
const { get } = require("http")
const app = express()
const https = require("https")

app.get("/", (req, res) =>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q=bamako&appid=5ca0eff9dc45546bdc8dce7782bdc281&units=metric"
    // always make sure to https// prepend to api's url
    https.get(url, (response) =>{
        // console.log(response.statusCode)
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            console.log("weatherData:",weatherData )
            const temp =  weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const WeatherCity = weatherData.name
            const weatherIcon  = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon  + "@2x.png"

            console.log("WeatherCity:", WeatherCity )
            console.log("temp:", temp )
            console.log("weatherDescription:",weatherDescription)
            console.log("Icon:", weatherIcon )

            res.write("<h1>the temperature in Bamako is : " + temp + " degree celcuis </h1>")
            res.write("<p>the weather description is:" + weatherDescription + "</p>")
            res.write("<img src="+imageUrl +">")
            res.send()
        })
        
    })
    
    // res.send(" frontend and backend are running")
})












app.listen(3000, () =>{
    console.log(" your server is running")
})