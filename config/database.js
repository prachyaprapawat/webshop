var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("--------------- Database Connected!  --------------");
}).catch(() => {
    console.log("--------- Can not Connect to Database!!!! --------");
});