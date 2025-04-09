const cloudinary = require('../config/cloudinary')
const Product = require('../models/Product')

exports.getProducts = async (req, res) =>{
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getDetailProduct = async (req, res) =>{
    try{
        const {id} = req.params
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({message: "produk tidak ditemukan"})
        }
        res.json(product)
    }catch(error){
        console.error(error)
        res.status(500).json({message: "server error"})
    }
}

exports.createProduct = async (req, res) => {
    try {
      if (!req.file || !req.file.path) {
        return res.status(400).json({ message: 'File thumbnail tidak ditemukan.' });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "product"
      });
  
      const product = new Product({
        ...req.body,
        thumbnail: result.secure_url,
        cloudinaryId: result.public_id
      });
  
      await product.save();
      res.status(201).json(product);
  
    } catch (error) {
      console.error('Error saat createProduct:', error);
      res.status(500).json({ message: error.message });
    }
  };
  


exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Produk tidak ditemukan" });
        }

        if (product.cloudinaryId) {
            await cloudinary.uploader.destroy(product.cloudinaryId);
        }

        await product.deleteOne();

        res.status(200).json({ message: "Produk berhasil dihapus" });

    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
        res.status(500).json({ error: "Gagal menghapus produk" });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        console.log('req.file', req.file);

        let result;
        if (req.file) {
            if (product.cloudinaryId) {
                await cloudinary.uploader.destroy(product.cloudinaryId);
            }

            result = await cloudinary.uploader.upload(req.file.path, {
                folder: "product",
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...req.body,
                thumbnail: result?.secure_url || product.thumbnail,
                cloudinaryId: result?.public_id || product.cloudinaryId,
            },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};