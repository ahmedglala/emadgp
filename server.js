const express = require("express");
const cors=require('cors')
const dpConnection = require('./config/dbConnection')
const authRouter=require('./routes/auth.route')
const userRoute=require('./routes/user.route');
const productRoute=require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
const orderRoute=require('./routes/order.route') ;
const {errorHandler} = require('./middleware/errorHandler')
const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use('/uploads',express.static('./uploads'))
app.use(express.json());

dpConnection();
app .use('/api/auth',authRouter)
app .use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)
app.use(errorHandler)
app.listen(5001, () => {
  console.log("server is running");
});
