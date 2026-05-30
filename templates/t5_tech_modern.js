/**
 * Template 5: Tech Modern
 * Dark header, code-inspired typography, skill tags as badges.
 * Best for: Software developers, IT, data engineers, Salesforce devs.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.t5_tech_modern = {
  id: 't5_tech_modern',
  name: 'Tech Modern',
  tag: 'Developer',
  thumb_bg: '#0d1117',
  thumb_accent: '#58a6ff',
  description: 'Dark header with badge-style skills. Made for developers.',

  render(data, accentColor) {
    const accent = accentColor || '#58a6ff';
    const { profile, work, edu, skills, personal, hobbies, customSections } = data;
    const initials = ((profile.firstName || 'A')[0] + (profile.lastName || 'C')[0]).toUpperCase();

    const photoSize = window.ResumeHelpers.photoSize(profile);
    const photoHTML = window.ResumeHelpers.photoContent(profile, initials, 'font-size:20px;font-weight:700;color:#0d1117');

    const sHead = (title, icon='▸') => `
      <div style="display:flex;align-items:center;gap:6px;margin:14px 0 8px">
        <span style="color:${accent};font-size:10px">${icon}</span>
        <span style="font-size:9.5px;font-weight:700;color:#e6edf3;text-transform:uppercase;letter-spacing:1.5px">${title}</span>
        <div style="flex:1;height:1px;background:#30363d;margin-left:4px"></div>
      </div>`;

    const workHTML = work.map(w => `
      <div style="margin-bottom:10px;background:#161b22;border-radius:4px;padding:8px 10px;border-left:2px solid ${accent}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-weight:700;font-size:9.5px;color:#e6edf3">${w.role||''}</div>
            <div style="font-size:8.5px;color:${accent};font-weight:600">${w.company||''}</div>
          </div>
          <div style="background:#21262d;border:1px solid #30363d;border-radius:20px;padding:1px 7px;font-size:7px;color:#8b949e;white-space:nowrap;margin-left:6px">${[w.from,w.to].filter(Boolean).join(' → ')}</div>
        </div>
        ${w.desc?`<div style="font-size:8px;color:#8b949e;line-height:1.6;margin-top:4px">${w.desc.replace(/\n/g,'<br>')}</div>`:''}
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-weight:700;font-size:9px;color:#e6edf3">${e.degree||''}</div>
          <div style="font-size:8.5px;color:${accent}">${e.school||''}</div>
          ${e.gpa?`<div style="font-size:7.5px;color:#6e7681">GPA: ${e.gpa}</div>`:''}
        </div>
        <div style="font-size:7.5px;color:#6e7681;white-space:nowrap;margin-left:8px">${[e.from,e.to].filter(Boolean).join(' – ')}</div>
      </div>`).join('');

    const skillsHTML = skills.length ? `
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${skills.map(s=>`<span style="background:#21262d;border:1px solid #30363d;color:${s.level>=80?accent:s.level>=50?'#e6edf3':'#8b949e'};padding:2px 8px;border-radius:3px;font-size:7.5px;font-family:monospace">${s.name}</span>`).join('')}
      </div>` : '';

    const customHTML = (customSections||[]).map(sec => `
      ${sHead(sec.title, '◆')}
      ${sec.items.map(it=>`<div style="margin-bottom:8px;background:#161b22;border-radius:4px;padding:7px 10px;border-left:2px solid #30363d"><div style="font-weight:700;font-size:9px;color:#e6edf3">${it.title||''}</div>${it.subtitle?`<div style="font-size:8px;color:${accent}">${it.subtitle}</div>`:''}<div style="font-size:7.5px;color:#6e7681">${it.date||''}</div>${it.desc?`<div style="font-size:8px;color:#8b949e;line-height:1.5;margin-top:3px">${it.desc.replace(/\n/g,'<br>')}</div>`:''}</div>`).join('')}
    `).join('');

    const personalInfo = Object.entries({'Father':personal.father,'DOB':personal.dob,'Gender':personal.gender,'Languages':personal.lang,'Marital':personal.marital,'Nationality':personal.nation}).filter(([,v])=>v);

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#0d1117;box-sizing:border-box">
        <!-- HEADER -->
        <div style="background:#161b22;border-bottom:1px solid #30363d;padding:22px 24px;display:flex;align-items:center;gap:16px">
          <div style="width:${photoSize}px;height:${photoSize}px;border-radius:6px;background:${accent};overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${photoHTML}
          </div>
          <div>
            <div style="font-size:20px;font-weight:700;color:#e6edf3;letter-spacing:-0.5px">${profile.firstName||''} ${profile.lastName||''}</div>
            ${profile.tagline?`<div style="font-size:8.5px;color:${accent};font-family:monospace;margin-top:3px">// ${profile.tagline}</div>`:''}
            <div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap">
              ${profile.phone?`<span style="font-size:7.5px;color:#8b949e;background:#21262d;padding:2px 7px;border-radius:3px">📞 ${profile.phone}</span>`:''}
              ${profile.email?`<span style="font-size:7.5px;color:#8b949e;background:#21262d;padding:2px 7px;border-radius:3px">✉ ${profile.email}</span>`:''}
              ${profile.website?`<span style="font-size:7.5px;color:#8b949e;background:#21262d;padding:2px 7px;border-radius:3px">🔗 ${profile.website}</span>`:''}
            </div>
          </div>
        </div>
        <!-- BODY -->
        <div style="padding:14px 24px 20px">
          ${profile.summary?`${sHead('Profile','▸')}<div style="font-size:8.5px;color:#8b949e;line-height:1.7;background:#161b22;padding:8px 10px;border-radius:4px">${profile.summary}</div>`:''}
          ${work.length?`${sHead('Experience','▸')}${workHTML}`:''}
          ${edu.length?`${sHead('Education','▸')}${eduHTML}`:''}
          ${skillsHTML?`${sHead('Technical Skills','▸')}${skillsHTML}`:''}
          ${customHTML}
          ${personalInfo.length?`${sHead('Personal','▸')}<div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 12px">${personalInfo.map(([k,v])=>`<div style="font-size:7.5px;color:#8b949e"><span style="color:#6e7681">${k}: </span>${v}</div>`).join('')}</div>`:''}
          ${hobbies.length?`${sHead('Interests','▸')}<div style="display:flex;flex-wrap:wrap;gap:4px">${hobbies.map(h=>`<span style="background:#21262d;border:1px solid #30363d;color:#8b949e;padding:2px 7px;border-radius:3px;font-size:7.5px">${h}</span>`).join('')}</div>`:''}
          ${personal.decl?`${sHead('Declaration','▸')}<div style="font-size:8px;color:#6e7681;line-height:1.6">${personal.decl}</div><div style="font-size:7.5px;color:#484f58;margin-top:4px">Date: ___________ &nbsp; Place: ___________</div>`:''}
        </div>
      </div>`;
  }
};
