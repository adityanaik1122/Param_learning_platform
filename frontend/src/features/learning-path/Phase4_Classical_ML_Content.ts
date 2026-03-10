export const phase4ClassicalMLContent = {
  id: 4,
  title: 'Phase 4: Classical Machine Learning',
  topics: [
    'Supervised Learning Algorithms',
    'Ensemble Methods',
    'Model Evaluation & Validation',
    'Feature Engineering',
    'Logistic Regression',
    'K-Means & DBSCAN Clustering',
    'PCA & Dimensionality Reduction',
    'Anomaly Detection',
    'Time Series Basics',
    'Recommendation Systems'
  ],
  lessons: [
    {
      title: 'Decision Trees & Random Forests',
      description: `
## Decision Trees & Random Forests

### Overview
Decision trees make decisions by asking a series of questions. Random Forests combine multiple trees to create a powerful ensemble model.

### Key Concepts

**Decision Tree**: Tree-like model of decisions
- Each internal node: test on an attribute
- Each branch: outcome of the test
- Each leaf: class label or value

**Random Forest**: Ensemble of decision trees
- Bootstrap aggregating (bagging)
- Random feature selection at each split
- Reduces overfitting

### Problem Statement
1. Build decision tree and Random Forest classifiers
2. Visualize decision boundaries
3. Compare performance and feature importance
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=500, n_features=2, n_redundant=0, n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Train Decision Tree
dt_model = DecisionTreeClassifier(max_depth=5, random_state=42)


# TODO: Train Random Forest
rf_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)


print(f"Decision Tree Accuracy: {dt_accuracy:.3f}")
print(f"Random Forest Accuracy: {rf_accuracy:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=500, n_features=2, n_redundant=0, n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

dt_model = DecisionTreeClassifier(max_depth=5, random_state=42)
dt_model.fit(X_train, y_train)

rf_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf_model.fit(X_train, y_train)

dt_accuracy = accuracy_score(y_test, dt_model.predict(X_test))
rf_accuracy = accuracy_score(y_test, rf_model.predict(X_test))

print(f"Decision Tree Accuracy: {dt_accuracy:.3f}")
print(f"Random Forest Accuracy: {rf_accuracy:.3f}")
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=500, n_features=2, n_redundant=0, n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

dt_model = DecisionTreeClassifier(max_depth=5, random_state=42)
dt_model.fit(X_train, y_train)

rf_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf_model.fit(X_train, y_train)

print(f"Decision Tree: {accuracy_score(y_test, dt_model.predict(X_test)):.3f}")
print(f"Random Forest: {accuracy_score(y_test, rf_model.predict(X_test)):.3f}")
`
    },
    {
      title: 'Support Vector Machines (SVM)',
      description: `
## Support Vector Machines

### Overview
SVMs find the optimal hyperplane that maximizes the margin between classes. They can handle non-linear boundaries using the kernel trick.

### Key Concepts

**Linear SVM**: Finds hyperplane that separates classes
- Maximize margin between support vectors
- Support vectors: points closest to decision boundary

**Kernel Trick**: Transform data to higher dimensions
- RBF (Radial Basis Function): Most common
- Polynomial: For polynomial relationships

### Problem Statement
1. Train linear and RBF SVM
2. Visualize decision boundaries
3. Compare different kernels
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_moons(n_samples=300, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Train Linear SVM
linear_svm = SVC(kernel='linear', C=1.0)


# TODO: Train RBF SVM
rbf_svm = SVC(kernel='rbf', C=1.0, gamma='scale')


print(f"Linear SVM Accuracy: {linear_accuracy:.3f}")
print(f"RBF SVM Accuracy: {rbf_accuracy:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_moons(n_samples=300, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

linear_svm = SVC(kernel='linear', C=1.0)
linear_svm.fit(X_train, y_train)

rbf_svm = SVC(kernel='rbf', C=1.0, gamma='scale')
rbf_svm.fit(X_train, y_train)

linear_accuracy = accuracy_score(y_test, linear_svm.predict(X_test))
rbf_accuracy = accuracy_score(y_test, rbf_svm.predict(X_test))

print(f"Linear SVM Accuracy: {linear_accuracy:.3f}")
print(f"RBF SVM Accuracy: {rbf_accuracy:.3f}")
print(f"Linear SVM Support Vectors: {len(linear_svm.support_vectors_)}")
print(f"RBF SVM Support Vectors: {len(rbf_svm.support_vectors_)}")
`,
      code: `import numpy as np
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_moons(n_samples=300, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

linear_svm = SVC(kernel='linear', C=1.0)
linear_svm.fit(X_train, y_train)

rbf_svm = SVC(kernel='rbf', C=1.0, gamma='scale')
rbf_svm.fit(X_train, y_train)

print(f"Linear SVM: {accuracy_score(y_test, linear_svm.predict(X_test)):.3f}")
print(f"RBF SVM: {accuracy_score(y_test, rbf_svm.predict(X_test)):.3f}")
`
    },
    {
      title: 'Gradient Boosting (XGBoost, LightGBM)',
      description: `
## Gradient Boosting

### Overview
Gradient Boosting builds an ensemble of weak learners sequentially, where each new tree corrects errors made by previous trees.

### Key Concepts

**Gradient Boosting**: Sequential ensemble method
- Builds trees one at a time
- Each tree fits residual errors
- Combines predictions additively

**XGBoost**: Extreme Gradient Boosting
- Regularization to prevent overfitting
- Parallel tree construction

**LightGBM**: Light Gradient Boosting Machine
- Leaf-wise tree growth (faster)
- Lower memory usage

### Problem Statement
1. Train XGBoost and LightGBM classifiers
2. Compare performance and speed
3. Visualize feature importance
`,
      starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import xgboost as xgb
import lightgbm as lgb
import time

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Train XGBoost
start_time = time.time()
xgb_model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)

xgb_time = time.time() - start_time

# TODO: Train LightGBM
start_time = time.time()
lgb_model = lgb.LGBMClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)

lgb_time = time.time() - start_time

print(f"XGBoost Accuracy: {xgb_accuracy:.3f} (Time: {xgb_time:.2f}s)")
print(f"LightGBM Accuracy: {lgb_accuracy:.3f} (Time: {lgb_time:.2f}s)")
`,
      solution: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import xgboost as xgb
import lightgbm as lgb
import time

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

start_time = time.time()
xgb_model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
xgb_model.fit(X_train, y_train)
xgb_time = time.time() - start_time

start_time = time.time()
lgb_model = lgb.LGBMClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42, verbose=-1)
lgb_model.fit(X_train, y_train)
lgb_time = time.time() - start_time

xgb_accuracy = accuracy_score(y_test, xgb_model.predict(X_test))
lgb_accuracy = accuracy_score(y_test, lgb_model.predict(X_test))

print(f"XGBoost Accuracy: {xgb_accuracy:.3f} (Time: {xgb_time:.2f}s)")
print(f"LightGBM Accuracy: {lgb_accuracy:.3f} (Time: {lgb_time:.2f}s)")
`,
      code: `import numpy as np
import xgboost as xgb
import lightgbm as lgb
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import time

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

start = time.time()
xgb_model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
xgb_model.fit(X_train, y_train)
xgb_time = time.time() - start

start = time.time()
lgb_model = lgb.LGBMClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42, verbose=-1)
lgb_model.fit(X_train, y_train)
lgb_time = time.time() - start

print(f"XGBoost: {accuracy_score(y_test, xgb_model.predict(X_test)):.3f} ({xgb_time:.2f}s)")
print(f"LightGBM: {accuracy_score(y_test, lgb_model.predict(X_test)):.3f} ({lgb_time:.2f}s)")
`
    },
    {
      title: 'K-Nearest Neighbors (KNN)',
      description: `
## K-Nearest Neighbors

### Overview
KNN is a simple, instance-based learning algorithm that classifies data points based on the majority class of their k nearest neighbors.

### Key Concepts

**How KNN Works**:
- Store all training data
- For new point, find k nearest neighbors
- Classify by majority vote

**Distance Metrics**:
- Euclidean: Standard straight-line distance
- Manhattan: Sum of absolute differences

**Choosing K**:
- Small k: More sensitive to noise
- Large k: Smoother decision boundaries

### Problem Statement
1. Implement KNN classifier
2. Test different k values
3. Find optimal k
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=300, n_features=2, n_redundant=0, n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Scale features (important for KNN!)
scaler = StandardScaler()


# TODO: Test different k values
k_values = [1, 3, 5, 7, 9, 15, 21]
accuracies = []

for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k)
    
    accuracies.append()

optimal_k = k_values[np.argmax(accuracies)]
print(f"Optimal k: {optimal_k} with accuracy: {max(accuracies):.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=300, n_features=2, n_redundant=0, n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

k_values = [1, 3, 5, 7, 9, 15, 21]
accuracies = []

for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train_scaled, y_train)
    pred = knn.predict(X_test_scaled)
    accuracies.append(accuracy_score(y_test, pred))

optimal_k = k_values[np.argmax(accuracies)]
print(f"Optimal k: {optimal_k} with accuracy: {max(accuracies):.3f}")

plt.figure(figsize=(10, 6))
plt.plot(k_values, accuracies, marker='o', linewidth=2, markersize=8)
plt.xlabel('K')
plt.ylabel('Accuracy')
plt.title('KNN Accuracy vs K')
plt.grid(True, alpha=0.3)
plt.show()
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=300, n_features=2, n_redundant=0, n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

k_values = [1, 3, 5, 7, 9, 15, 21]
accuracies = []
for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train_scaled, y_train)
    accuracies.append(accuracy_score(y_test, knn.predict(X_test_scaled)))

print(f"Optimal k: {k_values[np.argmax(accuracies)]} (Accuracy: {max(accuracies):.3f})")
`
    },
    {
      title: 'Naive Bayes Classifiers',
      description: `
## Naive Bayes Classifiers

### Overview
Naive Bayes is a probabilistic classifier based on Bayes' theorem with the "naive" assumption of feature independence.

### Key Concepts

**Bayes' Theorem**:
- P(class|features) = P(features|class) * P(class) / P(features)
- Calculates probability of class given features

**Types**:
- Gaussian NB: For continuous features
- Multinomial NB: For discrete counts (text)
- Bernoulli NB: For binary features

**Advantages**:
- Fast training and prediction
- Works well with high dimensions
- Good for text classification

### Problem Statement
1. Implement Gaussian Naive Bayes
2. Compare with Multinomial Naive Bayes
3. Evaluate on classification task
`,
      starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB, MultinomialNB
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import accuracy_score, classification_report

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Train Gaussian Naive Bayes
gnb = GaussianNB()


# TODO: For Multinomial NB, scale features to positive range
scaler = MinMaxScaler()


mnb = MultinomialNB()


print(f"Gaussian NB Accuracy: {gnb_accuracy:.3f}")
print(f"Multinomial NB Accuracy: {mnb_accuracy:.3f}")
`,
      solution: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB, MultinomialNB
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

gnb = GaussianNB()
gnb.fit(X_train, y_train)
gnb_accuracy = accuracy_score(y_test, gnb.predict(X_test))

scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

mnb = MultinomialNB()
mnb.fit(X_train_scaled, y_train)
mnb_accuracy = accuracy_score(y_test, mnb.predict(X_test_scaled))

print(f"Gaussian NB Accuracy: {gnb_accuracy:.3f}")
print(f"Multinomial NB Accuracy: {mnb_accuracy:.3f}")
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB, MultinomialNB
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

gnb = GaussianNB()
gnb.fit(X_train, y_train)

scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

mnb = MultinomialNB()
mnb.fit(X_train_scaled, y_train)

print(f"Gaussian NB: {accuracy_score(y_test, gnb.predict(X_test)):.3f}")
print(f"Multinomial NB: {accuracy_score(y_test, mnb.predict(X_test_scaled)):.3f}")
`
    },
    {
      title: 'Cross-Validation & Model Selection',
      description: `
## Cross-Validation & Model Selection

### Overview
Cross-validation is a technique to assess how well a model generalizes to unseen data by splitting data into multiple folds.

### Key Concepts

**K-Fold Cross-Validation**:
- Split data into k folds
- Train on k-1 folds, validate on 1
- Repeat k times, average results

**Stratified K-Fold**:
- Maintains class distribution in each fold
- Important for imbalanced datasets

**Grid Search**:
- Exhaustive search over hyperparameter space
- Finds best combination

**Random Search**:
- Random sampling of hyperparameters
- Faster than grid search

### Problem Statement
1. Implement k-fold cross-validation
2. Use GridSearchCV for hyperparameter tuning
3. Compare different models
`,
      starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score, GridSearchCV, train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Perform 5-fold cross-validation
rf_model = RandomForestClassifier(random_state=42)
cv_scores = 

print(f"Cross-validation scores: {cv_scores}")
print(f"Mean CV score: {cv_scores.mean():.3f} (+/- {cv_scores.std():.3f})")

# TODO: Grid Search for best hyperparameters
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, None],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(rf_model, param_grid, cv=5, scoring='accuracy')


