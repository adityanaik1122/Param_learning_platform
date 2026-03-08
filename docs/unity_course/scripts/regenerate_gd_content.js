const fs=require('fs'); 
const modules=[
{phaseId:1,phaseTitle:'Phase 1: Beginner Foundations',stage:'Beginner',title:'Unity Workspace Setup and Editor Navigation',chapter:1,focus:'Set up project structure and editor workflow for scalable development.',concepts:['Hierarchy Scene Inspector Project workflow','Prefab fundamentals and reusable assets','Scene bootstrap standards'],lab:['Create folder taxonomy for scripts art audio prefabs scenes','Create bootstrap scene with camera light and game manager','Create reusable prefab and instantiate in scene'],deliverable:'Starter scene template plus workflow notes'}, 
{phaseId:1,phaseTitle:'Phase 1: Beginner Foundations',stage:'Beginner',title:'C# Basics for Unity Scripts',chapter:2,focus:'Use clean MonoBehaviour scripts with lifecycle-aware logic.',concepts:['Awake Start Update responsibilities','State variables and method extraction','DeltaTime-based deterministic updates'],lab:['Build script with lifecycle logs and verify order','Implement input-driven movement using deltaTime','Refactor Update into intent methods'],deliverable:'Lifecycle-validated movement script'}, 
{phaseId:1,phaseTitle:'Phase 1: Beginner Foundations',stage:'Beginner',title:'Components and GameObject Composition',chapter:3,focus:'Apply composition over inheritance for modular gameplay objects.',concepts:['Single responsibility components','Inspector-based dependency wiring','Event-driven component communication'],lab:['Split monolithic logic into movement health interaction','Wire dependencies through SerializeField references','Add one event-based interaction path'],deliverable:'Refactored modular object architecture'}, 
{phaseId:1,phaseTitle:'Phase 1: Beginner Foundations',stage:'Beginner',title:'Input and Player Movement Foundations',chapter:4,focus:'Create responsive and tunable player movement systems.',concepts:['Input mapping and action handling','Acceleration deceleration jump buffering','Movement feel tuning'],lab:['Create movement action map','Implement acceleration and jump buffer','Expose tuning variables in inspector'],deliverable:'Playable polished movement prototype'}, 
{phaseId:1,phaseTitle:'Phase 1: Beginner Foundations',stage:'Beginner',title:'2D Physics and Collision Systems',chapter:5,focus:'Build robust collision gameplay using Rigidbody2D and triggers.',concepts:['Collision layers matrix design','OnCollision and OnTrigger logic','Checkpoint and respawn flow'],lab:['Configure layer collision matrix','Implement damage knockback on collision','Create checkpoint trigger and respawn'],deliverable:'Stable hazard room with retry loop'},
{phaseId:2,phaseTitle:'Phase 2: Intermediate Gameplay Systems',stage:'Intermediate',title:'Spawning and Game State Flow',chapter:6,focus:'Implement spawn systems and explicit game state transitions.',concepts:['State machine for gameplay loop','Wave spawning strategy and pacing','Restart-safe state reset'],lab:['Create enum-based game states','Implement escalating wave spawner','Handle win lose restart transitions'],deliverable:'Wave survival loop with reset integrity'}, 
{phaseId:2,phaseTitle:'Phase 2: Intermediate Gameplay Systems',stage:'Intermediate',title:'Data-Driven Design with ScriptableObjects',chapter:7,focus:'Externalize balancing and content values into assets.',concepts:['ScriptableObject configs for entities','Runtime binding and validation','Designer-editable balancing'],lab:['Create config assets for player enemy weapon','Bind runtime systems to assets','Add missing-reference validation checks'],deliverable:'Data-driven tuning pipeline'}, 
{phaseId:2,phaseTitle:'Phase 2: Intermediate Gameplay Systems',stage:'Intermediate',title:'Animation Controllers and State Flow',chapter:8,focus:'Sync animation with gameplay state and events.',concepts:['Animator graph architecture','Blend trees and transitions','Animation events for gameplay timing'],lab:['Build idle run jump attack states','Create blend tree for movement','Trigger one gameplay event from animation'],deliverable:'Animation state machine integrated with gameplay'}, 
{phaseId:2,phaseTitle:'Phase 2: Intermediate Gameplay Systems',stage:'Intermediate',title:'AI Behaviors I: Patrol Chase Attack',chapter:9,focus:'Create reusable enemy AI with clear behavior states.',concepts:['State machine architecture','Perception and line-of-sight logic','Fallback and recovery behavior'],lab:['Implement patrol chase attack states','Add target detection and loss logic','Log and debug state transitions'],deliverable:'Reusable enemy brain component'}, 
{phaseId:2,phaseTitle:'Phase 2: Intermediate Gameplay Systems',stage:'Intermediate',title:'AI Behaviors II: Variants and Encounters',chapter:10,focus:'Design enemy archetypes and readable encounter pacing.',concepts:['Archetype role differentiation','Encounter escalation curves','Telegraphing and readability'],lab:['Create 3 enemy variants','Tune behavior and difficulty per role','Build one escalating encounter scene'],deliverable:'Encounter demo with balanced archetypes'},
{phaseId:3,phaseTitle:'Phase 3: Advanced Engineering',stage:'Advanced',title:'Combat Damage and Weapons',chapter:11,focus:'Implement deterministic damage, weapons, and combat feedback.',concepts:['Damage contracts and health model','Melee and ranged flow','Cooldown and invulnerability windows'],lab:['Build health and damage interfaces','Implement melee and projectile attacks','Add hit feedback and cooldown logic'],deliverable:'Combat sandbox with two weapon styles'}, 
{phaseId:3,phaseTitle:'Phase 3: Advanced Engineering',stage:'Advanced',title:'Scene Management and Loading',chapter:12,focus:'Build multi-scene architecture with safe transitions.',concepts:['Bootstrap scene pattern','Async loading and unloading','Persistent manager lifecycle'],lab:['Create startup scene and transition manager','Implement async loading screen','Protect against duplicate managers'],deliverable:'Stable scene transition pipeline'}, 
{phaseId:3,phaseTitle:'Phase 3: Advanced Engineering',stage:'Advanced',title:'Menu UI Architecture and Settings',chapter:13,focus:'Implement complete menu navigation and settings persistence.',concepts:['Main pause gameover flow','Settings model and persistence','Controller keyboard navigation'],lab:['Build full menu flow','Add settings save and restore','Validate all navigation paths'],deliverable:'Production-ready menu system'}, 
{phaseId:3,phaseTitle:'Phase 3: Advanced Engineering',stage:'Advanced',title:'VFX and Game Feel Polish',chapter:14,focus:'Improve readability and impact through visual feedback.',concepts:['Impact VFX design','Feedback timing and intensity','Signal-to-noise balance'],lab:['Add hit and impact effects','Add environment feedback cues','Compare before and after readability'],deliverable:'Polish pass with measurable improvement'}, 
{phaseId:3,phaseTitle:'Phase 3: Advanced Engineering',stage:'Advanced',title:'Performance Profiling and Optimization',chapter:15,focus:'Use profiling to remove bottlenecks and reduce allocations.',concepts:['Profiler baseline capture','Allocation hotspots and pooling','Targeted optimization workflow'],lab:['Record baseline profiler metrics','Fix top bottlenecks','Implement pooling where needed'],deliverable:'Before and after optimization report'},
{phaseId:4,phaseTitle:'Phase 4: Production and Capstone',stage:'Production',title:'Build Pipeline and Release QA',chapter:16,focus:'Create reliable builds and release quality gates.',concepts:['Build profile standardization','Smoke and regression checklist','Bug severity triage'],lab:['Create reproducible build profile','Run smoke tests and record defects','Close blocker bugs before release'],deliverable:'Release candidate build with QA report'}, 
{phaseId:4,phaseTitle:'Phase 4: Production and Capstone',stage:'Production',title:'Production Sprint Delivery',chapter:17,focus:'Execute sprint planning delivery and review discipline.',concepts:['Sprint backlog and acceptance criteria','Feature and polish delivery','Risk and debt tracking'],lab:['Plan one sprint backlog','Deliver one major feature and one polish feature','Publish sprint review summary'],deliverable:'Sprint completion report and demo'}, 
{phaseId:4,phaseTitle:'Phase 4: Production and Capstone',stage:'Production',title:'Level Design Progression',chapter:18,focus:'Build multi-level onboarding and difficulty progression.',concepts:['Teaching through level structure','Pacing and challenge curves','Playtest-driven iteration'],lab:['Build level 1 onboarding','Build level 2 escalation','Build level 3 mastery'],deliverable:'Three-level progression package'}, 
{phaseId:4,phaseTitle:'Phase 4: Production and Capstone',stage:'Production',title:'Objectives and Event Systems',chapter:19,focus:'Track mission objectives with event-driven architecture.',concepts:['Objective state machine','Event triggers and updates','Failure and retry reset logic'],lab:['Create objective manager','Wire objective updates to gameplay events','Implement objective UI states'],deliverable:'Mission flow with reliable objective tracking'}, 
{phaseId:4,phaseTitle:'Phase 4: Production and Capstone',stage:'Production',title:'Capstone Integration and Portfolio Delivery',chapter:20,focus:'Integrate core systems and ship portfolio-ready build.',concepts:['Scope lock and integration plan','Cross-system stability pass','Technical storytelling and postmortem'],lab:['Integrate gameplay UI audio and persistence','Run final regression pass','Create README and postmortem'],deliverable:'Shippable capstone plus case study'} 
];
function mkDescription(m,moduleNumber){ 
  return [ 
    '## Module '+moduleNumber+': '+m.title, 
    '', 
    '### Book Mapping (Chamillard C# Unity Book)', 
    '- Primary reference: Chapter'+m.chapter+'Code.zip', 
    '- Stage: '+m.stage, 
    '', 
    '### Learning Objective', 
    '- '+m.focus, 
    '', 
    '### Core Concepts', 
    ...m.concepts.map(function(c){return '- '+c;}), 
    '', 
    '### Implementation Lab', 
    ...m.lab.map(function(s){return '- '+s;}), 
    '', 
    '### Validation Checklist', 
    '- No runtime console errors in main gameplay flow.', 
    '- Restart and replay maintain valid state.', 
    '- Submission includes CHANGELOG and TESTLOG evidence.', 
    '', 
    '### Chapter Exercise Pack', 
    '- Task A: Run baseline chapter project and document behavior.', 
    '- Task B: Implement one extension feature aligned to this module.', 
    '- Task C: Add reliability checks and complete 8 manual tests.', 
    '- Submit: CHANGELOG_ch'+m.chapter+'.md and TESTLOG_ch'+m.chapter+'.md', 
    '', 
    '### Milestone', 
    '- '+m.deliverable 
  ].join('\\n'); 
}
function mkCode(m){ 
  return [ 
    '// Chapter '+m.chapter+' practical starter', 
    '// Reference: Chapter'+m.chapter+'Code.zip', 
    'using UnityEngine;', 
    '', 
    'public class Chapter'+m.chapter+'Exercise : MonoBehaviour', 
    '{', 
    '    [SerializeField] private bool baselineValidated = false;', 
    '    [SerializeField] private bool extensionImplemented = false;', 
    '    [SerializeField] private bool testLogCompleted = false;', 
    '', 
    '    private void Start()', 
    '    {', 
    '        Debug.Log(\"Module loaded: Chapter '+m.chapter+'\");', 
    '        Debug.Log(\"Focus: '+m.focus+'\");', 
    '    }', 
    '}' 
  ].join('\\n'); 
}
const phaseTitles={1:'Phase 1: Beginner Foundations',2:'Phase 2: Intermediate Gameplay Systems',3:'Phase 3: Advanced Engineering',4:'Phase 4: Production and Capstone'}; 
function buildPhase(id){ 
  const rows=modules.filter(function(m){return m.phaseId===id;}); 
  const topics=rows.map(function(m){return m.title;}); 
  const lessons=rows.map(function(m,idx){const globalIndex=modules.findIndex(function(x){return x.chapter===m.chapter;});const n=globalIndex+1;return {title:'Module '+n+': '+m.title,description:mkDescription(m,n),code:mkCode(m)};}); 
  return {id:id,title:phaseTitles[id],topics:topics,lessons:lessons}; 
} 
const phases=[buildPhase(1),buildPhase(2),buildPhase(3),buildPhase(4)]; 
const out=[\"// Game Development with Unity and C# - detailed course content\",\"\",`export const gameDevelopmentPhases = ${JSON.stringify(phases,null,2)};`,\"\",'export const gameDevelopmentContent = gameDevelopmentPhases[0];',\"\"].join('\\n'); 
fs.writeFileSync('frontend\\src\\features\\learning-path\\GameDevelopment_Content.tsx',out); 
console.log('regenerated gd content');
