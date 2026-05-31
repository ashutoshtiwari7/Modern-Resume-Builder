/**
 * Shared helpers for resume template rendering.
 */
window.ResumeHelpers = {
  photoSize(profile) {
    return Math.max(10, profile.photoSize || 78);
  },

  photoImg(profile, containerSize) {
    const size = containerSize || this.photoSize(profile);
    const zoom = (profile.photoZoom || 100) / 100;
    const ox = profile.photoOffsetX || 0;
    const oy = profile.photoOffsetY || 0;
    return `<div class="resume-photo-clip" style="position:absolute;inset:0;overflow:hidden;display:flex;align-items:center;justify-content:center">
      <img src="${profile.photoSrc}" alt="" class="resume-photo-img" style="max-width:${size}px;max-height:${size}px;width:auto;height:auto;object-fit:contain;transform:translate(${ox}px,${oy}px) scale(${zoom});transform-origin:center center" />
    </div>`;
  },

  photoContent(profile, initials, fallbackStyle, containerSize) {
    if (profile.photoSrc) {
      return this.photoImg(profile, containerSize);
    }
    return `<span style="${fallbackStyle}">${initials}</span>`;
  },

  /** Website, GitHub, and portfolio URLs for contact sections. */
  profileUrlItems(profile) {
    return [
      { value: profile.website, icon: '🔗', text: (v) => `${v}` },
      { value: profile.github, icon: '🧑‍💻', text: (v) => `GitHub · ${v}` },
      { value: profile.portfolio, icon: '👤', text: (v) => `Portfolio · ${v}` },
    ].filter(item => item.value);
  },

  contactDivs(profile, style) {
    return this.profileUrlItems(profile).map(item => {
      const label = item.icon ? `${item.icon} ${item.text(item.value)}` : item.text(item.value);
      return `<div style="${style}">${label}</div>`;
    }).join('');
  },

  contactSpans(profile, style, bullet = true) {
    return this.profileUrlItems(profile).map((item, i) => {
      const sep = bullet && i > 0 ? '<span>•</span>' : '';
      const label = item.icon ? `${item.icon} ${item.value}` : item.text(item.value);
      return `${sep}<span style="${style}">${label}</span>`;
    }).join('');
  },

  contactSpansPlain(profile) {
    return this.profileUrlItems(profile).map(item => {
      const label = item.icon ? `${item.icon} ${item.value}` : item.text(item.value);
      return `<span>${label}</span>`;
    }).join('');
  },

  contactPills(profile, style) {
    return this.profileUrlItems(profile).map(item => {
      const label = item.icon ? `${item.icon} ${item.value}` : item.text(item.value);
      return `<span style="${style}">${label}</span>`;
    }).join('');
  },
};
