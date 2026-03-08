const fs=require('fs'); 
const out=[]; 
out.push(\"// Game Development with Unity and C# - Detailed Curriculum\"); 
out.push(\"\"); 
out.push(\"type GameLesson = { title: string; description: string; code: string; };\"); 
out.push(\"type GamePhase = { id: number; title: string; topics: string[]; lessons: GameLesson[]; };\");
