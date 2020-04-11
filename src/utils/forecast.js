//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d4dd134f44d2d12ca22a047aa3eb5b65/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    request({url: url, json: true}, (error, {body})=> {
        if(error){
            callback("Unable to connect to Weather servies!", undefined)
        }else if( body.error) {
            callback("Something qent wrong: "+ response.body.error, undefined)
        }else {
            const respString = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability + '% chance of rainfall.'
            callback(undefined,respString)
        }
    })

}

module.exports = forecast
