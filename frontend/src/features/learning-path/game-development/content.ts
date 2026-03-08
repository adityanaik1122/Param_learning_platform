// @ts-nocheck 
// Game Development with Unity and C# course content 
import { moduleDetails } from './module-details'; 
import { phase1DetailedContent } from './phase-01-detailed'; 
 
const modules = [ 
  [1, 'Beginner', 'Unity Workspace Setup and Editor Navigation', 1, 'Set up workspace, scenes, prefabs, and clean structure.'], 
  [1, 'Beginner', 'C# Basics for Unity Scripts', 2, 'MonoBehaviour lifecycle, input, and readable script design.'], 
  [1, 'Beginner', 'Components and GameObject Composition', 3, 'Use composition with focused, testable components.'], 
  [1, 'Beginner', 'Input and Player Movement Foundations', 4, 'Implement responsive movement and tune control feel.'], 
  [1, 'Beginner', '2D Physics and Collision Systems', 5, 'Build collision-driven gameplay with stable physics.'], 
  [2, 'Intermediate', 'Spawning and Game State Flow', 6, 'Create wave spawning and explicit game state transitions.'], 
  [2, 'Intermediate', 'Data-Driven Design with ScriptableObjects', 7, 'Move balancing from code into data assets.'], 
  [2, 'Intermediate', 'Animation Controllers and State Flow', 8, 'Sync animation states with gameplay logic.'], 
  [2, 'Intermediate', 'AI Behaviors I: Patrol Chase Attack', 9, 'Implement enemy state machines with fallback logic.'], 
  [2, 'Intermediate', 'AI Behaviors II: Variants and Encounters', 10, 'Build enemy archetypes and readable encounters.'], 
  [3, 'Advanced', 'Combat Damage and Weapons', 11, 'Implement deterministic damage and weapon systems.'], 
  [3, 'Advanced', 'Scene Management and Loading', 12, 'Use bootstrap and async scene transitions safely.'], 
  [3, 'Advanced', 'Menu UI Architecture and Settings', 13, 'Create complete menu flow with persistent settings.'], 
  [3, 'Advanced', 'VFX and Game Feel Polish', 14, 'Improve readability and feedback using effects.'], 
  [3, 'Advanced', 'Performance Profiling and Optimization', 15, 'Optimize based on profiler evidence and metrics.'], 
  [4, 'Production', 'Build Pipeline and Release QA', 16, 'Create reproducible builds and QA checklist.'], 
  [4, 'Production', 'Production Sprint Delivery', 17, 'Ship one major feature and one polish feature.'], 
  [4, 'Production', 'Level Design Progression', 18, 'Build 3 levels with clear difficulty progression.'], 
  [4, 'Production', 'Objectives and Event Systems', 19, 'Track mission objectives using event-driven updates.'], 
  [4, 'Production', 'Capstone Integration and Portfolio Delivery', 20, 'Integrate all systems and ship capstone build.'] 
]; 
 
const phaseTitles: Record<number, string> = { 
  1: 'Phase 1: Beginner Foundations', 
  2: 'Phase 2: Intermediate Gameplay Systems', 
  3: 'Phase 3: Advanced Engineering', 
  4: 'Phase 4: Production and Capstone' 
};
 
