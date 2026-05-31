/* ═══════════════════════════════════════════════════════════════
   RESUME BUILDER — Core Application State & Logic
   ═══════════════════════════════════════════════════════════════ */

let state = {
  activeTemplate: 't1_classic_sidebar',
  accentColor: '#5ba4cf',
  font: 'Poppins',
  photo: null,
  photoSize: 78,
  photoZoom: 100,
  photoOffsetX: 0,
  photoOffsetY: 0,
  work: [],
  edu: [],
  skills: [],
  hobbies: [],
  customSections: [],
};

const uid = () => '_' + Math.random().toString(36).substr(2, 8);
const $ = id => document.getElementById(id);
const val = id => ($(id) || {}).value || '';

function collectData() {
  return {
    profile: {
      firstName: val('fn'),
      lastName: val('ln'),
      tagline: val('tagline'),
      phone: val('phone'),
      email: val('email'),
      website: val('website'),
      github: val('github'),
      portfolio: val('portfolio'),
      summary: val('summary'),
      photoSrc: state.photo,
      photoSize: state.photoSize,
      photoZoom: state.photoZoom,
      photoOffsetX: state.photoOffsetX,
      photoOffsetY: state.photoOffsetY,
    },
    work: state.work,
    edu: state.edu,
    skills: state.skills,
    hobbies: state.hobbies,
    personal: {
      father: val('father'),
      dob: val('dob'),
      gender: val('gender'),
      lang: val('lang'),
      marital: val('marital'),
      nation: val('nation'),
      decl: val('decl'),
    },
    customSections: state.customSections,
  };
}

function update() {
  if (!window.getTemplate) return;
  const tpl = window.getTemplate(state.activeTemplate);
  const data = collectData();
  const el = $('resumeEl');
  el.style.fontFamily = state.font + ', sans-serif';
  el.innerHTML = tpl.render(data, state.accentColor);
  requestAnimationFrame(fitResumePreview);
}

function etab(name, btn) {
  document.querySelectorAll('.etab').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.epane').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  $('ep-' + name).classList.add('on');
}

function changeFont(f) {
  state.font = f;
  document.documentElement.style.setProperty('--font', `'${f}', sans-serif`);
  update();
}

function changeAccent(c) {
  state.accentColor = c;
  document.documentElement.style.setProperty('--accent', c);
  update();
}

function toggleDark() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  $('darkModeIcon').className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  $('darkModeText').textContent = isDark ? 'Light mode' : 'Dark mode';
}

function toggleSidebar() {
  const sidebar = $('editorSidebar');
  const wrap = $('sidebarToggleWrap');
  sidebar.classList.toggle('hidden');
  wrap.classList.toggle('collapsed');
  const isMobile = window.innerWidth <= 768;
  if(isMobile){
    wrap.style = "display: flex;flex-direction: column-reverse;align-items: flex-end;left: 10px;right: 13px;top: auto;bottom: 16px;position: fixed;z-index: 70;"; //Setting the collapse button static bottom left.
  }
}

let photoDrag = null;

function clampPhotoOffset(n) {
  return Math.min(80, Math.max(-80, Math.round(n)));
}

function syncPhotoThumbPreview() {
  const img = $('photoThumb');
  if (!img || !state.photo) return;
  const zoom = (state.photoZoom || 100) / 100;
  const ox = state.photoOffsetX || 0;
  const oy = state.photoOffsetY || 0;
  img.style.transform = `translate(${ox}px, ${oy}px) scale(${zoom})`;
}

function applyPhotoOffset(x, y, refreshResume = true) {
  state.photoOffsetX = clampPhotoOffset(x);
  state.photoOffsetY = clampPhotoOffset(y);
  $('photoOffsetX').value = state.photoOffsetX;
  $('photoOffsetY').value = state.photoOffsetY;
  $('photoOffsetXVal').textContent = state.photoOffsetX;
  $('photoOffsetYVal').textContent = state.photoOffsetY;
  syncPhotoThumbPreview();
  if (refreshResume) update();
}

