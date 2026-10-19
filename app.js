/**
 * TileLaunch Landing Page Interactive Engine
 * Handles Metro Accents, 3D Tile Simulator, Turnstile Physics & Audio Haptics
 */

// --- 21 Authentic Metro Accents (Monochrome Black & White as Default) ---
const METRO_ACCENTS = [
  { key: 'mono', name: 'Monochrome', hex: '#000000', rgb: '0, 0, 0', text: '#FFFFFF', desc: 'Authentic Swiss high-contrast monochrome. Stark black on crisp white background.' },
  { key: 'cyan', name: 'Cyan', hex: '#1BA1E2', rgb: '27, 161, 226', text: '#FFFFFF', desc: 'The iconic Nokia Lumia signature electric cyan.' },
  { key: 'teal', name: 'Teal', hex: '#00ABA9', rgb: '0, 171, 169', text: '#FFFFFF', desc: 'Deep sea mineral tone with crisp contrast.' },
  { key: 'lime', name: 'Lime', hex: '#A4C400', rgb: '164, 196, 0', text: '#000000', desc: 'Vibrant neon green energy with bold personality.' },
  { key: 'green', name: 'Green', hex: '#60A917', rgb: '96, 169, 23', text: '#FFFFFF', desc: 'Natural lush foliage emerald hue.' },
  { key: 'emerald', name: 'Emerald', hex: '#008A00', rgb: '0, 138, 0', text: '#FFFFFF', desc: 'Deep, rich dark forest green.' },
  { key: 'cobalt', name: 'Cobalt', hex: '#0050EF', rgb: '0, 80, 239', text: '#FFFFFF', desc: 'Pure electric blue with deep saturation.' },
  { key: 'indigo', name: 'Indigo', hex: '#6A00FF', rgb: '106, 0, 255', text: '#FFFFFF', desc: 'Ultraviolet twilight violet with velvet richness.' },
  { key: 'violet', name: 'Violet', hex: '#AA00FF', rgb: '170, 0, 255', text: '#FFFFFF', desc: 'High-voltage electric purple.' },
  { key: 'pink', name: 'Pink', hex: '#F472D0', rgb: '244, 114, 208', text: '#000000', desc: 'Playful neon bubblegum pink.' },
  { key: 'magenta', name: 'Magenta', hex: '#D80073', rgb: '216, 0, 115', text: '#FFFFFF', desc: 'The legendary Lumia 900 flagship magenta.' },
  { key: 'crimson', name: 'Crimson', hex: '#A20025', rgb: '162, 0, 37', text: '#FFFFFF', desc: 'Classic deep wine red with regal depth.' },
  { key: 'red', name: 'Red', hex: '#E51400', rgb: '229, 20, 0', text: '#FFFFFF', desc: 'High-impact cardinal red.' },
  { key: 'orange', name: 'Orange', hex: '#FA6800', rgb: '250, 104, 0', text: '#FFFFFF', desc: 'Iconic Lumia 930 fiery sunset orange.' },
  { key: 'amber', name: 'Amber', hex: '#F0A30A', rgb: '240, 163, 10', text: '#000000', desc: 'Warm honey golden amber.' },
  { key: 'yellow', name: 'Yellow', hex: '#E3C800', rgb: '227, 200, 0', text: '#000000', desc: 'The unforgettable Lumia 1020 camera yellow.' },
  { key: 'brown', name: 'Brown', hex: '#825A2C', rgb: '130, 90, 44', text: '#FFFFFF', desc: 'Rich espresso leather tone.' },
  { key: 'olive', name: 'Olive', hex: '#6D8764', rgb: '109, 135, 100', text: '#FFFFFF', desc: 'Subtle earthy sage olive.' },
  { key: 'steel', name: 'Steel', hex: '#647687', rgb: '100, 118, 135', text: '#FFFFFF', desc: 'Modern industrial slate steel blue.' },
  { key: 'mauve', name: 'Mauve', hex: '#76608A', rgb: '118, 96, 138', text: '#FFFFFF', desc: 'Muted atmospheric lavender mauve.' },
  { key: 'taupe', name: 'Taupe', hex: '#87794E', rgb: '135, 121, 78', text: '#FFFFFF', desc: 'Warm architectural sandstone taupe.' }
];

let activeAccent = METRO_ACCENTS[0];
let soundEnabled = true;
let audioCtx = null;

// --- Web Audio Tactile Haptic Synthesis ---
function playTactileClick(type = 'click') {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    if (type === 'tile') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(360, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    }
  } catch (e) {
    // AudioContext blocked by browser policy until interaction
  }
}

