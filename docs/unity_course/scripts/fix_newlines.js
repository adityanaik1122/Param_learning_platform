const fs = require('fs');
const path = require('path');
function fix(file){const t=fs.readFileSync(file,'utf8');fs.writeFileSync(file,t.replace(/\\n/g,'\n'));}
fix('docs\\unity_course\\ASSIGNMENTS_INDEX.md');
const dir='docs\\unity_course\\assignments';for(const f of fs.readdirSync(dir)){if(f.endsWith('.md'))fix(path.join(dir,f));}
fix('docs\\unity_course\\work\\ch01\\PrintRainMessage\\PrintRainMessage\\Program.cs');
fix('docs\\unity_course\\work\\ch01\\PrintRainMessage\\PrintRainMessage\\PrintRainMessage.csproj');