function onPhotoDragMove(e) {
  if (!photoDrag) return;
  applyPhotoOffset(
    photoDrag.ox + (e.clientX - photoDrag.startX),
    photoDrag.oy + (e.clientY - photoDrag.startY),
    false
  );
}

function endPhotoDrag() {
  if (photoDrag) update();
  photoDrag = null;
  $('photoThumbFrame')?.classList.remove('dragging');
  document.removeEventListener('mousemove', onPhotoDragMove);
  document.removeEventListener('mouseup', endPhotoDrag);
}

function initPhotoThumbDrag() {
  const frame = $('photoThumbFrame');
  if (!frame) return;

  frame.addEventListener('mousedown', e => {
    if (!state.photo) return;
    e.preventDefault();
    photoDrag = {
      startX: e.clientX,
      startY: e.clientY,
      ox: state.photoOffsetX,
      oy: state.photoOffsetY,
    };
    frame.classList.add('dragging');
    document.addEventListener('mousemove', onPhotoDragMove);
    document.addEventListener('mouseup', endPhotoDrag);
  });
}

function handlePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    state.photo = e.target.result;
    state.photoZoom = 100;
    state.photoOffsetX = 0;
    state.photoOffsetY = 0;
    $('photoThumb').src = e.target.result;
    $('photoZoom').value = 100;
    $('photoZoomVal').textContent = '100%';
    $('photoOffsetX').value = 0;
    $('photoOffsetXVal').textContent = '0';
    $('photoOffsetY').value = 0;
    $('photoOffsetYVal').textContent = '0';
    $('photoBox').style.display = 'none';
    $('photoControls').style.display = 'block';
    syncPhotoThumbPreview();
    update();
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  state.photo = null;
  $('photoInput').value = '';
  $('photoThumb').src = '';
  $('photoBox').style.display = 'flex';
  $('photoControls').style.display = 'none';
  update();
}

function updatePhotoSize() {
  state.photoSize = parseInt($('photoSize').value);
  $('photoSizeVal').textContent = state.photoSize + 'px';
  update();
}

function updatePhotoZoom() {
  state.photoZoom = parseInt($('photoZoom').value);
  $('photoZoomVal').textContent = state.photoZoom + '%';
  syncPhotoThumbPreview();
  update();
}

function updatePhotoOffset() {
  state.photoOffsetX = parseInt($('photoOffsetX').value);
  state.photoOffsetY = parseInt($('photoOffsetY').value);
  $('photoOffsetXVal').textContent = state.photoOffsetX;
  $('photoOffsetYVal').textContent = state.photoOffsetY;
  syncPhotoThumbPreview();
  update();
}

function updateCardTitle(input, fallback) {
  const title = input.closest('.entry-card')?.querySelector('.entry-card-title');
  if (title) title.textContent = input.value.trim() || fallback;
}

function addWork() {
  const id = uid();
  state.work.push({ id, role: '', company: '', from: '', to: '', desc: '' });
  renderWorkEditor();
  update();
}

function removeWork(id) {
  state.work = state.work.filter(w => w.id !== id);
  renderWorkEditor();
  update();
}

function renderWorkEditor() {
  $('work-editor').innerHTML = state.work.map((w, i) => `
    <div class="entry-card">
      <div class="entry-card-head">
        <span class="entry-card-title">${w.role || 'Experience ' + (i + 1)}</span>
        <button class="entry-card-del" onclick="removeWork('${w.id}')"><i class="ti ti-trash"></i></button>
      </div>
      <div class="entry-card-body">
        <div class="fg"><label>Job Title</label><input value="${w.role}" placeholder="Salesforce Developer" oninput="state.work[${i}].role=this.value;updateCardTitle(this,'Experience ${i + 1}');update()" /></div>
        <div class="fg"><label>Company</label><input value="${w.company}" placeholder="Acme Corp" oninput="state.work[${i}].company=this.value;update()" /></div>
        <div class="date-row">
          <div class="fg"><label>From</label><input value="${w.from}" placeholder="Jan 2022" oninput="state.work[${i}].from=this.value;update()" /></div>
          <div class="fg"><label>To</label><input value="${w.to}" placeholder="Present" oninput="state.work[${i}].to=this.value;update()" /></div>
        </div>
        <div class="fg"><label>Description</label><textarea placeholder="Key responsibilities and achievements..." oninput="state.work[${i}].desc=this.value;update()">${w.desc}</textarea></div>
      </div>
    </div>`).join('');
}

