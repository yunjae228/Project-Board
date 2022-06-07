const { getUsersCollection } = require('../mongo')

/**
 * @typedef Input
 * @property {string} platform
 * @property {string} platformUserId
 * @property {string} nickname
 * @property {string} profileImageURL
 *
 */

/**
 * @typedef Output
 * @property {string} userId
 * @property {string} accessToken
 *
 */

/**
 * @param {Input} param0
 * @returns {Promise<Output>}
 */
async function createUserOrLogin({
  platform,
  platformUserId,
  nickname,
  profileImageURL,
}) {
  const users = await getUsersCollection()

  // 기존 회원인지 확인
  const existingUser = await users.findOne({
    platform,
    platformUserId,
  })

  // 기존 회원 확인
  if (!existingUser) {
    // platform , platformuserid가 없으면 새로운 회원으로 생성
  }
}

module.exports = {
  createUserOrLogin,
}
