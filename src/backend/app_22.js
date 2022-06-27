const express = require('express'); // framework express
const app = express(); // app faz o manuseio do express
const hostname = '127.0.0.1'; // endereço
const port = 1234; // porta do site
var sqlite3 = require('sqlite3').verbose(); // import de todos os módulos necessários

app.use(express.static("../frontend/")); // pega o diretório do front
app.use(express.json()); // pega o diretório do node.js

const DBSOURCE = "RPG.db" // responsável pela operação do bd

app.use(express.urlencoded({
    extended: true
}))

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/index.html`); // printa no console
});

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) { // aparece o erro no console se ele existir
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.') // aparece isso no console se der bom
    }
});

module.exports = db // exporta o bd

//get, post, put, delete methods

/*
========================================================================================
//                 Endpoints relacionados à tabela Personagem                         //
//                                ????????                                            //
========================================================================================
*/

// READ - Torna possível retornar os dados 
app.get("/readPersonagem", (req, res) => { // Método Get, pega todas as informações dentro do banco de dados e retorna elas, tornado possível exibí-las quando necessário
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Personagem ORDER BY NomePersonagem COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

// CREATE - Registra um novo personagem
app.post("/insertPersonagem", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `INSERT INTO Personagem (NomePersonagem, Dinheiro, HP, MaxHP, Tormento) VALUES ('${req.body.NomePersonagem}','${req.body.Dinheiro}','${req.body.HP}', '${req.body.MaxHP}', '${req.body.Tormento}')`

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});


// Deleta o registro de um insumo na tabela Doacoes pelo id, isso serve para casos em que um insumo foi registrado errado ou não é correto
app.post("/deletePersonagem", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Personagem WHERE idPersonagem = '" + req.body.idPersonagem + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});
