import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Pencil, Save, Settings, Menu, X, Globe, Layout, 
    Home, Hash, Server, Palette, Move, Shield
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useAuthUser } from '../../hooks/useAuthUser';

const ToolbarContainer = styled(motion.div)`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 10000;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 14px;
`;

const NavGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    padding-right: 16px;
    
    &:last-child {
        border-right: none;
        padding-right: 0;
    }
`;

const IconButton = styled.button`
    background: ${props => props.$active ? '#2563eb' : 'transparent'};
    border: none;
    color: ${props => props.$active ? 'white' : '#94a3b8'};
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }
`;

const Drawer = styled(motion.div)`
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 320px;
    background: #0f172a;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px;
    z-index: 10001;
    color: white;
    box-shadow: -10px 0 30px rgba(0,0,0,0.5);
`;

const DrawerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ConfigSection = styled.div`
    margin-bottom: 24px;
    
    h4 {
        margin-bottom: 12px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #94a3b8;
    }
`;

const ColorPicker = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
`;

const ColorDot = styled.button`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.color};
    border: 2px solid ${props => props.active ? 'white' : 'transparent'};
    cursor: pointer;
`;

const Select = styled.select`
    width: 100%;
    background: #1e293b;
    border: 1px solid #334155;
    color: white;
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 8px;
`;

export default function AdminToolbar() {
    const { user } = useAuthUser();
    const { isLiveEdit, toggleLiveEdit, uiConfig, updateUiConfig } = useAdmin();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // Only verify admin access for render
    // In a real app, this should match backend role checks
    // For now, assume any logged in user on localhost is dev/admin or configure Supabase Role
    const canAccess = user?.role === 'admin' || user?.email?.includes('admin');

    if (!canAccess) return null;

    return (
        <>
            <ToolbarContainer
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <NavGroup>
                    <span className="font-bold text-blue-400 mr-2">ADMIN</span>
                    <IconButton 
                        $active={isLiveEdit} 
                        onClick={toggleLiveEdit}
                        title="Toggle Live Edit Mode"
                    >
                        <Pencil size={18} />
                    </IconButton>
                </NavGroup>

                <NavGroup>
                    <IconButton onClick={() => window.location.href = '/'} title="Home">
                        <Home size={18} />
                    </IconButton>
                    <IconButton onClick={() => window.location.href = '/dashboard'} title="Dashboard">
                        <Layout size={18} />
                    </IconButton>
                    <IconButton onClick={() => window.location.href = '/settings'} title="Settings">
                        <Settings size={18} />
                    </IconButton>
                </NavGroup>

                <NavGroup>
                    <IconButton title="Translation Manager">
                        <Globe size={18} />
                    </IconButton>
                    <IconButton onClick={() => setIsDrawerOpen(true)} title="UI Config">
                        <Palette size={18} />
                    </IconButton>
                </NavGroup>
            </ToolbarContainer>

            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                            style={{ 
                                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10000 
                            }}
                        />
                        <Drawer
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <DrawerHeader>
                                <h3 className="font-bold text-lg">UI Configuration</h3>
                                <IconButton onClick={() => setIsDrawerOpen(false)}>
                                    <X size={20} />
                                </IconButton>
                            </DrawerHeader>

                            <ConfigSection>
                                <h4>Floating Elements</h4>
                                <label className="block text-sm text-slate-400 mb-2">Chatbot Position</label>
                                <Select 
                                    value={uiConfig.chatbotPosition} 
                                    onChange={(e) => updateUiConfig('chatbotPosition', e.target.value)}
                                >
                                    <option value="right">Bottom Right</option>
                                    <option value="left">Bottom Left</option>
                                </Select>

                                <label className="block text-sm text-slate-400 mb-2 mt-4">Back to Top Position</label>
                                <Select 
                                    value={uiConfig.backToTopPosition} 
                                    onChange={(e) => updateUiConfig('backToTopPosition', e.target.value)}
                                >
                                    <option value="right">Bottom Right (Stacked)</option>
                                    <option value="left">Bottom Left (Stacked)</option>
                                </Select>
                            </ConfigSection>

                            <ConfigSection>
                                <h4>Theme Colors</h4>
                                <label className="block text-sm text-slate-400 mb-2">Primary Color</label>
                                <ColorPicker>
                                    {['#2563eb', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'].map(color => (
                                        <ColorDot 
                                            key={color}
                                            color={color}
                                            active={uiConfig.primaryColor === color}
                                            onClick={() => updateUiConfig('primaryColor', color)}
                                        />
                                    ))}
                                </ColorPicker>
                            </ConfigSection>
                            
                            <ConfigSection>
                                <h4>System</h4>
                                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    <Server size={16} /> Reset All Configs
                                </button>
                            </ConfigSection>
                        </Drawer>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
