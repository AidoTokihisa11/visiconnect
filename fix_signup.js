const fs = require('fs');
const filePath = 'client/src/pages/SignupPage.jsx';
const txt = fs.readFileSync(filePath, 'utf8');
const parts = txt.split('// Styled Components (réutilisation et ajouts)');
if (parts.length > 1) {
  const compIndex = txt.indexOf('\nconst SignupPage =');
  const importsAndHook = txt.substring(0, compIndex);
  const comp = txt.substring(compIndex, txt.indexOf('// Styled Components (réutilisation et ajouts)'));
  
  // Also remove the "export default SignupPage" from the styled components part, and append it at the very end
  let styledPart = parts[1];
  styledPart = styledPart.replace('export default SignupPage', '');
  
  const newFile = importsAndHook + '\n// Styled Components\n' + styledPart + '\n\n' + comp + '\n\nexport default SignupPage;\n';
  fs.writeFileSync(filePath, newFile);
  console.log('Fixed SignupPage');
}

const loginFilePath = 'client/src/pages/LoginPage.jsx';
const loginTxt = fs.readFileSync(loginFilePath, 'utf8');
const loginParts = loginTxt.split('// Styled Components');
if (loginParts.length > 1) {
  const compIndex = loginTxt.indexOf('\nconst LoginPage =');
  const importsAndHook = loginTxt.substring(0, compIndex);
  const comp = loginTxt.substring(compIndex, loginTxt.indexOf('// Styled Components'));
  
  let styledPart = loginParts[1];
  styledPart = styledPart.replace('export default LoginPage', '');
  
  const newFile = importsAndHook + '\n// Styled Components\n' + styledPart + '\n\n' + comp + '\n\nexport default LoginPage;\n';
  fs.writeFileSync(loginFilePath, newFile);
  console.log('Fixed LoginPage');
}
