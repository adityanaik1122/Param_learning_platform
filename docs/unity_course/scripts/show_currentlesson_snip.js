const fs=require('fs');const s=fs.readFileSync('frontend\\src\\features\\learning-path\\LearningPath.tsx','utf8');const i=s.indexOf('const currentLesson');console.log(s.slice(i-300,i+500));