function addEdu() {
  const id = uid();
  state.edu.push({ id, degree: '', school: '', from: '', to: '', gpa: '' });
  renderEduEditor();
  update();
}

function removeEdu(id) {
  state.edu = state.edu.filter(e => e.id !== id);
  renderEduEditor();
  update();
}

function renderEduEditor() {
  $('edu-editor').innerHTML = state.edu.map((e, i) => `
    <div class="entry-card">
      <div class="entry-card-head">
        <span class="entry-card-title">${e.degree || 'Education ' + (i + 1)}</span>
        <button class="entry-card-del" onclick="removeEdu('${e.id}')"><i class="ti ti-trash"></i></button>
      </div>
      <div class="entry-card-body">
        <div class="fg"><label>Degree / Course</label><input value="${e.degree}" placeholder="B.Tech Computer Science" oninput="state.edu[${i}].degree=this.value;updateCardTitle(this,'Education ${i + 1}');update()" /></div>
        <div class="fg"><label>School / University</label><input value="${e.school}" placeholder="XYZ University" oninput="state.edu[${i}].school=this.value;update()" /></div>
        <div class="date-row">
          <div class="fg"><label>From</label><input value="${e.from}" placeholder="2019" oninput="state.edu[${i}].from=this.value;update()" /></div>
          <div class="fg"><label>To</label><input value="${e.to}" placeholder="2023" oninput="state.edu[${i}].to=this.value;update()" /></div>
        </div>
        <div class="fg"><label>GPA / %</label><input value="${e.gpa}" placeholder="8.5 / 10 or 85%" oninput="state.edu[${i}].gpa=this.value;update()" /></div>
      </div>
    </div>`).join('');
}

function addSkill() {
  const id = uid();
  state.skills.push({ id, name: '', level: 75 });
  renderSkillsEditor();
  update();
}

function removeSkill(id) {
  state.skills = state.skills.filter(s => s.id !== id);
  renderSkillsEditor();
  update();
}

function renderSkillsEditor() {
  $('skills-editor').innerHTML = state.skills.map((s, i) => `
    <div class="entry-card">
      <div class="entry-card-head">
        <span class="entry-card-title">${s.name || 'Skill ' + (i + 1)}</span>
        <button class="entry-card-del" onclick="removeSkill('${s.id}')"><i class="ti ti-trash"></i></button>
      </div>
      <div class="entry-card-body">
        <div class="fg"><label>Skill Name</label><input value="${s.name}" placeholder="Apex / LWC / Salesforce" oninput="state.skills[${i}].name=this.value;updateCardTitle(this,'Skill ${i + 1}');update()" /></div>
        <div class="skill-row">
          <span style="font-size:11px;color:var(--text-muted)">Level</span>
          <input type="range" min="10" max="100" value="${s.level}" oninput="state.skills[${i}].level=+this.value;document.getElementById('slv${i}').textContent=this.value+'%';update()" />
          <span class="skill-lv" id="slv${i}">${s.level}%</span>
        </div>
      </div>
    </div>`).join('');
}

function addHobby() {
  state.hobbies.push('');
  renderHobbiesEditor();
  update();
}

function removeHobby(i) {
  state.hobbies.splice(i, 1);
  renderHobbiesEditor();
  update();
}

function renderHobbiesEditor() {
  $('hobbies-editor').innerHTML = state.hobbies.map((h, i) => `
    <div style="display:flex;align-items:center;gap:5px;margin-bottom:5px">
      <input class="fg" style="flex:1;padding:5px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);font-family:var(--font);font-size:12px" value="${h}" placeholder="e.g. Cricket, Reading" oninput="state.hobbies[${i}]=this.value;update()" />
      <button class="entry-card-del" onclick="removeHobby(${i})"><i class="ti ti-x"></i></button>
    </div>`).join('');
}

