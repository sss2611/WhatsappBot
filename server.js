const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', apiRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));
