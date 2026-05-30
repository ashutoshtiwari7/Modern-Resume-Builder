/**
 * Shared helpers for resume template rendering.
 */
window.ResumeHelpers = {
  photoSize(profile) {
    return Math.max(10, profile.photoSize || 78);
  },

  photoImg(profile) {
    const size = this.photoSize(profile);
    const zoom = (profile.photoZoom || 100) / 100;
    const ox = profile.photoOffsetX || 0;
    const oy = profile.photoOffsetY || 0;
    return `<div class="resume-photo-clip" style="position:absolute;inset:0;overflow:hidden;display:flex;align-items:center;justify-content:center">
      <img src="${profile.photoSrc}" alt="" class="resume-photo-img" style="max-width:${size}px;max-height:${size}px;width:auto;height:auto;object-fit:contain;transform:translate(${ox}px,${oy}px) scale(${zoom});transform-origin:center center" />
    </div>`;
  },

  photoContent(profile, initials, fallbackStyle) {
    if (profile.photoSrc) {
      return this.photoImg(profile);
    }
    return `<span style="${fallbackStyle}">${initials}</span>`;
  },
};
