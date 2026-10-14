import { Component } from '@angular/core';
import { SKILL_GROUPS } from '../../../../data/portfolio.data';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
@Component({ selector: 'app-skills', standalone: true, imports: [SectionHeadingComponent], template: `
<section class="section" id="skills"><div class="container">
<app-section-heading eyebrow="Skills" title="What I work with" subtitle="Grouped by how I actually use them — no percentages, no inflated levels."></app-section-heading>
<div class="groups">@for(g of groups; track g.title){<article class="group"><h3>{{g.title}}</h3><ul>@for(i of g.items; track i){<li>{{i}}</li>}</ul></article>}</div>
</div></section>`,
styles: [`.groups{display:grid;gap:1rem} @media(min-width:700px){.groups{grid-template-columns:1fr 1fr}} @media(min-width:1100px){.groups{grid-template-columns:1fr 1fr 1fr}} .group{border:1px solid var(--border);background:var(--surface);border-radius:12px;padding:1.35rem} .group h3{margin:0 0 0.9rem;font-family:var(--font-display);font-size:1.05rem} .group ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:0.4rem} .group li{border:1px solid var(--border);background:var(--surface-2);border-radius:999px;padding:0.28rem 0.6rem;font-size:0.84rem}`] })
export class SkillsComponent { groups = SKILL_GROUPS; }
