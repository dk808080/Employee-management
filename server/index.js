const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();



app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const db = mysql.createPool({
    user: "",
    host: "",
    password: "",
    database: "",
});
db.getConnection(function (err, connection) {
    // Use the connection
    connection.query('SELECT * FROM employees', function (error, results, fields) {
        // And done with the connection.
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
    });
});

app.post("/create", (req, res) => {
    const newemp = {
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        position: req.body.position,
        year: req.body.year
    }
    db.query("INSERT INTO employees SET ?",
        newemp, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("values inserted");
            }
        });
});

app.get("/getemps", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

app.delete("/deleteemp/:eid", (req, res) => {
    db.query(`DELETE FROM employees WHERE eid=${req.params.eid}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("deleted successfully");
        }
    });
})
var sql = "UPDATE employees SET name=?,age = ?,country = ?,position = ?,year = ? WHERE eid=?";
app.put("/editemp/:eid", (req, res) => {
    db.query(sql, [req.body.name, req.body.age, req.body.country, req.body.position, req.body.year, req.params.eid], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("updated successfully");
        }
    });
})

app.listen(process.env.PORT || 5000, () => {
    console.log("server started on 5000 successfully");
});
