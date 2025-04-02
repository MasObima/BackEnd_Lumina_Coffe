const express = require('express')
const upload = require('../config/multer')
const {
    getProducts,
    createProduct,
    getDetailProduct,
    deleteProduct,
    updateProduct
} = require ('../controller/ProductController')

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getDetailProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id', upload.single("thumbnail"), updateProduct)
router.post('/', upload.single("thumbnail"), createProduct)

module.exports = router