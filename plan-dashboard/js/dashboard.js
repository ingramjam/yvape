// ============================================================================
// YVAPE PROJECT PLAN DASHBOARD - JavaScript
// ============================================================================

let planData = null;
let researchData = null;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  initializeStorage();
});

// ============================================================================
// DATA LOADING
// ============================================================================

async function loadData() {
  try {
    // Load plan phases data
    const planResponse = await fetch('./data/plan-phases.json');
    planData = await planResponse.json();

    // Load research data
    const researchResponse = await fetch('./data/research.json');
    researchData = await researchResponse.json();

    // Render plan tab
    renderPlanTab();

    // Render research tab
    renderResearchTab();
  } catch (error) {
    console.error('Error loading data:', error);
    document.body.innerHTML =
      '<div style="padding: 40px; text-align: center;"><h2>Error loading dashboard data. Please ensure plan-phases.json and research.json are in the data/ folder.</h2></div>';
  }
}

// ============================================================================
// PLAN TAB RENDERING
// ============================================================================

function renderPlanTab() {
  const planContent = document.getElementById('plan-content');

  // Render phases
  let phasesHTML = '';
  planData.phases.forEach((phase, index) => {
    const phaseTasks = phase.tasks || [];
    const completedTasks = phaseTasks.filter((t) => isTaskCompleted(t.id)).length;

    phasesHTML += `
      <div class="phase" data-phase-id="${phase.id}">
        <div class="phase-header" onclick="togglePhase(${phase.id})">
          <div>
            <div class="phase-title">
              Phase ${phase.id}: ${phase.name}
            </div>
            <div class="phase-meta">
              <span class="phase-badge">${phase.duration}</span>
              <span class="phase-badge">${completedTasks}/${phaseTasks.length} tasks</span>
              <span class="phase-badge">${phase.owner}</span>
            </div>
          </div>
          <div class="phase-toggle">▼</div>
        </div>
        <div class="phase-body">
          <div class="phase-description">${phase.description}</div>
          <div class="tasks">
            ${phaseTasks.map((task) => renderTask(task)).join('')}
          </div>
        </div>
      </div>
    `;
  });

  planContent.innerHTML = phasesHTML;

  // Restore phase states from localStorage
  planData.phases.forEach((phase) => {
    if (isPhaseOpen(phase.id)) {
      togglePhase(phase.id);
    }
  });
}

function renderTask(task) {
  const isCompleted = isTaskCompleted(task.id);
  const isApproved = task.approved || false;

  const linksHTML =
    Object.keys(task.links || {}).length > 0
      ? `
    <div class="task-links">
      ${Object.entries(task.links)
        .map(([label, url]) => {
          if (!url) return '';
          const href = url.startsWith('http') ? url : '#';
          const target = url.startsWith('http') ? 'target="_blank"' : '';
          return `<a href="${href}" ${target}>${label}</a>`;
        })
        .join('')}
    </div>
  `
      : '';

  return `
    <div class="task ${isCompleted ? 'completed' : ''}" data-task-id="${task.id}">
      <div class="task-checkbox">
        <input type="checkbox" ${isCompleted ? 'checked' : ''} 
               onchange="toggleTask(this, '${task.id}')">
        <div class="task-name">${task.name}</div>
      </div>
      ${isApproved ? '<span class="approved-badge">✓ Approved</span>' : ''}
      <div class="task-owner">👤 ${task.owner}</div>
      <div class="task-description">${task.description}</div>
      <div class="task-duration">⏱ ${task.duration}</div>
      <div class="task-meta">
        <span class="status-badge ${task.status}">${task.status}</span>
        ${task.dependencies ? `<span style="color: #999; font-size: 0.85em;">Depends on: ${task.dependencies.join(', ')}</span>` : ''}
      </div>
      ${linksHTML}
    </div>
  `;
}

// ============================================================================
// RESEARCH TAB RENDERING
// ============================================================================

function renderResearchTab() {
  const researchContent = document.getElementById('research-content');

  const statsHTML = `
    <div class="stats-grid">
      <div class="stat-box">
        <h3>CA Youth Vaping Nicotine</h3>
        <div class="number">14.5%</div>
        <p style="font-size: 0.9em; opacity: 0.9;">Down 46% from 2019 peak</p>
      </div>
      <div class="stat-box">
        <h3>CA Youth Using Marijuana</h3>
        <div class="number">11.2%</div>
        <p style="font-size: 0.9em; opacity: 0.9;">Past 30 days (HS students)</p>
      </div>
      <div class="stat-box">
        <h3>Vaping Marijuana in CA</h3>
        <div class="number">7.3%</div>
        <p style="font-size: 0.9em; opacity: 0.9;">Fastest growing category</p>
      </div>
      <div class="stat-box">
        <h3>Evidence-Based Intervention Success</h3>
        <div class="number">35-45%</div>
        <p style="font-size: 0.9em; opacity: 0.9;">Quit rate (programs like YVAPE)</p>
      </div>
    </div>
  `;

  const factsHTML = `
    <div class="facts-container">
      ${researchData.facts.map((fact) => renderFact(fact)).join('')}
    </div>
  `;

  const sourcesHTML = `
    <div class="research-sources">
      <h3>📚 Research Sources & Further Reading</h3>
      <div class="sources-list">
        ${researchData.sources
          .map(
            (source) => `
          <div class="source-item">
            <a href="${source.url}" target="_blank">${source.title}</a>
            <div style="font-size: 0.85em; color: #666; margin-bottom: 5px;">
              Published: ${source.year}
            </div>
            <div class="source-credibility">${source.credibility}</div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  researchContent.innerHTML = `
    <h2 style="color: #667eea; margin-bottom: 30px; font-size: 2em;">
      📊 California Youth Substance Use: Key Facts & Research
    </h2>
    ${statsHTML}
    <h2 style="color: #667eea; margin-top: 50px; margin-bottom: 30px; font-size: 1.8em;">
      🔍 Top Research Findings (12-19 Year Olds in California)
    </h2>
    ${factsHTML}
    <h2 style="color: #667eea; margin-top: 50px; margin-bottom: 20px; font-size: 1.8em;">
      📖 Sources for Further Research
    </h2>
    ${sourcesHTML}
    <div style="margin-top: 40px; padding: 20px; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #667eea;">
      <h3 style="color: #333; margin-bottom: 12px;">About YVAPE's Mission</h3>
      <p style="color: #666; line-height: 1.6;">
        YVAPE (Youth Vaping Alternative Program Education) serves as a free alternative to suspension, 
        providing evidence-based educational content, coaching support, and reporting tools to California 
        public schools. These research facts demonstrate the critical need for interventions like YVAPE 
        to help adolescents navigate the complex landscape of nicotine and marijuana use.
      </p>
    </div>
  `;
}

