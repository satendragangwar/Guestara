const express = require('express');
require('dotenv').config();

const Connect =  require('./db/db')
const routes = require('./routes/routes');
const cors  = require('cors')
Connect();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is listening on port ${process.env.PORT}...`);
});
