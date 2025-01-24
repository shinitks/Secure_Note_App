const app=require('./index.js');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://shinitks:sh1n1tks%237@cluster0.3vpmi.mongodb.net/myDatabaseName?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));

const port=8000;
app.listen(port,()=>{
        console.log('server started');
    });