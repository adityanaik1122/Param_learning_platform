export const phase5DeepLearningContent = {
  id: 5,
  title: 'Phase 5: Deep Learning',
  topics: [
    'Neural Network Fundamentals',
    'Backpropagation & Optimization',
    'CNNs & Computer Vision',
    'RNNs & Sequential Data',
    'Transformers & Attention',
    'Regularization Techniques',
    'Autoencoders & Variational Autoencoders',
    'Hyperparameter Tuning (Optuna)',
    'Practical Training Tips'
  ],
  lessons: [
    {
      title: 'Neural Network Fundamentals',
      description: `
## Neural Network Fundamentals

### Overview
Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) organized in layers that learn to perform tasks by processing examples.

### Key Concepts

**Architecture Components**:
- Input Layer: Receives raw data
- Hidden Layers: Process and transform data
- Output Layer: Produces final predictions
- Weights & Biases: Learnable parameters

**Activation Functions**:
- ReLU: f(x) = max(0, x) - Most common
- Sigmoid: f(x) = 1/(1+e^-x) - Output between 0 and 1
- Tanh: f(x) = (e^x - e^-x)/(e^x + e^-x) - Output between -1 and 1
- Softmax: Converts logits to probabilities

**Forward Propagation**:
- Data flows from input to output
- Each layer applies: output = activation(weights × input + bias)
- Final layer produces predictions

**Loss Functions**:
- Mean Squared Error (MSE): For regression
- Cross-Entropy: For classification
- Measures difference between predictions and actual values

### Problem Statement
1. Build a simple neural network from scratch
2. Implement forward propagation
3. Train on a classification dataset
4. Visualize decision boundaries

### Expected Output
- Model accuracy on test data
- Decision boundary visualization
- Training loss curve
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

# Generate dataset
np.random.seed(42)
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Define activation functions
def relu(x):
    return  # max(0, x)

def sigmoid(x):
    return  # 1 / (1 + exp(-x))

# TODO: Initialize network parameters
def initialize_parameters(input_size, hidden_size, output_size):
    np.random.seed(42)
    W1 =  # Random weights for layer 1
    b1 =  # Zeros for bias 1
    W2 =  # Random weights for layer 2
    b2 =  # Zeros for bias 2
    return {'W1': W1, 'b1': b1, 'W2': W2, 'b2': b2}

# TODO: Forward propagation
def forward_propagation(X, parameters):
    W1, b1 = parameters['W1'], parameters['b1']
    W2, b2 = parameters['W2'], parameters['b2']
    
    Z1 =  # Linear transformation
    A1 =  # Apply ReLU
    Z2 =  # Linear transformation
    A2 =  # Apply Sigmoid
    
    return A2

# Initialize and train
params = initialize_parameters(2, 10, 1)
predictions = forward_propagation(X_test, params)
print(f"Predictions shape: {predictions.shape}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

np.random.seed(42)
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def initialize_parameters(input_size, hidden_size, output_size):
    np.random.seed(42)
    W1 = np.random.randn(input_size, hidden_size) * 0.01
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, output_size) * 0.01
    b2 = np.zeros((1, output_size))
    return {'W1': W1, 'b1': b1, 'W2': W2, 'b2': b2}

def forward_propagation(X, parameters):
    W1, b1 = parameters['W1'], parameters['b1']
    W2, b2 = parameters['W2'], parameters['b2']
    
    Z1 = np.dot(X, W1) + b1
    A1 = relu(Z1)
    Z2 = np.dot(A1, W2) + b2
    A2 = sigmoid(Z2)
    
    cache = {'Z1': Z1, 'A1': A1, 'Z2': Z2, 'A2': A2}
    return A2, cache

def compute_loss(A2, y):
    m = y.shape[0]
    loss = -np.mean(y * np.log(A2 + 1e-8) + (1 - y) * np.log(1 - A2 + 1e-8))
    return loss

params = initialize_parameters(2, 10, 1)
predictions, cache = forward_propagation(X_test, params)
y_pred = (predictions > 0.5).astype(int)
accuracy = np.mean(y_pred.flatten() == y_test)

print(f"Initial Accuracy: {accuracy:.3f}")
print(f"Predictions shape: {predictions.shape}")
`,
      code: `import numpy as np
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

np.random.seed(42)
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def initialize_parameters(input_size, hidden_size, output_size):
    np.random.seed(42)
    W1 = np.random.randn(input_size, hidden_size) * 0.01
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, output_size) * 0.01
    b2 = np.zeros((1, output_size))
    return {'W1': W1, 'b1': b1, 'W2': W2, 'b2': b2}

def forward_propagation(X, parameters):
    W1, b1 = parameters['W1'], parameters['b1']
    W2, b2 = parameters['W2'], parameters['b2']
    Z1 = np.dot(X, W1) + b1
    A1 = relu(Z1)
    Z2 = np.dot(A1, W2) + b2
    A2 = sigmoid(Z2)
    return A2

params = initialize_parameters(2, 10, 1)
predictions = forward_propagation(X_test, params)
y_pred = (predictions > 0.5).astype(int)
accuracy = np.mean(y_pred.flatten() == y_test)
print(f"Accuracy: {accuracy:.3f}")
`
    },
    {
      title: 'Backpropagation & Gradient Descent',
      description: `
## Backpropagation & Gradient Descent

### Overview
Backpropagation is the algorithm that enables neural networks to learn. It computes gradients of the loss function with respect to each weight, allowing us to update parameters to minimize error.

### Key Concepts

**Gradient Descent**:
- Iterative optimization algorithm
- Updates weights in direction of steepest descent
- Learning rate controls step size
- Formula: W = W - learning_rate × gradient

**Backpropagation**:
- Computes gradients using chain rule
- Propagates error backward through network
- Efficient computation of all gradients in one pass

**Chain Rule**:
- ∂Loss/∂W = ∂Loss/∂output × ∂output/∂W
- Allows gradient computation layer by layer

**Optimization Variants**:
- SGD: Stochastic Gradient Descent
- Momentum: Adds velocity to updates
- Adam: Adaptive learning rates per parameter

### Problem Statement
1. Implement backpropagation from scratch
2. Train neural network with gradient descent
3. Visualize loss curve over epochs
4. Compare different learning rates

### Expected Output
- Training and validation loss curves
- Final model accuracy
- Weight update visualization
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

np.random.seed(42)
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
y_train = y_train.reshape(-1, 1)
y_test = y_test.reshape(-1, 1)

def relu(x):
    return np.maximum(0, x)

def relu_derivative(x):
    return  # TODO: 1 if x > 0, else 0

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def sigmoid_derivative(x):
    return  # TODO: sigmoid(x) * (1 - sigmoid(x))

# TODO: Implement backward propagation
def backward_propagation(X, y, cache, parameters):
    m = X.shape[0]
    W1, W2 = parameters['W1'], parameters['W2']
    A1, A2 = cache['A1'], cache['A2']
    Z1 = cache['Z1']
    
    # Output layer gradient
    dZ2 =  # A2 - y
    dW2 =  # (1/m) * A1.T @ dZ2
    db2 =  # (1/m) * sum(dZ2)
    
    # Hidden layer gradient
    dA1 =  # dZ2 @ W2.T
    dZ1 =  # dA1 * relu_derivative(Z1)
    dW1 =  # (1/m) * X.T @ dZ1
    db1 =  # (1/m) * sum(dZ1)
    
    return {'dW1': dW1, 'db1': db1, 'dW2': dW2, 'db2': db2}

# TODO: Update parameters
def update_parameters(parameters, gradients, learning_rate):
    parameters['W1'] =  # W1 - learning_rate * dW1
    parameters['b1'] =  # b1 - learning_rate * db1
    parameters['W2'] =  # W2 - learning_rate * dW2
    parameters['b2'] =  # b2 - learning_rate * db2
    return parameters

print("Backpropagation implementation ready")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

np.random.seed(42)
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
y_train = y_train.reshape(-1, 1)
y_test = y_test.reshape(-1, 1)

def relu(x):
    return np.maximum(0, x)

def relu_derivative(x):
    return (x > 0).astype(float)

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def sigmoid_derivative(x):
    s = sigmoid(x)
    return s * (1 - s)

def initialize_parameters(input_size, hidden_size, output_size):
    np.random.seed(42)
    W1 = np.random.randn(input_size, hidden_size) * 0.1
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, output_size) * 0.1
    b2 = np.zeros((1, output_size))
    return {'W1': W1, 'b1': b1, 'W2': W2, 'b2': b2}

def forward_propagation(X, parameters):
    W1, b1 = parameters['W1'], parameters['b1']
    W2, b2 = parameters['W2'], parameters['b2']
    Z1 = np.dot(X, W1) + b1
    A1 = relu(Z1)
    Z2 = np.dot(A1, W2) + b2
    A2 = sigmoid(Z2)
    return A2, {'Z1': Z1, 'A1': A1, 'Z2': Z2, 'A2': A2}

def backward_propagation(X, y, cache, parameters):
    m = X.shape[0]
    W2 = parameters['W2']
    A1, A2 = cache['A1'], cache['A2']
    Z1 = cache['Z1']
    
    dZ2 = A2 - y
    dW2 = (1/m) * np.dot(A1.T, dZ2)
    db2 = (1/m) * np.sum(dZ2, axis=0, keepdims=True)
    
    dA1 = np.dot(dZ2, W2.T)
    dZ1 = dA1 * relu_derivative(Z1)
    dW1 = (1/m) * np.dot(X.T, dZ1)
    db1 = (1/m) * np.sum(dZ1, axis=0, keepdims=True)
    
    return {'dW1': dW1, 'db1': db1, 'dW2': dW2, 'db2': db2}

def update_parameters(parameters, gradients, learning_rate):
    parameters['W1'] -= learning_rate * gradients['dW1']
    parameters['b1'] -= learning_rate * gradients['db1']
    parameters['W2'] -= learning_rate * gradients['dW2']
    parameters['b2'] -= learning_rate * gradients['db2']
    return parameters

# Train
params = initialize_parameters(2, 20, 1)
losses = []
for epoch in range(1000):
    A2, cache = forward_propagation(X_train, params)
    loss = -np.mean(y_train * np.log(A2 + 1e-8) + (1 - y_train) * np.log(1 - A2 + 1e-8))
    losses.append(loss)
    grads = backward_propagation(X_train, y_train, cache, params)
    params = update_parameters(params, grads, 0.5)

predictions, _ = forward_propagation(X_test, params)
accuracy = np.mean((predictions > 0.5).astype(int) == y_test)
print(f"Final Accuracy: {accuracy:.3f}")

plt.plot(losses)
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Training Loss')
plt.show()
`,
      code: `import numpy as np
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

np.random.seed(42)
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
y_train = y_train.reshape(-1, 1)
y_test = y_test.reshape(-1, 1)

def relu(x):
    return np.maximum(0, x)

def relu_derivative(x):
    return (x > 0).astype(float)

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def initialize_parameters(input_size, hidden_size, output_size):
    np.random.seed(42)
    return {
        'W1': np.random.randn(input_size, hidden_size) * 0.1,
        'b1': np.zeros((1, hidden_size)),
        'W2': np.random.randn(hidden_size, output_size) * 0.1,
        'b2': np.zeros((1, output_size))
    }

def forward_propagation(X, params):
    Z1 = np.dot(X, params['W1']) + params['b1']
    A1 = relu(Z1)
    Z2 = np.dot(A1, params['W2']) + params['b2']
    A2 = sigmoid(Z2)
    return A2, {'Z1': Z1, 'A1': A1, 'A2': A2}

def backward_propagation(X, y, cache, params):
    m = X.shape[0]
    dZ2 = cache['A2'] - y
    dW2 = (1/m) * np.dot(cache['A1'].T, dZ2)
    db2 = (1/m) * np.sum(dZ2, axis=0, keepdims=True)
    dA1 = np.dot(dZ2, params['W2'].T)
    dZ1 = dA1 * relu_derivative(cache['Z1'])
    dW1 = (1/m) * np.dot(X.T, dZ1)
    db1 = (1/m) * np.sum(dZ1, axis=0, keepdims=True)
    return {'dW1': dW1, 'db1': db1, 'dW2': dW2, 'db2': db2}

params = initialize_parameters(2, 20, 1)
for epoch in range(1000):
    A2, cache = forward_propagation(X_train, params)
    grads = backward_propagation(X_train, y_train, cache, params)
    for key in params:
        params[key] -= 0.5 * grads['d' + key]

predictions, _ = forward_propagation(X_test, params)
print(f"Accuracy: {np.mean((predictions > 0.5).astype(int) == y_test):.3f}")
`
    },
    {
      title: 'Deep Neural Networks with Keras',
      description: `
## Deep Neural Networks with Keras

### Overview
Keras is a high-level neural network API that makes building deep learning models simple and intuitive. It runs on top of TensorFlow and provides a user-friendly interface.

### Key Concepts

**Sequential API**:
- Stack layers linearly
- Simple and intuitive
- Good for most architectures

**Dense Layers**:
- Fully connected layers
- Each neuron connects to all neurons in previous layer
- Most common layer type

**Dropout**:
- Regularization technique
- Randomly drops neurons during training
- Prevents overfitting

**Batch Normalization**:
- Normalizes layer inputs
- Speeds up training
- Improves stability

### Problem Statement
1. Build deep neural network with Keras
2. Add dropout and batch normalization
3. Train on MNIST digit classification
4. Evaluate performance

### Expected Output
- Training history (loss and accuracy)
- Test accuracy
- Confusion matrix
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist
from sklearn.metrics import confusion_matrix
import seaborn as sns

# Load MNIST dataset
(X_train, y_train), (X_test, y_test) = mnist.load_data()

# TODO: Preprocess data
X_train =  # Normalize to [0, 1]
X_test =  # Normalize to [0, 1]
X_train =  # Flatten to 1D
X_test =  # Flatten to 1D

# TODO: Build model
model = keras.Sequential([
    layers.Dense(, activation='relu', input_shape=(784,)),
    layers.Dropout(),
    layers.Dense(, activation='relu'),
    layers.Dropout(),
    layers.Dense(10, activation='softmax')
])

# TODO: Compile model
model.compile(
    optimizer='',
    loss='',
    metrics=['accuracy']
)

# TODO: Train model
history = model.fit(
    X_train, y_train,
    epochs=,
    batch_size=,
    validation_split=0.2,
    verbose=1
)

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {test_acc:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist
from sklearn.metrics import confusion_matrix
import seaborn as sns

(X_train, y_train), (X_test, y_test) = mnist.load_data()

# Preprocess
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

# Build model
model = keras.Sequential([
    layers.Dense(512, activation='relu', input_shape=(784,)),
    layers.Dropout(0.3),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(10, activation='softmax')
])

# Compile
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train
history = model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=128,
    validation_split=0.2,
    verbose=1
)

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Accuracy: {test_acc:.3f}")

# Plot training history
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.title('Loss Curves')

plt.subplot(1, 2, 2)
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Accuracy Curves')
plt.tight_layout()
plt.show()

# Confusion matrix
y_pred = np.argmax(model.predict(X_test), axis=1)
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist

(X_train, y_train), (X_test, y_test) = mnist.load_data()

X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

model = keras.Sequential([
    layers.Dense(512, activation='relu', input_shape=(784,)),
    layers.Dropout(0.3),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

history = model.fit(X_train, y_train, epochs=10, batch_size=128, validation_split=0.2, verbose=1)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Accuracy: {test_acc:.3f}")
`
    },
    {
      title: 'Convolutional Neural Networks (CNNs)',
      description: `
## Convolutional Neural Networks

### Overview
CNNs are specialized neural networks for processing grid-like data such as images. They use convolutional layers to automatically learn spatial hierarchies of features.

### Key Concepts

**Convolutional Layer**:
- Applies filters/kernels to input
- Detects local patterns (edges, textures)
- Parameter sharing reduces model size
- Preserves spatial relationships

**Pooling Layer**:
- Downsamples feature maps
- Reduces spatial dimensions
- Max pooling: Takes maximum value
- Average pooling: Takes average value

**CNN Architecture**:
- Conv → ReLU → Pool → Conv → ReLU → Pool → Flatten → Dense
- Early layers detect simple features
- Deeper layers detect complex patterns

**Feature Maps**:
- Output of convolutional layers
- Each filter produces one feature map
- Multiple filters learn different features

### Problem Statement
1. Build CNN for image classification
2. Use convolutional and pooling layers
3. Train on CIFAR-10 dataset
4. Visualize learned filters

### Expected Output
- Model accuracy on test images
- Training curves
- Sample predictions with confidence scores
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import cifar10

# Load CIFAR-10
(X_train, y_train), (X_test, y_test) = cifar10.load_data()
class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 
               'dog', 'frog', 'horse', 'ship', 'truck']

# TODO: Normalize data
X_train =  # Scale to [0, 1]
X_test =  # Scale to [0, 1]

# TODO: Build CNN
model = keras.Sequential([
    # First convolutional block
    layers.Conv2D(, kernel_size=, activation='relu', input_shape=(32, 32, 3)),
    layers.MaxPooling2D(pool_size=),
    
    # Second convolutional block
    layers.Conv2D(, kernel_size=, activation='relu'),
    layers.MaxPooling2D(pool_size=),
    
    # Third convolutional block
    layers.Conv2D(, kernel_size=, activation='relu'),
    
    # Flatten and dense layers
    layers.Flatten(),
    layers.Dense(, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

# TODO: Compile and train
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(
    X_train, y_train,
    epochs=,
    batch_size=,
    validation_split=0.2
)

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {test_acc:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import cifar10

(X_train, y_train), (X_test, y_test) = cifar10.load_data()
class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 
               'dog', 'frog', 'horse', 'ship', 'truck']

# Normalize
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

# Build CNN
model = keras.Sequential([
    layers.Conv2D(32, kernel_size=3, activation='relu', padding='same', input_shape=(32, 32, 3)),
    layers.BatchNormalization(),
    layers.Conv2D(32, kernel_size=3, activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.MaxPooling2D(pool_size=2),
    layers.Dropout(0.25),
    
    layers.Conv2D(64, kernel_size=3, activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.Conv2D(64, kernel_size=3, activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.MaxPooling2D(pool_size=2),
    layers.Dropout(0.25),
    
    layers.Conv2D(128, kernel_size=3, activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.Dropout(0.25),
    
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.BatchNormalization(),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

history = model.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2, verbose=1)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Accuracy: {test_acc:.3f}")

# Visualize predictions
predictions = model.predict(X_test[:16])
fig, axes = plt.subplots(4, 4, figsize=(12, 12))
for i, ax in enumerate(axes.flat):
    ax.imshow(X_test[i])
    pred_label = class_names[np.argmax(predictions[i])]
    true_label = class_names[y_test[i][0]]
    color = 'green' if pred_label == true_label else 'red'
    ax.set_title(f"Pred: {pred_label}\\nTrue: {true_label}", color=color)
    ax.axis('off')
plt.tight_layout()
plt.show()
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import cifar10

(X_train, y_train), (X_test, y_test) = cifar10.load_data()

X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

model = keras.Sequential([
    layers.Conv2D(32, 3, activation='relu', padding='same', input_shape=(32, 32, 3)),
    layers.BatchNormalization(),
    layers.Conv2D(32, 3, activation='relu', padding='same'),
    layers.MaxPooling2D(2),
    layers.Dropout(0.25),
    
    layers.Conv2D(64, 3, activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.Conv2D(64, 3, activation='relu', padding='same'),
    layers.MaxPooling2D(2),
    layers.Dropout(0.25),
    
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
history = model.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2, verbose=1)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Accuracy: {test_acc:.3f}")
`
    },
    {
      title: 'Transfer Learning with Pre-trained Models',
      description: `
## Transfer Learning

### Overview
Transfer learning leverages knowledge from models trained on large datasets to solve new tasks with limited data. It's one of the most powerful techniques in deep learning.

### Key Concepts

**Pre-trained Models**:
- VGG16, ResNet50, InceptionV3, MobileNet
- Trained on ImageNet (1.4M images, 1000 classes)
- Learn general visual features

**Feature Extraction**:
- Use pre-trained model as fixed feature extractor
- Remove top layers
- Add custom classifier
- Only train new layers

**Fine-tuning**:
- Unfreeze some pre-trained layers
- Train with very small learning rate
- Adapts features to new task

**When to Use**:
- Small dataset (< 10k images)
- Similar to pre-training task
- Limited computational resources

### Problem Statement
1. Load pre-trained ResNet50 model
2. Add custom classification head
3. Train on small dataset
4. Compare with training from scratch

### Expected Output
- Transfer learning accuracy
- From-scratch accuracy comparison
- Training time comparison
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.datasets import cifar10

# Load data (using CIFAR-10 as example)
(X_train, y_train), (X_test, y_test) = cifar10.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

# Use subset for demonstration
X_train_small = X_train[:5000]
y_train_small = y_train[:5000]

# TODO: Load pre-trained ResNet50
base_model = ResNet50(
    weights='imagenet',
    include_top=,  # Remove classification head
    input_shape=(32, 32, 3)
)

# TODO: Freeze base model
base_model.trainable = 

# TODO: Add custom head
model = keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

# TODO: Compile
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train
history = model.fit(
    X_train_small, y_train_small,
    epochs=10,
    batch_size=32,
    validation_split=0.2
)

test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Transfer Learning Accuracy: {test_acc:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.datasets import cifar10

(X_train, y_train), (X_test, y_test) = cifar10.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

# Use subset
X_train_small = X_train[:5000]
y_train_small = y_train[:5000]

# Load pre-trained ResNet50
base_model = ResNet50(
    weights='imagenet',
    include_top=False,
    input_shape=(32, 32, 3)
)

# Freeze base model
base_model.trainable = False

# Add custom head
model = keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

# Compile
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train
history = model.fit(
    X_train_small, y_train_small,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Transfer Learning Accuracy: {test_acc:.3f}")

# Fine-tuning (optional)
print("\\nFine-tuning...")
base_model.trainable = True
for layer in base_model.layers[:-10]:
    layer.trainable = False

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.0001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history_fine = model.fit(
    X_train_small, y_train_small,
    epochs=5,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Fine-tuned Accuracy: {test_acc:.3f}")
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.datasets import cifar10

(X_train, y_train), (X_test, y_test) = cifar10.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

X_train_small = X_train[:5000]
y_train_small = y_train[:5000]

base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(32, 32, 3))
base_model.trainable = False

model = keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer=keras.optimizers.Adam(0.001), 
              loss='sparse_categorical_crossentropy', 
              metrics=['accuracy'])

history = model.fit(X_train_small, y_train_small, epochs=10, batch_size=32, validation_split=0.2, verbose=1)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Transfer Learning Accuracy: {test_acc:.3f}")
`
    },
    {
      title: 'Recurrent Neural Networks (RNNs)',
      description: `
## Recurrent Neural Networks

### Overview
RNNs are designed for sequential data where order matters. They maintain hidden state that captures information about previous inputs, making them ideal for time series, text, and audio.

### Key Concepts

**Recurrent Connections**:
- Output feeds back as input
- Maintains memory of past inputs
- Processes sequences of variable length

**Hidden State**:
- h_t = tanh(W_hh × h_{t-1} + W_xh × x_t + b)
- Carries information through time
- Updated at each time step

**Applications**:
- Time series forecasting
- Text generation
- Sentiment analysis
- Machine translation

**Limitations**:
- Vanishing/exploding gradients
- Difficulty learning long-term dependencies
- Solved by LSTM and GRU

### Problem Statement
1. Build simple RNN for sequence prediction
2. Train on sine wave forecasting
3. Visualize predictions vs actual
4. Understand hidden state evolution

### Expected Output
- Predicted vs actual time series
- Mean squared error
- Hidden state visualization
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers

# Generate sine wave data
def generate_sine_wave(n_samples, n_steps):
    X = np.zeros((n_samples, n_steps, 1))
    y = np.zeros((n_samples, 1))
    for i in range(n_samples):
        start = np.random.rand() * 2 * np.pi
        x = np.linspace(start, start + 2*np.pi, n_steps + 1)
        X[i, :, 0] = np.sin(x[:-1])
        y[i, 0] = np.sin(x[-1])
    return X, y

X_train, y_train = generate_sine_wave(5000, 50)
X_test, y_test = generate_sine_wave(1000, 50)

# TODO: Build RNN model
model = keras.Sequential([
    layers.SimpleRNN(, activation='tanh', input_shape=(50, 1)),
    layers.Dense(, activation='relu'),
    layers.Dense(1)
])

# TODO: Compile
model.compile(
    optimizer='',
    loss='',
    metrics=['mae']
)

# Train
history = model.fit(
    X_train, y_train,
    epochs=,
    batch_size=,
    validation_split=0.2
)

# Evaluate
test_loss, test_mae = model.evaluate(X_test, y_test)
print(f"Test MAE: {test_mae:.4f}")

# Visualize predictions
predictions = model.predict(X_test[:5])
for i in range(5):
    plt.figure(figsize=(10, 3))
    plt.plot(X_test[i, :, 0], label='Input Sequence')
    plt.axhline(y=y_test[i, 0], color='g', linestyle='--', label='Actual Next Value')
    plt.axhline(y=predictions[i, 0], color='r', linestyle='--', label='Predicted Next Value')
    plt.legend()
    plt.title(f'Sample {i+1}')
    plt.show()
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers

def generate_sine_wave(n_samples, n_steps):
    X = np.zeros((n_samples, n_steps, 1))
    y = np.zeros((n_samples, 1))
    for i in range(n_samples):
        start = np.random.rand() * 2 * np.pi
        x = np.linspace(start, start + 2*np.pi, n_steps + 1)
        X[i, :, 0] = np.sin(x[:-1])
        y[i, 0] = np.sin(x[-1])
    return X, y

X_train, y_train = generate_sine_wave(5000, 50)
X_test, y_test = generate_sine_wave(1000, 50)

model = keras.Sequential([
    layers.SimpleRNN(64, activation='tanh', return_sequences=True, input_shape=(50, 1)),
    layers.SimpleRNN(32, activation='tanh'),
    layers.Dense(16, activation='relu'),
    layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])

history = model.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2, verbose=1)

test_loss, test_mae = model.evaluate(X_test, y_test, verbose=0)
print(f"Test MAE: {test_mae:.4f}")

predictions = model.predict(X_test[:5])
fig, axes = plt.subplots(5, 1, figsize=(12, 15))
for i, ax in enumerate(axes):
    ax.plot(X_test[i, :, 0], label='Input Sequence', linewidth=2)
    ax.axhline(y=y_test[i, 0], color='g', linestyle='--', label=f'Actual: {y_test[i, 0]:.3f}', linewidth=2)
    ax.axhline(y=predictions[i, 0], color='r', linestyle='--', label=f'Predicted: {predictions[i, 0]:.3f}', linewidth=2)
    ax.legend()
    ax.set_title(f'Sample {i+1}')
    ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

def generate_sine_wave(n_samples, n_steps):
    X = np.zeros((n_samples, n_steps, 1))
    y = np.zeros((n_samples, 1))
    for i in range(n_samples):
        start = np.random.rand() * 2 * np.pi
        x = np.linspace(start, start + 2*np.pi, n_steps + 1)
        X[i, :, 0] = np.sin(x[:-1])
        y[i, 0] = np.sin(x[-1])
    return X, y

X_train, y_train = generate_sine_wave(5000, 50)
X_test, y_test = generate_sine_wave(1000, 50)

model = keras.Sequential([
    layers.SimpleRNN(64, activation='tanh', return_sequences=True, input_shape=(50, 1)),
    layers.SimpleRNN(32, activation='tanh'),
    layers.Dense(16, activation='relu'),
    layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])
history = model.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2, verbose=1)

test_loss, test_mae = model.evaluate(X_test, y_test, verbose=0)
print(f"Test MAE: {test_mae:.4f}")
`
    },
    {
      title: 'LSTM Networks for Sequence Modeling',
      description: `
## LSTM Networks

### Overview
Long Short-Term Memory (LSTM) networks are advanced RNNs that solve the vanishing gradient problem. They can learn long-term dependencies through gated memory cells.

### Key Concepts

**LSTM Cell Gates**:
- Forget Gate: Decides what to discard from cell state
- Input Gate: Decides what new information to store
- Output Gate: Decides what to output

**Cell State**:
- Runs through entire chain
- Information highway
- Can add or remove information via gates

**Advantages over RNN**:
- Learns long-term dependencies
- Avoids vanishing gradients
- Better for complex sequences

**Applications**:
- Time series forecasting
- Text generation
- Speech recognition
- Video analysis

### Problem Statement
1. Build LSTM for time series prediction
2. Compare with simple RNN
3. Train on stock price data
4. Forecast future values

### Expected Output
- LSTM vs RNN accuracy comparison
- Multi-step ahead predictions
- Confidence intervals
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
import pandas as pd

# Generate synthetic stock-like data
np.random.seed(42)
t = np.linspace(0, 100, 1000)
trend = 0.5 * t
seasonality = 10 * np.sin(2 * np.pi * t / 50)
noise = np.random.randn(1000) * 2
data = trend + seasonality + noise

# Create sequences
def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length])
    return np.array(X), np.array(y)

seq_length = 50
X, y = create_sequences(data, seq_length)
X = X.reshape(-1, seq_length, 1)

# Split data
split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# TODO: Build LSTM model
model = keras.Sequential([
    layers.LSTM(, return_sequences=True, input_shape=(seq_length, 1)),
    layers.Dropout(),
    layers.LSTM(),
    layers.Dropout(),
    layers.Dense(, activation='relu'),
    layers.Dense(1)
])

# TODO: Compile
model.compile(
    optimizer='',
    loss='',
    metrics=['mae']
)

# Train
history = model.fit(
    X_train, y_train,
    epochs=,
    batch_size=,
    validation_split=0.2
)

# Evaluate
test_loss, test_mae = model.evaluate(X_test, y_test)
print(f"Test MAE: {test_mae:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers

np.random.seed(42)
t = np.linspace(0, 100, 1000)
trend = 0.5 * t
seasonality = 10 * np.sin(2 * np.pi * t / 50)
noise = np.random.randn(1000) * 2
data = trend + seasonality + noise

def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length])
    return np.array(X), np.array(y)

seq_length = 50
X, y = create_sequences(data, seq_length)
X = X.reshape(-1, seq_length, 1)

split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# LSTM model
model_lstm = keras.Sequential([
    layers.LSTM(64, return_sequences=True, input_shape=(seq_length, 1)),
    layers.Dropout(0.2),
    layers.LSTM(32),
    layers.Dropout(0.2),
    layers.Dense(16, activation='relu'),
    layers.Dense(1)
])

model_lstm.compile(optimizer='adam', loss='mse', metrics=['mae'])

history = model_lstm.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2, verbose=1)

test_loss, test_mae = model_lstm.evaluate(X_test, y_test, verbose=0)
print(f"LSTM Test MAE: {test_mae:.3f}")

# Simple RNN for comparison
model_rnn = keras.Sequential([
    layers.SimpleRNN(64, return_sequences=True, input_shape=(seq_length, 1)),
    layers.SimpleRNN(32),
    layers.Dense(16, activation='relu'),
    layers.Dense(1)
])

model_rnn.compile(optimizer='adam', loss='mse', metrics=['mae'])
history_rnn = model_rnn.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2, verbose=0)

test_loss_rnn, test_mae_rnn = model_rnn.evaluate(X_test, y_test, verbose=0)
print(f"RNN Test MAE: {test_mae_rnn:.3f}")

# Visualize predictions
predictions_lstm = model_lstm.predict(X_test)
predictions_rnn = model_rnn.predict(X_test)

plt.figure(figsize=(15, 6))
plt.plot(y_test[:100], label='Actual', linewidth=2)
plt.plot(predictions_lstm[:100], label='LSTM Predictions', alpha=0.7)
plt.plot(predictions_rnn[:100], label='RNN Predictions', alpha=0.7)
plt.legend()
plt.title('LSTM vs RNN: Time Series Prediction')
plt.xlabel('Time Step')
plt.ylabel('Value')
plt.grid(True, alpha=0.3)
plt.show()
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

np.random.seed(42)
t = np.linspace(0, 100, 1000)
data = 0.5 * t + 10 * np.sin(2 * np.pi * t / 50) + np.random.randn(1000) * 2

def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length])
    return np.array(X).reshape(-1, seq_length, 1), np.array(y)

X, y = create_sequences(data, 50)
split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

model = keras.Sequential([
    layers.LSTM(64, return_sequences=True, input_shape=(50, 1)),
    layers.Dropout(0.2),
    layers.LSTM(32),
    layers.Dropout(0.2),
    layers.Dense(16, activation='relu'),
    layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])
history = model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2, verbose=1)

test_loss, test_mae = model.evaluate(X_test, y_test, verbose=0)
print(f"Test MAE: {test_mae:.3f}")
`
    },
    {
      title: 'Attention Mechanisms',
      description: `
## Attention Mechanisms

### Overview
Attention allows models to focus on relevant parts of input when making predictions. It's the foundation of modern NLP and powers transformer architectures.

### Key Concepts

**Attention Intuition**:
- Not all input parts are equally important
- Model learns what to focus on
- Dynamic weighting of inputs

**Attention Score**:
- Measures relevance between query and key
- score = softmax(Q × K^T / sqrt(d_k))
- Produces probability distribution

**Attention Output**:
- Weighted sum of values
- output = attention_weights × V
- Combines relevant information

**Types**:
- Self-Attention: Attention within same sequence
- Cross-Attention: Attention between sequences
- Multi-Head: Multiple attention mechanisms in parallel

### Problem Statement
1. Implement simple attention mechanism
2. Apply to sequence-to-sequence task
3. Visualize attention weights
4. Compare with and without attention

### Expected Output
- Attention weight heatmap
- Model performance comparison
- Interpretable attention patterns
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow as tf

# Simple attention layer
class AttentionLayer(layers.Layer):
    def __init__(self, units):
        super(AttentionLayer, self).__init__()
        self.W = layers.Dense(units)
        self.V = layers.Dense(1)
    
    def call(self, query, values):
        # TODO: Compute attention scores
        score =  # V(tanh(W(values)))
        
        # TODO: Compute attention weights
        attention_weights =  # softmax(score)
        
        # TODO: Compute context vector
        context_vector =  # attention_weights * values
        
        return context_vector, attention_weights

# Generate sequence data
def generate_sequence_data(n_samples, seq_length):
    X = np.random.randint(0, 10, (n_samples, seq_length))
    y = np.sum(X, axis=1)  # Sum of sequence
    return X, y

X_train, y_train = generate_sequence_data(5000, 10)
X_test, y_test = generate_sequence_data(1000, 10)

# TODO: Build model with attention
inputs = keras.Input(shape=(10,))
x = layers.Embedding(input_dim=10, output_dim=32)(inputs)
x = layers.LSTM(64, return_sequences=True)(x)

# Apply attention
attention_layer = AttentionLayer(64)
context_vector, attention_weights = attention_layer(x, x)

x = layers.Flatten()(context_vector)
outputs = layers.Dense(1)(x)

model = keras.Model(inputs=inputs, outputs=outputs)

model.compile(optimizer='adam', loss='mse', metrics=['mae'])

history = model.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2)

test_loss, test_mae = model.evaluate(X_test, y_test)
print(f"Test MAE: {test_mae:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow as tf

class AttentionLayer(layers.Layer):
    def __init__(self, units):
        super(AttentionLayer, self).__init__()
        self.W = layers.Dense(units)
        self.V = layers.Dense(1)
    
    def call(self, query, values):
        # Compute attention scores
        score = self.V(tf.nn.tanh(self.W(values)))
        
        # Compute attention weights
        attention_weights = tf.nn.softmax(score, axis=1)
        
        # Compute context vector
        context_vector = attention_weights * values
        context_vector = tf.reduce_sum(context_vector, axis=1)
        
        return context_vector, attention_weights

def generate_sequence_data(n_samples, seq_length):
    X = np.random.randint(0, 10, (n_samples, seq_length))
    y = np.sum(X, axis=1)
    return X, y

X_train, y_train = generate_sequence_data(5000, 10)
X_test, y_test = generate_sequence_data(1000, 10)

# Model with attention
inputs = keras.Input(shape=(10,))
x = layers.Embedding(input_dim=10, output_dim=32)(inputs)
x = layers.LSTM(64, return_sequences=True)(x)

attention_layer = AttentionLayer(64)
context_vector, attention_weights = attention_layer(x, x)

outputs = layers.Dense(1)(context_vector)

model = keras.Model(inputs=inputs, outputs=outputs)
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

history = model.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2, verbose=1)

test_loss, test_mae = model.evaluate(X_test, y_test, verbose=0)
print(f"Test MAE with Attention: {test_mae:.3f}")

# Model without attention for comparison
model_no_attn = keras.Sequential([
    layers.Embedding(input_dim=10, output_dim=32, input_shape=(10,)),
    layers.LSTM(64),
    layers.Dense(1)
])

model_no_attn.compile(optimizer='adam', loss='mse', metrics=['mae'])
history_no_attn = model_no_attn.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2, verbose=0)

test_loss_no_attn, test_mae_no_attn = model_no_attn.evaluate(X_test, y_test, verbose=0)
print(f"Test MAE without Attention: {test_mae_no_attn:.3f}")

# Visualize attention weights
sample_idx = 0
sample_input = X_test[sample_idx:sample_idx+1]
_, sample_attention = attention_layer(
    layers.LSTM(64, return_sequences=True)(
        layers.Embedding(10, 32)(sample_input)
    ),
    layers.LSTM(64, return_sequences=True)(
        layers.Embedding(10, 32)(sample_input)
    )
)

plt.figure(figsize=(10, 2))
sns.heatmap(sample_attention.numpy()[0].T, cmap='viridis', cbar=True)
plt.xlabel('Sequence Position')
plt.ylabel('Attention Weight')
plt.title('Attention Weights Visualization')
plt.show()
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow as tf

class AttentionLayer(layers.Layer):
    def __init__(self, units):
        super(AttentionLayer, self).__init__()
        self.W = layers.Dense(units)
        self.V = layers.Dense(1)
    
    def call(self, query, values):
        score = self.V(tf.nn.tanh(self.W(values)))
        attention_weights = tf.nn.softmax(score, axis=1)
        context_vector = tf.reduce_sum(attention_weights * values, axis=1)
        return context_vector, attention_weights

def generate_sequence_data(n_samples, seq_length):
    X = np.random.randint(0, 10, (n_samples, seq_length))
    y = np.sum(X, axis=1)
    return X, y

X_train, y_train = generate_sequence_data(5000, 10)
X_test, y_test = generate_sequence_data(1000, 10)

inputs = keras.Input(shape=(10,))
x = layers.Embedding(input_dim=10, output_dim=32)(inputs)
x = layers.LSTM(64, return_sequences=True)(x)
context_vector, _ = AttentionLayer(64)(x, x)
outputs = layers.Dense(1)(context_vector)

model = keras.Model(inputs=inputs, outputs=outputs)
model.compile(optimizer='adam', loss='mse', metrics=['mae'])
history = model.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2, verbose=1)

test_loss, test_mae = model.evaluate(X_test, y_test, verbose=0)
print(f"Test MAE: {test_mae:.3f}")
`
    },
    {
      title: 'Transformer Architecture Basics',
      description: `
## Transformer Architecture

### Overview
Transformers revolutionized deep learning by replacing recurrence with self-attention. They process entire sequences in parallel, enabling efficient training on massive datasets.

### Key Concepts

**Self-Attention**:
- Query, Key, Value matrices
- Attention(Q, K, V) = softmax(QK^T/√d_k)V
- Captures relationships between all positions

**Multi-Head Attention**:
- Multiple attention mechanisms in parallel
- Each head learns different relationships
- Outputs concatenated and projected

**Positional Encoding**:
- Adds position information to embeddings
- Uses sine and cosine functions
- Enables model to use sequence order

**Transformer Block**:
- Multi-head attention
- Add & Norm (residual connection + layer norm)
- Feed-forward network
- Add & Norm

### Problem Statement
1. Implement simplified transformer block
2. Apply to sequence classification
3. Visualize attention patterns
4. Compare with LSTM

### Expected Output
- Classification accuracy
- Attention weight visualization
- Training speed comparison
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow as tf

# Positional encoding
def positional_encoding(seq_len, d_model):
    pos = np.arange(seq_len)[:, np.newaxis]
    i = np.arange(d_model)[np.newaxis, :]
    angle_rates = 1 / np.power(10000, (2 * (i//2)) / np.float32(d_model))
    angle_rads = pos * angle_rates
    
    # TODO: Apply sin to even indices, cos to odd
    angle_rads[:, 0::2] =  # np.sin
    angle_rads[:, 1::2] =  # np.cos
    
    return tf.cast(angle_rads[np.newaxis, ...], dtype=tf.float32)

# Multi-head attention layer
class MultiHeadAttention(layers.Layer):
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        
        assert d_model % num_heads == 0
        
        self.depth = d_model // num_heads
        
        # TODO: Define Q, K, V projection layers
        self.wq = layers.Dense(d_model)
        self.wk = layers.Dense(d_model)
        self.wv = layers.Dense(d_model)
        
        self.dense = layers.Dense(d_model)
    
    def split_heads(self, x, batch_size):
        x = tf.reshape(x, (batch_size, -1, self.num_heads, self.depth))
        return tf.transpose(x, perm=[0, 2, 1, 3])
    
    def call(self, v, k, q):
        batch_size = tf.shape(q)[0]
        
        # TODO: Project Q, K, V
        q = self.wq(q)
        k = self.wk(k)
        v = self.wv(v)
        
        # Split heads
        q = self.split_heads(q, batch_size)
        k = self.split_heads(k, batch_size)
        v = self.split_heads(v, batch_size)
        
        # Scaled dot-product attention
        matmul_qk = tf.matmul(q, k, transpose_b=True)
        dk = tf.cast(tf.shape(k)[-1], tf.float32)
        scaled_attention_logits = matmul_qk / tf.math.sqrt(dk)
        
        attention_weights = tf.nn.softmax(scaled_attention_logits, axis=-1)
        output = tf.matmul(attention_weights, v)
        
        output = tf.transpose(output, perm=[0, 2, 1, 3])
        output = tf.reshape(output, (batch_size, -1, self.d_model))
        
        return self.dense(output)

print("Transformer components ready")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow as tf

def positional_encoding(seq_len, d_model):
    pos = np.arange(seq_len)[:, np.newaxis]
    i = np.arange(d_model)[np.newaxis, :]
    angle_rates = 1 / np.power(10000, (2 * (i//2)) / np.float32(d_model))
    angle_rads = pos * angle_rates
    angle_rads[:, 0::2] = np.sin(angle_rads[:, 0::2])
    angle_rads[:, 1::2] = np.cos(angle_rads[:, 1::2])
    return tf.cast(angle_rads[np.newaxis, ...], dtype=tf.float32)

class MultiHeadAttention(layers.Layer):
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        self.depth = d_model // num_heads
        
        self.wq = layers.Dense(d_model)
        self.wk = layers.Dense(d_model)
        self.wv = layers.Dense(d_model)
        self.dense = layers.Dense(d_model)
    
    def split_heads(self, x, batch_size):
        x = tf.reshape(x, (batch_size, -1, self.num_heads, self.depth))
        return tf.transpose(x, perm=[0, 2, 1, 3])
    
    def call(self, v, k, q):
        batch_size = tf.shape(q)[0]
        
        q = self.wq(q)
        k = self.wk(k)
        v = self.wv(v)
        
        q = self.split_heads(q, batch_size)
        k = self.split_heads(k, batch_size)
        v = self.split_heads(v, batch_size)
        
        matmul_qk = tf.matmul(q, k, transpose_b=True)
        dk = tf.cast(tf.shape(k)[-1], tf.float32)
        scaled_attention_logits = matmul_qk / tf.math.sqrt(dk)
        
        attention_weights = tf.nn.softmax(scaled_attention_logits, axis=-1)
        output = tf.matmul(attention_weights, v)
        
        output = tf.transpose(output, perm=[0, 2, 1, 3])
        output = tf.reshape(output, (batch_size, -1, self.d_model))
        
        return self.dense(output)

class TransformerBlock(layers.Layer):
    def __init__(self, d_model, num_heads, dff, dropout_rate=0.1):
        super(TransformerBlock, self).__init__()
        
        self.att = MultiHeadAttention(d_model, num_heads)
        self.ffn = keras.Sequential([
            layers.Dense(dff, activation='relu'),
            layers.Dense(d_model)
        ])
        
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)
        
        self.dropout1 = layers.Dropout(dropout_rate)
        self.dropout2 = layers.Dropout(dropout_rate)
    
    def call(self, x, training):
        attn_output = self.att(x, x, x)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(x + attn_output)
        
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.layernorm2(out1 + ffn_output)

# Build simple transformer model
def create_transformer_model(seq_len, vocab_size, d_model=128, num_heads=4, dff=512):
    inputs = layers.Input(shape=(seq_len,))
    x = layers.Embedding(vocab_size, d_model)(inputs)
    x = x + positional_encoding(seq_len, d_model)
    
    x = TransformerBlock(d_model, num_heads, dff)(x)
    x = layers.GlobalAveragePooling1D()(x)
    x = layers.Dropout(0.1)(x)
    x = layers.Dense(64, activation='relu')(x)
    outputs = layers.Dense(1, activation='sigmoid')(x)
    
    return keras.Model(inputs=inputs, outputs=outputs)

# Example usage
model = create_transformer_model(seq_len=100, vocab_size=10000)
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
print("Transformer model created successfully")
model.summary()
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow as tf

def positional_encoding(seq_len, d_model):
    pos = np.arange(seq_len)[:, np.newaxis]
    i = np.arange(d_model)[np.newaxis, :]
    angle_rates = 1 / np.power(10000, (2 * (i//2)) / np.float32(d_model))
    angle_rads = pos * angle_rates
    angle_rads[:, 0::2] = np.sin(angle_rads[:, 0::2])
    angle_rads[:, 1::2] = np.cos(angle_rads[:, 1::2])
    return tf.cast(angle_rads[np.newaxis, ...], dtype=tf.float32)

class MultiHeadAttention(layers.Layer):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        self.depth = d_model // num_heads
        self.wq = layers.Dense(d_model)
        self.wk = layers.Dense(d_model)
        self.wv = layers.Dense(d_model)
        self.dense = layers.Dense(d_model)
    
    def split_heads(self, x, batch_size):
        x = tf.reshape(x, (batch_size, -1, self.num_heads, self.depth))
        return tf.transpose(x, perm=[0, 2, 1, 3])
    
    def call(self, v, k, q):
        batch_size = tf.shape(q)[0]
        q, k, v = self.wq(q), self.wk(k), self.wv(v)
        q = self.split_heads(q, batch_size)
        k = self.split_heads(k, batch_size)
        v = self.split_heads(v, batch_size)
        scaled_attention = tf.matmul(q, k, transpose_b=True) / tf.math.sqrt(tf.cast(self.depth, tf.float32))
        attention_weights = tf.nn.softmax(scaled_attention, axis=-1)
        output = tf.matmul(attention_weights, v)
        output = tf.transpose(output, perm=[0, 2, 1, 3])
        output = tf.reshape(output, (batch_size, -1, self.d_model))
        return self.dense(output)

print("Transformer components ready")
`
    },
    {
      title: 'Generative Adversarial Networks (GANs)',
      description: `
## Generative Adversarial Networks

### Overview
GANs consist of two neural networks - a generator and discriminator - that compete against each other. The generator creates fake data while the discriminator tries to distinguish real from fake.

### Key Concepts

**Generator**:
- Takes random noise as input
- Generates fake samples
- Tries to fool discriminator
- Learns to produce realistic data

**Discriminator**:
- Binary classifier
- Distinguishes real from fake
- Provides feedback to generator
- Learns to detect fakes

**Adversarial Training**:
- Minimax game between networks
- Generator minimizes discriminator's ability to detect fakes
- Discriminator maximizes detection accuracy
- Nash equilibrium when generator produces perfect fakes

**Training Challenges**:
- Mode collapse: Generator produces limited variety
- Vanishing gradients: Discriminator too strong
- Training instability: Requires careful balancing

### Problem Statement
1. Build simple GAN for MNIST digits
2. Train generator and discriminator
3. Generate new digit images
4. Visualize training progress

### Expected Output
- Generated digit samples
- Training loss curves
- Quality improvement over epochs
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist

# Load and preprocess MNIST
(X_train, _), (_, _) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_train = X_train.reshape(-1, 28, 28, 1)

# TODO: Build Generator
def build_generator(latent_dim):
    model = keras.Sequential([
        layers.Dense(, activation='relu', input_dim=latent_dim),
        layers.BatchNormalization(),
        layers.Dense(, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(28 * 28 * 1, activation='sigmoid'),
        layers.Reshape((28, 28, 1))
    ])
    return model

# TODO: Build Discriminator
def build_discriminator():
    model = keras.Sequential([
        layers.Flatten(input_shape=(28, 28, 1)),
        layers.Dense(, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(1, activation='sigmoid')
    ])
    return model

# TODO: Build GAN
latent_dim = 100
generator = build_generator(latent_dim)
discriminator = build_discriminator()

discriminator.compile(
    optimizer=keras.optimizers.Adam(0.0002, 0.5),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

discriminator.trainable = False

gan_input = keras.Input(shape=(latent_dim,))
generated_image = generator(gan_input)
gan_output = discriminator(generated_image)

gan = keras.Model(gan_input, gan_output)
gan.compile(
    optimizer=keras.optimizers.Adam(0.0002, 0.5),
    loss='binary_crossentropy'
)

print("GAN model built successfully")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist

(X_train, _), (_, _) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_train = X_train.reshape(-1, 28, 28, 1)

def build_generator(latent_dim):
    model = keras.Sequential([
        layers.Dense(256, activation='relu', input_dim=latent_dim),
        layers.BatchNormalization(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(1024, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(28 * 28 * 1, activation='sigmoid'),
        layers.Reshape((28, 28, 1))
    ])
    return model

def build_discriminator():
    model = keras.Sequential([
        layers.Flatten(input_shape=(28, 28, 1)),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(1, activation='sigmoid')
    ])
    return model

latent_dim = 100
generator = build_generator(latent_dim)
discriminator = build_discriminator()

discriminator.compile(optimizer=keras.optimizers.Adam(0.0002, 0.5),
                     loss='binary_crossentropy', metrics=['accuracy'])

discriminator.trainable = False
gan_input = keras.Input(shape=(latent_dim,))
generated_image = generator(gan_input)
gan_output = discriminator(generated_image)
gan = keras.Model(gan_input, gan_output)
gan.compile(optimizer=keras.optimizers.Adam(0.0002, 0.5), loss='binary_crossentropy')

# Training loop
def train_gan(epochs, batch_size=128):
    half_batch = batch_size // 2
    
    for epoch in range(epochs):
        # Train Discriminator
        idx = np.random.randint(0, X_train.shape[0], half_batch)
        real_images = X_train[idx]
        
        noise = np.random.normal(0, 1, (half_batch, latent_dim))
        fake_images = generator.predict(noise, verbose=0)
        
        d_loss_real = discriminator.train_on_batch(real_images, np.ones((half_batch, 1)))
        d_loss_fake = discriminator.train_on_batch(fake_images, np.zeros((half_batch, 1)))
        d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)
        
        # Train Generator
        noise = np.random.normal(0, 1, (batch_size, latent_dim))
        g_loss = gan.train_on_batch(noise, np.ones((batch_size, 1)))
        
        if epoch % 100 == 0:
            print(f"Epoch {epoch}, D Loss: {d_loss[0]:.4f}, G Loss: {g_loss:.4f}")
            
            # Generate sample images
            noise = np.random.normal(0, 1, (16, latent_dim))
            generated_images = generator.predict(noise, verbose=0)
            
            fig, axes = plt.subplots(4, 4, figsize=(8, 8))
            for i, ax in enumerate(axes.flat):
                ax.imshow(generated_images[i, :, :, 0], cmap='gray')
                ax.axis('off')
            plt.tight_layout()
            plt.show()

# Train for 1000 epochs
train_gan(epochs=1000, batch_size=128)
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist

(X_train, _), (_, _) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_train = X_train.reshape(-1, 28, 28, 1)

def build_generator(latent_dim):
    return keras.Sequential([
        layers.Dense(256, activation='relu', input_dim=latent_dim),
        layers.BatchNormalization(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(1024, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(28 * 28, activation='sigmoid'),
        layers.Reshape((28, 28, 1))
    ])

def build_discriminator():
    return keras.Sequential([
        layers.Flatten(input_shape=(28, 28, 1)),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(1, activation='sigmoid')
    ])

latent_dim = 100
generator = build_generator(latent_dim)
discriminator = build_discriminator()

discriminator.compile(optimizer=keras.optimizers.Adam(0.0002, 0.5),
                     loss='binary_crossentropy', metrics=['accuracy'])

discriminator.trainable = False
gan_input = keras.Input(shape=(latent_dim,))
gan = keras.Model(gan_input, discriminator(generator(gan_input)))
gan.compile(optimizer=keras.optimizers.Adam(0.0002, 0.5), loss='binary_crossentropy')

print("GAN model built successfully")
print(f"Generator parameters: {generator.count_params()}")
print(f"Discriminator parameters: {discriminator.count_params()}")
`
    },
    {
      title: 'Regularization Techniques',
      description: `
## Regularization Techniques

### Overview
Regularization prevents neural networks from overfitting by adding constraints during training. These techniques are essential for building models that generalize well to unseen data.

### Key Concepts

**Dropout**:
- Randomly zeroes neurons during training (typically 20-50%)
- Forces network to learn redundant representations
- Effectively trains an ensemble of sub-networks
- Only active during training, not inference

**Batch Normalization**:
- Normalizes layer inputs to have zero mean and unit variance
- Reduces internal covariate shift
- Allows higher learning rates
- Acts as mild regularization

**L2 Regularization (Weight Decay)**:
- Adds penalty proportional to squared weight magnitudes
- Loss = Original Loss + λΣw²
- Keeps weights small, prevents over-reliance on any feature

**Early Stopping**:
- Monitor validation loss during training
- Stop when validation loss stops improving
- Prevents training past the optimal point
- Use patience parameter for robustness

**Data Augmentation**:
- Create modified copies of training data
- Flips, rotations, crops, color jittering
- Increases effective training set size

### Problem Statement
1. Train a model with and without regularization
2. Compare overfitting behavior
3. Implement dropout, batch norm, and early stopping
4. Visualize training vs validation curves
`,
      starterCode: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist
from tensorflow.keras.callbacks import EarlyStopping

# Load and preprocess data
(X_train, y_train), (X_test, y_test) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

# TODO: Build model WITHOUT regularization (baseline)
def build_baseline():
    model = keras.Sequential([
        layers.Dense(512, activation='relu', input_shape=(784,)),
        layers.Dense(512, activation='relu'),
        layers.Dense(512, activation='relu'),
        layers.Dense(10, activation='softmax')
    ])
    return model

# TODO: Build model WITH regularization
def build_regularized():
    model = keras.Sequential([
        layers.Dense(512, activation='relu', input_shape=(784,),
                    kernel_regularizer=keras.regularizers.l2(0.001)),
        # Add BatchNorm and Dropout

        layers.Dense(512, activation='relu',
                    kernel_regularizer=keras.regularizers.l2(0.001)),
        # Add BatchNorm and Dropout

        layers.Dense(10, activation='softmax')
    ])
    return model

# TODO: Compile and train both models
baseline = build_baseline()
regularized = build_regularized()

# TODO: Add EarlyStopping callback
early_stop = EarlyStopping(patience=5, restore_best_weights=True)

print("Compare training and validation accuracy")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist
from tensorflow.keras.callbacks import EarlyStopping

(X_train, y_train), (X_test, y_test) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

def build_baseline():
    model = keras.Sequential([
        layers.Dense(512, activation='relu', input_shape=(784,)),
        layers.Dense(512, activation='relu'),
        layers.Dense(512, activation='relu'),
        layers.Dense(10, activation='softmax')
    ])
    return model

def build_regularized():
    model = keras.Sequential([
        layers.Dense(512, activation='relu', input_shape=(784,),
                    kernel_regularizer=keras.regularizers.l2(0.001)),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(512, activation='relu',
                    kernel_regularizer=keras.regularizers.l2(0.001)),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(512, activation='relu',
                    kernel_regularizer=keras.regularizers.l2(0.001)),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(10, activation='softmax')
    ])
    return model

baseline = build_baseline()
baseline.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

regularized = build_regularized()
regularized.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

hist_base = baseline.fit(X_train, y_train, epochs=50, batch_size=128,
                         validation_split=0.2, verbose=0)
hist_reg = regularized.fit(X_train, y_train, epochs=50, batch_size=128,
                           validation_split=0.2, callbacks=[early_stop], verbose=0)

base_acc = baseline.evaluate(X_test, y_test, verbose=0)[1]
reg_acc = regularized.evaluate(X_test, y_test, verbose=0)[1]

print(f"Baseline Test Accuracy: {base_acc:.4f}")
print(f"Regularized Test Accuracy: {reg_acc:.4f}")
print(f"Regularized stopped at epoch: {len(hist_reg.history['loss'])}")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))
ax1.plot(hist_base.history['loss'], label='Train')
ax1.plot(hist_base.history['val_loss'], label='Validation')
ax1.set_title('Baseline (No Regularization)')
ax1.set_xlabel('Epoch')
ax1.set_ylabel('Loss')
ax1.legend()

ax2.plot(hist_reg.history['loss'], label='Train')
ax2.plot(hist_reg.history['val_loss'], label='Validation')
ax2.set_title('With Regularization')
ax2.set_xlabel('Epoch')
ax2.set_ylabel('Loss')
ax2.legend()
plt.tight_layout()
plt.show()
`,
      code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist
from tensorflow.keras.callbacks import EarlyStopping

(X_train, y_train), (X_test, y_test) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

def build_baseline():
    return keras.Sequential([
        layers.Dense(512, activation='relu', input_shape=(784,)),
        layers.Dense(512, activation='relu'),
        layers.Dense(10, activation='softmax')
    ])

def build_regularized():
    return keras.Sequential([
        layers.Dense(512, activation='relu', input_shape=(784,),
                    kernel_regularizer=keras.regularizers.l2(0.001)),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(512, activation='relu',
                    kernel_regularizer=keras.regularizers.l2(0.001)),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(10, activation='softmax')
    ])

baseline = build_baseline()
baseline.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

regularized = build_regularized()
regularized.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

baseline.fit(X_train, y_train, epochs=20, batch_size=128, validation_split=0.2, verbose=0)
regularized.fit(X_train, y_train, epochs=20, batch_size=128, validation_split=0.2,
               callbacks=[early_stop], verbose=0)

print(f"Baseline: {baseline.evaluate(X_test, y_test, verbose=0)[1]:.4f}")
print(f"Regularized: {regularized.evaluate(X_test, y_test, verbose=0)[1]:.4f}")
`
    },
    {
      title: 'Autoencoders & Variational Autoencoders',
      description: `
## Autoencoders & Variational Autoencoders

### Overview
Autoencoders are neural networks that learn compressed representations of data. They consist of an encoder (compresses) and decoder (reconstructs). VAEs add a probabilistic twist, enabling generation of new data.

### Key Concepts

**Autoencoder Architecture**:
- Encoder: Maps input to a lower-dimensional latent space
- Bottleneck: Compressed representation (latent code)
- Decoder: Reconstructs input from latent code
- Loss: Reconstruction error (MSE or binary cross-entropy)

**Types of Autoencoders**:
- Undercomplete: Bottleneck smaller than input (compression)
- Denoising: Trained to reconstruct clean data from noisy input
- Sparse: Adds sparsity constraint on latent activations

**Variational Autoencoder (VAE)**:
- Encodes to a probability distribution (mean + variance)
- Reparameterization trick: z = μ + σ × ε
- Loss = Reconstruction Loss + KL Divergence
- KL Divergence keeps latent space well-structured
- Enables smooth interpolation and generation

**Applications**:
- Dimensionality reduction
- Image denoising and inpainting
- Anomaly detection
- Data generation (VAE)

### Problem Statement
1. Build a standard autoencoder for image reconstruction
2. Build a denoising autoencoder
3. Implement a VAE with reparameterization trick
4. Visualize latent space and reconstructions
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist

(X_train, y_train), (X_test, y_test) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

latent_dim = 32

# TODO: Build Encoder
def build_encoder(latent_dim):
    inputs = keras.Input(shape=(784,))
    x = layers.Dense(256, activation='relu')(inputs)
    x = layers.Dense(128, activation='relu')(x)
    latent = layers.Dense(latent_dim, activation='relu')(x)
    return keras.Model(inputs, latent, name='encoder')

# TODO: Build Decoder
def build_decoder(latent_dim):
    inputs = keras.Input(shape=(latent_dim,))
    x = layers.Dense(128, activation='relu')(inputs)
    x = layers.Dense(256, activation='relu')(x)
    outputs = layers.Dense(784, activation='sigmoid')(x)
    return keras.Model(inputs, outputs, name='decoder')

# TODO: Create and train autoencoder
encoder = build_encoder(latent_dim)
decoder = build_decoder(latent_dim)

autoencoder_input = keras.Input(shape=(784,))
encoded = encoder(autoencoder_input)
decoded = decoder(encoded)
autoencoder = keras.Model(autoencoder_input, decoded)

# TODO: Compile and train


# TODO: Visualize reconstructions
reconstructed = autoencoder.predict(X_test[:10], verbose=0)
print(f"Reconstruction MSE: {np.mean((X_test[:10] - reconstructed) ** 2):.4f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist

(X_train, y_train), (X_test, y_test) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

latent_dim = 32

def build_encoder(latent_dim):
    inputs = keras.Input(shape=(784,))
    x = layers.Dense(256, activation='relu')(inputs)
    x = layers.Dense(128, activation='relu')(x)
    latent = layers.Dense(latent_dim, activation='relu')(x)
    return keras.Model(inputs, latent, name='encoder')

def build_decoder(latent_dim):
    inputs = keras.Input(shape=(latent_dim,))
    x = layers.Dense(128, activation='relu')(inputs)
    x = layers.Dense(256, activation='relu')(x)
    outputs = layers.Dense(784, activation='sigmoid')(x)
    return keras.Model(inputs, outputs, name='decoder')

encoder = build_encoder(latent_dim)
decoder = build_decoder(latent_dim)

autoencoder_input = keras.Input(shape=(784,))
encoded = encoder(autoencoder_input)
decoded = decoder(encoded)
autoencoder = keras.Model(autoencoder_input, decoded)

autoencoder.compile(optimizer='adam', loss='mse')
autoencoder.fit(X_train, X_train, epochs=20, batch_size=256,
               validation_split=0.1, verbose=0)

reconstructed = autoencoder.predict(X_test[:10], verbose=0)
mse = np.mean((X_test[:10] - reconstructed) ** 2)
print(f"Reconstruction MSE: {mse:.4f}")

# Denoising autoencoder
noise_factor = 0.3
X_train_noisy = X_train + noise_factor * np.random.randn(*X_train.shape)
X_train_noisy = np.clip(X_train_noisy, 0, 1)

denoiser = keras.Model(autoencoder_input, decoded)
denoiser.compile(optimizer='adam', loss='mse')
denoiser.fit(X_train_noisy, X_train, epochs=20, batch_size=256,
            validation_split=0.1, verbose=0)

X_test_noisy = X_test[:10] + noise_factor * np.random.randn(10, 784)
X_test_noisy = np.clip(X_test_noisy, 0, 1)
denoised = denoiser.predict(X_test_noisy, verbose=0)

fig, axes = plt.subplots(3, 10, figsize=(20, 6))
for i in range(10):
    axes[0, i].imshow(X_test[i].reshape(28, 28), cmap='gray')
    axes[1, i].imshow(X_test_noisy[i].reshape(28, 28), cmap='gray')
    axes[2, i].imshow(denoised[i].reshape(28, 28), cmap='gray')
    axes[0, i].axis('off')
    axes[1, i].axis('off')
    axes[2, i].axis('off')
axes[0, 0].set_ylabel('Original')
axes[1, 0].set_ylabel('Noisy')
axes[2, 0].set_ylabel('Denoised')
plt.tight_layout()
plt.show()
`,
      code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist

(X_train, y_train), (X_test, y_test) = mnist.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

latent_dim = 32

def build_encoder(ld):
    inp = keras.Input(shape=(784,))
    x = layers.Dense(256, activation='relu')(inp)
    x = layers.Dense(128, activation='relu')(x)
    z = layers.Dense(ld, activation='relu')(x)
    return keras.Model(inp, z)

def build_decoder(ld):
    inp = keras.Input(shape=(ld,))
    x = layers.Dense(128, activation='relu')(inp)
    x = layers.Dense(256, activation='relu')(x)
    out = layers.Dense(784, activation='sigmoid')(x)
    return keras.Model(inp, out)

enc = build_encoder(latent_dim)
dec = build_decoder(latent_dim)

inp = keras.Input(shape=(784,))
ae = keras.Model(inp, dec(enc(inp)))
ae.compile(optimizer='adam', loss='mse')
ae.fit(X_train, X_train, epochs=20, batch_size=256, validation_split=0.1, verbose=0)

recon = ae.predict(X_test[:10], verbose=0)
print(f"Reconstruction MSE: {np.mean((X_test[:10] - recon) ** 2):.4f}")
print(f"Encoder output shape: {enc.predict(X_test[:1], verbose=0).shape}")
`
    },
    {
      title: 'Hyperparameter Tuning (Optuna)',
      description: `
## Hyperparameter Tuning

### Overview
Hyperparameter tuning finds the optimal configuration for your model. Modern tools like Optuna make this process efficient through intelligent search strategies.

### Key Concepts

**Search Strategies**:
- Grid Search: Try all combinations (exhaustive but slow)
- Random Search: Random sampling (surprisingly effective)
- Bayesian Optimization: Uses past results to guide search
- Optuna's TPE: Tree-structured Parzen Estimator

**Optuna Framework**:
- Study: Container for optimization experiments
- Trial: Single execution with a set of hyperparameters
- Objective: Function that returns metric to optimize
- Pruning: Stop unpromising trials early

**Key Hyperparameters**:
- Learning rate: Most impactful (typically 1e-4 to 1e-2)
- Batch size: Affects training dynamics (32, 64, 128, 256)
- Network architecture: Layers, neurons, activation functions
- Regularization: Dropout rate, weight decay
- Optimizer: Adam, SGD, AdamW

**Best Practices**:
- Start with random search to identify promising regions
- Use Bayesian optimization for fine-tuning
- Always validate on held-out set
- Use pruning to save compute

### Problem Statement
1. Define an Optuna objective function
2. Tune a neural network's hyperparameters
3. Analyze optimization history
4. Compare tuned vs default model
`,
      starterCode: `import numpy as np
import optuna
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neural_network import MLPClassifier

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# TODO: Define Optuna objective function
def objective(trial):
    # Suggest model type
    classifier_name = trial.suggest_categorical('classifier', ['RF', 'GBM', 'MLP'])
    
    if classifier_name == 'RF':
        n_estimators = trial.suggest_int('rf_n_estimators', 50, 300)
        max_depth = trial.suggest_int('rf_max_depth', 3, 20)
        # Create model
    elif classifier_name == 'GBM':
        n_estimators = trial.suggest_int('gbm_n_estimators', 50, 300)
        learning_rate = trial.suggest_float('gbm_lr', 0.01, 0.3, log=True)
        # Create model
    else:  # MLP
        hidden_size = trial.suggest_int('mlp_hidden', 50, 300)
        learning_rate = trial.suggest_float('mlp_lr', 1e-4, 1e-2, log=True)
        # Create model
    
    # TODO: Return cross-validation score
    score = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
    return score.mean()

# TODO: Create study and optimize
study = optuna.create_study(direction='maximize')


print(f"Best accuracy: {study.best_value:.3f}")
print(f"Best params: {study.best_params}")
`,
      solution: `import numpy as np
import optuna
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score

optuna.logging.set_verbosity(optuna.logging.WARNING)
np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

def objective(trial):
    classifier_name = trial.suggest_categorical('classifier', ['RF', 'GBM', 'MLP'])
    
    if classifier_name == 'RF':
        n_estimators = trial.suggest_int('rf_n_estimators', 50, 300)
        max_depth = trial.suggest_int('rf_max_depth', 3, 20)
        min_samples_split = trial.suggest_int('rf_min_samples_split', 2, 20)
        model = RandomForestClassifier(
            n_estimators=n_estimators, max_depth=max_depth,
            min_samples_split=min_samples_split, random_state=42
        )
    elif classifier_name == 'GBM':
        n_estimators = trial.suggest_int('gbm_n_estimators', 50, 300)
        learning_rate = trial.suggest_float('gbm_lr', 0.01, 0.3, log=True)
        max_depth = trial.suggest_int('gbm_max_depth', 3, 10)
        model = GradientBoostingClassifier(
            n_estimators=n_estimators, learning_rate=learning_rate,
            max_depth=max_depth, random_state=42
        )
    else:
        hidden_size = trial.suggest_int('mlp_hidden', 50, 300)
        learning_rate = trial.suggest_float('mlp_lr', 1e-4, 1e-2, log=True)
        dropout = trial.suggest_float('mlp_alpha', 1e-5, 1e-2, log=True)
        model = MLPClassifier(
            hidden_layer_sizes=(hidden_size, hidden_size),
            learning_rate_init=learning_rate, alpha=dropout,
            max_iter=200, random_state=42
        )
    
    score = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
    return score.mean()

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50)

