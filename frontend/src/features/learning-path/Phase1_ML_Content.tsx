// Phase 1: Introduction to Machine Learning - Complete Curriculum
// This file contains all 10 ML modules to be integrated into LearningPath.tsx

export const phase1MLContent = {
  id: 3,
  title: 'Phase 3: Introduction to Machine Learning',
  topics: [
    'What is Machine Learning?',
    'Data Exploration & Visualization',
    'Linear Regression',
    'Classification with kNN',
    'Decision Trees & Random Forests',
    'Model Evaluation',
    'Clustering',
    'Neural Networks',
    'Natural Language Processing',
    'Final Project',
    'Data Preprocessing Pipelines',
    'Feature Scaling & Normalization',
    'Train/Test/Validation Splits',
    'Overfitting vs Underfitting'
  ],
  lessons: [
    // Module 1: What is Machine Learning?
    {
      title: 'Module 1: What is Machine Learning? – The Debut Stage',
      description: `
## What is Machine Learning?

### Learning Objectives
- Understand what Machine Learning is and how it differs from traditional programming
- Learn the three main types of ML: Supervised, Unsupervised, and Reinforcement Learning
- Understand the ML workflow: Data → Model → Prediction
- Set up your Python environment for ML

### What is Machine Learning?

Imagine teaching a child to recognize cats. You don't give them a rulebook ("if it has pointy ears and whiskers, it's a cat"). Instead, you show them many pictures of cats and dogs, and they figure out the patterns themselves. That's exactly how Machine Learning works!

**Traditional Programming:** Rules + Data → Answers  
**Machine Learning:** Data + Answers → Rules (the model learns the rules from examples)

### Three Types of Machine Learning

**1. Supervised Learning** – Learning with a teacher
- You have **labeled data** (input-output pairs)
- The model learns to map inputs to outputs
- **Examples:**
  - Predicting cricket scores based on past matches
  - Classifying emails as spam or not spam
- **Two main types:**
  - **Regression**: Predicting a continuous value (e.g., tomorrow's temperature)
  - **Classification**: Predicting a category (e.g., will Team A win? yes/no)

**2. Unsupervised Learning** – Learning without a teacher
- You have **unlabeled data** (only inputs, no outputs)
- The model finds hidden patterns or groups
- **Examples:**
  - Grouping customers by purchasing behavior
  - Finding similar songs in your playlist
- **Main types:**
  - **Clustering**: Grouping similar items together
  - **Dimensionality Reduction**: Simplifying data while keeping important information

**3. Reinforcement Learning** – Learning by trial and error
- An **agent** learns by interacting with an **environment**
- Gets **rewards** for good actions, **penalties** for bad ones
- **Examples:**
  - AI learning to play chess or video games
  - Robot learning to walk

### The ML Workflow
1. **Collect Data**: Gather relevant data
2. **Prepare Data**: Clean, handle missing values, format correctly
3. **Choose a Model**: Select an algorithm based on your problem
4. **Train the Model**: Feed data to let it learn patterns
5. **Evaluate**: Test how well it performs on new data
6. **Tune**: Adjust parameters to improve performance
7. **Predict**: Use the model on new, unseen data

### Key Takeaway
Machine Learning is about finding patterns in data to make predictions or discoveries. Just like BTS finds patterns in music that fans love, ML finds patterns in data that help us make decisions!
      `,
      code: `import pandas as pd
import numpy as np

# Create a small dataset of K-pop songs
songs_data = {
    'song_name': ['Dynamite', 'Butter', 'Permission to Dance', 
                  'Boy With Luv', 'Spring Day', 'IDOL'],
    'artist': ['BTS', 'BTS', 'BTS', 'BTS', 'BTS', 'BTS'],
    'release_year': [2020, 2021, 2021, 2019, 2017, 2018],
    'youtube_views_millions': [1800, 1600, 1100, 1500, 500, 800],
    'danceability': [0.8, 0.9, 0.7, 0.8, 0.5, 0.9],
    'energy': [0.9, 0.9, 0.8, 0.8, 0.4, 0.9],
    'was_debut': [0, 0, 0, 0, 0, 0]  # None were debut songs
}

# Convert to DataFrame
df = pd.DataFrame(songs_data)
print("🎵 BTS Song Data:")
print(df)

print("\\n🔮 In Machine Learning, we would:")
print("1. Collect many songs (features) with labels (debut or not)")
print("2. Train a model to find patterns")
print("3. Predict for new songs whether they have 'debut potential'")

# Simple statistics
print(f"\\n📊 Average YouTube views: {df['youtube_views_millions'].mean():.0f}M")
print(f"Average danceability: {df['danceability'].mean():.2f}")
print(f"Average energy: {df['energy'].mean():.2f}")

print("\\n✅ All libraries imported successfully!")
print("You're ready to start your ML journey!")
`
    },
    
    // Module 2: Data Exploration
    {
      title: 'Module 2: Data Exploration & Visualization – Stranger Things Data',
      description: `
## Data Exploration & Visualization

### Learning Objectives
- Load and explore datasets using Pandas
- Understand data cleaning and preprocessing
- Create visualizations to understand patterns
- Master the art of "getting to know your data" before modeling

### Why Data Exploration?

Before building any ML model, you must understand your data. It's like Eleven exploring the Upside Down – you need to know what you're dealing with!

**Key questions to ask:**
- What does the data look like? (shape, columns, data types)
- Are there missing values?
- What are the distributions of features?
- Are there outliers?
- How do features relate to each other?

### Pandas for Data Exploration

**Common Operations:**
- \`df.shape\` – number of rows and columns
- \`df.columns\` – column names
- \`df.info()\` – data types, non-null counts
- \`df.describe()\` – statistical summary
- \`df.isnull().sum()\` – count missing values
- \`df['column'].value_counts()\` – frequency of values

### Visualization

**Matplotlib & Seaborn** help you see patterns:
- Histograms: Show distribution of values
- Scatter plots: Show relationships between variables
- Box plots: Show outliers and quartiles
- Heatmaps: Show correlations between features

### Key Takeaway
Data exploration is crucial! You can't build a good model without understanding your data first.
      `,
      code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

print("👻 Stranger Things Character Data Analysis")

# Create dataset of Stranger Things characters
stranger_data = {
    'character': ['Eleven', 'Mike', 'Dustin', 'Lucas', 'Will', 'Max', 
                  'Steve', 'Nancy', 'Jonathan', 'Joyce', 'Hopper'],
    'screen_time_s1': [120, 95, 85, 80, 70, 0, 60, 75, 70, 90, 100],
    'screen_time_s2': [110, 85, 90, 75, 60, 85, 95, 80, 65, 85, 95],
    'screen_time_s3': [115, 80, 95, 70, 40, 110, 120, 90, 60, 80, 85],
    'screen_time_s4': [130, 75, 100, 65, 55, 115, 130, 95, 55, 75, 70],
    'demogorgon_encounters': [5, 2, 3, 2, 4, 1, 4, 2, 2, 3, 4]
}

df = pd.DataFrame(stranger_data)
print("\\n📊 Dataset Info:")
print(df)

# Calculate total screen time
df['total_screen_time'] = (df['screen_time_s1'] + df['screen_time_s2'] + 
                            df['screen_time_s3'] + df['screen_time_s4'])

# Sort by total screen time
df_sorted = df.sort_values('total_screen_time', ascending=False)
print("\\n⭐ Characters by Total Screen Time:")
print(df_sorted[['character', 'total_screen_time']])

# Correlation analysis
correlation = df['total_screen_time'].corr(df['demogorgon_encounters'])
print(f"\\n🔍 Correlation between screen time and encounters: {correlation:.2f}")
print("This suggests characters with more screen time encounter more monsters!")

# Summary statistics
print("\\n📈 Summary Statistics:")
print(df[['screen_time_s1', 'screen_time_s2', 'screen_time_s3', 
          'screen_time_s4', 'demogorgon_encounters']].describe())

print("\\n✅ Data exploration complete!")
`
    },

    // Module 3: Linear Regression
    {
      title: 'Module 3: Linear Regression – Cricket Score Predictor',
      description: `
## Linear Regression

### Learning Objectives
- Understand the concept of regression
- Learn how linear regression works mathematically
- Implement linear regression with scikit-learn
- Evaluate regression models using metrics like MSE, R²

### What is Regression?

Regression predicts a **continuous value** (like a number) based on input features. Examples:
- Predicting cricket runs based on overs played and wickets lost
- Predicting house prices based on size, location, bedrooms
- Predicting temperature based on humidity, pressure

### Simple Linear Regression

The simplest form: one input feature (X) and one output (y). The relationship is modeled as a straight line:

**y = mx + b**

Where:
- **m** = slope (how much y changes when x changes by 1)
- **b** = intercept (value of y when x=0)

The algorithm finds the best line that minimizes the error between predicted and actual values.

### Evaluating Regression Models

**Mean Squared Error (MSE):** Average of squared errors. Lower is better.

**Root Mean Squared Error (RMSE):** Square root of MSE – gives error in same units as target.

**R² Score (Coefficient of Determination):** 
- Ranges from 0 to 1 (can be negative for terrible models)
- 1 means perfect prediction
- 0 means model just predicts the mean
- Represents proportion of variance explained by the model

### Key Takeaway
Linear regression is simple but powerful for understanding relationships between variables!
      `,
      code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

print("🏏 IPL Score Predictor – Linear Regression Edition")

# Create synthetic IPL match data
np.random.seed(42)
n_samples = 200

overs_completed = np.random.uniform(5, 20, n_samples)
wickets_lost = np.random.randint(0, 10, n_samples)
run_rate = np.random.normal(8, 2, n_samples)

# Calculate final score with realistic relationship
current_runs = overs_completed * run_rate
projected_runs = ((20 - overs_completed) * (run_rate * (1 - wickets_lost/20)) + 
                  np.random.normal(0, 15, n_samples))
final_score = np.maximum(current_runs + projected_runs, 0).astype(int)

# Create DataFrame
cricket_data = pd.DataFrame({
    'overs': overs_completed,
    'wickets': wickets_lost,
    'current_run_rate': run_rate,
    'final_score': final_score
})

print(f"\\n📊 Dataset: {len(cricket_data)} matches")
print(cricket_data.head())

# Prepare features and target
features = ['overs', 'wickets', 'current_run_rate']
X = cricket_data[features]
y = cricket_data['final_score']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print("\\n📈 Model Performance:")
print(f"R² Score: {r2:.3f}")
print(f"RMSE: {rmse:.1f} runs")

print("\\n📊 Feature Coefficients:")
for feature, coef in zip(features, model.coef_):
    print(f"{feature}: {coef:.2f}")
print(f"Intercept: {model.intercept_:.2f}")

# Example prediction
new_match = pd.DataFrame({
    'overs': [10],
    'wickets': [3],
    'current_run_rate': [8.5]
})
predicted_score = model.predict(new_match)[0]
print(f"\\n🔮 Prediction: If a team is 10 overs in with 3 wickets lost")
print(f"   and run rate of 8.5, predicted final score: {predicted_score:.0f}")

print("\\n✅ Linear regression model trained successfully!")
`
    },

    // Module 4: Classification with kNN
    {
      title: 'Module 4: Classification with k-Nearest Neighbors – Taylor Swift Song Classifier',
      description: `
## Classification with k-Nearest Neighbors

### Learning Objectives
- Understand classification problems
- Learn the k-Nearest Neighbors algorithm
- Implement kNN with scikit-learn
- Evaluate classification models using accuracy, precision, recall, F1-score
- Understand the importance of feature scaling

### What is Classification?

Classification predicts a **category** or **class** label. Examples:
- Is an email spam or not? (binary classification)
- Which genre does a song belong to? (multi-class classification)
- Will a cricket team win or lose? (binary classification)

### k-Nearest Neighbors (kNN) Algorithm

kNN is one of the simplest ML algorithms. It works like this:

1. **Store all training examples** with their labels
2. **To classify a new point:**
   - Calculate distance to all training points
   - Find the k closest points (neighbors)
   - Take a majority vote of their labels

**Analogy:** If you want to know what kind of music someone likes, look at their k closest friends – whatever music they like, this person probably likes too!

### Choosing k
- **Small k** (e.g., k=1): Sensitive to noise, may overfit
- **Large k**: Smoother decision boundary, may underfit
- Usually choose odd number to avoid ties
- Find optimal k through cross-validation

### Feature Scaling

kNN uses distances, so features with larger scales dominate! Always scale features to similar ranges:
- **Standardization**: (x - mean) / std → mean=0, std=1
- **Normalization**: (x - min) / (max - min) → range [0,1]

### Evaluation Metrics

- **Accuracy**: (TP + TN) / Total – Overall correctness
- **Precision**: TP / (TP + FP) – "When we predict positive, how often are we right?"
- **Recall**: TP / (TP + FN) – "Of all actual positives, how many did we catch?"
- **F1-Score**: Harmonic mean of precision and recall

### Key Takeaway
kNN is simple and intuitive, but remember to scale your features!
      `,
      code: `import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report, accuracy_score

print("🎵 Taylor Swift Song Era Classifier – kNN Edition")

# Create synthetic Taylor Swift song data
np.random.seed(42)
n_songs = 150

eras = ['Debut', 'Fearless', 'Speak Now', 'Red', '1989', 
        'Reputation', 'Lover', 'Folklore', 'Evermore', 'Midnights']

songs_data = {
    'danceability': np.random.uniform(0.3, 0.9, n_songs),
    'energy': np.random.uniform(0.2, 0.9, n_songs),
    'valence': np.random.uniform(0.2, 0.8, n_songs),
    'acousticness': np.random.uniform(0, 0.8, n_songs),
    'tempo': np.random.uniform(70, 180, n_songs),
    'era': np.random.choice(eras, n_songs)
}

df = pd.DataFrame(songs_data)
print(f"\\n📊 Dataset: {len(df)} songs from {len(eras)} eras")

# Encode era as numbers
le = LabelEncoder()
df['era_encoded'] = le.fit_transform(df['era'])

# Prepare features
features = ['danceability', 'energy', 'valence', 'acousticness', 'tempo']
X = df[features]
y = df['era_encoded']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

# Scale features (crucial for kNN!)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Find best k using cross-validation
k_values = range(1, 21)
cv_scores = []

for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k)
    scores = cross_val_score(knn, X_train_scaled, y_train, cv=5, scoring='accuracy')
    cv_scores.append(scores.mean())

best_k = k_values[np.argmax(cv_scores)]
print(f"\\n✅ Best k value: {best_k} with accuracy {max(cv_scores):.3f}")

# Train final model with best k
knn_best = KNeighborsClassifier(n_neighbors=best_k)
knn_best.fit(X_train_scaled, y_train)

# Predict on test set
y_pred = knn_best.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)

print(f"\\n📈 Test Set Accuracy: {accuracy:.3f}")

# Try a new song prediction
new_song = pd.DataFrame({
    'danceability': [0.75],
    'energy': [0.8],
    'valence': [0.6],
    'acousticness': [0.2],
    'tempo': [120]
})

new_song_scaled = scaler.transform(new_song)
predicted_era_num = knn_best.predict(new_song_scaled)[0]
predicted_era = le.inverse_transform([predicted_era_num])[0]

print(f"\\n🔮 New song prediction:")
print(f"   Features: Danceability=0.75, Energy=0.8, Valence=0.6")
print(f"   Predicted Era: {predicted_era}")

print("\\n✅ kNN classifier trained successfully!")
`
    },

    // Module 5: Decision Trees
    {
      title: 'Module 5: Decision Trees and Random Forests – Squid Game Survival Predictor',
      description: `
## Decision Trees and Random Forests

### Learning Objectives
- Understand how decision trees make decisions
- Learn about entropy and information gain
- Implement decision trees and random forests
- Understand ensemble methods
- Handle overfitting with pruning and random forests

### Decision Trees

A decision tree is like a flowchart of questions that leads to a decision. Each node asks a question about a feature, and each branch represents an answer, leading to further questions or a final prediction.

**Analogy:** Think of it like the Squid Game – at each stage, players face a decision that determines their path. The tree asks: "Is the player good at Dalgona?" → "Did they play the marble game well?" → "Did they survive?"

### How Trees Are Built

The algorithm finds the best feature to split on at each node by measuring **impurity**:

**Gini Impurity:** Measures how often a randomly chosen element would be misclassified.
- Gini = 0 when all items in a node are the same class
- Gini = 0.5 for a 50-50 split (maximum impurity)

**Information Gain:** The reduction in impurity after a split. The algorithm chooses the split that maximizes information gain.

### Random Forests

A single decision tree can overfit (memorize the training data). Random Forest solves this by:

1. **Bagging**: Train many trees on random subsets of the data
2. **Feature Randomness**: Each split considers only a random subset of features
3. **Voting**: All trees vote, and the majority wins

This creates an **ensemble** that's more robust and less prone to overfitting.

### Feature Importance

Random forests can tell us which features were most important in making decisions – a huge advantage!

### Key Takeaway
Decision trees are interpretable, and random forests are powerful ensemble methods that reduce overfitting!
      `,
      code: `import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder

print("🎮 Squid Game Survival Predictor – Decision Trees & Random Forests")

# Create synthetic Squid Game player data
np.random.seed(42)
n_players = 300

players_data = {
    'age': np.random.randint(20, 70, n_players),
    'physical_strength': np.random.randint(1, 10, n_players),
    'intelligence': np.random.randint(1, 10, n_players),
    'teamwork_skill': np.random.randint(1, 10, n_players),
    'luck_factor': np.random.randint(1, 10, n_players),
    'red_light_performance': np.random.randint(1, 10, n_players),
    'marbles_performance': np.random.randint(1, 10, n_players)
}

# Create survival outcome based on features
survival_score = (
    players_data['physical_strength'] * 0.2 +
    players_data['intelligence'] * 0.3 +
    players_data['teamwork_skill'] * 0.2 +
    players_data['luck_factor'] * 0.3 -
    np.array(players_data['age']) * 0.05 +
    np.random.normal(0, 1, n_players)
)

threshold = np.percentile(survival_score, 70)
players_data['survived'] = (survival_score > threshold).astype(int)

df = pd.DataFrame(players_data)
print(f"\\n📊 Dataset: {len(df)} players")
print(f"Survival rate: {df['survived'].mean()*100:.1f}%")

# Prepare features
feature_cols = ['age', 'physical_strength', 'intelligence', 
                'teamwork_skill', 'luck_factor', 
                'red_light_performance', 'marbles_performance']
X = df[feature_cols]
y = df['survived']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

# Train Decision Tree with different depths
depths = [3, 5, 10, None]
for depth in depths:
    depth_name = 'unlimited' if depth is None else depth
    dt = DecisionTreeClassifier(max_depth=depth, random_state=42)
    dt.fit(X_train, y_train)
    train_acc = dt.score(X_train, y_train)
    test_acc = dt.score(X_test, y_test)
    print(f"\\nDecision Tree (max_depth={depth_name}):")
    print(f"  Training accuracy: {train_acc:.3f}")
    print(f"  Test accuracy: {test_acc:.3f}")
    print(f"  Overfitting: {'Yes' if train_acc - test_acc > 0.1 else 'No'}")

# Random Forest
print("\\n🌲 Training Random Forest...")
rf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf.fit(X_train, y_train)

rf_train_acc = rf.score(X_train, y_train)
rf_test_acc = rf.score(X_test, y_test)

print(f"Random Forest:")
print(f"  Training accuracy: {rf_train_acc:.3f}")
print(f"  Test accuracy: {rf_test_acc:.3f}")

# Feature importance
importances = rf.feature_importances_
feature_importance_df = pd.DataFrame({
    'feature': feature_cols,
    'importance': importances
}).sort_values('importance', ascending=False)

print("\\n🔍 Top 5 Most Important Features:")
for _, row in feature_importance_df.head(5).iterrows():
    print(f"   {row['feature']}: {row['importance']:.3f}")

# New player prediction
new_player = pd.DataFrame({
    'age': [35],
    'physical_strength': [7],
    'intelligence': [6],
    'teamwork_skill': [8],
    'luck_factor': [5],
    'red_light_performance': [8],
    'marbles_performance': [5]
})

prediction = rf.predict(new_player)[0]
probability = rf.predict_proba(new_player)[0]

print(f"\\n🔮 New Player Analysis:")
print(f"   Survival Prediction: {'SURVIVES' if prediction == 1 else 'DIES'}")
print(f"   Probability of survival: {probability[1]:.1%}")

print("\\n✅ Random Forest model trained successfully!")
`
    },

    // Module 6: Model Evaluation
    {
      title: 'Module 6: Model Evaluation & Selection – Cricket World Cup Predictor',
      description: `
## Model Evaluation & Selection

### Learning Objectives
- Understand the importance of proper model evaluation
- Learn cross-validation techniques
- Master hyperparameter tuning
- Understand bias-variance tradeoff
- Compare multiple models

### Why Proper Evaluation?

Building a model is easy. Building a model that **generalizes** to new data is hard. Common mistakes:
- Evaluating on the same data you trained on (overfitting)
- Not using a proper test set
- Not understanding your evaluation metrics

### Train/Validation/Test Split

- **Training set**: Used to train the model (usually 60-70%)
- **Validation set**: Used to tune hyperparameters (15-20%)
- **Test set**: Used only once at the end to evaluate final model (15-20%)

### Cross-Validation

Instead of a single validation set, we can use k-fold cross-validation:
1. Split data into k folds
2. Train on k-1 folds, validate on remaining fold
3. Repeat k times, each time with a different validation fold
4. Average the results

This gives a more robust estimate of model performance.

### Bias-Variance Tradeoff

- **Bias**: Error from wrong assumptions (model too simple → underfitting)
- **Variance**: Error from sensitivity to training data (model too complex → overfitting)
- **Tradeoff**: As model complexity increases, bias decreases but variance increases

### Hyperparameter Tuning

Hyperparameters are settings we choose before training (e.g., k in kNN, max_depth in trees). We find optimal values through:
- **Grid Search**: Try all combinations of specified parameters
- **Random Search**: Try random combinations
- **Bayesian Optimization**: Smart search based on previous results

### Key Takeaway
Always use proper evaluation techniques to ensure your model will work on new, unseen data!
      `,
      code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

print("🏏 Cricket World Cup Predictor – Model Showdown")

# Create synthetic cricket match data
np.random.seed(42)
n_matches = 500

teams = ['India', 'Australia', 'England', 'New Zealand', 'South Africa']

match_data = {
    'team1_ranking': np.random.randint(1, 11, n_matches),
    'team2_ranking': np.random.randint(1, 11, n_matches),
    'team1_recent_form': np.random.uniform(0, 1, n_matches),
    'team2_recent_form': np.random.uniform(0, 1, n_matches),
    'team1_head2head_advantage': np.random.uniform(-1, 1, n_matches),
    'toss_winner': np.random.choice([0, 1], n_matches),
    'venue': np.random.choice([0, 1, 2], n_matches)  # Home, Away, Neutral
}

# Create outcome
win_probability = (
    0.3 * (np.array(match_data['team1_ranking']) < np.array(match_data['team2_ranking'])).astype(int) +
    0.2 * np.array(match_data['team1_recent_form']) +
    0.2 * np.array(match_data['team1_head2head_advantage']) +
    0.1 * (np.array(match_data['toss_winner']) == 0).astype(int) +
    0.2 * np.random.random(n_matches)
)

win_probability = (win_probability - win_probability.min()) / (win_probability.max() - win_probability.min())
match_data['team1_wins'] = (win_probability > 0.5).astype(int)

df = pd.DataFrame(match_data)
print(f"\\n📊 Dataset: {len(df)} matches")
print(f"Team1 win rate: {df['team1_wins'].mean()*100:.1f}%")

# Prepare features
feature_cols = ['team1_ranking', 'team2_ranking', 'team1_recent_form', 
                'team2_recent_form', 'team1_head2head_advantage', 
                'toss_winner', 'venue']
X = df[feature_cols]
y = df['team1_wins']

# Split data
X_train_val, X_test, y_train_val, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features
scaler = StandardScaler()
X_train_val_scaled = scaler.fit_transform(X_train_val)
X_test_scaled = scaler.transform(X_test)

# Compare models using cross-validation
models = {
    'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
    'kNN': KNeighborsClassifier(),
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'Random Forest': RandomForestClassifier(random_state=42)
}

print("\\n📊 Model Comparison (5-Fold Cross-Validation):")
results = {}

for name, model in models.items():
    if name in ['Logistic Regression', 'kNN']:
        X_use = X_train_val_scaled
    else:
        X_use = X_train_val
    
    cv_scores = cross_val_score(model, X_use, y_train_val, cv=5, scoring='accuracy')
    results[name] = cv_scores.mean()
    print(f"{name}: {cv_scores.mean():.3f} (+/- {cv_scores.std()*2:.3f})")

# Hyperparameter tuning for best model (Random Forest)
print("\\n🔧 Hyperparameter Tuning for Random Forest...")

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, None],
    'min_samples_split': [2, 5, 10]
}

rf = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid_search.fit(X_train_val, y_train_val)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV accuracy: {grid_search.best_score_:.3f}")

# Evaluate on test set
best_rf = grid_search.best_estimator_
y_test_pred = best_rf.predict(X_test)
test_accuracy = accuracy_score(y_test, y_test_pred)

print(f"\\n✅ Test Set Accuracy (Best Random Forest): {test_accuracy:.3f}")

# Make prediction for upcoming match
upcoming_match = pd.DataFrame({
    'team1_ranking': [2],
    'team2_ranking': [5],
    'team1_recent_form': [0.8],
    'team2_recent_form': [0.6],
    'team1_head2head_advantage': [0.3],
    'toss_winner': [0],
    'venue': [0]
})

pred_prob = best_rf.predict_proba(upcoming_match)[0][1]
pred_class = best_rf.predict(upcoming_match)[0]

print(f"\\n🔮 Upcoming Match: India vs Australia")
print(f"   Prediction: {'INDIA WINS' if pred_class == 1 else 'AUSTRALIA WINS'}")
print(f"   Probability: {pred_prob:.1%}")

print("\\n✅ Model evaluation and selection complete!")
`
    },

    // Continue with remaining modules in next part...

    // Module 7: Clustering
    {
      title: 'Module 7: Clustering – K-pop Playlist Generator',
      description: `
## Clustering

### Learning Objectives
- Understand unsupervised learning and clustering
- Learn the k-means algorithm
- Determine optimal number of clusters
- Interpret clustering results
- Apply clustering to real-world problems

### What is Clustering?

Clustering groups similar items together without knowing the labels beforehand. It's like organizing your music playlist into genres without being told what the genres are – the algorithm finds natural groupings.

**Examples:**
- Customer segmentation for marketing
- Document clustering for topic discovery
- Image segmentation
- Anomaly detection (points that don't belong to any cluster)

### k-Means Clustering

The most popular clustering algorithm:

1. Choose k (number of clusters)
2. Randomly initialize k centroids (cluster centers)
3. **Assignment Step**: Assign each point to nearest centroid
4. **Update Step**: Move centroids to mean of assigned points
5. Repeat steps 3-4 until convergence (centroids stop moving)

**Analogy:** Think of centroids as group leaders. People join the nearest leader, then leaders move to the center of their group, and people re-join, until everyone is happy with their group.

### Choosing k (Elbow Method)

Plot inertia (sum of squared distances to nearest centroid) vs. k. Look for an "elbow" where adding more clusters doesn't reduce inertia much.

### Key Takeaway
Clustering helps discover hidden patterns in data without needing labeled examples!
      `,
      code: `import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

print("🎵 K-pop Song Clustering – Automatic Playlist Generator")

# Create synthetic K-pop song data
np.random.seed(42)
n_songs = 200

groups = ['BTS', 'BLACKPINK', 'TWICE', 'EXO', 'NewJeans']

song_data = {
    'song_id': range(n_songs),
    'group': np.random.choice(groups, n_songs),
    'danceability': np.random.uniform(0.4, 0.9, n_songs),
    'energy': np.random.uniform(0.3, 0.95, n_songs),
    'valence': np.random.uniform(0.2, 0.8, n_songs),
    'acousticness': np.random.uniform(0, 0.7, n_songs),
    'tempo': np.random.uniform(70, 180, n_songs)
}

df = pd.DataFrame(song_data)
print(f"\\n📊 Dataset: {len(df)} songs from {len(groups)} groups")

# Select features for clustering
feature_cols = ['danceability', 'energy', 'valence', 'acousticness', 'tempo']
X = df[feature_cols]

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Find optimal k using elbow method and silhouette score
inertias = []
silhouette_scores = []
K_range = range(2, 11)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = kmeans.fit_predict(X_scaled)
    inertias.append(kmeans.inertia_)
    silhouette_scores.append(silhouette_score(X_scaled, labels))

# Choose optimal k (let's say 4 based on silhouette score)
optimal_k = 4
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(X_scaled)

print(f"\\n✅ Clustered songs into {optimal_k} groups")

# Analyze cluster characteristics
cluster_summary = df.groupby('cluster')[feature_cols].mean()
print("\\n📊 Cluster Characteristics:")
print(cluster_summary)

# Name the clusters based on characteristics
cluster_names = {}
for i in range(optimal_k):
    cluster_features = cluster_summary.loc[i]
    
    if cluster_features['energy'] > 0.7 and cluster_features['danceability'] > 0.7:
        name = "🔥 High-Energy Bangers"
    elif cluster_features['acousticness'] > 0.4:
        name = "🎸 Acoustic/Vocals Focused"
    elif cluster_features['valence'] > 0.6:
        name = "😊 Happy & Upbeat"
    else:
        name = "🌙 Chill Vibes"
    
    cluster_names[i] = name

df['playlist_name'] = df['cluster'].map(cluster_names)

print("\\n🎯 Cluster Names:")
for cluster, name in cluster_names.items():
    count = len(df[df['cluster'] == cluster])
    print(f"  {name}: {count} songs")

# Create playlists
print("\\n🎧 Sample Playlists:")
for cluster in range(optimal_k):
    cluster_songs = df[df['cluster'] == cluster].head(3)
    print(f"\\n{cluster_names[cluster]}:")
    for _, song in cluster_songs.iterrows():
        print(f"  • {song['group']} - Song_{song['song_id']}")

# Recommend songs based on a favorite
favorite_song = df.iloc[42]
fav_cluster = favorite_song['cluster']

print(f"\\n🎤 Your favorite song (Song_{favorite_song['song_id']} by {favorite_song['group']})")
print(f"   is in the '{cluster_names[fav_cluster]}' cluster")

recommendations = df[(df['cluster'] == fav_cluster) & 
                     (df['song_id'] != favorite_song['song_id'])].head(5)
print("\\n🎵 Recommended songs:")
for _, song in recommendations.iterrows():
    print(f"  • {song['group']} - Song_{song['song_id']}")

print("\\n✅ Clustering complete! Playlists generated!")
`
    },

    // Module 8: Neural Networks
    {
      title: 'Module 8: Neural Networks & Deep Learning – Face Recognition with BTS',
      description: `
## Neural Networks & Deep Learning

### Learning Objectives
- Understand the basics of neural networks
- Learn about activation functions and layers
- Build simple neural networks with TensorFlow/Keras
- Understand convolutional neural networks (CNNs) for images
- Apply deep learning to real problems

### What are Neural Networks?

Neural networks are computing systems inspired by the human brain. They consist of interconnected nodes (neurons) organized in layers.

**Analogy:** Think of it like a K-pop audition process:
- **Input Layer**: Raw audition data (singing, dancing, visuals)
- **Hidden Layers**: Judges evaluating different aspects
- **Output Layer**: Final decision (debut or not)

### Basic Structure

- **Input Layer**: Receives the raw data
- **Hidden Layers**: Process information, extract patterns
- **Output Layer**: Produces final prediction

Each connection has a **weight** (importance), and each neuron has a **bias**. Learning means adjusting these weights and biases.

### Activation Functions

Activation functions introduce non-linearity, allowing networks to learn complex patterns:

- **ReLU (Rectified Linear Unit)**: f(x) = max(0, x) – most common for hidden layers
- **Sigmoid**: Squashes values to [0,1] – good for binary classification
- **Softmax**: Converts scores to probabilities – good for multi-class classification

### How Neural Networks Learn

1. **Forward Propagation**: Input flows through network to get prediction
2. **Loss Calculation**: Compare prediction to actual value
3. **Backward Propagation**: Calculate gradients of loss with respect to weights
4. **Weight Update**: Adjust weights to reduce loss (Gradient Descent)

### Deep Learning

"Deep" means many hidden layers. Deep networks can learn hierarchical features:
- First layers learn simple patterns (edges, colors)
- Middle layers learn parts (eyes, noses)
- Last layers learn complex concepts (faces)

### Key Takeaway
Neural networks are powerful for complex pattern recognition, especially with images, text, and audio!
      `,
      code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

print("🎤 BTS Member Classifier – Neural Networks Edition")
print("(Simplified version using scikit-learn)")

# Create synthetic data representing image features
np.random.seed(42)
n_images = 1000
n_features = 50

bts_members = ['RM', 'Jin', 'SUGA', 'j-hope', 'Jimin', 'V', 'Jung Kook']

# Generate features with patterns for each member
X = []
y = []

for i in range(n_images):
    member_idx = np.random.randint(0, len(bts_members))
    member = bts_members[member_idx]
    
    # Base features
    features = np.random.randn(n_features)
    
    # Add member-specific patterns
    if member == 'RM':
        features[0:5] += 2.0
    elif member == 'Jin':
        features[5:10] += 2.0
    elif member == 'SUGA':
        features[10:15] += 2.0
    elif member == 'j-hope':
        features[15:20] += 2.0
    elif member == 'Jimin':
        features[20:25] += 2.0
    elif member == 'V':
        features[25:30] += 2.0
    elif member == 'Jung Kook':
        features[30:35] += 2.0
    
    X.append(features)
    y.append(member)

X = np.array(X)
y = np.array(y)

print(f"\\nDataset: {X.shape[0]} images, {X.shape[1]} features")
print(f"Classes: {bts_members}")

# Encode labels
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Use MLPClassifier (Multi-Layer Perceptron) as neural network
from sklearn.neural_network import MLPClassifier

model = MLPClassifier(
    hidden_layer_sizes=(128, 64, 32),
    activation='relu',
    max_iter=100,
    random_state=42
)

print("\\n🧠 Training Neural Network...")
print("Architecture: Input(50) -> Hidden(128) -> Hidden(64) -> Hidden(32) -> Output(7)")

model.fit(X_train_scaled, y_train)

# Evaluate
train_acc = model.score(X_train_scaled, y_train)
test_acc = model.score(X_test_scaled, y_test)

print(f"\\n📈 Model Performance:")
print(f"Training Accuracy: {train_acc:.3f}")
print(f"Test Accuracy: {test_acc:.3f}")

# Make predictions
y_pred = model.predict(X_test_scaled)

# Show some predictions
print("\\n🔮 Sample Predictions:")
for i in range(5):
    true_member = le.inverse_transform([y_test[i]])[0]
    pred_member = le.inverse_transform([y_pred[i]])[0]
    correct = "✓" if true_member == pred_member else "✗"
    print(f"  {correct} True: {true_member:10s} | Predicted: {pred_member}")

# Predict new image
new_image = np.random.randn(n_features)
new_image[25:30] += 2.0  # V's pattern

new_image_scaled = scaler.transform(new_image.reshape(1, -1))
predicted_member_num = model.predict(new_image_scaled)[0]
predicted_member = le.inverse_transform([predicted_member_num])[0]

print(f"\\n🔮 New image prediction: {predicted_member}")
print("\\n✅ Neural network trained successfully!")
`
    },

    // Module 9: NLP
    {
      title: 'Module 9: Natural Language Processing – K-pop Lyrics Sentiment Analysis',
      description: `
## Natural Language Processing

### Learning Objectives
- Understand text preprocessing techniques
- Learn about bag-of-words and TF-IDF
- Build sentiment analysis models
- Work with word embeddings
- Apply NLP to real text data

### What is NLP?

Natural Language Processing enables computers to understand, interpret, and generate human language. Applications include:
- Sentiment analysis (positive/negative reviews)
- Machine translation
- Chatbots
- Text summarization

### Text Preprocessing

Raw text is messy! Steps to clean:
1. **Lowercase**: Convert all to lowercase
2. **Remove punctuation**: .,!? etc.
3. **Remove numbers**: Usually not meaningful
4. **Remove stopwords**: Common words (the, and, is) that don't carry meaning
5. **Stemming/Lemmatization**: Reduce words to root form (running → run)

### Bag-of-Words

Simple representation: Count how many times each word appears in a document. Creates a sparse vector of word counts.

**Limitation**: Loses word order and context.

### TF-IDF (Term Frequency-Inverse Document Frequency)

Better than simple counts:
- **TF**: How often word appears in this document
- **IDF**: How rare the word is across all documents
- **TF-IDF = TF * IDF**: High for words that are frequent in this document but rare overall

### Key Takeaway
NLP transforms text into numerical features that machine learning models can understand!
      `,
      code: `import numpy as np
import pandas as pd
import re
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

print("🎵 K-pop Lyrics Sentiment Analysis")

# Create synthetic K-pop lyrics dataset
np.random.seed(42)
n_songs = 300

happy_lyrics = [
    "I love you baby it's a beautiful day shine dream smile",
    "dynamite dancing through the night so amazing wonderful",
    "happy feeling good everything is perfect fantastic wow",
    "butter smooth like criminal with the sweet devotion",
    "life is a party let's celebrate together forever"
]

sad_lyrics = [
    "blue tears falling down lonely night without you",
    "broken heart crying pain missing you so much",
    "goodbye my love never forget you remember forever",
    "dark clouds rainy day sad alone depressed cry",
    "hurt pain suffering why did you leave me"
]

angry_lyrics = [
    "hate you liar cheat destroy break everything",
    "angry mad furious fight battle war revenge",
    "enemy attack destroy kill burn break apart",
    "rage fury anger screaming shouting fighting back",
    "never forgive never forget betrayal pain hurt"
]

# Generate songs
sentiments = []
lyrics_list = []

for i in range(n_songs):
    sentiment = np.random.choice(['happy', 'sad', 'angry'])
    
    if sentiment == 'happy':
        base = np.random.choice(happy_lyrics)
        extra = np.random.choice(['love', 'joy', 'dance', 'sing', 'smile'], 
                                 size=np.random.randint(1, 4))
    elif sentiment == 'sad':
        base = np.random.choice(sad_lyrics)
        extra = np.random.choice(['cry', 'alone', 'tears', 'missing', 'pain'], 
                                 size=np.random.randint(1, 4))
    else:
        base = np.random.choice(angry_lyrics)
        extra = np.random.choice(['fight', 'destroy', 'anger', 'hate', 'kill'], 
                                 size=np.random.randint(1, 4))
    
    lyrics = base + ' ' + ' '.join(extra)
    lyrics_list.append(lyrics)
    sentiments.append(sentiment)

df = pd.DataFrame({
    'lyrics': lyrics_list,
    'sentiment': sentiments
})

print(f"\\n📊 Dataset: {len(df)} songs")
print(f"\\nSentiment distribution:")
print(df['sentiment'].value_counts())

# Text preprocessing
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\\s]', '', text)
    text = re.sub(r'\\s+', ' ', text).strip()
    return text

df['processed_lyrics'] = df['lyrics'].apply(preprocess_text)

# Create features using TF-IDF
tfidf_vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
X_tfidf = tfidf_vectorizer.fit_transform(df['processed_lyrics'])
y = df['sentiment']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X_tfidf, y, test_size=0.2, random_state=42, stratify=y
)

# Train models
models = {
    'Naive Bayes': MultinomialNB(),
    'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000)
}

print("\\n📊 Model Comparison:")
results = {}

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    results[name] = acc
    print(f"{name}: {acc:.3f}")

# Best model
best_model_name = max(results, key=results.get)
best_model = models[best_model_name]
print(f"\\n✅ Best model: {best_model_name}")

# Predict sentiment for new lyrics
def predict_sentiment(lyrics, model, vectorizer):
    processed = preprocess_text(lyrics)
    X = vectorizer.transform([processed])
    pred = model.predict(X)[0]
    probs = model.predict_proba(X)[0]
    return pred, probs

# Test with new lyrics
test_lyrics = [
    "I'm so happy today dancing under the sunshine with you",
    "my heart is broken tears falling down missing you forever",
    "I will destroy you fight back revenge is coming"
]

print("\\n🔮 Predictions for new lyrics:")
for lyrics in test_lyrics:
    pred, probs = predict_sentiment(lyrics, best_model, tfidf_vectorizer)
    print(f"\\n📝 Lyrics: {lyrics[:50]}...")
    print(f"   Predicted: {pred.upper()}")
    sentiment_order = ['angry', 'happy', 'sad']  # alphabetical order
    for i, sentiment in enumerate(sentiment_order):
        print(f"   {sentiment}: {probs[i]:.2f}")

print("\\n✅ Sentiment analysis complete!")
`
    },

    // Module 10: Final Project
    {
      title: 'Module 10: Final Project – Build Your Own ML Application',
      description: `
## Final Project – Build Your Own ML Application

### Learning Objectives
- Apply all concepts learned throughout the course
- Work on a real-world problem from start to finish
- Practice data collection, preprocessing, modeling, and evaluation
- Deploy a simple ML model

### Project Ideas

Choose one of these project ideas or create your own!

#### 1. Cricket Match Winner Predictor 🏏
- Collect IPL or international match data
- Features: team rankings, venue, toss winner, recent form
- Build classification models to predict winner
- Create a web app for predictions

#### 2. K-pop Song Recommender System 🎵
- Collect song features from Spotify API
- Build a recommendation engine based on similarity
- Use clustering to create mood-based playlists
- Deploy as a web app

#### 3. Squid Game Player Survival Predictor 🎮
- Create dataset of player characteristics
- Build models to predict survival probability
- Analyze which factors matter most
- Create interactive visualization

#### 4. Movie Sentiment Analyzer 🎬
- Collect movie reviews from IMDb
- Build NLP model to predict sentiment
- Create a web app for review analysis
- Visualize word importance

#### 5. Stock Price Predictor 📈
- Collect historical stock data
- Build time series models
- Predict future prices
- Create dashboard with predictions

### Project Checklist

✅ **Data Collection**
- Gather relevant dataset
- Ensure sufficient data quality
- Document data sources

✅ **Exploratory Data Analysis**
- Understand data distribution
- Identify missing values and outliers
- Visualize relationships

✅ **Data Preprocessing**
- Handle missing values
- Encode categorical variables
- Scale/normalize features
- Split into train/validation/test sets

✅ **Model Building**
- Try multiple algorithms
- Implement baseline model
- Compare model performance

✅ **Model Evaluation**
- Use appropriate metrics
- Perform cross-validation
- Check for overfitting

✅ **Hyperparameter Tuning**
- Use Grid Search or Random Search
- Optimize based on validation performance

✅ **Final Evaluation**
- Test on held-out test set
- Analyze errors and edge cases
- Document model limitations

✅ **Deployment**
- Save trained model
- Create user interface
- Write documentation
- Test with real users

### Tips for Success

1. **Start Simple**: Begin with a basic model, then iterate
2. **Document Everything**: Keep notes on what works
3. **Version Control**: Use Git to track changes
4. **Validate Assumptions**: Always check your data
5. **Iterate**: ML is iterative – expect to refine
6. **Share Your Work**: Post on GitHub, get feedback
7. **Learn from Failures**: Failed experiments teach lessons

### What You've Learned

Congratulations! You've completed the Introduction to Machine Learning course. You now understand:

✅ Core ML concepts and types of learning
✅ Data exploration and visualization
✅ Regression for continuous predictions
✅ Classification for categorical predictions
✅ Decision trees and ensemble methods
✅ Model evaluation and selection
✅ Clustering for unsupervised learning
✅ Neural networks and deep learning basics
✅ Natural language processing
✅ End-to-end ML project workflow

### Next Steps

1. **Complete a Project**: Choose one and build it
2. **Share Your Work**: Post on GitHub, write a blog
3. **Get Feedback**: Share with communities
4. **Learn Something New**: Explore advanced topics
5. **Help Others**: Answer questions, mentor beginners
6. **Keep Building**: The best way to learn is by doing

### Keep Learning!

- Take advanced courses (Deep Learning, NLP, Computer Vision)
- Participate in Kaggle competitions
- Read research papers
- Join ML communities
- Build real-world projects
- Stay curious and keep experimenting!

**Remember**: Machine Learning is a journey, not a destination. Keep learning, keep building, and most importantly, have fun! 🚀
      `,
      code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

print("🎯 ML Project Template – End-to-End Workflow")
print("=" * 60)

# Step 1: Data Collection
print("\\n📊 Step 1: Data Collection")
print("Collect your data from various sources...")
print("✓ Data collected")

# Step 2: Create sample dataset
np.random.seed(42)
n_samples = 500

data = {
    'feature_1': np.random.randn(n_samples),
    'feature_2': np.random.randn(n_samples),
    'feature_3': np.random.uniform(0, 1, n_samples),
    'feature_4': np.random.randint(0, 10, n_samples),
    'target': np.random.choice([0, 1], n_samples)
}

df = pd.DataFrame(data)
print(f"Dataset shape: {df.shape}")

# Step 3: Exploratory Data Analysis
print("\\n🔍 Step 2: Exploratory Data Analysis")
print(df.describe())
print(f"Missing values: {df.isnull().sum().sum()}")
print(f"Target distribution:\\n{df['target'].value_counts()}")

# Step 4: Data Preprocessing
print("\\n🧹 Step 3: Data Preprocessing")
features = ['feature_1', 'feature_2', 'feature_3', 'feature_4']
X = df[features]
y = df['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
print("✓ Data preprocessed and split")

# Step 5: Model Building
print("\\n🤖 Step 4: Model Building")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)
print("✓ Model trained")

# Step 6: Model Evaluation
print("\\n📈 Step 5: Model Evaluation")
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"Test Accuracy: {accuracy:.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

# Step 7: Feature Importance
print("\\n🔍 Step 6: Feature Importance")
importances = model.feature_importances_
for feature, importance in zip(features, importances):
    print(f"{feature}: {importance:.3f}")

# Step 8: Save Model
print("\\n💾 Step 7: Saving Model")
joblib.dump(model, 'ml_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("✓ Model saved as 'ml_model.pkl'")

# Step 9: Make Predictions
print("\\n🔮 Step 8: Making Predictions")
new_data = pd.DataFrame({
    'feature_1': [0.5],
    'feature_2': [-0.3],
    'feature_3': [0.7],
    'feature_4': [5]
})
new_data_scaled = scaler.transform(new_data)
prediction = model.predict(new_data_scaled)[0]
probability = model.predict_proba(new_data_scaled)[0]

print(f"Prediction: {prediction}")
print(f"Probability: Class 0: {probability[0]:.2%}, Class 1: {probability[1]:.2%}")

print("\\n" + "=" * 60)
print("🎉 Project Complete! You've built an end-to-end ML pipeline!")
print("=" * 60)
print("\\n📚 What you accomplished:")
print("✓ Collected and loaded data")
print("✓ Performed exploratory data analysis")
print("✓ Preprocessed and cleaned data")
print("✓ Built and trained a model")
print("✓ Evaluated model performance")
print("✓ Analyzed feature importance")
print("✓ Saved the model for deployment")
print("✓ Made predictions on new data")
print("\\n🚀 Next: Deploy your model as a web app!")
print("💡 Tip: Use Streamlit or Flask for easy deployment")
`
    },
    {
      title: 'Data Preprocessing Pipelines',
      description: `
## Data Preprocessing Pipelines

### Learning Objectives
- Understand why preprocessing is critical for ML success
- Learn to handle missing values, duplicates, and outliers
- Build reusable preprocessing pipelines with scikit-learn
- Apply encoding techniques for categorical variables

### Why Preprocessing Matters
Real-world data is messy — missing values, inconsistent formats, outliers. Models can't learn from garbage data. A good preprocessing pipeline ensures clean, consistent input every time.

### Common Preprocessing Steps

**1. Handling Missing Values**:
- Drop rows/columns if too many missing
- Impute with mean, median, or mode
- Use KNN or model-based imputation for better accuracy

**2. Encoding Categorical Variables**:
- Label Encoding: Assign integers to categories (ordinal)
- One-Hot Encoding: Create binary columns (nominal)
- Target Encoding: Replace with mean of target variable

**3. Handling Outliers**:
- IQR method: Remove points beyond 1.5 * IQR
- Z-score: Remove points beyond 3 standard deviations
- Clip: Cap values at a threshold

**4. Sklearn Pipelines**:
- Chain preprocessing steps into a single object
- Prevents data leakage (fit on train, transform on test)
- Easy to save and deploy

### Key Takeaway
A robust preprocessing pipeline is often the difference between a model that barely works and one that performs well in production.
      `,
      starterCode: `import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer

np.random.seed(42)

# Create messy dataset
data = {
    'age': [25, 30, np.nan, 45, 50, 35, np.nan, 40, 28, 55],
    'salary': [50000, 60000, 70000, np.nan, 90000, 65000, 55000, np.nan, 48000, 95000],
    'city': ['NYC', 'LA', 'NYC', 'Chicago', 'LA', None, 'Chicago', 'NYC', 'LA', 'Chicago'],
    'experience': ['junior', 'mid', 'senior', 'senior', 'senior', 'mid', 'junior', 'mid', 'junior', 'senior'],
    'hired': [1, 1, 1, 0, 1, 0, 0, 1, 0, 1]
}
df = pd.DataFrame(data)

print("Raw Data:")
print(df)
print(f"\\nMissing values:\\n{df.isnull().sum()}")

# TODO: Define numeric and categorical columns
numeric_features = 
categorical_features = 

# TODO: Create preprocessing pipelines
# Numeric: impute missing with median, then scale
# Categorical: impute missing with most frequent, then one-hot encode

# TODO: Combine into a ColumnTransformer

# TODO: Fit and transform the data
`,
      solution: `import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

np.random.seed(42)

data = {
    'age': [25, 30, np.nan, 45, 50, 35, np.nan, 40, 28, 55],
    'salary': [50000, 60000, 70000, np.nan, 90000, 65000, 55000, np.nan, 48000, 95000],
    'city': ['NYC', 'LA', 'NYC', 'Chicago', 'LA', None, 'Chicago', 'NYC', 'LA', 'Chicago'],
    'experience': ['junior', 'mid', 'senior', 'senior', 'senior', 'mid', 'junior', 'mid', 'junior', 'senior'],
    'hired': [1, 1, 1, 0, 1, 0, 0, 1, 0, 1]
}
df = pd.DataFrame(data)

print("Raw Data:")
print(df)
print(f"\\nMissing values:\\n{df.isnull().sum()}")

numeric_features = ['age', 'salary']
categorical_features = ['city', 'experience']

# Numeric pipeline: impute then scale
numeric_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Categorical pipeline: impute then one-hot encode
categorical_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(drop='first', sparse_output=False))
])

