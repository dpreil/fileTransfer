const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname));

//store files on local server
const multerConfig = {
	storage: multer.diskStorage({
		destination: function (req,file,next){
			next(null, './public/photostorage');
		},

		filename: function (req,file,next){
			console.log(file);
			const ext = file.mimetype.split('/')[1];
			next(null, file.fieldname + '-' + Date.now() + '.' + ext);
		}
		})
}

app.get('/', (req,res) => res.render('/index.html'));
app.post('/upload', multer(multerConfig).single('photo'), (req,res) => res.send('complete!'));
