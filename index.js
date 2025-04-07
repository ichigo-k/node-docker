import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import session from "express-session";
import {RedisStore} from "connect-redis";
import {createClient} from "redis";
import config from "./config/config.js";
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET} = config;
import postRouter from "./routes/postRoutes.js"
import userRouter from "./routes/userRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000

function connectWithRetry(){
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("connected to db")
        })
        .catch((err) => {
            console.log("Could not connect", err)

        })
}
connectWithRetry()

const RedisClient = createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
});
RedisClient.on('error', err => console.log('Redis Client Error', err));
await RedisClient.connect();

app.enable("trust proxy")
app.use(cors())
app.use(session({
    store: new RedisStore({client: RedisClient}),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000,
    },
}))
app.use(express.json())
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

app.get("/api/v1/", (req, res) => {
    res.send("I think ohooo")
})

app.listen(PORT, () => {
    console.log("App up and running")
    console.log("Port is: ", PORT)
})


//Ended at 4:26:04

