import jwt from "jsonwebtoken"

const genrateToken = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    });
    //Set JWT as an HTTP-Only Cookie

    res.cookie('jwt',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV !== 'development',
    sameSite:'strict',
    maxAge:30*24*60*60*1000
    })
    return token
}
export default genrateToken;