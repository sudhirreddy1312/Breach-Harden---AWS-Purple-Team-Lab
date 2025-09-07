# Breach&Harden SupplyChain Sentinel

Flagship Project — SupplyChain Sentinel
A practical, budget-friendly lab that recreates common software supply chain attack scenarios — such as typosquatting, malicious dependencies, and CI/CD compromises. The lab includes a reproducible CI/CD pipeline designed to automatically detect, block, verify, and remediate these threats.

What it is: A project (your lab) you’ll run on your own computer or cloud, without spending much money.

What it does: Pretends that “bad things” happen in software development — like:

someone sneaks in a fake package name (typosquatting),

someone hides bad code inside a dependency,

or someone tries to mess with your CI/CD pipeline.

Why: So you can practice how to catch and stop those attacks.

How: You’ll build a pipeline (the system that runs tests/builds) that can:

Detect the attack,

Block it from going further,

Prove (attest) what code went in,

Fix (remediate) the problem.


12-Week Roadmap (high-level weekly themes)

Week 1 — Project scaffolding & local lab (Docker, Verdaccio, demo app, GitHub repo).

Week 2 — CI basics + simple pipeline (GitHub Actions: build → test → fail on danger).

Week 3 — SBOMs & static scanning (Syft + Trivy integrated into CI).

Week 4 — Simulate attacks (safely) (local typosquatting and malicious package in Verdaccio).

Week 5 — Automated detection rules (fail builds, create issues, generate alerts).

Week 6 — Signing & attestations (cosign + attach SBOM attestations).

Week 7 — Recovery & remediation automation (auto-PRs, auto-rollback, Ansible scripts).

Week 8 — Threat modelling + MITRE mapping (map simulated attacks to ATT&CK primitives & document).

Week 9 — Hardening pipeline & access controls (least privilege, protected branches, token hygiene).

Week 10 — Metrics, dashboards & reporting (small Flask/Kibana-like dashboard or GitHub Issues dashboard).

Week 11 — Polish, demo video, README & playbook (create 7-minute demo and 1-page executive summary).

Week 12 — Outreach & validation (post a walkthrough, link on LinkedIn/GitHub, prepare interview talking points).
