import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  X, Pen, Square, Circle, Type, Eraser, 
  Undo, Redo, Download, Trash2,
  Minus, Move, MousePointer,
  Grid, Eye, EyeOff
} from 'lucide-react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(17, 17, 17, 0.95);
  border-bottom: 1px solid #333;
`;

const Title = styled.h2`
  color: #3b82f6;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  background: #222;
  color: #3b82f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    border-color: #444;
  }

  &.primary {
    background: #00ff88;
    color: #0a0a0a;
    border-color: #00ff88;

    &:hover {
      background: #00e67a;
    }
  }

  &.danger {
    background: #ff4444;
    border-color: #ff4444;

    &:hover {
      background: #ff3333;
    }
  }
`;

const CloseButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #222;
  color: #3b82f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #333;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

const Toolbar = styled.div`
  width: 80px;
  background: rgba(17, 17, 17, 0.95);
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
  gap: 0.5rem;
`;

const ToolButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid ${props => props.active ? '#00ff88' : '#333'};
  background: ${props => props.active ? 'rgba(0, 255, 136, 0.1)' : '#222'};
  color: ${props => props.active ? '#00ff88' : '#888'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'rgba(0, 255, 136, 0.2)' : '#333'};
    color: ${props => props.active ? '#00ff88' : 'white'};
    border-color: ${props => props.active ? '#00ff88' : '#444'};
  }
`;

const ToolSeparator = styled.div`
  height: 1px;
  background: #333;
  margin: 0.5rem 0;
`;

const PropertiesPanel = styled.div`
  width: 300px;
  background: rgba(17, 17, 17, 0.95);
  border-left: 1px solid #333;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
`;

const PropertyGroup = styled.div`
  .title {
    color: #3b82f6;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
`;

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
`;

const ColorButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid ${props => props.active ? 'white' : 'transparent'};
  background: ${props => props.color};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }
`;

const SliderGroup = styled.div`
  .label {
    color: #ccc;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
`;

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #333;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #00ff88;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #00ff88;
    cursor: pointer;
    border: none;
  }
`;

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  cursor: ${props => props.tool === 'move' ? 'grab' : 'crosshair'};

  &:active {
    cursor: ${props => props.tool === 'move' ? 'grabbing' : 'crosshair'};
  }
`;

const LayersPanel = styled.div`
  .layer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    background: #222;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    
    .name {
      color: #3b82f6;
      font-size: 0.8rem;
    }
    
    .actions {
      display: flex;
      gap: 0.25rem;
    }
  }
`;

const LayerButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: #333;
  color: #888;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #444;
    color: #3b82f6;
  }
`;

const StatusBar = styled.div`
  height: 40px;
  background: rgba(17, 17, 17, 0.95);
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 0.8rem;
  color: #888;