print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.3f}")
`,
      solution: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score, GridSearchCV, train_test_split
from sklearn.ensemble import RandomForestClassifier

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

rf_model = RandomForestClassifier(random_state=42)
cv_scores = cross_val_score(rf_model, X_train, y_train, cv=5, scoring='accuracy')

print(f"Cross-validation scores: {cv_scores}")
print(f"Mean CV score: {cv_scores.mean():.3f} (+/- {cv_scores.std():.3f})")

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, None],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(rf_model, param_grid, cv=5, scoring='accuracy')
grid_search.fit(X_train, y_train)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.3f}")
print(f"Test accuracy: {grid_search.score(X_test, y_test):.3f}")
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score, GridSearchCV, train_test_split
from sklearn.ensemble import RandomForestClassifier

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

rf_model = RandomForestClassifier(random_state=42)
cv_scores = cross_val_score(rf_model, X_train, y_train, cv=5, scoring='accuracy')

print(f"Mean CV score: {cv_scores.mean():.3f} (+/- {cv_scores.std():.3f})")

param_grid = {'n_estimators': [50, 100, 200], 'max_depth': [5, 10, None]}
grid_search = GridSearchCV(rf_model, param_grid, cv=5, scoring='accuracy')
grid_search.fit(X_train, y_train)

print(f"Best params: {grid_search.best_params_}")
print(f"Test accuracy: {grid_search.score(X_test, y_test):.3f}")
`
    },
    {
      title: 'Feature Engineering & Selection',
      description: `
## Feature Engineering & Selection

### Overview
Feature engineering creates new features from existing ones. Feature selection identifies the most important features for model performance.

### Key Concepts

**Feature Engineering**:
- Polynomial features: Create interaction terms
- Binning: Convert continuous to categorical
- Encoding: One-hot, label encoding

**Feature Selection Methods**:
- Filter: Statistical tests (correlation, chi-square)
- Wrapper: Recursive Feature Elimination (RFE)
- Embedded: L1 regularization (Lasso)

**Feature Importance**:
- Tree-based models provide importance scores
- Permutation importance

### Problem Statement
1. Create polynomial features
2. Apply feature selection techniques
3. Compare model performance
`,
      starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.feature_selection import SelectKBest, f_classif, RFE
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, n_redundant=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Create polynomial features
poly = PolynomialFeatures(degree=2, include_bias=False)


print(f"Original features: {X_train.shape[1]}, Polynomial features: {X_train_poly.shape[1]}")

# TODO: Select K best features
selector = SelectKBest(f_classif, k=10)


# TODO: Train model and compare
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)


