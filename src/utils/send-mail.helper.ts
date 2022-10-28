import emailjs from '@emailjs/browser';
const emailServiceID = process.env.EMAIL_SERVICE_ID_PROD || '';
const templateID = process.env.EMAIL_TEMPLATE_ID_PROD || '';
const publicKey = process.env.EMAIL_PUBLIC_KEY_PROD || '';


export const sendEmail = async (email: string, codeVerification: number) => {
  try {
    console.log('emailServiceID:', emailServiceID);
    console.log('templateID:', templateID);
    console.log('publicKey:', publicKey);

    await emailjs.send(emailServiceID,templateID,{
      userMail: email,
      codeVerification: codeVerification,
    }, publicKey);

  } catch (error) {
    console.error('Error al intentar enviar el correo:', error)
    return new Error('Error al intentar enviar el correo:');
  }

}
