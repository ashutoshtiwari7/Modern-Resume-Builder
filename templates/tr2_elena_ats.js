/**
 * Template: Ayush ATS (tr2_elena_ats)
 * Reference: Image 2 — Elena R. Whitaker, Academic Program Coordinator
 * Layout: Name | Title as big header, city/phone/email row, full-width underline section heads,
 *         edu-first layout, bullet point lists, ATS-optimized clean white.
 * Best for: Academia, freshers, ATS-friendly submissions.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.tr2_elena_ats = {
  id: 'tr2_elena_ats',
  name: 'Ayush ATS',
  tag: 'ATS Clean',
  thumb_bg: '#0d5c6e',
  thumb_accent: '#ffffff',
  description: 'Name | Title header, full-width section lines, edu-first. Pure ATS-friendly layout.',

  render(data, accentColor) {
    const accent = accentColor || '#0d5c6e';
    const { profile: p, work, edu, skills, personal, hobbies, customSections: cs } = data;

    const sHead = (title) => `
      <div style="margin:13px 0 6px">
        <div class="resume-section-head" style="font-size:16px;font-weight:900;color:#1a1a1a;text-transform:uppercase;letter-spacing:1px">${title}</div>
        <div style="height:1.5px;background:#1a1a1a;margin-top:3px"></div>
      </div>`;

    const workHTML = work.map(w => `
      <div class="resume-block" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-size:14px;font-weight:700;color:#1a1a1a">${w.role || ''}</div>
            <div style="font-size:13px;color:${accent};font-weight:600">${w.company || ''}</div>
          </div>
          <div style="text-align:right;font-size:13px;color:#555;white-space:nowrap;margin-left:10px">
            ${w.from || w.to ? `<div>${[w.from, w.to].filter(Boolean).join(' – ')}</div>` : ''}
          </div>
        </div>
        ${w.desc ? `<ul style="margin:4px 0 0 14px;padding:0">${w.desc.split('\n').filter(l => l.trim()).map(l => `<li style="font-size:13px;color:#333;line-height:1.55;margin-bottom:2px">${l.trim()}</li>`).join('')}</ul>` : ''}
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div class="resume-block" style="margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-size:14px;font-weight:700;color:#1a1a1a">${e.degree || ''}</div>
            <div style="font-size:13px;color:${accent};font-weight:600">${e.school || ''}</div>
          </div>
          <div style="text-align:right;font-size:13px;color:#555;white-space:nowrap;margin-left:10px">
            ${[e.from, e.to].filter(Boolean).join(' – ')}
          </div>
        </div>
        ${e.gpa ? `<div style="font-size:13px;color:#666">GPA: ${e.gpa}</div>` : ''}
      </div>`).join('');

    const custHTML = (cs || []).map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it => `
        <div class="resume-block" style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-size:14px;font-weight:700;color:${accent}">${it.title || ''}</div>
              ${it.subtitle ? `<div style="font-size:13px;color:#333">${it.subtitle}</div>` : ''}
            </div>
            ${it.date ? `<div style="font-size:13px;color:#555;white-space:nowrap;margin-left:10px">${it.date}</div>` : ''}
          </div>
          ${it.desc ? `<ul style="margin:3px 0 0 14px;padding:0">${it.desc.split('\n').filter(l=>l.trim()).map(l=>`<li style="font-size:13px;color:#333;line-height:1.5;margin-bottom:1px">${l.trim()}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}
    `).join('');

    const persInfo = Object.entries({ Father: personal.father, DOB: personal.dob, Gender: personal.gender, Languages: personal.lang, 'Marital Status': personal.marital, Nationality: personal.nation }).filter(([, v]) => v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;padding:22px 26px;box-sizing:border-box">
        <!-- BIG NAME HEADER -->
        <div style="text-align:center;margin-bottom:4px">
          <div style="font-size:35px;font-weight:700;color:${accent};letter-spacing:-0.5px">
            ${p.firstName || ''} ${p.lastName || ''}${p.tagline ? ` <span style="color:#1a1a1a">| ${p.tagline}</span>` : ''}
          </div>
        </div>
        <!-- Contact row -->
        <div style="text-align:center;font-size:13px;color:#444;margin-bottom:14px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap">
          ${p.phone ? `<span>${p.phone}</span>` : ''}
          ${p.email ? `<span>•</span><span>${p.email}</span>` : ''}
          ${window.ResumeHelpers.contactSpans(p, '', true)}
        </div>

        <!-- edu first (ATS style) -->
        ${edu.length ? `${sHead('Education')}${eduHTML}` : ''}

        ${p.summary ? `${sHead('Summary')}<div style="font-size:13px;color:#333;line-height:1.65;margin-bottom:4px">${p.summary}</div>` : ''}

        ${work.length ? `${sHead('Experience')}${workHTML}` : ''}

        ${custHTML}

        ${skills.length ? `
          ${sHead('Skills')}
          <div style="font-size:13px;color:#333">${skills.map(s => s.name).join(', ')}</div>` : ''}

        ${hobbies.length ? `${sHead('Hobbies')}<div style="font-size:13px;color:#444">${hobbies.join('  •  ')}</div>` : ''}

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
