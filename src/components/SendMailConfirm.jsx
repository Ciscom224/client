import emailjs from '@emailjs/browser';

// Ce composant nous permet de pouvoir envoyé un mail a un utilisateur afin de pouvoir vérifier que son email existe bel et bien
// On utilise eamil.js depuis le coté client
export const sendAuthMail = (userMail,code) => {
    const serviceId = "service_xuqr26r"
    const templateId = "template_kteg1hf"
    const publicKey = "NkwfG2aeiZPXgwkoW"
    
    const templateParams = {
        to_email:userMail,
        message:code,
    };

    emailjs
      .send(serviceId, templateId, templateParams,publicKey)
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
};