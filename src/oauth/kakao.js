// @ts-check

const { default: fetch } = require('node-fetch')
/**
 * @typedef kakaoTokenRes
 * @property {string} access_token
 */

/**
 * @param {import('express').Express} app
 */
function setupKakaoLogin(app) {
  app.get('/auth/kakao/callback', async (req, res) => {
    const { code } = req.query

    if (!code || typeof code !== 'string') {
      res.status(400).end()
      return
    }

    const url = new URL('https://kauth.kakao.com/oauth/token')
    url.searchParams.append('grant_type', 'authorization_code')
    url.searchParams.append('client_id', 'a6fdea2b23f9e2d32b073bbf33ced3c7')
    url.searchParams.append(
      'redirect_uri',
      'https://34f3-118-41-138-123.jp.ngrok.io/auth/kakao/callback'
    )
    url.searchParams.append('code', code)

    const kakaoTokenRes = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })

    const accessToken = (await kakaoTokenRes.json()).access_token

    const userinfoRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })

    const me = await userinfoRes.json()
    if (!me.id) {
      res.send(500).end()
    } else {
      console.log(me)
    }
  })
}

module.exports = {
  setupKakaoLogin,
}
