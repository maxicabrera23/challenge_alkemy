const express = require ('express');
const mysql = require ('mysql');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//mysql

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'balance'
});

connection.connect(error =>{
if (error) throw error;
console.log ('Database server runing')
});


//routes 

app.use (express.static(__dirname + '/public'));
app.get('/', (req, res)=> {
    res.sendFile('/public/index.html')

});
 
app.listen(port,()=>{
console.log( `server runing in port:${port}...` )

});

//traer todos las operaciones
app.get('/operations', (req, res)=> {
   const sql = 'SELECT * FROM operations';

   connection.query(sql, (error, results)=>{
    if (error) throw error;
    if (results.length > 0) {
        res.json(results);
    }else {
        res.send('not results');
    }
   });



});

//crear una nueva opracion

app.post('/new_operation',(req, res)=>{
    const sql = 'INSERT INTO operations SET ?';
    const operation_obj = {
        Tipo: req.body.Tipo,
        Concepto: req.body.Concepto,
        Monto: req.body.Monto,
        Fecha: req.body.Fecha
    }

connection.query(sql,operation_obj, error=>{
if (error) throw error;
res.send('operation created') 
});


});

//modificar una operacion
app.put('/update/:id', (req, res)=>{
    res.send('actualizacion de datos por id');
});


app.delete('/delete/:id', (req, res)=>{
res.send('delete operation');
});