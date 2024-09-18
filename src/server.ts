
import express from 'express'
import userRoutes from './routes/user.router'
const app = express()

app.use(express.json())
app.use('/', userRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


export default app