# Combine
preprocessor = ColumnTransformer([
    ('num', numeric_pipeline, numeric_features),
    ('cat', categorical_pipeline, categorical_features)
])

# Full pipeline with model
full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

X = df.drop('hired', axis=1)
y = df['hired']

# Fit entire pipeline
full_pipeline.fit(X, y)

# Transform to see preprocessed data
X_processed = preprocessor.fit_transform(X)
feature_names = (numeric_features + 
    list(preprocessor.named_transformers_['cat']
         .named_steps['encoder'].get_feature_names_out(categorical_features)))

print(f"\\nPreprocessed features: {feature_names}")
print(f"Processed shape: {X_processed.shape}")
print(f"\\nProcessed data (first 3 rows):")
print(pd.DataFrame(X_processed, columns=feature_names).head(3))

print("\\nPipeline ensures consistent preprocessing for new data!")
new_person = pd.DataFrame({'age': [32], 'salary': [72000], 'city': ['NYC'], 'experience': ['mid']})
prediction = full_pipeline.predict(new_person)
print(f"New person prediction: {'Hired' if prediction[0] == 1 else 'Not Hired'}")
`,
      code: `import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier

np.random.seed(42)
data = {
    'age': [25, 30, np.nan, 45, 50, 35, np.nan, 40, 28, 55],
    'salary': [50000, 60000, 70000, np.nan, 90000, 65000, 55000, np.nan, 48000, 95000],
    'city': ['NYC', 'LA', 'NYC', 'Chicago', 'LA', None, 'Chicago', 'NYC', 'LA', 'Chicago'],
    'experience': ['junior', 'mid', 'senior', 'senior', 'senior', 'mid', 'junior', 'mid', 'junior', 'senior'],
    'hired': [1, 1, 1, 0, 1, 0, 0, 1, 0, 1]
}
df = pd.DataFrame(data)

