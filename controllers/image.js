const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '37dfdd11274b4f119007ff3990d393c3'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(
      Clarifai.FACE_DETECT_MODEL, 
      req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err=> res.status(400).json('unable to work with API'))

}

const imageHandler = (req, res, db) => {
	const { id } = req.body;
	 db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries=>
  	{
  		res.json(entries[0]);
  	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
		imageHandler,
		handleApiCall	
}