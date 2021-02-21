const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors')
let bears = [];

app.use(cors())

router.route('/bears')
    .get((req, res) => {
        res.json(bears)
    })    
    .post((req, res) => {
        bears.push(req.body);
        res.json({ ok: 1, message: 'Bear created!' });
    });

router.route('/bears/:id')
    .get((req, res) => {
        const bear = bears.find(it => it.id == req.params.id)
        if(bear){
            res.json(bear)
        }else{
            res.sendStatus(404)
        }
    })
    .delete((req, res) => {
        bears = bears.filter(it => it.id != req.params.id)
        res.json({ ok: 1, message: 'Bear deleted!' });
    });

app.use('/api', bodyParser.json(), router)


app.listen(8000)