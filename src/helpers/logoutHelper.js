import client from "./initRedis"

export const blacklistAccessToken = async (token) => {
    await client.SADD('accessTokens', token)
}

export const blacklistRefreshToken = async (token) => {
    await client.SADD('refreshTokens', token)
}

export const isAccessTokenBlacklisted = async (token) => {
    return await client.SISMEMBER('accessTokens', token)
}