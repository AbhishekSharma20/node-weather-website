const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000



//Define Paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//express configs
app.set('view engine', 'hbs')
app.set('views', viewPath)          
hbs.registerPartials(partialsPath)


//tell express about static path
app.use(express.static(publicDirectoryPath))    

app.get('', (req,res) => {
    res.render('index', {
        name: "Abhishek Sharma",
        title: "Weather App"
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        name: "Abhishek Sharma",
        title: "About Me"
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        helpText: 'some helpful text',
        title: "Help"
    })
})

app.get('/weather', (req,res)=> {
    if(!req.query.address){
        return res.send({
            error: "Must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if(error){ return res.send({error}) }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){ return res.send({error}) }
            return res.send({
                address: req.query.address,
                forecast:  forecastData,
                location

            })
            
        })
    })
    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: "Must provide a search term"
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=> {
    res.render("404-page", {
        title: "404 Page not found",
        errroMessage: "The help topic doesn't exist"
    })
})

app.get('*',(req,res)=> {
    res.render("404-page", {
        title: "404 Page not found",
        errroMessage: "The page you're looking for couldn't be found"
    })
})

app.listen(port, ()=> {
    console.log("Server started on port "+ port )
})
