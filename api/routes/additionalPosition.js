const express = require('express')
const router = express.Router()
const {getAdds, createAdd, editAdd, deleteAdd} = require('../utils/additionalPositionStorage')

router
    .get('/', getAdds)
    .post('/', createAdd)
    .patch('/:id', editAdd)
    .delete('/:id', deleteAdd)

module.exports = router