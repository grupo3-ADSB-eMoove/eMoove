const express = require('express')
const router = express.Router()

const sensorController = require('../controllers/sensorController')

router.get('/:fkEstabelecimento', (req, res) => {
  sensorController.getSensoresEstabelecimento(req, res)
})

module.exports = router