print(f"Best accuracy: {study.best_value:.4f}")
print(f"Best params: {study.best_params}")

# Compare with default model
default_rf = RandomForestClassifier(random_state=42)
default_rf.fit(X_train, y_train)
default_acc = accuracy_score(y_test, default_rf.predict(X_test))

# Train best model on full training set
bp = study.best_params
if bp['classifier'] == 'RF':
    best_model = RandomForestClassifier(
        n_estimators=bp['rf_n_estimators'], max_depth=bp['rf_max_depth'],
        min_samples_split=bp['rf_min_samples_split'], random_state=42
    )
elif bp['classifier'] == 'GBM':
    best_model = GradientBoostingClassifier(
        n_estimators=bp['gbm_n_estimators'], learning_rate=bp['gbm_lr'],
        max_depth=bp['gbm_max_depth'], random_state=42
    )
else:
    best_model = MLPClassifier(
        hidden_layer_sizes=(bp['mlp_hidden'], bp['mlp_hidden']),
        learning_rate_init=bp['mlp_lr'], alpha=bp['mlp_alpha'],
        max_iter=200, random_state=42
    )

best_model.fit(X_train, y_train)
tuned_acc = accuracy_score(y_test, best_model.predict(X_test))

print(f"\\nDefault RF Test Accuracy: {default_acc:.4f}")
print(f"Tuned Best Model Test Accuracy: {tuned_acc:.4f}")
print(f"Improvement: {(tuned_acc - default_acc)*100:.2f}%")
`,
      code: `import numpy as np
