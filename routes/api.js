var express = require('express');
var router = express.Router();
var request = require('request');
var traktv = require('../traktv');

/* GET home page. */
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/getToken').post(function(req, res) {
	console.log(req.body);
	var body = {
		code: req.body.code,
		client_id: '00566d00423463db210e73875340068b1bedbadc9822438768dd8f3226d3a8e7',
		client_secret: traktv.clientSecret,
		redirect_uri: 'http://localhost:8000/',
		grant_type: 'authorization_code'
	};

	request({
			  method: 'POST',
			  url: 'https://api-v2launch.trakt.tv/oauth/token',
			  headers: {
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(body)
			}, 
			function (error, response, body) {
				if(error){
					console.log('error:');
					console.log(error);
				}
				else{
				  console.log('Status:', response.statusCode);
				  console.log('Headers:', JSON.stringify(response.headers));
				  console.log('Response:', body);

				  res.json(body);   
				}

	});
});

module.exports = router;