/**
 * Template: Shushila Bold Left (tr5_elise_bold_left)
 * Reference: Image 5 — Elise Carter, General Manager
 * Layout: Giant bold ALL-CAPS name top-left, teal underlined tagline, icon contact row,
 *         bold uppercase section headers with underline, 2x2 key achievements grid with dotted borders,
 *         experience with company name as teal accent + date/location row, bar-style language display.
 * Best for: General managers, retail leaders, senior ops roles.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.tr5_elise_bold_left = {
  id: 'tr5_elise_bold_left',
  name: 'Shushila Bold Left',
  tag: 'Leadership',
  thumb_bg: '#f8f9fa',
  thumb_accent: '#1a6b8a',
  description: 'Giant bold name, teal tagline underline, 2×2 achievements grid, bar languages.',

  render(data, accentColor) {
    const accent = accentColor || '#1a6b8a';
    const { profile: p, work, edu, skills, personal, hobbies, customSections: cs } = data;
    const ini = ((p.firstName || 'A')[0] + (p.lastName || 'C')[0]).toUpperCase();

    const photoHTML = window.ResumeHelpers.photoContent(p, ini, 'font-size:35px;font-weight:700;color:#fff', 60);

    const sHead = (title) => `
      <div style="margin:14px 0 7px">
        <div class="resume-section-head" style="font-size:16px;font-weight:900;color:#1a1a1a;text-transform:uppercase;letter-spacing:1.5px">${title}</div>
        <div style="height:2px;background:#1a1a1a;margin-top:3px"></div>
      </div>`;

    // 2x2 grid achievements
    const achievSection = (cs || []).find(s => s.title.toLowerCase().includes('achiev') || s.title.toLowerCase().includes('key'));
    const otherSections = (cs || []).filter(s => s !== achievSection);

    const achievHTML = achievSection ? `
      ${sHead(achievSection.title)}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px dotted #ccc;border-left:1px dotted #ccc">
        ${achievSection.items.map(it => `
          <div style="padding:8px 10px;border-bottom:1px dotted #ccc;border-right:1px dotted #ccc">
            <div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-bottom:3px">${it.title || ''}</div>
            ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc.replace(/\n/g, ' ')}</div>` : ''}
          </div>`).join('')}
      </div>` : '';

    const workHTML = work.map(w => `
      <div style="margin-bottom:10px;border-bottom:1px dotted #e0e0e0;padding-bottom:8px">
        <div style="font-size:14px;font-weight:700;color:#1a1a1a">${w.role || ''}</div>
        <div style="font-size:13px;color:${accent};font-weight:600">${w.company || ''}</div>
        <div style="font-size:12px;color:#666;margin-bottom:3px;display:flex;gap:8px">
          ${w.from || w.to ? `<span>🗓 ${[w.from, w.to].filter(Boolean).join(' – ')}</span>` : ''}
        </div>
        ${w.desc ? `<ul style="margin:3px 0 0 12px;padding:0">${w.desc.split('\n').filter(l => l.trim()).map(l => `<li style="font-size:12px;color:#333;line-height:1.55;margin-bottom:2px">${l.trim()}</li>`).join('')}</ul>` : ''}
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div class="resume-block" style="margin-bottom:8px">
        <div style="font-size:14px;font-weight:700;color:#1a1a1a">${e.degree || ''}</div>
        <div style="font-size:13px;color:${accent};font-weight:600">${e.school || ''}</div>
        <div style="font-size:12px;color:#666;display:flex;gap:8px">
          ${e.from || e.to ? `<span>🗓 ${[e.from, e.to].filter(Boolean).join(' – ')}</span>` : ''}
          ${e.gpa ? `<span>· ${e.gpa}</span>` : ''}
        </div>
      </div>`).join('');

    // Bar-style language display
    const langBar = (level) => {
      const bars = 5;
      const filled = Math.round(level / 20);
      return `<div style="display:flex;gap:2px;align-items:center">
        ${Array(bars).fill(0).map((_, i) =>
          `<div style="width:14px;height:8px;border-radius:1px;background:${i < filled ? accent : '#d0d0d0'}"></div>`
        ).join('')}
      </div>`;
    };

    const custHTML = otherSections.map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it => `
        <div class="resume-block" style="margin-bottom:7px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-size:14px;font-weight:700;color:#1a1a1a">${it.title || ''}</div>
              ${it.subtitle ? `<div style="font-size:13px;color:${accent}">${it.subtitle}</div>` : ''}
            </div>
            ${it.date ? `<div style="font-size:13px;color:#666">${it.date}</div>` : ''}
          </div>
          ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc}</div>` : ''}
        </div>`).join('')}
    `).join('');

    const persInfo = Object.entries({ Father: personal.father, DOB: personal.dob, Gender: personal.gender, 'Marital Status': personal.marital, Nationality: personal.nation }).filter(([, v]) => v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;padding:20px 24px;box-sizing:border-box">
        <!-- GIANT BOLD NAME -->
        <div style="margin-bottom:12px">
          ${p.photoSrc ? `<div style="float:right;margin-left:12px"><div style="width:60px;height:60px;border-radius:50%;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;background:#eee">${photoHTML}</div></div>` : ''}
          <div style="font-size:45px;font-weight:900;color:#1a1a1a;letter-spacing:-0.5px;text-transform:uppercase;line-height:1.05">${p.firstName || ''} ${p.lastName || ''}</div>
          ${p.tagline ? `<div style="font-size:22px;color:${accent};font-weight:600;margin-top:4px;text-decoration:underline;text-decoration-color:${accent}">${p.tagline}</div>` : ''}
          <div style="clear:both"></div>
          <!-- Icon contacts -->
          <div style="display:flex;gap:14px;margin-top:6px;flex-wrap:wrap">
            ${p.phone ? `<span style="font-size:13px;color:#444">📞 ${p.phone}</span>` : ''}
            ${p.email ? `<span style="font-size:13px;color:#444">✉ ${p.email}</span>` : ''}
            ${window.ResumeHelpers.contactSpans(p, 'font-size:13px;color:#444', false)}
          </div>
        </div>

        ${p.summary ? `${sHead('Summary')}<div style="font-size:13px;color:#333;line-height:1.65">${p.summary}</div>` : ''}

        ${achievHTML}

        ${work.length ? `${sHead('Experience')}${workHTML}` : ''}

        ${edu.length ? `${sHead('Education')}${eduHTML}` : ''}

        ${personal.lang ? `
          ${sHead('Languages')}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
            ${personal.lang.split(',').map(lang => {
              const parts = lang.trim().split(':');
              const name = parts[0].trim();
              const level = parseInt(parts[1]) || 80;
              return `<div style="display:flex;align-items:center;gap:10px">
                <div style="font-size:13px;font-weight:700;color:#1a1a1a;min-width:55px">${name}</div>
                ${langBar(level)}
              </div>`;
            }).join('')}
          </div>` : ''}

        ${skills.length ? `
          ${sHead('Core Competencies')}
          <div style="font-size:13px;color:#333">${skills.map(s => s.name).join(', ')}</div>` : ''}

        ${custHTML}

        ${hobbies.length ? `${sHead('Interests')}<div style="font-size:13px;color:#444">${hobbies.join('  •  ')}</div>` : ''}

        ${persInfo.length ? `
          ${sHead('Personal Information')}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 16px">
            ${persInfo.map(([k, v]) => `<div style="font-size:13px;color:#444"><span style="color:#888">${k}: </span>${v}</div>`).join('')}
          </div>` : ''}

        ${personal.decl ? `
          ${sHead('Declaration')}
          <div style="font-size:13px;color:#555;line-height:1.6">${personal.decl}</div>
          <div style="font-size:12px;color:#aaa;margin-top:5px">Date: ___________  &nbsp; Place: ___________</div>` : ''}
      </div>`;
  }
};
