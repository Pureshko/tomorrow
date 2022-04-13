const handlebars = require('express-handlebars');
const express =require('express')
const app = express()
const host = '127.0.0.1'
const port = 7000
//const mongo = require('mongodb')
const urlencodedParser = express.urlencoded({extended: false});
/*const client = new mongo.MongoClient(
  "mongodb+srv://kotleta:jNnC1ncnTQmAvQ2d@integro.jwyvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);*/
app.engine('handlebars',handlebars.engine({defaultLayout: 'main' }));
app.set('views', './views')
app.set('view engine', 'handlebars')
/*const getScriptsOfDomain = async (domainName) => {
  try {
    await client.connect();
    const db = client.db("Organization");
    console.log("Соединение установлено");
    var scripts = await db
      .collection(`${domainName}_scripts`)
      .find()
      .toArray();
    return scripts;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};

const getListOfDomains = async () => {
  try {
    await client.connect();
    const db = client.db("callhelper");
    console.log("Соединение установлено");
    var domains = await db.collection(`domains`).find().toArray();
    return domains;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};
const addScriptToDomain = async (domainName, scriptName) => {
  try {
    await client.connect();
    const db = client.db("callhelper");
    const collection = db.collection(`${domainName}_scripts`);
    let newId = generateId();
    const result = await collection.insertOne({
      "mainId": newId,
      "id": newId,
      "name": scriptName,
      "text": "Неотредактированный текст оператора",
      "answers": [],
      "clicks": 0
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}*/
app.get('/', (req, res) => {
  app.use(express.static(__dirname+"/templates"))
  res.sendFile(__dirname+"/templates/main.html")
})

app.get('/generate',(req,res)=>{
  res.sendFile(__dirname+"/qrform.html")
})
app.post('/generate',urlencodedParser,(req,res)=>{
  console.log(req.body)
  if(req.body.url==""||req.body.url==undefined){
    response.sendStatus(400)
  }else{
    res.render('qrform',{url:"http://qrcoder.ru/code/?"+decodeURI(req.body.url)+"&4&0"})
  }
})

app.get('/login', (req,res)=>{
  if(req.query.set==undefined||req.query.set==""||req.query.set=="login"){
    app.use(express.static(__dirname+"/templates"))
    res.sendFile(__dirname+"/templates/login.html")
  }else{
    app.use(express.static(__dirname+"/templates"))
    res.sendFile(__dirname+"/templates/sign.html")
  }


})
app.post('/login', (req,res)=>{

})
app.get('/stat',(req,res)=>{
  app.use(express.static(__dirname+"/templates"))
  res.sendFile(__dirname+"/templates/statistics.html")
})
app.get('/survey',(req,res)=>{
  app.use(express.static(__dirname+"/templates"))
  res.sendFile(__dirname+"/templates/survey.html")
})

/*
app.get('/home', (req, res) => {
  res.status(200).type('text/plain')
  res.send('Home page')
});

app.get('/about', (req, res) => {
  res.status(200).type('text/plain')
  res.send('About page')
});

app.post('/api/admin', (req, res) => {
  res.status(200).type('text/plain')
  res.send('Create admin request')
});

app.post('/api/user', (req, res) => {
  res.status(200).type('text/plain')
  res.send('Create user request')
});
app.use(
  '/nigger',
  express.static(__dirname+"/styles/black-man.jpg")
);

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
});
*/

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
})
