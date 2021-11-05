var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://devenzo:Ticketac1@cluster0.tdyb7.mongodb.net/Ticketac?retryWrites=true',
    options,
    function(err){
        console.log(err);
    }
)
