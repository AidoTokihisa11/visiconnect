const fs = require('fs');
const code = fs.readFileSync('emails/MeetingInviteEmail.jsx', 'utf8');
const fixed = code.replace(
  `              <Text style={signoff}>
                The Management Team,<br />

            <Hr style={divider} />`,
  `              <Text style={signoff}>
                The Management Team,<br />
                <span style={{ fontWeight: 600, color: '#2563eb', display: 'inline-block', marginTop: '6px' }}>VisioConnect</span>
              </Text>
            </Section>

            <Hr style={divider} />`
);
fs.writeFileSync('emails/MeetingInviteEmail.jsx', fixed);
