// =============================
// projects.js - Innovative Masonry Projects
// =============================

async function loadProjects() {
  const res = await fetch('data/projects.json');
  const projects = await res.json();
  const grid = document.getElementById('projects-grid');
  const tabs = document.getElementById('projects-tabs');
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const aiSection = document.getElementById('ai-projects');
  const aiGrid = document.getElementById('ai-projects-grid');
  // Tab filter logic
  let currentFilter = 'All';
  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      // Toggle AI Projects section
      if (currentFilter === 'AI/ML') {
        grid.style.display = 'none';
        aiSection.style.display = 'block';
        renderAIProjects();
      } else {
        grid.style.display = 'grid';
        aiSection.style.display = 'none';
        renderProjects();
      }
    };
  });
  // On load, hide AI Projects section
  aiSection.style.display = 'none';

  function renderProjects() {
    grid.innerHTML = '';
    let filtered = projects;
    if (currentFilter !== 'All') {
      filtered = projects.filter(p => (p.category || 'Other') === currentFilter);
    }
    filtered.forEach((proj, i) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', (i * 80).toString());
      card.innerHTML = `
        <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail" loading="lazy">
        <div class="project-title">${proj.title}</div>
        <div class="project-desc">${proj.description}</div>
        <div class="project-tech">${(proj.tech || []).join(', ')}</div>
        <div class="project-overlay">
          <div class="project-overlay-title">${proj.title}</div>
          <div class="project-overlay-desc">${proj.description}</div>
          <div class="project-overlay-links">
            <a href="${proj.github}" target="_blank">GitHub</a>
          </div>
        </div>
      `;
      card.onclick = () => openModal(proj);
      grid.appendChild(card);
    });
    AOS.refresh();
  }

  function renderAIProjects() {
    aiGrid.innerHTML = '';
    const aiProjects = projects.filter(p => (p.category || 'Other') === 'AI/ML');
    aiProjects.forEach((proj, i) => {
      const card = document.createElement('div');
      card.className = 'ai-project-card';
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', (i * 80).toString());
      card.innerHTML = `
        <img src="${proj.image}" alt="${proj.title}" class="ai-project-thumbnail" loading="lazy">
        <div class="ai-project-title">${proj.title}</div>
        <div class="ai-project-desc">${proj.description}</div>
        <div class="ai-project-meta">${(proj.tech || []).join(', ')}</div>
        <div class="ai-project-io"><strong>Input:</strong> ${proj.input_example || 'N/A'}</div>
        <div class="ai-project-io"><strong>Output:</strong> ${proj.output_example || 'N/A'}</div>
        <div class="ai-project-meta"><strong>Dataset:</strong> ${proj.dataset || 'N/A'} | <strong>Accuracy:</strong> ${proj.accuracy || 'N/A'}</div>
        <div class="ai-project-links">
          <a href="${proj.github}" target="_blank">GitHub</a>
        </div>
      `;
      aiGrid.appendChild(card);
    });
    AOS.refresh();
  }

  function openModal(proj) {
    // Modal content without arrows
    modalBody.innerHTML = `
      <div class="carousel">
        <img src="${proj.image}" alt="${proj.title}" class="carousel-img">
      </div>
      <div class="modal-title">${proj.title}</div>
      <div class="modal-desc">${proj.description}</div>
      <div class="modal-tech">${(proj.tech || []).join(', ')}</div>
      <div class="modal-links">
        <a href="${proj.github}" target="_blank">GitHub</a>
      </div>
    `;
    modal.style.display = 'flex';
  }

  modalClose.onclick = () => { modal.style.display = 'none'; };
  window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

  renderProjects();
}

document.addEventListener('DOMContentLoaded', loadProjects); 