preprocessor = ColumnTransformer([
    ('num', Pipeline([('imp', SimpleImputer(strategy='median')), ('scl', StandardScaler())]), ['age', 'salary']),
    ('cat', Pipeline([('imp', SimpleImputer(strategy='most_frequent')), ('enc', OneHotEncoder(drop='first', sparse_output=False))]), ['city', 'experience'])
])

pipeline = Pipeline([('pre', preprocessor), ('clf', RandomForestClassifier(random_state=42))])
pipeline.fit(df.drop('hired', axis=1), df['hired'])

new = pd.DataFrame({'age': [32], 'salary': [72000], 'city': ['NYC'], 'experience': ['mid']})
print(f"Prediction: {'Hired' if pipeline.predict(new)[0] == 1 else 'Not Hired'}")
print("Pipeline handles missing values + encoding + scaling automatically!")
`
    },
    {
      title: 'Feature Scaling & Normalization',
      description: `
## Feature Scaling & Normalization

### Learning Objectives
- Understand why feature scaling is important
- Learn different scaling techniques and when to use each
- See how scaling affects model performance
- Know which algorithms need scaling vs which don't

### Why Scale Features?
Features with different ranges can bias models. If "salary" ranges from 30,000-100,000 and "age" from 18-65, distance-based algorithms will be dominated by salary.

