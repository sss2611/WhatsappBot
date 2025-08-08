const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const cors = require('cors');
const morgan = require('morgan');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use((err, req, res, next) => {
    console.error('💥 Error inesperado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});


app.use(express.static('public'));

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));
