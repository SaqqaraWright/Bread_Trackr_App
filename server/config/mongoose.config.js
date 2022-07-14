const mongoose = require('mongoose'); //importing mongoose


//mongoose connection here:
mongoose.connect('mongodb+srv://root:root@cluster0.xj1jm.mongodb.net/bread_trackr_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database', err));
