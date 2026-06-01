import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "send-email-api",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === "/api/send-email" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", async () => {
              try {
                const { name, email, message } = JSON.parse(body);

                // Import nodemailer dynamically
                const nodemailer = await import("nodemailer");
                
                // Configure transport
                const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: process.env.VITE_USER_EMAIL || "kasunmundigala180@gmail.com",
                    pass: process.env.VITE_USER_PASS || "mufktylufapaqick",
                  },
                });

                const mailOptions = {
                  from: `"${name}" <${email}>`,
                  to: process.env.VITE_USER_EMAIL || "kasunmundigala180@gmail.com",
                  subject: `New Portfolio Message from ${name}`,
                  text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                  replyTo: email,
                };

                await transporter.sendMail(mailOptions);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, message: "Email sent successfully!" }));
              } catch (error) {
                console.error("Error sending email:", error);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, error: error.message }));
              }
            });
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
