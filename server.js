const express = require('express');
const app = express();
const expressFileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const fs = require('fs');

app.use(express.static('public'))

app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
})
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/formulario.html')
});

app.post('/imagen', (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;

    target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
        res.redirect('/collage');
    });
});

app.get('/collage', (req, res) => {
    res.sendFile(__dirname + '/public/collage.html')
});

app.get('/deleteImg/:nombre', (req, res) => {
    const { nombre } = req.params;
    fs.unlink(`${__dirname}/public/imgs/${nombre}`, (err) => {
        res.send(`Imagen ${nombre} fue eliminada con éxito`);
    });
});

app.listen(3000, () => console.log("Servidor iniciado en el puerto 3000"));