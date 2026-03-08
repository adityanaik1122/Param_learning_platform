// Phase 10: MLOps & Production – Comprehensive Curriculum (Local-first + optional Azure/AWS)

export const phase10MLOpsProductionContent = {
  id: 10,
  title: 'Phase 10: MLOps & Production',
  topics: [
    'MLOps Lifecycle & Requirements',
    'Data/Feature Versioning & Validation',
    'Experiment Tracking & Reproducibility',
    'Model Registry, Governance & Lineage',
    'Deployment Patterns (Batch/Online/Streaming/Edge)',
    'Model Serving APIs & Contracts',
    'CI/CD for ML Systems',
    'Monitoring, Logging & Observability',
    'Drift Detection & Retraining',
    'Scaling, Cost, and Performance Optimization',
    'Security, Privacy & Compliance',
    'Cloud MLOps (Azure ML & AWS SageMaker – Optional)'
  ],
  lessons: [
    {
      title: 'Module 1: MLOps Foundations – From Notebook to Production',
      description: `
## MLOps Foundations – From Notebook to Production

### Learning Objectives
- Understand the full ML system lifecycle: data → training → evaluation → deployment → monitoring → retraining
- Learn how production ML differs from “just training a model”
- Define requirements: latency, throughput, cost, availability, privacy, and safety
- Learn common roles and artifacts: datasets, features, models, endpoints, dashboards

### What MLOps Actually Is
MLOps is the engineering discipline of **reliably shipping ML models to production** and keeping them healthy over time. Unlike normal software, ML systems can fail even when code doesn’t change (because data changes).

### Core Production Questions
- What does “good” mean (metrics + thresholds)?
- How do we reproduce a model exactly (data + code + environment)?
- How do we deploy safely (staging, canary, rollback)?
- How do we detect failures (drift, latency, errors)?

### Production Readiness Checklist
- ✅ Clear success metric + baseline
- ✅ Dataset snapshot + schema
- ✅ Reproducible training pipeline
- ✅ Model artifact + metadata (version, params, metrics)
- ✅ Deployment strategy + rollback plan
- ✅ Monitoring and alerting
- ✅ Post-deploy evaluation plan
      `,
      code: `# A simple "MLOps contract" you can run and extend
# Goal: define requirements early and fail fast if violated.

from dataclasses import dataclass

@dataclass
class ServiceSLO:
    max_p95_latency_ms: float = 200.0
    max_error_rate: float = 0.01
    min_accuracy: float = 0.90

@dataclass
class ModelSpec:
    name: str
    version: str
    problem_type: str  # classification/regression

def validate_release(slo: ServiceSLO, observed: dict) -> None:
    assert observed[\"p95_latency_ms\"] <= slo.max_p95_latency_ms, \"Latency SLO violated\"
    assert observed[\"error_rate\"] <= slo.max_error_rate, \"Error rate SLO violated\"
    assert observed[\"accuracy\"] >= slo.min_accuracy, \"Accuracy threshold violated\"

if __name__ == \"__main__\":
    slo = ServiceSLO()
    spec = ModelSpec(name=\"churn_model\", version=\"1.0.0\", problem_type=\"classification\")
    observed = {\"p95_latency_ms\": 120.0, \"error_rate\": 0.003, \"accuracy\": 0.92}
    validate_release(slo, observed)
    print(\"Release validated:\", spec)`
    },
    {
      title: 'Module 2: Data & Feature Versioning + Validation',
      description: `
## Data & Feature Versioning + Validation

### Learning Objectives
- Learn why data versioning is as important as code versioning
- Implement dataset fingerprinting (hashes) for reproducibility
- Add lightweight schema checks to catch broken pipelines early
- Understand feature stores (offline vs online) and why training-serving parity matters

### Key Ideas
- **Data versioning**: If the data changes, the model changes.
- **Schema validation**: Catch nulls, type shifts, missing columns, range violations.
- **Feature parity**: The features used in training must match those served in production.

### Feature Store Concepts (High Level)
- Offline store: historical features for training
- Online store: low-latency features for inference

### Key Takeaway
Your pipeline should fail early if the data is malformed or different from expected.
      `,
      code: `import hashlib
import pandas as pd
import numpy as np

def fingerprint_dataframe(df: pd.DataFrame) -> str:
    # Stable fingerprint: schema + content hash (sorted columns)
    df2 = df.copy()
    df2 = df2.reindex(sorted(df2.columns), axis=1)
    schema = \"|\".join([f\"{c}:{df2[c].dtype}\" for c in df2.columns])
    content_bytes = pd.util.hash_pandas_object(df2, index=True).values.tobytes()
    h = hashlib.sha256()
    h.update(schema.encode(\"utf-8\"))
    h.update(content_bytes)
    return h.hexdigest()

def validate_schema(df: pd.DataFrame) -> None:
    required = {\"age\": \"float\", \"salary\": \"float\", \"city\": \"object\"}
    for col, dtype_hint in required.items():
        if col not in df.columns:
            raise ValueError(f\"Missing column: {col}\")
        # dtype check is approximate; production systems enforce stricter rules
    if df[\"age\"].isna().mean() > 0.3:
        raise ValueError(\"Too many missing ages\")
    if (df[\"salary\"] < 0).any():
        raise ValueError(\"Salary cannot be negative\")

df = pd.DataFrame({
    \"age\": [25, 30, np.nan, 45],
    \"salary\": [50000, 60000, 70000, 80000],
    \"city\": [\"NYC\", \"LA\", \"NYC\", \"Chicago\"],
})

validate_schema(df)
print(\"fingerprint:\", fingerprint_dataframe(df))`
    },
    {
      title: 'Module 3: Experiment Tracking & Reproducibility (Local Tracker)',
      description: `
## Experiment Tracking & Reproducibility (Local Tracker)

### Learning Objectives
- Track parameters, metrics, and artifacts per run
- Store runs in a simple local format (JSON) to build intuition
- Understand what tools like MLflow give you (tracking server + UI + model registry)

### What to Track
- Params: model hyperparameters, feature config
- Metrics: accuracy, F1, RMSE, AUC
- Artifacts: model file, preprocessing config, label mapping
- Environment: library versions, random seed

### Key Takeaway
If you can’t reproduce a result, you can’t trust it in production.
      `,
      code: `import json, os, time, platform
from pathlib import Path

def start_run(run_dir: Path, params: dict) -> Path:
    run_id = str(int(time.time() * 1000))
    path = run_dir / run_id
    path.mkdir(parents=True, exist_ok=True)
    meta = {
        \"run_id\": run_id,
        \"params\": params,
        \"env\": {\"python\": platform.python_version(), \"platform\": platform.platform()},
    }
    (path / \"meta.json\").write_text(json.dumps(meta, indent=2))
    return path

def log_metrics(run_path: Path, metrics: dict) -> None:
    (run_path / \"metrics.json\").write_text(json.dumps(metrics, indent=2))

if __name__ == \"__main__\":
    run_dir = Path(\"runs\")
    run_dir.mkdir(exist_ok=True)
    run = start_run(run_dir, params={\"model\": \"logreg\", \"C\": 1.0, \"seed\": 42})
    log_metrics(run, metrics={\"accuracy\": 0.92, \"f1\": 0.90})
    print(\"logged run:\", run)`
    },
    {
      title: 'Module 4: Model Packaging – Artifacts, Metadata, and Model Cards',
      description: `
## Model Packaging – Artifacts, Metadata, and Model Cards

### Learning Objectives
- Save a model artifact with its preprocessing and metadata
- Create a minimal “model card” (what data, metrics, limitations)
- Understand why registries exist (promotion from dev → staging → prod)

### Key Takeaway
In production, a “model” is not just weights — it includes preprocessing, labels, and metadata.
      `,
      code: `import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

np.random.seed(42)
df = pd.DataFrame({
    \"x1\": np.random.randn(500),
    \"x2\": np.random.randn(500),
})
df[\"y\"] = (df[\"x1\"] + 0.3 * df[\"x2\"] > 0).astype(int)

X = df[[\"x1\", \"x2\"]].values
y = df[\"y\"].values
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

model = LogisticRegression(max_iter=500).fit(X_tr, y_tr)
acc = accuracy_score(y_te, model.predict(X_te))

joblib.dump(model, \"model.joblib\")
card = {
    \"model_name\": \"demo_logreg\",
    \"version\": \"1.0.0\",
    \"features\": [\"x1\", \"x2\"],
    \"metric_accuracy\": acc,
    \"notes\": \"Synthetic demo. Not for real-world decisions.\"
}
open(\"model_card.json\", \"w\", encoding=\"utf-8\").write(json.dumps(card, indent=2))
print(\"saved model.joblib and model_card.json; acc=\", round(acc, 4))`
    },
    {
      title: 'Module 5: Deployment Patterns – Batch vs Online Serving',
      description: `
## Deployment Patterns – Batch vs Online Serving

### Learning Objectives
- Choose the right deployment pattern: batch, online API, streaming, edge
- Understand trade-offs: latency vs throughput vs cost
- Learn what “training-serving skew” means and how to avoid it

### Common Patterns
- **Batch inference**: scheduled jobs (ETL-style). Cheap and scalable.
- **Online inference**: REST/gRPC endpoints. Low latency.
- **Streaming inference**: event-driven predictions.
- **Edge inference**: on-device constraints.

### Key Takeaway
Pick the deployment pattern that matches product needs—not the fanciest one.
      `,
      code: `# Batch inference example (local): load model, run predictions on a dataframe

import joblib
import numpy as np
import pandas as pd

model = joblib.load(\"model.joblib\")
batch = pd.DataFrame({\"x1\": np.random.randn(10), \"x2\": np.random.randn(10)})
pred = model.predict(batch[[\"x1\", \"x2\"]].values)
proba = model.predict_proba(batch[[\"x1\", \"x2\"]].values)[:, 1]
out = batch.copy()
out[\"pred\"] = pred
out[\"score\"] = proba.round(4)
print(out)`
    },
    {
      title: 'Module 6: Monitoring & Observability – Logs, Metrics, and SLAs',
      description: `
## Monitoring & Observability – Logs, Metrics, and SLAs

### Learning Objectives
- Log inference events for debugging and offline evaluation
- Compute latency percentiles (p50/p95/p99)
- Understand what you monitor in production (data, model, and system)

### What to Monitor
- System: latency, error rate, CPU/memory, throughput
- Data: missing values, distribution shift, outliers
- Model: score distribution drift, performance degradation (when labels arrive)

### Key Takeaway
If you can’t observe it, you can’t operate it.
      `,
      code: `import numpy as np
import pandas as pd
from datetime import datetime, timedelta

np.random.seed(7)
n = 1000
ts = [datetime.now() - timedelta(seconds=(n-i)) for i in range(n)]
lat_ms = np.random.lognormal(mean=4.0, sigma=0.35, size=n)  # skewed latencies
err = (np.random.rand(n) < 0.01).astype(int)
score = np.random.beta(2, 5, size=n)

logs = pd.DataFrame({\"ts\": ts, \"latency_ms\": lat_ms, \"error\": err, \"score\": score})

def pct(x, q):
    return float(np.percentile(x, q))

summary = {
    \"count\": int(len(logs)),
    \"error_rate\": float(logs[\"error\"].mean()),
    \"p50_ms\": round(pct(logs[\"latency_ms\"], 50), 2),
    \"p95_ms\": round(pct(logs[\"latency_ms\"], 95), 2),
    \"p99_ms\": round(pct(logs[\"latency_ms\"], 99), 2),
    \"score_mean\": round(float(logs[\"score\"].mean()), 4),
}
print(summary)`
    },
    {
      title: 'Module 7: Drift Detection (No Extra Libraries) – PSI + Alerts',
      description: `
## Drift Detection (No Extra Libraries) – PSI + Alerts

### Learning Objectives
- Detect input drift without fancy tools
- Implement Population Stability Index (PSI) for a feature
- Define alert thresholds and action playbooks

### PSI Rule of Thumb
- PSI < 0.1: stable
- 0.1–0.2: moderate drift (investigate)
- > 0.2: significant drift (retrain / mitigation)

### Key Takeaway
Drift detection is about **early warning**, not perfect accuracy.
      `,
      code: `import numpy as np

def psi(expected: np.ndarray, actual: np.ndarray, bins: int = 10, eps: float = 1e-6) -> float:
    # Bin edges based on expected distribution
    quantiles = np.linspace(0, 1, bins + 1)
    edges = np.quantile(expected, quantiles)
    edges[0] -= 1e-9
    edges[-1] += 1e-9

    exp_counts, _ = np.histogram(expected, bins=edges)
    act_counts, _ = np.histogram(actual, bins=edges)

    exp_perc = exp_counts / max(exp_counts.sum(), 1)
    act_perc = act_counts / max(act_counts.sum(), 1)

    exp_perc = np.clip(exp_perc, eps, 1)
    act_perc = np.clip(act_perc, eps, 1)

    return float(np.sum((act_perc - exp_perc) * np.log(act_perc / exp_perc)))

np.random.seed(42)
train_feature = np.random.normal(loc=0.0, scale=1.0, size=5000)
prod_feature = np.random.normal(loc=0.6, scale=1.2, size=5000)  # drifted

score = psi(train_feature, prod_feature, bins=10)
print(\"PSI:\", round(score, 4))
if score > 0.2:
    print(\"ALERT: significant drift – investigate and consider retraining\")`
    },
    {
      title: 'Module 8: CI/CD for ML – Tests, Quality Gates, and Rollbacks',
      description: `
## CI/CD for ML – Tests, Quality Gates, and Rollbacks

### Learning Objectives
- Understand what “CI/CD for ML” means (not just code tests)
- Add quality gates: data checks, metric thresholds, and safe promotion
- Learn deployment strategies: blue/green, canary, shadow deployments

### Quality Gates Examples
- ✅ Data schema valid
- ✅ No leakage checks passed
- ✅ Metric ≥ baseline
- ✅ Model card generated
- ✅ Inference contract tests passed

### Key Takeaway
Treat model promotion like software release: gated, automated, reversible.
      `,
      code: `# A tiny "quality gate" harness

def gate_metrics(metrics: dict, baseline: dict) -> None:
    if metrics[\"accuracy\"] < baseline[\"accuracy\"]:
        raise ValueError(\"Accuracy below baseline\")
    if metrics.get(\"fairness_gap\", 0.0) > baseline.get(\"max_fairness_gap\", 1.0):
        raise ValueError(\"Fairness constraint violated\")

baseline = {\"accuracy\": 0.90, \"max_fairness_gap\": 0.15}
candidate = {\"accuracy\": 0.92, \"fairness_gap\": 0.10}

gate_metrics(candidate, baseline)
print(\"Candidate passed gates, can promote to staging\")`
    },
    {
      title: 'Module 9: Orchestration – Pipelines for Training and Retraining',
      description: `
## Orchestration – Pipelines for Training and Retraining

### Learning Objectives
- Understand pipeline orchestration tools (Airflow, Prefect, Dagster, Kubeflow, SageMaker Pipelines, Azure ML pipelines)
- Build a simple pipeline structure (extract → validate → train → evaluate → package)
- Learn retraining triggers: drift, schedule, performance drop

### Key Takeaway
Pipelines turn ML into a repeatable factory instead of a one-off script.
      `,
      code: `# Minimal pipeline skeleton in pure Python

def extract():
    return {\"data\": \"...\"}

def validate(payload):
    return payload

def train(payload):
    return {\"model\": \"model_artifact\", \"metrics\": {\"accuracy\": 0.91}}

def package(result):
    return {\"artifact\": result[\"model\"], \"metrics\": result[\"metrics\"], \"version\": \"1.0.1\"}

def pipeline():
    payload = extract()
    payload = validate(payload)
    result = train(payload)
    packaged = package(result)
    return packaged

print(\"pipeline output:\", pipeline())`
    },
    {
      title: 'Module 10: Security, Privacy, and Governance for ML',
      description: `
## Security, Privacy, and Governance for ML

### Learning Objectives
- Apply least privilege, secret management, and audit logging
- Understand privacy risks (PII leakage) and safe logging practices
- Learn governance concepts: lineage, approvals, registries, and access control

### Key Takeaway
Most “production ML failures” are operational and governance failures, not model math failures.
      `,
      code: `import re

def redact_pii(text: str) -> str:
    # Very small demo: redact emails and phone-like patterns
    text = re.sub(r\"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\", \"[REDACTED_EMAIL]\", text)
    text = re.sub(r\"\\b\\d{3}[- ]?\\d{3}[- ]?\\d{4}\\b\", \"[REDACTED_PHONE]\", text)
    return text

log_line = \"user=jane email=jane@example.com phone=555-123-4567 predicted=1\"
print(redact_pii(log_line))`
    },
    {
      title: 'Module 11: Azure ML MLOps (Optional) – Registries, Endpoints, Monitoring',
      description: `
## Azure ML MLOps (Optional) – Registries, Endpoints, Monitoring

### Do you *need* Azure for MLOps?
No. You can learn the full MLOps lifecycle **locally** with Python + Docker + CI.  
Azure is useful when you want managed training, registries, deployment endpoints, and enterprise governance.

### What You’ll Learn (Azure)
- Workspaces vs registries (promote assets across environments)
- Model registration + deployment to managed online endpoints
- Event-driven pipelines (e.g., trigger deployment on model registration)
- Monitoring for drift and performance (as labels arrive)

### Hands-on Outline (CLI-first)
- ✅ Create/attach workspace
- ✅ Create an environment (conda/docker)
- ✅ Register model
- ✅ Deploy online endpoint
- ✅ Enable monitoring signals and alerts

### Key Takeaway
Azure ML provides managed building blocks for the same lifecycle you can implement locally.
      `,
      code: `# This "lab helper" prints the Azure CLI steps.
# Run these commands in your terminal (not inside this Python runner).

steps = [
    \"az login\",
    \"az extension add -n ml -y\",
    \"az account set --subscription <SUBSCRIPTION_ID>\",
    \"az ml workspace show -g <RG> -n <WORKSPACE>\",
    \"az ml model create -n demo-model -v 1 --path model.joblib -g <RG> -w <WORKSPACE>\",
    \"az ml online-endpoint create -n demo-endpoint -g <RG> -w <WORKSPACE> -f endpoint.yml\",
    \"az ml online-deployment create -n blue --endpoint-name demo-endpoint -g <RG> -w <WORKSPACE> -f deployment.yml --all-traffic\",
]

print(\"Azure ML lab steps:\")
for s in steps:
    print(\" -\", s)`
    },
    {
      title: 'Module 12: AWS SageMaker MLOps (Optional) – Pipelines, Registry, Promotion',
      description: `
## AWS SageMaker MLOps (Optional) – Pipelines, Registry, Promotion

### Do you *need* AWS for MLOps?
No. It’s optional. Learn locally first, then map the same concepts onto SageMaker.

### What You’ll Learn (SageMaker)
- SageMaker Pipelines for automated workflows
- Model Registry for approvals and promotion
- Deployment to endpoints and safe rollouts
- CI/CD integration (GitHub Actions / AWS native tooling)

### Key Takeaway
SageMaker is a managed implementation of standard MLOps patterns.
      `,
      code: `# This prints a minimal SageMaker pipeline checklist (conceptual).

checklist = [
    \"Define pipeline steps: processing -> training -> evaluation -> registration\",
    \"Register model with metrics + approval status\",
    \"Deploy to staging endpoint\",
    \"Run integration tests / shadow traffic\",
    \"Promote to production with rollback plan\",
]
print(\"SageMaker MLOps checklist:\")
for item in checklist:
    print(\" -\", item)`
    }
  ]
};

