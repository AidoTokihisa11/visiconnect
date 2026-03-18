const fs = require('fs');
let content = fs.readFileSync('client/src/pages/AccountPageSimple.jsx', 'utf8');

const oldSecurity = `              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <Shield size={48} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>Géré par Clerk</h3>
                  <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
                    La sécurité de votre compte (mot de passe, authentification multi-facteurs) est gérée de manière sécurisée par notre fournisseur d'identité.   
                  </p>
                </div>
              )}`;

const newSecurity = `              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    textAlign: 'center', 
                    padding: '4rem 2rem',
                    background: 'linear-gradient(to bottom, #ffffff, #f8fafc)',
                    borderRadius: '0.75rem',
                    border: '1px dashed #e2e8f0'
                  }}
                >
                  <motion.div 
                    initial={{ y: -10 }} 
                    animate={{ y: 0 }} 
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ 
                      width: '80px', height: '80px', 
                      background: '#eff6ff', 
                      borderRadius: '50%', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.1)'
                    }}
                  >
                    <Shield size={40} color="#2563eb" />
                  </motion.div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#0f172a' }}>
                    Sécurité gérée par Clerk
                  </h3>
                  <p style={{ color: '#475569', maxWidth: '450px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.05rem' }}>
                    Votre mot de passe, l'authentification multi-facteurs et la gestion de vos sessions sont protégés et gérés de manière centralisée par notre fournisseur d'identité ultra-sécurisé.
                  </p>
                </motion.div>
              )}`;

content = content.replace(oldSecurity, newSecurity);
fs.writeFileSync('client/src/pages/AccountPageSimple.jsx', content);
console.log("Updated Security tab");
