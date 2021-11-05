var express = require('express');
var router = express.Router();
var request = require('sync-request');


var historique = require('../models/histo')
var journeys = require('../models/journeys')


var ticket = []



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/Homepage', async function(req, res, next){
  if(req.session.user == null){
    res.redirect('/')
  } else {
    var cityList = await historique.find();
    console.log(req.session.user)
    console.log("babar")
    res.render('Homepage', {cityList})
  
  }
});


router.get('/errors', function(req, res, next) {
  res.render('errors');
});

router.post('/trajet', async function(req, res, next) {
  
  
  var users = await journeys.find({departure: capitalizeFirstLetter(req.body.newcity) , arrival: capitalizeFirstLetter(req.body.newcity2) , date: req.body.date});
  console.log(users)
  var searchUser = await journeys.findOne({departure: capitalizeFirstLetter(req.body.newcity) , arrival: capitalizeFirstLetter(req.body.newcity2)})

  if(searchUser === null){
    res.render('errors')
    } 
    
  

  res.render('trajet', {users:users})
});

router.get('/myticket', async function(req, res, next) {


  console.log(req.query.departure)
  var alreadyExist = false;
  var test = req.session.user
  console.log(test.id)
  console.log(req.session.user)
  console.log("robert de sable")

  for(var i=0; i<ticket.length;i++){
    if(req.query.id == ticket[i].id ){
      alreadyExist = true;
    }
  }

  if(alreadyExist == false){
    ticket.push({
      departure: req.query.departure,
      arrival:req.query.arrival,
      departureTime: req.query.departureTime,
      date : req.query.date,
      price: req.query.price,
      id: req.query.id,
      iduser : test.id
    })
  }

  console.log(ticket)

  res.render('myticket', {ticket});
});

router.get('/historique', async function(req, res, next) {
  console.log("gg")
    console.log(req.body.id)


    for(var i = 0 ; i< ticket.length ; i++){
      var newCity = new historique({     
      departure: ticket[i].departure,
      arrival: ticket[i].arrival,
      date: ticket[i].date,
      departureTime: ticket[i].departureTime,
      price: ticket[i].price,
      id : ticket[i].id,
      iduser : ticket[i].iduser
    })
    await newCity.save();
  };
    
  var test = req.session.user
  console.log(test.id)

  cityList = await historique.find({iduser: test.id });
  console.log(cityList)

  for(var i = 0 ; i< ticket.length ; i++){
    ticket.pop()}



  res.render('historique', {cityList});
  });


module.exports = router;

