const Product = require("../dtos/productDTO");

const { uploadToCloudinary,updateImageInCloudinary,deleteImageFromCloudinary } = require("../services/cloudinaryService");

async function add_product(req, res) {
  try {
    const { name, unitPrice, quali, category, description, state } = req.body;
    const file = req.file;
    // console.log("Archivo recibido:", file);

    if (!file) {
      return res.status(400).send({ message: "Imagen requerida" });
    }

    // Subir imagen a Cloudinary
    const imageUrl = await uploadToCloudinary(file); // Usar la función de Cloudinary

    // Crear y guardar producto con la URL de la imagen
    const product = new Product({
      name,
      unitPrice,
      quali,
      category,
      description,
      state: state !== undefined ? state : true,
      image: imageUrl,
    });

    await product.save();

    res
      .status(201)
      .json({ error: false, message: "Producto creado", data: product });
  } catch (error) {
    console.error("Error en el servidor:", error); // Imprimir el error completo en la consola para depurarlo
    res.status(500).json({
      error: true,
      message: `Error en el servidor: ${error.message || error}`,
    });
  }
}

async function read_product(req, res) {
  try {
    const products = await Product.find().populate('category'); // Traer los productos con su categoría

    res.status(200).json({ error: false, data: products });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      error: true,
      message: `Error en el servidor: ${error.message || error}`,
    });
  }
}

async function read_productById(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate('category'); // Traer el producto con su categoría

    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    res.status(200).json({ error: false, data: product });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      error: true,
      message: `Error en el servidor: ${error.message || error}`,
    });
  }
}


async function update_product(req, res) {
    try {
      const { productId } = req.params; // Obtener ID del producto de la URL
      const { name, unitPrice, quali, category, description, state } = req.body;
      const file = req.file;
  
      // Buscar el producto en la base de datos
      console.log(productId);
      let product = await Product.findById(productId);
      console.log(product);
      if (!product) {
        return res.status(404).send({ message: "Producto no encontrado" });
      }
  
      // Si se recibe una nueva imagen, actualizarla en Cloudinary
      if (file) {
        product.image = await updateImageInCloudinary(product.image, file); // Actualizar la imagen
      }
  
      // Actualizar otros campos del producto
      product.name = name || product.name;
      product.unitPrice = unitPrice || product.unitPrice;
      product.quali = quali || product.quali;
      product.category = category || product.category;
      product.description = description || product.description;
      product.state = state !== undefined ? state : product.state;
  
      // Guardar los cambios en la base de datos
      await product.save();
  
      // Responder con el producto actualizado
      res
        .status(200)
        .json({ error: false, message: "Producto actualizado", data: product });
    } catch (error) {
      console.error("Error en el servidor:", error); // Imprimir el error completo en la consola para depurarlo
      res.status(500).json({
        error: true,
        message: `Error en el servidor: ${error.message || error}`,
      });
    }
  }
  

async function updateAcceso_product(req, res) {
  try {
    const { productId } = req.params; // Obtener ID del producto de la URL
    const product = await Product.findById(productId); // Buscar el producto en la base de datos

    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    // Modificar el estado del producto a false
    product.state = false;

    // Guardar el producto con el nuevo estado
    await product.save();

    res.status(200).json({
      error: false,
      message: "Estado del producto actualizado a false",
      data: product,
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      error: true,
      message: `Error en el servidor: ${error.message || error}`,
    });
  }
}

async function delete_product(req, res) {
    try {
      const { productId } = req.params; // Obtener ID del producto de la URL
      const product = await Product.findById(productId); // Buscar el producto en la base de datos
  
      if (!product) {
        return res.status(404).send({ message: "Producto no encontrado" });
      }
  
      // Eliminar la imagen de Cloudinary si existe
      await deleteImageFromCloudinary(product.image); // Usar el servicio para eliminar la imagen de Cloudinary
  
      // Eliminar el producto de la base de datos
      const deletedProduct = await Stock.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({
            error: true,
            message: "Stock no encontrado"
        });
    }
    
    res.status(200).json({
        error: false,
        message: "Stock eliminado correctamente"
    });
  
      res
        .status(200)
        .json({ error: false, message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({
        error: true,
        message: `Error en el servidor: ${error.message || error}`,
      });
    }
  }

  async function count_products_by_category(req, res) {
    try {
      const counts = await Product.aggregate([
        { $match: { state: true } }, // Filtrar solo productos activos
        { $group: { _id: "$category", count: { $sum: 1 } } }, // Agrupar por categoría y contar
        { $lookup: { 
            from: "categoryprods", 
            localField: "_id", 
            foreignField: "_id", 
            as: "category_info" 
        }},
        { $unwind: "$category_info" }, // Descomponer el array de categoría
        { $project: { _id: 0, category: "$category_info.name", count: 1 } } // Formato de salida
      ]);
  
      res.status(200).json({ error: false, data: counts });
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({
        error: true,
        message: `Error en el servidor: ${error.message || error}`,
      });
    }
  }

function extractPublicId(url) {
  const regex = /\/v\d+\/([^/]+)/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
}

module.exports = {
  count_products_by_category,
  add_product,
  read_product,
  read_productById,
  update_product,
  updateAcceso_product,
  delete_product,
};
