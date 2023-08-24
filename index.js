const express = require('express')
const connection = require('./db');
const UserRouter = require('./Routes/user.routes');
const BlogRouter = require('./Routes/blogs.routes');
const auth = require("./Middlewares/auth")
const app = express()
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api",UserRouter);
app.use("/api",auth,BlogRouter);
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT, async() => {
    try{
        await connection;
        console.log(`Server is runing at ${process.env.PORT}! with connected to DB`);
    }
    catch(err)
    {
        console.log(err.emessage);
    }
})