import optuna
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score

optuna.logging.set_verbosity(optuna.logging.WARNING)
np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

def objective(trial):
    clf = trial.suggest_categorical('classifier', ['RF', 'GBM', 'MLP'])
    if clf == 'RF':
        model = RandomForestClassifier(
            n_estimators=trial.suggest_int('rf_n', 50, 300),
            max_depth=trial.suggest_int('rf_d', 3, 20), random_state=42)
    elif clf == 'GBM':
        model = GradientBoostingClassifier(
            n_estimators=trial.suggest_int('gbm_n', 50, 300),
            learning_rate=trial.suggest_float('gbm_lr', 0.01, 0.3, log=True), random_state=42)
    else:
        h = trial.suggest_int('mlp_h', 50, 300)
        model = MLPClassifier(
            hidden_layer_sizes=(h, h),
            learning_rate_init=trial.suggest_float('mlp_lr', 1e-4, 1e-2, log=True),
            max_iter=200, random_state=42)
    return cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy').mean()

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50)

print(f"Best CV accuracy: {study.best_value:.4f}")
print(f"Best params: {study.best_params}")

default_rf = RandomForestClassifier(random_state=42)
default_rf.fit(X_train, y_train)
print(f"Default RF test acc: {accuracy_score(y_test, default_rf.predict(X_test)):.4f}")
`
    },
    {
      title: 'Practical Training Tips',
      description: `