// --- Accent Theme Switcher ---
function setMetroAccent(accentKey) {
  const match = METRO_ACCENTS.find(a => a.key === accentKey) || METRO_ACCENTS[0];
  activeAccent = match;

  const isLight = document.documentElement.getAttribute('data-theme') === 'light' || !document.documentElement.getAttribute('data-theme');
  const effectiveHex = (match.key === 'mono' && isLight) ? '#000000' : (match.key === 'mono' ? '#FFFFFF' : match.hex);
  const effectiveText = (match.key === 'mono' && isLight) ? '#FFFFFF' : (match.key === 'mono' ? '#000000' : (match.text || '#FFFFFF'));
  const effectiveRgb = (match.key === 'mono' && isLight) ? '0, 0, 0' : (match.key === 'mono' ? '255, 255, 255' : match.rgb);

  // Apply accent colors ONLY to the simulator container!
  const sim = document.getElementById('simulator');
  if (sim) {
    sim.style.setProperty('--accent', effectiveHex);
    sim.style.setProperty('--accent-rgb', effectiveRgb);
    sim.style.setProperty('--accent-text', effectiveText);
    sim.style.setProperty('--accent-glow', `rgba(${effectiveRgb}, ${match.key === 'mono' ? '0.12' : '0.4'})`);
    sim.style.setProperty('--tile-bg', effectiveHex);
    sim.style.setProperty('--tile-text', effectiveText);
  }

  // Update quick swatch indicators in the nav
  document.querySelectorAll('.swatch-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.accent === match.key);
  });

  // Update Studio grid swatches
  document.querySelectorAll('.color-swatch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.accent === match.key);
    if (btn.dataset.accent === 'mono') {
      btn.style.backgroundColor = isLight ? '#000000' : '#FFFFFF';
      const span = btn.querySelector('.color-swatch-name');
      if (span) span.style.color = isLight ? '#FFFFFF' : '#000000';
    }
  });

  // Update Studio Info Card specifically (does not affect the rest of the website)
  const title = document.getElementById('studioAccentTitle');
  const code = document.getElementById('studioAccentHex');
  const desc = document.getElementById('studioAccentDesc');
  const preview = document.getElementById('studioColorPreview');

  if (title) title.textContent = match.name;
  if (code) {
    code.textContent = `${effectiveHex} • rgb(${effectiveRgb})`;
    code.style.color = effectiveHex;
  }
  if (desc) desc.textContent = match.desc;
  if (preview) {
    preview.style.background = effectiveHex;
    preview.style.boxShadow = `0 8px 20px rgba(${effectiveRgb}, 0.35)`;
  }
}

// --- Status Bar Clock ---
function updateLiveClock() {
  const clockEl = document.getElementById('phoneClock');
  if (!clockEl) return;
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  clockEl.textContent = `${hours}:${minutes} ${ampm}`;
}

