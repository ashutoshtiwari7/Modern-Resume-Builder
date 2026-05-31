/**
 * templates/index.js — Template Registry
 * ----------------------------------------
 * This is the single source of truth for all resume templates.
 * To add a new template:
 *   1. Create templates/t8_your_name.js with the same structure
 *   2. Add its script tag to advanced_resume_builder.html (before this file)
 *   3. Add an entry below pointing to your template key
 *
 * Each template must expose itself on window.ResumeTemplates[id]
 * with at minimum: id, name, tag, description, and a render(data, accentColor) function.
 */

window.TEMPLATE_REGISTRY = [
  window.ResumeTemplates.t1_classic_sidebar,
  window.ResumeTemplates.t2_minimalist_top,
  window.ResumeTemplates.t3_executive_bold,
  window.ResumeTemplates.t4_elegant_timeline,
  window.ResumeTemplates.t5_tech_modern,
  window.ResumeTemplates.t6_compact_fresher,
  window.ResumeTemplates.t7_corporate_grid,
  window.ResumeTemplates.tr1_emily_classic,
  window.ResumeTemplates.tr2_elena_ats,
  window.ResumeTemplates.tr3_olivia_centered,
  window.ResumeTemplates.tr4_jackson_photocenter,
  window.ResumeTemplates.tr5_elise_bold_left,
  window.ResumeTemplates.tr6_alexander_minimal,
  window.ResumeTemplates.tr7_brad_twocol,
];

/** Get template by ID */
window.getTemplate = function(id) {
  return window.TEMPLATE_REGISTRY.find(t => t.id === id) || window.TEMPLATE_REGISTRY[0];
};
