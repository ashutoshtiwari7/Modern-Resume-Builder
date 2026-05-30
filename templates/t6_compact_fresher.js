/**
 * Template 6: Compact Fresher
 * Compact, space-efficient single-column. Fits everything on one page.
 * Best for: Freshers with limited experience, internship applications.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.t6_compact_fresher = {
  id: 't6_compact_fresher',
  name: 'Compact Fresher',
  tag: 'Fresher',
  thumb_bg: '#ffffff',
  thumb_accent: '#16a34a',
  description: 'Space-efficient single column. Packs everything neatly on one page.',

  render(data, accentColor) {
    const accent = accentColor || '#16a34a';
    const { profile, work, edu, skills, personal, hobbies, customSections } = data;
    const initials = ((profile.firstName || 'A')[0] + (profile.lastName || 'C')[0]).toUpperCase();

    const photoSize = window.ResumeHelpers.photoSize(profile);
    const photoHTML = window.ResumeHelpers.photoContent(profile, initials, 'font-size:18px;font-weight:700;color:#fff');

    const sHead = (title) => `
      <div style="background:${accent};color:#fff;font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:3px 8px;margin:10px 0 6px;border-radius:2px">${title}</div>`;

    const workHTML = work.map(w => `
      <div style="margin-bottom:7px;display:flex;gap:8px">
        <div style="min-width:58px;text-align:right;font-size:7px;color:#999;padding-top:1px;line-height:1.4">${[w.from,w.to].filter(Boolean).join('<br>')}</div>
        <div style="width:1px;background:#e5e5e5;flex-shrink:0"></div>
        <div style="flex:1">
          <span style="font-weight:700;font-size:9px;color:#1a1a1a">${w.role||''}</span>
          ${w.company?`<span style="font-size:8px;color:${accent};margin-left:5px">@ ${w.company}</span>`:''}
          ${w.desc?`<div style="font-size:7.5px;color:#555;line-height:1.5;margin-top:2px">${w.desc.replace(/\n/g,'<br>')}</div>`:''}
        </div>
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div style="margin-bottom:6px;display:flex;gap:8px">
        <div style="min-width:58px;text-align:right;font-size:7px;color:#999;padding-top:1px;line-height:1.4">${[e.from,e.to].filter(Boolean).join('<br>')}</div>
        <div style="width:1px;background:#e5e5e5;flex-shrink:0"></div>
        <div style="flex:1">
          <span style="font-weight:700;font-size:9px;color:#1a1a1a">${e.degree||''}</span>
          <span style="font-size:8px;color:${accent};margin-left:5px">${e.school||''}</span>
          ${e.gpa?`<span style="font-size:7px;color:#999;margin-left:4px">· ${e.gpa}</span>`:''}
        </div>
      </div>`).join('');

    const skillsHTML = skills.length ? `
      <div style="display:flex;flex-wrap:wrap;gap:3px">
        ${skills.map(s=>`<span style="background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;padding:1px 7px;border-radius:10px;font-size:7.5px">${s.name}</span>`).join('')}
      </div>` : '';

    const customHTML = (customSections||[]).map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it=>`<div style="margin-bottom:6px;padding-left:8px;border-left:2px solid #e5e5e5"><span style="font-weight:700;font-size:9px;color:#1a1a1a">${it.title||''}</span>${it.subtitle?`<span style="font-size:8px;color:${accent};margin-left:5px">${it.subtitle}</span>`:''}<span style="font-size:7px;color:#999;margin-left:5px">${it.date||''}</span>${it.desc?`<div style="font-size:7.5px;color:#555;line-height:1.5">${it.desc.replace(/\n/g,'<br>')}</div>`:''}</div>`).join('')}
    `).join('');

    const personalInfo = Object.entries({'Father':personal.father,'DOB':personal.dob,'Gender':personal.gender,'Languages':personal.lang,'Marital Status':personal.marital,'Nationality':personal.nation}).filter(([,v])=>v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;padding:20px 22px;box-sizing:border-box">
        <!-- TOP HEADER: compact horizontal strip -->
        <div style="display:flex;align-items:center;gap:14px;padding-bottom:12px;border-bottom:2px solid ${accent}">
          <div style="width:${photoSize}px;height:${photoSize}px;border-radius:4px;background:${accent};overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${photoHTML}
          </div>
          <div style="flex:1">
            <div style="font-size:18px;font-weight:700;color:#1a1a1a;letter-spacing:-0.5px;line-height:1.1">${profile.firstName||''} ${profile.lastName||''}</div>
            ${profile.tagline?`<div style="font-size:8px;color:${accent};text-transform:uppercase;letter-spacing:1px;margin-top:2px">${profile.tagline}</div>`:''}
          </div>
          <div style="text-align:right">
            ${profile.phone?`<div style="font-size:8px;color:#555">📞 ${profile.phone}</div>`:''}
            ${profile.email?`<div style="font-size:8px;color:#555">✉ ${profile.email}</div>`:''}
            ${profile.website?`<div style="font-size:8px;color:#555">🔗 ${profile.website}</div>`:''}
          </div>
        </div>

        ${profile.summary?`${sHead('Objective / Summary')}<div style="font-size:8px;color:#444;line-height:1.6">${profile.summary}</div>`:''}
        ${edu.length?`${sHead('Education')}${eduHTML}`:''}
        ${work.length?`${sHead('Experience')}${workHTML}`:''}
        ${skillsHTML?`${sHead('Skills')}${skillsHTML}`:''}
        ${customHTML}

        ${personalInfo.length||hobbies.length?`
          <div style="display:grid;grid-template-columns:${personalInfo.length&&hobbies.length?'1fr 1fr':'1fr'};gap:12px;margin-top:4px">
            ${personalInfo.length?`<div>${sHead('Personal Information')}${personalInfo.map(([k,v])=>`<div style="font-size:7.5px;color:#555;margin-bottom:2px"><span style="color:#999">${k}: </span>${v}</div>`).join('')}</div>`:''}
            ${hobbies.length?`<div>${sHead('Hobbies')}<div style="display:flex;flex-wrap:wrap;gap:3px">${hobbies.map(h=>`<span style="background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;padding:1px 7px;border-radius:10px;font-size:7.5px">${h}</span>`).join('')}</div></div>`:''}
          </div>
        `:''}

        ${personal.decl?`
          ${sHead('Declaration')}
          <div style="font-size:7.5px;color:#555;line-height:1.6">${personal.decl}</div>
          <div style="display:flex;justify-content:space-between;font-size:7.5px;color:#aaa;margin-top:6px">
            <span>Date: ___________</span><span>Place: ___________</span><span>Signature: ___________</span>
          </div>
        `:''}
      </div>`;
  }
};
