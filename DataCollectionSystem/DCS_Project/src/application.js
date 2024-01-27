const express = require('express');
const db = require('./databasefile');
const ejs = require('ejs');

const PORT = 8482;
const app = express();
var form_name;

app.set('view engine', 'ejs');
app.set('views', '..\\views');
app.use(express.static('..\\styles'));
app.use(express.urlencoded({ extended: true }));


app.get('/show', async function(req, res) {
    try{
        form_name = req.query.form_name;
        const db_taken = await db.query(
            'SELECT json_data FROM records WHERE json_name = $1', [form_name]);
        const rows =  db_taken.rows.map(row => JSON.parse(row.json_data));
        res.render('show_records', {rows});
    }catch(error){
        console.error('Request Execution Error', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.get('/form', async function(req, res) {
    try{
        form_name = req.query.form_name;
        const db_taken = await db.query(
            'SELECT file FROM jsons WHERE json_name = $1', [form_name]);
        const form = db_taken.rows.map(row => row.file)[0];
        res.render('make_record', {form, form_name});
    }catch(error){
        console.error('Request Execution Error', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.post('/fill', async (req, res) => {
    try{
        let pattern = await db.query(
            'SELECT file FROM jsons WHERE json_name = $1', [form_name]);
        let data = pattern.rows.map(row => row.file)[0];

        for(let [key, value] of Object.entries(req.body)) {
            for(let [key_i, value_i] of Object.entries(data)) {
                if(key_i === 'resources') {
                    for(let [key_ii, value_ii] of Object.entries(value_i)) {
                        if(typeof value_ii === 'object') {
                            for(let [key_iii, _] of Object.entries(value_ii)) {
                                if(key_iii === key) data['resources'][key_ii][key_iii] = value;
                            }
                        } else {
                            if(key_ii === key) data['resources'][key_ii] = value;
                        }
                    }
                } else if(key_i !== 'name') {
                    if(key_i === key) data[key_i] = value;
                }
            }
        }
        
        await db.query(
            'INSERT INTO records(json_name, json_data) VALUES ($1, $2)',
            [form_name, JSON.stringify(data)]);
        res.redirect('/form?form_name=' + form_name);
    }catch(error){
        console.error('Error processing the POST-request', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT : ", PORT);
});
