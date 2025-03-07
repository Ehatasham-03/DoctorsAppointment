import jwt from 'jsonwebtoken'

const docAuth = async( req , res , next ) => {

    try {
        
        const {doctortoken} = req.headers

        if(!doctortoken){
            return res.json({
                success:false , message : "Not Authorized login again"
            })
        }
        const decodeToken =  jwt.verify(doctortoken , process.env.JWT_SECRET)
        
        req.body.docId = decodeToken.id

        next()

    } catch (error) {
        console.log(error);
        return res.json({
            success:false , message : error.message
        })
    }

}

export default docAuth;