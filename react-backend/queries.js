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

	
	FilterFName: FilterFName,
	FilterLName: FilterLName,
	FilterCity: FilterCity,
	FilterState: FilterState,
	FilterZipcode: FilterZipcode,
	FilterRecords: FilterRecords

};


function ascii_to_hexa(str)
  {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n ++)
     {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
     }
    return arr1.join('');
   }

/*
*	ADDRESS TABLE QUERIES ONLY
*/

function getAllAddresses(req, res, next){
	db.any('select * from address') //do this and expect results
	
	.then(function (data){ // this block is the true block
	res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved all addresses'
		});
	})
	.catch(function (err){  //this block is the false block
		return next(err);  //return the error 
	});
}

function getOneAddress(req, res, next){
	var addressID = parseInt(req.params.id)  //the params is url. and the .id is :[num]
	db.one('select * from address where id = $1', addressID)

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved ONE address'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}

function createAddress(req, res, next){
	req.body.patient_id = parseInt(req.body.patient_id);
	//set up the sql query
	db.result ('insert into address(patient_id, street, city, state, zip_code)' +
		'values(${patient_id}, ${street}, ${city}, ${state}, ${zip}) returning id', req.body)
	.then( function (data) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted One address',
			id: data.rows[0].id
			
		});
	})
	.catch(function (err){
		return next(err);
	});	
}

function updateAddress(req, res, next){
	
	db.none('update address set street =$1, city=$2, state=$3, zip_code=$4 \
		where id=$5',
		[req.body.street, req.body.city, req.body.state, 
		req.body.zip_code, parseInt(req.params.id)])

	.then( function (){
		res.status(200)
		.json({
			status: 'success',
			message: 'Updaated address record',
			id: req.params.id
		});
	})
	.catch ( function( err){
		return next(err);
	})
}

function removeAddress(req, res, next){
	var addressID = parseInt(req.params.id);
	db.result('delete from address where id = $1', addressID)

	.then( function (result){
		res.status(200)
		.json({
			status: 'success',
			message: 'removed 1 address record',
			id: addressID
		});
	})
	.catch(function (err) {
		return next(err);
	});
}


/*
*	PATIENT TABLE QUERIES ONLY
*/

function getAllPatients(req, res, next){
	db.any('select * from patient') //do this and expect results
	
	.then(function (data){ // this block is the true block
	res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved all patients'
		});
	})
	.catch(function (err){  //this block is the false block
		return next(err);  //return the error 
	});
}

function getOnePatient(req, res, next){
	var patientID = parseInt(req.params.id)  //the params is url. and the .id is :[num]
	db.one('select * from patient where id = $1', patientID)

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved ONE patient'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}

function createPatient(req, res, next){
	//set up the sql query
	db.result ('insert into patient(first_name, last_name, phone_number, mi)' +
		'values(${first_name}, ${last_name}, ${phone_number}, ${mi}) returning id', req.body)
	//tt= t.rows[0].id
	.then( function (data) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted One patient',
			id: data.rows[0].id
			
		});
	})
	.catch(function (err){
		return next(err);
	});
}

function updatePatient(req, res, next){
		//set up sql query. this won't return anything back. from the database
	db.none('update patient set first_name =$1, last_name=$2, phone_number=$3, mi=$4 \
		where id=$5',
		[req.body.first_name, req.body.last_name, req.body.phone_number, 
		req.body.mi, parseInt(req.params.id)])

	.then( function (){
		res.status(200)
		.json({
			status: 'success',
			message: 'Updaated patient record',
			id: req.params.id
		});
	})
	.catch ( function( err){
		return next(err);
	})
}

function removePatient(req, res, next){
	var patientID = parseInt(req.params.id);
	db.result('delete from patient where id = $1', patientID)

	.then( function (result){
		res.status(200)
		.json({
			status: 'success',
			message: 'removed 1 patient',
			id: patientID
		});
	})
	.catch(function (err) {
		return next(err);
	});
}


/*
*	HEARTDATA TABLE QUERIES ONLY
*/

function getAllHeartrecords(req, res, next){
	db.any('select * from heartdata') //do this and expect results
	
	.then(function (data){ // this block is the true block
	res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved all heart records'
		});
	})
	.catch(function (err){  //this block is the false block
		return next(err);  //return the error 
	});
}

function getOneHeartrecord(req, res, next){
	var heartID = parseInt(req.params.id)  //the params is url. and the .id is :[num]
	db.any('select * from heartdata where patient_id = $1', heartID)

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved ONE heart record'
		});
	})
	.catch(function( err ){
		return next(err);
	});

}

function createHeartrecord(req, res, next){
	//set up the sql query
	//req.body.rawdata = '\\x' + req.body.rawdata.to

	var strHex = " "
	strHex = ascii_to_hexa(req.body.raw_heart_data)
	//console.log(strHex)

	db.result ("insert into heartdata(bpm, raw_heart_data) values(89, \
	 (select decode($1, 'hex'))) returning id", strHex.toString()
)
	//tt= t.rows[0].id
	.then( function (data) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted One patient',
			id: data.rows[0].id
			
		});
	})
	.catch(function (err){
		return next(err);
	});
}

