
let express = require('express');

let app = express();

let path = require('path');

let bodyParser = require('body-parser');

let mysql = require('mysql');

let db = mysql.createConnection({
	host: 'localhost',

	user: 'root',

    password: '',
    
    database: 'login',
});

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname + '/views')));

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res)=>{
    res.render('index');
})

//Login Post Form Works here.....
app.post('/homepage', (req, res)=>{
    let post = {username: req.body.username, password: req.body.password};

    let sql = 'INSERT INTO logindata SET ?';

    db.query(sql, post, (err)=>{
        if(err){
            throw err;
        }else{
            // Save the data in database and render the homepage
            res.render('homepage', {username: req.body.username});
        }
    })
})

let PORT = process.env.PORT | 2000;

app.listen(PORT, console.log('Running Port ' + PORT));