const fs=require('fs'); 
const p='frontend\\src\\features\\learning-path\\GameDevelopment_Content.tsx'; 
let s=fs.readFileSync(p,'utf8'); 
s=s.replace(/\\\\\"/g,'\"'); 
fs.writeFileSync(p,s); 
console.log('fixed');
