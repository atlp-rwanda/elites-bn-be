import client from './initRedis.js';

export const blacklistAccessToken = async (token) => {
  await client.SADD('accessTokens', token);
};

export const blacklistRefreshToken = async (token) => {
  await client.SADD('refreshTokens', token);
};

export const isAccessTokenBlacklisted = async (token) => await client.SISMEMBER('accessTokens', token);