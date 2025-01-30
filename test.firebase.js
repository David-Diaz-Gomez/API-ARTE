const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase.json'); // Asegúrate de que esta ruta es correcta

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: serviceAccount.project_id + ".appspot.com"
});

console.log("✅ Firebase Configurado Correctamente");
console.log("🔹 Proyecto:", serviceAccount.project_id);
console.log("🔹 Storage Bucket:", serviceAccount.project_id + ".appspot.com");
