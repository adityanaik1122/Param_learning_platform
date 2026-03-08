const fs=require('fs'); 
const p='frontend\\src\\features\\learning-path\\GameDevelopment_Content.tsx'; 
let s=fs.readFileSync(p,'utf8'); 
s=s.replace(/Debug\.Log\(\"Run chapter baseline and implement extension\.\"\);/g,'Debug.Log(\\\\\"Run chapter baseline and implement extension.\\\\\");'); 
fs.writeFileSync(p,s); 
console.log('fixed');