function renderFact(fact) {
  return `
    <div class="fact-card">
      <div class="fact-icon">${fact.icon}</div>
      <div class="fact-stat">${fact.stat}</div>
      <div class="fact-title">${fact.title}</div>
      <div class="fact-demographic">${fact.demographic}</div>
      <div class="fact-description">${fact.description}</div>
      <div class="fact-trend"><strong>Trend:</strong> ${fact.trend}</div>
      <div class="fact-source">
        <strong>Source:</strong> ${fact.sourceName || fact.source}
        ${fact.sourceUrl ? `<br><a href="${fact.sourceUrl}" target="_blank">View Research →</a>` : ''}
      </div>
    </div>
  `;
}

// ============================================================================
// TAB SWITCHING
// ============================================================================

function setupEventListeners() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Remove active class from all
      tabButtons.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      // Add active class to clicked
      button.classList.add('active');
      tabContents[index].classList.add('active');

      // Save preference
      localStorage.setItem('activeTab', index);
    });
  });

  // Restore active tab
  const savedTab = localStorage.getItem('activeTab') || '0';
  tabButtons[savedTab]?.click();
}

// ============================================================================
// PHASE TOGGLE
// ============================================================================

function togglePhase(phaseId) {
  const phaseElement = document.querySelector(`[data-phase-id="${phaseId}"]`);
  if (!phaseElement) return;

  phaseElement.classList.toggle('open');

  // Save state to localStorage
  const openPhases = getOpenPhases();
  if (phaseElement.classList.contains('open')) {
    openPhases.add(phaseId);
  } else {
    openPhases.delete(phaseId);
  }
  localStorage.setItem('openPhases', JSON.stringify(Array.from(openPhases)));
}

function isPhaseOpen(phaseId) {
  return getOpenPhases().has(phaseId);
}

function getOpenPhases() {
  const saved = localStorage.getItem('openPhases');
  return new Set(saved ? JSON.parse(saved).map(Number) : []);
}

// ============================================================================
// TASK COMPLETION
// ============================================================================

function toggleTask(checkbox, taskId) {
  const task = document.querySelector(`[data-task-id="${taskId}"]`);

  if (checkbox.checked) {
    task.classList.add('completed');
    saveTaskCompletion(taskId, true);
  } else {
    task.classList.remove('completed');
    saveTaskCompletion(taskId, false);
  }

  // Update phase progress
  updatePhaseProgress(taskId);
}

function isTaskCompleted(taskId) {
  const completed = getCompletedTasks();
  return completed.has(taskId);
}

function getCompletedTasks() {
  const saved = localStorage.getItem('completedTasks');
  return new Set(saved ? JSON.parse(saved) : []);
}

function saveTaskCompletion(taskId, isCompleted) {
  const completed = getCompletedTasks();

  if (isCompleted) {
    completed.add(taskId);
  } else {
    completed.delete(taskId);
  }

  localStorage.setItem('completedTasks', JSON.stringify(Array.from(completed)));
}

function updatePhaseProgress(taskId) {
  // Find which phase this task belongs to
  const task = planData.phases
    .flatMap((p) => p.tasks)
    .find((t) => t.id === taskId);

  if (!task) return;

  const phase = planData.phases.find((p) =>
    p.tasks.some((t) => t.id === taskId)
  );

  if (phase) {
    const phaseElement = document.querySelector(
      `[data-phase-id="${phase.id}"] .phase-header`
    );
    const completed = phase.tasks.filter((t) =>
      isTaskCompleted(t.id)
    ).length;
    const total = phase.tasks.length;

    // Find and update the progress badge
    const badges = phaseElement.querySelectorAll('.phase-badge');
    if (badges[1]) {
      badges[1].textContent = `${completed}/${total} tasks`;
    }
  }
}

// ============================================================================
// STORAGE INITIALIZATION
// ============================================================================

function initializeStorage() {
  // Initialize with empty data if not present
  if (!localStorage.getItem('completedTasks')) {
    localStorage.setItem('completedTasks', '[]');
  }

  if (!localStorage.getItem('openPhases')) {
    localStorage.setItem('openPhases', '[]');
  }
}

// ============================================================================
// EXPORT & IMPORT
// ============================================================================

function exportProgress() {
  const completed = getCompletedTasks();
  const openPhases = getOpenPhases();

  const data = {
    exportDate: new Date().toISOString(),
    completedTasks: Array.from(completed),
    openPhases: Array.from(openPhases),
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yvape-plan-progress-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}

function resetProgress() {
  if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
    localStorage.removeItem('completedTasks');
    localStorage.removeItem('openPhases');
    location.reload();
  }
}

// ============================================================================
// PRINT DASHBOARD
// ============================================================================

function printDashboard() {
  window.print();
}
