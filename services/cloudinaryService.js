const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'duvuar6q2',
  api_key: '868172411363952',
  api_secret: 'xBejaJzVAyGPreUtPDNEvJgzJD4'
});

// Función para subir una imagen a Cloudinary
async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: "productos",  // Puedes organizar las imágenes en una carpeta
        public_id: file.originalname  // Usa el nombre original del archivo como ID público
      },
      (error, result) => {
        if (error) {
          return reject(new Error(`Error al subir la imagen a Cloudinary: ${error.message}`));
        }
        resolve(result.secure_url);  // Devuelve la URL segura de la imagen subida
      }
    );
    stream.end(file.buffer);  // Enviar el archivo buffer a Cloudinary
  });
}

// Función para actualizar la imagen en Cloudinary (eliminar la anterior y subir la nueva)
async function updateImageInCloudinary(existingImageUrl, newFile) {
  // Si existe una imagen previamente, la eliminamos de Cloudinary
  if (existingImageUrl) {
    const publicId = extractPublicId(existingImageUrl);  // Función para extraer el public_id de la URL
    await cloudinary.uploader.destroy(publicId);  // Eliminar la imagen anterior
  }

  // Subir la nueva imagen
  const newImageUrl = await uploadToCloudinary(newFile);
  return newImageUrl;  // Retornar la nueva URL de la imagen
}

async function deleteImageFromCloudinary(imageUrl) {
    if (imageUrl) {
      const publicId = extractPublicId(imageUrl);  // Extraer el public_id de la URL
      await cloudinary.uploader.destroy(publicId);  // Eliminar la imagen
    }
  }
// Función para extraer el public_id de la URL de Cloudinary (esto lo puedes adaptar si tu URL tiene otro formato)
function extractPublicId(imageUrl) {
  const parts = imageUrl.split('/');
  const publicIdWithExtension = parts.pop();
  return publicIdWithExtension.split('.')[0]; // Devuelve el public_id sin la extensión
}

module.exports = { uploadToCloudinary, updateImageInCloudinary,deleteImageFromCloudinary };
