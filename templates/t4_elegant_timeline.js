/**
 * Template 4: Elegant Timeline
 * Single column, centered header, timeline-style work history.
 * Best for: Freshers with internships, academia, design/creative roles.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.t4_elegant_timeline = {
  id: 't4_elegant_timeline',
  name: 'Elegant Timeline',
  tag: 'Creative',
  thumb_bg: '#fdf8f3',
  thumb_accent: '#c0713a',
  description: 'Centered header, timeline work history. Elegant and warm.',

  render(data, accentColor) {
    const accent = accentColor || '#c0713a';
    const { profile, work, edu, skills, personal, hobbies, customSections } = data;
    const initials = ((profile.firstName || 'A')[0] + (profile.lastName || 'C')[0]).toUpperCase();

    const photoSize = window.ResumeHelpers.photoSize(profile);
    const photoHTML = window.ResumeHelpers.photoContent(profile, initials, 'font-size:38px;font-weight:700;color:#fff');

    const sHead = (title) => `
      <div style="display:flex;align-items:center;gap:10px;margin:16px 0 10px">
        <div style="height:1px;flex:1;background:#e2d8cc"></div>
        <span style="font-size:14px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:2px">${title}</span>
        <div style="height:1px;flex:1;background:#e2d8cc"></div>
      </div>`;

    const workHTML = work.map((w,i) => `
      <div style="display:flex;gap:12px;margin-bottom:12px">
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="width:10px;height:10px;border-radius:50%;background:${accent};flex-shrink:0;margin-top:2px"></div>
          ${i < work.length-1 ? `<div style="flex:1;width:1.5px;background:#e2d8cc;margin-top:3px"></div>` : ''}
        </div>
        <div style="flex:1;padding-bottom:8px">
          <div style="display:flex;justify-content:space-between">
            <div style="font-weight:700;font-size:22px;color:#2d2d2d">${w.role||''}</div>
            <div style="font-size:12px;color:#999;white-space:nowrap">${[w.from,w.to].filter(Boolean).join(' – ')}</div>
          </div>
          <div style="font-size:13px;color:${accent};font-style:italic;margin-bottom:3px">${w.company||''}</div>
          ${w.desc?`<div style="font-size:13px;color:#555;line-height:1.6">${w.desc.replace(/\n/g,'<br>')}</div>`:''}
        </div>
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div style="display:flex;gap:10px;margin-bottom:10px">
        <div style="min-width:55px;text-align:right;font-size:12px;color:#999;line-height:1.4;padding-top:2px">${[e.from,e.to].filter(Boolean).join('<br>')}</div>
        <div style="width:1.5px;background:#e2d8cc;flex-shrink:0"></div>
        <div>
          <div style="font-weight:700;font-size:14px;color:#2d2d2d">${e.degree||''}</div>
          <div style="font-size:13px;color:${accent};font-style:italic">${e.school||''}</div>
          ${e.gpa?`<div style="font-size:12px;color:#999">GPA: ${e.gpa}</div>`:''}
        </div>
      </div>`).join('');

    const skillsHTML = skills.length ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 12px">
        ${skills.map(s=>`
          <div>
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#444;margin-bottom:2px">
              <span>${s.name}</span><span style="color:#999">${s.level}%</span>
            </div>
            <div style="background:#ede7df;border-radius:10px;height:3px">
              <div style="background:${accent};width:${s.level}%;height:100%;border-radius:10px"></div>
            </div>
          </div>`).join('')}
      </div>` : '';

    const customHTML = (customSections||[]).map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it=>`<div class="resume-block" style="margin-bottom:8px"><div style="font-weight:700;font-size:14px;color:#2d2d2d">${it.title||''}</div>${it.subtitle?`<div style="font-size:13px;color:${accent};font-style:italic">${it.subtitle}</div>`:''}<div style="font-size:12px;color:#999">${it.date||''}</div>${it.desc?`<div style="font-size:13px;color:#555;line-height:1.5">${it.desc.replace(/\n/g,'<br>')}</div>`:''}</div>`).join('')}
    `).join('');

    const personalInfo = Object.entries({'Father':personal.father,'DOB':personal.dob,'Gender':personal.gender,'Languages':personal.lang,'Marital Status':personal.marital,'Nationality':personal.nation}).filter(([,v])=>v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fdf8f3;box-sizing:border-box;padding:28px 32px">
        <!-- HEADER -->
        <div style="text-align:center;padding-bottom:18px;border-bottom:2px solid #e2d8cc">
          <div style="display:flex;justify-content:center;margin-bottom:10px">
            <div style="width:${photoSize}px;height:${photoSize}px;border-radius:50%;background:${accent};overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;border:4px solid #fff;box-shadow:0 0 0 2px ${accent}">
              ${photoHTML}
            </div>
          </div>
          <div style="font-size:42px;font-weight:300;color:#1a1a1a;letter-spacing:3px;text-transform:uppercase">${profile.firstName||''} <strong style="font-weight:800">${profile.lastName||''}</strong></div>
          ${profile.tagline?`<div style="font-size:22px;color:${accent};text-transform:uppercase;letter-spacing:2px;margin-top:5px">${profile.tagline}</div>`:''}
          <div style="display:flex;justify-content:center;gap:16px;margin-top:8px;flex-wrap:wrap">
            ${profile.phone?`<span style="font-size:13px;color:#888">📞 ${profile.phone}</span>`:''}
            ${profile.email?`<span style="font-size:13px;color:#888">✉ ${profile.email}</span>`:''}
            ${window.ResumeHelpers.contactSpans(profile, 'font-size:13px;color:#888', false)}
          </div>
        </div>

        ${profile.summary?`${sHead('About Me')}<div style="font-size:13px;color:#555;line-height:1.7;text-align:center;font-style:italic">${profile.summary}</div>`:''}
        ${work.length?`${sHead('Work Experience')}${workHTML}`:''}
        ${edu.length?`${sHead('Education')}${eduHTML}`:''}
        ${skillsHTML?`${sHead('Skills')}${skillsHTML}`:''}
        ${customHTML}

        ${personalInfo.length?`
          ${sHead('Personal Information')}
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px 12px">
            ${personalInfo.map(([k,v])=>`<div style="font-size:13px;color:#555;text-align:center"><div style="font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px">${k}</div>${v}</div>`).join('')}
          </div>
        `:''}

        ${hobbies.length?`${sHead('Hobbies')}<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:5px">${hobbies.map(h=>`<span style="border:1px solid #e2d8cc;color:#777;padding:2px 9px;border-radius:10px;font-size:12px">${h}</span>`).join('')}</div>`:''}

        ${personal.decl?`
          ${sHead('Declaration')}
          <div style="font-size:13px;color:#666;line-height:1.7;text-align:center">${personal.decl}</div>
          <div style="font-size:12px;color:#aaa;text-align:center;margin-top:5px">Date: ___________ &nbsp;&nbsp; Place: ___________</div>
        `:''}
      </div>`;
  }
};
