const nodemailer = require("nodemailer");
const Usuario = require("../dtos/userDTO");
const personalizationObserver = require("../models/personalizationObserver");

// Configurar el transportador SMTP de Gmail
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "artesaniaspatrones@gmail.com",  // Cambia esto por tu email real
        pass: process.env.GMAIL  // Reemplaza con tu contraseña de aplicación
    }
});

// Función para enviar correos a los administradores
async function sendEmailToAdmins(subject, text) {
    try {
        // Buscar todos los usuarios con el rol de administrador
        const admins = await Usuario.find({ rol: "679974940ebdd7c19d3e73f5" });

        if (admins.length === 0) {
            console.log("⚠️ No se encontraron administradores con el rol especificado.");
            return;
        }

        console.log(`📩 Enviando correos a ${admins.length} administradores...`);

        // Iterar sobre cada administrador y enviar el correo
        for (const admin of admins) {
            try {
                let info = await transporter.sendMail({
                    from: '"Artesanías" <artesaniaspatrones@gmail.com>',
                    to: admin.email,
                    subject: subject,
                    text: text
                });

                console.log(`✅ Correo enviado a: ${admin.email} (${info.messageId})`);
            } catch (error) {
                console.error(`❌ Error enviando a ${admin.email}:`, error.message);
            }
        }

    } catch (error) {
        console.error("❌ Error buscando administradores:", error);
    }
}

// Suscribimos el servicio de email a los eventos del Observer
personalizationObserver.on("personalizationCreated", async (data) => {
    const { description, budget, nombreUsuario, correoUsuario } = data;
    const subject = "Nueva personalización creada";
    const text = `Descripción: ${description}\nPresupuesto: ${budget}\nUsuario: ${nombreUsuario} (${correoUsuario})`;

    await sendEmailToAdmins(subject, text);
});

personalizationObserver.on("personalizationUpdated", async (data) => {
    const { description, budget, nombreUsuario, correoUsuario } = data;
    const subject = "Personalización actualizada";
    const text = `Nueva descripción: ${description}\nNuevo presupuesto: ${budget}\nUsuario: ${nombreUsuario} (${correoUsuario})`;

    await sendEmailToAdmins(subject, text);
});

module.exports = { sendEmailToAdmins };
