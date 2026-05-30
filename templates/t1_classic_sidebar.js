/**
 * Template 1: Classic Sidebar
 * Two-column layout — dark accent sidebar on left, clean content on right.
 * Best for: Experienced professionals, corporate roles.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.t1_classic_sidebar = {
  id: 't1_classic_sidebar',
  name: 'Classic Sidebar',
  tag: 'Professional',
  thumb_bg: '#1a2332',
  thumb_accent: '#5ba4cf',
  description: 'Two-column with dark sidebar. Timeless corporate look.',

  render(data, accentColor) {
    const accent = accentColor || '#5ba4cf';
    const { profile, work, edu, skills, personal, hobbies, customSections } = data;
    const initials = ((profile.firstName || 'A')[0] + (profile.lastName || 'C')[0]).toUpperCase();

    const photoSize = window.ResumeHelpers.photoSize(profile);
    const photoHTML = window.ResumeHelpers.photoContent(profile, initials, 'font-size:28px;font-weight:700;color:#fff;letter-spacing:1px');

    const workHTML = work.length ? work.map(w => `
      <div style="margin-bottom:10px">
        <div style="font-weight:700;font-size:9.5px;color:#1a2332">${w.role || ''}</div>
        <div style="font-size:8.5px;color:${accent};font-weight:600">${w.company || ''}</div>
        <div style="font-size:7.5px;color:#888;margin-bottom:3px">${[w.from,w.to].filter(Boolean).join(' – ')}</div>
        ${w.desc ? `<div style="font-size:8px;color:#555;line-height:1.5">${w.desc.replace(/\n/g,'<br>')}</div>` : ''}
      </div>`).join('') : '<div style="font-size:8px;color:#aaa">No experience added yet.</div>';

    const eduHTML = edu.length ? edu.map(e => `
      <div style="margin-bottom:8px">
        <div style="font-weight:700;font-size:9px;color:#1a2332">${e.degree || ''}</div>
        <div style="font-size:8.5px;color:${accent};font-weight:600">${e.school || ''}</div>
        <div style="font-size:7.5px;color:#888">${[e.from,e.to].filter(Boolean).join(' – ')} ${e.gpa ? '· '+e.gpa : ''}</div>
      </div>`).join('') : '';

    const skillsHTML = skills.length ? skills.map(s => `
      <div style="margin-bottom:5px">
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#ddd;margin-bottom:2px">
          <span>${s.name}</span><span>${s.level}%</span>
        </div>
        <div style="background:rgba(255,255,255,0.15);border-radius:10px;height:4px">
          <div style="background:${accent};width:${s.level}%;height:100%;border-radius:10px"></div>
        </div>
      </div>`).join('') : '';

    const hobbiesHTML = hobbies.length ? `<div style="display:flex;flex-wrap:wrap;gap:4px">${hobbies.map(h=>`<span style="background:rgba(255,255,255,0.15);color:#ddd;padding:2px 7px;border-radius:10px;font-size:7.5px">${h}</span>`).join('')}</div>` : '';

    const personalHTML = Object.entries({
      'Father': personal.father, 'DOB': personal.dob, 'Gender': personal.gender,
      'Language': personal.lang, 'Marital': personal.marital, 'Nationality': personal.nation
    }).filter(([,v])=>v).map(([k,v])=>`
      <div style="font-size:7.5px;color:#ccc;margin-bottom:3px"><span style="color:#aaa;margin-right:4px">${k}:</span>${v}</div>`).join('');

    const customHTML = (customSections||[]).map(sec => `
      <div style="margin-bottom:12px">
        <div style="font-size:9px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e8e8e8;padding-bottom:4px;margin-bottom:6px">${sec.title}</div>
        ${sec.items.map(it=>`<div style="margin-bottom:6px"><div style="font-weight:700;font-size:9px;color:#1a2332">${it.title||''}</div>${it.subtitle?`<div style="font-size:8px;color:${accent}">${it.subtitle}</div>`:''}<div style="font-size:7.5px;color:#666">${it.date||''}</div>${it.desc?`<div style="font-size:8px;color:#555;line-height:1.5">${it.desc.replace(/\n/g,'<br>')}</div>`:''}</div>`).join('')}
      </div>`).join('');

    return `
      <div style="display:flex;width:210mm;min-height:297mm;font-family:inherit;background:#fff;box-sizing:border-box">
        <!-- SIDEBAR -->
        <div style="width:68mm;background:#1a2332;padding:24px 16px;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
          <!-- Photo -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
            <div style="width:${photoSize}px;height:${photoSize}px;border-radius:50%;background:${accent};overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;border:3px solid rgba(255,255,255,0.2)">
              ${photoHTML}
            </div>
            <div style="text-align:center">
              <div style="font-size:13px;font-weight:700;color:#fff;letter-spacing:0.5px;line-height:1.3">${profile.firstName||''}<br>${profile.lastName||''}</div>
              ${profile.tagline ? `<div style="font-size:8px;color:${accent};text-transform:uppercase;letter-spacing:1px;margin-top:3px">${profile.tagline}</div>` : ''}
            </div>
          </div>
          <!-- Contacts -->
          <div>
            <div style="font-size:8px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:4px">Contact</div>
            ${profile.phone?`<div style="font-size:8px;color:#ccc;margin-bottom:4px">📞 ${profile.phone}</div>`:''}
            ${profile.email?`<div style="font-size:8px;color:#ccc;margin-bottom:4px;word-break:break-all">✉ ${profile.email}</div>`:''}
            ${profile.website?`<div style="font-size:8px;color:#ccc;word-break:break-all">🔗 ${profile.website}</div>`:''}
          </div>
          <!-- Skills -->
          ${skillsHTML ? `<div><div style="font-size:8px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:4px">Skills</div>${skillsHTML}</div>` : ''}
          <!-- Hobbies -->
          ${hobbiesHTML ? `<div><div style="font-size:8px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:4px">Hobbies</div>${hobbiesHTML}</div>` : ''}
          <!-- Personal -->
          ${personalHTML ? `<div><div style="font-size:8px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:4px">Personal</div>${personalHTML}</div>` : ''}
        </div>
        <!-- MAIN -->
        <div style="flex:1;padding:28px 22px;box-sizing:border-box">
          <!-- Summary -->
          ${profile.summary ? `<div style="margin-bottom:16px">
            <div style="font-size:9px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid ${accent};padding-bottom:4px;margin-bottom:8px">Professional Summary</div>
            <div style="font-size:8.5px;color:#444;line-height:1.7">${profile.summary}</div>
          </div>` : ''}
          <!-- Experience -->
          ${work.length ? `<div style="margin-bottom:16px">
            <div style="font-size:9px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid ${accent};padding-bottom:4px;margin-bottom:10px">Experience</div>
            ${workHTML}
          </div>` : ''}
          <!-- Education -->
          ${edu.length ? `<div style="margin-bottom:16px">
            <div style="font-size:9px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid ${accent};padding-bottom:4px;margin-bottom:10px">Education</div>
            ${eduHTML}
          </div>` : ''}
          <!-- Custom -->
          ${customHTML}
          <!-- Declaration -->
          ${personal.decl ? `<div style="margin-top:auto;padding-top:12px;border-top:1px solid #eee">
            <div style="font-size:8px;color:#777;line-height:1.6">${personal.decl}</div>
            <div style="font-size:7.5px;color:#999;margin-top:6px">Date: ___________ &nbsp;&nbsp; Place: ___________</div>
          </div>` : ''}
        </div>
      </div>`;
  }
};
