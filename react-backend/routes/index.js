var express = require('express');
var router = express.Router();

var db = require('../queries');

//here is all the routes to the API

/*
*	ADDRESS ROUTES
*/
router.get('/address', db.getAllAddresses);
router.get('/address/:id', db.getOneAddress);
router.post('/address', db.createAddress);
router.put('/address/:id', db.updateAddress)
router.delete('/address/:id', db.removeAddress)


/*
*	PATIENT ROUTES
*/
router.get('/patient', db.getAllPatients);
router.get('/patient/:id', db.getOnePatient);
router.post('/patient', db.createPatient);
router.put('/patient/:id', db.updatePatient)
router.delete('/patient/:id', db.removePatient)


/*
*	HeartData ROUTES
*/
router.get('/heartrecord', db.getAllHeartrecords);
router.get('/heartrecord/:id', db.getOneHeartrecord);
router.post('/heartrecord', db.createHeartrecord);
router.put('/heartrecord/:id', db.updateHeartrecord)
router.delete('/heartrecord/:id', db.removeHeartrecord)


/*
*	The records that will be displayed on the website. routing
*/
router.get('/record', db.getAllRecords);
router.get('/record/:id', db.getOneRecord);

/*
*	routing for the filtering queries
*/

router.get('/filter/Filterrecords/', db.FilterRecords);
router.get('/filter/firstname/:finitial', db.FilterFName);
router.get('/filter/lastname/:linitial', db.FilterLName);
router.get('/filter/city/:city', db.FilterCity);
router.get('/filter/state/:state', db.FilterState);
router.get('/filter/zipcode/:zip', db.FilterZipcode);


// OLD TESTING DELETE THIS LATER.
/*
router.get('/puppies', db.getAllPuppies);
router.get('/puppies/:id', db.getSinglePuppy);
router.post('/puppies/', db.createPuppy);
router.put('/puppies/:id', db.updatePuppy);
router.delete('/puppies/:id', db.removePuppy);
*/

module.exports = router;

