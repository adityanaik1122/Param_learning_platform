import LessonExplanationPanel from '../components/LessonExplanationPanel';

const demoContent = `
# Linear Regression in Machine Learning

Linear regression is one of the most fundamental algorithms in machine learning. It models the relationship between a dependent variable and one or more independent variables.

## Mathematical Foundation

The linear regression equation is expressed as:

$$y = mx + b$$

Where:
- $y$ is the predicted value (dependent variable)
- $x$ is the input feature (independent variable)
- $m$ is the slope (weight)
- $b$ is the y-intercept (bias)

### Multiple Linear Regression

For multiple features, the equation extends to:

$$y = \\beta_0 + \\beta_1x_1 + \\beta_2x_2 + ... + \\beta_nx_n$$

Or in matrix form:

$$\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$$

## Cost Function

The cost function (Mean Squared Error) is:

$$J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)})^2$$

Where:
- $m$ is the number of training examples
- $h_\\theta(x)$ is the hypothesis function
- $y^{(i)}$ is the actual value

## Gradient Descent

The gradient descent update rule is:

$$\\theta_j := \\theta_j - \\alpha \\frac{\\partial}{\\partial \\theta_j} J(\\theta)$$

Where $\\alpha$ is the learning rate.

## Python Implementation

Here's a simple implementation using NumPy:

\`\`\`python
import numpy as np

class LinearRegression:
    def __init__(self, learning_rate=0.01, iterations=1000):
        self.lr = learning_rate
        self.iterations = iterations
        self.weights = None
        self.bias = None
    
    def fit(self, X, y):
        # Initialize parameters
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0
        
        # Gradient descent
        for _ in range(self.iterations):
            # Predictions
            y_pred = np.dot(X, self.weights) + self.bias
            
            # Compute gradients
            dw = (1/n_samples) * np.dot(X.T, (y_pred - y))
            db = (1/n_samples) * np.sum(y_pred - y)
            
            # Update parameters
            self.weights -= self.lr * dw
            self.bias -= self.lr * db
    
    def predict(self, X):
        return np.dot(X, self.weights) + self.bias
\`\`\`

## Key Concepts

### 1. Assumptions

Linear regression makes several assumptions:

- **Linearity**: The relationship between X and Y is linear
- **Independence**: Observations are independent of each other
- **Homoscedasticity**: Constant variance of errors
- **Normality**: Errors are normally distributed

### 2. Evaluation Metrics

Common metrics for evaluating linear regression:

| Metric | Formula | Description |
|--------|---------|-------------|
| MSE | $\\frac{1}{n}\\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2$ | Mean Squared Error |
| RMSE | $\\sqrt{MSE}$ | Root Mean Squared Error |
| MAE | $\\frac{1}{n}\\sum_{i=1}^{n}|y_i - \\hat{y}_i|$ | Mean Absolute Error |
| R² | $1 - \\frac{SS_{res}}{SS_{tot}}$ | Coefficient of Determination |

### 3. Regularization

To prevent overfitting, we can add regularization:

**Ridge Regression (L2):**

$$J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)})^2 + \\lambda \\sum_{j=1}^{n} \\theta_j^2$$

**Lasso Regression (L1):**

$$J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)})^2 + \\lambda \\sum_{j=1}^{n} |\\theta_j|$$

## Example Usage

\`\`\`python
# Generate sample data
X = np.random.randn(100, 1)
y = 2 * X + 1 + np.random.randn(100, 1) * 0.1

# Create and train model
model = LinearRegression(learning_rate=0.01, iterations=1000)
model.fit(X, y)

# Make predictions
predictions = model.predict(X)

print(f"Weights: {model.weights}")
print(f"Bias: {model.bias}")
\`\`\`

## Important Notes

> **Note**: Linear regression works best when the relationship between variables is actually linear. For non-linear relationships, consider polynomial regression or other algorithms.

> **Tip**: Always normalize your features before training to ensure faster convergence and better performance.

## Advanced Topics

### Normal Equation

Instead of gradient descent, we can solve analytically:

$$\\boldsymbol{\\theta} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}$$

This is faster for small datasets but becomes computationally expensive for large datasets.

### Polynomial Features

Transform features to capture non-linear relationships:

$$y = \\theta_0 + \\theta_1x + \\theta_2x^2 + \\theta_3x^3 + ...$$

## Summary

Linear regression is a powerful yet simple algorithm that:

1. ✅ Easy to understand and implement
2. ✅ Fast to train
3. ✅ Interpretable results
4. ✅ Works well for linear relationships
5. ⚠️ Assumes linearity
6. ⚠️ Sensitive to outliers

---

**Next Steps**: Try implementing this on a real dataset and experiment with different learning rates and regularization parameters!
`;

export default function MarkdownDemo() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <LessonExplanationPanel
        title="Linear Regression in Machine Learning"
        content={demoContent}
        duration={30}
      />

      {/* Additional Examples */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#e5e7eb', marginBottom: '1rem' }}>More Examples</h2>
        
        <LessonExplanationPanel
          title="Inline Math Example"
          content={`
## Inline Math

You can write inline math like $E = mc^2$ or $\\pi \\approx 3.14159$ directly in your text.

The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ and it's beautiful!

## Code Highlighting

Python code with syntax highlighting:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

JavaScript example:

\`\`\`javascript
const factorial = (n) => {
  return n <= 1 ? 1 : n * factorial(n - 1);
};

console.log(factorial(5));
\`\`\`
          `}
          duration={10}
        />

        <LessonExplanationPanel
          title="Lists and Tables"
          content={`
## Ordered List

1. First item
2. Second item
3. Third item
   - Nested item
   - Another nested item

## Unordered List

- Machine Learning
  - Supervised Learning
  - Unsupervised Learning
  - Reinforcement Learning
- Deep Learning
  - Neural Networks
  - CNNs
  - RNNs

## Comparison Table

| Algorithm | Type | Use Case |
|-----------|------|----------|
| Linear Regression | Supervised | Continuous prediction |
| Logistic Regression | Supervised | Binary classification |
| K-Means | Unsupervised | Clustering |
| Decision Trees | Supervised | Classification/Regression |
          `}
          duration={5}
        />
      </div>
    </div>
  );
}