## Practical Training Tips

### Overview
Training deep learning models effectively requires understanding key techniques like learning rate scheduling, mixed precision training, gradient clipping, and data augmentation.

### Key Concepts

**Learning Rate Scheduling**:
- StepLR: Reduce LR by factor every N epochs
- CosineAnnealing: Smooth cosine-shaped LR decay
- ReduceOnPlateau: Reduce LR when metric stops improving
- Warmup: Start low, gradually increase, then decay
- One-cycle: Increase then decrease over training

**Gradient Clipping**:
- Prevents exploding gradients
- Clip by value: Cap gradient values
- Clip by norm: Scale gradient if norm exceeds threshold
- Essential for RNNs and deep networks

**Mixed Precision Training (FP16)**:
- Use 16-bit floats for forward/backward pass
- Keep 32-bit master weights for updates
- ~2x speedup on modern GPUs
- Minimal accuracy impact

**Data Augmentation**:
- Images: Flips, rotations, crops, color jitter, cutout
- Text: Synonym replacement, back-translation
- Tabular: SMOTE, noise injection
- Increases effective dataset size

**Monitoring & Debugging**:
- Track loss and metrics per epoch
- Watch for vanishing/exploding gradients
- Check learning rate vs loss curves
- Use gradient histograms for diagnosis

