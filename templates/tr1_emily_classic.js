/**
 * Template: Emily Classic (tr1_emily_classic)
 * Reference: Image 1 — Emily Carter, Assistant Store Manager
 * Layout: Photo top-left + name/title, vertical divider, contact right,
 *         then single-column body with bold section headers + bullet-point work entries,
 *         3-column skill grid, education at bottom.
 * Best for: Experienced professionals, retail/ops/corporate.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.tr1_emily_classic = {
  id: 'tr1_emily_classic',
  name: 'Emily Classic',
  tag: 'Professional',
  thumb_bg: '#1a3a5c',
  thumb_accent: '#f0a500',
  description: 'Photo header with divider, bold section titles, bullet-point experience. Classic professional look.',

  render(data, accentColor) {
    const accent = accentColor || '#1a3a5c';
    const accentOrange = '#f0a500';
    const { profile: p, work, edu, skills, personal, hobbies, customSections: cs } = data;
    const ini = ((p.firstName || 'A')[0] + (p.lastName || 'C')[0]).toUpperCase();

    const photoHTML = window.ResumeHelpers.photoContent(p, ini, 'font-size:35px;font-weight:700;color:#fff', 72);

    const sHead = (title) => `
      <div style="margin:14px 0 6px">
        <div class="resume-section-head" style="font-size:16px;font-weight:900;color:#1a1a1a;text-transform:uppercase;letter-spacing:1px">${title}</div>
        <div style="height:1.5px;background:#1a1a1a;margin-top:3px"></div>
      </div>`;

    const workHTML = work.map(w => `
      <div class="resume-block" style="margin-bottom:10px">
        <div style="font-size:14px;font-weight:700;color:${accentOrange}">${w.role || ''}</div>
        <div style="font-size:13px;color:#333">${w.company || ''}${w.company && (w.from || w.to) ? ' · ' : ''}${[w.from, w.to].filter(Boolean).join(' – ')}</div>
        ${w.desc ? `<ul style="margin:4px 0 0 12px;padding:0">${w.desc.split('\n').filter(l => l.trim()).map(l => `<li style="font-size:13px;color:#333;line-height:1.55;margin-bottom:2px">${l.trim()}</li>`).join('')}</ul>` : ''}
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div class="resume-block" style="margin-bottom:8px">
        <div style="font-size:14px;font-weight:700;color:${accentOrange}">${e.degree || ''}</div>
        <div style="font-size:13px;color:#333">${e.school || ''}</div>
        <div style="font-size:13px;color:#666">${[e.from, e.to].filter(Boolean).join(' – ')} ${e.gpa ? '· ' + e.gpa : ''}</div>
      </div>`).join('');

    // 3-column skills grid like the reference
    const skillCols = [[], [], []];
    skills.forEach((s, i) => skillCols[i % 3].push(s.name));
    const skillsHTML = skills.length ? `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px 8px">
        ${skills.map(s => `<div style="font-size:13px;color:#333;padding:1px 0">${s.name}</div>`).join('')}
      </div>` : '';

    const custHTML = (cs || []).map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it => `
        <div class="resume-block" style="margin-bottom:8px">
          <div style="font-size:14px;font-weight:700;color:${accentOrange}">${it.title || ''}</div>
          ${it.subtitle ? `<div style="font-size:13px;color:#333">${it.subtitle}</div>` : ''}
          <div style="font-size:13px;color:#666">${it.date || ''}</div>
          ${it.desc ? `<ul style="margin:3px 0 0 12px;padding:0">${it.desc.split('\n').filter(l=>l.trim()).map(l=>`<li style="font-size:13px;color:#333;line-height:1.5;margin-bottom:1px">${l.trim()}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}
    `).join('');

    const persInfo = Object.entries({ 'Father': personal.father, 'DOB': personal.dob, 'Gender': personal.gender, 'Languages': personal.lang, 'Marital Status': personal.marital, 'Nationality': personal.nation }).filter(([, v]) => v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;padding:20px 24px;box-sizing:border-box">
        <!-- HEADER ROW -->
        <div style="display:flex;align-items:center;gap:16px;padding-bottom:16px">
          <!-- Photo -->
          <div style="width:72px;height:72px;border-radius:4px;background:#ccc;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${photoHTML}
          </div>
          <!-- Name + title -->
          <div style="flex:1">
            <div style="font-size:38px;font-weight:900;color:#1a1a1a;letter-spacing:-0.5px;text-transform:uppercase;line-height:1.05">${p.firstName || ''} ${p.lastName || ''}</div>
            ${p.tagline ? `<div style="font-size:13px;color:${accentOrange};font-weight:600;margin-top:4px;line-height:1.4">${p.tagline}</div>` : ''}
          </div>
          <!-- Divider -->
          <div style="width:1.5px;height:56px;background:#ccc;flex-shrink:0"></div>
          <!-- Contact block -->
          <div style="min-width:100px;display:flex;flex-direction:column;gap:3px">
            ${p.phone ? `<div style="font-size:13px;color:#444">${p.phone}</div>` : ''}
            ${p.email ? `<div style="font-size:13px;color:${accent};word-break:break-all">${p.email}</div>` : ''}
            ${window.ResumeHelpers.contactDivs(p, `font-size:13px;color:${accent};word-break:break-all;margin-bottom:3px`)}
          </div>
        </div>

        <!-- BODY -->
        ${p.summary ? `${sHead('Summary')}<div style="font-size:13px;color:#333;line-height:1.65">${p.summary}</div>` : ''}
        ${work.length ? `${sHead('Work Experience')}${workHTML}` : ''}
        ${skills.length ? `${sHead('Skills')}${skillsHTML}` : ''}
        ${edu.length ? `${sHead('Education')}${eduHTML}` : ''}
        ${custHTML}

        ${persInfo.length ? `
          ${sHead('Personal Information')}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 12px">
            ${persInfo.map(([k, v]) => `<div style="font-size:13px;color:#444"><span style="color:#999">${k}: </span>${v}</div>`).join('')}
          </div>` : ''}

        ${hobbies.length ? `${sHead('Hobbies')}<div style="font-size:13px;color:#444">${hobbies.join('  ·  ')}</div>` : ''}

        ${personal.decl ? `
          ${sHead('Declaration')}
          <div style="font-size:13px;color:#555;line-height:1.6">${personal.decl}</div>
          <div style="font-size:12px;color:#aaa;margin-top:5px">Date: ___________  &nbsp; Place: ___________</div>` : ''}
      </div>`;
  }
};
