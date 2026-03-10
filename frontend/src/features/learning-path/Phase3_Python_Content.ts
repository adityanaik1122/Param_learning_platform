export const phase3PythonContent = {
  id: 1,
  title: 'Phase 1: Python Engineering',
  topics: [
    'Advanced Python Patterns',
    'OOP & Design Patterns',
    'Async Programming',
    'Scientific Computing Stack',
    'Testing with pytest',
    'Virtual Environments & Dependency Management',
    'Logging & Debugging',
    'Git & Version Control Basics',
    'Code Quality (Linting, Formatting, Docstrings)',
    'Data Serialization (JSON, CSV, Pickle, YAML)'
  ],
  lessons: [
    {
      title: 'List Comprehensions & Generator Expressions',
      description: `
## List Comprehensions & Generator Expressions

### Overview
Python's comprehensions provide elegant, readable ways to create lists, sets, and dictionaries. Generator expressions offer memory-efficient alternatives.

### Key Concepts

**List Comprehension**: Create lists in a single line
- Syntax: [expression for item in iterable if condition]
- More readable than loops
- Often faster than traditional loops

**Generator Expression**: Like list comprehension but lazy
- Syntax: (expression for item in iterable if condition)
- Produces values on-demand
- Memory efficient for large datasets

**Dictionary & Set Comprehensions**:
- Dict: {key: value for item in iterable}
- Set: {expression for item in iterable}

### Problem Statement
1. Create a list of squares for even numbers from 1-20
2. Use generator expression for memory-efficient processing
3. Create a dictionary mapping numbers to their cubes

### Expected Output
- List of even squares
- Generator object
- Dictionary of cubes
`,
      starterCode: `# List Comprehensions and Generator Expressions

# TODO: Create list of squares for even numbers 1-20
even_squares = 

print("Even squares:", even_squares)

# TODO: Create generator expression for same result
even_squares_gen = 

print("Generator object:", even_squares_gen)
print("First 5 values:", [next(even_squares_gen) for _ in range(5)])

# TODO: Create dictionary mapping numbers to cubes (1-10)
cubes_dict = 

print("Cubes dictionary:", cubes_dict)

# Nested comprehension example
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# TODO: Flatten the matrix
flattened = 

print("Flattened matrix:", flattened)
`,
      solution: `# List Comprehensions and Generator Expressions

# Create list of squares for even numbers 1-20
even_squares = [x**2 for x in range(1, 21) if x % 2 == 0]

print("Even squares:", even_squares)

# Create generator expression for same result
even_squares_gen = (x**2 for x in range(1, 21) if x % 2 == 0)

print("Generator object:", even_squares_gen)
print("First 5 values:", [next(even_squares_gen) for _ in range(5)])

# Create dictionary mapping numbers to cubes (1-10)
cubes_dict = {x: x**3 for x in range(1, 11)}

print("Cubes dictionary:", cubes_dict)

# Nested comprehension example
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# Flatten the matrix
flattened = [num for row in matrix for num in row]

print("Flattened matrix:", flattened)
`,
      code: `# List Comprehensions and Generator Expressions

# TODO: Create list of squares for even numbers 1-20
even_squares = [x**2 for x in range(1, 21) if x % 2 == 0]

print("Even squares:", even_squares)

# TODO: Create generator expression for same result
even_squares_gen = (x**2 for x in range(1, 21) if x % 2 == 0)

print("Generator object:", even_squares_gen)
print("First 5 values:", [next(even_squares_gen) for _ in range(5)])

# TODO: Create dictionary mapping numbers to cubes (1-10)
cubes_dict = {x: x**3 for x in range(1, 11)}

print("Cubes dictionary:", cubes_dict)

# Nested comprehension example
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# TODO: Flatten the matrix
flattened = [num for row in matrix for num in row]

print("Flattened matrix:", flattened)
`
    },
    {
      title: 'Decorators & Function Wrappers',
      description: `
## Decorators & Function Wrappers

### Overview
Decorators are a powerful Python feature that allows you to modify or enhance functions without changing their code. Essential for ML frameworks like TensorFlow and PyTorch.

### Key Concepts

**Decorator**: A function that takes another function and extends its behavior
- Syntax: @decorator_name above function definition
- Used for logging, timing, authentication, caching

**Function as First-Class Object**: Functions can be passed as arguments
- Can return functions from functions
- Can store functions in data structures

**Common Use Cases**:
- Timing function execution
- Logging function calls
- Caching results (memoization)
- Authentication/authorization

### Problem Statement
Create decorators for:
1. Timing function execution
2. Logging function calls with arguments
3. Caching expensive computations (memoization)

### Expected Output
- Execution times for functions
- Log messages showing function calls
- Cached results for repeated calls
`,
      starterCode: `import time
import functools

# TODO: Create a timing decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = 
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

# TODO: Create a logging decorator
def logger(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = 
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

# TODO: Create a memoization decorator
def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args in cache:
            print(f"Cache hit for {args}")
            return cache[args]
        print(f"Computing for {args}")
        result = 
        cache[args] = result
        return result
    return wrapper

# Test the decorators
@timer
@logger
def slow_function(n):
    time.sleep(1)
    return n * 2

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Run tests
print("\\n=== Testing timer and logger ===")
result = slow_function(5)

print("\\n=== Testing memoization ===")
print(f"fib(10) = {fibonacci(10)}")
print(f"fib(10) again = {fibonacci(10)}")  # Should use cache
`,
      solution: `import time
import functools

# Create a timing decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

# Create a logging decorator
def logger(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

# Create a memoization decorator
def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args in cache:
            print(f"Cache hit for {args}")
            return cache[args]
        print(f"Computing for {args}")
        result = func(*args)
        cache[args] = result
        return result
    return wrapper

# Test the decorators
@timer
@logger
def slow_function(n):
    time.sleep(1)
    return n * 2

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Run tests
print("\\n=== Testing timer and logger ===")
result = slow_function(5)

print("\\n=== Testing memoization ===")
print(f"fib(10) = {fibonacci(10)}")
print(f"fib(10) again = {fibonacci(10)}")  # Should use cache
`,
      code: `import time
import functools

# TODO: Create a timing decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

# TODO: Create a logging decorator
def logger(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

# TODO: Create a memoization decorator
def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args in cache:
            print(f"Cache hit for {args}")
            return cache[args]
        print(f"Computing for {args}")
        result = func(*args)
        cache[args] = result
        return result
    return wrapper

# Test the decorators
@timer
@logger
def slow_function(n):
    time.sleep(1)
    return n * 2

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Run tests
print("\\n=== Testing timer and logger ===")
result = slow_function(5)

print("\\n=== Testing memoization ===")
print(f"fib(10) = {fibonacci(10)}")
print(f"fib(10) again = {fibonacci(10)}")  # Should use cache
`
    },
    {
      title: 'Context Managers & Resource Management',
      description: `
## Context Managers & Resource Management

### Overview
Context managers ensure proper resource management (files, connections, locks) using the 'with' statement. Critical for handling datasets and model checkpoints in ML.

### Key Concepts

**with Statement**: Automatically handles setup and cleanup
- Guarantees cleanup even if errors occur
- Syntax: with resource as variable:

**__enter__ and __exit__**: Magic methods for context managers
- __enter__: Setup code, returns resource
- __exit__: Cleanup code, handles exceptions

**contextlib Module**: Simplifies creating context managers
- @contextmanager decorator
- Useful for timing, logging, temporary changes

### Problem Statement
Create custom context managers for:
1. Timing code blocks
2. Temporarily changing directory
3. Database connection simulation

### Expected Output
- Execution times for code blocks
- Directory changes with automatic restoration
- Proper resource cleanup
`,
      starterCode: `import time
import os
from contextlib import contextmanager

# TODO: Create a timing context manager
@contextmanager
def timer_context(name):
    print(f"Starting {name}...")
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{name} took {end - start:.4f} seconds")

# TODO: Create a directory change context manager
@contextmanager
def change_dir(path):
    original = os.getcwd()
    print(f"Changing from {original} to {path}")
    try:
        os.chdir(path)
        yield
    finally:
        os.chdir(original)
        print(f"Changed back to {original}")

# TODO: Create a database connection context manager (simulated)
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connected = False
    
    def __enter__(self):
        print(f"Connecting to {self.db_name}...")
        self.connected = True
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing connection to {self.db_name}")
        self.connected = False
        return False  # Don't suppress exceptions
    
    def query(self, sql):
        if not self.connected:
            raise Exception("Not connected!")
        return f"Results for: {sql}"

# Test context managers
print("=== Testing timer context ===")
with timer_context("Data processing"):
    time.sleep(0.5)
    result = sum(range(1000000))

print("\\n=== Testing directory change ===")
print(f"Current dir: {os.getcwd()}")
try:
    with change_dir(".."):
        print(f"Inside context: {os.getcwd()}")
except:
    print("Directory change failed (expected in sandbox)")
print(f"After context: {os.getcwd()}")

print("\\n=== Testing database connection ===")
with DatabaseConnection("ml_models.db") as db:
    print(db.query("SELECT * FROM models"))
`,
      solution: `import time
import os
from contextlib import contextmanager

# Create a timing context manager
@contextmanager
def timer_context(name):
    print(f"Starting {name}...")
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{name} took {end - start:.4f} seconds")

# Create a directory change context manager
@contextmanager
def change_dir(path):
    original = os.getcwd()
    print(f"Changing from {original} to {path}")
    try:
        os.chdir(path)
        yield
    finally:
        os.chdir(original)
        print(f"Changed back to {original}")

# Create a database connection context manager (simulated)
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connected = False
    
    def __enter__(self):
        print(f"Connecting to {self.db_name}...")
        self.connected = True
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing connection to {self.db_name}")
        self.connected = False
        return False  # Don't suppress exceptions
    
    def query(self, sql):
        if not self.connected:
            raise Exception("Not connected!")
        return f"Results for: {sql}"

# Test context managers
print("=== Testing timer context ===")
with timer_context("Data processing"):
    time.sleep(0.5)
    result = sum(range(1000000))

print("\\n=== Testing directory change ===")
print(f"Current dir: {os.getcwd()}")
try:
    with change_dir(".."):
        print(f"Inside context: {os.getcwd()}")
except:
    print("Directory change failed (expected in sandbox)")
print(f"After context: {os.getcwd()}")

print("\\n=== Testing database connection ===")
with DatabaseConnection("ml_models.db") as db:
    print(db.query("SELECT * FROM models"))
`,
      code: `import time
import os
from contextlib import contextmanager

# TODO: Create a timing context manager
@contextmanager
def timer_context(name):
    print(f"Starting {name}...")
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{name} took {end - start:.4f} seconds")

# TODO: Create a directory change context manager
@contextmanager
def change_dir(path):
    original = os.getcwd()
    print(f"Changing from {original} to {path}")
    try:
        os.chdir(path)
        yield
    finally:
        os.chdir(original)
        print(f"Changed back to {original}")

# TODO: Create a database connection context manager (simulated)
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connected = False
    
    def __enter__(self):
        print(f"Connecting to {self.db_name}...")
        self.connected = True
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing connection to {self.db_name}")
        self.connected = False
        return False
    
    def query(self, sql):
        if not self.connected:
            raise Exception("Not connected!")
        return f"Results for: {sql}"

# Test context managers
print("=== Testing timer context ===")
with timer_context("Data processing"):
    time.sleep(0.5)
    result = sum(range(1000000))

print("\\n=== Testing directory change ===")
print(f"Current dir: {os.getcwd()}")
try:
    with change_dir(".."):
        print(f"Inside context: {os.getcwd()}")
except:
    print("Directory change failed (expected in sandbox)")
print(f"After context: {os.getcwd()}")

print("\\n=== Testing database connection ===")
with DatabaseConnection("ml_models.db") as db:
    print(db.query("SELECT * FROM models"))
`
    },
    {
      title: 'Object-Oriented Programming Fundamentals',
      description: `
## Object-Oriented Programming Fundamentals

### Overview
OOP is essential for building ML models and frameworks. Understanding classes, inheritance, and encapsulation helps you work with libraries like scikit-learn and PyTorch.

### Key Concepts

**Class**: Blueprint for creating objects
- Attributes: Data stored in the object
- Methods: Functions that operate on the object

**Encapsulation**: Bundling data and methods
- Private attributes: _attribute or __attribute
- Public interface: Methods users should call

**Inheritance**: Creating classes based on existing ones
- Parent/base class provides common functionality
- Child/derived class adds specific features

**Polymorphism**: Same interface, different implementations
- Method overriding
- Duck typing in Python

### Problem Statement
Create a machine learning model class hierarchy:
1. Base Model class with common functionality
2. LinearRegression and LogisticRegression subclasses
3. Implement fit() and predict() methods

### Expected Output
- Model training and prediction
- Demonstration of inheritance
- Polymorphic behavior
`,
      starterCode: `import numpy as np

# TODO: Create base Model class
class Model:
    def __init__(self, name):
        self.name = name
        self.is_trained = False
        self.weights = None
    
    def fit(self, X, y):
        """Train the model - to be implemented by subclasses"""
        raise NotImplementedError("Subclass must implement fit()")
    
    def predict(self, X):
        """Make predictions - to be implemented by subclasses"""
        raise NotImplementedError("Subclass must implement predict()")
    
    def score(self, X, y):
        """Calculate accuracy"""
        predictions = self.predict(X)
        return np.mean(predictions == y)
    
    def __repr__(self):
        status = "trained" if self.is_trained else "untrained"
        return f"{self.name} ({status})"

# TODO: Create LinearRegression class
class LinearRegression(Model):
    def __init__(self):
        super().__init__("Linear Regression")
    
    def fit(self, X, y):
        """Fit using normal equation: w = (X^T X)^-1 X^T y"""
        # Add bias term
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        # Calculate weights
        self.weights = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
        self.is_trained = True
        return self
    
    def predict(self, X):
        """Make predictions"""
        if not self.is_trained:
            raise Exception("Model not trained!")
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        return X_b @ self.weights

# TODO: Create LogisticRegression class
class LogisticRegression(Model):
    def __init__(self, learning_rate=0.01, iterations=1000):
        super().__init__("Logistic Regression")
        self.learning_rate = learning_rate
        self.iterations = iterations
    
    def _sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
    
    def fit(self, X, y):
        """Fit using gradient descent"""
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        self.weights = np.zeros(X_b.shape[1])
        
        for _ in range(self.iterations):
            predictions = self._sigmoid(X_b @ self.weights)
            gradient = X_b.T @ (predictions - y) / len(y)
            self.weights -= self.learning_rate * gradient
        
        self.is_trained = True
        return self
    
    def predict(self, X):
        """Make binary predictions"""
        if not self.is_trained:
            raise Exception("Model not trained!")
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        return (self._sigmoid(X_b @ self.weights) >= 0.5).astype(int)

# Test the models
np.random.seed(42)

# Linear Regression test
print("=== Linear Regression ===")
X_reg = np.random.randn(100, 1)
y_reg = 3 * X_reg.squeeze() + 2 + np.random.randn(100) * 0.5

model_lr = LinearRegression()
print(f"Before training: {model_lr}")
model_lr.fit(X_reg, y_reg)
print(f"After training: {model_lr}")
print(f"Weights: {model_lr.weights}")

# Logistic Regression test
print("\\n=== Logistic Regression ===")
X_clf = np.random.randn(100, 2)
y_clf = (X_clf[:, 0] + X_clf[:, 1] > 0).astype(int)

model_log = LogisticRegression()
print(f"Before training: {model_log}")
model_log.fit(X_clf, y_clf)
print(f"After training: {model_log}")
print(f"Accuracy: {model_log.score(X_clf, y_clf):.2f}")
`,
      solution: `import numpy as np

# Create base Model class
class Model:
    def __init__(self, name):
        self.name = name
        self.is_trained = False
        self.weights = None
    
    def fit(self, X, y):
        """Train the model - to be implemented by subclasses"""
        raise NotImplementedError("Subclass must implement fit()")
    
    def predict(self, X):
        """Make predictions - to be implemented by subclasses"""
        raise NotImplementedError("Subclass must implement predict()")
    
    def score(self, X, y):
        """Calculate accuracy"""
        predictions = self.predict(X)
        return np.mean(predictions == y)
    
    def __repr__(self):
        status = "trained" if self.is_trained else "untrained"
        return f"{self.name} ({status})"

# Create LinearRegression class
class LinearRegression(Model):
    def __init__(self):
        super().__init__("Linear Regression")
    
    def fit(self, X, y):
        """Fit using normal equation: w = (X^T X)^-1 X^T y"""
        # Add bias term
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        # Calculate weights
        self.weights = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
        self.is_trained = True
        return self
    
    def predict(self, X):
        """Make predictions"""
        if not self.is_trained:
            raise Exception("Model not trained!")
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        return X_b @ self.weights

# Create LogisticRegression class
class LogisticRegression(Model):
    def __init__(self, learning_rate=0.01, iterations=1000):
        super().__init__("Logistic Regression")
        self.learning_rate = learning_rate
        self.iterations = iterations
    
    def _sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
    
    def fit(self, X, y):
        """Fit using gradient descent"""
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        self.weights = np.zeros(X_b.shape[1])
        
        for _ in range(self.iterations):
            predictions = self._sigmoid(X_b @ self.weights)
            gradient = X_b.T @ (predictions - y) / len(y)
            self.weights -= self.learning_rate * gradient
        
        self.is_trained = True
        return self
    
    def predict(self, X):
        """Make binary predictions"""
        if not self.is_trained:
            raise Exception("Model not trained!")
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        return (self._sigmoid(X_b @ self.weights) >= 0.5).astype(int)

# Test the models
np.random.seed(42)

# Linear Regression test
print("=== Linear Regression ===")
X_reg = np.random.randn(100, 1)
y_reg = 3 * X_reg.squeeze() + 2 + np.random.randn(100) * 0.5

model_lr = LinearRegression()
print(f"Before training: {model_lr}")
model_lr.fit(X_reg, y_reg)
print(f"After training: {model_lr}")
print(f"Weights: {model_lr.weights}")

# Logistic Regression test
print("\\n=== Logistic Regression ===")
X_clf = np.random.randn(100, 2)
y_clf = (X_clf[:, 0] + X_clf[:, 1] > 0).astype(int)

model_log = LogisticRegression()
print(f"Before training: {model_log}")
model_log.fit(X_clf, y_clf)
print(f"After training: {model_log}")
print(f"Accuracy: {model_log.score(X_clf, y_clf):.2f}")
`,
      code: `import numpy as np

# TODO: Create base Model class
class Model:
    def __init__(self, name):
        self.name = name
        self.is_trained = False
        self.weights = None
    
    def fit(self, X, y):
        raise NotImplementedError("Subclass must implement fit()")
    
    def predict(self, X):
        raise NotImplementedError("Subclass must implement predict()")
    
    def score(self, X, y):
        predictions = self.predict(X)
        return np.mean(predictions == y)
    
    def __repr__(self):
        status = "trained" if self.is_trained else "untrained"
        return f"{self.name} ({status})"

# TODO: Create LinearRegression class
class LinearRegression(Model):
    def __init__(self):
        super().__init__("Linear Regression")
    
    def fit(self, X, y):
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        self.weights = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
        self.is_trained = True
        return self
    
    def predict(self, X):
        if not self.is_trained:
            raise Exception("Model not trained!")
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        return X_b @ self.weights

# TODO: Create LogisticRegression class
class LogisticRegression(Model):
    def __init__(self, learning_rate=0.01, iterations=1000):
        super().__init__("Logistic Regression")
        self.learning_rate = learning_rate
        self.iterations = iterations
    
    def _sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
    
    def fit(self, X, y):
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        self.weights = np.zeros(X_b.shape[1])
        
        for _ in range(self.iterations):
            predictions = self._sigmoid(X_b @ self.weights)
            gradient = X_b.T @ (predictions - y) / len(y)
            self.weights -= self.learning_rate * gradient
        
        self.is_trained = True
        return self
    
    def predict(self, X):
        if not self.is_trained:
            raise Exception("Model not trained!")
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        return (self._sigmoid(X_b @ self.weights) >= 0.5).astype(int)

# Test the models
np.random.seed(42)

print("=== Linear Regression ===")
X_reg = np.random.randn(100, 1)
y_reg = 3 * X_reg.squeeze() + 2 + np.random.randn(100) * 0.5

model_lr = LinearRegression()
print(f"Before training: {model_lr}")
model_lr.fit(X_reg, y_reg)
print(f"After training: {model_lr}")
print(f"Weights: {model_lr.weights}")

print("\\n=== Logistic Regression ===")
X_clf = np.random.randn(100, 2)
y_clf = (X_clf[:, 0] + X_clf[:, 1] > 0).astype(int)

model_log = LogisticRegression()
print(f"Before training: {model_log}")
model_log.fit(X_clf, y_clf)
print(f"After training: {model_log}")
print(f"Accuracy: {model_log.score(X_clf, y_clf):.2f}")
`
    },
    {
      title: 'NumPy Array Operations & Broadcasting',
      description: `
## NumPy Array Operations & Broadcasting

### Overview
NumPy is the foundation of scientific computing in Python. Understanding vectorized operations and broadcasting is crucial for efficient ML code.

### Key Concepts

**Vectorization**: Operations on entire arrays without loops
- Much faster than Python loops
- More readable and concise
- Essential for ML performance

**Broadcasting**: Automatic array shape matching
- Allows operations on arrays of different shapes
- Rules: dimensions are compatible if equal or one is 1
- Eliminates need for explicit loops

**Universal Functions (ufuncs)**: Fast element-wise operations
- Mathematical: np.sin, np.exp, np.log
- Comparison: np.maximum, np.minimum
- Logical: np.logical_and, np.logical_or

### Problem Statement
1. Normalize a dataset using broadcasting
2. Calculate pairwise distances between points
3. Apply activation functions efficiently

### Expected Output
- Normalized data
- Distance matrix
- Activated values
`,
      starterCode: `import numpy as np

# Create sample data
np.random.seed(42)
data = np.random.randn(5, 3) * 10 + 50  # 5 samples, 3 features

print("Original data:")
print(data)
print(f"Shape: {data.shape}")

# TODO: Normalize data (subtract mean, divide by std) using broadcasting
mean = 
std = 
normalized = 

print("\\nNormalized data:")
print(normalized)
print(f"Mean: {normalized.mean(axis=0)}")
print(f"Std: {normalized.std(axis=0)}")

# TODO: Calculate pairwise Euclidean distances
# For points A and B: distance = sqrt(sum((A - B)^2))
def pairwise_distances(X):
    # Expand dimensions for broadcasting
    X_expanded = X[:, np.newaxis, :]  # Shape: (n, 1, d)
    X_transposed = X[np.newaxis, :, :]  # Shape: (1, n, d)
    # Calculate squared differences and sum
    distances = 
    return distances

distances = pairwise_distances(data)
print("\\nPairwise distances:")
print(distances)
print(f"Shape: {distances.shape}")

# TODO: Apply ReLU activation function: max(0, x)
def relu(x):
    return 

# TODO: Apply sigmoid activation: 1 / (1 + exp(-x))
def sigmoid(x):
    return 

# Test activations
test_values = np.array([-2, -1, 0, 1, 2])
print("\\nActivation functions:")
print(f"Input: {test_values}")
print(f"ReLU: {relu(test_values)}")
print(f"Sigmoid: {sigmoid(test_values)}")

# TODO: Batch matrix multiplication example
# Simulate batch of 10 samples, each with 5 features
# Weight matrix: 5 features -> 3 outputs
batch = np.random.randn(10, 5)
weights = np.random.randn(5, 3)
output = 

print(f"\\nBatch processing:")
print(f"Batch shape: {batch.shape}")
print(f"Weights shape: {weights.shape}")
print(f"Output shape: {output.shape}")
`,
      solution: `import numpy as np

# Create sample data
np.random.seed(42)
data = np.random.randn(5, 3) * 10 + 50  # 5 samples, 3 features

print("Original data:")
print(data)
print(f"Shape: {data.shape}")

# Normalize data (subtract mean, divide by std) using broadcasting
mean = data.mean(axis=0)
std = data.std(axis=0)
normalized = (data - mean) / std

print("\\nNormalized data:")
print(normalized)
print(f"Mean: {normalized.mean(axis=0)}")
print(f"Std: {normalized.std(axis=0)}")

# Calculate pairwise Euclidean distances
def pairwise_distances(X):
    # Expand dimensions for broadcasting
    X_expanded = X[:, np.newaxis, :]  # Shape: (n, 1, d)
    X_transposed = X[np.newaxis, :, :]  # Shape: (1, n, d)
    # Calculate squared differences and sum
    distances = np.sqrt(np.sum((X_expanded - X_transposed)**2, axis=2))
    return distances

distances = pairwise_distances(data)
print("\\nPairwise distances:")
print(distances)
print(f"Shape: {distances.shape}")

# Apply ReLU activation function: max(0, x)
def relu(x):
    return np.maximum(0, x)

# Apply sigmoid activation: 1 / (1 + exp(-x))
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# Test activations
test_values = np.array([-2, -1, 0, 1, 2])
print("\\nActivation functions:")
print(f"Input: {test_values}")
print(f"ReLU: {relu(test_values)}")
print(f"Sigmoid: {sigmoid(test_values)}")

# Batch matrix multiplication example
batch = np.random.randn(10, 5)
weights = np.random.randn(5, 3)
output = batch @ weights

print(f"\\nBatch processing:")
print(f"Batch shape: {batch.shape}")
print(f"Weights shape: {weights.shape}")
print(f"Output shape: {output.shape}")
`,
      code: `import numpy as np

# Create sample data
np.random.seed(42)
data = np.random.randn(5, 3) * 10 + 50

print("Original data:")
print(data)
print(f"Shape: {data.shape}")

# TODO: Normalize data using broadcasting
mean = data.mean(axis=0)
std = data.std(axis=0)
normalized = (data - mean) / std

print("\\nNormalized data:")
print(normalized)
print(f"Mean: {normalized.mean(axis=0)}")
print(f"Std: {normalized.std(axis=0)}")

# TODO: Calculate pairwise Euclidean distances
def pairwise_distances(X):
    X_expanded = X[:, np.newaxis, :]
    X_transposed = X[np.newaxis, :, :]
    distances = np.sqrt(np.sum((X_expanded - X_transposed)**2, axis=2))
    return distances

distances = pairwise_distances(data)
print("\\nPairwise distances:")
print(distances)
print(f"Shape: {distances.shape}")

# TODO: Apply activation functions
def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

test_values = np.array([-2, -1, 0, 1, 2])
print("\\nActivation functions:")
print(f"Input: {test_values}")
print(f"ReLU: {relu(test_values)}")
print(f"Sigmoid: {sigmoid(test_values)}")

# TODO: Batch matrix multiplication
batch = np.random.randn(10, 5)
weights = np.random.randn(5, 3)
output = batch @ weights

print(f"\\nBatch processing:")
print(f"Batch shape: {batch.shape}")
print(f"Weights shape: {weights.shape}")
print(f"Output shape: {output.shape}")
`
    },
    {
      title: 'Pandas DataFrames & Data Manipulation',
      description: `
## Pandas DataFrames & Data Manipulation

### Overview
Pandas is the go-to library for data manipulation in Python. Essential for data preprocessing, feature engineering, and exploratory data analysis in ML projects.

### Key Concepts

**DataFrame**: 2D labeled data structure
- Like a spreadsheet or SQL table
- Columns can have different types
- Powerful indexing and selection

**Data Selection**: Multiple ways to access data
- .loc[]: Label-based indexing
- .iloc[]: Integer-based indexing
- Boolean indexing: df[df['col'] > 5]

**Data Transformation**:
- apply(): Apply function to rows/columns
- groupby(): Split-apply-combine operations
- merge/join: Combine datasets

### Problem Statement
1. Load and explore a dataset
2. Handle missing values
3. Create new features
4. Group and aggregate data

### Expected Output
- Dataset statistics
- Cleaned data
- New engineered features
- Grouped summaries
`,
      starterCode: `import pandas as pd
import numpy as np

# Create sample dataset
np.random.seed(42)
data = {
    'student_id': range(1, 11),
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
             'Frank', 'Grace', 'Henry', 'Iris', 'Jack'],
    'math_score': [85, 92, 78, np.nan, 88, 95, 82, 90, np.nan, 87],
    'science_score': [88, 85, 92, 79, np.nan, 91, 86, 88, 84, 90],
    'age': [20, 21, 20, 22, 21, 20, 21, 22, 20, 21],
    'city': ['NYC', 'LA', 'NYC', 'Chicago', 'LA', 
             'NYC', 'Chicago', 'LA', 'NYC', 'Chicago']
}

df = pd.DataFrame(data)

print("Original DataFrame:")
print(df)
print(f"\\nShape: {df.shape}")
print(f"\\nData types:\\n{df.dtypes}")

# TODO: Check for missing values
print("\\nMissing values:")
print()

# TODO: Fill missing values with column mean
df_filled = df.copy()


print("\\nAfter filling missing values:")
print(df_filled[['math_score', 'science_score']])

# TODO: Create new feature: average_score
df_filled['average_score'] = 

print("\\nWith average score:")
print(df_filled[['name', 'math_score', 'science_score', 'average_score']])

# TODO: Group by city and calculate mean scores
city_stats = 

print("\\nScores by city:")
print(city_stats)

# TODO: Filter students with average > 85
top_students = 

print("\\nTop students (avg > 85):")
print(top_students[['name', 'average_score', 'city']])

# TODO: Sort by average_score descending
sorted_df = 

print("\\nTop 3 students:")
print(sorted_df[['name', 'average_score']].head(3))
`,
      solution: `import pandas as pd
import numpy as np

# Create sample dataset
np.random.seed(42)
data = {
    'student_id': range(1, 11),
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
             'Frank', 'Grace', 'Henry', 'Iris', 'Jack'],
    'math_score': [85, 92, 78, np.nan, 88, 95, 82, 90, np.nan, 87],
    'science_score': [88, 85, 92, 79, np.nan, 91, 86, 88, 84, 90],
    'age': [20, 21, 20, 22, 21, 20, 21, 22, 20, 21],
    'city': ['NYC', 'LA', 'NYC', 'Chicago', 'LA', 
             'NYC', 'Chicago', 'LA', 'NYC', 'Chicago']
}

df = pd.DataFrame(data)

print("Original DataFrame:")
print(df)
print(f"\\nShape: {df.shape}")
print(f"\\nData types:\\n{df.dtypes}")

# Check for missing values
print("\\nMissing values:")
print(df.isnull().sum())

# Fill missing values with column mean
df_filled = df.copy()
df_filled['math_score'].fillna(df['math_score'].mean(), inplace=True)
df_filled['science_score'].fillna(df['science_score'].mean(), inplace=True)

print("\\nAfter filling missing values:")
print(df_filled[['math_score', 'science_score']])

# Create new feature: average_score
df_filled['average_score'] = (df_filled['math_score'] + df_filled['science_score']) / 2

print("\\nWith average score:")
print(df_filled[['name', 'math_score', 'science_score', 'average_score']])

# Group by city and calculate mean scores
city_stats = df_filled.groupby('city')[['math_score', 'science_score', 'average_score']].mean()

print("\\nScores by city:")
print(city_stats)

# Filter students with average > 85
top_students = df_filled[df_filled['average_score'] > 85]

print("\\nTop students (avg > 85):")
print(top_students[['name', 'average_score', 'city']])

# Sort by average_score descending
sorted_df = df_filled.sort_values('average_score', ascending=False)

print("\\nTop 3 students:")
print(sorted_df[['name', 'average_score']].head(3))
`,
      code: `import pandas as pd
import numpy as np

# Create sample dataset
np.random.seed(42)
data = {
    'student_id': range(1, 11),
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
             'Frank', 'Grace', 'Henry', 'Iris', 'Jack'],
    'math_score': [85, 92, 78, np.nan, 88, 95, 82, 90, np.nan, 87],
    'science_score': [88, 85, 92, 79, np.nan, 91, 86, 88, 84, 90],
    'age': [20, 21, 20, 22, 21, 20, 21, 22, 20, 21],
    'city': ['NYC', 'LA', 'NYC', 'Chicago', 'LA', 
             'NYC', 'Chicago', 'LA', 'NYC', 'Chicago']
}

df = pd.DataFrame(data)

print("Original DataFrame:")
print(df)
print(f"\\nShape: {df.shape}")

# TODO: Check for missing values
print("\\nMissing values:")
print(df.isnull().sum())

# TODO: Fill missing values with column mean
df_filled = df.copy()
df_filled['math_score'].fillna(df['math_score'].mean(), inplace=True)
df_filled['science_score'].fillna(df['science_score'].mean(), inplace=True)

print("\\nAfter filling missing values:")
print(df_filled[['math_score', 'science_score']])

# TODO: Create new feature: average_score
df_filled['average_score'] = (df_filled['math_score'] + df_filled['science_score']) / 2

print("\\nWith average score:")
print(df_filled[['name', 'math_score', 'science_score', 'average_score']])

# TODO: Group by city and calculate mean scores
city_stats = df_filled.groupby('city')[['math_score', 'science_score', 'average_score']].mean()

print("\\nScores by city:")
print(city_stats)

# TODO: Filter students with average > 85
top_students = df_filled[df_filled['average_score'] > 85]

print("\\nTop students (avg > 85):")
print(top_students[['name', 'average_score', 'city']])

# TODO: Sort by average_score descending
sorted_df = df_filled.sort_values('average_score', ascending=False)

print("\\nTop 3 students:")
print(sorted_df[['name', 'average_score']].head(3))
`
    },
    {
      title: 'NumPy Advanced: Indexing & Slicing',
      description: `
## NumPy Advanced: Indexing & Slicing

### Overview
Mastering NumPy indexing is crucial for efficient data manipulation in ML. Learn fancy indexing, boolean masking, and advanced slicing techniques.

### Key Concepts

**Basic Indexing**: Similar to Python lists
- arr[0], arr[-1], arr[1:5]
- Multi-dimensional: arr[row, col]

**Fancy Indexing**: Using arrays as indices
- arr[[0, 2, 4]] - select specific indices
- arr[[0, 1], [2, 3]] - select specific elements

**Boolean Masking**: Filter based on conditions
- arr[arr > 5] - select elements > 5
- arr[(arr > 5) & (arr < 10)] - multiple conditions

**Advanced Slicing**:
- arr[::2] - every 2nd element
- arr[::-1] - reverse array
- arr[1:, 2:] - 2D slicing

### Problem Statement
1. Create a 5x5 matrix of random integers
2. Extract diagonal elements
3. Filter values using boolean masks
4. Perform fancy indexing operations

### Expected Output
- Original matrix
- Diagonal elements
- Filtered values
- Selected elements
`,
      starterCode: `import numpy as np

np.random.seed(42)

# Create 5x5 matrix with random integers 0-100
matrix = np.random.randint(0, 100, size=(5, 5))

print("Original Matrix:")
print(matrix)

# TODO: Extract diagonal elements
diagonal = 

print("\\nDiagonal elements:", diagonal)

# TODO: Extract anti-diagonal (top-right to bottom-left)
anti_diagonal = 

print("Anti-diagonal elements:", anti_diagonal)

# TODO: Boolean masking - find all elements > 50
high_values = 

print(f"\\nValues > 50: {high_values}")
print(f"Count: {len(high_values)}")

# TODO: Multiple conditions - values between 30 and 70
mid_range = 

print(f"\\nValues between 30-70: {mid_range}")

# TODO: Fancy indexing - extract corners of matrix
corners_indices = ([0, 0, 4, 4], [0, 4, 0, 4])
corners = 

print(f"\\nCorner values: {corners}")

# TODO: Extract 2x2 submatrix from center
center = 

print("\\nCenter 2x2 submatrix:")
print(center)

# TODO: Replace all values > 75 with 75 (clipping)
clipped = matrix.copy()


print("\\nClipped matrix (max 75):")
print(clipped)

# TODO: Get indices where values are even
even_indices = 

print(f"\\nIndices of even values: {even_indices}")
print(f"Even values: {matrix[even_indices]}")
`,

      solution: `import numpy as np

np.random.seed(42)

# Create 5x5 matrix with random integers 0-100
matrix = np.random.randint(0, 100, size=(5, 5))

print("Original Matrix:")
print(matrix)

# Extract diagonal elements
diagonal = np.diag(matrix)

print("\\nDiagonal elements:", diagonal)

# Extract anti-diagonal
anti_diagonal = np.diag(np.fliplr(matrix))

print("Anti-diagonal elements:", anti_diagonal)

# Boolean masking - find all elements > 50
high_values = matrix[matrix > 50]

print(f"\\nValues > 50: {high_values}")
print(f"Count: {len(high_values)}")

# Multiple conditions - values between 30 and 70
mid_range = matrix[(matrix >= 30) & (matrix <= 70)]

print(f"\\nValues between 30-70: {mid_range}")

# Fancy indexing - extract corners
corners_indices = ([0, 0, 4, 4], [0, 4, 0, 4])
corners = matrix[corners_indices]

print(f"\\nCorner values: {corners}")

# Extract 2x2 submatrix from center
center = matrix[1:3, 1:3]

print("\\nCenter 2x2 submatrix:")
print(center)

# Replace all values > 75 with 75
clipped = matrix.copy()
clipped[clipped > 75] = 75

print("\\nClipped matrix (max 75):")
print(clipped)

# Get indices where values are even
even_indices = np.where(matrix % 2 == 0)

print(f"\\nIndices of even values: {even_indices}")
print(f"Even values: {matrix[even_indices]}")
`,
      code: `import numpy as np

np.random.seed(42)
matrix = np.random.randint(0, 100, size=(5, 5))

print("Original Matrix:")
print(matrix)

# TODO: Extract diagonal elements
diagonal = np.diag(matrix)
print("\\nDiagonal elements:", diagonal)

# TODO: Extract anti-diagonal
anti_diagonal = np.diag(np.fliplr(matrix))
print("Anti-diagonal elements:", anti_diagonal)

# TODO: Boolean masking
high_values = matrix[matrix > 50]
print(f"\\nValues > 50: {high_values}")
print(f"Count: {len(high_values)}")

# TODO: Multiple conditions
mid_range = matrix[(matrix >= 30) & (matrix <= 70)]
print(f"\\nValues between 30-70: {mid_range}")

# TODO: Fancy indexing - corners
corners_indices = ([0, 0, 4, 4], [0, 4, 0, 4])
corners = matrix[corners_indices]
print(f"\\nCorner values: {corners}")

# TODO: Extract center 2x2
center = matrix[1:3, 1:3]
print("\\nCenter 2x2 submatrix:")
print(center)

# TODO: Clipping
clipped = matrix.copy()
clipped[clipped > 75] = 75
print("\\nClipped matrix (max 75):")
print(clipped)

# TODO: Even indices
even_indices = np.where(matrix % 2 == 0)
print(f"\\nIndices of even values: {even_indices}")
print(f"Even values: {matrix[even_indices]}")
`
    },
    {
      title: 'Pandas Advanced: Time Series & Merging',
      description: `
## Pandas Advanced: Time Series & Merging

### Overview
Learn advanced Pandas operations essential for real-world data analysis: time series manipulation, merging datasets, and pivot tables.

### Key Concepts

**Time Series**: Working with dates and times
- pd.to_datetime(): Convert to datetime
- .dt accessor: Extract date components
- Resampling: Aggregate by time periods

**Merging DataFrames**: Combine multiple datasets
- merge(): SQL-style joins
- concat(): Stack DataFrames
- join(): Index-based merging

**Pivot Tables**: Reshape and aggregate data
- pivot_table(): Create summary tables
- groupby() + agg(): Custom aggregations

### Problem Statement
1. Create sales data with timestamps
2. Perform time-based analysis
3. Merge with product information
4. Create pivot tables

### Expected Output
- Daily/monthly sales summaries
- Merged dataset
- Pivot table analysis
`,
      starterCode: `import pandas as pd
import numpy as np

# Create sales data
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=100, freq='D')
sales_data = {
    'date': dates,
    'product_id': np.random.choice(['P001', 'P002', 'P003'], 100),
    'quantity': np.random.randint(1, 20, 100),
    'price': np.random.uniform(10, 100, 100).round(2)
}
sales_df = pd.DataFrame(sales_data)

# Product information
products_df = pd.DataFrame({
    'product_id': ['P001', 'P002', 'P003'],
    'product_name': ['Laptop', 'Mouse', 'Keyboard'],
    'category': ['Electronics', 'Accessories', 'Accessories']
})

print("Sales Data (first 10 rows):")
print(sales_df.head(10))

# TODO: Convert date to datetime and extract components
sales_df['date'] = 
sales_df['year'] = 
sales_df['month'] = 
sales_df['day_of_week'] = 

print("\\nWith date components:")
print(sales_df[['date', 'year', 'month', 'day_of_week']].head())

# TODO: Calculate total revenue
sales_df['revenue'] = 

print("\\nWith revenue:")
print(sales_df[['product_id', 'quantity', 'price', 'revenue']].head())

# TODO: Merge with product information
merged_df = 

print("\\nMerged data:")
print(merged_df.head())

# TODO: Group by month and product, calculate total revenue
monthly_sales = 

print("\\nMonthly sales by product:")
print(monthly_sales)

# TODO: Create pivot table - products vs months
pivot = 

print("\\nPivot table (Products vs Months):")
print(pivot)

# TODO: Resample to weekly frequency
sales_df_indexed = sales_df.set_index('date')
weekly_sales = 

print("\\nWeekly sales summary:")
print(weekly_sales.head())

# TODO: Find top 3 selling products
top_products = 

print("\\nTop 3 products by revenue:")
print(top_products)
`,
      solution: `import pandas as pd
import numpy as np

# Create sales data
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=100, freq='D')
sales_data = {
    'date': dates,
    'product_id': np.random.choice(['P001', 'P002', 'P003'], 100),
    'quantity': np.random.randint(1, 20, 100),
    'price': np.random.uniform(10, 100, 100).round(2)
}
sales_df = pd.DataFrame(sales_data)

# Product information
products_df = pd.DataFrame({
    'product_id': ['P001', 'P002', 'P003'],
    'product_name': ['Laptop', 'Mouse', 'Keyboard'],
    'category': ['Electronics', 'Accessories', 'Accessories']
})

print("Sales Data (first 10 rows):")
print(sales_df.head(10))

# Convert date and extract components
sales_df['date'] = pd.to_datetime(sales_df['date'])
sales_df['year'] = sales_df['date'].dt.year
sales_df['month'] = sales_df['date'].dt.month
sales_df['day_of_week'] = sales_df['date'].dt.day_name()

print("\\nWith date components:")
print(sales_df[['date', 'year', 'month', 'day_of_week']].head())

# Calculate revenue
sales_df['revenue'] = sales_df['quantity'] * sales_df['price']

print("\\nWith revenue:")
print(sales_df[['product_id', 'quantity', 'price', 'revenue']].head())

# Merge with product information
merged_df = pd.merge(sales_df, products_df, on='product_id', how='left')

print("\\nMerged data:")
print(merged_df.head())

# Group by month and product
monthly_sales = merged_df.groupby(['month', 'product_name'])['revenue'].sum().reset_index()

print("\\nMonthly sales by product:")
print(monthly_sales)

# Create pivot table
pivot = merged_df.pivot_table(values='revenue', index='product_name', 
                               columns='month', aggfunc='sum', fill_value=0)

print("\\nPivot table (Products vs Months):")
print(pivot)

# Resample to weekly
sales_df_indexed = sales_df.set_index('date')
weekly_sales = sales_df_indexed.resample('W')['revenue'].sum()

print("\\nWeekly sales summary:")
print(weekly_sales.head())

# Top 3 products
top_products = merged_df.groupby('product_name')['revenue'].sum().sort_values(ascending=False).head(3)

print("\\nTop 3 products by revenue:")
print(top_products)
`,
      code: `import pandas as pd
import numpy as np

# Create sales data
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=100, freq='D')
sales_data = {
    'date': dates,
    'product_id': np.random.choice(['P001', 'P002', 'P003'], 100),
    'quantity': np.random.randint(1, 20, 100),
    'price': np.random.uniform(10, 100, 100).round(2)
}
sales_df = pd.DataFrame(sales_data)

products_df = pd.DataFrame({
    'product_id': ['P001', 'P002', 'P003'],
    'product_name': ['Laptop', 'Mouse', 'Keyboard'],
    'category': ['Electronics', 'Accessories', 'Accessories']
})

print("Sales Data:")
print(sales_df.head(10))

# TODO: Date operations
sales_df['date'] = pd.to_datetime(sales_df['date'])
sales_df['year'] = sales_df['date'].dt.year
sales_df['month'] = sales_df['date'].dt.month
sales_df['day_of_week'] = sales_df['date'].dt.day_name()

# TODO: Calculate revenue
sales_df['revenue'] = sales_df['quantity'] * sales_df['price']

# TODO: Merge datasets
merged_df = pd.merge(sales_df, products_df, on='product_id', how='left')
print("\\nMerged data:")
print(merged_df.head())

# TODO: Group by month and product
monthly_sales = merged_df.groupby(['month', 'product_name'])['revenue'].sum().reset_index()
print("\\nMonthly sales:")
print(monthly_sales)

# TODO: Pivot table
pivot = merged_df.pivot_table(values='revenue', index='product_name', 
                               columns='month', aggfunc='sum', fill_value=0)
print("\\nPivot table:")
print(pivot)

# TODO: Resample weekly
sales_df_indexed = sales_df.set_index('date')
weekly_sales = sales_df_indexed.resample('W')['revenue'].sum()
print("\\nWeekly sales:")
print(weekly_sales.head())

# TODO: Top products
top_products = merged_df.groupby('product_name')['revenue'].sum().sort_values(ascending=False).head(3)
print("\\nTop 3 products:")
print(top_products)
`
    },
    {
      title: 'Matplotlib Fundamentals: Plots & Customization',
      description: `
## Matplotlib Fundamentals

### Overview
Matplotlib is the foundation of data visualization in Python. Master creating and customizing plots for effective data communication.

### Key Concepts

**Figure and Axes**: Core components
- Figure: The entire plot window
- Axes: Individual plot area
- Subplots: Multiple plots in one figure

**Plot Types**:
- Line plots: Trends over time
- Scatter plots: Relationships between variables
- Bar plots: Categorical comparisons
- Histograms: Data distributions

**Customization**:
- Colors, markers, line styles
- Labels, titles, legends
- Grid, ticks, spines
- Figure size and DPI

### Problem Statement
Create a comprehensive visualization dashboard with:
1. Line plot showing trends
2. Scatter plot with correlations
3. Bar chart for comparisons
4. Histogram for distributions

### Expected Output
- Multi-panel figure with 4 subplots
- Customized colors and styles
- Proper labels and legends
`,
      starterCode: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# Generate sample data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# Scatter data
scatter_x = np.random.randn(100)
scatter_y = 2 * scatter_x + np.random.randn(100)

# Bar data
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 32]

# Histogram data
hist_data = np.random.normal(100, 15, 1000)

# TODO: Create figure with 2x2 subplots
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# TODO: Plot 1 - Line plot
axes[0, 0].plot(x, y1, label='sin(x)', color='blue', linewidth=2)
axes[0, 0].plot(x, y2, label='cos(x)', color='red', linewidth=2, linestyle='--')
axes[0, 0].set_title('Trigonometric Functions', fontsize=14, fontweight='bold')
axes[0, 0].set_xlabel('X')
axes[0, 0].set_ylabel('Y')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

# TODO: Plot 2 - Scatter plot
axes[0, 1].scatter(scatter_x, scatter_y, alpha=0.6, c=scatter_y, cmap='viridis', s=50)
axes[0, 1].set_title('Scatter Plot with Correlation', fontsize=14, fontweight='bold')
axes[0, 1].set_xlabel('X')
axes[0, 1].set_ylabel('Y')
axes[0, 1].grid(True, alpha=0.3)

# Add trend line
z = np.polyfit(scatter_x, scatter_y, 1)
p = np.poly1d(z)
axes[0, 1].plot(scatter_x, p(scatter_x), "r--", alpha=0.8, linewidth=2, label='Trend')
axes[0, 1].legend()

# TODO: Plot 3 - Bar chart
bars = axes[1, 0].bar(categories, values, color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'], 
                       edgecolor='black', linewidth=1.5)
axes[1, 0].set_title('Category Comparison', fontsize=14, fontweight='bold')
axes[1, 0].set_xlabel('Category')
axes[1, 0].set_ylabel('Value')
axes[1, 0].grid(True, alpha=0.3, axis='y')

# Add value labels on bars
for bar in bars:
    height = bar.get_height()
    axes[1, 0].text(bar.get_x() + bar.get_width()/2., height,
                    f'{height}', ha='center', va='bottom', fontweight='bold')

# TODO: Plot 4 - Histogram
axes[1, 1].hist(hist_data, bins=30, color='skyblue', edgecolor='black', alpha=0.7)
axes[1, 1].axvline(hist_data.mean(), color='red', linestyle='--', linewidth=2, label=f'Mean: {hist_data.mean():.1f}')
axes[1, 1].set_title('Distribution Histogram', fontsize=14, fontweight='bold')
axes[1, 1].set_xlabel('Value')
axes[1, 1].set_ylabel('Frequency')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3, axis='y')

# Overall title
fig.suptitle('Matplotlib Visualization Dashboard', fontsize=16, fontweight='bold', y=0.995)

plt.tight_layout()
plt.show()

print("Dashboard created successfully!")
`,
      solution: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# Generate sample data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

scatter_x = np.random.randn(100)
scatter_y = 2 * scatter_x + np.random.randn(100)

categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 32]

hist_data = np.random.normal(100, 15, 1000)

# Create figure with 2x2 subplots
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Plot 1 - Line plot
axes[0, 0].plot(x, y1, label='sin(x)', color='blue', linewidth=2)
axes[0, 0].plot(x, y2, label='cos(x)', color='red', linewidth=2, linestyle='--')
axes[0, 0].set_title('Trigonometric Functions', fontsize=14, fontweight='bold')
axes[0, 0].set_xlabel('X')
axes[0, 0].set_ylabel('Y')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

# Plot 2 - Scatter plot
axes[0, 1].scatter(scatter_x, scatter_y, alpha=0.6, c=scatter_y, cmap='viridis', s=50)
axes[0, 1].set_title('Scatter Plot with Correlation', fontsize=14, fontweight='bold')
axes[0, 1].set_xlabel('X')
axes[0, 1].set_ylabel('Y')
axes[0, 1].grid(True, alpha=0.3)

z = np.polyfit(scatter_x, scatter_y, 1)
p = np.poly1d(z)
axes[0, 1].plot(scatter_x, p(scatter_x), "r--", alpha=0.8, linewidth=2, label='Trend')
axes[0, 1].legend()

# Plot 3 - Bar chart
bars = axes[1, 0].bar(categories, values, color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'], 
                       edgecolor='black', linewidth=1.5)
axes[1, 0].set_title('Category Comparison', fontsize=14, fontweight='bold')
axes[1, 0].set_xlabel('Category')
axes[1, 0].set_ylabel('Value')
axes[1, 0].grid(True, alpha=0.3, axis='y')

for bar in bars:
    height = bar.get_height()
    axes[1, 0].text(bar.get_x() + bar.get_width()/2., height,
                    f'{height}', ha='center', va='bottom', fontweight='bold')

# Plot 4 - Histogram
axes[1, 1].hist(hist_data, bins=30, color='skyblue', edgecolor='black', alpha=0.7)
axes[1, 1].axvline(hist_data.mean(), color='red', linestyle='--', linewidth=2, label=f'Mean: {hist_data.mean():.1f}')
axes[1, 1].set_title('Distribution Histogram', fontsize=14, fontweight='bold')
axes[1, 1].set_xlabel('Value')
axes[1, 1].set_ylabel('Frequency')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3, axis='y')

fig.suptitle('Matplotlib Visualization Dashboard', fontsize=16, fontweight='bold', y=0.995)

plt.tight_layout()
plt.show()

print("Dashboard created successfully!")
`,
      code: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# Generate data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

scatter_x = np.random.randn(100)
scatter_y = 2 * scatter_x + np.random.randn(100)

categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 32]

