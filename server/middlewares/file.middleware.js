const herraduraUser = process.env.GH_USER;
const herraduraPass = process.env.GH_PASS;

exports.checkCredentials = (req, res, next) => {
    const { user, password } = req.body;

    if (!(user === herraduraUser && password === herraduraPass)) {
        return res.status(401).send('Acceso denegado, comuniquese con soporte.')
    }
    next()
}