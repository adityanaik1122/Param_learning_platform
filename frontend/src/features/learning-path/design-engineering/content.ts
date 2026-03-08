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
  ] },
  { id: 8, title: 'Phase 8: Responsive Design & Mobile-First Approach', topics: ['Mobile-first methodology','Breakpoint strategy','Fluid layouts'], lessons: [ 
    { title: 'Module 1: Mobile-First Design Principles', description: mkDesc(['## Responsive Design Fundamentals','','### Learning Goals','- Master mobile-first design methodology.','- Create adaptive layouts for multiple screen sizes.','- Implement fluid grids and flexible images.','','### Practical Exercise','- Design and code a responsive landing page.','- Test across mobile, tablet, and desktop viewports.','','### Deliverable','- Responsive website with 3+ breakpoints']) } 
  ] },
  { id: 9, title: 'Phase 9: Design Systems Architecture', topics: ['Component libraries','Design tokens','System governance'], lessons: [ 
    { title: 'Module 1: Building Scalable Design Systems', description: mkDesc(['## Design System Fundamentals','','### Learning Goals','- Build and maintain component libraries.','- Define design tokens for consistency.','- Create documentation and usage guidelines.','','### Practical Exercise','- Create a mini design system with 10+ components.','- Document component variants and usage patterns.','','### Deliverable','- Design system documentation and component library']) } 
  ] },
  { id: 10, title: 'Phase 10: User Research & Testing', topics: ['User personas','Usability testing','A/B testing'], lessons: [ 
    { title: 'Module 1: User-Centered Research Methods', description: mkDesc(['## User Research Fundamentals','','### Learning Goals','- Conduct user interviews and surveys.','- Create data-driven personas.','- Plan and execute usability tests.','- Analyze A/B test results.','','### Practical Exercise','- Interview 5 users and create 2 personas.','- Conduct usability test on existing interface.','','### Deliverable','- Research report with personas and test findings']) } 
  ] },
  { id: 11, title: 'Phase 11: Information Architecture', topics: ['Content structure','Navigation patterns','Sitemaps'], lessons: [ 
    { title: 'Module 1: Structuring Digital Experiences', description: mkDesc(['## Information Architecture Principles','','### Learning Goals','- Design intuitive navigation systems.','- Create effective content hierarchies.','- Build sitemaps and user flows.','','### Practical Exercise','- Audit existing website IA and propose improvements.','- Create sitemap and navigation structure for new product.','','### Deliverable','- IA documentation with sitemap and user flows']) } 
  ] },
  { id: 12, title: 'Phase 12: Wireframing & Low-Fidelity Prototyping', topics: ['Sketching techniques','Wireframe tools','Rapid iteration'], lessons: [ 
    { title: 'Module 1: Low-Fidelity Design Process', description: mkDesc(['## Wireframing Fundamentals','','### Learning Goals','- Create effective wireframes quickly.','- Use low-fidelity prototypes for validation.','- Iterate based on feedback.','','### Practical Exercise','- Sketch 10 screen wireframes on paper.','- Create digital wireframes in Figma.','- Test with users and iterate.','','### Deliverable','- Wireframe set with iteration documentation']) } 
  ] },
  { id: 13, title: 'Phase 13: Frontend Frameworks - React/Vue', topics: ['Component architecture','State management','React/Vue basics'], lessons: [ 
    { title: 'Module 1: Modern Frontend Development', description: mkDesc(['## React/Vue Component Implementation','','### Learning Goals','- Build reusable React/Vue components.','- Manage component state and props.','- Implement design system in code.','','### Practical Exercise','- Convert Figma designs to React components.','- Build interactive UI with state management.','','### Deliverable','- Working React/Vue application']) } 
  ] },
  { id: 14, title: 'Phase 14: CSS Architecture & Methodologies', topics: ['BEM methodology','CSS-in-JS','Tailwind CSS'], lessons: [ 
    { title: 'Module 1: Scalable CSS Strategies', description: mkDesc(['## Modern CSS Architecture','','### Learning Goals','- Apply BEM naming conventions.','- Use CSS-in-JS solutions.','- Master utility-first CSS with Tailwind.','','### Practical Exercise','- Refactor existing CSS using BEM.','- Build component library with Tailwind.','','### Deliverable','- Styled component library with documentation']) } 
  ] },
  { id: 15, title: 'Phase 15: Accessibility (A11y) Deep Dive', topics: ['ARIA attributes','Keyboard navigation','Screen reader support'], lessons: [ 
    { title: 'Module 1: Building Accessible Interfaces', description: mkDesc(['## Web Accessibility Standards','','### Learning Goals','- Implement ARIA landmarks and roles.','- Ensure full keyboard navigation.','- Test with screen readers.','- Meet WCAG 2.1 AA standards.','','### Practical Exercise','- Audit existing site for accessibility issues.','- Implement fixes and test with assistive technologies.','','### Deliverable','- Accessibility audit report and remediated interface']) } 
  ] },
  { id: 16, title: 'Phase 16: Performance Optimization', topics: ['Image optimization','Lazy loading','Core Web Vitals'], lessons: [ 
    { title: 'Module 1: Frontend Performance Best Practices', description: mkDesc(['## Web Performance Optimization','','### Learning Goals','- Optimize images and assets.','- Implement lazy loading strategies.','- Improve Core Web Vitals scores.','- Use performance monitoring tools.','','### Practical Exercise','- Audit site performance with Lighthouse.','- Optimize assets and improve load times.','','### Deliverable','- Performance optimization report with before/after metrics']) } 
  ] },
  { id: 17, title: 'Phase 17: Version Control for Designers', topics: ['Git fundamentals','Design file management','Collaboration workflows'], lessons: [ 
    { title: 'Module 1: Git for Design Teams', description: mkDesc(['## Version Control Basics','','### Learning Goals','- Understand Git fundamentals.','- Manage design files with version control.','- Collaborate using branches and pull requests.','','### Practical Exercise','- Set up Git repository for design project.','- Practice branching and merging workflows.','','### Deliverable','- Git repository with organized design assets']) } 
  ] },
  { id: 18, title: 'Phase 18: Collaboration & Handoff', topics: ['Design handoff tools','Storybook','Design tokens'], lessons: [ 
    { title: 'Module 1: Designer-Developer Collaboration', description: mkDesc(['## Effective Design Handoff','','### Learning Goals','- Use handoff tools like Zeplin and Figma Dev Mode.','- Document components in Storybook.','- Implement design token systems.','','### Practical Exercise','- Create complete handoff documentation.','- Build Storybook for component library.','','### Deliverable','- Handoff package with specs, tokens, and Storybook']) } 
  ] } 
];
