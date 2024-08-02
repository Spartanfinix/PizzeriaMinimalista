const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tu_email@gmail.com',
      pass: 'tu_contraseña'
    }
  });

  const mailOptions = {
    from: email,
    to: '23202022@utfv.edu.mx',  // El correo al que quieres enviar los mensajes
    subject: `Mensaje de ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.send('Correo enviado con éxito');
    }
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
