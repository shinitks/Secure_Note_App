const app=require('./index.js');
const mongoose = require('mongoose');
require('dotenv').config(); 



mongoose.connect(process.env.USERS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));

const port=8000;
app.listen(port,()=>{
        console.log('server started');
    });

   