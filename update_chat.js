const fs = require('fs');

const path = 'client/src/components/room/MeetingRoom.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldChatBlock = `<PanelContent>
               {activePanel === 'chat' && (
                 <>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.map((msg, idx) => (
                          <div key={idx} style={{
                              alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                              maxWidth: '85%',
                              padding: '0.75rem 1rem',
                                background: msg.sender === 'me' ? THEME.accent : THEME.accentSoft,
                              borderRadius: '12px',
                              borderBottomRightRadius: msg.sender === 'me' ? '2px' : '12px',
                              borderBottomLeftRadius: msg.sender === 'me' ? '12px' : '2px',
                                color: msg.sender === 'me' ? 'white' : THEME.text,
                                border: msg.sender === 'me' ? \`1px solid \${THEME.accent}\` : \`1px solid \${THEME.border}\`,
                          }}>
                              <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '4px' }}>{msg.sender === 'me' ? 'Vous' : msg.sender}</div>
                              <div style={{ lineHeight: 1.4 }}>{msg.text}</div> 
                          </div>
                        ))}
                    </div>
                    <ChatInputContainer>
                        <ChatInput
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}        
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Écrivez un message..."
                        />
                        <button onClick={handleSendMessage} style={{ background: THEME.accent, border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}>      
                        <ChevronRight size={24} />
                        </button>
                    </ChatInputContainer>
                 </>
               )}`;

const newChatBlock = `<PanelContent>
               {activePanel === 'chat' && (
                 <MeetingChat
                   messages={messages}
                   messageText={messageText}
                   setMessageText={setMessageText}
                   onSendMessage={handleSendMessage}
                 />
               )}`;

content = content.replace(
  /<PanelContent>[\s\S]*?<\/button>\s*<\/ChatInputContainer>\s*<\/>\s*\)}/, 
  newChatBlock
);

fs.writeFileSync(path, content);
