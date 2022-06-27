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
//                                                                                    //
========================================================================================
*/

// READ - Torna possível retornar os dados 
app.get("/readPersonagem", (req, res) => {
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

// DELETE - Deleta um personagem
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

/*
========================================================================================
//                 Endpoints relacionados à tabela Habilidade                         //
//                                                                                    //
========================================================================================
*/

// READ - Torna possível retornar os dados 
app.get("/readSkill", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Habilidade ORDER BY idHabilidade COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

// CREATE - Registra um novo personagem
app.post("/insertSkill", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `INSERT INTO Habilidade (NomeHabilidade, Efeito_1, Efeito_2, Efeito_3) VALUES ('${req.body.NomeHabilidade}','${req.body.Efeito_1}','${req.body.Efeito_2}', '${req.body.Efeito_3}')`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// UPDATE - Atualiza um novo personagem
app.post("/updateSkill", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `UPDATE Habilidade SET NomeHabilidade = '${req.body.NomeHabilidade}', Efeito_1 = '${req.body.Efeito_1}', Efeito_2 = '${req.body.Efeito_2}', Efeito_3 = '${req.body.Efeito_3}' WHERE idHabilidade = '${req.body.idHabilidade}'`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// DELETE - Deleta um personagem
app.post("/deleteSkill", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Habilidade WHERE idHabilidade = '" + req.body.idHabilidade + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});
/*
========================================================================================
//                 Endpoints relacionados à tabela Atributo                           //
//                                                                                    //
========================================================================================
*/

// READ - Torna possível retornar os dados 
app.get("/readAtributo", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Atributo ORDER BY idAtributo COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

// CREATE - Registra um novo personagem
app.post("/insertAtributo", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `INSERT INTO Atributo (Forca, Agilidade, Intelecto, Coragem) VALUES ('${req.body.Forca}','${req.body.Agilidade}','${req.body.Intelecto}', '${req.body.Coragem}')`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// UPDATE - Atualiza um novo personagem
app.post("/updateAtributo", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `UPDATE Atributo SET Forca = '${req.body.Forca}', Agilidade = '${req.body.Agilidade}', Intelecto = '${req.body.Intelecto}', Coragem = '${req.body.Coragem}' WHERE idAtributo = '${req.body.idAtributo}'`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// DELETE - Deleta um personagem
app.post("/deleteAtributo", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Atributo WHERE idAtributo = '" + req.body.idAtributo + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//                 Endpoints relacionados à tabela Antecedente                        //
//                                                                                    //
========================================================================================
*/

// READ - Torna possível retornar os dados 
app.get("/readAntecedente", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Antecedente ORDER BY idAntecedente COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

// CREATE - Registra um novo personagem
app.post("/insertAntecedente", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `INSERT INTO Antecedente (Combate, Montaria, Negocios, Roubo, Labuta, Medicina, Exploracao, Tradicao) VALUES ('${req.body.Combate}','${req.body.Montaria}','${req.body.Negocios}', '${req.body.Roubo}', '${req.body.Labuta}', '${req.body.Medicina}', '${req.body.Exploracao}', '${req.body.Tradicao}')`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// UPDATE - Atualiza um novo personagem
app.post("/updateAntecedente", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `UPDATE Antecedente SET Combate = '${req.body.Combate}', Montaria = '${req.body.Montaria}', Negocios = '${req.body.Negocios}', Roubo = '${req.body.Roubo}', Labuta = '${req.body.Labuta}', Medicina = '${req.body.Medicina}', Exploracao = '${req.body.Exploracao}', Tradicao = '${req.body.Tradicao}' WHERE idAntecedente = '${req.body.idAntecedente}'`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// DELETE - Deleta um personagem
app.post("/deleteAntecedente", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Antecedente WHERE idAntecedente = '" + req.body.idAntecedente + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//                 Endpoints relacionados à tabela Equipamento                        //
//                                                                                    //
========================================================================================
*/

// READ - Torna possível retornar os dados 
app.get("/readEquipamento", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Equipamento ORDER BY idEquipamento COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

// CREATE - Registra um novo personagem
app.post("/insertEquipamento", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `INSERT INTO Equipamento (NomeEquipamento, DescricaoEquipamento, ObservacaoEquipamento) VALUES ('${req.body.NomeEquipamento}', '${req.body.DescricaoEquipamento}', '${req.body.ObservacaoEquipamento}')`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// UPDATE - Atualiza um novo personagem
app.post("/updateEquipamento", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dado

    sql = `UPDATE Equipamento SET NomeEquipamento = '${req.body.NomeEquipamento}', DescricaoEquipamento = '${req.body.DescricaoEquipamento}', ObservacaoEquipamento = '${req.body.ObservacaoEquipamento}' WHERE idEquipamento = '${req.body.idEquipamento}'`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// DELETE - Deleta um personagem
app.post("/deleteEquipamento", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Equipamento WHERE idEquipamento = '" + req.body.idEquipamento + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});
