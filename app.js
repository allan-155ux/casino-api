const express = require("express")
const app = express()
const cors = require("cors")
const supabase = require("./dbConnection")

app.use(cors())
app.use(express.json())

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

const port = process.env.PORT || 3300
app.listen(port, () => {
    console.log("conected on port ", port)
})