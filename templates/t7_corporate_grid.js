/**
 * Template 7: Corporate Grid
 * Two-column body, top full-width header band. Grid-based layout.
 * Best for: Mid-level to senior professionals wanting a polished ATS-friendly format.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.t7_corporate_grid = {
  id: 't7_corporate_grid',
  name: 'Corporate Grid',
  tag: 'Mid-Senior',
  thumb_bg: '#f8f9fa',
  thumb_accent: '#7c3aed',
  description: 'Full-width header + two-column grid body. ATS-friendly and polished.',

  render(data, accentColor) {
    const accent = accentColor || '#7c3aed';
    const { profile, work, edu, skills, personal, hobbies, customSections } = data;
    const initials = ((profile.firstName || 'A')[0] + (profile.lastName || 'C')[0]).toUpperCase();

    const photoSize = window.ResumeHelpers.photoSize(profile);
    const photoHTML = window.ResumeHelpers.photoContent(profile, initials, `font-size:20px;font-weight:700;color:${accent}`);

    const sHeadMain = (title) => `
      <div style="margin:14px 0 8px">
        <div style="font-size:9px;font-weight:800;color:${accent};text-transform:uppercase;letter-spacing:2px">${title}</div>
        <div style="height:1.5px;background:linear-gradient(to right,${accent},transparent);margin-top:3px"></div>
      </div>`;

    const sHeadSide = (title) => `
      <div style="margin:12px 0 7px">
        <div style="font-size:8px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px">${title}</div>
        <div style="height:1px;background:${accent};opacity:0.3;margin-top:2px"></div>
      </div>`;

    const workHTML = work.map(w => `
      <div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-weight:700;font-size:9.5px;color:#1f2937">${w.role||''}</div>
            <div style="font-size:8.5px;color:${accent};font-weight:600">${w.company||''}</div>
          </div>
          <div style="font-size:7.5px;color:#6b7280;background:#f3f4f6;padding:2px 6px;border-radius:3px;white-space:nowrap;margin-left:6px">${[w.from,w.to].filter(Boolean).join(' – ')}</div>
        </div>
        ${w.desc?`<div style="font-size:8px;color:#4b5563;line-height:1.6;margin-top:3px">${w.desc.replace(/\n/g,'<br>')}</div>`:''}
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div style="margin-bottom:8px">
        <div style="font-weight:700;font-size:9px;color:#1f2937">${e.degree||''}</div>
        <div style="font-size:8px;color:${accent}">${e.school||''}</div>
        <div style="font-size:7.5px;color:#9ca3af">${[e.from,e.to].filter(Boolean).join(' – ')} ${e.gpa?'· '+e.gpa:''}</div>
      </div>`).join('');

    const skillsHTML = skills.map(s=>`
      <div style="margin-bottom:6px">
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#374151;margin-bottom:2px">
          <span>${s.name}</span><span style="color:#9ca3af">${s.level}%</span>
        </div>
        <div style="background:#e5e7eb;border-radius:10px;height:3.5px">
          <div style="background:${accent};width:${s.level}%;height:100%;border-radius:10px"></div>
        </div>
      </div>`).join('');

    const customHTML = (customSections||[]).map(sec => `
      ${sHeadMain(sec.title)}
      ${sec.items.map(it=>`<div style="margin-bottom:8px"><div style="font-weight:700;font-size:9px;color:#1f2937">${it.title||''}</div>${it.subtitle?`<div style="font-size:8px;color:${accent}">${it.subtitle}</div>`:''}<div style="font-size:7.5px;color:#9ca3af">${it.date||''}</div>${it.desc?`<div style="font-size:8px;color:#4b5563;line-height:1.5">${it.desc.replace(/\n/g,'<br>')}</div>`:''}</div>`).join('')}
    `).join('');

    const personalInfo = Object.entries({'Father':personal.father,'DOB':personal.dob,'Gender':personal.gender,'Languages':personal.lang,'Marital':personal.marital,'Nationality':personal.nation}).filter(([,v])=>v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#f8f9fa;box-sizing:border-box">
        <!-- FULL WIDTH HEADER -->
        <div style="background:#fff;border-bottom:3px solid ${accent};padding:20px 24px;display:flex;align-items:center;gap:16px">
          <div style="width:${photoSize}px;height:${photoSize}px;border-radius:50%;background:#f3f4f6;border:3px solid ${accent};overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${photoHTML}
          </div>
          <div style="flex:1">
            <div style="font-size:22px;font-weight:800;color:#111827;letter-spacing:-0.5px">${profile.firstName||''} ${profile.lastName||''}</div>
            ${profile.tagline?`<div style="font-size:9px;color:${accent};font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-top:3px">${profile.tagline}</div>`:''}
          </div>
          <div style="text-align:right;display:flex;flex-direction:column;gap:4px">
            ${profile.phone?`<div style="font-size:8px;color:#6b7280">📞 ${profile.phone}</div>`:''}
            ${profile.email?`<div style="font-size:8px;color:#6b7280">✉ ${profile.email}</div>`:''}
            ${profile.website?`<div style="font-size:8px;color:#6b7280">🔗 ${profile.website}</div>`:''}
          </div>
        </div>

        <!-- TWO COLUMN BODY -->
        <div style="display:flex;gap:0">
          <!-- LEFT/MAIN (65%) -->
          <div style="flex:0 0 130mm;padding:14px 18px 18px;box-sizing:border-box;background:#fff;border-right:1px solid #e5e7eb">
            ${profile.summary?`${sHeadMain('Professional Summary')}<div style="font-size:8.5px;color:#4b5563;line-height:1.7">${profile.summary}</div>`:''}
            ${work.length?`${sHeadMain('Work Experience')}${workHTML}`:''}
            ${edu.length?`${sHeadMain('Education')}${eduHTML}`:''}
            ${customHTML}
            ${personal.decl?`${sHeadMain('Declaration')}<div style="font-size:8px;color:#6b7280;line-height:1.6">${personal.decl}</div><div style="font-size:7.5px;color:#9ca3af;margin-top:4px">Date: ___________ &nbsp; Place: ___________</div>`:''}
          </div>
          <!-- RIGHT SIDEBAR (35%) -->
          <div style="flex:1;padding:14px 14px 18px;box-sizing:border-box">
            ${skillsHTML?`${sHeadSide('Skills')}${skillsHTML}`:''}
            ${personalInfo.length?`${sHeadSide('Personal Info')}${personalInfo.map(([k,v])=>`<div style="font-size:7.5px;color:#4b5563;margin-bottom:3px"><span style="color:#9ca3af">${k}: </span>${v}</div>`).join('')}`:''}
            ${hobbies.length?`${sHeadSide('Hobbies')}<div style="display:flex;flex-wrap:wrap;gap:3px">${hobbies.map(h=>`<span style="background:#ede9fe;color:${accent};padding:2px 7px;border-radius:10px;font-size:7.5px">${h}</span>`).join('')}</div>`:''}
          </div>
        </div>
      </div>`;
  }
};
