const app=require('./index.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));

const port=8000;
app.listen(port,()=>{
        console.log('server started');
    });