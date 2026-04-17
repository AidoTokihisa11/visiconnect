const fs = require('fs');
const path = 'client/src/components/room/BottomControlBar.jsx';

let code = fs.readFileSync(path, 'utf8');

// 1. Replace BottomBar styles
code = code.replace(/const BottomBar = styled\.div`[\s\S]*?`;/, `const BottomBar = styled.div\`
  height: 80px;
  background-color: \${THEME.panelBg};
  backdrop-filter: blur(12px);
  border-top: 1px solid \${THEME.border};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;
  z-index: 60;

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: none;
    width: 100%;
    max-width: 100%;
    height: auto;
    justify-content: space-evenly;
    overflow: visible;
    white-space: nowrap;
    padding: 0.75rem 0.5rem calc(env(safe-area-inset-bottom, 15px) + 0.5rem) 0.5rem;
    gap: 0;
    border-radius: 24px 24px 0 0;
    background-color: rgba(15, 15, 20, 0.95);
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);

    &::-webkit-scrollbar {
      display: none;
    }
  }
\`;`);

// 2. Replace ControlButton styles
code = code.replace(/const ControlButton = styled\.button`[\s\S]*?`;/, `const ControlButton = styled.button\`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background-color: \${props => props.$active ? (props.$activeColor || THEME.accent) : THEME.cardBg};
  color: \${props => props.$active ? '#fff' : THEME.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid \${props => props.$active ? 'transparent' : THEME.border};   

  @media (max-width: 768px) {
    width: 44px; /* Slightly smaller for mobile to fit 6 buttons */
    height: 44px;
    border-radius: 12px; /* Apple-like squircle */
    background-color: \${props => props.$active ? (props.$activeColor || THEME.accent) : 'rgba(255, 255, 255, 0.08)'};
    padding: 0;
    border: none;
    color: #fff;
    
    /* Make sure SVG scales well */
    svg {
      width: 22px;
      height: 22px;
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
\`;`);

// 3. Replace EndCallButton styles
code = code.replace(/const EndCallButton = styled\(ControlButton\)`[\s\S]*?`;/, `const EndCallButton = styled(ControlButton)\`
  background-color: \${THEME.danger};
  width: 64px;
  border-radius: 16px;

  @media (max-width: 768px) {
    width: 52px;
    height: 44px;
    border-radius: 14px;
    background-color: \${THEME.danger};
  }

  &:hover {
    background-color: #dc2626;
  }
\`;`);


// 4. Replace MobileMoreMenu styles
code = code.replace(/const MobileMoreMenu = styled\.div`[\s\S]*?`;/, `const MobileMoreMenu = styled.div\`
  display: none;

  @media (max-width: 768px) {
    display: \${props => props.$isOpen ? 'flex' : 'none'};
    flex-wrap: wrap;
    position: absolute;
    bottom: calc(100% + 15px);
    left: 15px;
    right: 15px;
    width: auto;
    background-color: rgba(25, 25, 30, 0.98);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 1.5rem 1rem;
    gap: 1rem 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    z-index: 100;
    justify-content: flex-start;

    > button {
      width: 25%;
      flex-direction: column;
      border-radius: 14px;
      background: transparent;
      gap: 0.5rem;
      height: auto;
      
      span {
        font-size: 0.7rem;
        font-weight: 500;
        opacity: 0.9;
        text-align: center;
        margin-top: 4px;
      }

      svg {
        width: 24px;
        height: 24px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        box-sizing: content-box;
      }
      
      &:active svg {
        background: rgba(255, 255, 255, 0.15);
      }
    }
  }
\`;`);


// 5. Update JSX to include labels in the MobileMoreMenu
const jsxReplacement = `
          {/* Expanded Mobile Menu */}
          <MobileMoreMenu $isOpen={isMoreMenuOpen}>
            <ControlButton onClick={() => { togglePanel('chat'); setIsMoreMenuOpen(false); }} $active={activePanel === 'chat' && sidePanelOpen} $activeColor={THEME.accent}>
              <MessageSquare />
              <span>Chat</span>
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('ai'); setIsMoreMenuOpen(false); }} $active={activePanel === 'ai' && sidePanelOpen} $activeColor={THEME.accent}>
              <Sparkles />
              <span>IA</span>
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('polls'); setIsMoreMenuOpen(false); }} $active={activePanel === 'polls' && sidePanelOpen} $activeColor={THEME.accent}>
              <PieChart />
              <span>Sondages</span>
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('breakout'); setIsMoreMenuOpen(false); }} $active={activePanel === 'breakout' && sidePanelOpen} $activeColor={THEME.accent}>
              <Users />
              <span>Groupes</span>
            </ControlButton>
            <ControlButton onClick={() => { toggleWhiteboard(); setIsMoreMenuOpen(false); }} $active={whiteboardOpen} $activeColor={THEME.accent}>
              <Layout />
              <span>Tableau</span>
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('analytics'); setIsMoreMenuOpen(false); }} $active={activePanel === 'analytics' && sidePanelOpen} $activeColor={THEME.accent}>
              <BarChart2 />
              <span>Stats</span>
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('settings'); setIsMoreMenuOpen(false); }} $active={activePanel === 'settings' && sidePanelOpen} $activeColor={THEME.accent}>
              <Settings2 />
              <span>Réglages</span>
            </ControlButton>
            <ControlButton onClick={() => { setShowStats(!showStats); setIsMoreMenuOpen(false); }} $active={showStats} $activeColor="#10b981">
              <Activity />
              <span>Debug</span>
            </ControlButton>
          </MobileMoreMenu>
`;

code = code.replace(/\{\/\*\s*Expanded Mobile Menu\s*\*\/\}[\s\S]*?<\/MobileMoreMenu>/m, jsxReplacement);

fs.writeFileSync(path, code);
