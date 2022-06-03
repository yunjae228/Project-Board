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
}

module.exports = {
  createUserOrLogin,
}
