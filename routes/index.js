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
    var historiques = await historique.find();
    
    res.render('Homepage', {historiques})
  
  }
});


router.get('/errors', function(req, res, next) {
  res.render('errors');
});

router.post('/trajet', async function(req, res, next) {
  
  
  var users = await journeys.find({departure: capitalizeFirstLetter(req.body.departure) , arrival: capitalizeFirstLetter(req.body.arrival) , date: req.body.date});
  
  var searchUser = await journeys.findOne({departure: capitalizeFirstLetter(req.body.departure) , arrival: capitalizeFirstLetter(req.body.arrival)})

  if(searchUser === null){
    res.render('errors')
    } 
    
  

  res.render('trajet', {users:users})
});

router.get('/myticket', async function(req, res, next) {


  
  var alreadyExist = false;
  var test = req.session.user
  

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


  res.render('myticket', {ticket});
});

router.get('/historique', async function(req, res, next) {



    for(var i = 0 ; i< ticket.length ; i++){
      var historiquesave = new historique({     
      departure: ticket[i].departure,
      arrival: ticket[i].arrival,
      date: ticket[i].date,
      departureTime: ticket[i].departureTime,
      price: ticket[i].price,
      id : ticket[i].id,
      iduser : ticket[i].iduser
    })
    await historiquesave.save();
  };
    
  var test = req.session.user
  

  cityList = await historique.find({iduser: test.id });
  

  for(var i = 0 ; i< ticket.length ; i++){
    ticket.pop()}



  res.render('historique', {cityList});
  });


module.exports = router;

