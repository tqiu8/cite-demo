var express = require('express');
var router = express.Router();
var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');


var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images/uploads')
	},
	filename: (req, file, cb) => {
	  var ext = file.mimetype.split('/')[1];
      cb(null, file.fieldname + '-' + Date.now()+'.'+ext);
    }
});

var upload = multer({storage: storage}).single('photo')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res,next) {	
	var db = req.db;
	var coll = db.collection('cite-predictions')
	coll.find().then(cursor => {
		console.log(cursor)
		res.render('results', {images: cursor});
	})
});

router.post('/upload', function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			console.log(err)
			return res.end('error uploading file');
		}
		console.log('uploaded', req.file.path)
		res.send(req.file.path)
	});
});

router.post('/annotate', function(req, res) {
	var begin = req.body.beginning
	var end = req.body.ending
	res.render('annotate', {beginning: begin, ending: end})
})

router.post('/save', function(req, res) {
	var db = req.db;
	var annotation = req.body.annotation;
	var img = req.body.img;
	console.log(req.body)
	var collection = db.get('annotations');
	console.log('img', img)
	collection.insert({
		"image": img,
		"annotation": annotation
	}, function(err, doc) {
		if (err) {
			res.send("there was a problem adding the annotation");
		} else {
		}
	});
});




module.exports = router;
