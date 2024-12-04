const express = require('express')
require("dotenv").config();
const router = require('./routes')
const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
        `Server is running on port ${process.env.PORT}`
    );
    app.use('/', router);
    // console.log = () => { }
});