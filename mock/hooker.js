const Mock = require('mockjs')
const mockIndexData = require('../mock/index.json')

module.exports = function(app) {
  app.get('/api/user', (_, res) => {
    res.json(Mock.mock(mockIndexData.user))
  })
  app.get('/api/tasks', (_, res) => {
    res.json(Mock.mock(mockIndexData.tasks))
  })
}
