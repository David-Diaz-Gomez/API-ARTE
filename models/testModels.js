const { sendEmailToAdmins } = require('../services/emailService');

async function test () {
    console.log("🚀 Probando envío de correo...");
    const result = await sendEmailToAdmins(
        "davidgerdiaz777@gmail.com",  // Reemplaza con un correo real para la prueba
        "Descripción de prueba",
        100000,
        "Usuario Test",
        "test@example.com"
    );

    console.log("✅ Resultado del envío:", result);
};

module.exports = {
    test
}