print(f"Accuracy with all features: {acc_all:.3f}")
print(f"Accuracy with selected features: {acc_selected:.3f}")
`,
      solution: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, n_redundant=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

poly = PolynomialFeatures(degree=2, include_bias=False)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)

print(f"Original features: {X_train.shape[1]}, Polynomial features: {X_train_poly.shape[1]}")

selector = SelectKBest(f_classif, k=10)
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)

rf_model.fit(X_train, y_train)
acc_all = accuracy_score(y_test, rf_model.predict(X_test))

rf_model.fit(X_train_selected, y_train)
acc_selected = accuracy_score(y_test, rf_model.predict(X_test_selected))

print(f"Accuracy with all features: {acc_all:.3f}")
print(f"Accuracy with selected features: {acc_selected:.3f}")
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, n_redundant=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

poly = PolynomialFeatures(degree=2, include_bias=False)
X_train_poly = poly.fit_transform(X_train)

print(f"Original: {X_train.shape[1]}, Polynomial: {X_train_poly.shape[1]}")

selector = SelectKBest(f_classif, k=10)
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
print(f"All features: {accuracy_score(y_test, rf.predict(X_test)):.3f}")

rf.fit(X_train_selected, y_train)
print(f"Selected features: {accuracy_score(y_test, rf.predict(X_test_selected)):.3f}")
`
    },
    {
      title: 'Handling Imbalanced Data',
      description: `
## Handling Imbalanced Data

### Overview
Imbalanced datasets have unequal class distributions, which can bias models toward the majority class. Special techniques are needed.

### Key Concepts

**Resampling Techniques**:
- Oversampling: Duplicate minority class (SMOTE)
- Undersampling: Remove majority class samples
- Combination: SMOTE + Tomek links

**Algorithm-Level Approaches**:
- Class weights: Penalize misclassification of minority
- Cost-sensitive learning

**Evaluation Metrics**:
- Precision, Recall, F1-score
- ROC-AUC, PR-AUC
- Confusion matrix

### Problem Statement
1. Create imbalanced dataset
2. Apply SMOTE oversampling
3. Use class weights
4. Compare evaluation metrics
`,
      starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from imblearn.over_sampling import SMOTE

# Create imbalanced dataset
np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15,
                          weights=[0.9, 0.1], flip_y=0, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

print(f"Class distribution: {np.bincount(y_train)}")

# TODO: Train baseline model
rf_baseline = RandomForestClassifier(n_estimators=100, random_state=42)


# TODO: Apply SMOTE
smote = SMOTE(random_state=42)


rf_smote = RandomForestClassifier(n_estimators=100, random_state=42)


# TODO: Use class weights
rf_weighted = RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42)


print("\\nBaseline Model:")
print(classification_report(y_test, pred_baseline))

print("\\nSMOTE Model:")
print(classification_report(y_test, pred_smote))

