// server.js
// Startup wrapper for Hostinger Node.js Web App

console.log("=== Node.js Web App Bootstrapping ===");
console.log("Target PORT:", process.env.PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Current Directory:", process.cwd());

// Fix for Passenger Unix socket path parsing in Next.js standalone server
if (process.env.PORT && isNaN(Number(process.env.PORT))) {
  console.log("Detected Unix socket / named pipe. Applying parseInt patch...");
  const originalParseInt = global.parseInt;
  global.parseInt = function(value, radix) {
    if (value === process.env.PORT) {
      return value; // Return the string socket path directly to Next.js
    }
    return originalParseInt(value, radix);
  };
}

process.env.NODE_ENV = 'production';

// Start the Next.js standalone server
require('./.next/standalone/server.js');
