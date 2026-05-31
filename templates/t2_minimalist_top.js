/**
 * Template 2: Minimalist Top
 * Single-column with bold top header. Ultra-clean, lots of white space.
 * Best for: Freshers, creative roles, tech jobs.
 */
window.ResumeTemplates = window.ResumeTemplates || {};

window.ResumeTemplates.t2_minimalist_top = {
  id: 't2_minimalist_top',
  name: 'Minimalist Top',
  tag: 'Fresher',
  thumb_bg: '#f7f7f5',
  thumb_accent: '#2d2d2d',
  description: 'Bold header, ultra-clean single column. Perfect for freshers.',

  render(data, accentColor) {
    const accent = accentColor || '#2563eb';
    const { profile, work, edu, skills, personal, hobbies, customSections } = data;
    const initials = ((profile.firstName || 'A')[0] + (profile.lastName || 'C')[0]).toUpperCase();

    const photoSize = window.ResumeHelpers.photoSize(profile);
    const photoHTML = window.ResumeHelpers.photoContent(profile, initials, 'font-size:38px;font-weight:700;color:#fff');

    const sectionHead = (title) => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;margin-top:14px">
        <div style="width:3px;height:16px;background:${accent};border-radius:2px"></div>
        <span style="font-size:14px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:1.5px">${title}</span>
        <div style="flex:1;height:1px;background:#e5e5e5"></div>
      </div>`;

    const workHTML = work.length ? work.map(w => `
      <div style="margin-bottom:9px;padding-left:11px;border-left:2px solid #f0f0f0">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-weight:700;font-size:14px;color:#1a1a1a">${w.role || ''}</div>
            <div style="font-size:13px;color:${accent};font-weight:600">${w.company || ''}</div>
          </div>
          <div style="font-size:12px;color:#888;white-space:nowrap;margin-left:8px">${[w.from,w.to].filter(Boolean).join(' – ')}</div>
        </div>
        ${w.desc ? `<div style="font-size:13px;color:#555;line-height:1.6;margin-top:3px">${w.desc.replace(/\n/g,'<br>')}</div>` : ''}
      </div>`).join('') : '';

    const eduHTML = edu.length ? edu.map(e => `
      <div style="margin-bottom:8px;display:flex;justify-content:space-between">
        <div>
          <div style="font-weight:700;font-size:14px;color:#1a1a1a">${e.degree || ''}</div>
          <div style="font-size:13px;color:${accent}">${e.school || ''}</div>
          ${e.gpa ? `<div style="font-size:12px;color:#888">GPA: ${e.gpa}</div>` : ''}
        </div>
        <div style="font-size:12px;color:#888;white-space:nowrap;margin-left:8px">${[e.from,e.to].filter(Boolean).join(' – ')}</div>
      </div>`).join('') : '';

    const skillsHTML = skills.length ? `
      <div style="display:flex;flex-wrap:wrap;gap:5px">
        ${skills.map(s=>`<span style="border:1.5px solid ${accent};color:${accent};padding:2px 9px;border-radius:3px;font-size:12px;font-weight:600">${s.name}</span>`).join('')}
      </div>` : '';

    const hobbiesHTML = hobbies.length ? `<div style="font-size:13px;color:#555">${hobbies.join(' · ')}</div>` : '';

    const personalRows = Object.entries({
      'Father\'s Name': personal.father, 'Date of Birth': personal.dob, 'Gender': personal.gender,
      'Languages': personal.lang, 'Marital Status': personal.marital, 'Nationality': personal.nation
    }).filter(([,v])=>v);

    const customHTML = (customSections||[]).map(sec => `
      ${sectionHead(sec.title)}
      ${sec.items.map(it=>`<div style="margin-bottom:7px;padding-left:11px;border-left:2px solid #f0f0f0"><div style="font-weight:700;font-size:14px;color:#1a1a1a">${it.title||''}</div>${it.subtitle?`<div style="font-size:13px;color:${accent}">${it.subtitle}</div>`:''}<div style="font-size:12px;color:#888">${it.date||''}</div>${it.desc?`<div style="font-size:13px;color:#555;line-height:1.5;margin-top:2px">${it.desc.replace(/\n/g,'<br>')}</div>`:''}</div>`).join('')}
    `).join('');

    return `
      <div style="width:210mm;min-height:297mm;font-family:inherit;background:#fff;box-sizing:border-box">
        <!-- HEADER -->
        <div style="background:#1a1a1a;padding:24px 28px;display:flex;align-items:center;gap:18px">
          <div style="width:${photoSize}px;height:${photoSize}px;border-radius:50%;background:${accent};overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${photoHTML}
          </div>
          <div style="flex:1">
            <div style="font-size:38px;font-weight:700;color:#fff;letter-spacing:-0.5px;line-height:1.1">${profile.firstName||''} ${profile.lastName||''}</div>
            ${profile.tagline ? `<div style="font-size:14px;color:${accent};text-transform:uppercase;letter-spacing:2px;margin-top:4px">${profile.tagline}</div>` : ''}
            <div style="display:flex;gap:14px;margin-top:8px;flex-wrap:wrap">
              ${profile.phone?`<span style="font-size:13px;color:#aaa">📞 ${profile.phone}</span>`:''}
              ${profile.email?`<span style="font-size:13px;color:#aaa">✉ ${profile.email}</span>`:''}
              ${window.ResumeHelpers.contactSpans(profile, 'font-size:13px;color:#aaa', false)}
            </div>
          </div>
        </div>

        <!-- BODY -->
        <div style="padding:18px 28px;box-sizing:border-box">
          ${profile.summary ? `
            ${sectionHead('Profile')}
            <div style="font-size:13px;color:#444;line-height:1.7;padding-left:11px">${profile.summary}</div>
          ` : ''}

          ${work.length ? `${sectionHead('Work Experience')}${workHTML}` : ''}
          ${edu.length ? `${sectionHead('Education')}${eduHTML}` : ''}
          ${skillsHTML ? `${sectionHead('Technical Skills')}${skillsHTML}` : ''}

          ${customHTML}

          ${personalRows.length ? `
            ${sectionHead('Personal Information')}
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;padding-left:11px">
              ${personalRows.map(([k,v])=>`<div style="font-size:13px;color:#555"><span style="color:#999;margin-right:4px">${k}:</span>${v}</div>`).join('')}
            </div>
          ` : ''}

          ${hobbiesHTML ? `${sectionHead('Hobbies')}${hobbiesHTML}` : ''}

          ${personal.decl ? `
            ${sectionHead('Declaration')}
            <div style="font-size:13px;color:#666;padding-left:11px;line-height:1.6">${personal.decl}</div>
            <div style="font-size:12px;color:#aaa;padding-left:11px;margin-top:5px">Date: ___________ &nbsp;&nbsp; Place: ___________</div>
          ` : ''}
        </div>
      </div>`;
  }
};
