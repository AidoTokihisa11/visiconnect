const fs = require('fs');
const path = require('path');

const pricingPath = path.join(__dirname, 'client/src/pages/PricingPage.jsx');
let pricing = fs.readFileSync(pricingPath, 'utf8');

const badCode = `      // En production, utilisez une URL relative ou configurée via ENV
      const apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:3001/api/create-checkout-session'
        : '/api/create-checkout-session';`;

const goodCode = `      const apiUrl = \`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session\`;`;

if (pricing.includes(badCode)) {
  pricing = pricing.replace(badCode, goodCode);
  fs.writeFileSync(pricingPath, pricing);
  console.log("Pricing updated");
} else {
  console.log("badCode not found in Pricing");
}

const checkoutPath = path.join(__dirname, 'client/src/pages/CheckoutPage.jsx');
let checkout = fs.readFileSync(checkoutPath, 'utf8');

const badCodeC = `const response = await fetch('http://localhost:3001/api/create-checkout-session'`;
const goodCodeC = `const response = await fetch(\`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session\``;
if (checkout.includes(badCodeC)) {
  checkout = checkout.replace(badCodeC, goodCodeC);
  fs.writeFileSync(checkoutPath, checkout);
  console.log("Checkout updated");
} else {
  console.log("badCodeC not found in checkout");
}