const SECTION_PRESETS = {
  languages: 'Languages',
  certifications: 'Certifications',
  projects: 'Projects',
  awards: 'Awards',
  volunteering: 'Volunteering',
  references: 'References',
  custom: 'Custom Section',
};

function addSection(type) {
  const id = uid();
  state.customSections.push({ id, title: SECTION_PRESETS[type] || type, items: [] });
  renderCustomSectionsEditor();
  update();
}

function addSectionItem(secIdx) {
  state.customSections[secIdx].items.push({ id: uid(), title: '', subtitle: '', date: '', desc: '' });
  renderCustomSectionsEditor();
  update();
}

function removeSectionItem(secIdx, itemId) {
  state.customSections[secIdx].items = state.customSections[secIdx].items.filter(it => it.id !== itemId);
  renderCustomSectionsEditor();
  update();
}

function removeSection(id) {
  state.customSections = state.customSections.filter(s => s.id !== id);
  renderCustomSectionsEditor();
  update();
}

function renderCustomSectionsEditor() {
  $('custom-sections-editor').innerHTML = state.customSections.map((sec, si) => `
    <div class="entry-card" style="margin-bottom:10px">
      <div class="entry-card-head">
        <input value="${sec.title}" style="font-weight:600;font-size:12px;border:none;background:transparent;color:var(--text);flex:1;outline:none;font-family:var(--font)" oninput="state.customSections[${si}].title=this.value;update()" />
        <button class="entry-card-del" onclick="removeSection('${sec.id}')"><i class="ti ti-trash"></i></button>
      </div>
      ${sec.items.map((it, ii) => `
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:5px">
          <div style="display:flex;justify-content:flex-end;margin-bottom:4px">
            <button class="entry-card-del" onclick="removeSectionItem(${si},'${it.id}')"><i class="ti ti-x"></i></button>
          </div>
          <div class="fg"><label>Title</label><input value="${it.title}" placeholder="Title" oninput="state.customSections[${si}].items[${ii}].title=this.value;update()" /></div>
          <div class="fg"><label>Subtitle</label><input value="${it.subtitle}" placeholder="Subtitle / Issuer" oninput="state.customSections[${si}].items[${ii}].subtitle=this.value;update()" /></div>
          <div class="fg"><label>Date</label><input value="${it.date}" placeholder="e.g. 2023" oninput="state.customSections[${si}].items[${ii}].date=this.value;update()" /></div>
          <div class="fg"><label>Description</label><textarea placeholder="Details..." oninput="state.customSections[${si}].items[${ii}].desc=this.value;update()">${it.desc}</textarea></div>
        </div>`).join('')}
      <button class="add-btn" onclick="addSectionItem(${si})"><i class="ti ti-plus"></i> Add item</button>
    </div>`).join('');
}

function toggleTemplatesGrid(show) {
  const overlay = $('templates-overlay');
  if (show === true) {
    overlay.classList.add('visible');
    renderTemplateGrid();
  } else {
    overlay.classList.remove('visible');
  }
}

function renderTemplateGrid() {
  const registry = window.TEMPLATE_REGISTRY;
  if (!registry || !registry.length) {
    $('template-grid').innerHTML = '<p style="color:var(--text-muted);padding:20px">Templates failed to load. Check that all template scripts are in the templates/ folder.</p>';
    return;
  }
  $('template-grid').innerHTML = registry.map(tpl => `
    <div class="tpl-card ${state.activeTemplate === tpl.id ? 'active' : ''}" onclick="selectTemplate('${tpl.id}')">
      <span class="tpl-active-badge">✓ Active</span>
      <div class="tpl-thumb" style="background:${tpl.thumb_bg}">
        <span style="font-size:22px;font-weight:900;color:${tpl.thumb_accent};text-shadow:0 2px 8px rgba(0,0,0,0.2)">${tpl.name.split(' ').map(w => w[0]).join('')}</span>
        <span class="tpl-thumb-label">${tpl.tag}</span>
      </div>
      <div class="tpl-info">
        <div class="tpl-name">${tpl.name}</div>
        <div class="tpl-desc">${tpl.description}</div>
      </div>
    </div>`).join('');
}

