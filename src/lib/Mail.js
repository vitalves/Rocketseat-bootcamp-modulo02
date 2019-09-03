import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, post, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      post,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  // metodo que faz o envio de email
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
