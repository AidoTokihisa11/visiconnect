const fs = require('fs');

let content = fs.readFileSync('C:/Users/theog/Desktop/visiconnect/client/src/components/room/BottomControlBar.jsx', 'utf-8');

// We will add lucide-react chevron icon if it exists
if (!content.includes('ChevronUp')) {
    content = content.replace(/import {\n([\s\S]*?)} from 'lucide-react';/, "import {\n$1  ChevronUp,\n} from 'lucide-react';");
}

let replacedControl = `
        <ButtonGroup style={{ position: 'relative' }}>
          {showBlurSlider && isCameraEnabled && (
            <BlurSliderContainer>
              <label htmlFor="blurSlider" style={{fontWeight: 'bold', marginRight: '5px'}}>Flou</label>
              <input
                id="blurSlider"
                type="range"
                min="5"
                max="25"
                step="5"
                defaultValue={blurRadius}
                onMouseUp={(e) => {
                  toggleBlur(parseInt(e.target.value, 10));
                }}
                onTouchEnd={(e) => {
                  toggleBlur(parseInt(e.target.value, 10));
                }}
              />
              <span style={{marginLeft: '5px'}}>{blurRadius}%</span>
            </BlurSliderContainer>
          )}
          <ControlButton className="focus-visible-ring" onClick={controls.toggleCamera} $active={isCameraEnabled} $activeColor={THEME.accent} title={isCameraEnabled ? "Désactiver la caméra" : "Activer la caméra"} aria-label={isCameraEnabled ? "Désactiver la caméra" : "Activer la caméra"}>
            {isCameraEnabled ? <Video /> : <VideoOff color={THEME.danger} />}
          </ControlButton>
          <div style={{ display: 'flex', borderRadius: '50px', background: isBlurEnabled ? THEME.accent : THEME.panelBg, overflow: 'hidden' }}>
            <ControlButton 
              className="focus-visible-ring" 
              onClick={() => {
                if (!isBlurEnabled) {
                  toggleBlur(10); 
                } else {
                  toggleBlur(0); 
                  setShowBlurSlider(false);
                }
              }}
              $active={isBlurEnabled} 
              $activeColor={THEME.accent} 
              title="Activer/Désactiver le flou d'arrière-plan"
              disabled={!isCameraEnabled}
              style={{ opacity: isCameraEnabled ? 1 : 0.5, borderRadius: '50px 0 0 50px', paddingRight: '12px' }}
            >
              <Focus />
            </ControlButton>
            <ControlButton
              className="focus-visible-ring"
              onClick={() => {
                 if (isCameraEnabled) setShowBlurSlider(!showBlurSlider);
              }}
              $active={isBlurEnabled} 
              $activeColor={THEME.accent}
              disabled={!isCameraEnabled}
              style={{ opacity: isCameraEnabled ? 1 : 0.5, borderRadius: '0 50px 50px 0', padding: '0 10px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}
              title="Réglages du flou"
            >
              <ChevronUp size={16} />
            </ControlButton>
          </div>
        </ButtonGroup>
`;

content = content.replace(/<ButtonGroup style=\{\{ position: 'relative' \}\}>[\s\S]*?<\/ButtonGroup>/, replacedControl);

fs.writeFileSync('C:/Users/theog/Desktop/visiconnect/client/src/components/room/BottomControlBar.jsx', content);
