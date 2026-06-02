/* app.js */

const AppState = {
  theme: 'light',
  activeTab: 'showcase',
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupCatalogInteractions();
  setupInteractiveDemos();
  setupSidebarNavigation();
  initTokenSearch();
});

function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('admin-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    enableDarkMode();
  } else {
    enableLightMode();
  }

  toggleBtn.addEventListener('click', () => {
    if (AppState.theme === 'light') {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  });
}

function enableDarkMode() {
  document.body.classList.add('dark-theme');
  AppState.theme = 'dark';
  localStorage.setItem('admin-theme', 'dark');
  
  const toggleIcon = document.querySelector('#theme-toggle i');
  const toggleText = document.querySelector('#theme-toggle span');
  if (toggleIcon) toggleIcon.className = 'fas fa-sun';
  if (toggleText) toggleText.textContent = 'Light Mode';
}

function enableLightMode() {
  document.body.classList.remove('dark-theme');
  AppState.theme = 'light';
  localStorage.setItem('admin-theme', 'light');
  
  const toggleIcon = document.querySelector('#theme-toggle i');
  const toggleText = document.querySelector('#theme-toggle span');
  if (toggleIcon) toggleIcon.className = 'fas fa-moon';
  if (toggleText) toggleText.textContent = 'Dark Mode';
}

function setupCatalogInteractions() {
  const interactButtons = document.querySelectorAll('.demo-btn-action');
  const logTerminal = document.getElementById('interactive-terminal-logs');
  
  interactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const variant = btn.getAttribute('data-variant') || 'default';
      const timestamp = new Date().toLocaleTimeString();
      
      if (logTerminal) {
        const logLine = document.createElement('div');
        logLine.className = 'terminal-line';
        logLine.innerHTML = `<span class="term-time">[${timestamp}]</span> Action triggered: <span class="term-variant text-${variant}">${variant.toUpperCase()}</span> button clicked. Transition duration: <span class="term-timing">150ms</span>.`;
        logTerminal.prepend(logLine);
        
        if (logTerminal.children.length > 10) {
          logTerminal.removeChild(logTerminal.lastChild);
        }
      }
    });
  });

  const clearLogsBtn = document.getElementById('clear-logs-btn');
  if (clearLogsBtn && logTerminal) {
    clearLogsBtn.addEventListener('click', () => {
      logTerminal.innerHTML = '<div class="terminal-line placeholder">Click any button or interactive element to inspect the design token action pipeline here...</div>';
    });
  }
}

function setupInteractiveDemos() {
  const spacingSelect = document.getElementById('spacing-demo-select');
  const radiusSelect = document.getElementById('radius-demo-select');
  const demoTarget = document.getElementById('demo-target-box');
  
  if (spacingSelect && demoTarget) {
    spacingSelect.addEventListener('change', (e) => {
      const selectedToken = e.target.value;
      demoTarget.style.padding = selectedToken;
      
      const spacingValueLabel = document.getElementById('spacing-value-label');
      if (spacingValueLabel) {
        spacingValueLabel.textContent = selectedToken;
      }
    });
  }

  if (radiusSelect && demoTarget) {
    radiusSelect.addEventListener('change', (e) => {
      const selectedToken = e.target.value;
      demoTarget.style.borderRadius = selectedToken;
      
      const radiusValueLabel = document.getElementById('radius-value-label');
      if (radiusValueLabel) {
        radiusValueLabel.textContent = selectedToken;
      }
    });
  }
}

function setupSidebarNavigation() {
  const navItems = document.querySelectorAll('.sidebar-nav-item');
  const contentSections = document.querySelectorAll('.dashboard-section');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSectionId = item.getAttribute('data-target');
      if (!targetSectionId) return;
      
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      contentSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSectionId) {
          section.classList.add('active');
        }
      });
      
      AppState.activeTab = targetSectionId;
    });
  });
}

function initTokenSearch() {
  const searchInput = document.getElementById('token-search-input');
  const tokenCards = document.querySelectorAll('.token-showcase-item');
  
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    tokenCards.forEach(card => {
      const name = card.getAttribute('data-token-name').toLowerCase();
      const desc = card.getAttribute('data-token-description') ? card.getAttribute('data-token-description').toLowerCase() : '';
      
      if (name.includes(query) || desc.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
