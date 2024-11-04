const { response, SUCCESS, CREATED } = require('../core/response');
const mailer = require('../models/mailer');

module.exports.emailsend = (req, res) => {
  
  const email_body={
    from: 'Five Wound Shrine',
    to: req.body.email,
    subject: 'Church Scheduler',
    // text: req.user.phone_number + " " + req.body.text,
    html: "From: SHRINE OF THE FIVE WOUNDS OF OUR LORD JESUS CHRIST" + "<br>" +
    "You have successfully send a reservation request"  + "<br>" + 
    "Regards:" + "<br>" + 
    "Wound Shrine of the lord Jesus Christ"

  }
  mailer.sendMail(email_body)
  .then(result => {
    res.success(response(SUCCESS, '', result))
  })
  .catch(err => {
    res.error(err);
  })
}