var express = require('express');
var router = express.Router();

var db = require('../queries');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//here is all the routes to the API

/*
*	ADDRESS ROUTES
*/
router.get('/api/address', db.getAllAddresses);
router.get('/api/address/:id', db.getOneAddress);
router.post('/api/address', db.createAddress);
router.put('/api/address/:id', db.updateAddress)
router.delete('/api/address/:id', db.removeAddress)


/*
*	PATIENT ROUTES
*/
router.get('/api/patient', db.getAllPatients);
router.get('/api/patient/:id', db.getOnePatient);
router.post('/api/patient', db.createPatient);
router.put('/api/patient/:id', db.updatePatient)
router.delete('/api/patient/:id', db.removePatient)


/*
*	HeartData ROUTES
*/
router.get('/api/heartrecord', db.getAllHeartrecords);
router.get('/api/heartrecord/:id', db.getOneHeartrecord);
router.post('/api/heartrecord', db.createHeartrecord);
router.put('/api/heartrecord/:id', db.updateHeartrecord)
router.delete('/api/heartrecord/:id', db.removeHeartrecord)


/*
*	The records that will be displayed on the website. routing
*/
router.get('/api/record', db.getAllRecords);
router.get('/api/record/:id', db.getOneRecord);

/*
*	routing for the filtering queries
*/

router.get('/api/filter/Filterrecords/', db.FilterRecords);
router.get('/api/filter/firstname/:finitial', db.FilterFName);
router.get('/api/filter/lastname/:linitial', db.FilterLName);
router.get('/api/filter/city/:city', db.FilterCity);
router.get('/api/filter/state/:state', db.FilterState);
router.get('/api/filter/zipcode/:zip', db.FilterZipcode);


// OLD TESTING DELETE THIS LATER.
/*
router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies/', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);
*/

module.exports = router;

