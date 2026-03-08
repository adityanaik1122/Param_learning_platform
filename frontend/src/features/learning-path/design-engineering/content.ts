// Design Engineering: Multi-phase curriculum 
 
function mkDesc(lines: string[]): string { return lines.join('\n'); } 
 
export const designEngineeringContent = [
  { id: 1, title: 'Phase 1: Foundations of Human-Computer Interaction', topics: ['HCI fundamentals','User-centered design','Usability principles'], lessons: [ 
    { title: 'Module 1: Foundations of Human-Computer Interaction', description: mkDesc(['## Foundations of Human-Computer Interaction','','### Learning Goals','- Understand HCI scope and user-centered design.','- Learn usability pillars and practical evaluation.','','### Practical Exercise','- Audit one existing app with 5 UX strengths and 5 UX issues.','- Redesign one critical user flow.','','### Deliverable','- UX audit and revised flow document']) } 
  ] },
  { id: 2, title: 'Phase 2: Colour Theory for Product Interfaces', topics: ['Color systems','Contrast and accessibility','Palette architecture'], lessons: [ 
    { title: 'Module 1: Colour Theory and Accessible Palette Design', description: mkDesc(['## Colour Theory for UI','','### Learning Goals','- Build semantic palettes for real products.','- Apply WCAG contrast rules in interface states.','','### Practical Exercise','- Create light and dark palette tokens.','- Validate text and component contrast ratios.','','### Deliverable','- Token sheet and accessibility report']) } 
  ] },
  { id: 3, title: 'Phase 3: Typography for Digital Products', topics: ['Type hierarchy','Readability systems','Spacing rhythm'], lessons: [ 
    { title: 'Module 1: Typographic Systems and Hierarchy', description: mkDesc(['## Typography for Product UX','','### Learning Goals','- Define scalable type hierarchy across devices.','- Improve readability through spacing and rhythm.','','### Practical Exercise','- Build desktop/mobile type scales.','- Apply them on one production-like screen.','','### Deliverable','- Typography spec with annotated screen']) } 
  ] },
  { id: 4, title: 'Phase 4: Figma Mastery for Design Engineering', topics: ['Figma components','Auto layout','Design system workflow'], lessons: [ 
    { title: 'Module 1: End-to-End Figma Workflow', description: mkDesc(['## Figma as a Production Tool','','### Learning Goals','- Build reusable components and variants.','- Use auto-layout for responsive behavior.','','### Practical Exercise','- Create component library: button, input, card, navbar.','- Build one page from components only.','','### Deliverable','- Figma file with component library and page implementation']) } 
  ] },
  { id: 5, title: 'Phase 5: Motion Graphics for Web and Figma', topics: ['Motion principles','Interaction transitions','Performance-aware animation'], lessons: [ 
    { title: 'Module 1: Motion Language for Product UI', description: mkDesc(['## Motion Graphics for Product UX','','### Learning Goals','- Use motion to explain state transitions clearly.','- Define motion tokens for duration and easing.','','### Practical Exercise','- Prototype modal, drawer, and page transitions in Figma.','- Map transitions to implementation-ready specs.','','### Deliverable','- Motion spec and prototype demo']) } 
  ] },
  { id: 6, title: 'Phase 6: Prototyping and Rapid UI with Figma AI', topics: ['AI-assisted ideation','Rapid prototyping','Validation loops'], lessons: [ 
    { title: 'Module 1: Fast Prototyping with Figma AI', description: mkDesc(['## Rapid UI Creation using Figma AI','','### Learning Goals','- Generate concept alternatives quickly and refine quality.','- Convert AI output into system-consistent interfaces.','','### Practical Exercise','- Generate 3 alternate layouts from same prompt.','- Merge best parts into one validated prototype.','','### Deliverable','- Prompt log, selected prototype, and rationale']) } 
  ] },
  { id: 7, title: 'Phase 7: Translating UI into Frontend Code', topics: ['Design-to-code mapping','Component implementation','Handoff discipline'], lessons: [ 
    { title: 'Module 1: Transfer UI to Frontend Code', description: mkDesc(['## From Figma to Frontend','','### Learning Goals','- Map design tokens to CSS variables and component props.','- Build reusable components that match design intent.','','### Practical Exercise','- Implement one full page from Figma in frontend code.','- Validate design parity with checklist.','','### Deliverable','- Frontend implementation and parity checklist']) } 
  ] } 
];
