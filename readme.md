# Title: Amitha Millen-Suwanta Makeup Artist Portfolio Server


# Description:

This project is the server for a full-stack web application developed for Amitha Millen-Suwanta, a makeup artist based in Toronto, Ontario, Canada. The application showcases her portfolio and includes a custom CMS for managing and uploading content seamlessly.


# Features:

• Portfolio Showcase: Display Amitha's work with an attractive and responsive design.
• Content Management System (CMS): Manage images and text, including posting, editing, 
  and reordering content.
• User Authentication: Secure login and registration with JWT authentication.
• File Uploads: Upload and manage images via AWS S3.
• SEO Optimized: Open Graph meta tags for better social media sharing.


# Technologies Used:

Frontend:

Vite: A fast build tool for modern web projects.
React: A JavaScript library for building user interfaces.

Backend:

Express: A minimal and flexible Node.js web application framework.
Knex.js: A SQL query builder for Node.js.
MySQL: A relational database management system.

Other:

AWS S3: For storing and serving images.
AWS EC2 Ubuntu Server: For hosting the express server to handle API calls from the client.
AWS Amplify: For hosting the React client.
JWT: For secure authentication.
Nodemailer: For sending emails.


# Installation:

Prerequisites:

Node.js and npm installed
MySQL database setup
AWS S3 bucket setup for file uploads

# Backend Setup:

Clone the repository:

bash
git clone https://github.com/yourusername/amitha-hmua-portfolio-site-server.git
cd amitha-hmua-portfolio-site-server
Install dependencies:

bash
npm install
Create a .env file in the root directory with the following environment variables:


# Sample .env:

dotenv
# Port configuration for the server
PORT=8000

# JWT secrets for authentication
JWT_SECRET=dummy_jwt_secret
JWT_REFRESH_SECRET=dummy_jwt_refresh_secret

# Database connection details
DB_HOST=localhost
DB_USER=dummy_user
DB_PASSWORD=dummy_password
DB_DATABASE=dummy_db

# Email configuration for notifications or contact forms
EMAIL=dummy_email@example.com
PASSWORD=dummy_email_password

# Client host configuration for CORS and other purposes
CLIENT_HOST=http://localhost:5173

# AWS S3 configuration for file storage
AWS_REGION=dummy_region
AWS_BUCKET_NAME=dummy_bucket_name
AWS_ACCESS_KEY_ID=dummy_access_key_id
AWS_SECRET_ACCESS_KEY=dummy_secret_access_key
AWS_BUCKET_BASE_URL=https://dummy-bucket.s3.dummy-region.amazonaws.com/
AWS_BUCKET_PATH=https://dummy-bucket.s3.dummy-region.amazonaws.com/
AWS_SHOOTS_DIRNAME=dummy_shoots_dirname
AWS_BIO_DIRNAME=dummy_bio_dirname

Run database migrations:

bash
npm run migrate:latest
Start the server:

bash
npm start

# Endpoint Documentation:

https://flannel-modem-15e.notion.site/Amitha-HMUA-Portfolio-Site-API-Calls-4c8b143053284c47801a2adbfe60299f

## Contact

For any questions, feedback, or support, please reach out to:

- **Email:** ericdelmermillen@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/eric-delmer-millen/
- **Twitter:** @EricDelmer