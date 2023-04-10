const nodemailer = require("nodemailer");
// const { findAllEmail, createEmail, editEmail, findOneEmail, deleteEmail } = require('./emailDb');
// const { decodeToken, decodeByToken } = require('./AuthServices/jwtServices')
// const { findOneClaimByName } = require('./AuthServices/claimsDb')
function connectToSmtp() {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "testlamtemail@gmail.com",
            pass: "nrcehgnoolbgxbds",
        },
    });
}

function send2faOTP(email, otp) {
    // const mail = await findOneByKey('forget_password');
    const transporter = connectToSmtp();
    transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `Dear Customer, two factor authentication started. If it was not you, report. Do not share your details/OTP <b> ${otp}</b> with anyone.`,
    });
}
// async function getEmailTemplates(req, res, next) {
//     const emailType = await findAllEmail();
//     res.send({ message: "Displaying Email Templates", emailType: emailType, status: true });
// }

// async function getEmails(req, res, next) {
//     const id = +req.params.id;
//     if (id) {
//         const emailType = await findOneEmail(id);
//         res.send({ emailType: emailType, status: true });
//     } else {
//         res.send({ message: "Add Template", status: true });
//     }
// }

// async function postEmail(req, res, next) {
//     const obj = req.body.data;
//     if (obj?.email) {
//         const transporter = connectToSmtp();
//         transporter.sendMail({
//             from: obj.userEmail,
//             to: obj.email,
//             subject: obj.subject,
//             text: "Hello world?",
//             html: obj.body
//         })
//         res.send({ message: "mail sent" });
//     } else if (obj?.id) {
//         await editEmail(obj.id, obj.key, obj.subject, obj.body);
//         res.send({ message: "template updated" })
//     } else {
//         await createEmail(obj.key, obj.subject, obj.body);
//         res.send({ message: "template saved" });
//     }
// }
// async function deleteMail(req, res) {
//     await deleteEmail(+req.params.id);
//     res.send({ message: "template deleted", status: true })
// }



module.exports = { send2faOTP };
