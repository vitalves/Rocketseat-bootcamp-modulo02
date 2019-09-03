// import User from '../app/models/User';

export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'a7227337ea27aa',
    pass: 'ee8d373584a627',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com',
  },
};

/* SERVICOS DE EMAIL
*
( producao):
 * Amazon SES
 * Mailgun
 * Sparkpost
 * Mandril (MailChimp)
 *
 ( Desenvolvimento):
 * Mailtrap
 */
