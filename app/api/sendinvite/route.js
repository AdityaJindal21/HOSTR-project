import nodemailer from "nodemailer";

export async function POST(req, res) {
  const { to, subject, message } = await req.json();

  if (!to || !subject || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider
      auth: {
        user: "adityajindalbti21@gmail.com", // Replace with your Gmail address
        pass: "wdcipquerkkfuihr", // Replace with your Gmail App Password
      },
    });

    await transporter.sendMail({
      from: "adityajindalbti21@gmail.com", // Replace with your email address
      to, // Recipient email
      subject, // Subject of the email
      text: message, // Email content
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
