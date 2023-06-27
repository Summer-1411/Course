const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ status: false, message: 'Không có Access Token !' })

	try {

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = decoded
        //console.log({decoded});
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ status: false, message: 'Access Token không hợp lệ !' })
	}
}


const verifyTokenAndAuthorization = (req, res, next) => {
    
    verifyToken(req, res, () => {
        
        const id = req.user.id
        const par = req.params.id
        console.log(req.user)
        console.log({id, par});
        if(id === par || req.user.isAdmin === "admin"){
            next();
        }else {
            return res.status(403).json({status: false, message: "Bạn không được phép làm điều đó !"})
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin === "admin"){
            next();
        }else {
            return res.status(403).json({status: false, message: "Bạn không được phép làm điều đó !"})
        }
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}

