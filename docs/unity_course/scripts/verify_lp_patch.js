const fs=require('fs'); 
const s=fs.readFileSync('frontend\\src\\features\\learning-path\\LearningPath.tsx','utf8'); 
const bar=String.fromCharCode(124); 
const token='setCode(lessonCode '+bar+bar+' starterCode);'; 
console.log('has new',s.includes(token)); 
console.log('has old',s.includes('setCode(starterCode);'));
