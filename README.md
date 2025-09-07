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

Day 01:

# ✅ Step 1: Create GitHub repo

1. Go to [GitHub](https://github.com/new).
2. Repository name: `supplychain-sentinel`.
3. Public (so others can see your journey).
4. Initialize **without** README (we’ll add ours).
5. Create repo.

---

# ✅ Step 2: Clone locally

In your terminal:

```bash
git clone https://github.com/<your-username>/supplychain-sentinel.git
cd supplychain-sentinel
```

---

# ✅ Step 3: Create folder structure

```bash
mkdir demo-app ci infra docs
```

Now your tree looks like:

```
supplychain-sentinel/
  ├── demo-app/
  ├── ci/
  ├── infra/
  └── docs/
```

---

# ✅ Step 4: Add `.gitignore`

In root:

```bash
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
```

Check with:

```bash
cat .gitignore
```

Should show:

```
node_modules/
.env
```

---

# ✅ Step 5: Add README with project pitch + roadmap

Create `README.md` in root:

```markdown
# SupplyChain Sentinel

**Goal:** Build a reproducible lab to explore software supply chain security, from local dev to CI/CD pipeline.

## Week 1 Plan — Project scaffolding
- ✅ Day 1: GitHub repo + skeleton
- ⬜ Day 2: Minimal Node.js demo app
- ⬜ Day 3: Local npm registry (Verdaccio) via docker-compose
- ⬜ Day 4: Publish demo-app to local registry
- ⬜ Day 5: First GitHub Actions CI workflow

---

### 12-week Roadmap (high level)

1. **Week 1:** Scaffolding, registry, first CI workflow  
2. **Week 2:** SBOM generation & dependency scanning  
3. **Week 3:** Container image scanning  
4. **Week 4:** Secrets detection & policy checks  
5. **Week 5:** Signing & verification basics  
6. **Week 6:** Deploy to test infra  
7. **Week 7:** Runtime monitoring basics  
8. **Week 8:** Attack simulation (supply-chain scenarios)  
9. **Week 9:** Secure pipeline improvements  
10. **Week 10:** Policy enforcement as code  
11. **Week 11:** Reporting & dashboards  
12. **Week 12:** Final polish + presentation
```

---

# ✅ Step 6: First commit + push

```bash
git add .
git commit -m "Day 1: repo skeleton + README roadmap"
git push origin main
```

---

# 🎯 Deliverable

* Repo exists on GitHub.
* Has folders: `demo-app/`, `ci/`, `infra/`, `docs/`.
* `.gitignore` in place.
* `README.md` with short pitch + roadmap.
* First commit pushed.


Day 02:

# Goal of Day 2

We want a **tiny Node.js app** so we can simulate dependency attacks later. It should:

* Run locally.
* Use some dependencies (like Express and Axios).
* Have a **test stub** to integrate with CI/CD later.



# **Step 1 — Go into your app folder**

```bash
cd demo-app
```

**What it does:** Moves your terminal into the folder where your app lives.

**Why:** All the following npm commands must run **inside the project folder**, otherwise npm won’t know which project to work on.

---

# **Step 2 — Initialize npm**

```bash
npm init -y
```

**What it does:** Creates a `package.json` file — the “manifest” of your Node.js project.

**Why:**

* Tracks the app’s **name, version, and dependencies**.
* Lets npm manage packages and scripts for your project.
* `-y` just accepts defaults so you don’t answer prompts.

**npm helps:** It manages your project’s dependencies and scripts so everything can be reproduced later.

---

# **Step 3 — Install dependencies**

```bash
npm install express axios
```

**What it does:**

* Installs **Express** → tiny web server framework.
* Installs **Axios** → tool to make HTTP requests.
* Creates a `node_modules/` folder with the packages.
* Updates `package.json` to record the dependencies.

**Why:**

* Express is needed to run our web app.
* Axios will be useful later for simulating network requests or dependency calls.

**npm helps:** Automatically downloads, installs, and tracks packages for your project.

---

# **Step 4 — Create `index.js`**

```js
const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => res.send('hello from supplychain sentinel'));

app.listen(3000, () => console.log('listening on port 3000'));
```

**What it does:**

* Starts a **web server** on port 3000.
* When you visit localhost:3000, it responds with a message.

**Why:** Gives you a **running app** to experiment with and later test dependency attacks.

**npm helps:** The dependencies (Express, Axios) are installed via npm and used in the code.

---

# **Step 5 — Add a trivial test**

```bash
npm install --save-dev jest
```

Then in `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "test": "node -e \"console.log('ok')\""
}
```

**What it does:**

* Installs **Jest** (test framework) for dev only.
* Adds scripts:

  * `npm start` → runs your app.
  * `npm test` → prints “ok” (placeholder).

**Why:**

* Even a trivial test allows your **CI/CD pipeline to run**.
* Sets up the structure for real tests later.

**npm helps:** Manages dev dependencies and lets you run scripts easily.

---

# **Step 6 — Run the app**

```bash
npm start
```

or

```bash
node index.js
```

**What it does:** Starts your web server.

**Check:** Open browser → [http://localhost:3000](http://localhost:3000) → should see:

```
hello from supplychain sentinel
```

---

# **Step 7 — Commit to Git**

```bash
git add demo-app
git commit -m "Day 2: minimal demo Node.js app with test stub"
git push
```

**What it does:**

* Saves your changes locally and then pushes to GitHub.

**Why:** Keeps track of progress and ensures your work is safely stored.

**Troubles you faced:**

* Merge conflicts → resolved by editing `.gitignore`.
* JSON/script errors → fixed quotes in `package.json`.
* Running app → you needed to actually **start the server**.

---

# ✅ **Summary**

* npm helps by:

  * Managing packages (`express`, `axios`).
  * Keeping a record of dependencies in `package.json`.
  * Running scripts (`start`, `test`).
* Day 2 output:

  * `demo-app/index.js` → running web app.
  * `package.json` → dependencies + scripts.
  * Commit pushed to GitHub.
