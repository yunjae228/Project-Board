// @ts-check

/**
 * @param {import('express').Express} app
 */
function setupKakaoLogin(app) {
  app.get('/auth/kakao/callback', async (req, res) => {
    const { code } = req.query

    if (!code || typeof code !== 'string') {
      res.status(400).end()
    }
  })
}

module.exports = {
  setupKakaoLogin,
}
