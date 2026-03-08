export const phase2MathContent = {
  id: 2,
  title: 'Phase 2: Mathematical Foundations',
  topics: [
    'Linear Algebra & Vector Spaces',
    'Calculus & Optimization',
    'Probability & Statistical Inference',
    'Information Theory & Entropy',
    'Maximum Likelihood Estimation',
    'Hypothesis Testing & Statistical Tests',
    'Convex Optimization',
    'Matrix Decomposition (SVD)'
  ],
  lessons: [
    {
      title: 'Linear Algebra Fundamentals',
      description: `
## Linear Algebra Fundamentals

### Overview
Linear algebra is the foundation of machine learning. Understanding vectors, matrices, and transformations is crucial for working with neural networks and data processing.

### Key Concepts

**Vectors**: Ordered arrays of numbers representing points or directions in space.
- Can represent features in ML (e.g., [age, income, score])
- Operations: addition, scalar multiplication, dot product

**Matrices**: 2D arrays used for transformations and data storage.
- Each row can represent a data sample
- Matrix multiplication transforms data

**Dot Product**: Measures similarity between vectors
- Formula: v1 · v2 = |v1| × |v2| × cos(θ)
- Used in neural networks for weighted sums

### Problem Statement
Given two vectors v1 = [2, 3] and v2 = [1, 4]:
1. Calculate their dot product
2. Apply a 2x scaling transformation to v1
3. Visualize both original and transformed vectors

### Expected Output
- Dot product value
- Scaled vector
- Visualization plot
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# Define vectors
v1 = np.array([2, 3])
v2 = np.array([1, 4])

# TODO: Calculate dot product
dot_product = 

# TODO: Scale v1 by factor of 2
v1_scaled = 

# TODO: Visualize vectors
plt.figure(figsize=(8, 6))
plt.quiver(0, 0, v1[0], v1[1], angles='xy', scale_units='xy', scale=1, color='blue', label='v1')
plt.quiver(0, 0, v2[0], v2[1], angles='xy', scale_units='xy', scale=1, color='red', label='v2')
plt.quiver(0, 0, v1_scaled[0], v1_scaled[1], angles='xy', scale_units='xy', scale=1, color='green', label='v1 scaled')

plt.xlim(-1, 6)
plt.ylim(-1, 8)
plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.legend()
plt.title('Vector Operations')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()

print(f"Dot product: {dot_product}")
print(f"Scaled v1: {v1_scaled}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

# Define vectors
v1 = np.array([2, 3])
v2 = np.array([1, 4])

# Calculate dot product
dot_product = np.dot(v1, v2)

# Scale v1 by factor of 2
v1_scaled = v1 * 2

# Visualize vectors
plt.figure(figsize=(8, 6))
plt.quiver(0, 0, v1[0], v1[1], angles='xy', scale_units='xy', scale=1, color='blue', label='v1', width=0.006)
plt.quiver(0, 0, v2[0], v2[1], angles='xy', scale_units='xy', scale=1, color='red', label='v2', width=0.006)
plt.quiver(0, 0, v1_scaled[0], v1_scaled[1], angles='xy', scale_units='xy', scale=1, color='green', label='v1 scaled', width=0.006)

plt.xlim(-1, 6)
plt.ylim(-1, 8)
plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.legend()
plt.title('Vector Operations')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()

print(f"Dot product: {dot_product}")
print(f"Scaled v1: {v1_scaled}")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

# Define vectors
v1 = np.array([2, 3])
v2 = np.array([1, 4])

# TODO: Calculate dot product
dot_product = np.dot(v1, v2)

# TODO: Scale v1 by factor of 2
v1_scaled = v1 * 2

# TODO: Visualize vectors
plt.figure(figsize=(8, 6))
plt.quiver(0, 0, v1[0], v1[1], angles='xy', scale_units='xy', scale=1, color='blue', label='v1')
plt.quiver(0, 0, v2[0], v2[1], angles='xy', scale_units='xy', scale=1, color='red', label='v2')
plt.quiver(0, 0, v1_scaled[0], v1_scaled[1], angles='xy', scale_units='xy', scale=1, color='green', label='v1 scaled')

plt.xlim(-1, 6)
plt.ylim(-1, 8)
plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.legend()
plt.title('Vector Operations')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()

print(f"Dot product: {dot_product}")
print(f"Scaled v1: {v1_scaled}")
`
    },
    {
      title: 'Matrix Operations & Transformations',
      description: `
## Matrix Operations & Transformations

### Overview
Matrices are fundamental to machine learning for data representation, transformations, and neural network operations.

### Key Concepts

**Matrix Multiplication**: Combines transformations
- Used in neural networks for layer computations
- Order matters: A × B ≠ B × A

**Transpose**: Flips rows and columns
- Important for dot products and matrix operations
- Notation: A^T

**Identity Matrix**: Leaves vectors unchanged
- Diagonal of 1s, rest 0s
- Like multiplying by 1

**Inverse Matrix**: Reverses a transformation
- A × A^(-1) = I
- Used in solving linear equations

### Problem Statement
Create a 2D rotation matrix and apply it to transform a set of points.
Rotate points by 45 degrees counterclockwise.

### Expected Output
- Original and rotated points visualization
- Rotation matrix
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# Define points (square corners)
points = np.array([[0, 1, 1, 0],
                   [0, 0, 1, 1]])

# TODO: Create rotation matrix for 45 degrees
angle = np.pi / 4  # 45 degrees in radians
rotation_matrix = 

# TODO: Apply rotation
rotated_points = 

# Visualize
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.plot(points[0], points[1], 'bo-', label='Original')
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.title('Original Points')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(rotated_points[0], rotated_points[1], 'ro-', label='Rotated')
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.title('Rotated Points (45°)')
plt.legend()

plt.tight_layout()
plt.show()

print("Rotation Matrix:")
print(rotation_matrix)
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

# Define points (square corners)
points = np.array([[0, 1, 1, 0],
                   [0, 0, 1, 1]])

# Create rotation matrix for 45 degrees
angle = np.pi / 4  # 45 degrees in radians
rotation_matrix = np.array([[np.cos(angle), -np.sin(angle)],
                            [np.sin(angle), np.cos(angle)]])

# Apply rotation
rotated_points = rotation_matrix @ points

# Visualize
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.plot(points[0], points[1], 'bo-', label='Original', linewidth=2)
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.title('Original Points')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(rotated_points[0], rotated_points[1], 'ro-', label='Rotated', linewidth=2)
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.title('Rotated Points (45°)')
plt.legend()

plt.tight_layout()
plt.show()

print("Rotation Matrix:")
print(rotation_matrix)
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

# Define points (square corners)
points = np.array([[0, 1, 1, 0],
                   [0, 0, 1, 1]])

# TODO: Create rotation matrix for 45 degrees
angle = np.pi / 4  # 45 degrees in radians
rotation_matrix = np.array([[np.cos(angle), -np.sin(angle)],
                            [np.sin(angle), np.cos(angle)]])

# TODO: Apply rotation
rotated_points = rotation_matrix @ points

# Visualize
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.plot(points[0], points[1], 'bo-', label='Original', linewidth=2)
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.title('Original Points')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(rotated_points[0], rotated_points[1], 'ro-', label='Rotated', linewidth=2)
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.title('Rotated Points (45°)')
plt.legend()

plt.tight_layout()
plt.show()

print("Rotation Matrix:")
print(rotation_matrix)
`
    },
    {
      title: 'Eigenvalues & Eigenvectors',
      description: `
## Eigenvalues & Eigenvectors

### Overview
Eigenvalues and eigenvectors reveal the fundamental properties of transformations and are crucial for PCA, dimensionality reduction, and understanding neural network behavior.

### Key Concepts

**Eigenvector**: A vector that only gets scaled (not rotated) by a transformation
- Direction remains unchanged
- Av = λv (A is matrix, v is eigenvector, λ is eigenvalue)

**Eigenvalue**: The scaling factor for an eigenvector
- Tells how much the eigenvector is stretched/compressed

**Applications in ML**:
- Principal Component Analysis (PCA)
- Dimensionality reduction
- Understanding covariance matrices
- Stability analysis of neural networks

### Problem Statement
Find eigenvalues and eigenvectors of a covariance matrix and visualize them.

### Expected Output
- Eigenvalues and eigenvectors
- Visualization showing eigenvector directions
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# Create a covariance matrix
cov_matrix = np.array([[3, 1],
                       [1, 2]])

# TODO: Calculate eigenvalues and eigenvectors
eigenvalues, eigenvectors = 

# Generate sample data for visualization
np.random.seed(42)
mean = [0, 0]
data = np.random.multivariate_normal(mean, cov_matrix, 500)

# Visualize
plt.figure(figsize=(10, 8))
plt.scatter(data[:, 0], data[:, 1], alpha=0.5, label='Data')

# TODO: Plot eigenvectors scaled by eigenvalues
for i in range(len(eigenvalues)):
    plt.arrow(0, 0, 
              eigenvectors[0, i] * eigenvalues[i], 
              eigenvectors[1, i] * eigenvalues[i],
              head_width=0.3, head_length=0.3, fc=f'C{i+1}', ec=f'C{i+1}',
              linewidth=3, label=f'Eigenvector {i+1} (λ={eigenvalues[i]:.2f})')

plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.legend()
plt.title('Eigenvalues and Eigenvectors of Covariance Matrix')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()

print("Eigenvalues:", eigenvalues)
print("Eigenvectors:")
print(eigenvectors)
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

# Create a covariance matrix
cov_matrix = np.array([[3, 1],
                       [1, 2]])

# Calculate eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)

# Generate sample data for visualization
np.random.seed(42)
mean = [0, 0]
data = np.random.multivariate_normal(mean, cov_matrix, 500)

# Visualize
plt.figure(figsize=(10, 8))
plt.scatter(data[:, 0], data[:, 1], alpha=0.5, label='Data')

# Plot eigenvectors scaled by eigenvalues
for i in range(len(eigenvalues)):
    plt.arrow(0, 0, 
              eigenvectors[0, i] * eigenvalues[i], 
              eigenvectors[1, i] * eigenvalues[i],
              head_width=0.3, head_length=0.3, fc=f'C{i+1}', ec=f'C{i+1}',
              linewidth=3, label=f'Eigenvector {i+1} (λ={eigenvalues[i]:.2f})')

plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.legend()
plt.title('Eigenvalues and Eigenvectors of Covariance Matrix')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()

print("Eigenvalues:", eigenvalues)
print("Eigenvectors:")
print(eigenvectors)
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

# Create a covariance matrix
cov_matrix = np.array([[3, 1],
                       [1, 2]])

# TODO: Calculate eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)

# Generate sample data for visualization
np.random.seed(42)
mean = [0, 0]
data = np.random.multivariate_normal(mean, cov_matrix, 500)

# Visualize
plt.figure(figsize=(10, 8))
plt.scatter(data[:, 0], data[:, 1], alpha=0.5, label='Data')

# TODO: Plot eigenvectors scaled by eigenvalues
for i in range(len(eigenvalues)):
    plt.arrow(0, 0, 
              eigenvectors[0, i] * eigenvalues[i], 
              eigenvectors[1, i] * eigenvalues[i],
              head_width=0.3, head_length=0.3, fc=f'C{i+1}', ec=f'C{i+1}',
              linewidth=3, label=f'Eigenvector {i+1} (λ={eigenvalues[i]:.2f})')

plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.axis('equal')
plt.legend()
plt.title('Eigenvalues and Eigenvectors of Covariance Matrix')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()

print("Eigenvalues:", eigenvalues)
print("Eigenvectors:")
print(eigenvectors)
`
    },
    {
      title: 'Derivatives & Gradients',
      description: `
## Derivatives & Gradients

### Overview
Derivatives measure how functions change and are the foundation of gradient descent - the optimization algorithm that trains neural networks.

### Key Concepts

**Derivative**: Rate of change of a function
- f'(x) tells us the slope at point x
- Used to find minima/maxima

**Partial Derivative**: Derivative with respect to one variable
- ∂f/∂x measures change in f when only x changes
- Other variables held constant

**Gradient**: Vector of all partial derivatives
- ∇f = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ]
- Points in direction of steepest ascent
- Negative gradient used in gradient descent

**Chain Rule**: Computes derivatives of composed functions
- Essential for backpropagation in neural networks
- (f ∘ g)'(x) = f'(g(x)) × g'(x)

### Problem Statement
Implement gradient descent to find the minimum of a quadratic function.

### Expected Output
- Optimization path visualization
- Final minimum value
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# Define function: f(x) = x^2 + 4x + 4
def f(x):
    return x**2 + 4*x + 4

# TODO: Define derivative: f'(x) = 2x + 4
def df(x):
    return 

# Gradient descent parameters
learning_rate = 0.1
num_iterations = 20
x = 5.0  # Starting point

# TODO: Implement gradient descent
history = [x]
for i in range(num_iterations):
    # Update x using gradient descent
    x = 
    history.append(x)

# Visualize
x_range = np.linspace(-6, 6, 100)
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(x_range, f(x_range), 'b-', linewidth=2, label='f(x) = x² + 4x + 4')
plt.plot(history, [f(x) for x in history], 'ro-', markersize=8, label='Gradient Descent Path')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Function and Optimization Path')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
plt.plot([f(x) for x in history], 'go-', linewidth=2, markersize=8)
plt.xlabel('Iteration')
plt.ylabel('f(x)')
plt.title('Convergence')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"Final x: {x:.4f}")
print(f"Final f(x): {f(x):.4f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

# Define function: f(x) = x^2 + 4x + 4
def f(x):
    return x**2 + 4*x + 4

# Define derivative: f'(x) = 2x + 4
def df(x):
    return 2*x + 4

# Gradient descent parameters
learning_rate = 0.1
num_iterations = 20
x = 5.0  # Starting point

# Implement gradient descent
history = [x]
for i in range(num_iterations):
    # Update x using gradient descent
    x = x - learning_rate * df(x)
    history.append(x)

# Visualize
x_range = np.linspace(-6, 6, 100)
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(x_range, f(x_range), 'b-', linewidth=2, label='f(x) = x² + 4x + 4')
plt.plot(history, [f(x) for x in history], 'ro-', markersize=8, label='Gradient Descent Path')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Function and Optimization Path')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
plt.plot([f(x) for x in history], 'go-', linewidth=2, markersize=8)
plt.xlabel('Iteration')
plt.ylabel('f(x)')
plt.title('Convergence')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"Final x: {x:.4f}")
print(f"Final f(x): {f(x):.4f}")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

# Define function: f(x) = x^2 + 4x + 4
def f(x):
    return x**2 + 4*x + 4

# TODO: Define derivative: f'(x) = 2x + 4
def df(x):
    return 2*x + 4

# Gradient descent parameters
learning_rate = 0.1
num_iterations = 20
x = 5.0  # Starting point

# TODO: Implement gradient descent
history = [x]
for i in range(num_iterations):
    # Update x using gradient descent
    x = x - learning_rate * df(x)
    history.append(x)

# Visualize
x_range = np.linspace(-6, 6, 100)
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(x_range, f(x_range), 'b-', linewidth=2, label='f(x) = x² + 4x + 4')
plt.plot(history, [f(x) for x in history], 'ro-', markersize=8, label='Gradient Descent Path')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Function and Optimization Path')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
plt.plot([f(x) for x in history], 'go-', linewidth=2, markersize=8)
plt.xlabel('Iteration')
plt.ylabel('f(x)')
plt.title('Convergence')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"Final x: {x:.4f}")
print(f"Final f(x): {f(x):.4f}")
`
    },
    {
      title: 'Multivariable Optimization',
      description: `
## Multivariable Optimization

### Overview
Real machine learning problems involve optimizing functions with many variables. Understanding multivariable calculus is essential for training models.

### Key Concepts

**Gradient Vector**: Direction of steepest ascent
- In 2D: ∇f = [∂f/∂x, ∂f/∂y]
- Points uphill; negative points downhill

**Hessian Matrix**: Matrix of second derivatives
- Describes curvature of function
- Used in advanced optimization (Newton's method)

**Contour Lines**: Lines of constant function value
- Gradient is perpendicular to contours
- Helps visualize optimization landscape

### Problem Statement
Minimize a 2D function using gradient descent and visualize the optimization path on a contour plot.

### Expected Output
- Contour plot with optimization path
- Final minimum coordinates
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# Define function: f(x, y) = x^2 + y^2 + 2x - 4y + 5
def f(x, y):
    return x**2 + y**2 + 2*x - 4*y + 5

# TODO: Define gradient
def gradient(x, y):
    df_dx = 
    df_dy = 
    return np.array([df_dx, df_dy])

# Gradient descent
learning_rate = 0.1
num_iterations = 50
position = np.array([3.0, 3.0])  # Starting point

# TODO: Implement gradient descent
history = [position.copy()]
for i in range(num_iterations):
    grad = gradient(position[0], position[1])
    position = 
    history.append(position.copy())

history = np.array(history)

# Visualize
x = np.linspace(-4, 4, 100)
y = np.linspace(-2, 6, 100)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)

plt.figure(figsize=(10, 8))
contour = plt.contour(X, Y, Z, levels=20, cmap='viridis')
plt.colorbar(contour, label='f(x, y)')
plt.plot(history[:, 0], history[:, 1], 'ro-', markersize=8, linewidth=2, label='Optimization Path')
plt.plot(history[0, 0], history[0, 1], 'go', markersize=12, label='Start')
plt.plot(history[-1, 0], history[-1, 1], 'r*', markersize=20, label='End')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Gradient Descent on 2D Function')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"Final position: ({position[0]:.4f}, {position[1]:.4f})")
print(f"Final value: {f(position[0], position[1]):.4f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

# Define function: f(x, y) = x^2 + y^2 + 2x - 4y + 5
def f(x, y):
    return x**2 + y**2 + 2*x - 4*y + 5

# Define gradient
def gradient(x, y):
    df_dx = 2*x + 2
    df_dy = 2*y - 4
    return np.array([df_dx, df_dy])

# Gradient descent
learning_rate = 0.1
num_iterations = 50
position = np.array([3.0, 3.0])  # Starting point

# Implement gradient descent
history = [position.copy()]
for i in range(num_iterations):
    grad = gradient(position[0], position[1])
    position = position - learning_rate * grad
    history.append(position.copy())

history = np.array(history)

# Visualize
x = np.linspace(-4, 4, 100)
y = np.linspace(-2, 6, 100)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)

plt.figure(figsize=(10, 8))
contour = plt.contour(X, Y, Z, levels=20, cmap='viridis')
plt.colorbar(contour, label='f(x, y)')
plt.plot(history[:, 0], history[:, 1], 'ro-', markersize=8, linewidth=2, label='Optimization Path')
plt.plot(history[0, 0], history[0, 1], 'go', markersize=12, label='Start')
plt.plot(history[-1, 0], history[-1, 1], 'r*', markersize=20, label='End')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Gradient Descent on 2D Function')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"Final position: ({position[0]:.4f}, {position[1]:.4f})")
print(f"Final value: {f(position[0], position[1]):.4f}")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

# Define function: f(x, y) = x^2 + y^2 + 2x - 4y + 5
def f(x, y):
    return x**2 + y**2 + 2*x - 4*y + 5

# TODO: Define gradient
def gradient(x, y):
    df_dx = 2*x + 2
    df_dy = 2*y - 4
    return np.array([df_dx, df_dy])

# Gradient descent
learning_rate = 0.1
num_iterations = 50
position = np.array([3.0, 3.0])  # Starting point

# TODO: Implement gradient descent
history = [position.copy()]
for i in range(num_iterations):
    grad = gradient(position[0], position[1])
    position = position - learning_rate * grad
    history.append(position.copy())

history = np.array(history)

# Visualize
x = np.linspace(-4, 4, 100)
y = np.linspace(-2, 6, 100)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)

plt.figure(figsize=(10, 8))
contour = plt.contour(X, Y, Z, levels=20, cmap='viridis')
plt.colorbar(contour, label='f(x, y)')
plt.plot(history[:, 0], history[:, 1], 'ro-', markersize=8, linewidth=2, label='Optimization Path')
plt.plot(history[0, 0], history[0, 1], 'go', markersize=12, label='Start')
plt.plot(history[-1, 0], history[-1, 1], 'r*', markersize=20, label='End')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Gradient Descent on 2D Function')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"Final position: ({position[0]:.4f}, {position[1]:.4f})")
print(f"Final value: {f(position[0], position[1]):.4f}")
`
    },
    {
      title: 'Probability Basics',
      description: `
## Probability Basics

### Overview
Probability theory is fundamental to machine learning, from understanding data distributions to building probabilistic models.

### Key Concepts

**Random Variable**: A variable whose value is determined by chance
- Discrete: finite or countable outcomes (coin flip, dice)
- Continuous: infinite outcomes (height, temperature)

**Probability Distribution**: Describes likelihood of outcomes
- PMF (Probability Mass Function): for discrete variables
- PDF (Probability Density Function): for continuous variables

**Expected Value**: Average outcome over many trials
- E[X] = Σ x × P(x) for discrete
- E[X] = ∫ x × f(x) dx for continuous

**Variance**: Measure of spread
- Var(X) = E[(X - μ)²]
- Standard deviation: σ = √Var(X)

### Problem Statement
Simulate dice rolls and compare empirical distribution with theoretical probability.

### Expected Output
- Histogram of dice rolls
- Comparison with theoretical probabilities
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# Simulate dice rolls
np.random.seed(42)
num_rolls = 10000

# TODO: Simulate rolling a fair 6-sided die
rolls = 

# TODO: Calculate empirical probabilities
unique, counts = np.unique(rolls, return_counts=True)
empirical_probs = 

# Theoretical probability (fair die)
theoretical_prob = 1/6

# Visualize
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.hist(rolls, bins=np.arange(0.5, 7.5, 1), density=True, alpha=0.7, edgecolor='black', label='Empirical')
plt.axhline(theoretical_prob, color='red', linestyle='--', linewidth=2, label='Theoretical (1/6)')
plt.xlabel('Dice Value')
plt.ylabel('Probability')
plt.title(f'Dice Roll Distribution ({num_rolls} rolls)')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
x = np.arange(1, 7)
plt.bar(x - 0.2, empirical_probs, width=0.4, label='Empirical', alpha=0.7)
plt.bar(x + 0.2, [theoretical_prob]*6, width=0.4, label='Theoretical', alpha=0.7)
plt.xlabel('Dice Value')
plt.ylabel('Probability')
plt.title('Probability Comparison')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("Empirical probabilities:", empirical_probs)
print("Theoretical probability:", theoretical_prob)
print("Mean:", np.mean(rolls))
print("Variance:", np.var(rolls))
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

# Simulate dice rolls
np.random.seed(42)
num_rolls = 10000

# Simulate rolling a fair 6-sided die
rolls = np.random.randint(1, 7, size=num_rolls)

# Calculate empirical probabilities
unique, counts = np.unique(rolls, return_counts=True)
empirical_probs = counts / num_rolls

# Theoretical probability (fair die)
theoretical_prob = 1/6

# Visualize
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.hist(rolls, bins=np.arange(0.5, 7.5, 1), density=True, alpha=0.7, edgecolor='black', label='Empirical')
plt.axhline(theoretical_prob, color='red', linestyle='--', linewidth=2, label='Theoretical (1/6)')
plt.xlabel('Dice Value')
plt.ylabel('Probability')
plt.title(f'Dice Roll Distribution ({num_rolls} rolls)')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
x = np.arange(1, 7)
plt.bar(x - 0.2, empirical_probs, width=0.4, label='Empirical', alpha=0.7)
plt.bar(x + 0.2, [theoretical_prob]*6, width=0.4, label='Theoretical', alpha=0.7)
plt.xlabel('Dice Value')
plt.ylabel('Probability')
plt.title('Probability Comparison')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("Empirical probabilities:", empirical_probs)
print("Theoretical probability:", theoretical_prob)
print("Mean:", np.mean(rolls))
print("Variance:", np.var(rolls))
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

# Simulate dice rolls
np.random.seed(42)
num_rolls = 10000

# TODO: Simulate rolling a fair 6-sided die
rolls = np.random.randint(1, 7, size=num_rolls)

# TODO: Calculate empirical probabilities
unique, counts = np.unique(rolls, return_counts=True)
empirical_probs = counts / num_rolls

# Theoretical probability (fair die)
theoretical_prob = 1/6

# Visualize
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.hist(rolls, bins=np.arange(0.5, 7.5, 1), density=True, alpha=0.7, edgecolor='black', label='Empirical')
plt.axhline(theoretical_prob, color='red', linestyle='--', linewidth=2, label='Theoretical (1/6)')
plt.xlabel('Dice Value')
plt.ylabel('Probability')
plt.title(f'Dice Roll Distribution ({num_rolls} rolls)')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
x = np.arange(1, 7)
plt.bar(x - 0.2, empirical_probs, width=0.4, label='Empirical', alpha=0.7)
plt.bar(x + 0.2, [theoretical_prob]*6, width=0.4, label='Theoretical', alpha=0.7)
plt.xlabel('Dice Value')
plt.ylabel('Probability')
plt.title('Probability Comparison')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("Empirical probabilities:", empirical_probs)
print("Theoretical probability:", theoretical_prob)
print("Mean:", np.mean(rolls))
print("Variance:", np.var(rolls))
`
    },
    {
      title: 'Normal Distribution & Central Limit Theorem',
      description: `
## Normal Distribution & Central Limit Theorem

### Overview
The normal (Gaussian) distribution is the most important distribution in statistics and machine learning.

### Key Concepts

**Normal Distribution**: Bell-shaped curve
- Defined by mean (μ) and standard deviation (σ)
- 68-95-99.7 rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ
- Formula: f(x) = (1/√(2πσ²)) × e^(-(x-μ)²/(2σ²))

**Central Limit Theorem**: Sum of many random variables approaches normal distribution
- Explains why normal distribution is so common
- Works regardless of original distribution
- Foundation for many statistical tests

**Standard Normal**: μ=0, σ=1
- Z-score: z = (x - μ) / σ
- Converts any normal to standard normal

### Problem Statement
Demonstrate the Central Limit Theorem by sampling from a uniform distribution.

### Expected Output
- Histograms showing convergence to normal distribution
- Comparison with theoretical normal curve
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

# Parameters
num_samples = 10000
sample_sizes = [1, 5, 30, 100]

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes = axes.flatten()

for idx, n in enumerate(sample_sizes):
    # TODO: Generate samples from uniform distribution and compute means
    # For each of num_samples iterations, draw n random numbers and take their mean
    sample_means = []
    for _ in range(num_samples):
        sample = 
        sample_means.append()
    
    sample_means = np.array(sample_means)
    
    # Plot histogram
    axes[idx].hist(sample_means, bins=50, density=True, alpha=0.7, edgecolor='black', label='Sample Means')
    
    # TODO: Overlay theoretical normal distribution
    mu = 
    sigma = 
    x = np.linspace(sample_means.min(), sample_means.max(), 100)
    axes[idx].plot(x, stats.norm.pdf(x, mu, sigma), 'r-', linewidth=2, label='Theoretical Normal')
    
    axes[idx].set_title(f'Sample Size n = {n}')
    axes[idx].set_xlabel('Sample Mean')
    axes[idx].set_ylabel('Density')
    axes[idx].legend()
    axes[idx].grid(True, alpha=0.3)

plt.suptitle('Central Limit Theorem: Uniform → Normal', fontsize=16, y=1.00)
plt.tight_layout()
plt.show()

print(f"Original distribution: Uniform(0, 1)")
print(f"Theoretical mean: 0.5")
print(f"Theoretical std for n=30: {1/(12*30)**0.5:.4f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

# Parameters
num_samples = 10000
sample_sizes = [1, 5, 30, 100]

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes = axes.flatten()

for idx, n in enumerate(sample_sizes):
    # Generate samples from uniform distribution and compute means
    sample_means = []
    for _ in range(num_samples):
        sample = np.random.uniform(0, 1, n)
        sample_means.append(np.mean(sample))
    
    sample_means = np.array(sample_means)
    
    # Plot histogram
    axes[idx].hist(sample_means, bins=50, density=True, alpha=0.7, edgecolor='black', label='Sample Means')
    
    # Overlay theoretical normal distribution
    mu = 0.5  # Mean of uniform(0,1)
    sigma = 1 / np.sqrt(12 * n)  # Std of sample mean
    x = np.linspace(sample_means.min(), sample_means.max(), 100)
    axes[idx].plot(x, stats.norm.pdf(x, mu, sigma), 'r-', linewidth=2, label='Theoretical Normal')
    
    axes[idx].set_title(f'Sample Size n = {n}')
    axes[idx].set_xlabel('Sample Mean')
    axes[idx].set_ylabel('Density')
    axes[idx].legend()
    axes[idx].grid(True, alpha=0.3)

plt.suptitle('Central Limit Theorem: Uniform → Normal', fontsize=16, y=1.00)
plt.tight_layout()
plt.show()

print(f"Original distribution: Uniform(0, 1)")
print(f"Theoretical mean: 0.5")
print(f"Theoretical std for n=30: {1/(12*30)**0.5:.4f}")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

# Parameters
num_samples = 10000
sample_sizes = [1, 5, 30, 100]

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes = axes.flatten()

for idx, n in enumerate(sample_sizes):
    # TODO: Generate samples from uniform distribution and compute means
    sample_means = []
    for _ in range(num_samples):
        sample = np.random.uniform(0, 1, n)
        sample_means.append(np.mean(sample))
    
    sample_means = np.array(sample_means)
    
    # Plot histogram
    axes[idx].hist(sample_means, bins=50, density=True, alpha=0.7, edgecolor='black', label='Sample Means')
    
    # TODO: Overlay theoretical normal distribution
    mu = 0.5  # Mean of uniform(0,1)
    sigma = 1 / np.sqrt(12 * n)  # Std of sample mean
    x = np.linspace(sample_means.min(), sample_means.max(), 100)
    axes[idx].plot(x, stats.norm.pdf(x, mu, sigma), 'r-', linewidth=2, label='Theoretical Normal')
    
    axes[idx].set_title(f'Sample Size n = {n}')
    axes[idx].set_xlabel('Sample Mean')
    axes[idx].set_ylabel('Density')
    axes[idx].legend()
    axes[idx].grid(True, alpha=0.3)

plt.suptitle('Central Limit Theorem: Uniform → Normal', fontsize=16, y=1.00)
plt.tight_layout()
plt.show()

print(f"Original distribution: Uniform(0, 1)")
print(f"Theoretical mean: 0.5")
print(f"Theoretical std for n=30: {1/(12*30)**0.5:.4f}")
`
    },
    {
      title: 'Bayes Theorem & Conditional Probability',
      description: `
## Bayes Theorem & Conditional Probability

### Overview
Bayes' theorem is fundamental to probabilistic machine learning, from Naive Bayes classifiers to Bayesian neural networks.

### Key Concepts

**Conditional Probability**: P(A|B) = probability of A given B
- P(A|B) = P(A ∩ B) / P(B)

**Bayes' Theorem**: Updates beliefs based on evidence
- P(A|B) = P(B|A) × P(A) / P(B)
- P(A): Prior probability
- P(B|A): Likelihood
- P(A|B): Posterior probability

**Applications in ML**:
- Naive Bayes classifier
- Bayesian optimization
- Probabilistic graphical models
- Spam filtering

### Problem Statement
Implement a medical diagnosis example using Bayes' theorem.
Given: Disease prevalence, test accuracy
Find: Probability of having disease given positive test

### Expected Output
- Prior, likelihood, and posterior probabilities
- Visualization of Bayesian updating
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# Medical test scenario
disease_rate = 0.01  # 1% of population has disease (Prior)
test_sensitivity = 0.95  # P(positive | disease) = 95%
test_specificity = 0.90  # P(negative | no disease) = 90%

# TODO: Calculate P(positive test)
# P(positive) = P(positive|disease) × P(disease) + P(positive|no disease) × P(no disease)
p_positive = 

# TODO: Apply Bayes' Theorem
# P(disease | positive) = P(positive | disease) × P(disease) / P(positive)
p_disease_given_positive = 

# Visualize
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Bar chart of probabilities
axes[0].bar(['Prior\nP(Disease)', 'Posterior\nP(Disease|+)'], 
            [disease_rate, p_disease_given_positive],
            color=['blue', 'red'], alpha=0.7, edgecolor='black', linewidth=2)
axes[0].set_ylabel('Probability')
axes[0].set_title('Bayesian Update: Prior → Posterior')
axes[0].grid(True, alpha=0.3, axis='y')

# Confusion matrix visualization
confusion = np.array([[test_sensitivity * disease_rate, (1-test_specificity) * (1-disease_rate)],
                      [(1-test_sensitivity) * disease_rate, test_specificity * (1-disease_rate)]])
im = axes[1].imshow(confusion, cmap='Blues')
axes[1].set_xticks([0, 1])
axes[1].set_yticks([0, 1])
axes[1].set_xticklabels(['Disease', 'No Disease'])
axes[1].set_yticklabels(['Test +', 'Test -'])
axes[1].set_title('Test Performance (Population Proportions)')

# Add text annotations
for i in range(2):
    for j in range(2):
        text = axes[1].text(j, i, f'{confusion[i, j]:.4f}',
                           ha="center", va="center", color="black", fontsize=12, weight='bold')

plt.colorbar(im, ax=axes[1])
plt.tight_layout()
plt.show()

print(f"Prior P(Disease): {disease_rate:.4f} ({disease_rate*100:.2f}%)")
print(f"P(Positive Test): {p_positive:.4f}")
print(f"Posterior P(Disease|Positive): {p_disease_given_positive:.4f} ({p_disease_given_positive*100:.2f}%)")
print(f"\\nInterpretation: Even with a positive test, probability is only {p_disease_given_positive*100:.1f}%")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

# Medical test scenario
disease_rate = 0.01  # 1% of population has disease (Prior)
test_sensitivity = 0.95  # P(positive | disease) = 95%
test_specificity = 0.90  # P(negative | no disease) = 90%

# Calculate P(positive test)
# P(positive) = P(positive|disease) × P(disease) + P(positive|no disease) × P(no disease)
p_positive = test_sensitivity * disease_rate + (1 - test_specificity) * (1 - disease_rate)

# Apply Bayes' Theorem
# P(disease | positive) = P(positive | disease) × P(disease) / P(positive)
p_disease_given_positive = (test_sensitivity * disease_rate) / p_positive

# Visualize
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Bar chart of probabilities
axes[0].bar(['Prior\\nP(Disease)', 'Posterior\\nP(Disease|+)'], 
            [disease_rate, p_disease_given_positive],
            color=['blue', 'red'], alpha=0.7, edgecolor='black', linewidth=2)
axes[0].set_ylabel('Probability')
axes[0].set_title('Bayesian Update: Prior → Posterior')
axes[0].grid(True, alpha=0.3, axis='y')

# Confusion matrix visualization
confusion = np.array([[test_sensitivity * disease_rate, (1-test_specificity) * (1-disease_rate)],
                      [(1-test_sensitivity) * disease_rate, test_specificity * (1-disease_rate)]])
im = axes[1].imshow(confusion, cmap='Blues')
axes[1].set_xticks([0, 1])
axes[1].set_yticks([0, 1])
axes[1].set_xticklabels(['Disease', 'No Disease'])
axes[1].set_yticklabels(['Test +', 'Test -'])
axes[1].set_title('Test Performance (Population Proportions)')

# Add text annotations
for i in range(2):
    for j in range(2):
        text = axes[1].text(j, i, f'{confusion[i, j]:.4f}',
                           ha="center", va="center", color="black", fontsize=12, weight='bold')

plt.colorbar(im, ax=axes[1])
plt.tight_layout()
plt.show()

print(f"Prior P(Disease): {disease_rate:.4f} ({disease_rate*100:.2f}%)")
print(f"P(Positive Test): {p_positive:.4f}")
print(f"Posterior P(Disease|Positive): {p_disease_given_positive:.4f} ({p_disease_given_positive*100:.2f}%)")
print(f"\\nInterpretation: Even with a positive test, probability is only {p_disease_given_positive*100:.1f}%")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

# Medical test scenario
disease_rate = 0.01  # 1% of population has disease (Prior)
test_sensitivity = 0.95  # P(positive | disease) = 95%
test_specificity = 0.90  # P(negative | no disease) = 90%

# TODO: Calculate P(positive test)
# P(positive) = P(positive|disease) × P(disease) + P(positive|no disease) × P(no disease)
p_positive = test_sensitivity * disease_rate + (1 - test_specificity) * (1 - disease_rate)

# TODO: Apply Bayes' Theorem
# P(disease | positive) = P(positive | disease) × P(disease) / P(positive)
p_disease_given_positive = (test_sensitivity * disease_rate) / p_positive

# Visualize
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Bar chart of probabilities
axes[0].bar(['Prior\\nP(Disease)', 'Posterior\\nP(Disease|+)'], 
            [disease_rate, p_disease_given_positive],
            color=['blue', 'red'], alpha=0.7, edgecolor='black', linewidth=2)
axes[0].set_ylabel('Probability')
axes[0].set_title('Bayesian Update: Prior → Posterior')
axes[0].grid(True, alpha=0.3, axis='y')

# Confusion matrix visualization
confusion = np.array([[test_sensitivity * disease_rate, (1-test_specificity) * (1-disease_rate)],
                      [(1-test_sensitivity) * disease_rate, test_specificity * (1-disease_rate)]])
im = axes[1].imshow(confusion, cmap='Blues')
axes[1].set_xticks([0, 1])
axes[1].set_yticks([0, 1])
axes[1].set_xticklabels(['Disease', 'No Disease'])
axes[1].set_yticklabels(['Test +', 'Test -'])
axes[1].set_title('Test Performance (Population Proportions)')

# Add text annotations
for i in range(2):
    for j in range(2):
        text = axes[1].text(j, i, f'{confusion[i, j]:.4f}',
                           ha="center", va="center", color="black", fontsize=12, weight='bold')

plt.colorbar(im, ax=axes[1])
plt.tight_layout()
plt.show()

print(f"Prior P(Disease): {disease_rate:.4f} ({disease_rate*100:.2f}%)")
print(f"P(Positive Test): {p_positive:.4f}")
print(f"Posterior P(Disease|Positive): {p_disease_given_positive:.4f} ({p_disease_given_positive*100:.2f}%)")
print(f"\\nInterpretation: Even with a positive test, probability is only {p_disease_given_positive*100:.1f}%")
`
    },
    {
      title: 'Information Theory & Entropy',
      description: `
## Information Theory & Entropy

### Overview
Information theory provides the mathematical foundation for understanding uncertainty, compression, and learning in machine learning models.

### Key Concepts

**Entropy**: Measure of uncertainty/randomness
- H(X) = -Σ P(x) × log₂(P(x))
- Higher entropy = more uncertainty
- Used in decision trees (information gain)

**Cross-Entropy**: Measures difference between distributions
- Used as loss function in classification
- H(P, Q) = -Σ P(x) × log(Q(x))

**KL Divergence**: Measures how one distribution differs from another
- KL(P||Q) = Σ P(x) × log(P(x)/Q(x))
- Always non-negative
- Used in variational autoencoders

### Problem Statement
Calculate entropy for different probability distributions and visualize the relationship between entropy and uncertainty.

### Expected Output
- Entropy values for different distributions
- Visualization showing entropy vs. probability
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# TODO: Define entropy function
def entropy(probabilities):
    """Calculate Shannon entropy in bits"""
    # Remove zero probabilities to avoid log(0)
    p = probabilities[probabilities > 0]
    return 

# Example distributions
distributions = {
    'Certain': np.array([1.0, 0.0]),
    'Biased': np.array([0.9, 0.1]),
    'Fair': np.array([0.5, 0.5]),
    'Uniform 4': np.array([0.25, 0.25, 0.25, 0.25]),
    'Uniform 8': np.array([0.125] * 8)
}

# Calculate entropies
entropies = {name: entropy(dist) for name, dist in distributions.items()}

# Visualize entropy vs probability for binary case
p_values = np.linspace(0.01, 0.99, 100)
binary_entropies = [entropy(np.array([p, 1-p])) for p in p_values]

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Entropy for different distributions
axes[0].bar(entropies.keys(), entropies.values(), color='steelblue', alpha=0.7, edgecolor='black', linewidth=2)
axes[0].set_ylabel('Entropy (bits)')
axes[0].set_title('Entropy of Different Distributions')
axes[0].grid(True, alpha=0.3, axis='y')
axes[0].tick_params(axis='x', rotation=45)

# Plot 2: Binary entropy function
axes[1].plot(p_values, binary_entropies, 'b-', linewidth=2)
axes[1].axvline(0.5, color='red', linestyle='--', linewidth=2, label='Maximum entropy at p=0.5')
axes[1].set_xlabel('Probability p')
axes[1].set_ylabel('Entropy (bits)')
axes[1].set_title('Binary Entropy Function')
axes[1].grid(True, alpha=0.3)
axes[1].legend()

plt.tight_layout()
plt.show()

print("Entropy values:")
for name, h in entropies.items():
    print(f"{name:12s}: {h:.4f} bits")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

# Define entropy function
def entropy(probabilities):
    """Calculate Shannon entropy in bits"""
    # Remove zero probabilities to avoid log(0)
    p = probabilities[probabilities > 0]
    return -np.sum(p * np.log2(p))

# Example distributions
distributions = {
    'Certain': np.array([1.0, 0.0]),
    'Biased': np.array([0.9, 0.1]),
    'Fair': np.array([0.5, 0.5]),
    'Uniform 4': np.array([0.25, 0.25, 0.25, 0.25]),
    'Uniform 8': np.array([0.125] * 8)
}

# Calculate entropies
entropies = {name: entropy(dist) for name, dist in distributions.items()}

# Visualize entropy vs probability for binary case
p_values = np.linspace(0.01, 0.99, 100)
binary_entropies = [entropy(np.array([p, 1-p])) for p in p_values]

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Entropy for different distributions
axes[0].bar(entropies.keys(), entropies.values(), color='steelblue', alpha=0.7, edgecolor='black', linewidth=2)
axes[0].set_ylabel('Entropy (bits)')
axes[0].set_title('Entropy of Different Distributions')
axes[0].grid(True, alpha=0.3, axis='y')
axes[0].tick_params(axis='x', rotation=45)

# Plot 2: Binary entropy function
axes[1].plot(p_values, binary_entropies, 'b-', linewidth=2)
axes[1].axvline(0.5, color='red', linestyle='--', linewidth=2, label='Maximum entropy at p=0.5')
axes[1].set_xlabel('Probability p')
axes[1].set_ylabel('Entropy (bits)')
axes[1].set_title('Binary Entropy Function')
axes[1].grid(True, alpha=0.3)
axes[1].legend()

plt.tight_layout()
plt.show()

print("Entropy values:")
for name, h in entropies.items():
    print(f"{name:12s}: {h:.4f} bits")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

# TODO: Define entropy function
def entropy(probabilities):
    """Calculate Shannon entropy in bits"""
    # Remove zero probabilities to avoid log(0)
    p = probabilities[probabilities > 0]
    return -np.sum(p * np.log2(p))

# Example distributions
distributions = {
    'Certain': np.array([1.0, 0.0]),
    'Biased': np.array([0.9, 0.1]),
    'Fair': np.array([0.5, 0.5]),
    'Uniform 4': np.array([0.25, 0.25, 0.25, 0.25]),
    'Uniform 8': np.array([0.125] * 8)
}

# Calculate entropies
entropies = {name: entropy(dist) for name, dist in distributions.items()}

# Visualize entropy vs probability for binary case
p_values = np.linspace(0.01, 0.99, 100)
binary_entropies = [entropy(np.array([p, 1-p])) for p in p_values]

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Entropy for different distributions
axes[0].bar(entropies.keys(), entropies.values(), color='steelblue', alpha=0.7, edgecolor='black', linewidth=2)
axes[0].set_ylabel('Entropy (bits)')
axes[0].set_title('Entropy of Different Distributions')
axes[0].grid(True, alpha=0.3, axis='y')
axes[0].tick_params(axis='x', rotation=45)

# Plot 2: Binary entropy function
axes[1].plot(p_values, binary_entropies, 'b-', linewidth=2)
axes[1].axvline(0.5, color='red', linestyle='--', linewidth=2, label='Maximum entropy at p=0.5')
axes[1].set_xlabel('Probability p')
axes[1].set_ylabel('Entropy (bits)')
axes[1].set_title('Binary Entropy Function')
axes[1].grid(True, alpha=0.3)
axes[1].legend()

plt.tight_layout()
plt.show()

print("Entropy values:")
for name, h in entropies.items():
    print(f"{name:12s}: {h:.4f} bits")
`
    },
    {
      title: 'Maximum Likelihood Estimation (MLE)',
      description: `
## Maximum Likelihood Estimation

### Overview
MLE is a fundamental method for estimating model parameters by finding the values that maximize the probability of observing the data. It underpins many ML algorithms.

### Key Concepts

**Likelihood Function**:
- L(θ|data) = P(data|θ)
- Probability of observing the data given parameters θ
- We want to find θ that maximizes L

**Log-Likelihood**:
- ℓ(θ) = log L(θ)
- Easier to work with (products become sums)
- Same maximum as likelihood

**MLE for Normal Distribution**:
- μ_MLE = sample mean
- σ²_MLE = sample variance
- Derivation: Set dℓ/dθ = 0 and solve

**Connection to ML**:
- Linear regression MLE = least squares
- Logistic regression uses MLE
- Cross-entropy loss = negative log-likelihood

### Problem Statement
1. Implement MLE for Gaussian parameters
2. Visualize the likelihood surface
3. Show connection between MLE and loss functions
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
from scipy.optimize import minimize_scalar

np.random.seed(42)

# Generate data from a known Gaussian
true_mu = 5.0
true_sigma = 2.0
data = np.random.normal(true_mu, true_sigma, 100)

# TODO: Compute MLE estimates analytically
mu_mle = 
sigma_mle = 

print(f"True parameters: mu={true_mu}, sigma={true_sigma}")
print(f"MLE estimates: mu={mu_mle:.3f}, sigma={sigma_mle:.3f}")

# TODO: Compute log-likelihood for different mu values
mu_range = np.linspace(3, 7, 200)
log_likelihoods = []

for mu in mu_range:
    # Log-likelihood: sum of log(pdf(x | mu, sigma))
    ll = 
    log_likelihoods.append(ll)

# TODO: Plot log-likelihood
plt.figure(figsize=(10, 6))
plt.plot(mu_range, log_likelihoods)
plt.axvline(mu_mle, color='r', linestyle='--', label=f'MLE: {mu_mle:.3f}')
plt.xlabel('mu')
plt.ylabel('Log-Likelihood')
plt.title('Log-Likelihood vs mu')
plt.legend()
plt.show()
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

true_mu = 5.0
true_sigma = 2.0
data = np.random.normal(true_mu, true_sigma, 100)

# MLE estimates
mu_mle = np.mean(data)
sigma_mle = np.std(data)  # MLE uses N, not N-1

print(f"True parameters: mu={true_mu}, sigma={true_sigma}")
print(f"MLE estimates: mu={mu_mle:.3f}, sigma={sigma_mle:.3f}")

# Log-likelihood for different mu values
mu_range = np.linspace(3, 7, 200)
log_likelihoods = []

for mu in mu_range:
    ll = np.sum(stats.norm.logpdf(data, loc=mu, scale=sigma_mle))
    log_likelihoods.append(ll)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Log-likelihood curve
axes[0].plot(mu_range, log_likelihoods, 'b-', linewidth=2)
axes[0].axvline(mu_mle, color='r', linestyle='--', linewidth=2, label=f'MLE: mu={mu_mle:.3f}')
axes[0].axvline(true_mu, color='g', linestyle=':', linewidth=2, label=f'True: mu={true_mu}')
axes[0].set_xlabel('mu')
axes[0].set_ylabel('Log-Likelihood')
axes[0].set_title('Log-Likelihood vs mu')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Plot 2: Data histogram with MLE fit
axes[1].hist(data, bins=20, density=True, alpha=0.7, edgecolor='black', label='Data')
x = np.linspace(data.min()-1, data.max()+1, 200)
axes[1].plot(x, stats.norm.pdf(x, mu_mle, sigma_mle), 'r-', linewidth=2, label='MLE fit')
axes[1].plot(x, stats.norm.pdf(x, true_mu, true_sigma), 'g--', linewidth=2, label='True distribution')
axes[1].set_title('MLE Gaussian Fit')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Connection to loss: MSE = -log-likelihood for Gaussian
print(f"\\nConnection to ML:")
print(f"MSE loss = negative log-likelihood for Gaussian errors")
print(f"Cross-entropy loss = negative log-likelihood for Bernoulli")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)
data = np.random.normal(5.0, 2.0, 100)

mu_mle = np.mean(data)
sigma_mle = np.std(data)
print(f"True: mu=5.0, sigma=2.0")
print(f"MLE: mu={mu_mle:.3f}, sigma={sigma_mle:.3f}")

mu_range = np.linspace(3, 7, 200)
ll = [np.sum(stats.norm.logpdf(data, loc=m, scale=sigma_mle)) for m in mu_range]

plt.figure(figsize=(10, 5))
plt.plot(mu_range, ll, 'b-')
plt.axvline(mu_mle, color='r', linestyle='--', label=f'MLE={mu_mle:.3f}')
plt.xlabel('mu'); plt.ylabel('Log-Likelihood')
plt.title('MLE for Gaussian Mean'); plt.legend(); plt.grid(True, alpha=0.3)
plt.show()
`
    },
    {
      title: 'Hypothesis Testing & Statistical Tests',
      description: `
## Hypothesis Testing & Statistical Tests

### Overview
Hypothesis testing provides a framework for making decisions from data. It's essential for A/B testing, feature selection, and validating ML model improvements.

### Key Concepts

**Hypothesis Framework**:
- Null hypothesis (H0): No effect / no difference
- Alternative hypothesis (H1): There is an effect
- p-value: Probability of observing data if H0 is true
- Significance level (α): Threshold for rejection (typically 0.05)

**Common Tests**:
- t-test: Compare means of two groups
- Chi-square test: Test categorical independence
- ANOVA: Compare means of 3+ groups
- Kolmogorov-Smirnov: Compare distributions

**Type I & Type II Errors**:
- Type I (False Positive): Reject H0 when it's true (α)
- Type II (False Negative): Fail to reject H0 when it's false (β)
- Power = 1 - β: Probability of correctly rejecting H0

**A/B Testing**:
- Compare treatment vs control
- Calculate sample size for desired power
- Use appropriate statistical test

### Problem Statement
1. Perform t-tests and interpret results
2. Conduct a chi-square test
3. Simulate an A/B test scenario
4. Understand Type I/II errors through simulation
`,
      starterCode: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

np.random.seed(42)

# TODO: A/B test scenario - website conversion rates
# Control: 1000 visitors, 120 conversions (12%)
# Treatment: 1000 visitors, 145 conversions (14.5%)

control_n, control_conv = 1000, 120
treatment_n, treatment_conv = 1000, 145

control_rate = control_conv / control_n
treatment_rate = treatment_conv / treatment_n

# TODO: Two-proportion z-test
p_pool = (control_conv + treatment_conv) / (control_n + treatment_n)
se = np.sqrt(p_pool * (1 - p_pool) * (1/control_n + 1/treatment_n))
z_stat = (treatment_rate - control_rate) / se
p_value = 

print(f"Control rate: {control_rate:.3f}")
print(f"Treatment rate: {treatment_rate:.3f}")
print(f"Z-statistic: {z_stat:.3f}")
print(f"P-value: {p_value:.4f}")

# TODO: t-test comparing two distributions
group_a = np.random.normal(100, 15, 50)
group_b = np.random.normal(108, 15, 50)

t_stat, t_pvalue = 

print(f"\\nt-test: t={t_stat:.3f}, p={t_pvalue:.4f}")
`,
      solution: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

np.random.seed(42)

# A/B test
control_n, control_conv = 1000, 120
treatment_n, treatment_conv = 1000, 145

control_rate = control_conv / control_n
treatment_rate = treatment_conv / treatment_n

p_pool = (control_conv + treatment_conv) / (control_n + treatment_n)
se = np.sqrt(p_pool * (1 - p_pool) * (1/control_n + 1/treatment_n))
z_stat = (treatment_rate - control_rate) / se
p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))

print("=== A/B Test ===")
print(f"Control: {control_rate:.1%}, Treatment: {treatment_rate:.1%}")
print(f"Z-statistic: {z_stat:.3f}, P-value: {p_value:.4f}")
print(f"Significant at 0.05? {'Yes' if p_value < 0.05 else 'No'}")

# t-test
group_a = np.random.normal(100, 15, 50)
group_b = np.random.normal(108, 15, 50)
t_stat, t_pvalue = stats.ttest_ind(group_a, group_b)

print(f"\\n=== Two-sample t-test ===")
print(f"Group A mean: {group_a.mean():.2f}, Group B mean: {group_b.mean():.2f}")
print(f"t={t_stat:.3f}, p={t_pvalue:.4f}")
print(f"Significant at 0.05? {'Yes' if t_pvalue < 0.05 else 'No'}")

# Type I error simulation
print("\\n=== Type I Error Simulation ===")
false_positives = 0
n_simulations = 10000
alpha = 0.05

for _ in range(n_simulations):
    # Both from same distribution (H0 is true)
    a = np.random.normal(100, 15, 30)
    b = np.random.normal(100, 15, 30)
    _, p = stats.ttest_ind(a, b)
    if p < alpha:
        false_positives += 1

print(f"Expected Type I rate: {alpha}")
print(f"Observed Type I rate: {false_positives/n_simulations:.4f}")

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
axes[0].hist(group_a, bins=15, alpha=0.6, label=f'Group A (mean={group_a.mean():.1f})')
axes[0].hist(group_b, bins=15, alpha=0.6, label=f'Group B (mean={group_b.mean():.1f})')
axes[0].set_title(f't-test (p={t_pvalue:.4f})')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

axes[1].bar(['Control', 'Treatment'], [control_rate, treatment_rate],
           color=['steelblue', 'coral'], edgecolor='black')
axes[1].set_title(f'A/B Test (p={p_value:.4f})')
axes[1].set_ylabel('Conversion Rate')
axes[1].grid(True, alpha=0.3, axis='y')
plt.tight_layout()
plt.show()
`,
      code: `import numpy as np
from scipy import stats

np.random.seed(42)

# A/B test
ctrl_n, ctrl_c = 1000, 120
trt_n, trt_c = 1000, 145
p_pool = (ctrl_c + trt_c) / (ctrl_n + trt_n)
se = np.sqrt(p_pool * (1-p_pool) * (1/ctrl_n + 1/trt_n))
z = (trt_c/trt_n - ctrl_c/ctrl_n) / se
p_val = 2 * (1 - stats.norm.cdf(abs(z)))
print(f"A/B Test: z={z:.3f}, p={p_val:.4f}, Significant: {p_val < 0.05}")

# t-test
a = np.random.normal(100, 15, 50)
b = np.random.normal(108, 15, 50)
t, p = stats.ttest_ind(a, b)
print(f"t-test: t={t:.3f}, p={p:.4f}, Significant: {p < 0.05}")

# Type I error rate
fp = sum(1 for _ in range(10000)
        if stats.ttest_ind(np.random.normal(0,1,30), np.random.normal(0,1,30))[1] < 0.05)
print(f"Type I error rate: {fp/10000:.4f} (expected: 0.05)")
`
    },
    {
      title: 'Convex Optimization',
      description: `
## Convex Optimization

### Overview
Convex optimization guarantees finding global minima, making it the mathematical foundation for many ML training algorithms. Understanding convexity helps design better loss functions and training procedures.

### Key Concepts

**Convex Functions**:
- A function f is convex if: f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y)
- Visually: line segment between any two points lies above the graph
- Any local minimum is a global minimum

**Non-Convex Functions**:
- Have multiple local minima
- No guarantee of finding global minimum
- Neural network loss surfaces are non-convex

**Gradient Descent on Convex Functions**:
- Guaranteed convergence to global minimum
- Learning rate affects convergence speed
- Convex: linear regression, logistic regression, SVM
- Non-convex: neural networks, deep learning

**Why It Matters for ML**:
- Loss function design affects optimization
- Convex relaxations of hard problems
- Regularization keeps problems well-conditioned

### Problem Statement
1. Visualize convex vs non-convex functions
2. Compare gradient descent convergence
3. Demonstrate local vs global minima
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# TODO: Define convex and non-convex functions
def convex_func(x):
    """Convex: f(x) = x^2 + 2"""
    return x**2 + 2

def non_convex_func(x):
    """Non-convex: f(x) = x^4 - 5x^2 + 4"""
    return x**4 - 5*x**2 + 4

# TODO: Gradient descent implementation
def gradient_descent(func, grad, x0, lr=0.1, n_steps=50):
    path = [x0]
    x = x0
    for _ in range(n_steps):
        x = x - lr * grad(x)
        path.append(x)
    return np.array(path)

# TODO: Define gradients
def convex_grad(x):
    return  # derivative of x^2 + 2

def non_convex_grad(x):
    return  # derivative of x^4 - 5x^2 + 4

# TODO: Run gradient descent from different starting points
# and compare convergence

print("Optimization comparison ready")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

def convex_func(x):
    return x**2 + 2

def non_convex_func(x):
    return x**4 - 5*x**2 + 4

def gradient_descent(func, grad, x0, lr=0.1, n_steps=50):
    path = [x0]
    x = x0
    for _ in range(n_steps):
        x = x - lr * grad(x)
        path.append(x)
    return np.array(path)

def convex_grad(x):
    return 2 * x

def non_convex_grad(x):
    return 4 * x**3 - 10 * x

# Run from different starting points
starts = [-3, -1, 0.5, 3]

fig, axes = plt.subplots(1, 2, figsize=(14, 6))
x = np.linspace(-3.5, 3.5, 300)

# Convex
axes[0].plot(x, convex_func(x), 'b-', linewidth=2)
for x0 in starts:
    path = gradient_descent(convex_func, convex_grad, x0, lr=0.1)
    axes[0].plot(path, convex_func(path), 'o-', markersize=4, alpha=0.7, label=f'x0={x0}')
axes[0].set_title('Convex: x² + 2 (all converge to same point)')
axes[0].set_xlabel('x')
axes[0].set_ylabel('f(x)')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Non-convex
axes[1].plot(x, non_convex_func(x), 'b-', linewidth=2)
for x0 in starts:
    path = gradient_descent(non_convex_func, non_convex_grad, x0, lr=0.01)
    axes[1].plot(path, non_convex_func(path), 'o-', markersize=4, alpha=0.7, label=f'x0={x0}')
axes[1].set_title('Non-convex: x\u2074 - 5x\u00b2 + 4 (different local minima!)')
axes[1].set_xlabel('x')
axes[1].set_ylabel('f(x)')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("Convex function: All starting points converge to x=0")
for x0 in starts:
    path = gradient_descent(convex_func, convex_grad, x0, lr=0.1)
    print(f"  Start={x0:+.1f} -> Final={path[-1]:.4f}")

print("\\nNon-convex function: Different starting points reach different minima")
for x0 in starts:
    path = gradient_descent(non_convex_func, non_convex_grad, x0, lr=0.01)
    print(f"  Start={x0:+.1f} -> Final={path[-1]:.4f}, f(x)={non_convex_func(path[-1]):.4f}")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt

def convex_f(x): return x**2 + 2
def convex_g(x): return 2 * x
def nonconvex_f(x): return x**4 - 5*x**2 + 4
def nonconvex_g(x): return 4*x**3 - 10*x

def gd(grad, x0, lr, steps):
    path = [x0]
    for _ in range(steps):
        x0 = x0 - lr * grad(x0)
        path.append(x0)
    return np.array(path)

starts = [-3, -1, 0.5, 3]
print("Convex (all converge to x=0):")
for s in starts:
    p = gd(convex_g, s, 0.1, 50)
    print(f"  x0={s:+.1f} -> {p[-1]:.4f}")

print("\\nNon-convex (different local minima):")
for s in starts:
    p = gd(nonconvex_g, s, 0.01, 50)
    print(f"  x0={s:+.1f} -> {p[-1]:.4f}, f={nonconvex_f(p[-1]):.4f}")
`
    },
    {
      title: 'Matrix Decomposition (SVD)',
      description: `
## Matrix Decomposition (SVD)

### Overview
Singular Value Decomposition breaks any matrix into three simpler matrices. It's the mathematical foundation for PCA, dimensionality reduction, and recommendation systems.

### Key Concepts

**SVD: A = UΣVᵀ**:
- U: Left singular vectors (m × m orthogonal matrix)
- Σ: Diagonal matrix of singular values (sorted descending)
- Vᵀ: Right singular vectors (n × n orthogonal matrix)
- Singular values indicate importance of each component

**Truncated SVD**:
- Keep only top-k singular values
- Best rank-k approximation (Eckart-Young theorem)
- Used for dimensionality reduction and noise removal

**Connection to PCA**:
- PCA on centered data = SVD of centered data matrix
- Principal components = right singular vectors
- Explained variance ∝ singular values squared

**Applications**:
- Image compression (keep top-k components)
- Latent Semantic Analysis (NLP)
- Recommendation systems (matrix factorization)
- Noise reduction

### Problem Statement
1. Compute SVD of a matrix
2. Demonstrate image compression using truncated SVD
3. Show connection between SVD and PCA
4. Visualize information retained vs components
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

# Create a sample matrix (simulate grayscale image)
from sklearn.datasets import load_digits
digits = load_digits()
image = digits.images[0]  # 8x8 digit image

print(f"Original image shape: {image.shape}")

# TODO: Compute full SVD
U, S, Vt = np.linalg.svd(image, full_matrices=False)

print(f"U shape: {U.shape}")
print(f"Singular values: {S}")
print(f"Vt shape: {Vt.shape}")

# TODO: Reconstruct with different number of components
components = [1, 2, 4, 8]
fig, axes = plt.subplots(1, len(components) + 1, figsize=(15, 3))

axes[0].imshow(image, cmap='gray')
axes[0].set_title('Original')

for idx, k in enumerate(components):
    # Truncated reconstruction
    reconstructed = 
    axes[idx + 1].imshow(reconstructed, cmap='gray')
    axes[idx + 1].set_title(f'k={k}')

plt.tight_layout()
plt.show()

# TODO: Plot cumulative energy
energy = np.cumsum(S**2) / np.sum(S**2)
print(f"Energy retained with k=2: {energy[1]:.1%}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits

np.random.seed(42)

digits = load_digits()
image = digits.images[0]

print(f"Original image shape: {image.shape}")

# Full SVD
U, S, Vt = np.linalg.svd(image, full_matrices=False)

print(f"U: {U.shape}, S: {S.shape}, Vt: {Vt.shape}")
print(f"Singular values: {S.round(2)}")

# Reconstruct with different k
components = [1, 2, 4, 8]
fig, axes = plt.subplots(1, len(components) + 1, figsize=(15, 3))

axes[0].imshow(image, cmap='gray')
axes[0].set_title('Original')
axes[0].axis('off')

for idx, k in enumerate(components):
    reconstructed = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]
    error = np.mean((image - reconstructed)**2)
    axes[idx + 1].imshow(reconstructed, cmap='gray')
    axes[idx + 1].set_title(f'k={k} (MSE={error:.2f})')
    axes[idx + 1].axis('off')

plt.suptitle('SVD Image Compression', fontsize=14)
plt.tight_layout()
plt.show()

# Energy plot
energy = np.cumsum(S**2) / np.sum(S**2)

plt.figure(figsize=(8, 5))
plt.plot(range(1, len(energy)+1), energy, 'bo-', markersize=8)
plt.axhline(0.95, color='r', linestyle='--', label='95% energy')
plt.xlabel('Number of Components')
plt.ylabel('Cumulative Energy')
plt.title('SVD: Cumulative Energy vs Components')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

for k in [1, 2, 4, 8]:
    print(f"k={k}: {energy[k-1]:.1%} energy retained")

# Connection to PCA
print("\\nSVD-PCA Connection:")
print("PCA eigenvalues = singular_values^2 / (n-1)")
print("PCA components = right singular vectors (V)")
`,
      code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits

image = load_digits().images[0]
U, S, Vt = np.linalg.svd(image, full_matrices=False)

print(f"Singular values: {S.round(2)}")

for k in [1, 2, 4, 8]:
    recon = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]
    energy = np.sum(S[:k]**2) / np.sum(S**2)
    mse = np.mean((image - recon)**2)
    print(f"k={k}: energy={energy:.1%}, MSE={mse:.2f}")
`
    }
  ]
};
