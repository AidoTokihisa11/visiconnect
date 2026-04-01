const fs = require('fs');
const path = 'client/src/pages/RoomPageNew.jsx';
let c = fs.readFileSync(path, 'utf8');

c = c.replace(/className="w-full bg-slate-50\/60 border border-slate-300 hover:border-slate-600 text-slate-900 rounded-xl px-4 py-3\.5 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500\/50 focus:border-blue-500 transition-all text-\[15px\] shadow-inner"/g,
  'className="w-full bg-white border border-slate-200 hover:border-blue-400 text-slate-900 rounded-xl px-4 py-3.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[15px] shadow-sm"');

c = c.replace(/className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-400 text-white font-medium rounded-xl px-4 py-3\.5 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900\/20 hover:shadow-blue-900\/40 transform hover:-translate-y-0\.5 disabled:transform-none disabled:shadow-none"/g,
  'className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl px-4 py-3.5 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"');

fs.writeFileSync(path, c);
