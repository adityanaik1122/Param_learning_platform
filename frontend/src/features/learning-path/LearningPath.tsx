import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { compilerClient } from '../../shared/api/axios';
import { useAuth } from '../../shared/hooks/useAuth';
import { useSubscription } from '../../shared/hooks/useSubscription';
import CyberpunkLayout from '../../components/CyberpunkLayout';
import { phase1MLContent } from './Phase1_ML_Content';
import { phase2MathContent } from './Phase2_Math_Content';
import { phase3PythonContent } from './Phase3_Python_Content';
import { phase4ClassicalMLContent } from './Phase4_Classical_ML_Content';
import { phase5DeepLearningContent } from './Phase5_Deep_Learning_Content';
import { phase6NLPContent } from './Phase6_NLP_Content';
import { phase7GenAILLMContent } from './Phase7_GenAI_LLM_Content';
import { phase8ComputerVisionContent } from './Phase8_Computer_Vision_Content';
import { phase9AgenticAIContent } from './Phase9_Agentic_AI_Content';

export default function LearningPath() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading } = useSubscription();
  
  // Current lesson state
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(0);
  
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'explanation' | 'aihelp'>('explanation');
  
  // Panel resize state
  const [leftPanelWidth, setLeftPanelWidth] = useState(45); // percentage
  const [isResizing, setIsResizing] = useState(false);
  
  // AI Chat state
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Progress tracking state
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  
  // Code editor state
  const [code, setCode] = useState('# Write your code here\n\n');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState<string | null>(null);

  // Load completed lessons from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save completed lessons to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(Array.from(completedLessons)));
  }, [completedLessons]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Handle panel resize functions - defined before useEffect
  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const container = document.getElementById('main-content-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain between 20% and 80%
    if (newWidth >= 20 && newWidth <= 80) {
      setLeftPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Handle panel resize - must be before any early returns
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  if (authLoading || subLoading) {
    return <div className="container">Loading...</div>;
  }

  // Allow access for superusers/staff or premium subscribers
  const hasAccess = isAuthenticated && (subscription.active || user?.is_staff || user?.is_superuser);

  if (!hasAccess) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '2px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '16px',
          padding: '3rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>??</div>
          <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Premium Feature</h2>
          <p style={{ color: '#e5e7eb', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Learning Path is available only for premium subscribers.
            Upgrade to Premium to access this feature.
          </p>
          <button 
            className="btn" 
            onClick={() => navigate('/pricing')}
            style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}
          >
            View Plans & Upgrade
          </button>
        </div>
      </div>
    );
  }

  const curriculum = [
    {
      id: 0,
      title: 'Phase 0: Python Fundamentals',
      topics: [
        'Python Basics - Variables & I/O',
        'Control Flow - Conditionals & Loops',
        'Data Structures - Lists, Tuples, Dicts, Sets',
        'Functions & Lambda',
        'Modules & Packages',
        'File Handling',
        'Exception Handling',
        'OOP - Classes & Objects',
        'OOP - Encapsulation & Inheritance',
        'OOP - Polymorphism & Abstraction',
        'Scripting & Automation',
        'Generators & Pipelining',
        'Libraries - NumPy, Pandas, Matplotlib',
        'Multithreading & Multiprocessing',
        'GUI Programming with Tkinter',
        'Advanced Topics - Decorators & Async',
        'Regular Expressions',
        'Type Hints & Annotations',
        'Context Managers & Resource Handling'
      ],
      lessons: [
        {
          title: 'Module 1: Python Basics - The Debut Stage',
          description: `
## ?? Python Basics � The Debut Stage

### Learning Objectives
- Understand what Python is and how to run code
- Use variables to store data
- Work with different data types: numbers, text, true/false
- Perform basic operations
- Get input from the user and display output
- Write comments to explain your code

### What is Python?
Python is a programming language � a way to give instructions to a computer. Think of it like learning a new language (e.g., Korean) to communicate with someone. Python is known for being easy to read and write, which is why it's great for beginners.

### Variables
Variables are like labeled boxes where you can store information. You give the box a name and put something inside.

\`\`\`python
name = "Jin"          # a string (text)
age = 28              # an integer (whole number)
height = 179.2        # a float (decimal number)
is_bts_member = True  # a boolean (True or False)
\`\`\`

### Data Types
- **int**: whole numbers (e.g., 7, -3, 1000)
- **float**: numbers with a decimal (e.g., 3.14, -0.5, 2.0)
- **str**: text, enclosed in quotes � e.g., "Jungkook", 'BTS'
- **bool**: either \`True\` or \`False\`

### Basic Operators
- **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`//\`, \`%\`, \`**\`
- **Comparison**: \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`
- **Logical**: \`and\`, \`or\`, \`not\`

### Input from User
To let the user type something, use \`input()\`. It always returns a string, so if you need a number, you must convert it.

\`\`\`python
name = input("What's your name? ")
age = int(input("How old are you? "))
print("Hello", name, "you are", age, "years old.")
\`\`\`

### Fun Example: BTS Debut Age Checker
Imagine you're a K-pop trainee hoping to debut like BTS. The company has a minimum debut age of 17.
          `,
          code: `# BTS Debut Age Checker
print("=== BTS Debut Age Checker ===")
name = input("What's your stage name? ")
age = int(input("How old are you? "))

if age >= 17:
    print(f"{name}, you're ready to debut! Just like Jungkook! ??")
else:
    years_left = 17 - age
    print(f"{name}, you need {years_left} more year(s) of training. Fighting! ??")

# Practice: Temperature Converter
print("\\n=== Temperature Converter ===")
celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = celsius * 9/5 + 32
print(f"{celsius}�C is {fahrenheit}�F")

# Practice: Simple Calculator
print("\\n=== Simple Calculator ===")
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
print(f"Addition: {num1 + num2}")
print(f"Subtraction: {num1 - num2}")
print(f"Multiplication: {num1 * num2}")
print(f"Division: {num1 / num2 if num2 != 0 else 'Cannot divide by zero'}")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 2: Control Flow - Squid Game Decisions',
          description: `
## ?? Control Flow � Squid Game Decisions

### Learning Objectives
- Make decisions in code using \`if\`, \`elif\`, \`else\`
- Repeat actions with \`for\` and \`while\` loops
- Control loop execution with \`break\`, \`continue\`, \`pass\`
- Understand indentation � it's crucial in Python!

### Indentation
In Python, indentation (spaces or tabs at the beginning of a line) is not just for style � it tells Python which statements belong to a block.

### Conditionals: if, elif, else
- \`if\` checks a condition; if \`True\`, runs its block
- \`elif\` (short for "else if") checks another condition if the previous ones were \`False\`
- \`else\` runs if none of the above conditions were \`True\`

### Loops
**\`for\` loop** � used when you know how many times you want to repeat, or to iterate over a sequence.

**\`while\` loop** � repeats as long as a condition is true. Be careful to avoid infinite loops!

### Loop Control
- \`break\` � exits the loop immediately
- \`continue\` � skips the rest of the current iteration
- \`pass\` � does nothing; used as a placeholder

### Fun Example: Squid Game � Red Light, Green Light
Let's simulate the famous game from Squid Game. Players move forward when "green light" is called, and must stop on "red light".
          `,
          code: `import random

# Squid Game - Red Light, Green Light
print("?? Red Light, Green Light � Squid Game Edition ??")
players = ["Gi-hun", "Sae-byeok", "Ali", "Sang-woo"]
positions = {p: 0 for p in players}
finish_line = 20

rounds = 0
while rounds < 10 and any(pos < finish_line for pos in positions.values()):
    signal = random.choice(["green", "red"])
    print(f"\\nRound {rounds + 1} - Signal: {signal.upper()} LIGHT!")
    
    for player in list(players):
        if player not in players:
            continue
            
        if signal == "green":
            steps = random.randint(1, 5)
            positions[player] += steps
            print(f"  {player} moves {steps} steps ? position {positions[player]}")
        else:  # red light
            if random.random() < 0.3:  # 30% chance of being caught
                print(f"  {player} was caught moving! Eliminated ??")
                players.remove(player)
            else:
                print(f"  {player} stands still.")
    
    rounds += 1

# Determine winners
winners = [p for p in positions.keys() if positions[p] >= finish_line and p in players]
if winners:
    print(f"\\n?? Winners: {', '.join(winners)} ??")
else:
    print("\\n?? No one survived...")

# Practice: Even numbers
print("\\n=== Even Numbers 1-20 ===")
for i in range(1, 21):
    if i % 2 == 0:
        print(i, end=" ")
print()
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 3: Data Structures - Stranger Things Upside Down',
          description: `
## ?? Data Structures � Stranger Things Upside Down

### Learning Objectives
- Store collections of data using lists, tuples, dictionaries, and sets
- Access, modify, and manipulate these structures
- Use comprehensions for concise creation
- Understand when to use each type

### Lists
A list is an ordered, mutable (changeable) collection of items.

**Common operations:**
- Access by index: \`fruits[0]\` ? \`"apple"\`
- Slice: \`fruits[1:3]\`
- Modify: \`fruits[1] = "blueberry"\`
- Add: \`fruits.append("orange")\`
- Remove: \`fruits.remove("apple")\`

### Tuples
Tuples are like lists but **immutable** � you cannot change them after creation.

### Dictionaries
Dictionaries store key-value pairs. Keys must be unique and immutable.

### Sets
A set is an unordered collection of **unique** elements. Useful for removing duplicates.

### Comprehensions
Comprehensions provide a concise way to create lists, dictionaries, or sets.

\`\`\`python
squares = [x**2 for x in range(10)]
\`\`\`

### Fun Example: Stranger Things � Character Inventory
Let's manage the gang's items using different data structures.
          `,
          code: `# Stranger Things - Character Inventory
print("=== Stranger Things Character Inventory ===\\n")

# List � Party members (ordered, can change)
party = ["Eleven", "Mike", "Dustin", "Lucas", "Will"]
print("Party members:", party)

# Append a new member (Max joins)
party.append("Max")
print("After Max joins:", party)

# Tuple � Immutable coordinates of Hawkins Lab
lab_coords = (37.5, -82.3)
print(f"\\nHawkins Lab coordinates: {lab_coords}")

# Dictionary � Powers of characters
powers = {
    "Eleven": "Telekinesis",
    "Mike": "Leadership",
    "Dustin": "Smarts",
    "Lucas": "Slingshot",
    "Will": "Connection to Upside Down"
}
powers["Max"] = "Skateboard skills"
print(f"\\nEleven's power: {powers['Eleven']}")
print("All powers:", powers)

# Set � Unique monsters encountered
monsters = {"Demogorgon", "Mind Flayer", "Demodog"}
print(f"\\nMonsters encountered: {monsters}")
monsters.add("Vecna")
print(f"After Vecna appears: {monsters}")

# List comprehension � Filter long names
long_names = [name for name in party if len(name) > 4]
print(f"\\nNames longer than 4 letters: {long_names}")

# Practice: To-Do List Manager
print("\\n=== Simple To-Do List ===")
tasks = []
tasks.append("Learn Python")
tasks.append("Build a project")
tasks.append("Practice coding")
print("Tasks:")
for i, task in enumerate(tasks, 1):
    print(f"{i}. {task}")

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(1, 6)}
print(f"\\nSquares dictionary: {squares_dict}")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 4: Functions - Cricket Scorecard Builder',
          description: `
## ?? Functions � Cricket Scorecard Builder

### Learning Objectives
- Understand why functions are useful (reusability, organization)
- Define your own functions with \`def\`
- Use parameters and return values
- Understand variable scope
- Work with \`*args\` and \`**kwargs\` for flexible functions
- Create simple lambda functions

### What is a Function?
A function is a reusable block of code that performs a specific task. You've already used built-in functions like \`print()\`, \`input()\`, and \`len()\`.

### Defining a Function
\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Jin")   # Hello, Jin!
\`\`\`

### Parameters and Return Values
\`\`\`python
def add(a, b):
    return a + b

sum = add(5, 3)   # sum becomes 8
\`\`\`

### Default Arguments
\`\`\`python
def greet(name, message="Hello"):
    print(f"{message}, {name}!")
\`\`\`

### *args and **kwargs
- \`*args\` allows any number of positional arguments (as a tuple)
- \`**kwargs\` allows any number of keyword arguments (as a dictionary)

### Lambda Functions
A **lambda** is a small anonymous function defined in one line.

\`\`\`python
square = lambda x: x ** 2
\`\`\`

### Fun Example: Cricket Scorecard
We'll create functions to compute player statistics and check milestones.
          `,
          code: `# Cricket Scorecard - Calculate Strike Rate
print("=== Cricket Scorecard Builder ===\\n")

def calculate_strike_rate(runs, balls):
    """Calculate strike rate (runs per 100 balls)"""
    if balls == 0:
        return 0
    return (runs / balls) * 100

def add_innings(player_stats, **new_data):
    """Update player stats with new innings data"""
    player_stats.update(new_data)
    return player_stats

# Lambda for checking if a score is a half-century
is_fifty = lambda runs: runs >= 50
is_century = lambda runs: runs >= 100

# Main code
virat_stats = {"name": "Virat Kohli", "runs": 82, "balls": 55}
print("Player stats:", virat_stats)

# Compute strike rate
sr = calculate_strike_rate(virat_stats["runs"], virat_stats["balls"])
print(f"Strike Rate: {sr:.2f}")

# Check milestones
if is_century(virat_stats["runs"]):
    print("Century! ??")
elif is_fifty(virat_stats["runs"]):
    print("Half-century! ??")

# Practice: Temperature Converter Function
def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

def fahrenheit_to_celsius(f):
    return (f - 32) * 5/9

print("\\n=== Temperature Converter ===")
temp_c = 25
temp_f = celsius_to_fahrenheit(temp_c)
print(f"{temp_c}�C = {temp_f}�F")

# Practice: Variable arguments
def print_scores(*args):
    """Print any number of scores"""
    print("\\nScores:", end=" ")
    for score in args:
        print(score, end=" ")
    print()

print_scores(95, 87, 92, 78, 88)

# Practice: Keyword arguments
def print_player_info(**kwargs):
    print("\\nPlayer Info:")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print_player_info(name="Rohit Sharma", role="Batsman", runs=15000, average=48.5)
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 5: Modules & Packages - BTS Discography Analyzer',
          description: `
## ?? Modules and Packages � BTS Discography Analyzer

### Learning Objectives
- Understand what modules are and how to import them
- Use Python's standard library modules
- Create your own modules
- Organize code into packages

### What is a Module?
A module is simply a Python file (with a \`.py\` extension) that contains functions, variables, and classes. You can use code from one module in another program using \`import\`.

### Importing Modules
\`\`\`python
import math                 # imports the whole math module
print(math.sqrt(16))        # need to use math. prefix

from math import sqrt       # imports only sqrt function
print(sqrt(16))             # can use directly

import math as m            # gives an alias
print(m.sqrt(16))
\`\`\`

### Python Standard Library
Python comes with a rich set of built-in modules:
- \`math\`: mathematical functions
- \`random\`: generate random numbers
- \`datetime\`: work with dates and times
- \`os\`: interact with operating system
- \`json\`: work with JSON data
- \`statistics\`: statistical functions

### Fun Example: BTS Song Length Analyzer
We'll use \`random\` to generate song lengths, \`datetime\` to format them, and \`statistics\` to compute averages.
          `,
          code: `import random
from datetime import timedelta
import statistics
import math

# BTS Song Length Analyzer
print("=== BTS Song Length Analyzer ===\\n")

bts_songs = ["Dynamite", "Butter", "Permission to Dance", "Boy With Luv", "Spring Day"]

# Generate random lengths (in seconds) for each song
song_lengths = {song: random.randint(180, 260) for song in bts_songs}

print("?? BTS Song Lengths:")
for song, length in song_lengths.items():
    print(f"  {song}: {length}s ({timedelta(seconds=length)})")

# Compute statistics
avg_length = statistics.mean(song_lengths.values())
median_length = statistics.median(song_lengths.values())
std_dev = statistics.stdev(song_lengths.values())

print(f"\\nStatistics:")
print(f"  Average: {avg_length:.1f}s")
print(f"  Median: {median_length:.1f}s")
print(f"  Std Dev: {std_dev:.1f}s")

# Find longest and shortest
longest = max(song_lengths, key=song_lengths.get)
shortest = min(song_lengths, key=song_lengths.get)
print(f"\\n  Longest: {longest} ({song_lengths[longest]}s)")
print(f"  Shortest: {shortest} ({song_lengths[shortest]}s)")

# Practice: Math module
print("\\n=== Math Module Examples ===")
print(f"Square root of 16: {math.sqrt(16)}")
print(f"Pi: {math.pi:.4f}")
print(f"Ceiling of 4.3: {math.ceil(4.3)}")
print(f"Floor of 4.7: {math.floor(4.7)}")
print(f"2 to the power of 8: {math.pow(2, 8)}")

# Practice: Random module
print("\\n=== Random Module Examples ===")
print(f"Random integer (1-10): {random.randint(1, 10)}")
print(f"Random float (0-1): {random.random():.4f}")
print(f"Random choice: {random.choice(bts_songs)}")

# Shuffle a list
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(f"Shuffled list: {numbers}")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 6: File Handling - Netflix Watchlist',
          description: `
## ?? File Handling � Netflix Watchlist

### Learning Objectives
- Open and close files
- Read from and write to text files
- Use context managers (\`with\` statement) for safe file handling
- Work with CSV and JSON files

### File Opening Modes
- \`'r'\` - Read (default)
- \`'w'\` - Write (overwrites)
- \`'a'\` - Append
- \`'r+'\` - Read and Write

### Reading from a File
\`\`\`python
with open("file.txt", "r") as f:
    content = f.read()           # entire file as string
    lines = f.readlines()        # list of all lines
\`\`\`

### Writing to a File
\`\`\`python
with open("file.txt", "w") as f:
    f.write("Hello, world!\\n")
\`\`\`

### Working with JSON
JSON (JavaScript Object Notation) is a lightweight data format. Python's \`json\` module can convert between JSON and Python dictionaries/lists.

\`\`\`python
import json
data = {"name": "Jin", "age": 28}
with open("data.json", "w") as f:
    json.dump(data, f, indent=4)
\`\`\`

### Fun Example: Netflix Watchlist
Create a watchlist of shows and save it to a JSON file. Then load and display it.
          `,
          code: `import json
import datetime

# Netflix Watchlist - Save & Load
print("=== Netflix Watchlist Manager ===\\n")

# Initial watchlist
watchlist = [
    {"title": "Stranger Things", "genre": "Sci-Fi", "rating": 8.7},
    {"title": "Squid Game", "genre": "Thriller", "rating": 8.0},
    {"title": "The Witcher", "genre": "Fantasy", "rating": 8.2}
]

# Save to JSON file
with open("netflix_watchlist.json", "w") as f:
    json.dump(watchlist, f, indent=4)
print("? Watchlist saved to netflix_watchlist.json")

# Load and display
with open("netflix_watchlist.json", "r") as f:
    loaded = json.load(f)

print("\\n?? Your Netflix Watchlist:")
for show in loaded:
    print(f"  {show['title']} ({show['genre']}) � Rating: {show['rating']}")

# Practice: Student Records
print("\\n=== Student Records ===")
students = [
    "John Doe, 20, A",
    "Jane Smith, 22, B",
    "Bob Johnson, 21, A"
]

# Writing data
with open('students.txt', 'w') as f:
    for student in students:
        f.write(student + '\\n')
print("? Student data written to students.txt")

# Reading data
print("\\n?? Reading file contents:")
with open('students.txt', 'r') as f:
    for i, line in enumerate(f, 1):
        print(f"  {i}. {line.strip()}")

# Practice: Log System
def write_log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open('system.log', 'a') as f:
        f.write(f"[{timestamp}] {message}\\n")

print("\\n=== Log System ===")
write_log("System started")
write_log("User logged in")
write_log("Data processed successfully")
print("? Log entries created in system.log")

# File Statistics
with open('students.txt', 'r') as f:
    lines = f.readlines()
    words = sum(len(line.split()) for line in lines)
    chars = sum(len(line) for line in lines)

print(f"\\n?? File Statistics:")
print(f"  Lines: {len(lines)}")
print(f"  Words: {words}")
print(f"  Characters: {chars}")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 7: Exception Handling - K-Pop Fan Account Safety',
          description: `
## ?? Exception Handling � K-Pop Fan Account Safety

### Learning Objectives
- Understand what exceptions are and why they occur
- Handle errors gracefully using \`try\`, \`except\`, \`else\`, \`finally\`
- Raise exceptions intentionally
- Create custom exception classes

### What are Exceptions?
Exceptions are errors that occur during program execution. Without handling, an exception crashes the program. With exception handling, you can catch the error and respond appropriately.

### Basic Try-Except
\`\`\`python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ZeroDivisionError:
    print("You can't divide by zero!")
except ValueError:
    print("That's not a valid number!")
\`\`\`

### Else and Finally
- \`else\` runs if no exception occurred in the \`try\` block
- \`finally\` runs **always** � whether an exception happened or not

### Raising Exceptions
You can intentionally raise an exception using \`raise\`.

\`\`\`python
def withdraw(amount, balance):
    if amount > balance:
        raise ValueError("Insufficient funds")
    return balance - amount
\`\`\`

### Custom Exceptions
You can define your own exception classes by inheriting from \`Exception\`.

### Fun Example: K-Pop Fan Account � Safe Ticket Purchase
Simulate buying concert tickets with various error conditions.
          `,
          code: `# K-Pop Fan Account - Safe Ticket Purchase
print("=== K-Pop Concert Ticket System ===\\n")

class SoldOutError(Exception):
    """Raised when tickets are sold out"""
    pass

tickets_available = 3
user_balance = 100

def buy_ticket(price):
    global tickets_available, user_balance
    try:
        if tickets_available <= 0:
            raise SoldOutError("Tickets are sold out! ??")
        if user_balance < price:
            raise ValueError("Insufficient balance! Need more allowance.")
        
        # Process purchase
        tickets_available -= 1
        user_balance -= price
        print(f"? Purchase successful! {tickets_available} tickets left.")
    
    except SoldOutError as e:
        print(f"? {e}")
    except ValueError as e:
        print(f"? {e}")
    except Exception as e:
        print(f"? Unexpected error: {e}")
    else:
        print("?? Enjoy the concert!")
    finally:
        print(f"?? Current balance: $" + "{user_balance}\\n")

# Attempt purchases
print("Attempt 1:")
buy_ticket(30)

print("Attempt 2:")
buy_ticket(30)

print("Attempt 3:")
buy_ticket(30)

print("Attempt 4 (should fail - sold out):")
buy_ticket(30)

# Practice: Division Calculator
print("=== Safe Division Calculator ===")
try:
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    result = num1 / num2
    print(f"Result: {result}")
except ValueError:
    print("? Error: Please enter valid numbers")
except ZeroDivisionError:
    print("? Error: Cannot divide by zero")
except Exception as e:
    print(f"? Unexpected error: {e}")
else:
    print("? Calculation successful")
finally:
    print("Thank you for using the calculator")
`
        },
        {
          title: 'Module 8: OOP - Classes & Objects',
          description: `
## ?? Object Oriented Programming - Classes & Objects

### Learning Objectives
- Understand what OOP is and why it's useful
- Create classes and objects
- Use constructors and instance variables
- Define and call methods
- Understand the difference between class and instance variables

### What is OOP?
Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects" that contain data (attributes) and code (methods).

### Class
A blueprint for creating objects. Think of it like a cookie cutter.

\`\`\`python
class ClassName:
    def __init__(self, params):
        self.attribute = params
\`\`\`

### Object
An instance of a class. Like a cookie made from the cookie cutter.

### Constructor (__init__)
Special method called automatically when an object is created.

### Instance Variables
Variables that belong to a specific object (use \`self.\`)

### Methods
Functions defined inside a class that operate on objects.

### Fun Example: Student Management System
Let's create a system to manage student records.
          `,
          code: `# Basic Class Definition
class Student:
    # Constructor
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade
    
    # Method to display info
    def display_info(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Grade: {self.grade}")
    
    # Method to update grade
    def update_grade(self, new_grade):
        self.grade = new_grade
        print(f"? Grade updated to {new_grade}")
    
    # Method to check pass/fail
    def is_passing(self):
        passing_grades = ['A', 'B', 'C']
        return self.grade in passing_grades

# Creating objects
print("=== Student Management System ===\\n")

student1 = Student("Alice Johnson", 20, "A")
student2 = Student("Bob Smith", 22, "B")
student3 = Student("Charlie Brown", 21, "C")

# Display student info
print("Student 1:")
student1.display_info()
print(f"Passing: {student1.is_passing()}\\n")

print("Student 2:")
student2.display_info()
print(f"Passing: {student2.is_passing()}\\n")

# Update grade
print("Updating Student 3 grade:")
student3.update_grade("A+")
student3.display_info()

# Class with class variable
class School:
    school_name = "Python Academy"  # Class variable (shared by all instances)
    
    def __init__(self, student_count):
        self.student_count = student_count  # Instance variable
    
    def display_school_info(self):
        print(f"\\nSchool: {School.school_name}")
        print(f"Total Students: {self.student_count}")

school = School(150)
school.display_school_info()

# Practice: Create a Book class
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
        self.current_page = 0
    
    def read(self, pages):
        self.current_page += pages
        if self.current_page > self.pages:
            self.current_page = self.pages
        print(f"Read {pages} pages. Currently on page {self.current_page}")
    
    def progress(self):
        percentage = (self.current_page / self.pages) * 100
        return f"{percentage:.1f}% complete"

print("\\n=== Book Reading Tracker ===")
book = Book("Python Programming", "John Doe", 300)
book.read(50)
print(book.progress())
book.read(100)
print(book.progress())
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 9: OOP - Encapsulation & Inheritance',
          description: `
## ?? OOP - Encapsulation & Inheritance

### Learning Objectives
- Understand encapsulation and data hiding
- Use private variables and methods
- Implement getter and setter methods
- Create inheritance hierarchies
- Override methods in child classes

### Encapsulation
Bundling data and methods together, and restricting direct access to some components.

**Private Variables:** Prefix with \`__\` (double underscore)
\`\`\`python
self.__private_var = value
\`\`\`

**Getter/Setter Methods:** Control access to private variables

### Inheritance
Creating new classes from existing ones. The child class inherits attributes and methods from the parent.

**Types:**
- Single Inheritance: Child inherits from one parent
- Multiple Inheritance: Child inherits from multiple parents
- Multilevel Inheritance: Chain of inheritance

**Method Overriding:** Child class redefines parent method

### Fun Example: Banking System
Let's create a banking system with proper encapsulation and inheritance.
          `,
          code: `# Encapsulation Example
class BankAccount:
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.__balance = balance  # Private variable
    
    # Getter method
    def get_balance(self):
        return self.__balance
    
    # Setter method with validation
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"? Deposited: ?{amount}")
        else:
            print("? Invalid amount")
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print(f"? Withdrawn: ?{amount}")
        else:
            print("? Insufficient balance or invalid amount")

# Using encapsulation
print("=== Encapsulation Demo ===")
account = BankAccount("ACC001", 10000)
print(f"Balance: ?{account.get_balance()}")
account.deposit(5000)
account.withdraw(3000)
print(f"Final Balance: ?{account.get_balance()}\\n")

# Inheritance Example
class Account:
    def __init__(self, account_number, holder_name):
        self.account_number = account_number
        self.holder_name = holder_name
    
    def display_info(self):
        print(f"Account: {self.account_number}")
        print(f"Holder: {self.holder_name}")

# Single Inheritance
class SavingsAccount(Account):
    def __init__(self, account_number, holder_name, interest_rate):
        super().__init__(account_number, holder_name)
        self.interest_rate = interest_rate
    
    # Method Overriding
    def display_info(self):
        super().display_info()
        print(f"Interest Rate: {self.interest_rate}%")
    
    def calculate_interest(self, balance):
        return balance * (self.interest_rate / 100)

print("=== Inheritance Demo ===")
savings = SavingsAccount("SAV001", "John Doe", 4.5)
savings.display_info()
print(f"Interest on ?10000: ?{savings.calculate_interest(10000)}\\n")

# Multiple Inheritance
class Person:
    def __init__(self, name):
        self.name = name

class Employee:
    def __init__(self, emp_id):
        self.emp_id = emp_id

class Manager(Person, Employee):
    def __init__(self, name, emp_id, department):
        Person.__init__(self, name)
        Employee.__init__(self, emp_id)
        self.department = department

print("=== Multiple Inheritance ===")
manager = Manager("Alice", "E001", "IT")
print(f"Name: {manager.name}")
print(f"ID: {manager.emp_id}")
print(f"Department: {manager.department}")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 10: OOP - Polymorphism & Abstraction',
          description: `
## ?? OOP - Polymorphism & Abstraction

### Learning Objectives
- Understand polymorphism and its benefits
- Use method overloading and overriding
- Implement operator overloading
- Create abstract classes and methods
- Design using abstraction principles

### Polymorphism
"Many forms" - same interface, different implementations. Allows objects of different classes to be treated uniformly.

**Method Overriding:** Child class provides different implementation

**Operator Overloading:** Define behavior for operators (+, -, *, etc.)
\`\`\`python
def __add__(self, other):
    return result
\`\`\`

### Abstraction
Hiding complex implementation details, showing only essential features.

**Abstract Class:** Cannot be instantiated, used as blueprint
\`\`\`python
from abc import ABC, abstractmethod
\`\`\`

**Abstract Method:** Must be implemented by child classes

### Fun Example: Shape Hierarchy
Let's create a shape system demonstrating polymorphism and abstraction.
          `,
          code: `from abc import ABC, abstractmethod
import math

# Abstraction Example
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass
    
    def display(self):
        print(f"Area: {self.area():.2f}")
        print(f"Perimeter: {self.perimeter():.2f}")

# Concrete Classes
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width
    
    def area(self):
        return self.length * self.width
    
    def perimeter(self):
        return 2 * (self.length + self.width)

# Polymorphism Demo
print("=== Polymorphism & Abstraction ===\\n")

shapes = [
    Circle(5),
    Rectangle(4, 6),
    Circle(3)
]

for i, shape in enumerate(shapes, 1):
    print(f"Shape {i}: {shape.__class__.__name__}")
    shape.display()
    print()

# Operator Overloading
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

print("=== Operator Overloading ===")
v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(f"v1: {v1}")
print(f"v2: {v2}")
print(f"v1 + v2: {v1 + v2}")
print(f"v1 - v2: {v1 - v2}")
print(f"v1 * 3: {v1 * 3}")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 11: Scripting & Automation - File Organizer',
          description: `
## ?? Scripting and Automation � Stranger Things File Organizer

### Learning Objectives
- Write scripts that interact with the operating system
- Use command-line arguments with \`sys.argv\` and \`argparse\`
- Use \`os\` and \`shutil\` modules to manipulate files and directories
- Automate repetitive tasks

### OS Module
The \`os\` module provides functions to interact with the operating system:
- \`os.getcwd()\` � current working directory
- \`os.listdir(path)\` � list files and directories
- \`os.mkdir(path)\` � create directory
- \`os.path.join()\` � intelligently join paths
- \`os.path.exists()\` � check if path exists

### Shutil Module
\`shutil\` offers higher-level file operations:
- \`shutil.copy(src, dst)\` � copy file
- \`shutil.move(src, dst)\` � move file
- \`shutil.rmtree(path)\` � delete entire directory tree

### Fun Example: Stranger Things File Organizer
We'll create a script that organizes files in a given folder into subfolders based on their extensions.
          `,
          code: `import os
import shutil

# Stranger Things File Organizer
print("=== File Organizer (Like Eleven tidying up the lab) ===\\n")

def organize_folder(path):
    # Define categories and their extensions
    categories = {
        "Images": [".jpg", ".jpeg", ".png", ".gif"],
        "Documents": [".pdf", ".docx", ".txt", ".xlsx"],
        "Videos": [".mp4", ".mov", ".avi"],
        "Music": [".mp3", ".wav"],
        "Code": [".py", ".js", ".html", ".css"]
    }
    
    # Check if path exists
    if not os.path.exists(path):
        print(f"Path {path} does not exist.")
        return
    
    organized_count = 0
    for file in os.listdir(path):
        file_path = os.path.join(path, file)
        if os.path.isfile(file_path):
            ext = os.path.splitext(file)[1].lower()
            moved = False
            for category, exts in categories.items():
                if ext in exts:
                    dest_folder = os.path.join(path, category)
                    os.makedirs(dest_folder, exist_ok=True)
                    shutil.move(file_path, os.path.join(dest_folder, file))
                    print(f"? Moved {file} to {category}")
                    organized_count += 1
                    moved = True
                    break
            if not moved and ext:
                others = os.path.join(path, "Others")
                os.makedirs(others, exist_ok=True)
                shutil.move(file_path, os.path.join(others, file))
                print(f"?? Moved {file} to Others")
                organized_count += 1
    
    print(f"\\n? Organization complete! {organized_count} files organized.")

# Demo: Create sample files and organize
demo_path = "demo_folder"
os.makedirs(demo_path, exist_ok=True)

# Create sample files
sample_files = ["photo.jpg", "document.pdf", "song.mp3", "video.mp4", "script.py"]
for file in sample_files:
    open(os.path.join(demo_path, file), 'w').close()

print(f"Created {len(sample_files)} sample files in {demo_path}")
print("\\nOrganizing files...")
organize_folder(demo_path)

# Practice: OS module examples
print("\\n=== OS Module Examples ===")
print(f"Current directory: {os.getcwd()}")
print(f"Files in current directory: {len(os.listdir('.'))} items")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 12: Generators & Pipelining - Cricket Data Pipeline',
          description: `
## ?? Pipelining and Data Processing � Cricket Data Pipeline

### Learning Objectives
- Understand generators and their memory efficiency
- Create iterators
- Use \`itertools\` for advanced looping
- Build data processing pipelines using generators

### Generators
A generator is a function that produces a sequence of results lazily, meaning it yields one value at a time instead of computing all at once.

\`\`\`python
def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1
\`\`\`

### Generator Expressions
Similar to list comprehensions but with parentheses:
\`\`\`python
squares = (x**2 for x in range(10))
\`\`\`

### Itertools
The \`itertools\` module provides tools for working with iterators:
- \`itertools.count(start, step)\`: infinite counter
- \`itertools.cycle(iterable)\`: cycles through an iterable infinitely
- \`itertools.islice(iterable, stop)\`: slices an iterator
- \`itertools.chain(*iterables)\`: chains multiple iterables

### Fun Example: Cricket Score Pipeline
We'll simulate a stream of ball-by-ball data and process it using generators.
          `,
          code: `import random
import itertools

# Cricket Score Pipeline
print("=== Cricket Score Pipeline ===\\n")

def ball_generator():
    """Simulate an infinite sequence of ball outcomes (runs scored)"""
    runs = [0, 1, 2, 3, 4, 6]
    while True:
        yield random.choice(runs)

def accumulate_runs(ball_stream):
    """Generator that yields cumulative runs"""
    total = 0
    for runs in ball_stream:
        total += runs
        yield (runs, total)

def milestone_detector(acc_stream, milestones=[50, 100, 150]):
    """Yield milestone messages when reached"""
    milestone_idx = 0
    for runs, total in acc_stream:
        yield (runs, total)
        if milestone_idx < len(milestones) and total >= milestones[milestone_idx]:
            print(f"?? Milestone: {milestones[milestone_idx]} runs reached!")
            milestone_idx += 1

# Simulate first 30 balls
balls = ball_generator()
limited_balls = itertools.islice(balls, 30)
acc = accumulate_runs(limited_balls)
pipeline = milestone_detector(acc)

print("Ball-by-ball commentary:")
for ball_num, (runs, total) in enumerate(pipeline, 1):
    print(f"Ball {ball_num}: {runs} runs ? Total: {total}")

# Practice: Generator for Fibonacci
print("\\n=== Fibonacci Generator ===")
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print("First 10 Fibonacci numbers:")
print([next(fib) for _ in range(10)])

# Practice: Memory efficiency demo
print("\\n=== Memory Efficiency ===")
import sys

regular_list = [i**2 for i in range(1000)]
generator = (i**2 for i in range(1000))

print(f"List size: {sys.getsizeof(regular_list):,} bytes")
print(f"Generator size: {sys.getsizeof(generator):,} bytes")
print(f"Memory saved: {(sys.getsizeof(regular_list) - sys.getsizeof(generator)) / 1024:.2f} KB")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 13: Libraries - Data Science with BLACKPINK',
          description: `
## ?? Libraries and Frameworks � Data Science with BLACKPINK

### Learning Objectives
- Introduction to popular Python libraries: NumPy, Pandas, Matplotlib
- Perform basic data manipulation and analysis
- Create simple visualizations

### NumPy
NumPy provides support for large, multi-dimensional arrays and matrices.

\`\`\`python
import numpy as np
arr = np.array([1, 2, 3, 4])
print(arr * 2)  # [2 4 6 8]
\`\`\`

### Pandas
Pandas provides data structures like DataFrame for easy data manipulation.

\`\`\`python
import pandas as pd
df = pd.DataFrame({'Name': ['Jisoo', 'Jennie'], 'Age': [25, 26]})
\`\`\`

### Matplotlib
Matplotlib is a plotting library for creating visualizations.

\`\`\`python
import matplotlib.pyplot as plt
plt.plot([1,2,3], [10,20,25])
plt.show()
\`\`\`

### Fun Example: BLACKPINK Songs � Data Analysis
We'll create a dataset of BLACKPINK songs and use Pandas to analyze and Matplotlib to plot.
          `,
          code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# BLACKPINK Songs - Data Analysis
print("=== BLACKPINK Discography Data Analysis ===\\n")

# Sample data
data = {
    "Song": ["DDU-DU DDU-DU", "Kill This Love", "How You Like That", "Lovesick Girls", "Pink Venom"],
    "Release Year": [2018, 2019, 2020, 2020, 2022],
    "YouTube Views (M)": [1800, 1600, 1100, 900, 800],
    "Spotify Streams (M)": [500, 450, 400, 350, 300]
}

df = pd.DataFrame(data)
print("BLACKPINK Discography Data:")
print(df)

# Basic statistics
print("\\nSummary statistics for YouTube Views:")
print(df["YouTube Views (M)"].describe())

# NumPy operations
views_array = np.array(df["YouTube Views (M)"])
print(f"\\nNumPy Analysis:")
print(f"Mean views: {np.mean(views_array):.0f}M")
print(f"Median views: {np.median(views_array):.0f}M")
print(f"Std deviation: {np.std(views_array):.0f}M")

# Plot YouTube views
plt.figure(figsize=(10, 6))
plt.bar(df["Song"], df["YouTube Views (M)"], color='hotpink', edgecolor='white', linewidth=2)
plt.title('BLACKPINK YouTube Views', fontsize=14, fontweight='bold')
plt.ylabel('Views (Millions)')
plt.xticks(rotation=45, ha='right')
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.show()

# Practice: NumPy array operations
print("\\n=== NumPy Array Operations ===")
arr = np.array([1, 2, 3, 4, 5])
print(f"Array: {arr}")
print(f"Squared: {arr ** 2}")
print(f"Sum: {np.sum(arr)}")
print(f"Mean: {np.mean(arr)}")

# Practice: Pandas DataFrame operations
print("\\n=== Pandas DataFrame Operations ===")
students = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Math': [85, 90, 78],
    'Science': [92, 88, 81]
})
print(students)
print(f"\\nAverage Math score: {students['Math'].mean():.1f}")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 14: Multithreading - Squid Game Parallel Challenges',
          description: `
## ?? Multithreading and Multiprocessing � Squid Game Parallel Challenges

### Learning Objectives
- Understand the difference between concurrency and parallelism
- Use the \`threading\` module for I/O-bound tasks
- Use \`concurrent.futures\` for a high-level interface
- Learn about synchronization with locks

### Concurrency vs. Parallelism
- **Concurrency**: Multiple tasks making progress seemingly at the same time
- **Parallelism**: Actually running multiple tasks simultaneously on multiple CPU cores

### Threading
\`\`\`python
import threading

def task(name):
    print(f"Task {name} starting")

t1 = threading.Thread(target=task, args=("A",))
t1.start()
t1.join()
\`\`\`

### Synchronization
When multiple threads access shared data, you need locks to prevent race conditions.

\`\`\`python
lock = threading.Lock()
with lock:
    counter += 1
\`\`\`

### Fun Example: Squid Game � Multiple Players Tug of War
We'll simulate a tug of war where multiple players (threads) pull on a rope.
          `,
          code: `import threading
import time
import random

# Squid Game - Tug of War
print("=== Squid Game � Tug of War ===\\n")

rope_position = 0
lock = threading.Lock()

def player(name, team):
    global rope_position
    for round_num in range(5):
        time.sleep(random.uniform(0.1, 0.3))
        pull = 1 if team == "right" else -1
        with lock:
            rope_position += pull
            print(f"{name} ({team}) pulls ? rope at {rope_position}")

# Create threads for teams
threads = []
for i in range(3):
    t = threading.Thread(target=player, args=(f"Player-{i}-Left", "left"))
    threads.append(t)
for i in range(3):
    t = threading.Thread(target=player, args=(f"Player-{i}-Right", "right"))
    threads.append(t)

# Start all threads
for t in threads:
    t.start()

# Wait for all to finish
for t in threads:
    t.join()

print(f"\\nFinal rope position: {rope_position}")
if rope_position > 0:
    print("?? Team Right wins!")
elif rope_position < 0:
    print("?? Team Left wins!")
else:
    print("?? It's a tie!")

# Practice: Download simulation with threading
print("\\n=== Concurrent Downloads ===")

def download_file(file_id):
    print(f"Downloading file {file_id}...")
    time.sleep(1)  # simulate download
    print(f"? File {file_id} downloaded")

download_threads = []
for i in range(5):
    t = threading.Thread(target=download_file, args=(i,))
    t.start()
    download_threads.append(t)

for t in download_threads:
    t.join()

print("\\nAll downloads complete!")

# Practice: Counter with lock
print("\\n=== Thread-Safe Counter ===")
counter = 0
counter_lock = threading.Lock()

def increment():
    global counter
    for _ in range(1000):
        with counter_lock:
            counter += 1

inc_threads = [threading.Thread(target=increment) for _ in range(10)]
for t in inc_threads:
    t.start()
for t in inc_threads:
    t.join()

print(f"Final counter value: {counter} (should be 10000)")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 15: GUI Programming - Football Penalty Shootout',
          description: `
## ?? Graphics Programming � Football Penalty Shootout Game

### Learning Objectives
- Introduction to GUI programming with Tkinter
- Create windows, buttons, labels
- Handle events (button clicks)

### Tkinter Basics
Tkinter is Python's standard GUI library.

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.title("My App")
label = tk.Label(root, text="Hello!")
label.pack()
root.mainloop()
\`\`\`

### Widgets
Common widgets:
- \`Label\`: displays text or image
- \`Button\`: clickable button
- \`Entry\`: single-line text input

### Layout Managers
- \`pack()\`: packs widgets in order
- \`grid()\`: arranges widgets in a grid
- \`place()\`: places widgets at absolute positions

### Fun Example: Football Penalty Shootout Game
We'll create a simple penalty shootout game where the user clicks left, right, or center to shoot.
          `,
          code: `import tkinter as tk
import random

# Football Penalty Shootout Game
print("=== Creating Penalty Shootout GUI ===")
print("A window will open - choose your shot direction!")

def shoot(direction):
    goalie_dive = random.choice(["left", "right", "center"])
    if direction == goalie_dive:
        result_label.config(text="SAVED! ?? Goalie guessed right!", fg="red")
    else:
        result_label.config(text="GOAL! ??? You scored!", fg="green")
    
    # Disable buttons after shot
    left_btn.config(state=tk.DISABLED)
    right_btn.config(state=tk.DISABLED)
    center_btn.config(state=tk.DISABLED)

def reset():
    left_btn.config(state=tk.NORMAL)
    right_btn.config(state=tk.NORMAL)
    center_btn.config(state=tk.NORMAL)
    result_label.config(text="", fg="white")

# Create main window
root = tk.Tk()
root.title("Penalty Shootout")
root.geometry("400x250")
root.configure(bg='#1a1a2e')

# Instructions
instruction = tk.Label(root, text="Choose your shot direction:", 
                      font=("Arial", 14), bg='#1a1a2e', fg='white')
instruction.pack(pady=20)

# Button frame
btn_frame = tk.Frame(root, bg='#1a1a2e')
btn_frame.pack(pady=10)

# Buttons for directions
left_btn = tk.Button(btn_frame, text="?? Left", command=lambda: shoot("left"),
                    font=("Arial", 12), bg='#16213e', fg='white', width=10)
left_btn.pack(side=tk.LEFT, padx=5)

center_btn = tk.Button(btn_frame, text="?? Center", command=lambda: shoot("center"),
                      font=("Arial", 12), bg='#16213e', fg='white', width=10)
center_btn.pack(side=tk.LEFT, padx=5)

right_btn = tk.Button(btn_frame, text="?? Right", command=lambda: shoot("right"),
                     font=("Arial", 12), bg='#16213e', fg='white', width=10)
right_btn.pack(side=tk.LEFT, padx=5)

# Result label
result_label = tk.Label(root, text="", font=("Arial", 14, "bold"), 
                       bg='#1a1a2e', fg='white')
result_label.pack(pady=20)

# Reset button
reset_btn = tk.Button(root, text="Take another shot", command=reset,
                     font=("Arial", 11), bg='#0f3460', fg='white')
reset_btn.pack(pady=10)

print("\\n? GUI window opened!")
print("Close the window to continue...")

root.mainloop()
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 16: Advanced Topics - Decorators & Async',
          description: `
## ?? Advanced Topics � Decorators, Context Managers, Async

### Learning Objectives
- Understand and create decorators
- Use context managers with \`with\` statement
- Write asynchronous code with \`asyncio\`

### Decorators
A decorator is a function that takes another function and extends its behavior.

\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Before")
        func()
        print("After")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")
\`\`\`

### Context Managers
Context managers allow you to allocate and release resources precisely using the \`with\` statement.

\`\`\`python
with open('file.txt', 'w') as f:
    f.write('Hello')
\`\`\`

### Asynchronous Programming with asyncio
\`asyncio\` is a library to write concurrent code using the \`async\`/\`await\` syntax.

\`\`\`python
async def fetch_data():
    await asyncio.sleep(1)
    return "Data"
\`\`\`

### Fun Example: Taylor Swift Song Timer with Async
Use asyncio to simulate downloading multiple song lyrics concurrently.
          `,
          code: `import time
import asyncio
import random
from contextlib import contextmanager

# Decorator Example - Timer
print("=== Decorator Example: Timer ===\\n")

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"??  {func.__name__} took {end-start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    print("Function completed")
    return "Done"

result = slow_function()

# Context Manager Example
print("\\n=== Context Manager Example ===")

@contextmanager
def timer_context(name):
    start = time.time()
    print(f"Starting {name}...")
    yield
    end = time.time()
    print(f"??  {name} took {end-start:.4f} seconds")

with timer_context("Data Processing"):
    time.sleep(0.5)
    print("Processing data...")

# Async Example - Taylor Swift Song Downloads
print("\\n=== Async Example: Song Downloads ===")

async def download_lyrics(song):
    print(f"?? Downloading {song}...")
    await asyncio.sleep(random.uniform(0.5, 1.5))
    print(f"? {song} downloaded!")
    return f"Lyrics of {song}"

async def main():
    songs = ["Anti-Hero", "Shake It Off", "Blank Space", "Love Story"]
    tasks = [download_lyrics(song) for song in songs]
    results = await asyncio.gather(*tasks)
    print("\\n?? All downloads complete!")
    return results

# Run the async event loop
try:
    results = asyncio.run(main())
    print(f"Downloaded {len(results)} songs")
except RuntimeError:
    # Handle case where event loop is already running
    print("Async downloads simulated (event loop already running)")

# Practice: Decorator with arguments
print("\\n=== Decorator with Arguments ===")

def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Python")

print("\\n?? You've mastered decorators and async!")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 17: Regular Expressions',
          description: `
## ?? Regular Expressions (Regex)

### Learning Objectives
- Understand what regular expressions are and when to use them
- Learn common regex patterns for matching text
- Use Python's \`re\` module to search, match, and replace text
- Apply regex to real-world tasks like email and phone validation

### What are Regular Expressions?
Regex is a powerful mini-language for pattern matching in text. Instead of searching for an exact word, you describe a **pattern** the text should match.

### Common Patterns
- \`.\` � any character
- \`\\d\` � any digit (0-9)
- \`\\w\` � any word character (letters, digits, _)
- \`\\s\` � any whitespace
- \`*\` � zero or more times
- \`+\` � one or more times
- \`?\` � zero or one time
- \`[abc]\` � character class (a, b, or c)
- \`^\` � start of string
- \`\$\` � end of string
- \`()\` � capture group

### Python's re Module
- \`re.search()\` � find first match
- \`re.findall()\` � find all matches
- \`re.sub()\` � search and replace
- \`re.match()\` � match at start of string
- \`re.compile()\` � compile pattern for reuse

### Key Takeaway
Regex is an essential tool for text processing, data cleaning, and validation. It's used in web scraping, log parsing, and data preprocessing for ML.
          `,
          code: `import re

print("=== Regular Expressions in Python ===\\n")

# Basic matching
text = "Call me at 555-123-4567 or 555-987-6543"
phones = re.findall(r'\\d{3}-\\d{3}-\\d{4}', text)
print(f"Phone numbers found: {phones}")

# Email validation
emails = ["user@example.com", "bad@", "test.name@domain.co.uk", "no spaces@here.com"]
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
for email in emails:
    valid = bool(re.match(pattern, email))
    print(f"  {email:30s} -> {'Valid' if valid else 'Invalid'}")

# Search and replace
print("\\n--- Search & Replace ---")
messy = "The  price   is    100   dollars"
cleaned = re.sub(r'\\s+', ' ', messy)
print(f"Before: '{messy}'")
print(f"After:  '{cleaned}'")

# Capture groups
print("\\n--- Capture Groups ---")
log = "2024-01-15 ERROR: Connection timeout"
match = re.search(r'(\\d{4}-\\d{2}-\\d{2}) (\\w+): (.+)', log)
if match:
    print(f"Date: {match.group(1)}")
    print(f"Level: {match.group(2)}")
    print(f"Message: {match.group(3)}")

# Extract data from messy text
print("\\n--- Real-world: Extract prices ---")
product_text = "iPhone costs $999, AirPods cost $249.99, and the case is $49"
prices = re.findall(r'\\$(\\d+\\.?\\d*)', product_text)
print(f"Prices: {prices}")
print(f"Total: \${sum(float(p) for p in prices):.2f}")

print("\\n✅ Regex mastered! Essential for data cleaning in ML.")
`
        },
        {
          title: 'Module 18: Type Hints & Annotations',
          description: `
## ??? Type Hints & Annotations

### Learning Objectives
- Understand Python's type hint system
- Add type annotations to functions and variables
- Use common types: List, Dict, Optional, Union, Tuple
- Know why type hints matter for larger projects and ML code

### Why Type Hints?
Python is dynamically typed, but type hints help you:
- **Catch bugs early** with tools like mypy
- **Document your code** so others understand expected types
- **IDE support** � better autocomplete and error detection
- **ML code clarity** � know what shape/type your data is

### Basic Type Hints
\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}"

age: int = 25
scores: list[float] = [95.5, 87.0]
\`\`\`

### Common Types
- \`int\`, \`float\`, \`str\`, \`bool\` � basic types
- \`list[int]\` � list of integers
- \`dict[str, int]\` � dict with string keys, int values
- \`tuple[int, str]\` � fixed-length tuple
- \`Optional[str]\` � str or None
- \`Union[int, float]\` � int or float

### Key Takeaway
Type hints make your code self-documenting and catch bugs before runtime. They're especially valuable in ML projects where data types matter.
          `,
          code: `from typing import Optional, Union

print("=== Type Hints & Annotations ===\\n")

# Basic function with type hints
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """Calculate BMI with typed parameters."""
    return weight_kg / (height_m ** 2)

bmi: float = calculate_bmi(70.0, 1.75)
print(f"BMI: {bmi:.1f}")

# Using Optional for nullable values
def find_user(user_id: int) -> Optional[dict]:
    users: dict[int, dict[str, str]] = {
        1: {"name": "Alice", "role": "admin"},
        2: {"name": "Bob", "role": "user"}
    }
    return users.get(user_id)

result = find_user(1)
print(f"Found user: {result}")
result = find_user(99)
print(f"Missing user: {result}")

# Union types
def process_input(value: Union[int, float, str]) -> str:
    if isinstance(value, (int, float)):
        return f"Number: {value}"
    return f"Text: {value}"

print(f"\\n{process_input(42)}")
print(process_input("hello"))

# Typed data structures
def summarize_scores(scores: list[float]) -> dict[str, float]:
    return {
        "mean": sum(scores) / len(scores),
        "min": min(scores),
        "max": max(scores)
    }

stats: dict[str, float] = summarize_scores([85.5, 92.0, 78.3, 96.1])
print(f"\\nScore stats: {stats}")

# ML-style function with type hints
def train_model(
    X: list[list[float]],
    y: list[int],
    epochs: int = 10,
    lr: float = 0.01
) -> dict[str, float]:
    """Simulated training with clear types."""
    return {"accuracy": 0.95, "loss": 0.12}

metrics = train_model([[1.0, 2.0], [3.0, 4.0]], [0, 1])
print(f"Training metrics: {metrics}")

print("\\n? Type hints make your code self-documenting!")
`.replace(/\$/g, '\\$')
        },
        {
          title: 'Module 19: Context Managers & Resource Handling',
          description: `
## ?? Context Managers & Resource Handling

### Learning Objectives
- Understand the \`with\` statement and why it matters
- Create custom context managers using classes and generators
- Handle resources safely (files, connections, locks)
- Use \`contextlib\` for convenient context manager creation

### Why Context Managers?
Resources like files, database connections, and locks need to be properly opened and closed. Context managers guarantee cleanup happens, even if errors occur.

### The with Statement
\`\`\`python
# Without context manager (risky)
f = open('file.txt')
data = f.read()  # If error here, file never closes!
f.close()

# With context manager (safe)
with open('file.txt') as f:
    data = f.read()  # File auto-closes after this block
\`\`\`

### Creating Context Managers
**Method 1: Class-based** � Implement \`__enter__\` and \`__exit__\`
**Method 2: Generator-based** � Use \`@contextmanager\` decorator

### Key Takeaway
Context managers ensure resources are properly cleaned up. They prevent resource leaks and make your code more robust � especially important when handling files, connections, or GPU memory in ML.
          `,
          code: `import time
from contextlib import contextmanager

print("=== Context Managers & Resource Handling ===\\n")

# Basic file context manager
print("--- File Context Manager ---")
with open('test_context.txt', 'w') as f:
    f.write("Hello from context manager!")

with open('test_context.txt', 'r') as f:
    content = f.read()
    print(f"File content: {content}")

# Class-based context manager
print("\\n--- Custom Context Manager (Class) ---")

class Timer:
    def __init__(self, label: str):
        self.label = label
    
    def __enter__(self):
        self.start = time.time()
        print(f"Starting {self.label}...")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = time.time() - self.start
        print(f"Finished {self.label} in {elapsed:.4f}s")
        return False  # Don't suppress exceptions

with Timer("computation") as t:
    total = sum(range(1_000_000))
    print(f"Sum: {total}")

# Generator-based context manager
print("\\n--- Custom Context Manager (Generator) ---")

@contextmanager
def database_connection(db_name: str):
    print(f"Connecting to {db_name}...")
    connection = {"db": db_name, "status": "connected"}
    try:
        yield connection
    finally:
        print(f"Closing connection to {db_name}")
        connection["status"] = "closed"

with database_connection("ml_database") as conn:
    print(f"Using connection: {conn}")
    print("Running queries...")

# Nested context managers
print("\\n--- Nested Context Managers ---")
with Timer("full pipeline"):
    with Timer("step 1: load data"):
        time.sleep(0.1)
    with Timer("step 2: process"):
        time.sleep(0.2)

# Clean up temp file
import os
os.remove('test_context.txt')

print("\\n? Context managers ensure safe resource handling!")
`.replace(/\$/g, '\\$')
        }
      ]
    },
    // Phase 1: Python Engineering - Complete curriculum
    phase3PythonContent,
    // Phase 2: Mathematical Foundations - Complete 10-module curriculum
    phase2MathContent,
    // Phase 3: Introduction to Machine Learning - Complete 10-module curriculum
    phase1MLContent,
    // Phase 4: Classical Machine Learning - Complete 10-lesson curriculum
    phase4ClassicalMLContent,
    // Phase 5: Deep Learning - Complete 10-lesson curriculum
    phase5DeepLearningContent,
    // Phase 6: Natural Language Processing - Complete 10-lesson curriculum
    phase6NLPContent,
    // Phase 7: Generative AI & LLMs - Complete 10-lesson curriculum
    phase7GenAILLMContent,
    // Phase 8: Computer Vision - Comprehensive 7-lesson curriculum (more lessons in Phase8_Computer_Vision_Content.ts)
    phase8ComputerVisionContent,
    // Phase 9: Agentic AI Systems - Deep multi-module curriculum
    phase9AgenticAIContent,
    {
      id: 10,
      title: 'Phase 10: MLOps & Production',
      topics: [
        'Model Deployment & Serving',
        'Monitoring & Drift Detection',
        'CI/CD for ML',
        'Scalability & Optimization'
      ],
      lessons: [
        {
          title: 'Model Performance Monitoring',
          description: `
## MLOps: Model Performance Monitoring

### Overview
Production ML models need continuous monitoring. Performance can degrade over time due to data drift, concept drift, or infrastructure issues.

### Key Concepts

**Model Drift**:
- Data distribution changes over time
- Model accuracy decreases
- Requires retraining or updating

**Key Metrics to Monitor**:
- Accuracy: Prediction correctness
- Latency: Response time
- Throughput: Requests per second
- Error rate: Failed predictions

**Alerting Thresholds**:
- Accuracy < 90%: Investigate drift
- Latency > 100ms: Scale infrastructure
- Error rate > 5%: Check for bugs

### Problem Statement
Simulate 90 days of model monitoring data:
1. Track accuracy with gradual drift starting at day 60
2. Monitor latency increasing over time
3. Track daily request volume with patterns

### Expected Output
- Three time-series plots:
  - Accuracy with drift detection
  - Latency with SLA threshold
  - Traffic volume patterns
- Alert indicators when thresholds crossed
- Final metrics summary

### Production Best Practices
- Set up automated alerts
- Log all predictions for debugging
- A/B test model updates
- Maintain rollback capability
          `,
          code: `import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# Simulate model performance over time
np.random.seed(42)
days = 90
dates = [datetime.now() - timedelta(days=days-i) for i in range(days)]

# Model accuracy with gradual drift
base_accuracy = 0.95
drift_start = 60
accuracy = np.ones(days) * base_accuracy

for i in range(drift_start, days):
    drift_amount = (i - drift_start) * 0.002
    accuracy[i] = base_accuracy - drift_amount + np.random.normal(0, 0.01)

# Latency (ms)
latency = 50 + np.random.normal(0, 5, days) + np.linspace(0, 20, days)

# Request volume
volume = 1000 + 200 * np.sin(np.linspace(0, 4*np.pi, days)) + np.random.normal(0, 50, days)

# Create dashboard
fig, axes = plt.subplots(3, 1, figsize=(14, 10))

# Accuracy over time
axes[0].plot(dates, accuracy, color='cyan', linewidth=2)
axes[0].axhline(y=0.90, color='red', linestyle='--', label='Alert Threshold')
axes[0].axvline(x=dates[drift_start], color='yellow', linestyle='--', 
               alpha=0.5, label='Drift Detected')
axes[0].set_ylabel('Accuracy')
axes[0].set_title('Model Accuracy Over Time (Drift Detection)', fontsize=12, fontweight='bold')
axes[0].legend()
axes[0].grid(True, alpha=0.3)
axes[0].set_ylim(0.85, 1.0)

# Latency
axes[1].plot(dates, latency, color='magenta', linewidth=2)
axes[1].axhline(y=100, color='red', linestyle='--', label='SLA Limit')
axes[1].set_ylabel('Latency (ms)')
axes[1].set_title('Response Latency', fontsize=12, fontweight='bold')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

# Request volume
axes[2].plot(dates, volume, color='green', linewidth=2)
axes[2].set_ylabel('Requests/day')
axes[2].set_xlabel('Date')
axes[2].set_title('Traffic Volume', fontsize=12, fontweight='bold')
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"Current Accuracy: {accuracy[-1]:.2%}")
print(f"Accuracy Drop: {(base_accuracy - accuracy[-1]):.2%}")
print(f"Average Latency: {latency[-7:].mean():.1f}ms")
print("?? Model drift detected - retraining recommended")`.replace(/\$/g, '\\$')
        }
      ]
    }
  ];

  const handleRunCode = async () => {
    setIsRunning(true);
    setError('');
    setOutput('Running code...');
    setImage(null);

    try {
      const { data } = await compilerClient.post('/execute', {
        code,
        language: 'python',
        timeout: 10,
      });

      const resultOutput = data.output || data.error || 'Code executed successfully';
      setOutput(resultOutput);
      
      if (data.image) {
        setImage(data.image);
      }
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to execute code.';
      setError(message);
      setOutput('');
    } finally {
      setIsRunning(false);
    }
  };

  const loadLesson = (phaseId: number, lessonIndex: number) => {
    const phase = curriculum.find(p => p.id === phaseId);
    if (phase && phase.lessons && phase.lessons[lessonIndex]) {
      // Start with empty editor so students can practice writing code themselves
      setCode('# Write your code here\n\n');
      setSelectedPhase(phaseId);
      setSelectedLesson(lessonIndex);
      setOutput('');
      setError('');
      setImage(null);
    }
  };

  // Helper function to create lesson ID
  const getLessonId = (phaseId: number, lessonIndex: number) => {
    return `phase-${phaseId}-lesson-${lessonIndex}`;
  };

  // Check if a lesson is completed
  const isLessonCompleted = (phaseId: number, lessonIndex: number) => {
    return completedLessons.has(getLessonId(phaseId, lessonIndex));
  };

  // Mark current lesson as complete
  const markLessonComplete = () => {
    const lessonId = getLessonId(selectedPhase, selectedLesson);
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  // Calculate phase completion percentage
  const getPhaseProgress = (phaseId: number) => {
    const phase = curriculum.find(p => p.id === phaseId);
    if (!phase || !phase.lessons) return 0;
    
    const totalLessons = phase.lessons.length;
    const completed = phase.lessons.filter((_, idx) => 
      isLessonCompleted(phaseId, idx)
    ).length;
    
    return Math.round((completed / totalLessons) * 100);
  };

  // Calculate overall progress
  const getOverallProgress = () => {
    let totalLessons = 0;
    let completedCount = 0;
    
    curriculum.forEach(phase => {
      if (phase.lessons) {
        totalLessons += phase.lessons.length;
        completedCount += phase.lessons.filter((_, idx) => 
          isLessonCompleted(phase.id, idx)
        ).length;
      }
    });
    
    return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  };

  // Handle AI Chat
  const handleAiChat = async () => {
    if (!chatInput.trim() || isAiLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    
    // Add user message to chat
    const newMessages = [...chatMessages, { role: 'user' as const, content: userMessage }];
    setChatMessages(newMessages);
    setIsAiLoading(true);

    try {
      // Get current lesson context
      const currentLessonData = curriculum
        .find(p => p.id === selectedPhase)
        ?.lessons?.[selectedLesson];
      
      const context = currentLessonData 
        ? `Current lesson: ${currentLessonData.title}\n\n` 
        : '';

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(import.meta as any).env?.VITE_GROQ_API_KEY || 'gsk_your_api_key_here'}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are an expert AI tutor specializing in Python, Machine Learning, and AI. You help students learn programming concepts, debug code, and understand ML algorithms. Be concise, clear, and educational. ${context}Provide code examples when helpful. Format code with proper syntax.`
            },
            ...newMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

      setChatMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setChatMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please make sure your Groq API key is configured correctly in the .env file (VITE_GROQ_API_KEY).' 
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const currentLesson = curriculum
    .find(p => p.id === selectedPhase)
    ?.lessons?.[selectedLesson];

  // --- Sidebar content for CyberpunkLayout ---
  const sidebarContent = (
    <>
      {/* Overall Progress */}
      <div style={{
        marginBottom: '1rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--plh-border-subtle)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--plh-text-muted)',
            fontWeight: '600',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em'
          }}>
            Overall Progress
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0.75rem',
            background: 'var(--plh-accent-primary-soft)',
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '700',
              color: getOverallProgress() === 100 ? 'var(--plh-success)' : 'var(--plh-accent-primary)'
            }}>
              {getOverallProgress()}%
            </span>
          </div>
        </div>
        <div className="plh-progress-track">
          <div
            className={`plh-progress-fill${getOverallProgress() === 100 ? ' complete' : ''}`}
            style={{ width: `${getOverallProgress()}%` }}
          />
        </div>
      </div>

      {/* Curriculum Phases */}
      {curriculum.map(phase => {
        const phaseProgress = getPhaseProgress(phase.id);
        const isPhaseSelected = selectedPhase === phase.id;
        return (
          <div key={phase.id} style={{ marginBottom: '1rem' }}>
            <div
              className={`plh-sidebar-card${isPhaseSelected ? ' active' : ''}`}
              onClick={() => {
                if (selectedPhase !== phase.id) {
                  setSelectedPhase(phase.id);
                  setSelectedLesson(0);
                  loadLesson(phase.id, 0);
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  color: isPhaseSelected ? '#8B5CF6' : '#d1d5db',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  Phase {phase.id}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: phaseProgress === 100 ? '#10b981' : '#9ca3af',
                  padding: '0.25rem 0.5rem',
                  background: phaseProgress === 100
                    ? 'rgba(16, 185, 129, 0.2)'
                    : 'rgba(6, 182, 212, 0.1)',
                  borderRadius: '6px'
                }}>
                  {phaseProgress}%
                </span>
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: isPhaseSelected ? '#A78BFA' : '#6B7280',
                marginBottom: '0.5rem',
                lineHeight: '1.3'
              }}>
                {phase.title}
              </div>
              <div className="plh-progress-track" style={{ height: '4px' }}>
                <div
                  className={`plh-progress-fill${phaseProgress === 100 ? ' complete' : ''}`}
                  style={{ width: `${phaseProgress}%` }}
                />
              </div>
            </div>

            {isPhaseSelected && phase.lessons && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                paddingLeft: '0.5rem',
                marginTop: '0.5rem'
              }}>
                {phase.lessons.map((lesson, idx) => {
                  const isCompleted = isLessonCompleted(phase.id, idx);
                  const isActive = selectedLesson === idx;
                  return (
                    <div
                      key={idx}
                      className={`plh-sidebar-card${isActive ? ' active' : ''}`}
                      onClick={() => loadLesson(phase.id, idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        ...(isCompleted && !isActive ? {
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%)',
                          borderColor: 'rgba(16, 185, 129, 0.25)'
                        } : {})
                      }}
                    >
                      <div style={{
                        minWidth: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: isActive
                          ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)'
                          : isCompleted
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : 'var(--plh-accent-primary-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        color: (isActive || isCompleted) ? '#fff' : 'var(--plh-accent-primary)',
                        flexShrink: 0,
                        boxShadow: isActive ? '0 0 12px rgba(139, 92, 246, 0.6)' : 'none'
                      }}>
                        {isCompleted ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span style={{
                        flex: 1,
                        fontSize: '0.8rem',
                        lineHeight: '1.3',
                        color: isActive ? '#8B5CF6' : isCompleted ? '#10b981' : '#d1d5db',
                        fontWeight: isActive ? '600' : '400'
                      }}>
                        {lesson.title}
                      </span>
                      {isActive && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#8B5CF6',
                          boxShadow: '0 0 8px rgba(139, 92, 246, 0.8)',
                          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                          flexShrink: 0
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          div::-webkit-scrollbar { width: 6px; height: 6px; }
          div::-webkit-scrollbar-track { background: rgba(31, 41, 55, 0.3); border-radius: 10px; }
          div::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.5); border-radius: 10px; }
          div::-webkit-scrollbar-thumb:hover { background: rgba(139, 92, 246, 0.7); }
          select option { background: #1f2937; color: #e5e7eb; padding: 0.5rem; }
        `}
      </style>

      <CyberpunkLayout sidebar={sidebarContent} sidebarTitle="Curriculum" fullWidth>
        <div id="main-content-container" style={{ display: 'flex', overflow: 'hidden', position: 'relative', height: '100%' }}>

      {/* Left Side - Problem Statement/Explanation */}
      <div style={{ 
        width: `${leftPanelWidth}%`, 
        borderRight: '1px solid rgba(45, 53, 72, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        transition: isResizing ? 'none' : 'width 0.1s ease'
      }}>
        {/* Modern Tabs - with dynamic padding for open button */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          padding: '0.5rem 1rem',
          gap: '0.5rem'
        }}>
          <div 
            onClick={() => setActiveTab('explanation')}
            style={{
              padding: '0.75rem 1.5rem',
              borderBottom: activeTab === 'explanation' ? '3px solid #8B5CF6' : '3px solid transparent',
              color: activeTab === 'explanation' ? '#8B5CF6' : '#9ca3af',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9rem',
              background: activeTab === 'explanation' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.3s ease',
              position: 'relative',
              boxShadow: activeTab === 'explanation' ? '0 -2px 8px rgba(59, 130, 246, 0.1)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'explanation') {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                e.currentTarget.style.color = '#d1d5db';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'explanation') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }
            }}
          >
            Explanation
          </div>
          <div 
            onClick={() => setActiveTab('aihelp')}
            style={{
              padding: '0.75rem 1.5rem',
              borderBottom: activeTab === 'aihelp' ? '3px solid #8B5CF6' : '3px solid transparent',
              color: activeTab === 'aihelp' ? '#8B5CF6' : '#9ca3af',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9rem',
              background: activeTab === 'aihelp' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.3s ease',
              position: 'relative',
              boxShadow: activeTab === 'aihelp' ? '0 -2px 8px rgba(59, 130, 246, 0.1)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'aihelp') {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                e.currentTarget.style.color = '#d1d5db';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'aihelp') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }
            }}
          >
            AI Help
          </div>
        </div>

        {/* Problem Content */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: '1.5rem',
          background: 'rgba(17, 24, 39, 0.5)'
        }}>
          {activeTab === 'explanation' ? (
            // Explanation Tab Content
            currentLesson ? (
            <div>
              {/* Lesson Title */}
              <h1 style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginTop: 0,
                marginBottom: '1.5rem', 
                fontSize: '2rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                fontFamily: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
                textShadow: '0 0 30px rgba(102, 126, 234, 0.3)',
                padding: '1rem 0',
                borderBottom: '3px solid transparent',
                borderImage: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                borderImageSlice: 1,
                position: 'relative'
              }}>
                {currentLesson.title}
                <div style={{
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  borderRadius: '2px',
                  boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
                }} />
              </h1>
              
              {/* Lesson Content */}
              <div style={{ 
                color: '#e5e7eb', 
                lineHeight: '1.8',
                fontSize: '1rem',
                maxWidth: '900px',
                margin: '0 auto'
              }}>
                {currentLesson.description.split('\n').map((line, idx) => {
                  // Helper function to parse inline markdown (bold and code)
                  const parseInlineMarkdown = (text: string) => {
                    const parts: React.ReactNode[] = [];
                    let currentIndex = 0;
                    let partKey = 0;
                    
                    // Match both **bold** and `code`
                    const regex = /(\*\*.*?\*\*|`.*?`)/g;
                    let match;
                    
                    while ((match = regex.exec(text)) !== null) {
                      // Add text before the match
                      if (match.index > currentIndex) {
                        parts.push(
                          <span key={`text-${partKey++}`}>
                            {text.substring(currentIndex, match.index)}
                          </span>
                        );
                      }
                      
                      const matchedText = match[0];
                      
                      // Check if it's bold (**text**)
                      if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
                        parts.push(
                          <strong key={`bold-${partKey++}`} style={{ 
                            color: '#fbbf24', 
                            fontWeight: '700' 
                          }}>
                            {matchedText.slice(2, -2)}
                          </strong>
                        );
                      }
                      // Check if it's code (`text`)
                      else if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
                        parts.push(
                          <code key={`code-${partKey++}`} style={{
                            background: 'rgba(59, 130, 246, 0.15)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontFamily: 'Consolas, Monaco, monospace',
                            fontSize: '0.9em',
                            color: '#93c5fd',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                          }}>
                            {matchedText.slice(1, -1)}
                          </code>
                        );
                      }
                      
                      currentIndex = match.index + matchedText.length;
                    }
                    
                    // Add remaining text
                    if (currentIndex < text.length) {
                      parts.push(
                        <span key={`text-${partKey++}`}>
                          {text.substring(currentIndex)}
                        </span>
                      );
                    }
                    
                    return parts.length > 0 ? parts : text;
                  };

                  // Main heading (##)
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={idx} style={{ 
                        color: '#60a5fa', 
                        marginTop: '2rem', 
                        marginBottom: '1rem', 
                        fontSize: '1.75rem', 
                        fontWeight: '700',
                        borderBottom: '2px solid rgba(96, 165, 250, 0.3)',
                        paddingBottom: '0.5rem'
                      }}>
                        {line.replace('## ', '').trim()}
                      </h2>
                    );
                  } 
                  // Subheading (###)
                  else if (line.startsWith('### ')) {
                    return (
                      <h3 key={idx} style={{ 
                        color: '#93c5fd', 
                        marginTop: '1.5rem', 
                        marginBottom: '0.75rem', 
                        fontSize: '1.25rem', 
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ 
                          width: '4px', 
                          height: '1.25rem', 
                          background: 'linear-gradient(180deg, #C026D3 0%, #A855F7 100%)',
                          borderRadius: '2px'
                        }} />
                        {line.replace('### ', '').trim()}
                      </h3>
                    );
                  }
                  // Bold section headers (**text**: at start of line)
                  else if (line.match(/^\*\*[^*]+\*\*:?\s*$/)) {
                    return (
                      <p key={idx} style={{ 
                        fontWeight: '700', 
                        color: '#fbbf24', 
                        marginTop: '1.25rem', 
                        marginBottom: '0.5rem',
                        fontSize: '1.05rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          background: '#fbbf24',
                          borderRadius: '50%'
                        }} />
                        {line.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  // List items (-)
                  else if (line.trim().startsWith('- ')) {
                    const content = line.replace(/^-\s*/, '').trim();
                    return (
                      <div key={idx} style={{ 
                        display: 'flex',
                        gap: '0.75rem',
                        marginLeft: '1rem',
                        marginBottom: '0.5rem',
                        alignItems: 'flex-start'
                      }}>
                        <span
                          style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            borderRadius: '999px',
                            marginTop: '0.5rem',
                            background: 'radial-gradient(circle at 30% 30%, #e5e7eb 0, #60a5fa 40%, #0f172a 100%)',
                            boxShadow: '0 0 12px rgba(96, 165, 250, 0.8)'
                          }}
                        />
                        <span style={{ color: '#d1d5db', flex: 1 }}>
                          {parseInlineMarkdown(content)}
                        </span>
                      </div>
                    );
                  }
                  // Numbered list items (1. 2. 3.)
                  else if (line.match(/^\d+\.\s/)) {
                    const content = line.replace(/^\d+\.\s*/, '').trim();
                    const number = line.match(/^(\d+)\./)?.[1];
                    return (
                      <div key={idx} style={{ 
                        display: 'flex',
                        gap: '0.75rem',
                        marginLeft: '1rem',
                        marginBottom: '0.5rem',
                        alignItems: 'flex-start'
                      }}>
                        <span style={{ 
                          color: '#60a5fa', 
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          minWidth: '1.5rem'
                        }}>{number}.</span>
                        <span style={{ color: '#d1d5db', flex: 1 }}>
                          {parseInlineMarkdown(content)}
                        </span>
                      </div>
                    );
                  }
                  // Checkmarks (✅) – used for key checklist items
                  else if (line.trim().startsWith('✅')) {
                    const content = line.replace(/^✅\s*/, '').trim();
                    return (
                      <div key={idx} style={{ 
                        display: 'flex',
                        gap: '0.75rem',
                        marginLeft: '1rem',
                        marginBottom: '0.5rem',
                        alignItems: 'center',
                        padding: '0.5rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '6px',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                      }}>
                        <span style={{ fontSize: '1.1rem' }}>✅</span>
                        <span style={{ color: '#d1d5db' }}>
                          {parseInlineMarkdown(content)}
                        </span>
                      </div>
                    );
                  }
                  // Cross marks (❌) – used for anti-patterns / warnings
                  else if (line.trim().startsWith('❌')) {
                    const content = line.replace(/^❌\s*/, '').trim();
                    return (
                      <div key={idx} style={{ 
                        display: 'flex',
                        gap: '0.75rem',
                        marginLeft: '1rem',
                        marginBottom: '0.5rem',
                        alignItems: 'center',
                        padding: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '6px',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                      }}>
                        <span style={{ fontSize: '1.1rem' }}>❌</span>
                        <span style={{ color: '#d1d5db' }}>
                          {parseInlineMarkdown(content)}
                        </span>
                      </div>
                    );
                  }
                  // Code blocks (```)
                  else if (line.trim().startsWith('```')) {
                    return null; // Skip code fence markers
                  }
                  // Regular paragraphs (with inline markdown support)
                  else if (line.trim()) {
                    return (
                      <p key={idx} style={{ 
                        marginBottom: '0.75rem', 
                        marginTop: '0.5rem', 
                        color: '#d1d5db',
                        lineHeight: '1.8'
                      }}>
                        {parseInlineMarkdown(line)}
                      </p>
                    );
                  }
                  return null; // Skip empty lines
                })}
              </div>
              
              {/* Code Example Section */}
              {currentLesson.code && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ 
                    color: '#10b981', 
                    marginBottom: '0.75rem', 
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>Example Solution</span>
                  </h3>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    overflowX: 'auto'
                  }}>
                    <pre style={{
                      margin: 0,
                      color: '#d1d5db',
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {currentLesson.code}
                    </pre>
                  </div>
                  <p style={{ 
                    marginTop: '0.75rem', 
                    color: '#f59e0b', 
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>Try to solve it yourself first! Use this example only if you get stuck.</span>
                  </p>
                </div>
              )}

              {/* Mark as Complete Button */}
              <div style={{ 
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                {isLessonCompleted(selectedPhase, selectedLesson) ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)',
                    border: '2px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '12px',
                    color: '#10b981',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Lesson Completed!</span>
                    <div style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(16, 185, 129, 0.2)',
                      borderRadius: '8px',
                      fontSize: '0.85rem'
                    }}>
                      Great job!
                    </div>
                  </div>
                ) : (
                  <button
                    className="plh-button-primary"
                    onClick={markLessonComplete}
                    style={{
                      width: '100%',
                      padding: '0.55rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      borderRadius: '8px'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Mark as Complete</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
              <h3 style={{ marginBottom: '1rem' }}>Select a lesson to begin</h3>
              <p>Choose a topic from the curriculum sidebar to start learning</p>
            </div>
          )
          ) : (
            // AI Help Tab Content
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              padding: 0
            }}>
              {/* Chat Header */}
              <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                background: 'rgba(59, 130, 246, 0.05)'
              }}>
                <h2 style={{ 
                  margin: 0, 
                  color: '#8B5CF6', 
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span>AI Learning Assistant</span>
                </h2>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  color: '#9ca3af', 
                  fontSize: '0.85rem' 
                }}>
                  Ask me anything about Python, Machine Learning, AI, or the current lesson!
                </p>
              </div>

              {/* Chat Messages */}
              <div style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {chatMessages.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '3rem 1rem',
                    color: '#9ca3af'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>??</div>
                    <h3 style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>Start a conversation</h3>
                    <p style={{ fontSize: '0.9rem' }}>Ask me to explain concepts, debug code, or help with exercises!</p>
                    <div style={{ 
                      marginTop: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        padding: '0.75rem 1rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        color: '#60a5fa',
                        maxWidth: '300px'
                      }}>
                        "Explain linear regression in simple terms"
                      </div>
                      <div style={{ 
                        padding: '0.75rem 1rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        color: '#60a5fa',
                        maxWidth: '300px'
                      }}>
                        "Help me debug this Python code"
                      </div>
                      <div style={{ 
                        padding: '0.75rem 1rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        color: '#60a5fa',
                        maxWidth: '300px'
                      }}>
                        "What's the difference between list and tuple?"
                      </div>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        animation: 'fadeIn 0.3s ease'
                      }}
                    >
                      <div style={{
                        maxWidth: '80%',
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        background: msg.role === 'user' 
                          ? '#8B5CF6'
                          : 'rgba(30, 36, 51, 0.8)',
                        border: msg.role === 'assistant' ? '1px solid rgba(45, 53, 72, 0.8)' : 'none',
                        color: '#e5e7eb',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        boxShadow: msg.role === 'user' 
                          ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                          : '0 2px 8px rgba(0, 0, 0, 0.2)'
                      }}>
                        {msg.role === 'assistant' && (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            marginBottom: '0.5rem',
                            color: '#60a5fa',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}>
                            <span>??</span>
                            <span>AI Assistant</span>
                          </div>
                        )}
                        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {isAiLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      background: 'rgba(31, 41, 55, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#9ca3af',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#8B5CF6',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }} />
                      <span>AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid rgba(59, 130, 246, 0.2)',
                background: 'rgba(17, 24, 39, 0.8)'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
                    placeholder="Ask me anything about Python, ML, or AI..."
                    disabled={isAiLoading}
                    style={{
                      flex: 1,
                      padding: '0.875rem 1.25rem',
                      background: 'rgba(31, 41, 55, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '10px',
                      color: '#e5e7eb',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8B5CF6';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    onClick={handleAiChat}
                    disabled={isAiLoading || !chatInput.trim()}
                    style={{
                      padding: '0.875rem 1.75rem',
                      background: (isAiLoading || !chatInput.trim()) 
                        ? 'rgba(107, 114, 128, 0.5)'
                        : '#8B5CF6',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: (isAiLoading || !chatInput.trim()) ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: (isAiLoading || !chatInput.trim()) 
                        ? 'none'
                        : '0 4px 12px rgba(59, 130, 246, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      if (!isAiLoading && chatInput.trim()) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = (isAiLoading || !chatInput.trim()) 
                        ? 'none'
                        : '0 4px 12px rgba(59, 130, 246, 0.3)';
                    }}
                  >
                    <span>Send</span>
                    <span>?</span>
                  </button>
                </div>
                <p style={{ 
                  margin: '0.75rem 0 0 0', 
                  fontSize: '0.75rem', 
                  color: '#6b7280',
                  textAlign: 'center'
                }}>
                  Powered by Groq AI � Press Enter to send
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resizable Divider */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '6px',
          cursor: 'col-resize',
          background: isResizing 
            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.5) 0%, rgba(139, 92, 246, 0.5) 100%)'
            : 'rgba(59, 130, 246, 0.2)',
          position: 'relative',
          zIndex: 20,
          transition: isResizing ? 'none' : 'background 0.2s ease',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          if (!isResizing) {
            e.currentTarget.style.background = 'linear-gradient(90deg, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isResizing) {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
          }
        }}
      >
        {/* Drag Handle Icon */}
        <div style={{
          width: '3px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Right Side - Code Editor & Output */}
      <div style={{ 
        width: `${100 - leftPanelWidth}%`, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        transition: isResizing ? 'none' : 'width 0.1s ease'
      }}>
        {/* Modern Editor Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '0.625rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
              }} />
              <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: '500' }}>Language:</span>
              <select style={{
                padding: '0.25rem 0.5rem',
                background: 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: '#e5e7eb',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                outline: 'none'
              }}>
                <option>Python 3</option>
              </select>
            </div>
          </div>
          <button 
            className="plh-button-primary"
            onClick={handleRunCode}
            disabled={isRunning}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              ...(isRunning ? {
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                cursor: 'not-allowed',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              } : {})
            }}
          >
            <span style={{ fontSize: '0.95rem' }}>
              {isRunning ? '⚡' : '▸'}
            </span>
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>

        {/* Code Editor with Neon Syntax Theme */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Editor
            height="100%"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            beforeMount={(monaco) => {
              // Define custom cyberpunk theme with neon colors
              monaco.editor.defineTheme('cyberpunk-neon', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                  { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
                  { token: 'keyword', foreground: 'FF10F0', fontStyle: 'bold' },
                  { token: 'string', foreground: '39FF14' },
                  { token: 'number', foreground: '06B6D4' },
                  { token: 'function', foreground: 'A855F7' },
                  { token: 'variable', foreground: 'F9FAFB' },
                  { token: 'type', foreground: '8B5CF6' },
                  { token: 'class', foreground: 'FBBF24' },
                  { token: 'operator', foreground: 'FF10F0' },
                ],
                colors: {
                  'editor.background': '#0B0E14',
                  'editor.foreground': '#F9FAFB',
                  'editorLineNumber.foreground': '#6B7280',
                  'editorLineNumber.activeForeground': '#8B5CF6',
                  'editor.selectionBackground': '#8B5CF640',
                  'editor.lineHighlightBackground': '#161B2220',
                  'editorCursor.foreground': '#06B6D4',
                  'editorWhitespace.foreground': '#6B728040',
                }
              });
              monaco.editor.setTheme('cyberpunk-neon');
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'on',
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
              fontLigatures: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
            }}
          />
        </div>

        {/* Output Panel */}
        {(output || error || image) && (
          <div style={{ 
            height: '300px',
            borderTop: '1px solid rgba(59, 130, 246, 0.2)',
            background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ 
              padding: '0.875rem 1.5rem',
              borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
              background: 'rgba(59, 130, 246, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
              }} />
              <span style={{
                color: '#C026D3',
                fontWeight: '600',
                fontSize: '0.9rem',
                letterSpacing: '0.025em'
              }}>
                Output Console
              </span>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '1rem 1.5rem' }}>
              {error && (
                <div style={{ 
                  color: '#ef4444', 
                  background: 'rgba(239, 68, 68, 0.1)',
                  padding: '1rem',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}>
                  <strong>Error:</strong>
                  <pre style={{ margin: '0.5rem 0', whiteSpace: 'pre-wrap' }}>{error}</pre>
                </div>
              )}
              {output && (
                <pre style={{ 
                  color: '#d1d5db', 
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  whiteSpace: 'pre-wrap',
                  margin: 0
                }}>
                  {output}
                </pre>
              )}
              {image && (
                <div style={{ 
                  marginTop: '1rem',
                  background: '#fff',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <img 
                    src={`data:image/png;base64,${image}`} 
                    alt="Visualization" 
                    style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
    </CyberpunkLayout>
    </>
  );
}
