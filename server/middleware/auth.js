import jwt from "jsonwebtoken"

const auth=async(req,res,next)=>{
    try {
        console.log(req.headers);
        const token=req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;
        if(token&& isCustomAuth) {
            const decoded=jwt.verify(token,"test");
            req.userId=decoded?.id;
        }else{
            const decoded=jwt.decode(token);
            req.userId=decoded?.sub;
        }

        next();
    }catch(err) {
        console.log(err);
    }
}

export default auth;