### Scaling Methods

**1. StandardScaler (Z-score)**:
- Centers data at 0, std dev = 1
- Formula: z = (x - mean) / std
- Best for: Normally distributed features
- Use with: Linear models, SVM, Neural Networks

**2. MinMaxScaler**:
- Scales to [0, 1] range
- Formula: x_scaled = (x - min) / (max - min)
- Best for: When you need bounded values
- Use with: Neural networks, image data

**3. RobustScaler**:
- Uses median and IQR instead of mean/std
- Robust to outliers
- Best for: Data with many outliers

**4. Normalizer**:
- Scales each sample (row) to unit norm
- Best for: Text data (TF-IDF), when direction matters more than magnitude

### Which Algorithms Need Scaling?
- **Need scaling**: KNN, SVM, Linear/Logistic Regression, Neural Networks, PCA
- **Don't need**: Decision Trees, Random Forests, Gradient Boosting

### Key Takeaway
Always scale features for distance-based and gradient-based models. Fit the scaler on training data only, then transform both train and test.
      `,
      starterCode: `import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)

# Create dataset with features at very different scales
n = 200
X = np.column_stack([
    np.random.normal(50000, 15000, n),   # salary (large scale)
    np.random.normal(35, 10, n),          # age (small scale)
    np.random.normal(5, 2, n),            # years experience (tiny scale)
])
y = (X[:, 0] > 50000).astype(int)  # Simple target

