const express = require('express');
const app = express();
const mainRouter = require ('./routes/mainRouter');


/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

let port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/notes', mainRouter);

app.listen(port, function() {
    console.log(`El servidor está corriendo en el puerto: ${port}`)
    console.log("http://localhost:3000/notes")
})