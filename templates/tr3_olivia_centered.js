/**
 * Template: Olivia Centered (tr3_olivia_centered)
 * Reference: Image 3 — Olivia Davis, Senior Business Analyst
 * Layout: Centered name + teal tagline + contact dots, centered section headers with full-width rules,
 *         company name with location-right dates, bullet lists, 3-col key achievements boxes,
 *         dot-based language skill display at bottom.
 * Best for: Business, analytics, data roles, senior professionals.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.tr3_olivia_centered = {
  id: 'tr3_olivia_centered',
  name: 'Olivia Centered',
  tag: 'Business',
  thumb_bg: '#ffffff',
  thumb_accent: '#1a6b7a',
  description: 'Centered name header, section dividers, 3-col achievements, dot language display.',

  render(data, accentColor) {
    const accent = accentColor || '#1a6b7a';
    const { profile: p, work, edu, skills, personal, hobbies, customSections: cs } = data;
    const ini = ((p.firstName || 'A')[0] + (p.lastName || 'C')[0]).toUpperCase();

    const photoHTML = window.ResumeHelpers.photoContent(p, ini, `font-size:35px;font-weight:700;color:${accent}`, 64);

    const sHead = (title) => `
      <div style="margin:14px 0 8px;text-align:center">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:1px;background:#ccc"></div>
          <span style="font-size:16px;font-weight:700;color:#1a1a1a;letter-spacing:0.5px">${title}</span>
          <div style="flex:1;height:1px;background:#ccc"></div>
        </div>
      </div>`;

    const workHTML = work.map(w => `
      <div class="resume-block" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:22px;height:22px;background:#f0f0f0;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#555;flex-shrink:0">
              ${(w.company || '?')[0]}
            </div>
            <div>
              <div style="font-size:14px;font-weight:700;color:${accent}">${w.company || ''}</div>
              <div style="font-size:13px;color:#333">${w.role || ''}</div>
            </div>
          </div>
          <div style="text-align:right;font-size:13px;color:#555;white-space:nowrap;margin-left:10px">
            <div style="font-size:13px;color:#555">${[w.from, w.to].filter(Boolean).join(' – ')}</div>
          </div>
        </div>
        ${w.desc ? `<ul style="margin:4px 0 0 28px;padding:0">${w.desc.split('\n').filter(l => l.trim()).map(l => `<li style="font-size:13px;color:#333;line-height:1.55;margin-bottom:2px">${l.trim()}</li>`).join('')}</ul>` : ''}
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div class="resume-block" style="margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:22px;height:22px;background:#f0f0f0;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#555;flex-shrink:0">
              ${(e.school || 'U')[0]}
            </div>
            <div>
              <div style="font-size:14px;font-weight:700;color:${accent}">${e.school || ''}</div>
              <div style="font-size:13px;color:#333">${e.degree || ''}</div>
            </div>
          </div>
          <div style="text-align:right;font-size:13px;color:#555;white-space:nowrap;margin-left:10px">
            <div>${[e.from, e.to].filter(Boolean).join(' – ')}</div>
            ${e.gpa ? `<div style="font-size:12px;color:#777">${e.gpa}</div>` : ''}
          </div>
        </div>
      </div>`).join('');

    // 3-column key achievements (from custom sections named "achievements" or first custom)
    const achievementsSection = (cs || []).find(s => s.title.toLowerCase().includes('achiev') || s.title.toLowerCase().includes('key'));
    const otherSections = (cs || []).filter(s => s !== achievementsSection);

    const achievHTML = achievementsSection ? `
      ${sHead(achievementsSection.title)}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        ${achievementsSection.items.map(it => `
          <div>
            <div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-bottom:3px">${it.title || ''}</div>
            ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc.replace(/\n/g, ' ')}</div>` : ''}
          </div>`).join('')}
      </div>` : '';

    const custHTML = otherSections.map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it => `
        <div class="resume-block" style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between">
            <div style="font-size:14px;font-weight:700;color:${accent}">${it.title || ''}</div>
            ${it.date ? `<div style="font-size:13px;color:#555">${it.date}</div>` : ''}
          </div>
          ${it.subtitle ? `<div style="font-size:13px;color:#333">${it.subtitle}</div>` : ''}
          ${it.desc ? `<div style="font-size:13px;color:#555;line-height:1.5">${it.desc}</div>` : ''}
        </div>`).join('')}
    `).join('');

    // Dot language display like reference
    const dotLang = (level) => {
      const filled = Math.round(level / 20);
      return Array(5).fill(0).map((_, i) =>
        `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${i < filled ? accent : '#d0d0d0'};margin-right:2px"></span>`
      ).join('');
    };

    const persInfo = Object.entries({ Father: personal.father, DOB: personal.dob, Gender: personal.gender, 'Marital Status': personal.marital, Nationality: personal.nation }).filter(([, v]) => v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;padding:22px 26px;box-sizing:border-box">
        <!-- CENTERED HEADER -->
        <div style="text-align:center;margin-bottom:14px">
          ${p.photoSrc ? `<div style="display:flex;justify-content:center;margin-bottom:8px"><div style="width:64px;height:64px;border-radius:50%;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center">${photoHTML}</div></div>` : ''}
          <div style="font-size:33px;font-weight:700;color:#1a1a1a">${p.firstName || ''} ${p.lastName || ''}</div>
          ${p.tagline ? `<div style="font-size:14px;color:${accent};margin-top:3px">${p.tagline}</div>` : ''}
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

        ${edu.length ? `${sHead('Education')}${eduHTML}` : ''}

        ${custHTML}

        ${skills.length ? `
          ${sHead('Skills')}
          <div style="font-size:13px;color:#333">${skills.map(s => s.name).join(', ')}</div>` : ''}

        ${personal.lang ? `
          ${sHead('Languages')}
          <div style="display:flex;gap:24px;flex-wrap:wrap">
            ${personal.lang.split(',').map(lang => `
              <div style="display:flex;align-items:center;gap:8px">
                <div style="font-size:13px;color:#1a1a1a;font-weight:600;min-width:50px">${lang.trim()}</div>
                <div>${dotLang(80)}</div>
              </div>`).join('')}
          </div>` : ''}

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