feature_names = ['salary', 'age', 'experience']
print("Feature ranges (before scaling):")
for i, name in enumerate(feature_names):
    print(f"  {name}: [{X[:,i].min():.0f}, {X[:,i].max():.0f}]")

# TODO: Split data
X_train, X_test, y_train, y_test = 

# TODO: Apply StandardScaler
scaler = 
X_train_scaled = 
X_test_scaled = 

# TODO: Compare KNN accuracy with and without scaling
# Without scaling
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)
acc_unscaled = 

# With scaling
knn_scaled = KNeighborsClassifier(n_neighbors=5)
knn_scaled.fit(X_train_scaled, y_train)
acc_scaled = 

print(f"\\nKNN without scaling: {acc_unscaled:.3f}")
print(f"KNN with scaling: {acc_scaled:.3f}")
`,
      solution: `import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)

n = 200
X = np.column_stack([
    np.random.normal(50000, 15000, n),
    np.random.normal(35, 10, n),
    np.random.normal(5, 2, n),
])
y = (X[:, 0] > 50000).astype(int)

feature_names = ['salary', 'age', 'experience']
print("Feature ranges (before scaling):")
for i, name in enumerate(feature_names):
    print(f"  {name}: [{X[:,i].min():.0f}, {X[:,i].max():.0f}]")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Compare different scalers
