/**
 * Template 3: Executive Bold
 * Right sidebar, large name header, bold typographic hierarchy.
 * Best for: Senior professionals, managers, C-level.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.t3_executive_bold = {
  id: 't3_executive_bold',
  name: 'Executive Bold',
  tag: 'Senior',
  thumb_bg: '#0f1923',
  thumb_accent: '#e8b84b',
  description: 'Right sidebar, strong typographic presence. Built for leaders.',

  render(data, accentColor) {
    const accent = accentColor || '#e8b84b';
    const { profile, work, edu, skills, personal, hobbies, customSections } = data;
    const initials = ((profile.firstName || 'A')[0] + (profile.lastName || 'C')[0]).toUpperCase();

    const photoSize = window.ResumeHelpers.photoSize(profile);
    const photoHTML = window.ResumeHelpers.photoContent(profile, initials, 'font-size:38px;font-weight:900;color:#0f1923');

    const sHead = (title) => `
      <div style="margin-bottom:8px;margin-top:14px">
        <span style="font-size:14px;font-weight:900;color:#0f1923;text-transform:uppercase;letter-spacing:2px">${title}</span>
        <div style="height:2px;background:${accent};margin-top:3px;width:30px"></div>
      </div>`;

    const workHTML = work.map(w => `
      <div class="resume-block" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div style="font-weight:800;font-size:14px;color:#0f1923">${w.role||''}</div>
          <div style="font-size:12px;color:#777;margin-left:6px;white-space:nowrap">${[w.from,w.to].filter(Boolean).join(' – ')}</div>
        </div>
        <div style="font-size:13px;color:${accent};font-weight:700;margin-bottom:2px">${w.company||''}</div>
        ${w.desc?`<div style="font-size:13px;color:#444;line-height:1.6">${w.desc.replace(/\n/g,'<br>')}</div>`:''}
      </div>`).join('');

    const eduHTML = edu.map(e => `
      <div class="resume-block" style="margin-bottom:8px">
        <div style="font-weight:800;font-size:14px;color:#0f1923">${e.degree||''}</div>
        <div style="font-size:13px;color:${accent};font-weight:600">${e.school||''}</div>
        <div style="font-size:12px;color:#888">${[e.from,e.to].filter(Boolean).join(' – ')} ${e.gpa?'· GPA: '+e.gpa:''}</div>
      </div>`).join('');

    const skillsHTML = skills.map(s=>`
      <div class="resume-block" style="margin-bottom:7px">
        <div style="font-size:13px;color:#ccc;margin-bottom:2px;font-weight:600">${s.name}</div>
        <div style="background:rgba(255,255,255,0.1);border-radius:2px;height:3px">
          <div style="background:${accent};width:${s.level}%;height:100%;border-radius:2px"></div>
        </div>
      </div>`).join('');

    const customHTML = (customSections||[]).map(sec => `
      ${sHead(sec.title)}
      ${sec.items.map(it=>`<div class="resume-block" style="margin-bottom:8px"><div style="font-weight:800;font-size:14px;color:#0f1923">${it.title||''}</div>${it.subtitle?`<div style="font-size:13px;color:${accent}">${it.subtitle}</div>`:''}<div style="font-size:12px;color:#888">${it.date||''}</div>${it.desc?`<div style="font-size:13px;color:#444;line-height:1.5">${it.desc.replace(/\n/g,'<br>')}</div>`:''}</div>`).join('')}
    `).join('');

    const personalInfo = Object.entries({'Father':personal.father,'DOB':personal.dob,'Gender':personal.gender,'Language':personal.lang,'Marital':personal.marital,'Nationality':personal.nation}).filter(([,v])=>v);

    return `
      <div style="display:flex;width:210mm;min-height:297mm;font-family:inherit;background:#fff">
        <!-- MAIN CONTENT -->
        <div style="flex:1;padding:0 0 24px 0;box-sizing:border-box">
          <!-- Header band -->
          <div style="background:#0f1923;padding:28px 24px 20px">
            <div style="font-size:45px;font-weight:900;color:#fff;letter-spacing:-1px;line-height:1.1;text-transform:uppercase">${profile.firstName||''} <span style="color:${accent}">${profile.lastName||''}</span></div>
            ${profile.tagline?`<div style="font-size:14px;color:#aaa;text-transform:uppercase;letter-spacing:2.5px;margin-top:5px">${profile.tagline}</div>`:''}
            <div style="display:flex;gap:16px;margin-top:10px;flex-wrap:wrap">
              ${profile.phone?`<span style="font-size:13px;color:#888">📞 ${profile.phone}</span>`:''}
              ${profile.email?`<span style="font-size:13px;color:#888">✉ ${profile.email}</span>`:''}
              ${window.ResumeHelpers.contactSpans(profile, 'font-size:13px;color:#888', false)}
            </div>
          </div>
          <div style="padding:16px 24px">
            ${profile.summary?`${sHead('Professional Summary')}<div style="font-size:13px;color:#444;line-height:1.7">${profile.summary}</div>`:''}
            ${work.length?`${sHead('Work Experience')}${workHTML}`:''}
            ${edu.length?`${sHead('Education')}${eduHTML}`:''}
            ${customHTML}
            ${personal.decl?`${sHead('Declaration')}<div style="font-size:13px;color:#666;line-height:1.6">${personal.decl}</div><div style="font-size:12px;color:#aaa;margin-top:4px">Date: ___________ &nbsp; Place: ___________</div>`:''}
          </div>
        </div>
        <!-- RIGHT SIDEBAR -->
        <div style="width:62mm;background:#0f1923;padding:24px 14px;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
          <!-- Photo -->
          <div style="display:flex;justify-content:center">
            <div style="width:${photoSize}px;height:${photoSize}px;border-radius:4px;background:${accent};overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center">
              ${photoHTML}
            </div>
          </div>
          <!-- Skills -->
          ${skillsHTML?`<div><div style="font-size:13px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">Skills</div>${skillsHTML}</div>`:''}
          <!-- Personal -->
          ${personalInfo.length?`<div><div style="font-size:13px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">Personal</div>${personalInfo.map(([k,v])=>`<div style="font-size:12px;color:#ccc;margin-bottom:3px"><span style="color:#777">${k}: </span>${v}</div>`).join('')}</div>`:''}
          <!-- Hobbies -->
          ${hobbies.length?`<div><div style="font-size:13px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">Interests</div><div style="display:flex;flex-wrap:wrap;gap:4px">${hobbies.map(h=>`<span style="background:rgba(255,255,255,0.08);color:#bbb;padding:2px 6px;border-radius:2px;font-size:12px">${h}</span>`).join('')}</div></div>`:''}
        </div>
      </div>`;
  }
};
