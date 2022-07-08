import jwt from "jsonwebtoken";


const auth=async(req,res,next)=>{
    try {
    const token=req.headers.authorization.split(" ")[1];
    const isCurrentToken=token.length<500;
    if(token&& isCurrentToken) {
        const decoded=jwt.verify(token,"test");
        req.userId=decoded.id;
    }

    if(token && !isCurrentToken) {
        const decoded=jwt.decode(token);
        req.userId=decoded.sub;
    }

    next();
    }catch(err) {
        console.log(err);
    }
}


export default auth;