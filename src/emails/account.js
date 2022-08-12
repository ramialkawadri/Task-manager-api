const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = async (email, name) => {
    const msg = {
        to: email,
        from: 'ramikw463@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}.`,
    };

    await sgMail.send(msg);
};

const sendCancelationEmail = async (email, name) => {
    const msg = {
        to: email,
        from: 'ramikw463@gmail.com',
        subject: 'Why did you leave',
        text: `Why did you stop using the app, ${name}.`,
    };

    await sgMail.send(msg);
};

module.exports = { sendWelcomeEmail, sendCancelationEmail };