print("\\nWeighted Model:")
print(classification_report(y_test, pred_weighted))
`,
      solution: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from imblearn.over_sampling import SMOTE

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15,
                          weights=[0.9, 0.1], flip_y=0, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

print(f"Class distribution: {np.bincount(y_train)}")

rf_baseline = RandomForestClassifier(n_estimators=100, random_state=42)
rf_baseline.fit(X_train, y_train)
pred_baseline = rf_baseline.predict(X_test)

smote = SMOTE(random_state=42)
X_train_smote, y_train_smote = smote.fit_resample(X_train, y_train)

rf_smote = RandomForestClassifier(n_estimators=100, random_state=42)
rf_smote.fit(X_train_smote, y_train_smote)
pred_smote = rf_smote.predict(X_test)

rf_weighted = RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42)
rf_weighted.fit(X_train, y_train)
pred_weighted = rf_weighted.predict(X_test)

print("\\nBaseline Model:")
print(classification_report(y_test, pred_baseline))

print("\\nSMOTE Model:")
print(classification_report(y_test, pred_smote))

print("\\nWeighted Model:")
print(classification_report(y_test, pred_weighted))
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from imblearn.over_sampling import SMOTE

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15,
                          weights=[0.9, 0.1], random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

print(f"Class distribution: {np.bincount(y_train)}")

# Baseline
rf_baseline = RandomForestClassifier(n_estimators=100, random_state=42)
rf_baseline.fit(X_train, y_train)

# SMOTE
smote = SMOTE(random_state=42)
X_train_smote, y_train_smote = smote.fit_resample(X_train, y_train)
rf_smote = RandomForestClassifier(n_estimators=100, random_state=42)
rf_smote.fit(X_train_smote, y_train_smote)

# Weighted
rf_weighted = RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42)
rf_weighted.fit(X_train, y_train)

print("\\nBaseline:")
print(classification_report(y_test, rf_baseline.predict(X_test)))
print("\\nSMOTE:")
print(classification_report(y_test, rf_smote.predict(X_test)))
print("\\nWeighted:")
print(classification_report(y_test, rf_weighted.predict(X_test)))
`
    },
    {
      title: 'Model Interpretability (SHAP, LIME)',
      description: `
## Model Interpretability

### Overview
Understanding why a model makes certain predictions is crucial for trust and debugging. SHAP and LIME are popular explainability tools.

### Key Concepts

**SHAP (SHapley Additive exPlanations)**:
- Based on game theory
- Assigns each feature an importance value
- Consistent and locally accurate

**LIME (Local Interpretable Model-agnostic Explanations)**:
- Explains individual predictions
- Fits local linear model around prediction
- Model-agnostic

**Feature Importance**:
- Global: Overall feature importance
- Local: Importance for specific prediction

### Problem Statement
1. Train a Random Forest model
2. Use SHAP to explain predictions
3. Visualize feature importance
4. Interpret individual predictions
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import shap

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=10, n_informative=8, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Train model
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)


# TODO: Create SHAP explainer
explainer = shap.TreeExplainer(rf_model)
shap_values = 

# TODO: Summary plot
shap.summary_plot(shap_values, X_test, plot_type="bar")

# TODO: Explain single prediction
sample_idx = 0
shap.waterfall_plot(shap.Explanation(values=shap_values[sample_idx],
                                     base_values=explainer.expected_value,
                                     data=X_test[sample_idx]))
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import shap

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=10, n_informative=8, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

explainer = shap.TreeExplainer(rf_model)
shap_values = explainer.shap_values(X_test)

# For binary classification, use class 1 SHAP values
if isinstance(shap_values, list):
    shap_values = shap_values[1]

shap.summary_plot(shap_values, X_test, plot_type="bar")

sample_idx = 0
shap.waterfall_plot(shap.Explanation(values=shap_values[sample_idx],
                                     base_values=explainer.expected_value[1] if isinstance(explainer.expected_value, list) else explainer.expected_value,
                                     data=X_test[sample_idx]))
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import shap

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=10, n_informative=8, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

explainer = shap.TreeExplainer(rf_model)
shap_values = explainer.shap_values(X_test)

if isinstance(shap_values, list):
    shap_values = shap_values[1]

print("SHAP values computed successfully")
print(f"Shape: {shap_values.shape}")
print(f"Mean absolute SHAP value: {np.abs(shap_values).mean():.4f}")

# Summary plot
shap.summary_plot(shap_values, X_test, plot_type="bar", show=False)
print("Feature importance plot generated")
`
    },
    {
      title: 'Ensemble Methods Advanced',
      description: `
## Advanced Ensemble Methods

### Overview
Ensemble methods combine multiple models to create a stronger predictor. Advanced techniques include stacking, blending, and voting.

### Key Concepts

**Voting Classifiers**:
- Hard voting: Majority vote
- Soft voting: Average probabilities

**Stacking**:
- Train multiple base models
- Use meta-model to combine predictions
- Learns optimal combination

**Blending**:
- Similar to stacking
- Uses holdout set for meta-model

**Bagging vs Boosting**:
- Bagging: Parallel, reduces variance (Random Forest)
- Boosting: Sequential, reduces bias (XGBoost)

### Problem Statement
1. Create voting classifier
2. Implement stacking ensemble
3. Compare with individual models
4. Evaluate ensemble performance
`,
      starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import VotingClassifier, StackingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Create base models
rf = RandomForestClassifier(n_estimators=100, random_state=42)
svm = SVC(kernel='rbf', probability=True, random_state=42)
dt = DecisionTreeClassifier(max_depth=10, random_state=42)

# TODO: Create voting classifier
voting_clf = VotingClassifier(
    estimators=[('rf', rf), ('svm', svm), ('dt', dt)],
    voting='soft'
)


# TODO: Create stacking classifier
stacking_clf = StackingClassifier(
    estimators=[('rf', rf), ('svm', svm), ('dt', dt)],
    final_estimator=LogisticRegression()
)


# TODO: Compare accuracies
rf.fit(X_train, y_train)
print(f"Random Forest Accuracy: {accuracy_score(y_test, rf.predict(X_test)):.3f}")

print(f"Voting Classifier Accuracy: {accuracy_score(y_test, voting_pred):.3f}")
print(f"Stacking Classifier Accuracy: {accuracy_score(y_test, stacking_pred):.3f}")
`,
      solution: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import VotingClassifier, StackingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
svm = SVC(kernel='rbf', probability=True, random_state=42)
dt = DecisionTreeClassifier(max_depth=10, random_state=42)

voting_clf = VotingClassifier(
    estimators=[('rf', rf), ('svm', svm), ('dt', dt)],
    voting='soft'
)
voting_clf.fit(X_train, y_train)
voting_pred = voting_clf.predict(X_test)

stacking_clf = StackingClassifier(
    estimators=[('rf', rf), ('svm', svm), ('dt', dt)],
    final_estimator=LogisticRegression()
)
stacking_clf.fit(X_train, y_train)
stacking_pred = stacking_clf.predict(X_test)

rf.fit(X_train, y_train)
print(f"Random Forest Accuracy: {accuracy_score(y_test, rf.predict(X_test)):.3f}")
print(f"Voting Classifier Accuracy: {accuracy_score(y_test, voting_pred):.3f}")
print(f"Stacking Classifier Accuracy: {accuracy_score(y_test, stacking_pred):.3f}")
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import VotingClassifier, StackingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
svm = SVC(kernel='rbf', probability=True, random_state=42)
dt = DecisionTreeClassifier(max_depth=10, random_state=42)

voting_clf = VotingClassifier(estimators=[('rf', rf), ('svm', svm), ('dt', dt)], voting='soft')
voting_clf.fit(X_train, y_train)

stacking_clf = StackingClassifier(estimators=[('rf', rf), ('svm', svm), ('dt', dt)],
                                  final_estimator=LogisticRegression())
stacking_clf.fit(X_train, y_train)

rf.fit(X_train, y_train)
print(f"Random Forest: {accuracy_score(y_test, rf.predict(X_test)):.3f}")
print(f"Voting: {accuracy_score(y_test, voting_clf.predict(X_test)):.3f}")
print(f"Stacking: {accuracy_score(y_test, stacking_clf.predict(X_test)):.3f}")
`
    },
    {
      title: 'Logistic Regression',
      description: `
## Logistic Regression

### Overview
Logistic Regression is a fundamental classification algorithm that models the probability of a binary outcome using the sigmoid function. Despite its name, it's used for classification, not regression.

### Key Concepts

**Sigmoid Function**:
- σ(z) = 1 / (1 + e^(-z))
- Maps any real number to (0, 1)
- Output interpreted as probability

**Decision Boundary**:
- Linear boundary separating classes
- Threshold at 0.5 by default
- Can be adjusted for different precision/recall tradeoffs

**Regularization**:
- L1 (Lasso): Drives some coefficients to zero (feature selection)
- L2 (Ridge): Shrinks coefficients (prevents overfitting)
- C parameter: Inverse of regularization strength

**Multi-class Classification**:
- One-vs-Rest (OvR): Train one classifier per class
- Multinomial: Direct multi-class via softmax

**Interpreting Coefficients**:
- Positive coefficient → increases probability of class 1
- Magnitude indicates feature importance
- Odds ratio: exp(coefficient)

### Problem Statement
1. Train logistic regression for binary classification
2. Visualize the sigmoid function and decision boundary
3. Compare L1 vs L2 regularization
4. Interpret model coefficients
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
X, y = make_classification(n_samples=500, n_features=2, n_redundant=0,
                          n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Scale features
scaler = StandardScaler()


# TODO: Train Logistic Regression with L2 regularization
lr_l2 = LogisticRegression(penalty='l2', C=1.0, random_state=42)


# TODO: Train Logistic Regression with L1 regularization
lr_l1 = LogisticRegression(penalty='l1', C=1.0, solver='saga', random_state=42)


print(f"L2 Accuracy: {l2_accuracy:.3f}")
print(f"L1 Accuracy: {l1_accuracy:.3f}")

# TODO: Print coefficients
print(f"L2 Coefficients: {lr_l2.coef_}")
print(f"L1 Coefficients: {lr_l1.coef_}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
X, y = make_classification(n_samples=500, n_features=2, n_redundant=0,
                          n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

lr_l2 = LogisticRegression(penalty='l2', C=1.0, random_state=42)
lr_l2.fit(X_train_scaled, y_train)
l2_accuracy = accuracy_score(y_test, lr_l2.predict(X_test_scaled))

lr_l1 = LogisticRegression(penalty='l1', C=1.0, solver='saga', random_state=42)
lr_l1.fit(X_train_scaled, y_train)
l1_accuracy = accuracy_score(y_test, lr_l1.predict(X_test_scaled))

print(f"L2 Accuracy: {l2_accuracy:.3f}")
print(f"L1 Accuracy: {l1_accuracy:.3f}")

print(f"\\nL2 Coefficients: {lr_l2.coef_[0]}")
print(f"L1 Coefficients: {lr_l1.coef_[0]}")
print(f"L2 Intercept: {lr_l2.intercept_[0]:.4f}")

# Visualize decision boundary
xx, yy = np.meshgrid(np.linspace(X_train_scaled[:, 0].min()-1, X_train_scaled[:, 0].max()+1, 200),
                     np.linspace(X_train_scaled[:, 1].min()-1, X_train_scaled[:, 1].max()+1, 200))
Z = lr_l2.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)

plt.figure(figsize=(10, 6))
plt.contourf(xx, yy, Z, alpha=0.3, cmap='RdYlBu')
plt.scatter(X_train_scaled[:, 0], X_train_scaled[:, 1], c=y_train, cmap='RdYlBu', edgecolors='black')
plt.title('Logistic Regression Decision Boundary')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.show()
`,
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
X, y = make_classification(n_samples=500, n_features=2, n_redundant=0,
                          n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

lr_l2 = LogisticRegression(penalty='l2', C=1.0, random_state=42)
lr_l2.fit(X_train_scaled, y_train)

lr_l1 = LogisticRegression(penalty='l1', C=1.0, solver='saga', random_state=42)
lr_l1.fit(X_train_scaled, y_train)

print(f"L2 Accuracy: {accuracy_score(y_test, lr_l2.predict(X_test_scaled)):.3f}")
print(f"L1 Accuracy: {accuracy_score(y_test, lr_l1.predict(X_test_scaled)):.3f}")
print(f"L2 Coefficients: {lr_l2.coef_[0]}")
print(f"L1 Coefficients: {lr_l1.coef_[0]}")
`
    },
    {
      title: 'K-Means & DBSCAN Clustering',
      description: `
## K-Means & DBSCAN Clustering

### Overview
Clustering is an unsupervised learning technique that groups similar data points together. K-Means and DBSCAN are two popular approaches with different strengths.

### Key Concepts

**K-Means Algorithm**:
- Initialize k centroids randomly
- Assign each point to nearest centroid
- Update centroids as mean of assigned points
- Repeat until convergence

**Choosing K**:
- Elbow method: Plot inertia vs k, find the "elbow"
- Silhouette score: Measures cluster cohesion and separation (-1 to 1)

**DBSCAN (Density-Based Spatial Clustering)**:
- Groups together points in high-density regions
- Parameters: eps (neighborhood radius), min_samples
- Automatically finds number of clusters
- Can identify noise points (outliers)

**K-Means vs DBSCAN**:
- K-Means: Spherical clusters, requires k, sensitive to outliers
- DBSCAN: Arbitrary shapes, handles noise, no need to specify k

### Problem Statement
1. Apply K-Means clustering with elbow method
2. Apply DBSCAN clustering
3. Compare results on different shaped data
4. Evaluate with silhouette scores
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs, make_moons
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

np.random.seed(42)

# Create blob-shaped data
X_blobs, y_blobs = make_blobs(n_samples=300, centers=4, cluster_std=0.6, random_state=42)

# Create moon-shaped data
X_moons, y_moons = make_moons(n_samples=300, noise=0.08, random_state=42)

# TODO: Elbow method for K-Means
inertias = []
k_range = range(2, 11)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)


print("Elbow method inertias computed")

# TODO: Apply K-Means with optimal k
kmeans_optimal = KMeans(n_clusters=4, random_state=42, n_init=10)


# TODO: Apply DBSCAN to moon data
scaler = StandardScaler()

dbscan = DBSCAN(eps=0.3, min_samples=5)


print(f"K-Means Silhouette: {kmeans_score:.3f}")
print(f"DBSCAN clusters found: {n_clusters}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs, make_moons
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

np.random.seed(42)

X_blobs, y_blobs = make_blobs(n_samples=300, centers=4, cluster_std=0.6, random_state=42)
X_moons, y_moons = make_moons(n_samples=300, noise=0.08, random_state=42)

# Elbow method
inertias = []
silhouette_scores = []
k_range = range(2, 11)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_blobs)
    inertias.append(kmeans.inertia_)
    silhouette_scores.append(silhouette_score(X_blobs, kmeans.labels_))

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))
ax1.plot(k_range, inertias, marker='o')
ax1.set_title('Elbow Method')
ax1.set_xlabel('k')
ax1.set_ylabel('Inertia')