function buildLesson(row: any[], index: number) { 
  const phaseId = row[0]; 
  const stage = row[1]; 
  const moduleTitle = row[2]; 
  const chapter = row[3]; 
  const focus = row[4]; 
  const moduleNumber = index + 1; 
 
  const details = moduleDetails[moduleNumber] ? moduleDetails[moduleNumber] : { 
    learningObjectives: ['Build production-ready gameplay for this chapter'], 
    whyMatters: [focus], 
    workflow: ['Study chapter code', 'Implement extension', 'Test and validate'], 
    validation: ['No console errors', 'Feature works as expected'], 
    exercises: ['Complete chapter exercises'] 
  }; 
 
  const phase1 = (phase1DetailedContent as any)[moduleNumber]; 
  const deepExplanation = phase1 ? phase1.deepExplanation : ['Read chapter baseline, implement extension, and validate behavior.']; 
  const pitfalls = phase1 ? phase1.pitfalls : ['Avoid hidden dependencies and hardcoded values.']; 
  const deliverables = phase1 ? phase1.deliverables : ['Runnable module with test evidence.']; 
  const rubric = phase1 ? phase1.rubric : ['Correctness, code quality, validation, production readiness.']; 
  const guidedLab = phase1 ? phase1.guidedLab : ['Step 1: Baseline', 'Step 2: Extension', 'Step 3: Test']; 
  const checkpoints = phase1 ? phase1.checkpoints : ['Checkpoint: baseline and extension validated']; 
  const assessment = phase1 ? phase1.assessment : ['Explain design decisions and demonstrate output']; 
  const expectedOutput = phase1 ? phase1.expectedOutput : ['Stable runnable module output']; 

  const formatStructuredNumberedBlock = (lines: string[]) => {
    const grouped: string[] = [];
    let current = '';

    for (const line of lines) {
      if (/^\d+\./.test(line)) {
        if (current) grouped.push(current);
        current = line;
      } else if (/^Step\s+\d+:/i.test(line)) {
        if (current) grouped.push(current);
        current = line;
      } else {
        current = current ? current + '<br/>' + line : line;
      }
    }

    if (current) grouped.push(current);
    return grouped.join('\n\n');
  };
 
  return { 
    phaseId: phaseId, 
    title: 'Module ' + moduleNumber + ': ' + moduleTitle, 
    description: [ 
      '## Module ' + moduleNumber + ': ' + moduleTitle, 
      '', 
       
       
       
       
      '', 
      '### Learning Objectives', 
      details.learningObjectives.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Deep Explanation', 
      (moduleNumber === 1 ? formatStructuredNumberedBlock(deepExplanation) : moduleNumber === 2 ? formatStructuredNumberedBlock(deepExplanation) : moduleNumber === 3 ? formatStructuredNumberedBlock(deepExplanation) : deepExplanation.map(function(x) { return '- ' + x; }).join('\n')), 
      '', 
      '### Why This Matters', 
      details.whyMatters.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Implementation Workflow', 
      details.workflow.map(function(x, i) { return (i + 1) + '. ' + x; }).join('\n'),
      '', 
      '### Common Pitfalls and How to Avoid Them', 
      pitfalls.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Validation Checklist', 
      details.validation.map(function(x) { return '? ' + x; }).join('\n'), 
      '', 
      '### Chapter Exercise Pack', 
      details.exercises.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Guided Lab (Step-by-Step)', 
      (moduleNumber === 1 ? formatStructuredNumberedBlock(guidedLab) : moduleNumber === 2 ? formatStructuredNumberedBlock(guidedLab) : moduleNumber === 3 ? formatStructuredNumberedBlock(guidedLab) : guidedLab.map(function(x, i) { return (i + 1) + '. ' + x; }).join('\n')), 
      '', 
      '### Progress Checkpoints', 
      checkpoints.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Assessment Tasks', 
      assessment.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Expected Output', 
      expectedOutput.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Deliverables', 
      deliverables.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Assessment Rubric', 
      rubric.map(function(x) { return '- ' + x; }).join('\n'), 
      '', 
      '### Milestone', 
      'Deliver a runnable module implementation with chapter evidence and documentation.' 
    ].join('\n'), 
    code: moduleNumber === 2 ? [ 
      'using UnityEngine;', 
      '', 
      'public class PlayerController : MonoBehaviour', 
      '{', 
      '    [Header("Movement Settings")]', 
      '    [Tooltip("Horizontal movement speed in units per second.")]', 
      '    [SerializeField] private float moveSpeed = 10f;', 
      '    [SerializeField] private float jumpForce = 5f;', 
      '', 
      '    private float horizontalInput;', 
      '    private bool jumpRequested = false;', 
      '    private Rigidbody2D rb;', 
      '', 
      '    private void Awake()', 
      '    {', 
      '        rb = GetComponent(typeof(Rigidbody2D)) as Rigidbody2D;', 
      '        if (rb == null) Debug.LogError("PlayerController: Missing Rigidbody2D!");', 
      '    }', 
      '', 
      '    private void Update()', 
      '    {', 
      '        horizontalInput = Input.GetAxisRaw("Horizontal");', 
      '        if (Input.GetButtonDown("Jump"))', 
      '        {', 
      '            jumpRequested = true;', 
      '        }', 
      '    }', 
      '', 
      '    private void FixedUpdate()', 
      '    {', 
      '        ApplyMovement();', 
      '        if (jumpRequested)', 
      '        {', 
      '            ApplyJump();', 
      '            jumpRequested = false;', 
      '        }', 
      '    }', 
      '', 
      '    private void ApplyMovement()', 
      '    {', 
      '        rb.velocity = new Vector2(horizontalInput * moveSpeed, rb.velocity.y);', 
      '    }', 
      '', 
      '    private void ApplyJump()', 
      '    {', 
      '        rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);', 
      '    }', 
      '}' 
    ].join('\n') : moduleNumber === 3 ? [ 
      'using UnityEngine;', 
      '', 
      '[RequireComponent(typeof(Collider2D))]', 
      'public class Health : MonoBehaviour', 
      '{', 
      '    [Header("Stats")]', 
      '    [SerializeField] private float maxHealth = 100f;', 
      '    private float currentHealth;', 
      '', 
      '    [Header("Feedback")]', 
      '    [SerializeField] private ParticleSystem hitEffect;', 
      '', 
      '    private void Awake()', 
      '    {', 
      '        currentHealth = maxHealth;', 
      '    }', 
      '', 
      '    public void TakeDamage(float amount)', 
      '    {', 
      '        currentHealth -= amount;', 
      '        Debug.Log($"{gameObject.name} took {amount} damage. HP: {currentHealth}");', 
      '', 
      '        if (hitEffect != null)', 
      '        {', 
      '            hitEffect.Play();', 
      '        }', 
      '', 
      '    }', 
      '', 
      '    private void Die()', 
      '    {', 
      '        Debug.Log($"{gameObject.name} has been destroyed!");', 
      '        Destroy(gameObject);', 
      '    }', 
      '}' 
    ].join('\n') : [ 
      '// Module ' + moduleNumber + ': ' + moduleTitle, 
      '// Stage: ' + stage, 
      '// Focus: ' + focus, 
      'using UnityEngine;', 
      'using UnityEngine.SceneManagement; // Required for scene logic', 
      '', 
      'public class SceneIdentifier : MonoBehaviour', 
      '{', 
      '    void Start()', 
      '    {', 
      '        // Get the name of the scene this script is currently in', 
      '        string currentSceneName = SceneManager.GetActiveScene().name;', 
      '', 
      '        Debug.Log(\"SUCCESS: Module ' + moduleNumber + ' active in scene: \" + currentSceneName);', 
      '', 
      '        // Checklist verification', 
      '        VerifyWorkspace();', 
      '    }', 
      '', 
      '    private void VerifyWorkspace()', 
      '    {', 
      '        Debug.Log(\"Verification: Ensure your Main Camera is set to Orthographic for 2D development.\");', 
      '    }', 
      '}' 
    ].join('\n') 
  }; 
} 
 
function buildPhase(id: number) { 
  const rows = modules.filter(function(m) { return m[0] === id; }); 
  const topics = rows.map(function(m) { return m[2]; }); 
  const lessons = rows.map(function(row) { 
    const globalIndex = modules.findIndex(function(m) { return m[3] === row[3]; }); 
    return buildLesson(row, globalIndex); 
  }); 
  return { id: id, title: phaseTitles[id], topics: topics, lessons: lessons }; 
} 
 
export const gameDevelopmentPhases = [buildPhase(1), buildPhase(2), buildPhase(3), buildPhase(4)]; 
export const gameDevelopmentContent = gameDevelopmentPhases[0];
