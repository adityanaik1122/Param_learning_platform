// Phase 1 detailed lesson content for Game Development course 
export const phase1DetailedContent: Record<number, { 
  deepExplanation: string[]; 
  pitfalls: string[]; 
  deliverables: string[]; 
  rubric: string[]; 
  guidedLab: string[]; 
  checkpoints: string[]; 
  assessment: string[]; 
  expectedOutput: string[]; 
}> = {
  1: { 
    deepExplanation: [
      "1. The Big Four Ecosystem: The Unity Editor is not just a collection of windows; it is a synchronized ecosystem.",
      "The Project Window (The Library): This is where your physical files live on your hard drive. Nothing here exists in your game world yet.",
      "The Hierarchy (The Stage): When you drag an asset from the Project window into the Hierarchy, it becomes a GameObject and is now on stage.",
      "The Scene View (The Director's Chair): This is where you physically move objects in your 3D/2D workspace.",
      "The Inspector (The Properties Table): When you select an object on the stage, the Inspector reveals its DNA and is where you add C# scripts to change behavior.",
      "2. The Hierarchy of Cleanliness: Professional organization is about scalability, not aesthetics, because messy folders cause Missing Script errors and broken references.",
      "The Underscore Trick: Prefix primary folders with an underscore (for example _Scripts, _Prefabs) to keep them at the top.",
      "Breadcrumbs: Name hierarchy objects by function (for example Env_Floor_Static, Player_Root) instead of defaults like GameObject(1).",
      "3. Prefabs: The Master Template Logic: A prefab is a master template in the Project window.",
      "The Workflow: If you have 100 enemy instances and need a change, update the source prefab once and the change propagates to all instances.",
      "Visual Cue: Prefabs appear with blue icons in the Hierarchy, while standard GameObjects appear grey."
    ],
    pitfalls: [ 
      "Creating assets in random folders and moving them later.", 
      "Keeping test scenes in production folders without naming conventions.", 
      "Editing prefab instances without applying intended source changes.", 
      "Not documenting why a manager exists and what system it owns.", 
      "Adding all systems to one scene instead of bootstrap plus gameplay scenes.", 
      "Using duplicate materials and sprites when reusable assets should be shared." 
    ], 
    deliverables: [ 
      "A clean folder tree with Scenes, Scripts, Prefabs, Art, Audio, Materials, and Docs.", 
      "Three scenes wired in Build Settings: MainMenu, Gameplay, and GameOver.", 
      "Two reusable prefabs with variant-ready structure and serialized fields.", 
      "One setup note file describing scene ownership and manager responsibilities." 
    ], 
    rubric: [ 
      "Architecture quality: folder and scene structure supports team scaling.", 
      "Prefab discipline: instances are used correctly and source assets are stable.", 
      "Operational clarity: naming and ownership are easy to understand.", 
      "Runtime hygiene: no missing reference errors during scene load." 
    ], 
    guidedLab: [
      "Step 1: The Global Bootstrap - Build MainMenu, Gameplay, and GameOver scenes.",
      "In every scene, create an empty GameObject named ---MANAGERS---.",
      "Create another empty GameObject named ---LEVEL_CONTENT--- so manager systems and level objects are separated visually.",
      "Step 2: Wiring the Build Settings - Open File > Build Settings and drag MainMenu, Gameplay, and GameOver into the list.",
      "The index matters: scene index 0 is what the player sees when the game launches.",
      "Step 3: Add SceneIdentifier script, run the scene, and verify the console logs active scene name plus workspace checks."
    ],
    checkpoints: [ 
      "Checkpoint A: Build Settings contains only valid scene entries in intended order.", 
      "Checkpoint B: Prefabs instantiate correctly in Gameplay scene.", 
      "Checkpoint C: No duplicate test assets outside sandbox folders.", 
      "Checkpoint D: A new teammate can navigate your project in under two minutes." 
    ], 
    assessment: [ 
      "Explain why bootstrap scenes reduce system initialization bugs.", 
      "Demonstrate prefab update flow and show before and after propagation.", 
      "Walk through folder strategy and justify at least three naming conventions.", 
      "Show scene transition path and identify where persistent systems live." 
    ], 
    expectedOutput: [ 
      "Project opens with zero missing scripts.", 
      "All three scenes load and return reliably.", 
      "Prefab edits propagate predictably.", 
      "Repository shows stable, readable project layout." 
    ] 
  },
  2: { 
    deepExplanation: [ 
      "1. The MonoBehaviour Lifecycle: The Engine Heartbeat. Unity scripts are not standard C# programs with Main(); they are hooks the engine calls at specific times.", 
      "Initialization Phase: Awake() runs when the object is created; Start() runs before the first frame. Use Awake for self-setup and Start for handshakes with other objects.", 
      "Update Loop: Update() runs every frame and is best for input. FixedUpdate() runs on a stable timer and is where physics should be applied to Rigidbody components.", 
      "2. Serialization: The Bridge to the Designer. [SerializeField] keeps fields private while exposing them in Inspector for tuning without recompiling.", 
      "Why it matters: values like move speed and jump force can be adjusted live, which improves iteration quality and collaboration.", 
      "Safety first: use [Header] and [Tooltip] so Inspector fields are understandable for non-coders and easier to maintain.", 
      "3. Input Handling: Intent vs Execution. Gather player intent in Update, then execute physics actions in FixedUpdate.", 
      "This separation prevents missed inputs and unstable behavior during frame-rate drops."   
    ],
    pitfalls: [ 
      "Reading and writing physics values in Update instead of FixedUpdate.", 
      "Leaving public fields exposed when SerializeField is more appropriate.", 
      "Calling GetComponent repeatedly every frame.", 
      "Mixing input collection and movement execution in one large method.", 
      "Ignoring null checks for required references.", 
      "Using logs with no context or label conventions." 
    ], 
    deliverables: [ 
      "A lifecycle demo script proving execution order with labeled logs.", 
      "A player input script with horizontal move and jump intent collection.", 
      "A movement executor script that applies physics in FixedUpdate.", 
      "A short script style note covering naming and serialization rules." 
    ], 
    rubric: [ 
      "Lifecycle correctness: logic runs in intended Unity callbacks.", 
      "Maintainability: methods are small and responsibilities are clear.", 
      "Debuggability: logs and guards make runtime faults obvious.", 
      "Inspector readiness: tunable values are serialized and documented." 
    ], 
    guidedLab: [ 
      "Step 1: The Lifecycle Probe - Create a script that logs Awake, Start, Update, and FixedUpdate to verify execution order.", 
      "Step 2: Deterministic Movement - Use frame-rate independent movement with Direction * Speed * Time.deltaTime where appropriate.", 
      "Step 3: Build PlayerController with serialized movement settings and cached Rigidbody2D in Awake.", 
      "Step 4: Collect input intent in Update and execute movement and jump in FixedUpdate.", 
      "Step 5: Validate with frame-rate variation and confirm stable movement behavior with no missed jump intent."   
    ],
    checkpoints: [ 
      "Checkpoint A: No per-frame GetComponent calls in profiler timeline.", 
      "Checkpoint B: Input and movement are separable for later AI reuse.", 
      "Checkpoint C: All tuning values can be changed from Inspector.", 
      "Checkpoint D: Console logs are structured and searchable." 
    ], 
    assessment: [ 
      "Explain Awake vs Start with one practical use case each.", 
      "Show why FixedUpdate is used for Rigidbody movement.", 
      "Refactor one method live to improve readability and explain changes.", 
      "Demonstrate validation behavior when a required component is removed." 
    ], 
    expectedOutput: [ 
      "Player responds to input consistently.", 
      "No null reference exceptions at scene start.", 
      "Movement behavior remains stable across frame-rate changes.", 
      "Inspector allows quick balancing without script edits." 
    ] 
  },
  3: { 
    deepExplanation: [ 
      "1. The Anatomy of a GameObject: A GameObject is like an empty cardboard box. Components are the items you place inside it.", 
      "Transform: The required component every object must have for position, rotation, and scale.", 
      "Mesh Filter and Renderer: The skin that makes an object visible.", 
      "Rigidbody: The weight that gives physical behavior such as falling.", 
      "Your C# Script: The brain that defines behavior.", 
      "2. Composition over Inheritance: In Unity, behavior is built by combining components instead of growing one large inheritance tree.", 
      "Example: To build a flaming explosive ninja, combine Movement, FireParticle, and Explosion components instead of writing one giant script.", 
      "Benefit: Reusable components can be shared across player, enemies, and moving platforms without rewriting logic.", 
      "3. Component Communication (Handshake): Small scripts must communicate safely and efficiently.", 
      "GetComponent<T> finds other components on the same GameObject.", 
      "Efficiency warning: Cache references in Awake so you do not search every frame in Update."  
    ], 
    pitfalls: [ 
      "One script controlling movement, combat, UI, and audio at once.", 
      "Circular dependencies between components on different objects.", 
      "Using scene-wide searches in hot paths instead of cached references.", 
      "No clear ownership for state transitions.", 
      "Duplicating logic across enemy and player scripts." 
    ], 
    deliverables: [ 
      "Player prefab composed from at least four focused components.", 
      "Enemy prefab reusing at least two shared components.", 
      "One interaction contract interface for cross-component communication.", 
      "A composition diagram showing responsibilities per component." 
    ], 
    rubric: [ 
      "Single responsibility: each component has a narrow purpose.", 
      "Reusability: components are portable across entities.", 
      "Dependency health: communication paths are explicit and stable.", 
      "Testability: behavior can be validated in isolation." 
    ], 
    guidedLab: [ 
      "Step 1: The Atomic Breakout - Split a Player object into PlayerInput, PlayerMotor, and PlayerHealth scripts.", 
      "Step 2: Inspector-Based Wiring - Use [SerializeField] and drag component references in Inspector instead of runtime searching.", 
      "Step 3: RequireComponent Safety Net - Use [RequireComponent(typeof(Rigidbody2D))] to prevent missing dependency crashes.", 
      "Step 4: Build and test a Health component with damage flow, feedback trigger, and destroy-on-zero behavior.", 
      "Step 5: Verify communication paths and ensure no per-frame GetComponent calls remain in Update."  
    ], 
    checkpoints: [ 
      "Checkpoint A: Removing one component does not crash unrelated systems.", 
      "Checkpoint B: Shared components are reused between player and enemy.", 
      "Checkpoint C: Dependencies are visible in Inspector and documented.", 
      "Checkpoint D: Prefabs remain clean with minimal override clutter." 
    ], 
    assessment: [ 
      "Explain composition vs inheritance tradeoff for this module design.", 
      "Demonstrate swapping one component implementation without system breakage.", 
      "Show isolation test for HealthComponent behavior.", 
      "Identify one coupling risk and explain mitigation." 
    ], 
    expectedOutput: [ 
      "Entity behavior is modular and predictable.", 
      "Component reuse reduces duplicate code.", 
      "Prefabs remain manageable as features increase.", 
      "Future modules can extend behavior with low refactor cost." 
    ] 
  },
  4: { 
    deepExplanation: [ 
      "1. Input Mapping: The Abstract Layer. A common mistake is hard-coding key inputs like W and Space. Professional Unity development uses Input Axes or the New Input System.", 
      "The Benefit: Check for actions such as Horizontal and Jump instead of specific keys.", 
      "Cross-Platform Readiness: Input.GetAxis(\"Horizontal\") supports keyboard, controller sticks, and other devices through one abstraction.", 
      "2. The Physics of Feel: Movement should not be binary. It needs inertia and controlled acceleration.", 
      "Linear Drag: This simulates resistance and controls how fast a player settles after input release.", 
      "Acceleration vs Velocity: Applying forces instead of directly setting speed creates more believable movement and cleaner interactions with physics.", 
      "3. Jump Buffering and Coyote Time: High-quality platforming accepts small timing errors.", 
      "Jump Buffering: If jump is pressed slightly before landing, queue and execute it on landing.", 
      "Coyote Time: Allow a short grace window after leaving a ledge so jumps still trigger fairly." 
    ], 
    pitfalls: [ 
      "Directly setting transform position on physics objects.", 
      "No coyote time or jump buffer leading to frustrating missed jumps.", 
      "Overly high acceleration causing twitchy control.", 
      "Camera lag that hides movement intent.", 
      "Hardcoded values that cannot be tuned in playtests." 
    ], 
    deliverables: [ 
      "A movement controller with acceleration, deceleration, and max speed.", 
      "A jump system with coyote time and jump buffering.", 
      "A camera follow rig with smoothing tuned for readability.", 
      "A tuning report with before and after movement metrics." 
    ], 
    rubric: [ 
      "Responsiveness: input-to-motion delay remains minimal.", 
      "Consistency: jump and movement outcomes are repeatable.", 
      "Tuning discipline: values are serialized and benchmarked.", 
      "Player readability: camera and movement communicate intent clearly." 
    ], 
    guidedLab: [ 
      "Step 1: The Input-to-Intent Map - Create an InputReader script that only captures intent values.", 
      "Step 2: The Motor (Physics Execution) - Create a PlayerMotor that reads intent and applies Rigidbody forces.", 
      "Step 3: Tuning in the Inspector - Expose acceleration, maxSpeed, jumpForce, and drag values for rapid playtest balancing.", 
      "Step 4: Add grounded checks and jump logic so jump activation is deterministic and debuggable.", 
      "Step 5: Validate responsiveness and consistency through repeated movement/jump runs." 
    ], 
    checkpoints: [ 
      "Checkpoint A: Ten consecutive jumps feel consistent.", 
      "Checkpoint B: Player can recover from near-edge jump attempts.", 
      "Checkpoint C: Camera never loses player during fast turns.", 
      "Checkpoint D: Movement values can be tuned live in Inspector." 
    ], 
    assessment: [ 
      "Show movement metric table for speed, jump height, and stop distance.", 
      "Explain why coyote time improves perceived fairness.", 
      "Demonstrate camera settings before and after tuning.", 
      "Perform a live tuning change and justify impact." 
    ], 
    expectedOutput: [ 
      "Movement feels responsive and controllable.", 
      "Jump reliability improves success rate on platform sections.", 
      "Camera follow supports decision making.", 
      "Tuning process is repeatable for future characters." 
    ] 
  },
  5: { 
    deepExplanation: [ 
      "1. The Physical Duo: Rigidbody2D + Collider2D. For any physics interaction to happen, an object needs two things.", 
      "The Collider2D (The Shape): This defines the physical hitbox of the object. Without this, objects will pass through each other.", 
      "The Rigidbody2D (The Physics Soul): This tells Unity physics that the object should be affected by gravity and forces.", 
      "Pro Tip: Keep scenery static (no Rigidbody) and use Dynamic for moving objects.", 
      "2. Collisions vs Triggers (Solid vs Ghost): Use OnCollisionEnter2D for solid impacts and OnTriggerEnter2D for overlap zones.", 
      "OnCollisionEnter2D is for contact like player hitting a wall where physics stops movement.", 
      "OnTriggerEnter2D is for ghost zones like checkpoint or pickup where code runs on overlap.", 
      "3. The Collision Matrix: Use layers to control which systems can interact and reduce unnecessary checks.", 
      "Disable unneeded layer pairs in Physics 2D settings so only intentional interactions are evaluated."  
    ],
    pitfalls: [ 
      "Using complex polygon colliders where primitive colliders would suffice.", 
      "Not configuring layer collision matrix, causing unexpected contacts.", 
      "Mixing trigger logic with blocking logic in one handler.", 
      "Relying on tags alone for all collision routing.", 
      "Ignoring continuous collision settings on fast moving objects." 
    ], 
    deliverables: [ 
      "A documented layer matrix for player, enemy, projectile, pickup, and world.", 
      "Collision handlers for damage, pickup, and boundary logic.", 
      "Trigger zones for checkpoints and level events.", 
      "A physics test scene with repeatable contact scenarios." 
    ], 
    rubric: [ 
      "Correctness: collisions and triggers fire in intended scenarios only.", 
      "Performance: collider setup supports stable frame pacing.", 
      "Safety: no tunneling or random pass-through at expected speeds.", 
      "Maintainability: collision routing is readable and extensible." 
    ], 
    guidedLab: [ 
      "Step 1: The Layer Standard - Assign Player, Enemy, Ground, and Hazard layers immediately.", 
      "Step 2: The Checkpoint Data Pattern - Save checkpoint on trigger enter and respawn to the stored position.", 
      "Step 3: Knockback Feedback - On hazard hit, apply force opposite the impact normal.", 
      "Step 4: Validate separate collision path and trigger path behavior.", 
      "Step 5: Configure collision matrix so only required layer pairs interact."  
    ],
    checkpoints: [ 
      "Checkpoint A: Player collides with world but not with pickup triggers.", 
      "Checkpoint B: Projectiles hit enemies and ignore non-target layers.", 
      "Checkpoint C: High-speed movement does not tunnel through thin colliders.", 
      "Checkpoint D: Physics test scene passes all scripted scenarios." 
    ], 
    assessment: [ 
      "Explain trigger vs collision usage with one concrete example each.", 
      "Present your layer matrix and justify two exclusions.", 
      "Demonstrate one bug found via physics test scene and its fix.", 
      "Show profiler evidence for stable physics behavior." 
    ], 
    expectedOutput: [ 
      "Collision outcomes are deterministic and readable.", 
      "Gameplay events fire at the right time through triggers.", 
      "Layer matrix prevents accidental interactions.", 
      "Physics foundation is ready for combat and AI modules." 
    ] 
  },
  6: {
    deepExplanation: [
      "1. The Finite State Machine (FSM) for Game Flow: A professional game transitions between explicit states like StartMenu, Playing, Paused, and GameOver.",
      "The Tool: Use C# enums to define game states clearly.",
      "The Logic: Use switch or guarded flow to apply behavior by currentState.",
      "2. Spawning Strategies: Manual vs. Automated. Spawning should be paced over time.",
      "Wave Pattern: Coroutines let you spawn, wait, then spawn again without freezing gameplay.",
      "Instantiation: Instantiate(prefab, position, rotation) clones your master templates at runtime.",
      "3. Clean State Resets: Restart must reset score/state, clear old enemies, and restore spawn-safe player position.",
      "A clean reset prevents second-run bugs and keeps game flow deterministic."
    ],
    pitfalls: [
      "Starting multiple wave coroutines at once.",
      "Forgetting to stop spawning on GameOver.",
      "Leaving old enemies alive on restart.",
      "Missing null guards for prefab or spawn points."
    ],
    deliverables: [
      "WaveManager with enum-based game state flow.",
      "Coroutine-based wave spawner with timed cadence.",
      "Restart path that resets runtime state safely.",
      "State transition logs for verification."
    ],
    rubric: [
      "State clarity: transitions are explicit and predictable.",
      "Spawner reliability: loop runs only in Playing state.",
      "Reset integrity: repeated runs remain stable.",
      "Runtime hygiene: logs and guards support debugging."
    ],
    guidedLab: [
      "Step 1: The Enum Definition - Define GameState and guard behavior with currentState.",
      "Step 2: The Spawner Coroutine - Implement IEnumerator wave spawning with WaitForSeconds.",
      "Step 3: Singleton Pattern Intro - Expose one shared WaveManager instance safely.",
      "Step 4: EndGame path - Stop spawning and switch state to GameOver.",
      "Step 5: Restart path - Reset runtime state and validate repeatability."
    ],
    checkpoints: [
      "Checkpoint A: Transition logs match expected state flow.",
      "Checkpoint B: Spawner runs only while Playing.",
      "Checkpoint C: EndGame stops additional spawns.",
      "Checkpoint D: Restart behaves consistently across runs."
    ],
    assessment: [
      "Explain why enum-driven flow reduces state bugs.",
      "Demonstrate spawn cadence tuning from Inspector.",
      "Show GameOver transition and verify spawner stop.",
      "Demonstrate clean restart from dirty runtime state."
    ],
    expectedOutput: [
      "Timed wave spawning during Playing state.",
      "No spawning once GameOver is active.",
      "Readable logs for all transitions.",
      "Deterministic restart behavior across retries."
    ]
  },
  7: { 
    deepExplanation: [ 
      "1. What is a ScriptableObject? A MonoBehaviour acts in the scene, while a ScriptableObject stores reusable data assets.", 
      "A ScriptableObject does not live in the Hierarchy; it lives in the Project window as an asset file.", 
      "Multiple GameObjects can read from one ScriptableObject, improving memory usage and consistency.", 
      "2. Why Data-Driven Design? Professional teams separate logic from values.", 
      "Logic in scripts defines behavior flow; ScriptableObject data defines per-entity stats such as health and speed.", 
      "This allows balancing through Inspector assets without editing code for every tweak.", 
      "3. Runtime Binding and Persistence: ScriptableObjects remain in memory while the game is running.", 
      "Play-mode edits to ScriptableObject values can persist, so protect baseline data during testing."  
    ], 
    pitfalls: [ 
      "Hard-coding balance values directly in runtime scripts.", 
      "Forgetting null checks for missing data assets.", 
      "Accidentally editing base ScriptableObject values during play mode.", 
      "Duplicating config assets without naming/version discipline."  
    ], 
    deliverables: [ 
      "EnemyConfig ScriptableObject template with CreateAssetMenu.", 
      "EnemyController that binds to config and initializes runtime state.", 
      "At least two enemy config assets with different stats.", 
      "Validation logs proving data-driven initialization."  
    ], 
    rubric: [ 
      "Data separation: logic and balance values are cleanly split.", 
      "Binding safety: missing config cases are guarded and logged.", 
      "Reusability: one script supports multiple enemy variants.", 
      "Maintainability: data assets are clear, named, and scalable."  
    ], 
    guidedLab: [ 
      "Step 1: The Config Template - Create a ScriptableObject class with CreateAssetMenu.", 
      "Step 2: The Entity Link - Add [SerializeField] EnemyConfig data in EnemyController and bind in Inspector.", 
      "Step 3: Validation Checks - Guard null config references in Awake before initialization.", 
      "Step 4: Initialize runtime values from ScriptableObject fields.", 
      "Step 5: Test multiple enemy variants by swapping data assets only."  
    ], 
    checkpoints: [ 
      "Checkpoint A: Enemy instances initialize correctly from bound config assets.", 
      "Checkpoint B: Missing data asset logs a clear error and avoids invalid runtime behavior.", 
      "Checkpoint C: Two config assets produce visibly different enemy behavior.", 
      "Checkpoint D: No hard-coded balance values remain in controller logic."  
    ], 
    assessment: [ 
      "Explain why ScriptableObjects improve balancing workflow for designers.", 
      "Demonstrate swapping enemy behavior by changing only config asset references.", 
      "Show runtime initialization logs for at least two enemy variants.", 
      "Describe how you prevent accidental baseline data overwrite during playtests."  
    ], 
    expectedOutput: [ 
      "Enemy stats initialize from data assets instead of hard-coded values.", 
      "Multiple enemy variants run on one reusable controller script.", 
      "Config-missing cases fail safely with clear diagnostics.", 
      "Balance iteration is faster and code changes are reduced."  
    ] 
  }, 
  8: { 
    deepExplanation: [ 
      "1. The Animator Controller: The Visual Brain. Animator Controllers use states, parameters, and transitions to decide what clip plays.", 
      "2. Blend Trees: Smoothly mix walk/run using one speed variable instead of hard switching.", 
      "3. Animation Events: Trigger C# methods on exact animation frames for footsteps or attack hits."  
    ], 
    pitfalls: ["Hard-coding animation playback.","Incorrect Has Exit Time settings.","No cached references for Animator/Rigidbody2D."], 
    deliverables: ["Controller with Idle Run Jump Attack.","Speed Blend Tree.","PlayerAnimation bridge script.","Attack event callback proof."], 
    rubric: ["Deterministic transitions.","Smooth blending.","Responsive feel.","Accurate animation events."], 
    guidedLab: [ 
      "Step 1: Add Animator component and assign controller.", 
      "Step 2: Drive speed and isGrounded parameters from C#.", 
      "Step 3: Configure transitions and Has Exit Time.", 
      "Step 4: Build locomotion Blend Tree.", 
      "Step 5: Add Animation Event and verify callback."  
    ], 
    checkpoints: ["Idle Run reacts to speed.","Jump follows grounded.","No animation popping.","Event fires on hit frame."], 
    assessment: ["Explain parameter-driven animation.","Demonstrate blending at multiple speeds.","Justify one Exit Time choice.","Show event timing logs."], 
    expectedOutput: ["Visuals match movement.","Transitions are smooth.","Timing hooks are frame-accurate.","Animator graph is scalable."] 
  } 
, 
  9: { 
    deepExplanation: ["1. The AI State Machine: enemies transition between Patrolling, Chasing, and Attacking.","2. Perception: use proximity checks and optional line-of-sight checks to decide state.","3. Steering and Navigation: move toward target points using stable steering logic."], 
    pitfalls: ["No player null checks.","Conflicting transition rules.","Untuned radius values."], 
    deliverables: ["EnemyBrain FSM.","Patrol loop.","Detection and attack radii.","Gizmo visualization."], 
    rubric: ["Deterministic transitions.","Reliable perception.","Readable behavior code."], 
    guidedLab: ["Step 1 define AIState enum.","Step 2 build patrol loop.","Step 3 add detection and attack checks.","Step 4 run state switch behavior.","Step 5 validate with gizmos."], 
    checkpoints: ["Patrol cycles points.","Chase and attack thresholds work.","Gizmos match behavior."], 
    assessment: ["Explain transitions.","Demo patrol-chase-attack flow.","Show tuning impact."], 
    expectedOutput: ["Patrol by default.","Chase near player.","Attack at close range."] 
  } 
, 
  10: { 
    deepExplanation: ["1. Archetype Differentiation: Grunt, Tank, and Sniper roles should force different player responses.","2. Telegraphing and Readability: attacks must provide visible or audible wind-up before impact.","3. Encounter Escalation: introduce one role, then combine roles to test mastery."], 
    pitfalls: ["Invisible attacks.","Role overlap.","Encounter bloat."], 
    deliverables: ["Three role variants.","Telegraphed attack wind-up.","Encounter trigger mix.","Escalation demo."], 
    rubric: ["Roles are distinct.","Telegraphs are fair.","Escalation is clear.","Performance remains stable."], 
    guidedLab: ["Step 1 create role configs.","Step 2 add telegraph wind-up.","Step 3 build encounter trigger.","Step 4 tune cooldowns and reaction windows.","Step 5 validate fairness."], 
    checkpoints: ["Three variants active.","Every attack has telegraphing.","Trigger spawns intended mix.","Player can react and dodge."], 
    assessment: ["Explain role differentiation.","Demonstrate telegraph timing.","Show escalation flow."], 
    expectedOutput: ["Mixed archetype encounter works.","Combat is readable and fair.","Telegraphs precede hits.","Difficulty ramps cleanly."] 
  } 
, 
  11: { 
    deepExplanation: ["1. IDamageable Interface: weapons should only care if a target can receive damage.","2. Hitscan vs Projectile: Raycast is instant; projectiles are physical objects.","3. Combat Feedback: I-Frames and impact cues make combat fair and readable."], 
    pitfalls: ["Tight coupling to enemy classes.","Missing I-Frames.","Incorrect layer masks."], 
    deliverables: ["IDamageable contract.","Weapon system implementation.","Health with I-Frames.","Cooldown-controlled attacks."], 
    rubric: ["Damage routing is decoupled.","Weapon timing is deterministic.","Feedback is visible.","Targets are extensible."], 
    guidedLab: ["Step 1 create IDamageable.","Step 2 build weapon logic.","Step 3 implement TakeDamage in health.","Step 4 add I-Frame feedback.","Step 5 validate with multiple target types."], 
    checkpoints: ["IDamageable on player and enemy.","Weapon damages multiple target types.","I-Frames prevent frame shredding.","Cooldown prevents infinite fire."], 
    assessment: ["Explain interface decoupling.","Demonstrate hitscan/projectile logic.","Show cooldown and I-Frame validation."], 
    expectedOutput: ["Combat sandbox works across target types.","Damage is deterministic.","Feedback improves hit clarity.","Weapon cadence is stable."] 
  } 
, 
  12: { 
    deepExplanation: ["1. Scene lifecycle: scenes must be registered in Build Settings and index 0 controls startup entry.","2. Loading strategy: synchronous loading can freeze; async loading enables responsive transitions.","3. DDOL pattern: persistent managers survive scene changes, with duplicate checks to avoid inflation."], 
    pitfalls: ["Scene missing in Build Settings.","Duplicate singleton managers after re-entry.","Hard-coded scene names without transition strategy."], 
    deliverables: ["Bootstrap/main menu and gameplay scene flow.","Async loading screen with progress bar.","Persistent manager with duplicate protection.","Safe trigger-based transition logic."], 
    rubric: ["Transitions are stable and non-blocking.","Loading UI accurately reflects progress.","Persistent systems remain single-instance.","Scene graph is maintainable."], 
    guidedLab: ["Step 1 create SceneLoader singleton.","Step 2 wire loading UI with Slider.","Step 3 implement LoadSceneAsync coroutine.","Step 4 add level-end trigger transition.","Step 5 validate DDOL duplicate safety."], 
    checkpoints: ["All scenes present in Build Settings order.","Loading screen appears during transitions.","Managers survive transitions once.","No duplicate managers after menu return."], 
    assessment: ["Explain sync vs async tradeoffs.","Demonstrate progress-driven async load.","Show singleton duplicate prevention."], 
    expectedOutput: ["Main Menu -> Gameplay -> Game Over transitions work.","Loading remains responsive.","Core managers persist safely.","No transition-related runtime errors."] 
  } 
, 
  13: { 
    deepExplanation: ["1. Canvas and Event System: UI interaction depends on a valid EventSystem and panel architecture.","2. Responsive UI: anchors and layout rules keep menus stable across resolutions.","3. Persistent settings: PlayerPrefs stores values like volume across sessions."], 
    pitfalls: ["Missing EventSystem causes dead UI.","No anchors causing broken layouts.","Not restoring Time.timeScale after pause."], 
    deliverables: ["Main, settings, and pause menu flow.","Pause/resume control with safe timescale restore.","Persistent volume setting using PlayerPrefs.","TMP-based crisp text usage."], 
    rubric: ["Navigation is reliable.","UI scales cleanly.","Pause state is deterministic.","Settings persist correctly."], 
    guidedLab: ["Step 1 build panel-based menu manager.","Step 2 wire pause toggle with Escape.","Step 3 save and load volume with PlayerPrefs.","Step 4 verify anchors across sizes.","Step 5 validate TMP readability."], 
    checkpoints: ["Buttons route to correct panels.","Pause stops gameplay and resumes safely.","Volume persists after restart.","UI remains aligned on different resolutions."], 
    assessment: ["Demonstrate panel switching architecture.","Explain pause state safety.","Show persisted settings retrieval."], 
    expectedOutput: ["Production-ready menu flow.","Reliable pause behavior.","Persistent settings in PlayerPrefs.","Readable UI on all target screens."] 
  } 
, 
  14: {  
    deepExplanation: [ 
      "1. Particle Systems: The Visual Pop. Use Shuriken systems to create impact sparks, dust, smoke, and magic cues.", 
      "Burst vs Rate: Use Burst for one-shot impacts and Rate over Time for sustained effects like fire or ambient particles.", 
      "Collision and Lifetime: Tune collision, color-over-lifetime, and size-over-lifetime so effects feel readable and intentional.", 
      "2. Camera Shake: Communicating Impact. Heavy actions should create short, controlled camera offsets and return to center smoothly.", 
      "The Logic: Apply temporary random localPosition offsets, then restore camera position deterministically.", 
      "Cinemachine Note: In production, Cinemachine Impulse is a scalable way to broadcast impact-driven camera reactions.", 
      "3. Squash and Stretch: Small scale changes can make movement and landings feel organic and alive.", 
      "Even a small 5 to 10 percent scale change during jump and landing significantly improves game feel.", 
      "4. Post-Processing: The Final Coat. Bloom, Vignette, and color grading can unify style and direct player focus without changing mechanics."  
    ],  
    pitfalls: [ 
      "Overusing effects until core gameplay readability drops.", 
      "Applying camera shake on every action instead of high-impact moments only.", 
      "Using long hit-stop durations that feel like lag instead of impact.", 
      "Stacking post effects without profiling on lower-end hardware."  
    ],  
    deliverables: [ 
      "Hit and movement particle prefabs with reusable settings.", 
      "Centralized GameJuice utility for hit-stop and camera shake.", 
      "At least one feedback trigger integrated into combat flow.", 
      "Post-processing profile tuned for atmosphere and readability."  
    ],  
    rubric: [ 
      "Feedback quality: each major action has clear visual or physical response.", 
      "Readability: effects improve clarity instead of adding noise.", 
      "Performance: polish layer does not create unstable frame pacing.", 
      "Consistency: feedback timing and intensity are intentional and repeatable."  
    ],  
    guidedLab: [ 
      "Step 1: The Hit Effect Prefab - Create a particle prefab for impact feedback and trigger it on damage.", 
      "Step 2: The Camera Shake Trigger - Add a camera utility that applies short random offsets and restores center.", 
      "Step 3: Frame-Freeze Hit-Stop - Add a short realtime pause for strong impacts using WaitForSecondsRealtime.", 
      "Step 4: Post-Processing Pass - Configure bloom, vignette, and grading for visual focus.", 
      "Step 5: Playtest and tune intensity so effects feel strong but readable."  
    ],  
    checkpoints: [ 
      "Particles trigger correctly on hit or movement events.", 
      "Camera shake activates on heavy impacts and settles cleanly.", 
      "Hit-stop is brief and responsive, not disruptive.", 
      "Post-processing improves mood without major FPS regression."  
    ],  
    assessment: [ 
      "Present a before-and-after polish comparison.", 
      "Explain tuning decisions for shake, hit-stop, and particle intensity.", 
      "Show one performance pass proving the polish layer is safe."  
    ],  
    expectedOutput: [ 
      "Combat and movement interactions feel more responsive.", 
      "Feedback cues make impact timing easier to read.", 
      "Visual atmosphere is stronger and more cohesive.", 
      "Module quality shifts from prototype feel toward production polish."  
    ]  
  }, 
  15: { 
    deepExplanation: [ 
      "1. The Unity Profiler: Your X-Ray Machine. Use CPU and GPU timeline data to identify real bottlenecks before changing code.", 
      "CPU Usage: Watch for spikes from heavy Update logic or garbage collection events.", 
      "Deep Profile: Use it selectively to isolate expensive functions when a script appears slow.", 
      "2. Object Pooling: Reusing vs Destroying. Frequent Instantiate and Destroy creates allocation churn and frame hitches.", 
      "Pooling pattern: disable and reuse bullets, VFX, and other high-frequency objects to keep frame pacing stable.", 
      "3. Draw Calls and Batching: Reduce render overhead with static batching and sprite atlases.", 
      "Static scene pieces should be marked Static, and 2D sprites should be atlas-packed to reduce state changes."  
    ], 
    pitfalls: [ 
      "Premature optimization before capturing profiler baseline.", 
      "Running too many coroutines when one manager loop is enough.", 
      "Leaving repeated string and tag comparisons in per-frame paths.", 
      "Ignoring GC allocation spikes during stress scenarios."  
    ], 
    deliverables: [ 
      "Profiler baseline and post-optimization capture with notes.", 
      "Object pool implementation for at least one high-frequency prefab.", 
      "Layered rendering optimization using static flags or atlas workflow.", 
      "Code cleanup replacing costly per-frame patterns."  
    ], 
    rubric: [ 
      "Measurement quality: bottlenecks identified from profiler evidence.", 
      "Optimization impact: reduced spikes and smoother frame pacing.", 
      "Code quality: pooling and compare patterns are production-safe.", 
      "Validation discipline: before/after evidence is clear and reproducible."  
    ], 
    guidedLab: [ 
      "Step 1: Capture baseline Profiler data and note top CPU and GC costs.", 
      "Step 2: Replace expensive tag and string checks with CompareTag where appropriate.", 
      "Step 3: Implement a simple object pool and route one system through it.", 
      "Step 4: Optimize rendering setup with static batching or atlas preparation.", 
      "Step 5: Capture post-optimization data and compare frame stability."  
    ], 
    checkpoints: [ 
      "Profiler shows lower variance in frame time under the same test.", 
      "At least one pooled prefab reuses inactive objects correctly.", 
      "No obvious GC spikes during repeated spawn and despawn loops.", 
      "Rendering settings reduce unnecessary draw-call overhead."  
    ], 
    assessment: [ 
      "Explain one measured bottleneck and the fix applied.", 
      "Demonstrate pooled vs non-pooled runtime behavior.", 
      "Present before and after profiler evidence with conclusions."  
    ], 
    expectedOutput: [ 
      "Frame pacing is more stable during high-action moments.", 
      "Spawn-heavy systems avoid noticeable allocation hitches.", 
      "Optimization decisions are evidence-driven, not guess-based.", 
      "A concise performance report documents measurable gains."  
    ] 
  },
  16: {
    deepExplanation: [
      "1. Build Pipeline: From Project to Product. Build converts scripts and assets into a standalone executable.",
      "Development Build: keeps debugging and profiler hooks for test visibility.",
      "Release Build: strips debug overhead for better size and performance.",
      "2. Release QA and Smoke Test: validate critical user flow after every build.",
      "Smoke test checks launch, first playable flow, menu navigation, and exit behavior.",
      "Regression discipline: after fixing one bug, retest the affected flow end to end.",
      "3. Build Profiles and Platform Constraints: tune assets and code paths per platform target.",
      "Use platform-aware settings and guarded code paths for desktop and mobile differences."
    ],
    pitfalls: [
      "Missing scenes in Build Settings causing black screen or broken flow.",
      "Using editor-only assumptions for paths and platform features.",
      "Shipping debug assets and test content in release builds.",
      "Skipping smoke tests after last-minute fixes."
    ],
    deliverables: [
      "Configured Build Settings with complete scene order.",
      "Player Settings metadata with product name and versioning.",
      "Smoke test checklist with pass and fail notes.",
      "Release candidate build output with QA signoff summary."
    ],
    rubric: [
      "Build reliability: executable launches and core flow works.",
      "QA quality: smoke test coverage is clear and repeatable.",
      "Release discipline: build type and version are traceable.",
      "Platform readiness: settings reflect target device constraints."
    ],
    guidedLab: [
      "Step 1: Build Profile Setup - confirm platform target and scenes in build list.",
      "Step 2: Player Settings Branding - set company, product, and version values.",
      "Step 3: Build and Run - execute standalone and log startup behavior.",
      "Step 4: Smoke Test Pass - validate menu to gameplay to game-over path.",
      "Step 5: QA Notes - record issues, fix, and rerun regression checks."
    ],
    checkpoints: [
      "Standalone build launches without immediate crash.",
      "Core scene transitions complete successfully.",
      "Version and build type are visible in runtime output.",
      "Smoke test report is complete and actionable."
    ],
    assessment: [
      "Present your smoke test evidence and bug notes.",
      "Explain one platform-related issue and mitigation.",
      "Demonstrate version tracking in a standalone build."
    ],
    expectedOutput: [
      "A working release candidate build package.",
      "Verified menu and gameplay flow in standalone mode.",
      "Clear version and build-type traceability.",
      "Documented QA status for next release decision."
    ]
  },
  17: {
    deepExplanation: [
      "1. Sprint Backlog and Task Breakdown: production progress is driven by explicit tasks, not vague effort.",
      "Backlog discipline: track feature work, bug fixes, and polish items in one prioritized list.",
      "Estimation helps prevent unrealistic commitments and protects delivery confidence.",
      "2. Definition of Done: a feature is done only when integration, testing, and tuning are complete.",
      "Done means stable behavior, build verification, designer-tunable values, and integrated feedback layers.",
      "3. Scope Locking: avoid feature creep by freezing new ideas and finishing the committed set.",
      "Delivery quality comes from finishing fewer things well, not starting many things partially."
    ],
    pitfalls: [
      "Over-committing sprint scope and missing core outcomes.",
      "Spending polish effort on mechanics that are not yet stable.",
      "Leaving technical debt unresolved behind TODO markers.",
      "Introducing late features that destabilize release flow."
    ],
    deliverables: [
      "Sprint backlog with Must-Have and Nice-to-Have categorization.",
      "One major feature completed to Definition of Done.",
      "One major polish pass integrated and validated.",
      "Sprint review summary with build status and outcomes."
    ],
    rubric: [
      "Planning quality: scope is realistic and prioritized.",
      "Execution quality: committed items are fully integrated.",
      "Stability: sprint output runs in standalone build flow.",
      "Discipline: scope lock respected without late feature drift."
    ],
    guidedLab: [
      "Step 1: Create Sprint Backlog - split remaining work into Must-Have and Nice-to-Have items.",
      "Step 2: Apply 1+1 Rule - select one major feature and one major polish objective.",
      "Step 3: Implement with Definition of Done checks at each milestone.",
      "Step 4: Use feature toggles to test new behavior safely against stable baseline.",
      "Step 5: Run sprint review and document what shipped versus what was deferred."
    ],
    checkpoints: [
      "Backlog exists with clear priorities and effort assumptions.",
      "Feature and polish targets are completed to DoD criteria.",
      "No out-of-scope additions were introduced during sprint.",
      "Project still builds and runs after sprint integration."
    ],
    assessment: [
      "Present sprint plan versus delivered outcomes.",
      "Explain one tradeoff decision made to protect delivery.",
      "Demonstrate feature toggle usage for controlled rollout."
    ],
    expectedOutput: [
      "A stable sprint increment with visible feature value.",
      "Improved project maturity and delivery confidence.",
      "Documented review notes for next sprint planning.",
      "Reduced risk of lingering unfinished work."
    ]
  },
  18: {
    deepExplanation: [
      "1. Teaching Through Geometry: use environment layout to teach mechanics without text-heavy instructions.",
      "Safe introduction spaces let players learn new moves without punishment.",
      "Signposting with color, light, and motion guides player attention toward intended routes.",
      "2. Difficulty Rhythm: alternate challenge peaks with recovery valleys to maintain flow state.",
      "After a high-intensity section, provide checkpoint or low-stress decompression moments.",
      "3. Greyboxing Workflow: validate scale, jump distance, and readability before final art production.",
      "Geometry-first iteration is faster and prevents expensive late-stage rework."
    ],
    pitfalls: [
      "Creating leap-of-faith jumps where landing zones are not readable.",
      "Adding visual noise that blurs foreground and gameplay-critical space.",
      "Overusing pop-up tutorials that interrupt player flow.",
      "Skipping playtests and assuming intent is obvious."
    ],
    deliverables: [
      "Three-level greybox progression with increasing mechanic complexity.",
      "Level 1 safe mechanic introduction segment.",
      "Level 2 combined-mechanic challenge segment.",
      "Level 3 mastery challenge with fair hazard pacing."
    ],
    rubric: [
      "Teaching clarity: level geometry communicates mechanics effectively.",
      "Flow quality: challenge and recovery pacing feels intentional.",
      "Readability: traversal and combat spaces are visually understandable.",
      "Iteration quality: playtest findings are reflected in revised layout."
    ],
    guidedLab: [
      "Step 1: Build a safe mechanic-introduction room with one clear objective.",
      "Step 2: Design a second level combining two systems in one encounter.",
      "Step 3: Add a mastery section with higher stakes and fair recovery points.",
      "Step 4: Run silent playtests and record where players hesitate or fail.",
      "Step 5: Refine geometry, sightlines, and cue placement from test evidence."
    ],
    checkpoints: [
      "Level 1 teaches one mechanic without external instruction.",
      "Level 2 clearly combines mechanics with readable objective flow.",
      "Level 3 validates mastery while remaining fair and learnable.",
      "Greybox scale feels correct for movement and combat."
    ],
    assessment: [
      "Present progression intent for all three levels.",
      "Show at least one iteration based on playtest behavior.",
      "Explain one geometry change that improved player understanding."
    ],
    expectedOutput: [
      "A playable three-level progression package in greybox form.",
      "Improved onboarding through environment-driven teaching.",
      "Balanced difficulty curve with visible peaks and valleys.",
      "Documented playtest-driven level revisions."
    ]
  },
  19: {
    deepExplanation: [
      "1. Quest State Machine: objective flow should move through Inactive, Active, and Completed states.",
      "State transitions must be explicit so progression remains predictable and debuggable.",
      "2. Event-Driven Communication: gameplay systems broadcast events and objective systems listen.",
      "Observer pattern reduces tight coupling and prevents manager lookup chains across scripts.",
      "3. Persistence and Reset Logic: objectives should resume or reset from known checkpoints safely.",
      "A clear state model prevents invalid completed states after retries or restarts."
    ],
    pitfalls: [
      "Forgetting to unsubscribe event listeners in OnDisable.",
      "Triggering events before listeners are initialized.",
      "Using inconsistent magic strings for objective IDs.",
      "Mixing UI state updates directly into gameplay triggers."
    ],
    deliverables: [
      "Objective manager with state-based mission progression.",
      "Event bus for item and objective notifications.",
      "Quest tracker UI reacting to event-driven updates.",
      "Reset flow that restores objective state correctly."
    ],
    rubric: [
      "Architecture quality: objective flow is modular and decoupled.",
      "State correctness: transitions are reliable across retries.",
      "UI clarity: objective status is readable and responsive.",
      "Lifecycle hygiene: listeners are subscribed and cleaned safely."
    ],
    guidedLab: [
      "Step 1: Create Objective Data assets with IDs and completion criteria.",
      "Step 2: Implement static GameEvents channels for objective signals.",
      "Step 3: Build ObjectiveManager listeners and state transitions.",
      "Step 4: Connect HUD tracker to objective progress events.",
      "Step 5: Validate reset and retry behavior for objective lifecycle."
    ],
    checkpoints: [
      "Quest item updates objective UI without direct object references.",
      "Listeners are removed in OnDisable to prevent leaks.",
      "Objective states reset correctly on new run flow.",
      "Completion feedback is visible and immediate."
    ],
    assessment: [
      "Demonstrate two linked objectives driven by events.",
      "Explain decoupling benefits in your event architecture.",
      "Show one failure case and the reset behavior handling it."
    ],
    expectedOutput: [
      "A working objective chain such as Find Key then Open Door.",
      "Event-driven UI updates with minimal coupling.",
      "Reliable objective state progression across retries.",
      "Clear mission feedback in the player HUD."
    ]
  },
  20: {
    deepExplanation: [
      "1. Integration Pass: combine gameplay systems into one stable loop and validate every handoff.",
      "Integration risk is highest when independent systems first interact under real runtime flow.",
      "2. Technical Storytelling: show engineering decisions, tradeoffs, and measurable improvements.",
      "Portfolio value comes from explaining architecture and evidence, not only showing gameplay.",
      "3. Regression and Scope Lock: fix defects only, avoid introducing new feature scope at finish line.",
      "Gold Master quality depends on repeatable loop stability across restarts and full-session runs."
    ],
    pitfalls: [
      "Adding last-minute features that destabilize the release candidate.",
      "Missing technical documentation for key architecture decisions.",
      "Assuming one successful run proves integration stability.",
      "Fixing one subsystem without regression testing dependent systems."
    ],
    deliverables: [
      "Integrated full game loop with verified objective and scene flow.",
      "Final polish pass focused on first-play impression quality.",
      "Technical post-mortem and architecture case-study notes.",
      "Standalone capstone build package ready for portfolio use."
    ],
    rubric: [
      "Integration reliability: systems hand off data and events correctly.",
      "Stability quality: restart and replay paths remain consistent.",
      "Presentation quality: portfolio narrative is technical and evidence-based.",
      "Release readiness: build is clean, documented, and test-verified."
    ],
    guidedLab: [
      "Step 1: Build an integration checklist for all critical system handshakes.",
      "Step 2: Execute final polish on opening gameplay sequence and key feedback moments.",
      "Step 3: Run full regression on menu, gameplay, objective, and restart flows.",
      "Step 4: Document architecture, performance improvements, and tradeoffs.",
      "Step 5: Produce capstone release candidate and validate on target platform."
    ],
    checkpoints: [
      "Menu to gameplay to win or loss to menu loop works repeatedly.",
      "Critical managers and global systems are present at runtime.",
      "No blocking regressions after final bug-fix pass.",
      "Portfolio artifacts clearly explain technical contribution."
    ],
    assessment: [
      "Demonstrate complete loop stability in a standalone run.",
      "Present one deep technical case study from your project.",
      "Show before and after evidence for one optimization decision."
    ],
    expectedOutput: [
      "A shippable capstone build with integrated systems.",
      "A complete technical post-mortem and project breakdown.",
      "Portfolio-ready evidence of architecture and performance work.",
      "Stable release behavior across repeated play sessions."
    ]
  },
  21: {
    deepExplanation: [
      '1. Roll-a-Ball teaches core 3D physics movement and trigger-based collection loops.',
      '2. You learn Rigidbody force control, pickup tagging, and basic score progression.',
      '3. UI linkage introduces player feedback and win-state messaging.'
    ],
    pitfalls: ['Using transform movement instead of Rigidbody force','Missing PickUp tag on collectibles','Not setting pickup collider as trigger','Forgetting UI references in Inspector'],
    deliverables: ['Playable Roll-a-Ball scene','Player movement script with force input','Collectible prefab with rotation','Score plus win message UI'],
    rubric: ['Physics movement is stable','Pickup loop is reliable','UI updates correctly','Win condition is enforced'],
    guidedLab: ['Step 1: Create ground, player sphere, and Rigidbody setup','Step 2: Build pickup prefab with trigger collider and rotation','Step 3: Implement score tracking and win condition','Step 4: Connect Canvas text fields for score and win state'],
    checkpoints: ['Player moves with input','Pickups are collected once','Score increments per pickup','Win state appears at target score'],
    assessment: ['Demonstrate full collection loop','Explain Rigidbody plus trigger workflow'],
    expectedOutput: ['A complete Roll-a-Ball prototype with scoring and completion state']
  },
  22: {
    deepExplanation: [
      '1. Pong introduces 2D collision gameplay, paddle input, and reflection control.',
      '2. You practice arcade loop design: serve, rally, score, reset.',
      '3. Optional AI paddle demonstrates basic tracking behavior.'
    ],
    pitfalls: ['Gravity left enabled on ball','Paddle movement without bounds','No reset flow after score','Inconsistent ball speed after collision'],
    deliverables: ['Playable Pong field','Ball controller with launch and bounce','Player paddle plus optional AI paddle','Score UI with reset behavior'],
    rubric: ['Ball loop is deterministic','Scoring is accurate','Reset flow works each round','Controls feel responsive'],
    guidedLab: ['Step 1: Set up 2D field, paddles, and ball physics','Step 2: Implement paddle controls and optional AI tracking','Step 3: Add boundary scoring triggers and UI','Step 4: Reset ball and continue rally flow'],
    checkpoints: ['Ball bounces correctly','Paddles move predictably','Score updates per goal','Round restarts correctly'],
    assessment: ['Run a full match flow','Explain collision reflection logic'],
    expectedOutput: ['A complete Pong game loop with score and replayable rounds']
  },
  23: {
    deepExplanation: [
      '1. Space Shooter focuses on prefab-driven combat and wave spawning loops.',
      '2. You combine player shooting, enemy movement, and score or life systems.',
      '3. Coroutines enable timed enemy generation for pacing control.'
    ],
    pitfalls: ['No fire-rate limit causing spam','Missing collider tags for hit logic','Enemies not cleaned up off-screen','No game-over guard'],
    deliverables: ['Playable shooter scene','Player shooting with laser prefab','Enemy prefab with downward movement','Spawner with timed wave logic'],
    rubric: ['Combat loop is stable','Enemy spawn pacing is readable','Hit detection is reliable','Game over flow triggers properly'],
    guidedLab: ['Step 1: Build player, laser, and enemy prefabs','Step 2: Implement fire, hit, and score or life handling','Step 3: Add coroutine-based enemy wave spawning','Step 4: Add UI for score, lives, and game-over panel'],
    checkpoints: ['Player can move and shoot','Lasers destroy enemies','Waves spawn over time','Lives and game-over behave correctly'],
    assessment: ['Demonstrate combat loop under sustained waves','Explain prefab instantiation flow'],
    expectedOutput: ['A complete 2D shooter prototype with scoring and fail state']
  },
  24: {
    deepExplanation: [
      '1. Snake teaches grid-step movement and body growth using ordered segments.',
      '2. Input direction rules prevent invalid reverse turns in a single step.',
      '3. Game-state handling controls fail conditions and restart behavior.'
    ],
    pitfalls: ['Allowing immediate reverse direction','Food spawning outside valid area','Body segments not following in order','No wall or self-collision fail state'],
    deliverables: ['Playable snake grid loop','Head plus body growth logic','Food respawn logic','Game-over on wall or self collision'],
    rubric: ['Grid movement is consistent','Growth logic is deterministic','Fail states trigger correctly','Session can restart cleanly'],
    guidedLab: ['Step 1: Implement step-based direction movement','Step 2: Add food collision and growth behavior','Step 3: Add wall and self collision fail checks','Step 4: Add score and restart flow'],
    checkpoints: ['Snake moves on fixed steps','Food increases body length','Collisions trigger fail state','Restart restores baseline state'],
    assessment: ['Show growth and fail loops','Explain segment-following logic'],
    expectedOutput: ['A complete Snake game with growth, scoring, and fail-state control']
  },
  25: {
    deepExplanation: [
      '1. Endless Runner teaches constant forward flow with jump timing challenges.',
      '2. Obstacle spawning and movement define pacing and difficulty rhythm.',
      '3. Distance or time scoring creates progression feedback.'
    ],
    pitfalls: ['Ground detection not stable','Obstacle spawn cadence too random','No cleanup for off-screen obstacles','Game-over not pausing run logic'],
    deliverables: ['Playable endless runner loop','Jump plus grounded state handling','Obstacle spawner with repeat cadence','Game-over and restart UI flow'],
    rubric: ['Run loop is smooth','Jump timing is readable','Obstacle pacing feels fair','Fail and restart are stable'],
    guidedLab: ['Step 1: Implement runner movement and jump input','Step 2: Build obstacle prefab and spawn manager','Step 3: Add collision-based game-over handling','Step 4: Add score based on distance and restart button'],
    checkpoints: ['Player can jump reliably','Obstacles spawn and move correctly','Collisions trigger game over','Restart returns to playable state'],
    assessment: ['Demonstrate complete run and retry cycle','Explain pacing design choices'],
    expectedOutput: ['A complete endless runner prototype with scoring and replay loop']
  }
};