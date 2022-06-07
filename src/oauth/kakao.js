// @ts-check

const { default: fetch } = require('node-fetch')
const { KAKAO_REST_KEY, KAKAO_REDIRECT_URI } = require('../common')
const { createUserOrLogin } = require('../auth/auth')

/**
 * @typedef kakaoTokenRes
 * @property {string} access_token
 */

/**
 * @param {import('express').Express} app
 */
function setupKakaoLogin(app) {
  // express.router를 통해 콜백경로로 접근시 setupKakaoLogin 함수 실행
  app.get('/auth/kakao/callback', async (req, res) => {
    const { code } = req.query

    if (!code || typeof code !== 'string') {
      res.status(400).end()
      return
    }

    // URLSearchParams로 토큰 발급시 필요한 필수 파라미터 ('grant_type', 'client_id', 'redirect_uri', 'code') body에 담아서 보냄
    const url = new URL('https://kauth.kakao.com/oauth/token')
    // new URL 생성자 쓴 이유: searchparams method를 사용하기 위함 .
    url.searchParams.append('grant_type', 'authorization_code')
    url.searchParams.append('client_id', KAKAO_REST_KEY)
    url.searchParams.append('redirect_uri', KAKAO_REDIRECT_URI)
    url.searchParams.append('code', code)

    // node fetch로 url 접근
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

    // 카카오 회원정보가 없으면 response 500 후 return
    const me = await userinfoRes.json()
    if (!me.id) {
      res.send(500).end()
      /* eslint-disable */
      return
    }

    const user = await createUserOrLogin({
      platform: 'kakao',
      platformUserId: me.id.toString(),
      nickname: me.kakao_account.profile.nickname,
      profileImageURL: me.kakao_account.profile.profile_image_url,
    })

    res.redirect('/')
  })
}

module.exports = {
  setupKakaoLogin,
}
