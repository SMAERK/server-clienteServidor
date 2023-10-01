require('dotenv').config({ path: '.env.dev' })
const os = require('os')
const formData = require('express-form-data')

const express = require('express')
const cors = require('cors')

/** Settings * */
const server = express()
server.set('port', process.env.PORT || 5000)

const config = {
    uploadDir: os.tmpdir(),
    autoClean: true,
}

server.use(formData.parse(config))
server.use(formData.format())
// server.use(formData.stream())
server.use(formData.union())

/** Middlewares * */
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))
server.use(cors())

/** Routes * */

const authRouter = require('./server/routes/auth.router')

server.use('/api/v1/auth', authRouter)


server.listen(server.get('port'), () => {
    console.log('Express server started on port', server.get('port'))
})
