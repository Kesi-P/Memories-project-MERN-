import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        //working on own token
        if( token && isCustomAuth ){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id
        }
        //on google token
        else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub;
        }
        //if you get all the permissions you can go to next methode, take the usr to controller
        next();
    } catch(error){
        console.error();
    }
}

export default auth;