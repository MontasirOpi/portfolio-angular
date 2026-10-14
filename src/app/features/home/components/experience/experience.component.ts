import { Component } from '@angular/core';
import { EXPERIENCE } from '../../../../data/portfolio.data';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
@Component({ selector: 'app-experience', standalone: true, imports: [SectionHeadingComponent], template: `
<section class="section" id="experience"><div class="container">
<app-section-heading eyebrow="Experience" title="Where I have worked"></app-section-heading>
<div class="timeline">@for(e of exps; track e.company){<article><div class="dates">{{e.dates}}</div><div class="content"><h3>{{e.title}}</h3><p class="company">{{e.company}}</p><ul>@for(r of e.responsibilities; track r){<li>{{r}}</li>}</ul><div class="chips">@for(t of e.technologies; track t){<span class="chip">{{t}}</span>}</div></div></article>}</div>
</div></section>`,
styles: [`.timeline{display:grid;gap:2rem} article{display:grid;gap:0.5rem} @media(min-width:800px){article{grid-template-columns:180px 1fr;gap:2rem}} .dates{font-family:var(--font-mono);font-size:0.85rem;color:var(--text-3);padding-top:0.3rem} .content{border-left:2px solid var(--border);padding-left:1.5rem} h3{margin:0;font-family:var(--font-display);font-size:1.3rem} .company{margin:0.2rem 0 0.9rem;color:var(--accent);font-weight:600} ul{margin:0 0 1rem;padding-left:1.15rem;color:var(--text-2)} li{margin-bottom:0.35rem} .chips{display:flex;flex-wrap:wrap;gap:0.4rem}`] })
export class ExperienceComponent { exps = EXPERIENCE; }
