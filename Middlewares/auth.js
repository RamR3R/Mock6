const jwt = require("jsonwebtoken");


const auth = (req,res,next)=>{
    jwt.verify(req.headers.authorization.split(" ")[1], 'masai',async function(err, decoded) {
    console.log(await decoded.name)
    if(await decoded.id)
    {
        req.body.name = decoded.name;
        req.body.userID = decoded.id;
        next();
    }
    else
    {
        res.status(400).json({message : "Invalid token"});
    }
  });
}


module.exports = auth;