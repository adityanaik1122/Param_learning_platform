const fs=require('fs'); 
const p='compiler/sandbox_manager.py'; 
let t=fs.readFileSync(p,'utf8');
const monoOld=/\/\/ Mock MonoBehaviour[\s\S]*?\/\/ Mock Rigidbody/; 
t=t.replace(monoOld,monoNew);
