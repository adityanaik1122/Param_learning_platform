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
      "Movement quality defines player trust in your game.", 
      "You will shape movement feel using acceleration, braking, jump timing, and air control.", 
      "Input responsiveness and physical believability must be balanced deliberately.", 
      "This module introduces objective tuning instead of guesswork tuning.", 
      "You will create measurable movement metrics and validate against targets.", 
      "Camera follow and movement should feel connected, not competing.", 
      "You also establish hooks needed for future dash and combat systems.", 
      "Well-tuned movement reduces frustration and improves learning flow." 
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
      "Step 1: Implement horizontal acceleration curve with max speed cap.", 
      "Step 2: Implement jump impulse and grounded checks via raycasts.", 
      "Step 3: Add coyote timer and jump buffer timer.", 
      "Step 4: Tune air control separately from ground control.", 
      "Step 5: Configure camera smoothing and dead-zone behavior." 
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
      "Physics systems must be deterministic enough for fair gameplay.", 
      "You will configure Rigidbody2D and Collider2D interactions with clear layer rules.", 
      "Collision architecture should separate physical blocking from gameplay triggers.", 
      "This module introduces reliable contact handling for pickups, hazards, and enemies.", 
      "You will define layer matrix policy as a project artifact.", 
      "Performance stability requires careful collider shapes and trigger usage.", 
      "Debug visualization is mandatory when verifying collision boundaries.", 
      "This foundation enables combat, AI, and level systems in later phases." 
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
      "Step 1: Define physics layers and set matrix interaction policy.", 
      "Step 2: Assign colliders and Rigidbody2D settings by object role.", 
      "Step 3: Implement OnCollision and OnTrigger handlers with routing methods.", 
      "Step 4: Add debug gizmos for collision and trigger boundaries.", 
      "Step 5: Run manual regression tests for edge contact scenarios." 
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
  } 
};
