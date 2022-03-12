import { USER_EXIST, USER_REGISTERED, USER_LOGIN, INVALID_LOGIN, SERVER_ERROR } from '../constants/user-constants';
import { hashPassword, comparePassword } from '../helpers/passwordSecurity';
import { generateToken, generateRefreshToken, verifyRefreshTokens } from '../helpers/jwtFunction'
import { userExist, createUser, updateUser, createArticles } from '../services/userServices.js';
import  models  from '../models'

export class UserControllers {
  //register a user
  async registerUser(req, res) {
    try {
      // Check if user exists
      const exist = await userExist(req.body.email);
      if (exist) {
        res.status(409).json({ status: 409, message: USER_EXIST, payload: '' });
      } else {
        req.body.password = await hashPassword(req.body.password)
        const createdUser = await createUser(req.body);
        res.status(201).json({ status: 201, message: USER_REGISTERED, payload: createdUser });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error! ' });
    }
  }


  async login(req, res) {
    //login a user
    try {
      const exist = await userExist(req.body.email)
      if (exist) {
        const valid = await comparePassword(req.body.password, exist.password)
        if (!valid) {
          return res.status(403).json({ status: 403, message: "Invalid credentials" })
        }
        const token = await generateToken({ id: exist.id })
        const refreshToken = await generateRefreshToken({ id: exist.id })
        const userCreated = await models.refreshTokenTable.create({refreshToken});
        return res.status(201).json({ status: 201, message: USER_LOGIN, payload: { accesstoken: token, refreshToken } });
      }
      else {
        return res.status(403).json({ status: 403, message: INVALID_LOGIN });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, message: SERVER_ERROR });
    }

  }

  async createArticle(req, res) {
    //using post end point to check authentication
     try{
      const article = {
              title: req.body.title,
              content: req.body.content,
            }
            const newArticle = await createArticles(article)
            res.status(201).json({ status: 201, message: "Article created successfully", newArticle })
     } catch(error){
      res.status(500).json({ message: "Internal server error!" })
     }
  }



  async refreshTokens (req, res, next){
  try {
    const { refreshToken } = req.body
    if (!refreshToken) 
    return res.status(403).json({ status: 403, message: "Bad request" })
    
    const userId = await verifyRefreshTokens(refreshToken)

    const accessToken = await generateToken(userId)
    const refToken = await  generateRefreshToken(userId)
    res.send({ accessToken: accessToken, refreshToken: refToken })

  } catch (error) {
    next(error)
  }
}
}