ax2.plot(k_range, silhouette_scores, marker='o')
ax2.set_title('Silhouette Score')
ax2.set_xlabel('k')
ax2.set_ylabel('Score')
plt.tight_layout()
plt.show()

# K-Means with optimal k=4
kmeans_optimal = KMeans(n_clusters=4, random_state=42, n_init=10)
kmeans_labels = kmeans_optimal.fit_predict(X_blobs)
kmeans_score = silhouette_score(X_blobs, kmeans_labels)

# DBSCAN on moon data
scaler = StandardScaler()
X_moons_scaled = scaler.fit_transform(X_moons)
dbscan = DBSCAN(eps=0.3, min_samples=5)
dbscan_labels = dbscan.fit_predict(X_moons_scaled)

n_clusters = len(set(dbscan_labels)) - (1 if -1 in dbscan_labels else 0)
n_noise = list(dbscan_labels).count(-1)

print(f"K-Means Silhouette: {kmeans_score:.3f}")
print(f"DBSCAN clusters found: {n_clusters}, Noise points: {n_noise}")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))
ax1.scatter(X_blobs[:, 0], X_blobs[:, 1], c=kmeans_labels, cmap='viridis')
ax1.set_title(f'K-Means (k=4, silhouette={kmeans_score:.3f})')

ax2.scatter(X_moons_scaled[:, 0], X_moons_scaled[:, 1], c=dbscan_labels, cmap='viridis')
ax2.set_title(f'DBSCAN ({n_clusters} clusters)')
plt.tight_layout()
plt.show()
`,
      code: `import numpy as np
from sklearn.datasets import make_blobs, make_moons
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
X_blobs, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.6, random_state=42)
X_moons, _ = make_moons(n_samples=300, noise=0.08, random_state=42)

# Elbow method
for k in range(2, 11):
    km = KMeans(n_clusters=k, random_state=42, n_init=10).fit(X_blobs)
    print(f"k={k}: inertia={km.inertia_:.1f}, silhouette={silhouette_score(X_blobs, km.labels_):.3f}")

# K-Means optimal
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
km_labels = kmeans.fit_predict(X_blobs)
print(f"\\nK-Means Silhouette: {silhouette_score(X_blobs, km_labels):.3f}")

# DBSCAN on moons
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_moons)
db_labels = DBSCAN(eps=0.3, min_samples=5).fit_predict(X_scaled)
n_clusters = len(set(db_labels)) - (1 if -1 in db_labels else 0)
print(f"DBSCAN clusters: {n_clusters}, noise: {list(db_labels).count(-1)}")
`
    },
    {
      title: 'PCA & Dimensionality Reduction',
      description: `
## PCA & Dimensionality Reduction

### Overview
Principal Component Analysis (PCA) reduces the number of features while preserving the most important information. It finds new axes (principal components) that maximize variance.

### Key Concepts

