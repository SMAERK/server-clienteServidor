const { log } = require("handlebars")

exports.login = async (req, res) => {
    const { email, password, name, last_name,phone, dob } = req.body
    console.log(req.body);
    let dataInfo = []
    try {
      if(dataInfo){
        dataInfo = [email,password,name, last_name,phone,dob];
        res.json({
          status: true,
          data: {
            dataInfo,
          },
      })
      }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