hist_data = np.random.normal(100, 15, 1000)

# Create 2x2 subplots
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Line plot
axes[0, 0].plot(x, y1, label='sin(x)', color='blue', linewidth=2)
axes[0, 0].plot(x, y2, label='cos(x)', color='red', linewidth=2, linestyle='--')
axes[0, 0].set_title('Trigonometric Functions', fontsize=14, fontweight='bold')
axes[0, 0].set_xlabel('X')
axes[0, 0].set_ylabel('Y')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

# Scatter plot
axes[0, 1].scatter(scatter_x, scatter_y, alpha=0.6, c=scatter_y, cmap='viridis', s=50)
axes[0, 1].set_title('Scatter Plot', fontsize=14, fontweight='bold')
axes[0, 1].set_xlabel('X')
axes[0, 1].set_ylabel('Y')
axes[0, 1].grid(True, alpha=0.3)

z = np.polyfit(scatter_x, scatter_y, 1)
p = np.poly1d(z)
axes[0, 1].plot(scatter_x, p(scatter_x), "r--", alpha=0.8, linewidth=2, label='Trend')
axes[0, 1].legend()

# Bar chart
bars = axes[1, 0].bar(categories, values, color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'], 
                       edgecolor='black', linewidth=1.5)
axes[1, 0].set_title('Category Comparison', fontsize=14, fontweight='bold')
axes[1, 0].set_xlabel('Category')
axes[1, 0].set_ylabel('Value')
axes[1, 0].grid(True, alpha=0.3, axis='y')

