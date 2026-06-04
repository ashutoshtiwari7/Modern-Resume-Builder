/**
 * Template: Jackson Photo Center (tr4_jackson_photocenter)
 * Reference: Image 4 — Jackson Miller, Account Executive
 * Layout: Circular photo centered at top, name below, teal tagline, centered contact dots,
 *         centered section headers with full underline, company as teal accent top-left,
 *         3-column key achievements, bullet-point experience.
 * Best for: Sales, business development, account management.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.tr4_jackson_photocenter = {
  id: 'tr4_jackson_photocenter',
  name: 'Jackson Photo Center',
  tag: 'Sales / BD',
  thumb_bg: '#1a3a5c',
  thumb_accent: '#5ba4cf',
  description: 'Circular photo center-top, centered nav, key achievements grid, teal company links.',

  render(data, accentColor) {
    const accent = accentColor || '#1a3a5c';
    const { profile: p, work, edu, skills, personal, hobbies, customSections: cs } = data;
    const ini = ((p.firstName || 'A')[0] + (p.lastName || 'C')[0]).toUpperCase();

    const photoHTML = window.ResumeHelpers.photoContent(p, ini, 'font-size:38px;font-weight:700;color:#fff', 70);

    const sHead = (title) => `
      <div style="margin:14px 0 8px">
        <div style="font-size:16px;font-weight:700;color:#1a1a1a;text-align:center;letter-spacing:0.5px">${title}</div>
        <div style="height:1px;background:#ccc;margin-top:4px"></div>
      </div>`;

    const workHTML = work.map(w => `
      <div class="resume-block" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-size:14px;font-weight:700;color:${accent}">${w.company || ''}</div>
            <div style="font-size:13px;color:#1a1a1a">${w.role || ''}</div>
          </div>
          <div style="text-align:right;font-size:13px;color:#555;white-space:nowrap;margin-left:10px">
            ${[w.from, w.to].filter(Boolean).join(' – ')}
          </div>
        </div>
        ${w.desc ? `<ul style="margin:4px 0 0 14px;padding:0">${w.desc.split('\n').filter(l => l.trim()).map(l => `<li style="font-size:13px;color:#333;line-height:1.55;margin-bottom:2px">${l.trim()}</li>`).join('')}</ul>` : ''}
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div class="resume-block" style="margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-size:14px;font-weight:700;color:${accent}">${e.school || ''}</div>
            <div style="font-size:13px;color:#1a1a1a">${e.degree || ''}</div>
          </div>
          <div style="text-align:right;font-size:13px;color:#555;white-space:nowrap;margin-left:10px">
            ${[e.from, e.to].filter(Boolean).join(' – ')}
            ${e.gpa ? `<br/><span style="font-size:12px;color:#777">${e.gpa}</span>` : ''}
          </div>
        </div>
      </div>`).join('');

    // Separate "achievements" custom section for 3-col grid
    const achievSection = (cs || []).find(s => s.title.toLowerCase().includes('achiev') || s.title.toLowerCase().includes('key'));
    const trainingSection = (cs || []).find(s => s.title.toLowerCase().includes('train') || s.title.toLowerCase().includes('course'));
    const otherSections = (cs || []).filter(s => s !== achievSection && s !== trainingSection);

    const achievHTML = achievSection ? `
      ${sHead(achievSection.title)}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        ${achievSection.items.map(it => `
          <div>
            <div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-bottom:3px">${it.title || ''}</div>
            ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc.replace(/\n/g, ' ')}</div>` : ''}
          </div>`).join('')}
      </div>` : '';

    const trainingHTML = trainingSection ? `
      ${sHead(trainingSection.title)}
      ${trainingSection.items.map(it => `
        <div class="resume-block" style="margin-bottom:6px">
          <span style="font-size:13px;font-weight:700;color:${accent}">${it.title || ''}</span>
          ${it.subtitle ? `<span style="font-size:13px;color:#555"> — ${it.subtitle}</span>` : ''}
          ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5;margin-top:1px">${it.desc}</div>` : ''}
        </div>`).join('')}` : '';

    const custHTML = otherSections.map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it => `
        <div class="resume-block" style="margin-bottom:7px">
          <div style="display:flex;justify-content:space-between">
            <div style="font-size:14px;font-weight:700;color:#1a1a1a">${it.title || ''}</div>
            ${it.date ? `<div style="font-size:13px;color:#555">${it.date}</div>` : ''}
          </div>
          ${it.subtitle ? `<div style="font-size:13px;color:${accent}">${it.subtitle}</div>` : ''}
          ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc}</div>` : ''}
        </div>`).join('')}
    `).join('');

    const persInfo = Object.entries({ Father: personal.father, DOB: personal.dob, Gender: personal.gender, Languages: personal.lang, 'Marital Status': personal.marital, Nationality: personal.nation }).filter(([, v]) => v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;padding:22px 26px;box-sizing:border-box">
        <!-- CENTERED PHOTO + NAME -->
        <div style="text-align:center;margin-bottom:12px">
          <div style="display:flex;justify-content:center;margin-bottom:8px">
            <div style="width:70px;height:70px;border-radius:50%;background:#ddd;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;border:2px solid #eee">
              ${photoHTML}
            </div>
          </div>
          <div style="font-size:33px;font-weight:700;color:#1a1a1a">${p.firstName || ''} ${p.lastName || ''}</div>
          ${p.tagline ? `<div style="font-size:22px;color:${accent};margin-top:3px">${p.tagline}</div>` : ''}
          <div style="font-size:13px;color:#444;margin-top:6px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap">
            ${p.phone ? `<span>${p.phone}</span>` : ''}
            ${p.phone && p.email ? '<span>•</span>' : ''}
            ${p.email ? `<span>${p.email}</span>` : ''}
            ${window.ResumeHelpers.contactSpans(p, '', true)}
          </div>
        </div>

        ${p.summary ? `${sHead('Summary')}<div style="font-size:13px;color:#333;line-height:1.65">${p.summary}</div>` : ''}

        ${achievHTML}

        ${work.length ? `${sHead('Experience')}${workHTML}` : ''}

        ${skills.length ? `
          ${sHead('Core Competencies')}
          <div style="font-size:13px;color:#333">${skills.map(s => s.name).join(', ')}</div>` : ''}

        ${edu.length ? `${sHead('Education')}${eduHTML}` : ''}

        ${trainingHTML}

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
