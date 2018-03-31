var promise = require('bluebird');

var options = {
	//init options
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://admin:Am19528974!@localhost:5432/cardaz';
var db = pgp(connectionString);

//add query functions
//defines the query calls
module.exports = {

	/*
	getAllPuppies: getAllPuppies,
	getSinglePuppy: getSinglePuppy,
	createPuppy: createPuppy,
	updatePuppy: updatePuppy,
	removePuppy: removePuppy,
	*/

	getAllAddresses: getAllAddresses,
	getOneAddress: getOneAddress,
	createAddress: createAddress,
	updateAddress: updateAddress,
	removeAddress: removeAddress,

	getAllPatients: getAllPatients,
	getOnePatient: getOnePatient,
	createPatient: createPatient,
	updatePatient: updatePatient,
	removePatient: removePatient,

	getAllHeartrecords: getAllHeartrecords,
	getOneHeartrecord: getOneHeartrecord,
	createHeartrecord: createHeartrecord,
	updateHeartrecord: updateHeartrecord,
	removeHeartrecord: removeHeartrecord,

	getAllRecords: getAllRecords,
	getOneRecord: getOneRecord,
	createRecord: createRecord,
	updateRecord: updateRecord,
	removeRecord: removeRecord,


};

/*
*	ADDRESS TABLE QUERIES ONLY
*/

function getAllAddresses(req, res, next){
}

function getOneAddress(req, res, next){
}

function createAddress(req, res, next){
}

function updateAddress(req, res, next){
}

function removeAddress(req, res, next){
}


/*
*	PATIENT TABLE QUERIES ONLY
*/

function getAllPatients(req, res, next){
}

function getOnePatient(req, res, next){
}

function createPatient(req, res, next){
}

function updatePatient(req, res, next){
}

function removePatient(req, res, next){
}


/*
*	HEARTDATA TABLE QUERIES ONLY
*/

function getAllHeartrecords(req, res, next){
}

function getOneHeartrecord(req, res, next){
}

function createHeartrecord(req, res, next){
}

function updateHeartrecord(req, res, next){
}

function removeHeartrecord(req, res, next){
}


/*
*	WEB RECORD TABLE QUERIES ONLY
*/

function getAllRecords(req, res, next){
}

function getOneRecord(req, res, next){
}

function createRecord(req, res, next){
}

function updateRecord(req, res, next){
}

function removeRecord(req, res, next){
}


/*
function getAllPuppies(req, res, next){
	db.any('select * from pups') //do this and expect results
	
	.then(function (data){ // this block is the true block
	res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved all puppies'
		});
	})
	.catch(function (err){  //this block is the false block
		return next(err);  //return the error 
	});
}

function getSinglePuppy(req, res, next){
	var pupID = parseInt(req.params.id)  //the params is url. and the .id is :[num]
	db.one('select * from pups where id = $1', pupID)

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved ONE puppy'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}	

//POST. Sends data into database with a POST request
function createPuppy(req, res, next){
	req.body.age = parseInt(req.body.age);
	//set up the sql query
	db.result ('insert into pups(name, breed, age, sex)' +
		'values(${name}, ${breed}, ${age}, ${sex}) returning id', req.body)
	//tt= t.rows[0].id
	.then( function (data) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted One puppy',
			id: data.rows[0].id
			
		});
	})
	.catch(function (err){
		return next(err);
	});
}

function updatePuppy(req, res, next){
	//set up sql query. this won't return anything back. from the database
	db.none('update pups set name =$1, breed=$2, age=$3, sex=$4 where id=$5',
		[req.body.name, req.body.breed, parseInt(req.body.age), 
		req.body.sex, parseInt(req.params.id)])

	.then( function (){
		res.status(200)
		.json({
			status: 'success',
			message: 'Updaated puppy record',
			id: req.params.id
		});
	})
	.catch ( function( err){
		return next(err);
	})
}

function removePuppy(req, res, next){
	var pupID = parseInt(req.params.id);
	db.result('delete from pups where id = $1', pupID)

	.then( function (result){
		res.status(200)
		.json({
			status: 'success',
			message: 'removed 1 puppy',
			id: pupID
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

*/