const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/api', router);

app.use(errors());
app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
        message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
    next();
});

app.listen(PORT);