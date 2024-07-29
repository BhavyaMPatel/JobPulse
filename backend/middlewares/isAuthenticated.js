import jwt from "jsonwebtoken";

async function decodeJWT(token){

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        console.log('After Decode:'+decode.userId);

        return decode;
      } catch (error) {
        console.error('Error generating token:', error);
        throw error;
      }

}

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("TOKEN IS "+token);
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        
        const decode = await decodeJWT(token);


        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;
