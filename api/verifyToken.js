const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const patientAuthHeader =  req.headers.token
    if(patientAuthHeader){
        const tokken = authHeader.split(" ")[1]
        
        jwt.verify(tokken, process.env.JWT_TOKKEN, (error, user) => {
            if (error) res.status(403).json('Token is not valid!')
            else{
                req.user = user
                next()
            }
        })
    }
    else{
        // Todo redirect to error page 
        return res.status(401).json('Failed to authenticate User !!')
    }
}

module.exports = verify