const fs = require('fs');
const path = require('path');

const pricingPath = path.join(__dirname, 'client/src/pages/PricingPage.jsx');
let pricing = fs.readFileSync(pricingPath, 'utf8');

pricing = pricing.replace(
  /\/\/ En production, utilisez une URL relative ou configurée via ENV\s+const apiUrl = \(window\.location\.hostname === 'localhost' \|\| window\.location\.hostname === '127\.0\.0\.1'\)\s+\? 'http:\/\/localhost:3001\/api\/create-checkout-session'\s+: '\/api\/create-checkout-session';/g,
  `const apiUrl = \`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session\`;`
);

fs.writeFileSync(pricingPath, pricing);
console.log("Pricing updated");

const checkoutPath = path.join(__dirname, 'client/src/pages/CheckoutPage.jsx');
let checkout = fs.readFileSync(checkoutPath, 'utf8');

checkout = checkout.replace(
  /fetch\('http:\/\/localhost:3001\/api\/create-checkout-session'/g,
  "fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session`"
);

fs.writeFileSync(checkoutPath, checkout);
console.log("Checkout updated");
