
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) =>{
    try {
        const token  = req.cookies.token;

        if(!token){
            return res.status(401).json({ 
                message:"Authentication error" 
           })
        };
          
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
         
        if(!decode){
            return res.status(400).json({
                message : "Invalid token"
            })
       } 

       req.id = decode.userId;
       next();
           
      } catch(err) {
        console.log(err);
    }
}