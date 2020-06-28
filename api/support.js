const nodemailer = require("nodemailer");

module.exports = (app) => {
  let remetente = nodemailer.createTransport({
    host: "",
    service: "",
    port: 587,
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  });

  const sendMail = (req, res) => {
    const info = { ...req.body };

    let infoSend = {
      from: "",
      to: "",
      subject: info.subject,
      text: `${info.text} Enviado de: ${info.to}`,
    };

    remetente.sendMail(infoSend, function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Enviado com sucesso");
      }
    });
  };
  return { sendMail };
};