scalers = {
    'No Scaling': None,
    'StandardScaler': StandardScaler(),
    'MinMaxScaler': MinMaxScaler(),
    'RobustScaler': RobustScaler()
}

print("\\n=== KNN Performance with Different Scaling ===")
for name, scaler in scalers.items():
    if scaler:
        X_tr = scaler.fit_transform(X_train)
        X_te = scaler.transform(X_test)
    else:
        X_tr, X_te = X_train, X_test
    
    knn = KNeighborsClassifier(n_neighbors=5)
    knn.fit(X_tr, y_train)
    acc = accuracy_score(y_test, knn.predict(X_te))
    print(f"  {name:20s}: {acc:.3f}")

print("\\n=== Decision Tree (doesn't need scaling) ===")
for name, scaler in scalers.items():
    if scaler:
        X_tr = scaler.fit_transform(X_train)
        X_te = scaler.transform(X_test)
    else:
        X_tr, X_te = X_train, X_test
    
    dt = DecisionTreeClassifier(random_state=42)
    dt.fit(X_tr, y_train)
    acc = accuracy_score(y_test, dt.predict(X_te))
    print(f"  {name:20s}: {acc:.3f}")

# Show scaled ranges
print("\\nFeature ranges after StandardScaler:")
ss = StandardScaler().fit_transform(X)
for i, name in enumerate(feature_names):
    print(f"  {name}: [{ss[:,i].min():.2f}, {ss[:,i].max():.2f}]")

