// import sendgrid from '@sendgrid/mail';

// const SENDGRID_API_KEY = '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';

// export const sendEmail = async (receiver) => {
//     sendgrid.setApiKey(SENDGRID_API_KEY);

//     const msg = {
//         to: receiver,
//         from: 'niyonzimadeus2002@gmail.com',
//         subject: 'Requester create a trip request',
//         text: 'notification',
//         html: '<strong> Dear manager,
// your requester requests your approval or feedback for the request</strong> ',
// };
// sendgrid
//     .send(msg)
//     .then((resp) => true)
//     .catch((error) => {
//         throw new Error('something is wrong');
//     });
// };
