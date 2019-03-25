var mongoose = require('mongoose');

// Initialisation de mongoose
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}

//connection à la base de données mongoose
mongoose.connect('mongodb://davidmusset:ilovecapsule2019@ds121996.mlab.com:21996/capsuleexam',
    options,
    function(err) {
     if(err){console.log(err);}
     else{console.log('Database operational')}
    }
);
