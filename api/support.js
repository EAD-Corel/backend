const nodemailer = require("nodemailer");

module.exports = (app) => {
  let remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "rafael13rodrigo@gmail.com",
      pass: "r4f@31r4f@31r4f@31",
    },
  });

  const sendMail = (req, res) => {
    const info = { ...req.body };

    let infoSend = {
      from: "rafael12rodrigo@gmail.com",
      to: "rafael13rodrigo@gmail.com",
      subject: "Enviando email",
      text: "texto",
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