function selectTemplate(id) {
  state.activeTemplate = id;
  update();
  toggleTemplatesGrid(false);
}

async function downloadPDF() {
  const el = $('resumeEl');

  await Promise.all([...el.querySelectorAll('img')].map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
  }));

  const prevTransform = el.style.transform;
  el.style.transform = 'none';

  const { jsPDF } = window.jspdf;
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  el.style.transform = prevTransform;

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgH = (canvas.height * pageW) / canvas.width;

  if (imgH <= pageH) {
    pdf.addImage(imgData, 'PNG', 0, 0, pageW, imgH);
  } else {
    const fullPages = Math.floor(imgH / pageH);
    const remainder = imgH - fullPages * pageH;
    const pageCount = remainder > 3 ? fullPages + 1 : fullPages;
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -(pageH * i), pageW, imgH);
    }
  }

  const name = (val('fn') + '_' + val('ln')).replace(/\s+/g, '_') || 'Resume';
  pdf.save(`${name}_Resume.pdf`);
}

function fitResumePreview() {
  const wrap = $('resumeScaleWrap');
  const resume = $('resumeEl');
  const preview = $('previewArea');
  if (!wrap || !resume || !preview) return;

  resume.style.transform = 'none';
  wrap.style.height = 'auto';

  const resumeW = resume.offsetWidth;
  const resumeH = resume.offsetHeight;
  const maxW = preview.clientWidth - 32;
  const scale = Math.min(1, maxW / resumeW);

  resume.style.transform = scale < 1 ? `scale(${scale})` : 'none';
  wrap.style.height = scale < 1 ? `${resumeH * scale}px` : 'auto';
}

function initResponsive() {
  fitResumePreview();
  window.addEventListener('resize', fitResumePreview);
  if (window.matchMedia('(max-width: 900px)').matches) {
    $('editorSidebar')?.classList.add('hidden');
    $('sidebarToggleWrap')?.classList.add('collapsed');
  }
}

function initDarkMode() {
  document.body.classList.add('dark');
  $('darkModeIcon').className = 'fa-solid fa-moon';
  $('darkModeText').textContent = 'Light mode';
}

function initScrollableRanges() {
  document.addEventListener('wheel', (e) => {
    const input = e.target.closest('input[type="range"]');
    if (!input || input.disabled) return;

    e.preventDefault();

    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const step = parseFloat(input.step) || 1;
    const direction = e.deltaY < 0 ? 1 : -1;
    const next = Math.min(max, Math.max(min, parseFloat(input.value) + step * direction));

    if (next !== parseFloat(input.value)) {
      input.value = next;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, { passive: false });
}

window.addEventListener('DOMContentLoaded', () => {
  initScrollableRanges();
  initPhotoThumbDrag();
  initDarkMode();
  initResponsive();
  addWork();
  addEdu();
  addSkill();

  setTimeout(() => {
    const w = state.work[0];
    w.role = 'Salesforce Developer';
    w.company = 'Acme Solutions';
    w.from = 'Jan 2021';
    w.to = 'Present';
    w.desc = 'Developed custom Apex triggers, LWC components, and integrated third-party APIs on Salesforce Service Cloud.';
    const e = state.edu[0];
    e.degree = 'B.Tech Computer Science';
    e.school = 'ABC University';
    e.from = '2017';
    e.to = '2021';
    e.gpa = '8.2/10';
    const s = state.skills[0];
    s.name = 'Apex / LWC';
    s.level = 88;
    renderWorkEditor();
    renderEduEditor();
    renderSkillsEditor();
    update();
    fitResumePreview();
  }, 50);
});