**How PCA Works**:
- Center the data (subtract mean)
- Compute covariance matrix
- Find eigenvectors and eigenvalues
- Select top-k eigenvectors as principal components
- Project data onto new axes

**Variance Explained**:
- Each component explains a portion of total variance
- Cumulative variance plot helps choose number of components
- Rule of thumb: Keep enough components for 90-95% variance

**When to Use PCA**:
- High-dimensional data (many features)
- Visualization of high-dimensional data in 2D/3D
- Speeding up training of other ML models
- Reducing noise in data

**Limitations**:
- Assumes linear relationships
- Components may be hard to interpret
- Sensitive to feature scaling (always standardize first)

### Problem Statement
1. Apply PCA to a high-dimensional dataset
2. Analyze variance explained ratio
3. Visualize data in 2D using PCA
4. Compare model performance with/without PCA
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load high-dimensional dataset (64 features)
digits = load_digits()
X, y = digits.data, digits.target

# TODO: Standardize features
scaler = StandardScaler()


# TODO: Apply PCA and analyze variance
pca_full = PCA()


# TODO: Plot cumulative variance explained
cumulative_variance = np.cumsum(pca_full.explained_variance_ratio_)


# TODO: Find number of components for 95% variance
n_components_95 = np.argmax(cumulative_variance >= 0.95) + 1
print(f"Components for 95% variance: {n_components_95} (out of {X.shape[1]}")

# TODO: Apply PCA with optimal components and compare accuracy
pca_optimal = PCA(n_components=n_components_95)


# Train and compare
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)
X_train_pca, X_test_pca, _, _ = train_test_split(X_pca, y, test_size=0.3, random_state=42)

print(f"Accuracy without PCA: {acc_full:.3f}")
print(f"Accuracy with PCA ({n_components_95} components): {acc_pca:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

digits = load_digits()
X, y = digits.data, digits.target

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca_full = PCA()
pca_full.fit(X_scaled)

cumulative_variance = np.cumsum(pca_full.explained_variance_ratio_)

plt.figure(figsize=(10, 6))
plt.plot(range(1, len(cumulative_variance)+1), cumulative_variance, marker='o', markersize=3)
plt.axhline(y=0.95, color='r', linestyle='--', label='95% variance')
plt.xlabel('Number of Components')
plt.ylabel('Cumulative Explained Variance')
plt.title('PCA - Cumulative Variance Explained')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

n_components_95 = np.argmax(cumulative_variance >= 0.95) + 1
print(f"Components for 95% variance: {n_components_95} (out of {X.shape[1]})")

pca_optimal = PCA(n_components=n_components_95)
X_pca = pca_optimal.fit_transform(X_scaled)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)
X_train_pca, X_test_pca, _, _ = train_test_split(X_pca, y, test_size=0.3, random_state=42)

rf_full = RandomForestClassifier(n_estimators=100, random_state=42)
rf_full.fit(X_train, y_train)
acc_full = accuracy_score(y_test, rf_full.predict(X_test))

rf_pca = RandomForestClassifier(n_estimators=100, random_state=42)
rf_pca.fit(X_train_pca, y_train)
acc_pca = accuracy_score(y_test, rf_pca.predict(X_test_pca))

print(f"Accuracy without PCA: {acc_full:.3f}")
print(f"Accuracy with PCA ({n_components_95} components): {acc_pca:.3f}")

# Visualize in 2D
pca_2d = PCA(n_components=2)
X_2d = pca_2d.fit_transform(X_scaled)

plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_2d[:, 0], X_2d[:, 1], c=y, cmap='tab10', alpha=0.6, s=10)
plt.colorbar(scatter, label='Digit')
plt.title('Digits Dataset - PCA 2D Projection')
plt.xlabel(f'PC1 ({pca_2d.explained_variance_ratio_[0]:.1%} variance)')
plt.ylabel(f'PC2 ({pca_2d.explained_variance_ratio_[1]:.1%} variance)')
plt.show()
`,
      code: `import numpy as np
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

digits = load_digits()
X, y = digits.data, digits.target

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca_full = PCA()
pca_full.fit(X_scaled)
cumulative_var = np.cumsum(pca_full.explained_variance_ratio_)
n_comp_95 = np.argmax(cumulative_var >= 0.95) + 1
print(f"Components for 95% variance: {n_comp_95} (out of {X.shape[1]})")