for bar in bars:
    height = bar.get_height()
    axes[1, 0].text(bar.get_x() + bar.get_width()/2., height,
                    f'{height}', ha='center', va='bottom', fontweight='bold')

# Histogram
axes[1, 1].hist(hist_data, bins=30, color='skyblue', edgecolor='black', alpha=0.7)
axes[1, 1].axvline(hist_data.mean(), color='red', linestyle='--', linewidth=2, label=f'Mean: {hist_data.mean():.1f}')
axes[1, 1].set_title('Distribution', fontsize=14, fontweight='bold')
axes[1, 1].set_xlabel('Value')
axes[1, 1].set_ylabel('Frequency')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3, axis='y')

fig.suptitle('Matplotlib Dashboard', fontsize=16, fontweight='bold', y=0.995)
plt.tight_layout()
plt.show()
`
    },
    {
      title: 'Seaborn: Statistical Visualizations',
      description: `
## Seaborn: Statistical Visualizations

### Overview
Seaborn builds on Matplotlib to provide beautiful statistical visualizations with less code. Perfect for exploratory data analysis and presenting insights.

### Key Concepts

**Statistical Plots**:
- distplot/histplot: Distributions
- boxplot/violinplot: Statistical summaries
- heatmap: Correlation matrices
- pairplot: Multi-variable relationships

