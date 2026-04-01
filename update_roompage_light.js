const fs = require('fs');
const path = 'client/src/pages/RoomPageNew.jsx';
let c = fs.readFileSync(path, 'utf8');

c = c.replace(/background-color: #0f172a;/g, 'background-color: #f4f7fb;');
c = c.replace(/color: white;/g, 'color: #1e293b;');

// Replace common dark patterns
c = c.replace(/bg-slate-950/g, 'bg-slate-50');
c = c.replace(/bg-slate-900\/60/g, 'bg-white');
c = c.replace(/bg-slate-900\/70/g, 'bg-white');
c = c.replace(/border-slate-700\/50/g, 'border-slate-200');
c = c.replace(/border-slate-700/g, 'border-slate-300');
c = c.replace(/border-slate-800\/80/g, 'border-slate-100');
c = c.replace(/text-slate-400/g, 'text-slate-500');
c = c.replace(/text-slate-300/g, 'text-slate-600');
c = c.replace(/text-slate-500/g, 'text-slate-400');
c = c.replace(/text-white/g, 'text-slate-900');
c = c.replace(/bg-slate-800 hover:bg-slate-700 text-slate-900/g, 'bg-slate-100 hover:bg-slate-200 text-slate-700');

// specifically for the input class
c = c.replace(/bg-slate-950\/60 border border-slate-300 hover:border-slate-600 text-slate-900 rounded-xl px-4 py-3.5 placeholder-slate-600/g, 
  'bg-white border border-slate-300 hover:border-blue-400 text-slate-900 rounded-xl px-4 py-3.5 placeholder-slate-400');

// Gradients for PreJoin
c = c.replace(/bg-blue-600\/20/g, 'bg-blue-300/30');
c = c.replace(/bg-indigo-600\/20/g, 'bg-indigo-300/20');
c = c.replace(/bg-red-600\/10/g, 'bg-red-400/10');
c = c.replace(/bg-red-500\/10 border border-red-500\/20/g, 'bg-red-50 border border-red-100');

// Blue pill for room ID
c = c.replace(/text-blue-300 bg-blue-500\/10 border border-blue-500\/20/g, 'text-blue-700 bg-blue-50 border border-blue-100');

// Button specific fix
c = c.replace(/text-slate-900 font-medium rounded-xl px-4 py-3.5 transition-all flex items-center justify-center gap-2 shadow-lg/g, 
  'text-white font-medium rounded-xl px-4 py-3.5 transition-all flex items-center justify-center gap-2 shadow-lg');
c = c.replace(/disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-400 text-slate-900/g, 
  'disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white');

fs.writeFileSync(path, c);
