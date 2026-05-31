/**
 * Template: Brad Two Column (tr7_brad_twocol)
 * Reference: Image 7 — Brad Jensen, Chief Experience Officer
 * Layout: Wide left (65%) content + right sidebar (35%),
 *         left: bold name, teal tagline, icon contact row, Summary/Experience/Languages,
 *         right sidebar: Key Achievements (with dotted borders), Skills, Education, Training/Courses, Interests.
 *         Experience uses company name as teal accent, role below, icon date/location, bullet list.
 *         Bar-style language display in left column.
 * Best for: C-level, senior managers, customer experience, leadership.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.tr7_brad_twocol = {
  id: 'tr7_brad_twocol',
  name: 'Brad Two Column',
  tag: 'Executive',
  thumb_bg: '#1a2e4a',
  thumb_accent: '#3b8fc4',
  description: 'Left-heavy two-column: experience left, achievements + skills + training right.',

  render(data, accentColor) {
    const accent = accentColor || '#1a6b8a';
    const { profile: p, work, edu, skills, personal, hobbies, customSections: cs } = data;
    const ini = ((p.firstName || 'A')[0] + (p.lastName || 'C')[0]).toUpperCase();

    const photoHTML = window.ResumeHelpers.photoContent(p, ini, 'font-size:35px;font-weight:700;color:#fff', 60);

    // Left section header
    const lHead = (title) => `
      <div style="margin:12px 0 6px">
        <div class="resume-section-head" style="font-size:14px;font-weight:900;color:#1a1a1a;text-transform:uppercase;letter-spacing:1px">${title}</div>
        <div style="height:2px;background:#1a1a1a;margin-top:2px"></div>
      </div>`;

    // Right section header
    const rHead = (title) => `
      <div style="margin:12px 0 5px">
        <div class="resume-section-head" style="font-size:14px;font-weight:900;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.8px">${title}</div>
        <div style="height:1.5px;background:#1a1a1a;margin-top:2px"></div>
      </div>`;

    const workHTML = work.map(w => `
      <div style="margin-bottom:10px;border-bottom:1px dotted #ddd;padding-bottom:8px">
        <div style="font-size:14px;font-weight:700;color:#1a1a1a">${w.role || ''}</div>
        <div style="font-size:13px;color:${accent};font-weight:600">${w.company || ''}</div>
        <div style="font-size:12px;color:#666;display:flex;gap:8px;margin-bottom:3px;flex-wrap:wrap">
          ${w.from || w.to ? `<span>📅 ${[w.from, w.to].filter(Boolean).join(' – ')}</span>` : ''}
        </div>
        ${w.desc ? `<ul style="margin:3px 0 0 12px;padding:0">${w.desc.split('\n').filter(l => l.trim()).map(l => `<li style="font-size:12px;color:#333;line-height:1.55;margin-bottom:2px">${l.trim()}</li>`).join('')}</ul>` : ''}
      </div>`).join('');

    // Bar-style language
    const langBar = (level) => {
      const bars = 5;
      const filled = Math.round(level / 20);
      return `<div style="display:flex;gap:2px;align-items:center">
        ${Array(bars).fill(0).map((_, i) =>
          `<div style="width:12px;height:8px;border-radius:1px;background:${i < filled ? accent : '#d0d0d0'}"></div>`
        ).join('')}
      </div>`;
    };

    // Separate custom sections for each column
    const achievSection = (cs || []).find(s => s.title.toLowerCase().includes('achiev') || s.title.toLowerCase().includes('key'));
    const trainingSection = (cs || []).find(s => s.title.toLowerCase().includes('train') || s.title.toLowerCase().includes('course'));
    const interestSection = (cs || []).find(s => s.title.toLowerCase().includes('interest') || s.title.toLowerCase().includes('passion'));
    const leftSections = (cs || []).filter(s => s !== achievSection && s !== trainingSection && s !== interestSection && !s.title.toLowerCase().includes('edu') && !s.title.toLowerCase().includes('skill'));

    // Achievements as sidebar list with dotted borders
    const achievHTML = achievSection ? `
      ${rHead(achievSection.title)}
      ${achievSection.items.map(it => `
        <div style="margin-bottom:7px;padding-bottom:7px;border-bottom:1px dotted #ddd">
          <div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-bottom:2px">${it.title || ''}</div>
          ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc.replace(/\n/g, ' ')}</div>` : ''}
        </div>`).join('')}` : '';

    const trainingHTML = trainingSection ? `
      ${rHead(trainingSection.title)}
      ${trainingSection.items.map(it => `
        <div class="resume-block" style="margin-bottom:7px">
          <div style="font-size:13px;font-weight:700;color:${accent};margin-bottom:2px">${it.title || ''}</div>
          ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc}</div>` : ''}
        </div>`).join('')}` : '';

    const interestHTML = interestSection ? `
      ${rHead(interestSection.title)}
      ${interestSection.items.map(it => `
        <div class="resume-block" style="margin-bottom:6px">
          <div style="font-size:13px;font-weight:700;color:#1a1a1a">${it.title || ''}</div>
          ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc}</div>` : ''}
        </div>`).join('')}` : '';

    const leftCustomHTML = leftSections.map(sec => `
      ${lHead(sec.title)}
      ${sec.items.map(it => `
        <div class="resume-block" style="margin-bottom:8px">
          <div style="font-size:14px;font-weight:700;color:#1a1a1a">${it.title || ''}</div>
          ${it.subtitle ? `<div style="font-size:13px;color:${accent}">${it.subtitle}</div>` : ''}
          ${it.date ? `<div style="font-size:12px;color:#666">${it.date}</div>` : ''}
          ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc}</div>` : ''}
        </div>`).join('')}
    `).join('');

    const eduHTML = edu.map(e => `
      <div class="resume-block" style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:700;color:#1a1a1a">${e.degree || ''}</div>
        <div style="font-size:13px;color:${accent};font-weight:600">${e.school || ''}</div>
        <div style="font-size:12px;color:#666">
          ${e.from || e.to ? `📅 ${[e.from, e.to].filter(Boolean).join(' – ')}` : ''}
          ${e.gpa ? ` · ${e.gpa}` : ''}
        </div>
      </div>`).join('');

    const persInfo = Object.entries({ Father: personal.father, DOB: personal.dob, Gender: personal.gender, 'Marital Status': personal.marital, Nationality: personal.nation }).filter(([, v]) => v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;box-sizing:border-box">
        <!-- FULL-WIDTH HEADER -->
        <div style="padding:18px 22px 14px;border-bottom:1px solid #e0e0e0">
          <div style="display:flex;align-items:center;gap:12px">
            ${p.photoSrc ? `<div style="width:60px;height:60px;border-radius:50%;overflow:hidden;position:relative;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#eee">${photoHTML}</div>` : ''}
            <div>
              <div style="font-size:38px;font-weight:900;color:#1a1a1a;letter-spacing:-0.5px;text-transform:uppercase;line-height:1.05">${p.firstName || ''} ${p.lastName || ''}</div>
              ${p.tagline ? `<div style="font-size:13px;color:${accent};font-weight:600;margin-top:3px">${p.tagline}</div>` : ''}
              <div style="display:flex;gap:12px;margin-top:5px;font-size:13px;color:#444;flex-wrap:wrap">
                ${p.phone ? `<span>📞 ${p.phone}</span>` : ''}
                ${p.email ? `<span>✉ ${p.email}</span>` : ''}
                ${window.ResumeHelpers.contactSpansPlain(p)}
              </div>
            </div>
          </div>
        </div>

        <!-- TWO COLUMNS -->
        <div style="display:flex">
          <!-- LEFT COLUMN (65%) -->
          <div style="flex:0 0 132mm;padding:12px 18px 18px;box-sizing:border-box;border-right:1px solid #e0e0e0">
            ${p.summary ? `${lHead('Summary')}<div style="font-size:13px;color:#333;line-height:1.65">${p.summary}</div>` : ''}
            ${work.length ? `${lHead('Experience')}${workHTML}` : ''}
            ${leftCustomHTML}

            ${personal.lang ? `
              ${lHead('Languages')}
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                ${personal.lang.split(',').map(lang => {
                  const parts = lang.trim().split(':');
                  const name = parts[0].trim();
                  const level = parseInt(parts[1]) || 80;
                  const sublabel = parts[2] ? parts[2].trim() : '';
                  return `<div>
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
                      <span style="font-size:13px;font-weight:700;color:#1a1a1a;min-width:45px">${name}</span>
                    </div>
                    ${sublabel ? `<div style="font-size:11px;color:#888;margin-bottom:2px">${sublabel}</div>` : ''}
                    ${langBar(level)}
                  </div>`;
                }).join('')}
              </div>` : ''}

            ${personal.decl ? `
              ${lHead('Declaration')}
              <div style="font-size:13px;color:#555;line-height:1.6">${personal.decl}</div>
              <div style="font-size:12px;color:#aaa;margin-top:5px">Date: ___________  &nbsp; Place: ___________</div>` : ''}
          </div>

          <!-- RIGHT SIDEBAR (35%) -->
          <div style="flex:1;padding:12px 16px 18px;box-sizing:border-box">
            ${achievHTML}

            ${skills.length ? `
              ${rHead('Skills')}
              <div style="font-size:13px;color:#333;line-height:1.7">${skills.map(s => s.name).join(', ')}</div>` : ''}

            ${edu.length ? `${rHead('Education')}${eduHTML}` : ''}

            ${trainingHTML}

            ${hobbies.length ? `
              ${rHead('Interests')}
              ${hobbies.map(h => `<div class="resume-block" style="margin-bottom:5px"><div style="font-size:13px;font-weight:700;color:#1a1a1a">${h}</div></div>`).join('')}` : ''}

            ${interestHTML}

            ${persInfo.length ? `
              ${rHead('Personal')}
              ${persInfo.map(([k, v]) => `<div style="font-size:12px;color:#444;margin-bottom:2px"><span style="color:#888">${k}: </span>${v}</div>`).join('')}` : ''}
          </div>
        </div>
      </div>`;
  }
};