print("\\nKey: KNN needs scaling, Decision Trees don't!")
`,
      code: `import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
X = np.column_stack([np.random.normal(50000, 15000, 200), np.random.normal(35, 10, 200), np.random.normal(5, 2, 200)])
y = (X[:, 0] > 50000).astype(int)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

for name, scaler in [('None', None), ('Standard', StandardScaler()), ('MinMax', MinMaxScaler()), ('Robust', RobustScaler())]:
    Xtr = scaler.fit_transform(X_train) if scaler else X_train
    Xte = scaler.transform(X_test) if scaler else X_test
    knn_acc = accuracy_score(y_test, KNeighborsClassifier().fit(Xtr, y_train).predict(Xte))
    dt_acc = accuracy_score(y_test, DecisionTreeClassifier(random_state=42).fit(Xtr, y_train).predict(Xte))
    print(f"{name:10s} -> KNN: {knn_acc:.3f}, DTree: {dt_acc:.3f}")

print("\\nKNN needs scaling, Decision Trees don't!")
`
    },
    {
      title: 'Train/Test/Validation Splits',
      description: `
## Train/Test/Validation Splits

### Learning Objectives
- Understand why we split data into train, test, and validation sets
- Learn about data leakage and how to prevent it
- Master cross-validation techniques
- Know when to use stratified splits

### Why Split Data?
You can't evaluate a model on the same data it learned from — that's like giving a student the exam answers before the test. We need unseen data to test generalization.

### Three-Way Split

**Training Set (60-80%)**:
- Model learns patterns from this data
- Used for fitting parameters

**Validation Set (10-20%)**:
- Used during training to tune hyperparameters
- Helps choose the best model configuration
- NOT used for final evaluation

**Test Set (10-20%)**:
- Held out completely until the very end
- Gives unbiased estimate of real-world performance
- Only used ONCE for final evaluation

### Cross-Validation
- K-Fold: Split into K parts, rotate which is validation
- Stratified K-Fold: Maintains class balance in each fold
- More reliable than a single split
- Use when dataset is small

### Data Leakage
- Information from test/val leaking into training
- Common mistakes: scaling before splitting, using future data
- Always split FIRST, then preprocess

