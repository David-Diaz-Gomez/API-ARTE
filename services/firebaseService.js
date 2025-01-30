const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('../config/firebase.json'); // Ruta del JSON descargado

console.log("Iniciando configuración de Firebase...");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: serviceAccount.project_id + ".appspot.com" // Obtiene el storageBucket automáticamente
});

console.log("Firebase configurado correctamente.");

const bucket = getStorage().bucket();

async function uploadToFirebase(file) {
    console.log("Subiendo archivo...");

    const fileName = `images/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    console.log(`Nombre del archivo a subir: ${fileName}`);
    
    try {
        console.log("Iniciando la carga...");
        await fileUpload.save(file.buffer, { contentType: file.mimetype });
        console.log("Archivo cargado exitosamente.");

        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        console.log(`Archivo disponible en: ${fileUrl}`);
        return fileUrl;
    } catch (error) {
        console.error("Error al subir el archivo a Firebase Storage:", error);
        throw error;
    }
}

module.exports = { uploadToFirebase };
