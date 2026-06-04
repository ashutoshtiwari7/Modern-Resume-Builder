/**
 * Template: Ashutosh Minimal (tr6_alexander_minimal)
 * Reference: Image 6 — Alexander Taylor, Senior Software Engineer
 * Layout: Centered plain name (no accent color), grey tagline below, small centered contact,
 *         centered section title with full-width underline, company name plain-left + location-right,
 *         role below company, bullet lists, training/courses as "Title — Description" inline format,
 *         3-col key achievements at bottom, dot language display.
 * Best for: Software engineers, senior tech professionals.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.tr6_alexander_minimal = {
  id: 'tr6_alexander_minimal',
  name: 'Ashutosh Minimal',
  tag: 'Engineer',
  thumb_bg: '#f5f5f5',
  thumb_accent: '#333333',
  description: 'Centered plain name, grey tagline, inline training format, 3-col achievements.',

  render(data, accentColor) {
    const accent = accentColor || '#1a6b8a';
    const { profile: p, work, edu, skills, personal, hobbies, customSections: cs } = data;

    const sHead = (title) => `
      <div style="margin:14px 0 7px;text-align:center">
        <div style="font-size:16px;font-weight:700;color:#1a1a1a;letter-spacing:0.3px">${title}</div>
        <div style="height:1px;background:#aaa;margin-top:4px"></div>
      </div>`;

    const workHTML = work.map(w => `
      <div class="resume-block" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-size:14px;font-weight:600;color:#1a1a1a">${w.company || ''}</div>
            <div style="font-size:13px;color:#444">${w.role || ''}</div>
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
            <div style="font-size:14px;font-weight:600;color:#1a1a1a">${e.school || ''}</div>
            <div style="font-size:13px;font-weight:600;color:#444">${e.degree || ''}</div>
          </div>
          <div style="text-align:right;font-size:13px;color:#555;white-space:nowrap;margin-left:10px">
            ${[e.from, e.to].filter(Boolean).join(' – ')}
            ${e.gpa ? `<br/><span style="font-size:12px">${e.gpa}</span>` : ''}
          </div>
        </div>
      </div>`).join('');

    // Identify training, achievements, other custom sections
    const trainingSection = (cs || []).find(s => s.title.toLowerCase().includes('train') || s.title.toLowerCase().includes('course'));
    const achievSection = (cs || []).find(s => s.title.toLowerCase().includes('achiev') || s.title.toLowerCase().includes('key'));
    const otherSections = (cs || []).filter(s => s !== trainingSection && s !== achievSection);

    // Training as "Title — Description" inline style
    const trainingHTML = trainingSection ? `
      ${sHead(trainingSection.title)}
      ${trainingSection.items.map(it => `
        <div class="resume-block" style="margin-bottom:6px">
          <span style="font-size:13px;font-weight:600;color:${accent}">${it.title || ''}</span>
          ${it.subtitle ? `<span style="font-size:13px;color:#555"> — ${it.subtitle}</span>` : ''}
          ${it.desc ? `<div style="font-size:13px;color:#555;line-height:1.5;margin-top:1px;padding-left:12px">${it.desc}</div>` : ''}
        </div>`).join('')}` : '';

    // 3-col achievements
    const achievHTML = achievSection ? `
      ${sHead(achievSection.title)}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        ${achievSection.items.map(it => `
          <div>
            <div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-bottom:3px">${it.title || ''}</div>
            ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc.replace(/\n/g, ' ')}</div>` : ''}
          </div>`).join('')}
      </div>` : '';

    const custHTML = otherSections.map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it => `
        <div class="resume-block" style="margin-bottom:7px">
          <div style="display:flex;justify-content:space-between">
            <div style="font-size:14px;font-weight:700;color:#1a1a1a">${it.title || ''}</div>
            ${it.date ? `<div style="font-size:13px;color:#555">${it.date}</div>` : ''}
          </div>
          ${it.subtitle ? `<div style="font-size:13px;color:#555">${it.subtitle}</div>` : ''}
          ${it.desc ? `<div style="font-size:12px;color:#555;line-height:1.5">${it.desc}</div>` : ''}
        </div>`).join('')}
    `).join('');

    const dotLang = (level) => {
      const filled = Math.round(level / 20);
      return Array(5).fill(0).map((_, i) =>
        `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${i < filled ? '#333' : '#d0d0d0'};margin-right:2px"></span>`
      ).join('');
    };

    const persInfo = Object.entries({ Father: personal.father, DOB: personal.dob, Gender: personal.gender, 'Marital Status': personal.marital, Nationality: personal.nation }).filter(([, v]) => v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;padding:22px 26px;box-sizing:border-box">
        <!-- CENTERED PLAIN HEADER -->
        <div style="text-align:center;margin-bottom:14px">
          <div style="font-size:35px;font-weight:700;color:#1a1a1a">${p.firstName || ''} ${p.lastName || ''}</div>
          ${p.tagline ? `<div style="font-size:24px;color:#555;margin-top:3px">${p.tagline}</div>` : ''}
          <div style="font-size:13px;color:#444;margin-top:6px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap">
            ${p.phone ? `<span>${p.phone}</span>` : ''}
            ${p.phone && p.email ? '<span>•</span>' : ''}
            ${p.email ? `<span>${p.email}</span>` : ''}
            ${window.ResumeHelpers.contactSpans(p, '', true)}
          </div>
        </div>

        ${p.summary ? `${sHead('Summary')}<div style="font-size:13px;color:#333;line-height:1.65">${p.summary}</div>` : ''}

        ${work.length ? `${sHead('Experience')}${workHTML}` : ''}

        ${skills.length ? `
          ${sHead('Skills')}
          <div style="font-size:13px;color:#333">${skills.map(s => s.name).join(' · ')}</div>` : ''}

        ${trainingHTML}

        ${edu.length ? `${sHead('Education')}${eduHTML}` : ''}

        ${achievHTML}

        ${personal.lang ? `
          ${sHead('Languages')}
          <div style="display:flex;gap:28px;flex-wrap:wrap">
            ${personal.lang.split(',').map(lang => {
              const parts = lang.trim().split(':');
              const name = parts[0].trim();
              const level = parseInt(parts[1]) || 80;
              return `<div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:13px;font-weight:600;color:#1a1a1a;min-width:45px">${name}</span>
                <div>${dotLang(level)}</div>
              </div>`;
            }).join('')}
          </div>` : ''}

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
