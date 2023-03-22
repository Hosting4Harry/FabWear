const express = require("express");
const db = require('./models');
const cors = require("cors");
// const url = require('url');
// const open = require('openurl');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const registerRouter = require('./controllers/account/register');
const loginRouter = require('./controllers/account/login');
const productRouter = require('./controllers/product/getData');
const addressRouter = require('./controllers/address/address');
const authRouter = require('./controllers/account/Auth');
const orderRouter = require('./controllers/order/order');
const paymentRouter = require('./controllers/order/payment');
const wishlistRouter = require('./controllers/wishlist/wishlist');
(async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync();
    } catch (error) {
        console.log(error);
    }
})();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hi")
});
app.use('/product', productRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.post("/contact", (req, res) => {
    res.send({ message: " message sent successfully !! Thank You" })
})
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/isAuth', authRouter);
app.use('/wishlist', wishlistRouter);

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})
