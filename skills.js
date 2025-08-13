// =============================
// skills.js - Innovative Circular Skills
// =============================

async function loadSkills() {
  const res = await fetch('data/skills.json');
  const data = await res.json();
  const categories = Object.keys(data);
  const chipsBar = document.getElementById('skills-chips');
  const grid = document.getElementById('skills-circular-grid');
  const detail = document.getElementById('skill-detail');

  // Render filter chips
  chipsBar.innerHTML = '';
  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.className = 'chip-btn' + (i === 0 ? ' active' : '');
    btn.onclick = () => renderSkills(cat, true);
    chipsBar.appendChild(btn);
  });

  function renderSkills(category, animate = false) {
    grid.innerHTML = '';
    detail.style.display = 'none';
    const skills = data[category];
    const n = skills.length;
    const radius = 160;
    const centerX = 210, centerY = 210;
    skills.forEach((skill, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle) - 45;
      const y = centerY + radius * Math.sin(angle) - 45;
      const item = document.createElement('div');
      item.className = 'skill-circle-item';
      item.style.left = x + 'px';
      item.style.top = y + 'px';
      item.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
      item.onclick = () => showSkillDetail(skill);
      grid.appendChild(item);
    });
    // Animate chips
    Array.from(chipsBar.children).forEach(btn => btn.classList.remove('active'));
    Array.from(chipsBar.children).find(btn => btn.textContent === category).classList.add('active');
  }

  function showSkillDetail(skill) {
    detail.innerHTML = `
      <h4>${skill.name}</h4>
      <div class="skill-bar-bg"><div class="skill-bar-fill"></div></div>
      <p>${skill.desc || 'Proficient and experienced.'}</p>
    `;
    detail.style.display = 'block';
    setTimeout(() => {
      const fill = detail.querySelector('.skill-bar-fill');
      fill.style.width = (skill.level || 90) + '%';
    }, 100);
  }

  // Default: show first category
  renderSkills(categories[0]);
}

document.addEventListener('DOMContentLoaded', loadSkills); 