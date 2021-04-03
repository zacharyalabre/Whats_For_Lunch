//adding express
const express = require ('express');
const app = express();
const path = require('path');

//require model
const restaraunts = require('./models/restaraunts');

//adding mongoose and connecting it to the database URL
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/whats-for-lunch', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//check if there is an error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.set('view engine', 'ejs');
app.set('Views', path.join(__dirname, 'views'))



app.get('/', (req, res) => {
 res.render('home')
})

//route for the top restaraunts in the area
app.get('/restaraunts', async (req, res) => {
    const restaraunt = await restaraunts.find({});
    res.render('restaraunts/top', {restaraunts})
   })

   app.get('/restaraunts/:id', async (req, res) => {
    const restaraunt =  await restaraunts.findById(req.params.id)
    res.render('restaraunts/show', {restaraunts})
   })
   
app.listen(3000, ()=> {
    console.log('Serving on port 3000')
})