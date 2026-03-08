const fs = require('fs');
const base = 'docs\\unity_course';
const assignmentsDir = base + '\\assignments';
fs.mkdirSync(assignmentsDir, { recursive: true });
const topics = ['Unity Setup and MonoBehaviour Lifecycle','Input and Player Movement','Physics and Collision Systems','Camera and UI Basics','Audio and Feedback','Spawning and Game State','Data-Driven Design','Animation Systems','AI Behaviors I','AI Behaviors II','Combat and Weapons','Scene Management','UI Architecture and Menus','VFX and Polish','Performance Optimization','Build and QA Pipeline','Production Sprint Delivery','Level Design Progression','Objective and Event Systems','Capstone Integration'];
const index = ['# Assignment Index', '', 'Use these chapter files in order (1-20):', ''];
for (let i = 1; i <= 20; i++) {
  const id = String(i).padStart(2, '0');
  const topic = topics[i - 1];
  const file = assignmentsDir + '\\ch' + id + '_assignment.md';
  const lines = [
    '# Chapter ' + i + ' Assignment',
    '',
    'Reference code: `Chapter' + i + 'Code.zip`',
    'Primary topic: ' + topic,
    '',
    '## Objective',
    'Implement, extend, and stabilize the chapter project with production-quality behavior.',
    '',
    '## Required Tasks',
    '1. Run baseline and document behavior.',
    '2. Implement one chapter-aligned feature extension.',
    '3. Add reliability guards and edge-case handling.',
    '4. Refactor one script area for readability.',
    '5. Execute 8+ manual tests and record results.',
    '',
    '## Deliverables',
    '- `CHANGELOG_ch' + id + '.md`',
    '- `TESTLOG_ch' + id + '.md`',
    '- Updated project files and demo video'
  ];
  fs.writeFileSync(file, lines.join('\\n'));
  index.push(i + '. [Chapter ' + i + '](./assignments/ch' + id + '_assignment.md)');
}
fs.writeFileSync(base + '\\ASSIGNMENTS_INDEX.md', index.join('\\n'));
