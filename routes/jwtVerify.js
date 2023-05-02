const jwt = require('jsonwebtoken');

async function  verifyToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    try{
        const decoded = await jwt.verify(token,process.env.jwt_secret);
        // console.log(decoded);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        console.error(err);
        res.status(402).json({message: 'Invalid token'});
    }
}

module.exports = verifyToken;

