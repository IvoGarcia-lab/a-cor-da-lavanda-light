// server.js
// Startup file for Hostinger Node.js Web App

process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = 'production';

// Require the Next.js standalone server
require('./.next/standalone/server.js');
