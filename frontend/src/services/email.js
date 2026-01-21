import emailjs from "emailjs-com";

export function sendResultEmail(toEmail, resultLink) {
  return emailjs.send(
    "YOUR_SERVICE_ID",     // from EmailJS
    "YOUR_TEMPLATE_ID",    // auto-reply template
    {
      to_email: toEmail,
      result_link: resultLink
    },
    "YOUR_PUBLIC_KEY"      // EmailJS public key
  );
}
