const contactEmailTemplate = (name, email, subject, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px 40px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">📬 New Portfolio Inquiry</h1>
                  <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 14px;">Someone wants to connect with you!</p>
                </td>
              </tr>

              <!-- Sender Info -->
              <tr>
                <td style="padding: 30px 40px 20px 40px;">
                  <table role="presentation" style="width: 100%; background: #f8fafc; border-radius: 12px; padding: 20px;">
                    <tr>
                      <td style="padding-bottom: 12px;">
                        <strong style="color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">From</strong>
                        <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 18px; font-weight: 600;">${name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px;">
                        <strong style="color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                        <p style="margin: 4px 0 0 0; color: #6366f1; font-size: 16px;">
                          <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style="color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</strong>
                        <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 16px; font-weight: 500;">${subject}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <strong style="color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</strong>
                  <div style="background: #f8fafc; border-left: 4px solid #6366f1; padding: 20px; margin-top: 8px; border-radius: 0 12px 12px 0;">
                    <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </td>
              </tr>

              <!-- Quick Actions -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <table role="presentation" style="width: 100%;">
                    <tr>
                      <td style="text-align: center;">
                        <a href="mailto:${email}?subject=Re: ${subject}&body=Hi ${name},%0D%0A%0D%0AThanks for reaching out!%0D%0A%0D%0A" 
                           style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-right: 12px;">
                          ✉️ Reply to ${name}
                        </a>
                        <a href="https://wa.me/${email.replace(/\D/g, '')}" 
                           style="display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                          💬 WhatsApp
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #f1f5f9; padding: 20px 40px; text-align: center;">
                  <p style="margin: 0; color: #64748b; font-size: 12px;">
                    Sent from <strong>Tarun's Portfolio</strong> on ${new Date().toLocaleString('en-IN', { 
                      timeZone: 'Asia/Kolkata',
                      dateStyle: 'full',
                      timeStyle: 'short'
                    })}
                  </p>
                  <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 11px;">
                    IP: ${Math.random().toString(36).substring(7)} | ID: ${Date.now().toString(36).toUpperCase()}
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

module.exports = { contactEmailTemplate };