const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, 'client/src/pages/CheckoutPage.jsx');
let checkout = fs.readFileSync(checkoutPath, 'utf8');
checkout = checkout.replace(
  /fetch\('http:\/\/localhost:3001\/api\/create-checkout-session',/g,
  "`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session`,"
);
checkout = checkout.replace(
  /const response = await fetch\(`\$\{import\.meta\.env\.VITE_API_URL \|\| 'http:\/\/localhost:3001'\}\/api\/create-checkout-session`,/g,
  "const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session`;\n      const response = await fetch(apiUrl,"
);
fs.writeFileSync(checkoutPath, checkout);

const pricingPath = path.join(__dirname, 'client/src/pages/PricingPage.jsx');
let pricing = fs.readFileSync(pricingPath, 'utf8');
pricing = pricing.replace(
  /const apiUrl = \(window\.location\.hostname === 'localhost' \|\| window\.location\.hostname === '127\.0\.0\.1'\)\n\s*\? 'http:\/\/localhost:3001\/api\/create-checkout-session'\n\s*: '\/api\/create-checkout-session';/g,
  "const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session`;"
);
fs.writeFileSync(pricingPath, pricing);
console.log("Done");