**Categorical Plots**:
- barplot: Mean values with confidence intervals
- countplot: Frequency counts
- boxplot: Distribution by category

**Regression Plots**:
- regplot: Linear regression with confidence interval
- lmplot: Regression across facets

**Styling**:
- Built-in themes: darkgrid, whitegrid, dark, white
- Color palettes: deep, muted, pastel, bright
- Context: paper, notebook, talk, poster

### Problem Statement
Analyze a dataset using Seaborn:
1. Distribution analysis
2. Correlation heatmap
3. Categorical comparisons
4. Regression analysis

### Expected Output
- Multiple statistical visualizations
- Correlation matrix
- Styled plots with themes
`,
      starterCode: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Set seaborn style
sns.set_style("whitegrid")
sns.set_palette("husl")

# Create sample dataset
np.random.seed(42)
n = 200

data = pd.DataFrame({
    'age': np.random.randint(20, 60, n),
    'income': np.random.normal(50000, 15000, n),
    'education_years': np.random.randint(12, 20, n),
    'experience': np.random.randint(0, 30, n),
    'department': np.random.choice(['Sales', 'Engineering', 'Marketing', 'HR'], n),
    'satisfaction': np.random.randint(1, 11, n)
})

# Add correlation
data['income'] = data['income'] + data['education_years'] * 2000 + data['experience'] * 1000

print("Dataset Info:")
print(data.head())
print(f"\\nShape: {data.shape}")

# TODO: Create figure with multiple subplots
fig = plt.figure(figsize=(16, 12))

# TODO: Plot 1 - Distribution of income
plt.subplot(2, 3, 1)
sns.histplot(data['income'], kde=True, color='skyblue', bins=30)
plt.title('Income Distribution', fontsize=14, fontweight='bold')
plt.xlabel('Income ($)')

# TODO: Plot 2 - Box plot by department
plt.subplot(2, 3, 2)
sns.boxplot(data=data, x='department', y='income', palette='Set2')
plt.title('Income by Department', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)
plt.ylabel('Income ($)')

# TODO: Plot 3 - Violin plot
plt.subplot(2, 3, 3)
sns.violinplot(data=data, x='department', y='satisfaction', palette='muted')
plt.title('Satisfaction by Department', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)

# TODO: Plot 4 - Correlation heatmap
plt.subplot(2, 3, 4)
numeric_cols = ['age', 'income', 'education_years', 'experience', 'satisfaction']
correlation = data[numeric_cols].corr()
sns.heatmap(correlation, annot=True, fmt='.2f', cmap='coolwarm', 
            square=True, linewidths=1, cbar_kws={"shrink": 0.8})
plt.title('Correlation Matrix', fontsize=14, fontweight='bold')

# TODO: Plot 5 - Scatter with regression
plt.subplot(2, 3, 5)
sns.regplot(data=data, x='education_years', y='income', 
            scatter_kws={'alpha':0.5}, line_kws={'color':'red', 'linewidth':2})
plt.title('Education vs Income', fontsize=14, fontweight='bold')
plt.xlabel('Years of Education')
plt.ylabel('Income ($)')

# TODO: Plot 6 - Count plot
plt.subplot(2, 3, 6)
sns.countplot(data=data, x='department', palette='pastel', edgecolor='black')
plt.title('Employee Count by Department', fontsize=14, fontweight='bold')
plt.xlabel('Department')
plt.ylabel('Count')
plt.xticks(rotation=45)

plt.suptitle('Seaborn Statistical Analysis Dashboard', fontsize=16, fontweight='bold', y=0.995)
plt.tight_layout()
plt.show()

print("\\nStatistical Summary:")
print(data.groupby('department')['income'].describe())
`,
      solution: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

