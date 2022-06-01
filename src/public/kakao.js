/* eslint-disable no-undef */
;(() => {
  Kakao.init('bb2e4f74948713d4f10858a73d977bff')

  const el = document.getElementById('kakao-login')
  if (!el) {
    console.error('Kakao login button is not found.')

    return
  }

  el.addEventListener('click', () => {
    Kakao.Auth.authorize({
      redirectUri: `https://34f3-118-41-138-123.jp.ngrok.io/auth/kakao/callback`,
    })
  })
})()
