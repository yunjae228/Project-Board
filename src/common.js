/* eslint-disable prefer-destructuring */
const HOST = process.env.HOST

/** @type {string} */
// @ts-nocheck
const KAKAO_JAVASCRIPT_KEY = process.env.KAKAO_JAVASCRIPT_KEY
/** @type {string} */
// @ts-nocheck
const KAKAO_REST_KEY = process.env.KAKAO_REST_KEY
const KAKAO_REDIRECT_URI = `https://${HOST}/auth/kakao/callback`

module.exports = {
  HOST,
  KAKAO_JAVASCRIPT_KEY,
  KAKAO_REST_KEY,
  KAKAO_REDIRECT_URI,
}