### Problem Statement
1. Compare different learning rate schedules
2. Implement gradient clipping
3. Apply data augmentation
4. Visualize training dynamics
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.preprocessing.image import ImageDataGenerator

(X_train, y_train), (X_test, y_test) = cifar10.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

def build_model():
    model = keras.Sequential([
        layers.Conv2D(32, 3, padding='same', activation='relu', input_shape=(32, 32, 3)),
        layers.BatchNormalization(),
        layers.Conv2D(32, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Dropout(0.25),
        layers.Conv2D(64, 3, padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(64, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Dropout(0.25),
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(10, activation='softmax')
    ])
    return model

# TODO: Define learning rate schedules
def step_schedule(epoch, lr):
    if epoch > 0 and epoch % 10 == 0:
        return lr * 0.5
    return lr

# TODO: Data augmentation
datagen = ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True
)

# TODO: Train with augmentation and schedule
model = build_model()


print("Training complete")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import LearningRateScheduler, ReduceLROnPlateau

(X_train, y_train), (X_test, y_test) = cifar10.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

def build_model(clipnorm=None):
    model = keras.Sequential([
        layers.Conv2D(32, 3, padding='same', activation='relu', input_shape=(32, 32, 3)),
        layers.BatchNormalization(),
        layers.Conv2D(32, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Dropout(0.25),
        layers.Conv2D(64, 3, padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(64, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Dropout(0.25),
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(10, activation='softmax')
    ])
    optimizer = keras.optimizers.Adam(
        learning_rate=0.001,
        clipnorm=clipnorm if clipnorm else None
    )
    model.compile(optimizer=optimizer, loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

# Learning rate schedules
def step_schedule(epoch, lr):
    if epoch > 0 and epoch % 10 == 0:
        return lr * 0.5
    return lr

def cosine_schedule(epoch, lr):
    total_epochs = 30
    return 0.001 * 0.5 * (1 + np.cos(np.pi * epoch / total_epochs))

# Data augmentation
datagen = ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    zoom_range=0.1
)
datagen.fit(X_train)

# Train with different schedules
results = {}
schedules = {
    'Constant LR': [],
    'Step Decay': [LearningRateScheduler(step_schedule)],
    'Cosine Annealing': [LearningRateScheduler(cosine_schedule)],
    'ReduceOnPlateau': [ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3)]
}

for name, callbacks in schedules.items():
    print(f"\\nTraining with {name}...")
    model = build_model(clipnorm=1.0)
    hist = model.fit(datagen.flow(X_train, y_train, batch_size=128),
                    epochs=30, validation_data=(X_test, y_test),
                    callbacks=callbacks, verbose=0)
    test_acc = model.evaluate(X_test, y_test, verbose=0)[1]
    results[name] = {'history': hist, 'test_acc': test_acc}
    print(f"  Test Accuracy: {test_acc:.4f}")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))
for name, res in results.items():
    ax1.plot(res['history'].history['val_accuracy'], label=name)
    ax2.plot(res['history'].history['val_loss'], label=name)
ax1.set_title('Validation Accuracy')
ax1.set_xlabel('Epoch')
ax1.legend()
ax2.set_title('Validation Loss')
ax2.set_xlabel('Epoch')
ax2.legend()
plt.tight_layout()
plt.show()
`,
      code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import LearningRateScheduler, ReduceLROnPlateau

(X_train, y_train), (X_test, y_test) = cifar10.load_data()
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

def build_model():
    model = keras.Sequential([
        layers.Conv2D(32, 3, padding='same', activation='relu', input_shape=(32, 32, 3)),
        layers.BatchNormalization(),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D(),
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(10, activation='softmax')
    ])
    model.compile(optimizer=keras.optimizers.Adam(0.001, clipnorm=1.0),
                 loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

datagen = ImageDataGenerator(
    rotation_range=15, width_shift_range=0.1,
    height_shift_range=0.1, horizontal_flip=True)
datagen.fit(X_train)

cosine_lr = LearningRateScheduler(
    lambda e, lr: 0.001 * 0.5 * (1 + np.cos(np.pi * e / 30)))

model = build_model()
model.fit(datagen.flow(X_train, y_train, batch_size=128),
         epochs=30, validation_data=(X_test, y_test),
         callbacks=[cosine_lr], verbose=0)

acc = model.evaluate(X_test, y_test, verbose=0)[1]
print(f"Test Accuracy with augmentation + cosine LR + gradient clipping: {acc:.4f}")
`
    }
  ]
};
