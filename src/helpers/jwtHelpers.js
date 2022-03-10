import jwt from "jsonwebtoken";
import createError from 'http-errors'

export const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '1h',
            issuer: 'pickurpage.com',
            audience: userId,
        }
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message)
                reject(createError.InternalServerError())
                return
            }
            resolve(token)
        })
    })
}

export const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            const message =
                err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(createError.Unauthorized(message))
        }
        req.payload = payload
        next()
    })
}

export const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: '1y',
            issuer: 'pickurpage.com',
            audience: userId,
        }
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message)
                // reject(err)
                reject(createError.InternalServerError())
            }

            client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                }
                resolve(token)
            })
        })
    })
}


export const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, payload) => {
                if (err) return reject(createError.Unauthorized())
                const userId = payload.aud
                client.GET(userId, (err, result) => {
                    if (err) {
                        console.log(err.message)
                        reject(createError.InternalServerError())
                        return
                    }
                    if (refreshToken === result) return resolve(userId)
                    reject(createError.Unauthorized())
                })
            }
        )
    })
}