sns.set_style("whitegrid")
sns.set_palette("husl")

np.random.seed(42)
n = 200

data = pd.DataFrame({
    'age': np.random.randint(20, 60, n),
    'income': np.random.normal(50000, 15000, n),
    'education_years': np.random.randint(12, 20, n),
    'experience': np.random.randint(0, 30, n),
    'department': np.random.choice(['Sales', 'Engineering', 'Marketing', 'HR'], n),
    'satisfaction': np.random.randint(1, 11, n)
})

data['income'] = data['income'] + data['education_years'] * 2000 + data['experience'] * 1000

print("Dataset Info:")
print(data.head())

fig = plt.figure(figsize=(16, 12))

# Distribution
plt.subplot(2, 3, 1)
sns.histplot(data['income'], kde=True, color='skyblue', bins=30)
plt.title('Income Distribution', fontsize=14, fontweight='bold')
plt.xlabel('Income ($)')

# Box plot
plt.subplot(2, 3, 2)
sns.boxplot(data=data, x='department', y='income', palette='Set2')
plt.title('Income by Department', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)

# Violin plot
plt.subplot(2, 3, 3)
sns.violinplot(data=data, x='department', y='satisfaction', palette='muted')
plt.title('Satisfaction by Department', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)

# Heatmap
plt.subplot(2, 3, 4)
numeric_cols = ['age', 'income', 'education_years', 'experience', 'satisfaction']
correlation = data[numeric_cols].corr()
sns.heatmap(correlation, annot=True, fmt='.2f', cmap='coolwarm', 
            square=True, linewidths=1, cbar_kws={"shrink": 0.8})
plt.title('Correlation Matrix', fontsize=14, fontweight='bold')

# Regression
plt.subplot(2, 3, 5)
sns.regplot(data=data, x='education_years', y='income', 
            scatter_kws={'alpha':0.5}, line_kws={'color':'red', 'linewidth':2})
plt.title('Education vs Income', fontsize=14, fontweight='bold')

# Count plot
plt.subplot(2, 3, 6)
sns.countplot(data=data, x='department', palette='pastel', edgecolor='black')
plt.title('Employee Count', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)

plt.suptitle('Seaborn Statistical Analysis', fontsize=16, fontweight='bold', y=0.995)
plt.tight_layout()
plt.show()

