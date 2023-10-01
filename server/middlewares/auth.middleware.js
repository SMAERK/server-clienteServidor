const { admin } = require('../database/bd')

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1]
    } else {
        req.authToken = null
    }
    next()
}

exports.checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req

            const userInfo = await admin.auth().verifyIdToken(authToken)

            req.authId = userInfo.uid
            return next()
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' })
        }
    })
}

exports.permit = (...allowed) => {
    const isAllowed = (role) => allowed.indexOf(role) > -1

    // return a middleware
    return async (req, res, next) => {
        const { authToken } = req
        const userInfo = await admin.auth().verifyIdToken(authToken)

        const isValid = userInfo.rol.map((e) => isAllowed(e))

        if (userInfo.rol && isValid.includes(true)) {
            // role is allowed, so continue on the next middleware
            next()
        } else {
            // user is forbidden
            res.status(403).json({ message: 'unauthorized' })
        }
    }
}
