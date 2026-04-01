const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, 'client/src/pages/CheckoutPage.jsx');
let checkout = fs.readFileSync(checkoutPath, 'utf8');

const badStr = "const response = await `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session`, {";
const goodStr = "const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-checkout-session`, {";

if(checkout.includes(badStr)) {
  checkout = checkout.replace(badStr, goodStr);
  fs.writeFileSync(checkoutPath, checkout);
  console.log("Fixed checkout");
} else {
  console.log("Not found");
}