`;

const Whiteboard = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [opacity, setOpacity] = useState(100);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showGrid, setShowGrid] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [layers] = useState([
    { id: 1, name: 'Calque 1', visible: true, active: true }
  ]);

  const colors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
    '#ff00ff', '#00ffff', '#ff8000', '#8000ff', '#0080ff', '#80ff00',
    '#ff0080', '#0080ff', '#808080', '#c0c0c0', '#800000', '#008000',
    '#000080', '#808000', '#800080', '#008080', '#ff4444', '#44ff44'
  ];

  const tools = [
    { id: 'pointer', icon: <MousePointer size={20} />, name: 'Sélection' },
    { id: 'pen', icon: <Pen size={20} />, name: 'Pinceau' },
    { id: 'eraser', icon: <Eraser size={20} />, name: 'Gomme' },
    { id: 'line', icon: <Minus size={20} />, name: 'Ligne' },
    { id: 'rectangle', icon: <Square size={20} />, name: 'Rectangle' },
    { id: 'circle', icon: <Circle size={20} />, name: 'Cercle' },
    { id: 'text', icon: <Type size={20} />, name: 'Texte' },
    { id: 'move', icon: <Move size={20} />, name: 'Déplacer' }
  ];

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1200;
    canvas.height = 800;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    saveToHistory();
  }, [saveToHistory]);

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `whiteboard-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const pos = getMousePos(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    
    if (tool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.globalAlpha = opacity / 100;
    } else if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
      ctx.lineCap = 'round';
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <Title>Tableau Blanc Collaboratif</Title>
        <HeaderActions>
          <ActionButton
            onClick={undo}
            disabled={historyIndex <= 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Undo size={16} />
            Annuler
          </ActionButton>
          
          <ActionButton
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Redo size={16} />
            Refaire
          </ActionButton>
          
          <ActionButton
            onClick={downloadCanvas}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            Télécharger
          </ActionButton>
          
          <ActionButton
            className="danger"
            onClick={clearCanvas}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 size={16} />
            Effacer tout
          </ActionButton>
          
          <CloseButton
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </CloseButton>
        </HeaderActions>
      </Header>

      <MainContent>
        <Toolbar>
          {tools.map((toolItem, index) => (
            <React.Fragment key={toolItem.id}>
              <ToolButton
                active={tool === toolItem.id}
                onClick={() => setTool(toolItem.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={toolItem.name}
              >
                {toolItem.icon}
              </ToolButton>
              {(index === 2 || index === 5) && <ToolSeparator />}
            </React.Fragment>
          ))}
        </Toolbar>

        <CanvasContainer>
          <Canvas
            ref={canvasRef}
            tool={tool}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{
              transform: `scale(${zoom / 100})`,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </CanvasContainer>

        <PropertiesPanel>
          <PropertyGroup>
            <div className="title">Couleurs</div>
            <ColorPalette>
              {colors.map((colorOption) => (
                <ColorButton
                  key={colorOption}
                  color={colorOption}
                  active={color === colorOption}
                  onClick={() => setColor(colorOption)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </ColorPalette>
          </PropertyGroup>

          <PropertyGroup>
            <div className="title">Propriétés du pinceau</div>
            <SliderGroup>
              <div className="label">
                <span>Taille</span>
                <span>{brushSize}px</span>
              </div>
              <Slider
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
              />
            </SliderGroup>
            
            <SliderGroup>
              <div className="label">
                <span>Opacité</span>
                <span>{opacity}%</span>
              </div>
              <Slider
                type="range"
                min="10"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
              />
            </SliderGroup>
          </PropertyGroup>

          <PropertyGroup>
            <div className="title">Zoom</div>
            <SliderGroup>
              <div className="label">
                <span>Niveau</span>
                <span>{zoom}%</span>
              </div>
              <Slider
                type="range"
                min="25"
                max="200"
                value={zoom}
                onChange={(e) => setZoom(parseInt(e.target.value))}
              />
            </SliderGroup>
          </PropertyGroup>

          <PropertyGroup>
            <div className="title">Calques</div>
            <LayersPanel>
              {layers.map((layer) => (
                <div key={layer.id} className="layer">
                  <span className="name">{layer.name}</span>
                  <div className="actions">
                    <LayerButton>
                      {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                    </LayerButton>
                    <LayerButton>
                      <Trash2 size={12} />
                    </LayerButton>
                  </div>
                </div>
              ))}
            </LayersPanel>
          </PropertyGroup>

          <PropertyGroup>
            <div className="title">Options</div>
            <ActionButton
              onClick={() => setShowGrid(!showGrid)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Grid size={16} />
              {showGrid ? 'Masquer la grille' : 'Afficher la grille'}
            </ActionButton>
          </PropertyGroup>
        </PropertiesPanel>
      </MainContent>

      <StatusBar>
        <div>Outil actuel: {tools.find(t => t.id === tool)?.name}</div>
        <div>Zoom: {zoom}% | Taille: 1200x800px</div>
        <div>Tableau blanc collaboratif</div>
      </StatusBar>
    </Overlay>
  );
};

export default Whiteboard;