print("\\nStatistical Summary:")
print(data.groupby('department')['income'].describe())
`,
      code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

sns.set_style("whitegrid")
sns.set_palette("husl")

np.random.seed(42)
n = 200

data = pd.DataFrame({
    'age': np.random.randint(20, 60, n),
    'income': np.random.normal(50000, 15000, n),
    'education_years': np.random.randint(12, 20, n),
    'experience': np.random.randint(0, 30, n),
    'department': np.random.choice(['Sales', 'Engineering', 'Marketing', 'HR'], n),
    'satisfaction': np.random.randint(1, 11, n)
})

data['income'] = data['income'] + data['education_years'] * 2000 + data['experience'] * 1000

print("Dataset:")
print(data.head())

fig = plt.figure(figsize=(16, 12))

# Distribution
plt.subplot(2, 3, 1)
sns.histplot(data['income'], kde=True, color='skyblue', bins=30)
plt.title('Income Distribution', fontsize=14, fontweight='bold')

# Box plot
plt.subplot(2, 3, 2)
sns.boxplot(data=data, x='department', y='income', palette='Set2')
plt.title('Income by Department', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)

# Violin plot
plt.subplot(2, 3, 3)
sns.violinplot(data=data, x='department', y='satisfaction', palette='muted')
plt.title('Satisfaction', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)

# Heatmap
plt.subplot(2, 3, 4)
numeric_cols = ['age', 'income', 'education_years', 'experience', 'satisfaction']
correlation = data[numeric_cols].corr()
sns.heatmap(correlation, annot=True, fmt='.2f', cmap='coolwarm', square=True, linewidths=1)
plt.title('Correlation Matrix', fontsize=14, fontweight='bold')

# Regression
plt.subplot(2, 3, 5)
sns.regplot(data=data, x='education_years', y='income', 
            scatter_kws={'alpha':0.5}, line_kws={'color':'red', 'linewidth':2})
plt.title('Education vs Income', fontsize=14, fontweight='bold')

# Count plot
plt.subplot(2, 3, 6)
sns.countplot(data=data, x='department', palette='pastel', edgecolor='black')
plt.title('Employee Count', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)

plt.suptitle('Seaborn Analysis', fontsize=16, fontweight='bold', y=0.995)
plt.tight_layout()
plt.show()

print("\\nSummary:")
print(data.groupby('department')['income'].describe())
`
    },
    {
      title: 'Testing with pytest',
      description: `
## Testing with pytest

### Overview
Testing ensures your code works correctly and continues working as you make changes. pytest is the most popular Python testing framework, offering a simple and powerful way to write tests.

### Key Concepts

**Writing Tests**:
- Test functions start with \`test_\`
- Use \`assert\` statements for checks
- Group related tests in classes (optional)
- pytest discovers tests automatically

**Fixtures**:
- Reusable setup/teardown code
- \`@pytest.fixture\` decorator
- Scoped: function, class, module, session
- Dependency injection via function parameters

**Parametrize**:
- Run same test with different inputs
- \`@pytest.mark.parametrize\` decorator
- Test edge cases efficiently

**Testing ML Components**:
- Test data preprocessing functions
- Validate model input/output shapes
- Check reproducibility with fixed seeds
- Test pipeline components in isolation

### Problem Statement
1. Write unit tests for data processing functions
2. Use fixtures for test data setup
3. Parametrize tests for multiple inputs
4. Test an ML pipeline component
`,
      starterCode: `import pytest
import numpy as np

# Functions to test
def normalize(data):
    """Normalize data to [0, 1] range"""
    min_val = min(data)
    max_val = max(data)
    if max_val == min_val:
        return [0.0] * len(data)
    return [(x - min_val) / (max_val - min_val) for x in data]

def remove_outliers(data, threshold=2.0):
    """Remove values beyond threshold standard deviations"""
    mean = np.mean(data)
    std = np.std(data)
    return [x for x in data if abs(x - mean) <= threshold * std]

def encode_labels(labels):
    """Encode string labels to integers"""
    unique = sorted(set(labels))
    mapping = {label: i for i, label in enumerate(unique)}
    return [mapping[label] for label in labels], mapping

# TODO: Write test for normalize function
def test_normalize_basic():
    result = normalize([1, 2, 3, 4, 5])
    assert result[0] == 0.0
    assert result[-1] == 1.0

# TODO: Write test for edge case
def test_normalize_same_values():
    pass

# TODO: Write parametrized test
# @pytest.mark.parametrize("input_data,expected_min,expected_max", [...])
def test_normalize_parametrized():
    pass

# TODO: Write test for remove_outliers
def test_remove_outliers():
    pass

# TODO: Write test for encode_labels
def test_encode_labels():
    pass

print("All test function stubs created")
`,
      solution: `import pytest
import numpy as np

def normalize(data):
    """Normalize data to [0, 1] range"""
    min_val = min(data)
    max_val = max(data)
    if max_val == min_val:
        return [0.0] * len(data)
    return [(x - min_val) / (max_val - min_val) for x in data]

def remove_outliers(data, threshold=2.0):
    """Remove values beyond threshold standard deviations"""
    mean = np.mean(data)
    std = np.std(data)
    return [x for x in data if abs(x - mean) <= threshold * std]

def encode_labels(labels):
    """Encode string labels to integers"""
    unique = sorted(set(labels))
    mapping = {label: i for i, label in enumerate(unique)}
    return [mapping[label] for label in labels], mapping

# Basic test
def test_normalize_basic():
    result = normalize([1, 2, 3, 4, 5])
    assert result[0] == 0.0
    assert result[-1] == 1.0
    assert len(result) == 5
    assert all(0 <= x <= 1 for x in result)

# Edge case
def test_normalize_same_values():
    result = normalize([5, 5, 5])
    assert result == [0.0, 0.0, 0.0]

def test_normalize_negative():
    result = normalize([-10, 0, 10])
    assert result[0] == 0.0
    assert result[1] == 0.5
    assert result[-1] == 1.0

# Parametrized test
test_cases = [
    ([1, 2, 3], 0.0, 1.0),
    ([0, 100], 0.0, 1.0),
    ([-5, 0, 5], 0.0, 1.0),
]

for input_data, expected_min, expected_max in test_cases:
    result = normalize(input_data)
    assert result[0] == expected_min, f"Failed for {input_data}"
    assert result[-1] == expected_max, f"Failed for {input_data}"

# Test remove_outliers
def test_remove_outliers():
    data = [1, 2, 3, 4, 5, 100]  # 100 is an outlier
    result = remove_outliers(data, threshold=2.0)
    assert 100 not in result
    assert len(result) < len(data)

def test_remove_outliers_no_outliers():
    data = [1, 2, 3, 4, 5]
    result = remove_outliers(data, threshold=3.0)
    assert len(result) == len(data)

# Test encode_labels
def test_encode_labels():
    labels = ['cat', 'dog', 'cat', 'bird']
    encoded, mapping = encode_labels(labels)
    assert len(encoded) == 4
    assert mapping['bird'] == 0  # sorted alphabetically
    assert mapping['cat'] == 1
    assert mapping['dog'] == 2
    assert encoded[0] == encoded[2]  # both 'cat'

# Run all tests
all_tests = [
    test_normalize_basic, test_normalize_same_values,
    test_normalize_negative, test_remove_outliers,
    test_remove_outliers_no_outliers, test_encode_labels
]

for test in all_tests:
    try:
        test()
        print(f"PASSED: {test.__name__}")
    except AssertionError as e:
        print(f"FAILED: {test.__name__} - {e}")

print(f"\\n{len(all_tests)} tests completed")
`,
      code: `import numpy as np

def normalize(data):
    min_val, max_val = min(data), max(data)
    if max_val == min_val:
        return [0.0] * len(data)
    return [(x - min_val) / (max_val - min_val) for x in data]

def remove_outliers(data, threshold=2.0):
    mean, std = np.mean(data), np.std(data)
    return [x for x in data if abs(x - mean) <= threshold * std]

def encode_labels(labels):
    unique = sorted(set(labels))
    mapping = {label: i for i, label in enumerate(unique)}
    return [mapping[label] for label in labels], mapping

# Test suite
tests = [
    ("normalize basic", lambda: assert_eq(normalize([1,2,3,4,5])[0], 0.0)),
    ("normalize same", lambda: assert_eq(normalize([5,5,5]), [0.0,0.0,0.0])),
    ("outliers removed", lambda: assert_true(100 not in remove_outliers([1,2,3,4,5,100]))),
    ("encode labels", lambda: assert_eq(encode_labels(['cat','dog','cat'])[0], [0,1,0])),
]

def assert_eq(a, b): assert a == b, f"{a} != {b}"
def assert_true(x): assert x, "Assertion failed"

for name, test in tests:
    try:
        test()
        print(f"PASSED: {name}")
    except (AssertionError, Exception) as e:
        print(f"FAILED: {name} - {e}")
`
    },
    {
      title: 'Virtual Environments & Dependency Management',
      description: `
## Virtual Environments & Dependency Management

### Overview
Virtual environments isolate project dependencies, preventing conflicts between projects. Proper dependency management ensures reproducible ML experiments.

### Key Concepts

**venv (Built-in)**:
- \`python -m venv myenv\` — Create environment
- \`source myenv/bin/activate\` (Linux/Mac) or \`myenv\\Scripts\\activate\` (Windows)
- \`pip install package_name\` — Install packages
- \`pip freeze > requirements.txt\` — Export dependencies

**requirements.txt**:
- Lists all packages with versions
- \`pip install -r requirements.txt\` — Reproduce environment
- Pin exact versions for reproducibility

**Poetry (Modern Alternative)**:
- \`poetry init\` — Initialize project
- \`poetry add package\` — Add dependency
- \`pyproject.toml\` — Project configuration
- Automatic dependency resolution

**ML Project Best Practices**:
- Separate dev and production dependencies
- Pin versions for reproducibility
- Use .python-version file
- Document environment setup in README

### Problem Statement
1. Understand virtual environment workflow
2. Create and manage requirements files
3. Organize ML project dependencies
4. Compare dependency management tools
`,
      starterCode: `import sys
import os

# Understanding Virtual Environments
print("=== Python Environment Info ===")
print(f"Python executable: {sys.executable}")
print(f"Python version: {sys.version}")
print(f"Python path:")
for path in sys.path[:5]:
    print(f"  {path}")

# TODO: Simulate creating a requirements.txt
ml_dependencies = {
    'numpy': '1.24.3',
    'pandas': '2.0.3',
    'scikit-learn': '1.3.0',
    'matplotlib': '3.7.2',
    'tensorflow': '2.13.0',
}

dev_dependencies = {
    'pytest': '7.4.0',
    'black': '23.7.0',
    'flake8': '6.1.0',
    'mypy': '1.4.1',
}

# TODO: Generate requirements.txt content
def generate_requirements(deps, filename='requirements.txt'):
    pass

# TODO: Generate pyproject.toml content
def generate_pyproject(project_name, ml_deps, dev_deps):
    pass

print("\\nGenerate dependency files for an ML project")
`,
      solution: `import sys
import os

print("=== Python Environment Info ===")
print(f"Python executable: {sys.executable}")
print(f"Python version: {sys.version}")
print(f"Python path:")
for path in sys.path[:5]:
    print(f"  {path}")

ml_dependencies = {
    'numpy': '1.24.3',
    'pandas': '2.0.3',
    'scikit-learn': '1.3.0',
    'matplotlib': '3.7.2',
    'tensorflow': '2.13.0',
}

dev_dependencies = {
    'pytest': '7.4.0',
    'black': '23.7.0',
    'flake8': '6.1.0',
    'mypy': '1.4.1',
}

def generate_requirements(deps, filename='requirements.txt'):
    lines = [f"{pkg}=={ver}" for pkg, ver in sorted(deps.items())]
    content = '\\n'.join(lines)
    print(f"\\n=== {filename} ===")
    print(content)
    return content

def generate_pyproject(project_name, ml_deps, dev_deps):
    deps_str = '\\n'.join(f'    "{pkg} = ^{ver}",' for pkg, ver in ml_deps.items())
    dev_str = '\\n'.join(f'    "{pkg} = ^{ver}",' for pkg, ver in dev_deps.items())
    
    toml = f"""[tool.poetry]
name = "{project_name}"
version = "0.1.0"
description = "ML Project"

[tool.poetry.dependencies]
python = "^3.10"
{deps_str}

[tool.poetry.group.dev.dependencies]
{dev_str}

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
"""
    print(f"\\n=== pyproject.toml ===")
    print(toml)
    return toml

# Generate all dependency files
generate_requirements(ml_dependencies, 'requirements.txt')
generate_requirements(dev_dependencies, 'requirements-dev.txt')

all_deps = {**ml_dependencies, **dev_dependencies}
generate_requirements(all_deps, 'requirements-all.txt')

generate_pyproject('ml-project', ml_dependencies, dev_dependencies)

# Show common commands
print("\\n=== Common Commands ===")
commands = [
    "python -m venv .venv",
    ".venv/Scripts/activate  (Windows)",
    "source .venv/bin/activate  (Linux/Mac)",
    "pip install -r requirements.txt",
    "pip freeze > requirements.txt",
    "poetry install",
    "poetry add numpy pandas scikit-learn",
]
for cmd in commands:
    print(f"  $ {cmd}")
`,
      code: `import sys

print(f"Python: {sys.executable}")
print(f"Version: {sys.version}")

ml_deps = {
    'numpy': '1.24.3', 'pandas': '2.0.3',
    'scikit-learn': '1.3.0', 'matplotlib': '3.7.2', 'tensorflow': '2.13.0'
}
dev_deps = {'pytest': '7.4.0', 'black': '23.7.0', 'flake8': '6.1.0'}

print("\\n=== requirements.txt ===")
for pkg, ver in sorted(ml_deps.items()):
    print(f"{pkg}=={ver}")

print("\\n=== requirements-dev.txt ===")
for pkg, ver in sorted(dev_deps.items()):
    print(f"{pkg}=={ver}")

print("\\n=== Setup Commands ===")
for cmd in ["python -m venv .venv", "pip install -r requirements.txt", "pip freeze"]:
    print(f"  $ {cmd}")
`
    },
    {
      title: 'Logging & Debugging',
      description: `
## Logging & Debugging

### Overview
Proper logging and debugging techniques are essential for developing and maintaining ML systems. The logging module provides structured output, while debugging tools help identify issues quickly.

### Key Concepts

**Logging Levels**:
- DEBUG: Detailed diagnostic info
- INFO: General operational events
- WARNING: Something unexpected but not critical
- ERROR: Something failed
- CRITICAL: Program may not continue

**Logging Configuration**:
- \`logging.basicConfig()\` — Simple setup
- Handlers: Console, file, rotating file
- Formatters: Control message format
- Multiple loggers for different modules

**Debugging Tools**:
- \`breakpoint()\` / \`pdb\` — Interactive debugger
- \`print()\` debugging — Quick but messy
- IDE debuggers — Visual breakpoints

**ML-Specific Logging**:
- Log training metrics (loss, accuracy per epoch)
- Log hyperparameters and experiment configs
- Log data statistics (shape, distribution)
- Time long operations

### Problem Statement
1. Set up logging with different levels and handlers
2. Log ML training progress
3. Create a timing utility using logging
4. Build a simple experiment logger
`,
      starterCode: `import logging
import time
import numpy as np

# TODO: Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger('ml_pipeline')

# TODO: Create a timed operation context manager
class TimedOperation:
    def __init__(self, name, logger):
        self.name = name
        self.logger = logger
    
    def __enter__(self):
        self.start = time.time()
        self.logger.info(f"Starting: {self.name}")
        return self
    
    def __exit__(self, *args):
        elapsed = time.time() - self.start
        self.logger.info(f"Completed: {self.name} ({elapsed:.2f}s)")

# TODO: Create experiment logger
class ExperimentLogger:
    def __init__(self, experiment_name):
        self.experiment_name = experiment_name
        self.metrics = {}
    
    def log_params(self, params):
        pass
    
    def log_metric(self, name, value, step):
        pass
    
    def summary(self):
        pass

# TODO: Simulate ML training with logging
np.random.seed(42)
logger.info("Starting ML pipeline")

print("Logging setup complete")
`,
      solution: `import logging
import time
import numpy as np

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger('ml_pipeline')

class TimedOperation:
    def __init__(self, name, log):
        self.name = name
        self.log = log
    
    def __enter__(self):
        self.start = time.time()
        self.log.info(f"Starting: {self.name}")
        return self
    
    def __exit__(self, *args):
        elapsed = time.time() - self.start
        self.log.info(f"Completed: {self.name} ({elapsed:.2f}s)")

class ExperimentLogger:
    def __init__(self, experiment_name):
        self.name = experiment_name
        self.metrics = {}
        self.params = {}
        self.log = logging.getLogger(f'experiment.{experiment_name}')
        self.log.info(f"Experiment '{experiment_name}' initialized")
    
    def log_params(self, params):
        self.params.update(params)
        self.log.info(f"Params: {params}")
    
    def log_metric(self, name, value, step):
        if name not in self.metrics:
            self.metrics[name] = []
        self.metrics[name].append((step, value))
        self.log.debug(f"Step {step}: {name}={value:.4f}")
    
    def summary(self):
        self.log.info(f"\\n{'='*50}")
        self.log.info(f"Experiment: {self.name}")
        self.log.info(f"Parameters: {self.params}")
        for metric, values in self.metrics.items():
            final = values[-1][1]
            best = min(values, key=lambda x: x[1]) if 'loss' in metric else max(values, key=lambda x: x[1])
            self.log.info(f"{metric}: final={final:.4f}, best={best[1]:.4f} (step {best[0]})")

# Simulate ML training
np.random.seed(42)

exp = ExperimentLogger('demo_training')
exp.log_params({'learning_rate': 0.001, 'batch_size': 32, 'epochs': 10})

with TimedOperation('Data loading', logger):
    X = np.random.randn(1000, 10)
    y = np.random.randint(0, 2, 1000)
    logger.info(f"Data shape: X={X.shape}, y={y.shape}")
    logger.debug(f"X stats: mean={X.mean():.3f}, std={X.std():.3f}")

with TimedOperation('Model training', logger):
    for epoch in range(10):
        loss = 1.0 / (epoch + 1) + np.random.randn() * 0.05
        acc = 0.5 + 0.05 * epoch + np.random.randn() * 0.02
        exp.log_metric('loss', loss, epoch)
        exp.log_metric('accuracy', min(acc, 0.99), epoch)

exp.summary()
logger.info("Pipeline complete")
`,
      code: `import logging
import time
import numpy as np

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger('ml_pipeline')

class ExperimentLogger:
    def __init__(self, name):
        self.name = name
        self.metrics = {}
        self.log = logging.getLogger(f'exp.{name}')
    
    def log_metric(self, name, value, step):
        self.metrics.setdefault(name, []).append((step, value))
        self.log.debug(f"Step {step}: {name}={value:.4f}")
    
    def summary(self):
        for m, vals in self.metrics.items():
            self.log.info(f"{m}: final={vals[-1][1]:.4f}")

np.random.seed(42)
exp = ExperimentLogger('demo')

logger.info("Training started")
start = time.time()
for epoch in range(10):
    loss = 1.0 / (epoch + 1) + np.random.randn() * 0.05
    acc = min(0.5 + 0.05 * epoch, 0.99)
    exp.log_metric('loss', loss, epoch)
    exp.log_metric('accuracy', acc, epoch)

logger.info(f"Training done in {time.time()-start:.2f}s")
exp.summary()
`
    },
    {
      title: 'Git & Version Control Basics',
      description: `
## Git & Version Control Basics

### Overview
Git is the standard version control system for software and ML projects. Understanding Git workflow is essential for collaboration, experiment tracking, and code management.

### Key Concepts

**Core Git Commands**:
- \`git init\` — Initialize a repository
- \`git add\` — Stage changes
- \`git commit\` — Save a snapshot
- \`git branch\` / \`git checkout\` — Branching
- \`git merge\` — Combine branches
- \`git push\` / \`git pull\` — Remote sync

**Git for ML Projects**:
- .gitignore: Exclude data, models, checkpoints, \`__pycache__\`
- Track config files and scripts, not large binary data
- Use branches for experiments
- Tag releases and model versions

**Best Practices**:
- Write meaningful commit messages
- Commit often, push regularly
- Use branches for features and experiments
- Never commit secrets or API keys
- Use .gitignore from day one

**ML-Specific .gitignore**:
- \`data/\` — Raw datasets (too large)
- \`models/\` — Trained model files
- \`*.pkl\`, \`*.h5\`, \`*.pt\` — Model weights
- \`wandb/\`, \`mlruns/\` — Experiment logs

### Problem Statement
1. Understand Git workflow for ML projects
2. Create a proper .gitignore for ML
3. Simulate a Git branching workflow
4. Learn commit message conventions
`,
      starterCode: `# Git & Version Control for ML Projects (Conceptual)

# TODO: Generate .gitignore for ML projects
def generate_ml_gitignore():
    patterns = []
    # Add common patterns
    return '\\n'.join(patterns)

# TODO: Simulate git workflow
class SimpleGit:
    def __init__(self):
        self.commits = []
        self.branches = {'main': []}
        self.current_branch = 'main'
        self.staged = []
    
    def add(self, file):
        pass
    
    def commit(self, message):
        pass
    
    def branch(self, name):
        pass
    
    def checkout(self, branch):
        pass
    
    def log(self):
        pass

# TODO: Create commit message helper
def format_commit_message(type, scope, description):
    """Format conventional commit message"""
    pass

git = SimpleGit()
print("Git simulation ready")
`,
      solution: `# Git & Version Control for ML Projects (Conceptual)
import datetime

def generate_ml_gitignore():
    patterns = [
        '# Python',
        '__pycache__/', '*.py[cod]', '*.egg-info/', '.eggs/',
        '*.so', 'dist/', 'build/',
        '',
        '# Virtual environments',
        '.venv/', 'venv/', 'env/',
        '',
        '# Data & Models',
        'data/raw/', 'data/processed/', 'models/', 'checkpoints/',
        '*.pkl', '*.h5', '*.pt', '*.pth', '*.onnx',
        '*.csv', '*.parquet', '*.feather',
        '',
        '# Experiment tracking',
        'wandb/', 'mlruns/', 'outputs/', 'logs/',
        '',
        '# Jupyter',
        '.ipynb_checkpoints/', '*.ipynb',
        '',
        '# IDE',
        '.vscode/', '.idea/', '*.swp',
        '',
        '# Secrets',
        '.env', '*.key', 'secrets/',
    ]
    return '\\n'.join(patterns)

class SimpleGit:
    def __init__(self):
        self.commits = []
        self.branches = {'main': []}
        self.current_branch = 'main'
        self.staged = []
        print("Initialized empty repository")
    
    def add(self, file):
        self.staged.append(file)
        print(f"Staged: {file}")
    
    def commit(self, message):
        commit = {
            'hash': f'{len(self.commits):04x}',
            'message': message,
            'files': self.staged.copy(),
            'branch': self.current_branch,
            'time': datetime.datetime.now().isoformat()
        }
        self.commits.append(commit)
        self.branches[self.current_branch].append(commit)
        self.staged = []
        print(f"[{self.current_branch}] {commit['hash']} {message}")
    
    def branch(self, name):
        self.branches[name] = self.branches[self.current_branch].copy()
        print(f"Created branch: {name}")
    
    def checkout(self, branch):
        if branch in self.branches:
            self.current_branch = branch
            print(f"Switched to branch: {branch}")
        else:
            print(f"Branch '{branch}' not found")
    
    def log(self):
        print(f"\\n=== Git Log ({self.current_branch}) ===")
        for commit in reversed(self.branches[self.current_branch]):
            print(f"  {commit['hash']} - {commit['message']} [{', '.join(commit['files'])}]")

def format_commit_message(type, scope, description):
    types = ['feat', 'fix', 'docs', 'refactor', 'test', 'chore']
    if type not in types:
        raise ValueError(f"Type must be one of: {types}")
    return f"{type}({scope}): {description}"

# Demo: ML project Git workflow
print(generate_ml_gitignore())

print("\\n=== Git Workflow Demo ===")
git = SimpleGit()

git.add('model.py')
git.add('config.yaml')
git.commit(format_commit_message('feat', 'model', 'Add initial CNN architecture'))

git.add('train.py')
git.commit(format_commit_message('feat', 'training', 'Add training script'))

git.branch('experiment/lr-tuning')
git.checkout('experiment/lr-tuning')

git.add('config.yaml')
git.commit(format_commit_message('feat', 'config', 'Tune learning rate to 0.001'))

git.log()

git.checkout('main')
git.log()
`,
      code: `import datetime

def generate_ml_gitignore():
    return '\\n'.join([
        '__pycache__/', '*.py[cod]', '.venv/', 'data/raw/', 'models/',
        '*.pkl', '*.h5', '*.pt', '*.csv', 'wandb/', 'mlruns/',
        '.ipynb_checkpoints/', '.env', '*.key'
    ])

class SimpleGit:
    def __init__(self):
        self.commits, self.branches, self.staged = [], {'main': []}, []
        self.current_branch = 'main'
    def add(self, f): self.staged.append(f)
    def commit(self, msg):
        c = {'hash': f'{len(self.commits):04x}', 'msg': msg, 'files': self.staged[:]}
        self.commits.append(c)
        self.branches[self.current_branch].append(c)
        self.staged = []
        print(f"[{self.current_branch}] {c['hash']} {msg}")
    def branch(self, name): self.branches[name] = self.branches[self.current_branch][:]
    def checkout(self, b): self.current_branch = b
    def log(self):
        for c in reversed(self.branches[self.current_branch]):
            print(f"  {c['hash']} {c['msg']}")

print("=== .gitignore ===")
print(generate_ml_gitignore())

print("\\n=== Workflow ===")
g = SimpleGit()
g.add('model.py'); g.commit('feat(model): initial CNN')
g.add('train.py'); g.commit('feat(train): add training script')
g.branch('experiment/lr'); g.checkout('experiment/lr')
g.add('config.yaml'); g.commit('feat(config): tune LR to 0.001')
print("\\nExperiment branch:"); g.log()
g.checkout('main')
print("Main branch:"); g.log()
`
    },
    {
      title: 'Code Quality (Linting, Formatting, Docstrings)',
      description: `
## Code Quality

### Overview
Writing clean, well-documented code is crucial for ML projects. Linters catch bugs, formatters ensure consistency, and docstrings make code understandable.

### Key Concepts

**PEP 8 — Python Style Guide**:
- 4 spaces indentation
- Max 79 characters per line
- Snake_case for functions/variables
- CamelCase for classes
- UPPER_CASE for constants

**Linting Tools**:
- flake8: PEP 8 compliance checker
- ruff: Fast Python linter (Rust-based)
- pylint: Comprehensive code analysis

**Formatting Tools**:
- black: Opinionated auto-formatter
- isort: Sort imports automatically

**Docstring Styles**:
- Google style: Most common in ML
- NumPy style: Popular in scientific Python
- Sphinx style: For documentation generation

**Type Checking**:
- mypy: Static type checker
- Type hints improve readability and catch bugs

### Problem Statement
1. Refactor messy code to follow PEP 8
2. Add proper docstrings (Google style)
3. Add type hints to functions
4. Understand linting output
`,
      starterCode: `# Code Quality Exercise
# This code works but has style issues. Fix them!

# TODO: Refactor this messy code
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

# Bad: No docstring, poor naming, no type hints
def proc(d,c,ts=0.2):
    X=d.drop(c,axis=1)
    y=d[c]
    x1,x2,y1,y2=train_test_split(X,y,test_size=ts,random_state=42)
    return x1,x2,y1,y2

# Bad: Magic numbers, no documentation
def TrainModel(X,y):
    from sklearn.ensemble import RandomForestClassifier
    m=RandomForestClassifier(n_estimators=100,max_depth=10,random_state=42)
    m.fit(X,y)
    return m

# Bad: Poor error handling, no logging
def evaluate(m,X,y):
    from sklearn.metrics import accuracy_score,classification_report
    p=m.predict(X)
    a=accuracy_score(y,p)
    r=classification_report(y,p)
    return a,r

# TODO: Rewrite the above functions with:
# 1. Proper naming (snake_case)
# 2. Type hints
# 3. Google-style docstrings
# 4. PEP 8 formatting

print("Refactor the code above")
`,
      solution: `"""ML Pipeline module with proper code quality.

This module demonstrates clean Python code following PEP 8,
with proper type hints and Google-style docstrings.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from typing import Tuple, Dict, Any

# Constants
DEFAULT_TEST_SIZE = 0.2
DEFAULT_RANDOM_STATE = 42
DEFAULT_N_ESTIMATORS = 100
DEFAULT_MAX_DEPTH = 10


def prepare_data(
    data: pd.DataFrame,
    target_column: str,
    test_size: float = DEFAULT_TEST_SIZE,
    random_state: int = DEFAULT_RANDOM_STATE
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """Split data into training and test sets.

    Args:
        data: Input DataFrame with features and target.
        target_column: Name of the target column.
        test_size: Fraction of data for testing. Defaults to 0.2.
        random_state: Random seed for reproducibility.

    Returns:
        Tuple of (X_train, X_test, y_train, y_test).

    Raises:
        KeyError: If target_column is not in data.
    """
    if target_column not in data.columns:
        raise KeyError(f"Column '{target_column}' not found in data")
    
    features = data.drop(target_column, axis=1)
    target = data[target_column]
    
    X_train, X_test, y_train, y_test = train_test_split(
        features, target,
        test_size=test_size,
        random_state=random_state
    )
    return X_train, X_test, y_train, y_test


def train_model(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    n_estimators: int = DEFAULT_N_ESTIMATORS,
    max_depth: int = DEFAULT_MAX_DEPTH
) -> RandomForestClassifier:
    """Train a Random Forest classifier.

    Args:
        X_train: Training features.
        y_train: Training labels.
        n_estimators: Number of trees. Defaults to 100.
        max_depth: Maximum tree depth. Defaults to 10.

    Returns:
        Trained RandomForestClassifier.
    """
    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        random_state=DEFAULT_RANDOM_STATE
    )
    model.fit(X_train, y_train)
    return model


def evaluate_model(
    model: RandomForestClassifier,
    X_test: pd.DataFrame,
    y_test: pd.Series
) -> Dict[str, Any]:
    """Evaluate model performance.

    Args:
        model: Trained classifier.
        X_test: Test features.
        y_test: True labels.

    Returns:
        Dictionary with 'accuracy' and 'report' keys.
    """
    predictions = model.predict(X_test)
    acc = accuracy_score(y_test, predictions)
    report = classification_report(y_test, predictions)
    
    return {
        'accuracy': acc,
        'report': report
    }


# Demo
np.random.seed(DEFAULT_RANDOM_STATE)
data = pd.DataFrame({
    'feature_1': np.random.randn(200),
    'feature_2': np.random.randn(200),
    'target': np.random.randint(0, 2, 200)
})

X_train, X_test, y_train, y_test = prepare_data(data, 'target')
model = train_model(X_train, y_train)
results = evaluate_model(model, X_test, y_test)

print(f"Accuracy: {results['accuracy']:.4f}")
print(f"\\nReport:\\n{results['report']}")
`,
      code: `import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from typing import Tuple, Dict, Any

DEFAULT_TEST_SIZE = 0.2
RANDOM_STATE = 42

def prepare_data(data: pd.DataFrame, target: str, test_size: float = DEFAULT_TEST_SIZE
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """Split data into train/test sets."""
    X = data.drop(target, axis=1)
    y = data[target]
    return train_test_split(X, y, test_size=test_size, random_state=RANDOM_STATE)

def train_model(X: pd.DataFrame, y: pd.Series) -> RandomForestClassifier:
    """Train a Random Forest classifier."""
    model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=RANDOM_STATE)
    model.fit(X, y)
    return model

def evaluate_model(model, X: pd.DataFrame, y: pd.Series) -> Dict[str, Any]:
    """Evaluate model and return metrics."""
    preds = model.predict(X)
    return {'accuracy': accuracy_score(y, preds), 'report': classification_report(y, preds)}

np.random.seed(RANDOM_STATE)
df = pd.DataFrame({'f1': np.random.randn(200), 'f2': np.random.randn(200), 'target': np.random.randint(0,2,200)})
X_train, X_test, y_train, y_test = prepare_data(df, 'target')
model = train_model(X_train, y_train)
results = evaluate_model(model, X_test, y_test)
print(f"Accuracy: {results['accuracy']:.4f}")
`
    },
    {
      title: 'Data Serialization (JSON, CSV, Pickle, YAML)',
      description: `
## Data Serialization

### Overview
Data serialization converts Python objects into storable/transmittable formats. ML projects frequently need to save/load data, models, configs, and experiment results.

### Key Concepts

**JSON (JavaScript Object Notation)**:
- Human-readable, text-based
- \`json.dump()\` / \`json.load()\`
- Great for API responses, config files
- Limited to basic types (str, int, float, list, dict)

**CSV (Comma-Separated Values)**:
- Tabular data format
- \`csv\` module or \`pandas.read_csv()\`
- Universal compatibility
- No type information preserved

**Pickle**:
- Python-specific binary format
- Serializes any Python object (including ML models)
- \`pickle.dump()\` / \`pickle.load()\`
- Security risk: Never unpickle untrusted data

**YAML (YAML Ain't Markup Language)**:
- Human-friendly configuration format
- Common for ML experiment configs
- Supports complex nested structures

### Problem Statement
1. Save and load ML experiment configs in JSON
2. Work with CSV data using pandas
3. Serialize/deserialize ML models with pickle
4. Create YAML-style experiment configs
`,
      starterCode: `import json
import csv
import pickle
import io
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# TODO: Save/load experiment config as JSON
experiment_config = {
    'model': 'RandomForest',
    'hyperparameters': {
        'n_estimators': 100,
        'max_depth': 10,
        'min_samples_split': 5
    },
    'data': {
        'n_samples': 1000,
        'test_size': 0.2
    },
    'random_state': 42
}

# Save config to JSON string
json_str = 

# Load config back
loaded_config = 

print("JSON Config:")
print(json_str)

# TODO: Work with CSV data
# Create sample data and save/load as CSV

# TODO: Pickle an ML model
X, y = make_classification(n_samples=1000, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Serialize model

# Deserialize model

print("Serialization complete")
`,
      solution: `import json
import csv
import pickle
import io
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# === JSON ===
experiment_config = {
    'model': 'RandomForest',
    'hyperparameters': {
        'n_estimators': 100,
        'max_depth': 10,
        'min_samples_split': 5
    },
    'data': {
        'n_samples': 1000,
        'test_size': 0.2
    },
    'random_state': 42
}

json_str = json.dumps(experiment_config, indent=2)
print("=== JSON Config ===")
print(json_str)

loaded_config = json.loads(json_str)
assert loaded_config == experiment_config
print("\\nJSON round-trip: OK")

# Custom JSON encoder for numpy types
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

results = {
    'accuracy': np.float64(0.95),
    'predictions': np.array([0, 1, 1, 0, 1])
}
results_json = json.dumps(results, cls=NumpyEncoder, indent=2)
print(f"\\nNumpy-compatible JSON:\\n{results_json}")

# === CSV ===
print("\\n=== CSV ===")
csv_buffer = io.StringIO()
writer = csv.DictWriter(csv_buffer, fieldnames=['epoch', 'loss', 'accuracy'])
writer.writeheader()
for i in range(5):
    writer.writerow({'epoch': i, 'loss': round(1.0/(i+1), 4), 'accuracy': round(0.5 + i*0.1, 2)})

csv_content = csv_buffer.getvalue()
print(csv_content)

csv_buffer.seek(0)
reader = csv.DictReader(csv_buffer)
for row in reader:
    print(f"Epoch {row['epoch']}: loss={row['loss']}, acc={row['accuracy']}")

# === Pickle ===
print("\\n=== Pickle (ML Model) ===")
X, y = make_classification(n_samples=1000, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
original_acc = accuracy_score(y_test, model.predict(X_test))

model_bytes = pickle.dumps(model)
print(f"Serialized model size: {len(model_bytes):,} bytes")

loaded_model = pickle.loads(model_bytes)
loaded_acc = accuracy_score(y_test, loaded_model.predict(X_test))

print(f"Original accuracy: {original_acc:.4f}")
print(f"Loaded accuracy: {loaded_acc:.4f}")
print(f"Models match: {original_acc == loaded_acc}")

# === YAML-style config ===
print("\\n=== YAML-style Config ===")
def dict_to_yaml(d, indent=0):
    lines = []
    for key, value in d.items():
        if isinstance(value, dict):
            lines.append(f"{'  ' * indent}{key}:")
            lines.append(dict_to_yaml(value, indent + 1))
        elif isinstance(value, list):
            lines.append(f"{'  ' * indent}{key}:")
            for item in value:
                lines.append(f"{'  ' * (indent + 1)}- {item}")
        else:
            lines.append(f"{'  ' * indent}{key}: {value}")
    return '\\n'.join(lines)

print(dict_to_yaml(experiment_config))
`,
      code: `import json
import pickle
import io
import csv
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# JSON
config = {'model': 'RandomForest', 'params': {'n_estimators': 100, 'max_depth': 10}, 'seed': 42}
json_str = json.dumps(config, indent=2)
print("=== JSON ===")
print(json_str)
assert json.loads(json_str) == config

# CSV
buf = io.StringIO()
w = csv.DictWriter(buf, fieldnames=['epoch', 'loss'])
w.writeheader()
for i in range(5): w.writerow({'epoch': i, 'loss': round(1.0/(i+1), 4)})
print("\\n=== CSV ===")
print(buf.getvalue())

# Pickle
X, y = make_classification(n_samples=1000, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_tr, y_tr)

data = pickle.dumps(model)
loaded = pickle.loads(data)
print(f"\\n=== Pickle ===")
print(f"Size: {len(data):,} bytes")
print(f"Original acc: {accuracy_score(y_te, model.predict(X_te)):.4f}")
print(f"Loaded acc: {accuracy_score(y_te, loaded.predict(X_te)):.4f}")
`
    }
  ]
};