function updateHeartrecord(req, res, next){


	var strHex = " "
	strHex = ascii_to_hexa(req.body.raw_heart_data)
	//console.log(strHex)

	//set up sql query. this won't return anything back. from the database
	db.none('update heartdata set bpm =$1, raw_heart_data=$2 \
		where id=$3',
		[parseInt(req.body.bpm), strHex, parseInt(req.params.id)])

	.then( function (){
		res.status(200)
		.json({
			status: 'success',
			message: 'Updaated heart record',
			id: req.params.id
		});
	})
	.catch ( function( err){
		return next(err);
	})
}

function removeHeartrecord(req, res, next){
	var heartID = parseInt(req.params.id);
	db.result('delete from heartdata where id = $1', heartID)

	.then( function (result){
		res.status(200)
		.json({
			status: 'success',
			message: 'removed 1 heart record',
			id: heartID
		});
	})
	.catch(function (err) {
		return next(err);
	});
}


/*
*	WEB RECORD TABLE QUERIES ONLY
*/

function getAllRecords(req, res, next){
	console.log("test")
	db.any('SELECT patient.id, patient.first_name, patient.last_name, patient.phone_number \
		,address.street, address.city, address,state, address.zip_code \
		FROM patient inner join address \
		ON patient.id = address.patient_id'
) //ON patient.id = address.patient_id') //do this and expect results
	
	.then(function (data){ // this block is the true block
	res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved all WEB heart records'
		});
	})
	.catch(function (err){  //this block is the false block
		return next(err);  //return the error 
	});
}

function getOneRecord(req, res, next){
	var recordID = parseInt(req.params.id)  //the params is url. and the .id is :[num]
	db.one('SELECT patient.id, patient.first_name, patient.last_name, patient.phone_number \
		,address.street, address.city , address,state, address.zip_code \
		FROM patient inner join address \
		ON patient.id = address.patient_id where patient.id = $1', recordID)

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved ONE heart record'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}

function FilterRecords(req, res, next){ //the params is url. and the .id is :[num]
	console.log(req.query.fname)
	db.any("SELECT patient.id, patient.first_name, patient.last_name, patient.phone_number \
	,address.street, address.city, address.zip_code \
	FROM patient inner join address ON patient.id = address.patient_id \
	where LOWER(patient.first_name) LIKE '%"+req.query.fname.toLowerCase()+"%' \
	AND LOWER(patient.last_name) LIKE '%"+req.query.lname.toLowerCase()+"%' \
	AND address.zip_code LIKE '%"+req.query.zip+"%'")

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Filtered Heart Records'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}


function FilterFName(req, res, next){
	var filter = (req.params.finitial).toLowerCase() //the params is url. and the .id is :[num]
	db.one("SELECT patient.id, patient.first_name, patient.last_name, patient.phone_number \
		,address.street, address.city, address,state, address.zip_code \
		FROM patient inner join address \
		ON patient.id = address.patient_id where LOWER(patient.first_name) LIKE $1\
		", (filter + '%') )
		//where patient.first_name LIKE "A%"\

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved patient records filtered for fname'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}


function FilterLName(req, res, next){
	var filter = (req.params.linitial).toLowerCase() //the params is url. and the .id is :[num]
	db.one("SELECT patient.id, patient.first_name, patient.last_name, patient.phone_number \
		,address.street, address.city, address.state, address.zip_code \
		FROM patient inner join address \
		ON patient.id = address.patient_id where LOWER(patient.last_name) LIKE $1\
		", (filter + '%') )
		//where patient.first_name LIKE "A%"\

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved patient records filtered for lname'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}

function FilterCity(req, res, next){
	var filter = (req.params.city).toLowerCase() //the params is url. and the .id is :[num]
	db.one("SELECT patient.id, patient.first_name, patient.last_name, patient.phone_number \
		,address.street, address.city, address.state, address.zip_code \
		FROM patient inner join address \
		ON patient.id = address.patient_id where LOWER(address.city) LIKE $1\
		", ('%' + filter + '%') )
		//where patient.first_name LIKE "A%"\

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved patient records filtered for city'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}

function FilterState(req, res, next){
	var filter = (req.params.state).toLowerCase() //the params is url. and the .id is :[num]
	db.one("SELECT patient.id, patient.first_name, patient.last_name, patient.phone_number \
		,address.street, address.city, address.state, address.zip_code \
		FROM patient inner join address \
		ON patient.id = address.patient_id where LOWER(address.state) LIKE $1\
		", ('%' + filter + '%') )
		//where patient.first_name LIKE "A%"\

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved patient records filtered for state'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}

function FilterZipcode(req, res, next){
	var filter = req.params.zip //the params is url. and the .id is :[num]
	db.one("SELECT patient.id, patient.first_name, patient.last_name, patient.phone_number \
		,address.street, address.city, address.state, address.zip_code \
		FROM patient inner join address \
		ON patient.id = address.patient_id where LOWER(address.zip_code) LIKE $1\
		", ('%' + filter + '%') )
		//where patient.first_name LIKE "A%"\

	.then(function (data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved patient records filtered for zip ode'
		});
	})
	.catch(function( err ){
		return next(err);
	});
}

//there is no reason to create a record, update, or remove. The web records are here only to 
//show on the web page.

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