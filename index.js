const express = require("express");
const mongoose = require("mongoose");
const sessions = require("express-session");
const redis = require("redis");
const cors = require("cors");

const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET
} = require("./config/config");


let redisStore = require("connect-redis")(sessions)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/userRoutes");


const app = express()
const port = process.env.port || 3000;
const mongo_url = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
    mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('successfully connected');
        })
        .catch((error) => {
            console.error(`connection failed due to ${error}`);
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();
app.use(cors({}));
app.enable("trust proxy");
app.use(sessions({
    store: new redisStore({
        client: redisClient
    }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUnitialized: false,
        httpOnly: true,
        maxAge: 10000
    }
}));

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Sarath chandar");
});

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", authRouter)

app.listen(port, () => console.log(`listening on port ${port}`));