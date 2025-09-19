import React from "react";
import CommonFooter from '../components/CommonFooter';

const PricingPage = () => {
  return (
    <div style={{minHeight: "100vh", background: "#0a0a0a", color: "white", padding: "5rem 2rem"}}>
      <div style={{maxWidth: "1200px", margin: "0 auto"}}>
        <h1 style={{fontSize: "3rem", textAlign: "center", marginBottom: "3rem"}}>Nos Tarifs</h1>
        
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem"}}>
          <div style={{background: "#111", border: "1px solid #333", borderRadius: "20px", padding: "2rem", textAlign: "center"}}>
            <h3 style={{fontSize: "1.5rem", marginBottom: "1rem"}}>Gratuit</h3>
            <p style={{fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem"}}>0€/mois</p>
            <ul style={{listStyle: "none", padding: 0}}>
              <li style={{marginBottom: "0.5rem"}}>✓ 10 participants max</li>
              <li style={{marginBottom: "0.5rem"}}>✓ 40min par session</li>
              <li style={{marginBottom: "0.5rem"}}>✓ Chat intégré</li>
            </ul>
            <button style={{width: "100%", padding: "1rem", marginTop: "2rem", background: "#333", color: "white", border: "none", borderRadius: "10px", cursor: "pointer"}}>Commencer</button>
          </div>
          
          <div style={{background: "#111", border: "2px solid #60a5fa", borderRadius: "20px", padding: "2rem", textAlign: "center", transform: "scale(1.05)"}}>
            <h3 style={{fontSize: "1.5rem", marginBottom: "1rem", color: "#60a5fa"}}>Pro</h3>
            <p style={{fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem"}}>15€/mois</p>
            <ul style={{listStyle: "none", padding: 0}}>
              <li style={{marginBottom: "0.5rem"}}>✓ 100 participants</li>
              <li style={{marginBottom: "0.5rem"}}>✓ Sessions illimitées</li>
              <li style={{marginBottom: "0.5rem"}}>✓ Enregistrement</li>
              <li style={{marginBottom: "0.5rem"}}>✓ Support prioritaire</li>
            </ul>
            <button style={{width: "100%", padding: "1rem", marginTop: "2rem", background: "linear-gradient(135deg, #60a5fa, #a78bfa)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer"}}>Choisir Pro</button>
          </div>
          
          <div style={{background: "#111", border: "1px solid #333", borderRadius: "20px", padding: "2rem", textAlign: "center"}}>
            <h3 style={{fontSize: "1.5rem", marginBottom: "1rem"}}>Entreprise</h3>
            <p style={{fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem"}}>35€/mois</p>
            <ul style={{listStyle: "none", padding: 0}}>
              <li style={{marginBottom: "0.5rem"}}>✓ Participants illimités</li>
              <li style={{marginBottom: "0.5rem"}}>✓ API personnalisée</li>
              <li style={{marginBottom: "0.5rem"}}>✓ Support dédié</li>
              <li style={{marginBottom: "0.5rem"}}>✓ Conformité entreprise</li>
            </ul>
            <button style={{width: "100%", padding: "1rem", marginTop: "2rem", background: "#333", color: "white", border: "none", borderRadius: "10px", cursor: "pointer"}}>Contacter</button>
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};

export default PricingPage;