// --- Initialize Simulator ---
function setupPhoneSimulator() {
  const slider = document.getElementById('phoneScreensSlider');
  const startBtn = document.getElementById('simTabStart');
  const appsBtn = document.getElementById('simTabApps');
  const hintToApps = document.getElementById('simNavHint');
  const gridLayout = document.getElementById('phoneTilesGrid');
  const eraToggleBtn = document.getElementById('simEraToggle');
  const soundToggleBtn = document.getElementById('simSoundToggle');
  const flipAllBtn = document.getElementById('simFlipTilesBtn');

  // Page Switcher (Start vs All Apps)
  function showStart() {
    if (slider) slider.style.transform = 'translateX(0%)';
    if (startBtn) startBtn.classList.add('active');
    if (appsBtn) appsBtn.classList.remove('active');
    playTactileClick('tab');
  }

  function showApps() {
    if (slider) slider.style.transform = 'translateX(-50%)';
    if (appsBtn) appsBtn.classList.add('active');
    if (startBtn) startBtn.classList.remove('active');
    playTactileClick('tab');
  }

  if (startBtn) startBtn.addEventListener('click', showStart);
  if (appsBtn) appsBtn.addEventListener('click', showApps);
  if (hintToApps) hintToApps.addEventListener('click', showApps);

  // Era Switcher (Modern 4-Column vs Classic 2-Column Lumia)
  let isClassicEra = false;
  if (eraToggleBtn && gridLayout) {
    eraToggleBtn.addEventListener('click', () => {
      isClassicEra = !isClassicEra;
      gridLayout.classList.toggle('classic-2col', isClassicEra);
      eraToggleBtn.classList.toggle('active', isClassicEra);
      eraToggleBtn.title = isClassicEra ? 'Layout: Classic 2-Column' : 'Layout: Modern 4-Column';
      playTactileClick('tab');
    });
  }

  // Audio Toggle
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.style.opacity = soundEnabled ? '1' : '0.4';
      if (soundEnabled) playTactileClick('click');
    });
  }

  // Flip Live Tiles
  if (flipAllBtn) {
    flipAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.flip-tile-wrapper').forEach(tile => {
        tile.classList.toggle('flipped');
      });
      playTactileClick('tile');
    });
  }

  // Automatic Tile Flips (Weather & Calendar)
  setInterval(() => {
    const weather = document.getElementById('weatherTileWrapper');
    if (weather) weather.classList.toggle('flipped');
  }, 4800);

  setInterval(() => {
    const calendar = document.getElementById('calendarTileWrapper');
    if (calendar) calendar.classList.toggle('flipped');
  }, 6200);

  // Photos Slideshow
  const photoBg = document.getElementById('photoLiveTileBg');
  const photos = ['assets/sample_nature.jpg', 'assets/sample_city.jpg'];
  let photoIdx = 0;
  setInterval(() => {
    if (photoBg) {
      photoIdx = (photoIdx + 1) % photos.length;
      photoBg.style.backgroundImage = `url('${photos[photoIdx]}')`;
    }
  }, 5000);

  // 3D Turnstile Tilt Effect on All Tiles
  const tiles = document.querySelectorAll('.metro-tile');
  tiles.forEach(tile => {
    tile.addEventListener('pointerdown', (e) => {
      playTactileClick('tile');
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 12;
      const rotateY = (x / (rect.width / 2)) * 12;

      tile.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.96)`;
    });

    const resetTile = () => {
      tile.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    tile.addEventListener('pointerup', resetTile);
    tile.addEventListener('pointerleave', resetTile);
    tile.addEventListener('pointercancel', resetTile);
  });

  // App Search Filter in Drawer
  const searchInput = document.getElementById('appSearchInput');
  const appItems = document.querySelectorAll('.app-list-item');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      appItems.forEach(item => {
        const name = item.querySelector('.app-list-name')?.textContent.toLowerCase() || '';
        item.style.display = name.includes(query) ? 'flex' : 'none';
      });
    });
  }

  // Quick Jump Letter Matrix Modal
  const matrixOverlay = document.getElementById('jumpMatrixOverlay');
  const letterHeaders = document.querySelectorAll('.app-letter-header');
  const matrixCells = document.querySelectorAll('.matrix-cell');

  letterHeaders.forEach(header => {
    header.addEventListener('click', () => {
      if (matrixOverlay) matrixOverlay.classList.add('active');
      playTactileClick('tab');
    });
  });

  if (matrixOverlay) {
    matrixOverlay.addEventListener('click', (e) => {
      if (e.target === matrixOverlay || e.target.closest('.matrix-close-hint')) {
        matrixOverlay.classList.remove('active');
      }
    });
  }

  matrixCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const targetLetter = cell.textContent.trim().toLowerCase();
      if (matrixOverlay) matrixOverlay.classList.remove('active');
      
      // Scroll to that letter in apps drawer
      const headers = Array.from(document.querySelectorAll('.app-letter-header'));
      const found = headers.find(h => h.textContent.trim().toLowerCase() === targetLetter);
      if (found) {
        found.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      playTactileClick('click');
    });
  });
}

// --- Build Color Studio Grid ---
function setupColorStudio() {
  const grid = document.getElementById('colorStudioPalette');
  if (!grid) return;

  grid.innerHTML = '';
  METRO_ACCENTS.forEach(accent => {
    const btn = document.createElement('button');
    btn.className = `color-swatch-btn ${accent.key === activeAccent.key ? 'active' : ''}`;
    btn.dataset.accent = accent.key;
    btn.style.backgroundColor = accent.hex;
    btn.title = `${accent.name} (${accent.hex})`;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'color-swatch-name';
    nameSpan.textContent = accent.name;

    btn.appendChild(nameSpan);
    btn.addEventListener('click', () => {
      setMetroAccent(accent.key);
      playTactileClick('click');
    });

    grid.appendChild(btn);
  });

  // Top Bar Swatch Dots
  document.querySelectorAll('.swatch-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const key = dot.dataset.accent;
      setMetroAccent(key);
      playTactileClick('click');
    });
  });

  // Copy Hex Button
  const copyBtn = document.getElementById('copyHexBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(activeAccent.hex).then(() => {
        const origText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied!';
        setTimeout(() => { copyBtn.innerHTML = origText; }, 1800);
      });
      playTactileClick('click');
    });
  }
}

// --- Theme Switcher (Dark OLED vs Pure Light) ---
function setupThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  // Default to light theme
  const savedTheme = localStorage.getItem('tilelaunch_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tilelaunch_theme', next);
    updateThemeIcon(next);
    setMetroAccent(activeAccent.key);
    playTactileClick('tab');
  });

  function updateThemeIcon(theme) {
    themeBtn.innerHTML = theme === 'light' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    themeBtn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
  }
}

// --- FAQ Accordion ---
function setupFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      items.forEach(other => {
        other.classList.remove('active');
        const otherAns = other.querySelector('.faq-answer');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
      }
      playTactileClick('click');
    });
  });
}

// --- Document Ready ---
document.addEventListener('DOMContentLoaded', () => {
  setupPhoneSimulator();
  setupColorStudio();
  setupThemeToggle();
  setupFaq();

  // Initial Clock
  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  // Default Simulator Accent (Nokia signature Cyan)
  setMetroAccent('cyan');
});
