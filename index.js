const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
var app = express();
//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
//Rutas de la api
app.use('/api/libro', require('./routes/libro.route'));
app.use('/api/pasaje', require('./routes/pasaje.route'));
app.use('/api/persona', require('./routes/persona.route.js'));
app.use('/api/transaccion', require('./routes/transaccion.route.js'));
//configuracion
app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});