### Key Takeaway
Proper data splitting prevents overly optimistic performance estimates and ensures your model will work on new data.
      `,
      starterCode: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import (train_test_split, KFold, 
    StratifiedKFold, cross_val_score)
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target
print(f"Dataset: {X.shape[0]} samples, {X.shape[1]} features, {len(np.unique(y))} classes")
print(f"Class distribution: {np.bincount(y)}")

# TODO: Simple train/test split (80/20)
X_train, X_test, y_train, y_test = 

print(f"\\nTrain: {X_train.shape[0]}, Test: {X_test.shape[0]}")

# TODO: Three-way split (60/20/20)
# First split off test, then split train into train+val
X_temp, X_test, y_temp, y_test = 
X_train, X_val, y_train, y_val = 

print(f"Train: {X_train.shape[0]}, Val: {X_val.shape[0]}, Test: {X_test.shape[0]}")

# TODO: Cross-validation
model = RandomForestClassifier(n_estimators=100, random_state=42)
scores = 

print(f"\\nCross-val scores: {scores}")
print(f"Mean: {scores.mean():.3f} (+/- {scores.std():.3f})")
`,
      solution: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import (train_test_split, KFold,
    StratifiedKFold, cross_val_score)
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)

iris = load_iris()
X, y = iris.data, iris.target
print(f"Dataset: {X.shape[0]} samples, {X.shape[1]} features, {len(np.unique(y))} classes")
print(f"Class distribution: {np.bincount(y)}")

# Simple train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
print(f"\\n=== Simple Split ===")
print(f"Train: {X_train.shape[0]}, Test: {X_test.shape[0]}")
print(f"Train class dist: {np.bincount(y_train)}")
print(f"Test class dist:  {np.bincount(y_test)}")

# Three-way split
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.25, random_state=42, stratify=y_temp)

print(f"\\n=== Three-Way Split ===")
print(f"Train: {X_train.shape[0]} ({X_train.shape[0]/len(X):.0%})")
print(f"Val:   {X_val.shape[0]} ({X_val.shape[0]/len(X):.0%})")
print(f"Test:  {X_test.shape[0]} ({X_test.shape[0]/len(X):.0%})")

# Train with validation for hyperparameter tuning
for n_est in [10, 50, 100, 200]:
    model = RandomForestClassifier(n_estimators=n_est, random_state=42)
    model.fit(X_train, y_train)
    val_acc = accuracy_score(y_val, model.predict(X_val))
    print(f"  n_estimators={n_est:3d}: val_acc={val_acc:.3f}")

# Cross-validation
print(f"\\n=== Cross-Validation ===")
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Regular K-Fold
kf_scores = cross_val_score(model, X, y, cv=KFold(n_splits=5, shuffle=True, random_state=42))
print(f"K-Fold (5):     {kf_scores.mean():.3f} (+/- {kf_scores.std():.3f})")

# Stratified K-Fold
skf_scores = cross_val_score(model, X, y, cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=42))
print(f"Stratified (5): {skf_scores.mean():.3f} (+/- {skf_scores.std():.3f})")

print(f"\\nIndividual fold scores: {skf_scores.round(3)}")
print("\\nStratified ensures balanced classes in each fold!")
`,
      code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)

# Three-way split
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.25, stratify=y_temp, random_state=42)
print(f"Train: {len(X_train)}, Val: {len(X_val)}, Test: {len(X_test)}")

# Hyperparameter tuning on validation set
for n in [10, 50, 100, 200]:
    m = RandomForestClassifier(n_estimators=n, random_state=42).fit(X_train, y_train)
    print(f"  n={n:3d}: val={accuracy_score(y_val, m.predict(X_val)):.3f}")

# Cross-validation
scores = cross_val_score(RandomForestClassifier(random_state=42), X, y, cv=StratifiedKFold(5, shuffle=True, random_state=42))
print(f"\\nCV: {scores.mean():.3f} +/- {scores.std():.3f}")
`
    },
    {
      title: 'Overfitting vs Underfitting',
      description: `
## Overfitting vs Underfitting

### Learning Objectives
- Understand the bias-variance tradeoff
- Identify overfitting and underfitting from learning curves
- Learn regularization techniques to combat overfitting
- Know practical strategies for finding the sweet spot

### The Core Problem

**Underfitting (High Bias)**:
- Model is too simple to capture patterns
- Poor performance on BOTH training and test data
- Like memorizing nothing — you fail every exam

**Overfitting (High Variance)**:
- Model memorizes training data including noise
- Great on training data, poor on test data
- Like memorizing answers instead of understanding concepts

**Good Fit**:
- Model captures true patterns, ignores noise
- Good performance on both train and test data

### Bias-Variance Tradeoff
- **Bias**: Error from simplifying assumptions (underfitting)
- **Variance**: Error from sensitivity to training data (overfitting)
- **Total Error = Bias² + Variance + Irreducible Noise**
- Goal: Find the sweet spot that minimizes total error

### How to Detect
- **Learning curves**: Plot train/val error vs training size
- **Overfitting**: Training error low, validation error high (gap)
- **Underfitting**: Both errors high

### How to Fix
- **Overfitting**: More data, regularization, simpler model, dropout, early stopping
- **Underfitting**: More complex model, more features, less regularization

### Key Takeaway
The best model balances complexity — complex enough to learn patterns, simple enough to generalize. Always monitor the gap between training and validation performance.
      `,
      starterCode: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split

np.random.seed(42)

# Generate noisy sine wave data
X = np.sort(np.random.uniform(0, 2 * np.pi, 30)).reshape(-1, 1)
y = np.sin(X).ravel() + np.random.normal(0, 0.2, 30)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Fit models with different polynomial degrees
# degree=1 (underfitting), degree=4 (good fit), degree=15 (overfitting)
degrees = [1, 4, 15]

for degree in degrees:
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
    model.fit(X_train, y_train)
    
    train_mse = 
    test_mse = 
    
    print(f"Degree {degree:2d}: Train MSE = {train_mse:.4f}, Test MSE = {test_mse:.4f}")

# TODO: Show how regularization helps
# Compare LinearRegression vs Ridge for degree=15
`,
      solution: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split, learning_curve

np.random.seed(42)

X = np.sort(np.random.uniform(0, 2 * np.pi, 30)).reshape(-1, 1)
y = np.sin(X).ravel() + np.random.normal(0, 0.2, 30)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

print("=== Polynomial Regression: Underfitting vs Overfitting ===")
print(f"{'Degree':>8} {'Train MSE':>12} {'Test MSE':>12} {'Status':>15}")
print("-" * 50)

for degree in [1, 2, 4, 8, 15]:
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
    model.fit(X_train, y_train)
    
    train_mse = mean_squared_error(y_train, model.predict(X_train))
    test_mse = mean_squared_error(y_test, model.predict(X_test))
    
    if train_mse > 0.1:
        status = "Underfitting"
    elif test_mse > train_mse * 3:
        status = "Overfitting"
    else:
        status = "Good fit"
    
    print(f"{degree:>8} {train_mse:>12.4f} {test_mse:>12.4f} {status:>15}")

# Regularization helps overfitting
print("\\n=== Regularization (degree=15) ===")
for alpha in [0, 0.001, 0.01, 0.1, 1.0, 10.0]:
    if alpha == 0:
        model = make_pipeline(PolynomialFeatures(15), LinearRegression())
    else:
        model = make_pipeline(PolynomialFeatures(15), Ridge(alpha=alpha))
    
    model.fit(X_train, y_train)
    train_mse = mean_squared_error(y_train, model.predict(X_train))
    test_mse = mean_squared_error(y_test, model.predict(X_test))
    print(f"  alpha={alpha:6.3f}: Train={train_mse:.4f}, Test={test_mse:.4f}, Gap={test_mse-train_mse:.4f}")

print("\\nKey insights:")
print("- Low degree = underfitting (high bias)")
print("- High degree = overfitting (high variance)")
print("- Regularization reduces overfitting by penalizing complexity")
print("- The best model minimizes the gap between train and test error")
`,
      code: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split

np.random.seed(42)
X = np.sort(np.random.uniform(0, 2*np.pi, 30)).reshape(-1, 1)
y = np.sin(X).ravel() + np.random.normal(0, 0.2, 30)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=42)

print("Polynomial degree comparison:")
for d in [1, 4, 15]:
    m = make_pipeline(PolynomialFeatures(d), LinearRegression()).fit(X_tr, y_tr)
    tr = mean_squared_error(y_tr, m.predict(X_tr))
    te = mean_squared_error(y_te, m.predict(X_te))
    print(f"  deg={d:2d}: train={tr:.4f}, test={te:.4f}, gap={te-tr:.4f}")

print("\\nRidge regularization (degree=15):")
for a in [0, 0.01, 0.1, 1.0]:
    m = make_pipeline(PolynomialFeatures(15), Ridge(alpha=a) if a else LinearRegression()).fit(X_tr, y_tr)
    print(f"  alpha={a:.2f}: test_mse={mean_squared_error(y_te, m.predict(X_te)):.4f}")
`
    }
  ]
};
