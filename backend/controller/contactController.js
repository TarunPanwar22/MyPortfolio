const { createTransporter } = require('../config/email');
const { contactEmailTemplate } = require('../utils/emailTemplate');

const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: {
      name: `Portfolio Contact - ${name}`,
      address: process.env.EMAIL_USER
    },
    to: process.env.RECEIVER_EMAIL,
    replyTo: {
      name: name,
      address: email
    },
    subject: `📬 ${subject} | Message from ${name}`,
    html: contactEmailTemplate(name, email, subject, message),
    
    // Text version for non-HTML email clients
    text: `
New message from your portfolio:

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Reply to: ${email}
Sent at: ${new Date().toLocaleString()}
    `.trim()
  };

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent from ${email}`);
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Time: ${new Date().toISOString()}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('❌ Email send failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
};

module.exports = { sendContactEmail };