pca = PCA(n_components=n_comp_95)
X_pca = pca.fit_transform(X_scaled)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)
X_train_pca, X_test_pca, _, _ = train_test_split(X_pca, y, test_size=0.3, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
print(f"Without PCA: {accuracy_score(y_test, rf.predict(X_test)):.3f}")

rf.fit(X_train_pca, y_train)
print(f"With PCA ({n_comp_95} components): {accuracy_score(y_test, rf.predict(X_test_pca)):.3f}")
`
    },
    {
      title: 'Anomaly Detection',
      description: `
## Anomaly Detection

### Overview
Anomaly detection identifies rare or unusual data points that differ significantly from the majority. It's crucial for fraud detection, quality control, and security.

### Key Concepts

**Isolation Forest**:
- Builds random trees to isolate observations
- Anomalies are isolated in fewer splits
- contamination parameter sets expected anomaly fraction
- Works well with high-dimensional data

**One-Class SVM**:
- Learns a boundary around normal data
- Points outside the boundary are anomalies
- Uses kernel trick for non-linear boundaries

**Statistical Methods**:
- Z-score: Flag points > 3 standard deviations
- IQR method: Flag points outside 1.5 × IQR
- Simple but effective for univariate data

**Use Cases**:
- Fraud detection in financial transactions
- Manufacturing defect detection
- Network intrusion detection
- Medical anomaly identification

### Problem Statement
1. Generate synthetic data with anomalies
2. Apply Isolation Forest and One-Class SVM
3. Compare detection with Z-score method
4. Evaluate precision and recall
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest
from sklearn.svm import OneClassSVM
from sklearn.metrics import classification_report
from sklearn.preprocessing import StandardScaler

np.random.seed(42)

# Generate normal data + anomalies
X_normal = np.random.randn(400, 2) * 0.5 + [2, 2]
X_anomalies = np.random.uniform(low=-4, high=8, size=(50, 2))
X = np.vstack([X_normal, X_anomalies])
y_true = np.array([1] * 400 + [-1] * 50)  # 1=normal, -1=anomaly

# TODO: Scale features
scaler = StandardScaler()


# TODO: Isolation Forest
iso_forest = IsolationForest(contamination=0.1, random_state=42)


# TODO: One-Class SVM
oc_svm = OneClassSVM(kernel='rbf', gamma='scale', nu=0.1)


# TODO: Z-score method
z_scores = np.abs((X_scaled - X_scaled.mean(axis=0)) / X_scaled.std(axis=0))


print("Isolation Forest:")
print(classification_report(y_true, iso_pred))

print("One-Class SVM:")
print(classification_report(y_true, svm_pred))

print("Z-Score Method:")
print(classification_report(y_true, z_pred))
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest
from sklearn.svm import OneClassSVM
from sklearn.metrics import classification_report
from sklearn.preprocessing import StandardScaler

np.random.seed(42)

X_normal = np.random.randn(400, 2) * 0.5 + [2, 2]
X_anomalies = np.random.uniform(low=-4, high=8, size=(50, 2))
X = np.vstack([X_normal, X_anomalies])
y_true = np.array([1] * 400 + [-1] * 50)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Isolation Forest
iso_forest = IsolationForest(contamination=0.1, random_state=42)
iso_pred = iso_forest.fit_predict(X_scaled)

# One-Class SVM
oc_svm = OneClassSVM(kernel='rbf', gamma='scale', nu=0.1)
svm_pred = oc_svm.fit_predict(X_scaled)

# Z-score method
z_scores = np.abs((X_scaled - X_scaled.mean(axis=0)) / X_scaled.std(axis=0))
z_pred = np.where(z_scores.max(axis=1) > 3, -1, 1)

print("Isolation Forest:")
print(classification_report(y_true, iso_pred))

print("\\nOne-Class SVM:")
print(classification_report(y_true, svm_pred))

print("\\nZ-Score Method:")
print(classification_report(y_true, z_pred))

# Visualize results
fig, axes = plt.subplots(1, 3, figsize=(18, 5))
for ax, pred, title in zip(axes, [iso_pred, svm_pred, z_pred],
                           ['Isolation Forest', 'One-Class SVM', 'Z-Score']):
    colors = ['red' if p == -1 else 'blue' for p in pred]
    ax.scatter(X_scaled[:, 0], X_scaled[:, 1], c=colors, alpha=0.5, s=15)
    ax.set_title(title)
    ax.set_xlabel('Feature 1')
    ax.set_ylabel('Feature 2')
plt.tight_layout()
plt.show()
`,
      code: `import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.svm import OneClassSVM
from sklearn.metrics import classification_report
from sklearn.preprocessing import StandardScaler

np.random.seed(42)

X_normal = np.random.randn(400, 2) * 0.5 + [2, 2]
X_anomalies = np.random.uniform(low=-4, high=8, size=(50, 2))
X = np.vstack([X_normal, X_anomalies])
y_true = np.array([1] * 400 + [-1] * 50)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

iso_pred = IsolationForest(contamination=0.1, random_state=42).fit_predict(X_scaled)
svm_pred = OneClassSVM(kernel='rbf', gamma='scale', nu=0.1).fit_predict(X_scaled)
z_scores = np.abs((X_scaled - X_scaled.mean(axis=0)) / X_scaled.std(axis=0))
z_pred = np.where(z_scores.max(axis=1) > 3, -1, 1)

for name, pred in [('Isolation Forest', iso_pred), ('One-Class SVM', svm_pred), ('Z-Score', z_pred)]:
    print(f"\\n{name}:")
    print(classification_report(y_true, pred))
`
    },
    {
      title: 'Time Series Basics',
      description: `
## Time Series Basics

### Overview
Time series data is sequential data indexed by time. Understanding its components and basic forecasting methods is essential for many real-world ML applications.

### Key Concepts

**Time Series Components**:
- Trend: Long-term increase or decrease
- Seasonality: Repeating patterns at fixed intervals
- Noise: Random, unpredictable fluctuations
- Cyclical: Long-term oscillations without fixed period

**Stationarity**:
- Mean and variance are constant over time
- No trend or seasonality
- Required for many forecasting models
- Augmented Dickey-Fuller (ADF) test to check stationarity

**Making Data Stationary**:
- Differencing: Subtract previous value
- Log transformation: Reduce variance
- Seasonal differencing: Remove seasonal patterns

**Simple Forecasting Methods**:
- Moving Average: Average of last n values
- Exponential Smoothing: Weighted average with decay
- ARIMA: Auto-Regressive Integrated Moving Average

### Problem Statement
1. Decompose a time series into components
2. Test for stationarity
3. Apply moving average smoothing
4. Build a simple ARIMA forecast
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

np.random.seed(42)

# Generate synthetic time series with trend + seasonality + noise
time = np.arange(0, 365)
trend = 0.05 * time
seasonality = 10 * np.sin(2 * np.pi * time / 30)
noise = np.random.randn(365) * 2
series = trend + seasonality + noise + 50

ts = pd.Series(series, index=pd.date_range('2024-01-01', periods=365, freq='D'))

# TODO: Decompose time series
decomposition = seasonal_decompose(ts, model='additive', period=30)


# TODO: Test stationarity (ADF test)
adf_result = adfuller(ts)
print(f"ADF Statistic: {adf_result[0]:.4f}")
print(f"p-value: {adf_result[1]:.4f}")

# TODO: Apply differencing to make stationary
ts_diff = ts.diff().dropna()


# TODO: Moving average
ts_ma = ts.rolling(window=7).mean()


# TODO: Fit ARIMA model
train = ts[:300]
test = ts[300:]

model = ARIMA(train, order=(2, 1, 2))


print(f"ARIMA RMSE: {rmse:.3f}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

np.random.seed(42)

time = np.arange(0, 365)
trend = 0.05 * time
seasonality = 10 * np.sin(2 * np.pi * time / 30)
noise = np.random.randn(365) * 2
series = trend + seasonality + noise + 50

ts = pd.Series(series, index=pd.date_range('2024-01-01', periods=365, freq='D'))

# Decompose
decomposition = seasonal_decompose(ts, model='additive', period=30)
fig = decomposition.plot()
fig.set_size_inches(12, 8)
plt.tight_layout()
plt.show()

# Stationarity test
adf_result = adfuller(ts)
print(f"ADF Statistic: {adf_result[0]:.4f}")
print(f"p-value: {adf_result[1]:.4f}")
print(f"Stationary: {'Yes' if adf_result[1] < 0.05 else 'No'}")

# Differencing
ts_diff = ts.diff().dropna()
adf_diff = adfuller(ts_diff)
print(f"\\nAfter differencing - p-value: {adf_diff[1]:.4f}")
print(f"Stationary: {'Yes' if adf_diff[1] < 0.05 else 'No'}")

# Moving average
ts_ma_7 = ts.rolling(window=7).mean()
ts_ma_30 = ts.rolling(window=30).mean()

plt.figure(figsize=(12, 6))
plt.plot(ts, alpha=0.5, label='Original')
plt.plot(ts_ma_7, label='7-day MA')
plt.plot(ts_ma_30, label='30-day MA')
plt.legend()
plt.title('Moving Average Smoothing')
plt.show()

# ARIMA forecast
train = ts[:300]
test = ts[300:]

model = ARIMA(train, order=(2, 1, 2))
model_fit = model.fit()
forecast = model_fit.forecast(steps=len(test))

rmse = np.sqrt(np.mean((test.values - forecast.values) ** 2))
print(f"\\nARIMA RMSE: {rmse:.3f}")

plt.figure(figsize=(12, 6))
plt.plot(train, label='Train')
plt.plot(test, label='Test')
plt.plot(test.index, forecast, label='Forecast', color='red', linestyle='--')
plt.legend()
plt.title('ARIMA Forecast')
plt.show()
`,
      code: `import numpy as np
import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA

np.random.seed(42)

time = np.arange(0, 365)
series = 0.05 * time + 10 * np.sin(2 * np.pi * time / 30) + np.random.randn(365) * 2 + 50
ts = pd.Series(series, index=pd.date_range('2024-01-01', periods=365, freq='D'))

# Stationarity test
adf = adfuller(ts)
print(f"ADF Statistic: {adf[0]:.4f}, p-value: {adf[1]:.4f}")
print(f"Stationary: {'Yes' if adf[1] < 0.05 else 'No'}")

# After differencing
adf_diff = adfuller(ts.diff().dropna())
print(f"After diff - p-value: {adf_diff[1]:.4f}, Stationary: {'Yes' if adf_diff[1] < 0.05 else 'No'}")

# ARIMA forecast
train, test = ts[:300], ts[300:]
model = ARIMA(train, order=(2, 1, 2))
forecast = model.fit().forecast(steps=len(test))
rmse = np.sqrt(np.mean((test.values - forecast.values) ** 2))
print(f"\\nARIMA RMSE: {rmse:.3f}")
`
    },
    {
      title: 'Recommendation Systems',
      description: `
## Recommendation Systems

### Overview
Recommendation systems predict user preferences and suggest items. They power suggestions on platforms like Netflix, Amazon, and Spotify.

### Key Concepts

**Collaborative Filtering**:
- User-based: Find similar users, recommend what they liked
- Item-based: Find similar items to what user liked
- Based on user-item interaction matrix

**Content-Based Filtering**:
- Uses item features (genre, description, etc.)
- Builds user profile from liked items
- Recommends items similar to user's preferences

**Similarity Metrics**:
- Cosine Similarity: Angle between vectors (most common)
- Pearson Correlation: Linear correlation between ratings
- Euclidean Distance: Straight-line distance

**Matrix Factorization**:
- Decompose user-item matrix into latent factors
- SVD-based approaches
- Handle sparsity in ratings data

**Cold Start Problem**:
- New users: No interaction history
- New items: No ratings yet
- Solutions: Content-based, demographic, hybrid approaches

### Problem Statement
1. Build user-item interaction matrix
2. Implement collaborative filtering with cosine similarity
3. Create content-based recommendations
4. Compare approaches
`,
      starterCode: `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD

np.random.seed(42)

# Simulated user-item ratings matrix (0 = not rated)
# Rows: Users, Columns: Movies
movie_names = ['Action1', 'Action2', 'Comedy1', 'Comedy2', 'Drama1', 'Drama2', 'SciFi1', 'SciFi2']
ratings = np.array([
    [5, 4, 1, 0, 2, 0, 5, 4],  # User 0: Likes Action/SciFi
    [4, 5, 2, 1, 0, 1, 4, 5],  # User 1: Likes Action/SciFi
    [1, 0, 5, 4, 3, 4, 0, 1],  # User 2: Likes Comedy/Drama
    [0, 1, 4, 5, 4, 5, 1, 0],  # User 3: Likes Comedy/Drama
    [5, 4, 0, 0, 0, 0, 4, 5],  # User 4: Likes Action/SciFi
    [3, 2, 3, 3, 3, 3, 3, 2],  # User 5: Mixed preferences
])

# TODO: Compute user-user similarity
user_similarity = cosine_similarity(ratings)
print("User-User Similarity Matrix:")
print(user_similarity.round(3))

# TODO: Recommend movies for a target user
target_user = 0

# Find most similar users
similar_users = np.argsort(user_similarity[target_user])[::-1][1:3]  # Top 2 similar


# TODO: Predict ratings for unrated movies
unrated_movies = np.where(ratings[target_user] == 0)[0]


# TODO: SVD-based matrix factorization
svd = TruncatedSVD(n_components=3, random_state=42)


print(f"\\nRecommendations for User {target_user}: {recommended_movies}")
`,
      solution: `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD

np.random.seed(42)

movie_names = ['Action1', 'Action2', 'Comedy1', 'Comedy2', 'Drama1', 'Drama2', 'SciFi1', 'SciFi2']
ratings = np.array([
    [5, 4, 1, 0, 2, 0, 5, 4],
    [4, 5, 2, 1, 0, 1, 4, 5],
    [1, 0, 5, 4, 3, 4, 0, 1],
    [0, 1, 4, 5, 4, 5, 1, 0],
    [5, 4, 0, 0, 0, 0, 4, 5],
    [3, 2, 3, 3, 3, 3, 3, 2],
])

# User-user similarity
user_similarity = cosine_similarity(ratings)
print("User-User Similarity Matrix:")
for i in range(len(ratings)):
    print(f"User {i}: {user_similarity[i].round(3)}")

# Collaborative filtering for target user
target_user = 0
similar_users = np.argsort(user_similarity[target_user])[::-1][1:3]
print(f"\\nMost similar to User {target_user}: Users {similar_users}")

# Predict ratings for unrated movies
unrated_movies = np.where(ratings[target_user] == 0)[0]
predicted_ratings = {}

for movie in unrated_movies:
    sim_scores = user_similarity[target_user, similar_users]
    movie_ratings = ratings[similar_users, movie]
    
    # Weighted average (only from users who rated)
    rated_mask = movie_ratings > 0
    if rated_mask.any():
        pred = np.average(movie_ratings[rated_mask], weights=sim_scores[rated_mask])
        predicted_ratings[movie_names[movie]] = round(pred, 2)

print(f"\\nPredicted ratings for User {target_user}:")
for movie, rating in sorted(predicted_ratings.items(), key=lambda x: x[1], reverse=True):
    print(f"  {movie}: {rating}")

recommended_movies = sorted(predicted_ratings, key=predicted_ratings.get, reverse=True)[:3]
print(f"\\nTop recommendations: {recommended_movies}")

# SVD-based matrix factorization
svd = TruncatedSVD(n_components=3, random_state=42)
user_factors = svd.fit_transform(ratings)
item_factors = svd.components_.T

# Reconstruct ratings
reconstructed = user_factors @ svd.components_
print(f"\\nSVD Reconstructed ratings for User {target_user}:")
for i, movie in enumerate(movie_names):
    orig = ratings[target_user, i]
    recon = reconstructed[target_user, i]
    flag = " (unrated - predicted)" if orig == 0 else ""
    print(f"  {movie}: original={orig}, predicted={recon:.2f}{flag}")
`,
      code: `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD

np.random.seed(42)

movie_names = ['Action1', 'Action2', 'Comedy1', 'Comedy2', 'Drama1', 'Drama2', 'SciFi1', 'SciFi2']
ratings = np.array([
    [5, 4, 1, 0, 2, 0, 5, 4],
    [4, 5, 2, 1, 0, 1, 4, 5],
    [1, 0, 5, 4, 3, 4, 0, 1],
    [0, 1, 4, 5, 4, 5, 1, 0],
    [5, 4, 0, 0, 0, 0, 4, 5],
    [3, 2, 3, 3, 3, 3, 3, 2],
])

user_sim = cosine_similarity(ratings)
target = 0
similar = np.argsort(user_sim[target])[::-1][1:3]

unrated = np.where(ratings[target] == 0)[0]
preds = {}
for m in unrated:
    sims = user_sim[target, similar]
    r = ratings[similar, m]
    mask = r > 0
    if mask.any():
        preds[movie_names[m]] = round(np.average(r[mask], weights=sims[mask]), 2)

print(f"Recommendations for User {target}:")
for movie, rating in sorted(preds.items(), key=lambda x: x[1], reverse=True):
    print(f"  {movie}: {rating}")

svd = TruncatedSVD(n_components=3, random_state=42)
recon = svd.fit_transform(ratings) @ svd.components_
print(f"\\nSVD predictions for unrated movies:")
for m in unrated:
    print(f"  {movie_names[m]}: {recon[target, m]:.2f}")
`
    }
  ]
};
