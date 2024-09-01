//Importar módulos
const express = require('express');
const fs = require ('fs');

//Instancia de express
const app = express();

//Levantamos el servidor especificando el puerto y el mensaje
app.listen(3000, console.log("Servidor Encendido"));

//Middleware
app.use(express.json());

//Rutas
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    res.json(canciones);
})

app.post("/canciones", (req, res) => {
    const cancionNueva = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    canciones.push(cancionNueva);

    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Canción agregada con éxito")

})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex(c => c.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Canción eliminada con éxito")
})

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const cancionModificada = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex(c => c.id == id);
    canciones[index] = cancionModificada;
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Canción modificada con éxito")
})