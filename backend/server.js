const app=require('./index.js');
const mongoose = require('mongoose');
require('dotenv').config(); 



mongoose.connect(process.env.USERS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true, // Temporarily disable strict checks for debugging
  tlsAllowInvalidCertificates: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));

const port=8000;
app.listen(port,()=>{
        console.log('server started');
    });

    //mongodb+srv://shinitks:sh1n1tks%237@cluster0.3vpmi.mongodb.net/myDatabaseName?retryWrites=true&w=majority
    //mongodb+srv://shinitks:sh1n1tks%237@cluster0.3vpmi.mongodb.net/sessionDB?retryWrites=true&w=majority
    //mongodb://127.0.0.1:27017/myDatabaseName