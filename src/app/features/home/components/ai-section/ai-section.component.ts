import { Component } from '@angular/core';
import { AI_GROUPS } from '../../../../data/portfolio.data';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
@Component({ selector: 'app-ai-section', standalone: true, imports: [SectionHeadingComponent], template: `
<section class="section" id="ai"><div class="container">
<app-section-heading eyebrow="AI engineering" title="How I use AI to build better software" subtitle="AI is part of my engineering workflow — for coding, integration, and review — not a marketing claim. Tools listed are those named in my source portfolio."></app-section-heading>
<div class="grid">@for(g of groups; track g.title){<article><p class="num">{{($index+1).toString().padStart(2,'0')}}</p><h3>{{g.title}}</h3><p>{{g.description}}</p><ul>@for(i of g.items; track i){<li>{{i}}</li>}</ul></article>}</div>
<p class="note">Honest framing: these are tools and workflows I use. I do not claim expert-level mastery of every item, and I do not list tools that were not in the source portfolio.</p>
</div></section>`,
styles: [`.grid{display:grid;gap:1rem} @media(min-width:900px){.grid{grid-template-columns:1fr 1fr 1fr}} article{border-top:2px solid var(--text);padding-top:1.25rem} .num{font-family:var(--font-mono);color:var(--accent);font-weight:600;margin:0} h3{margin:0.5rem 0 0.6rem;font-family:var(--font-display)} article p{color:var(--text-2)} ul{margin:1rem 0 0;padding-left:1.15rem;color:var(--text-2)} li{margin-bottom:0.35rem} .note{margin-top:2rem;padding:1rem 1.15rem;background:var(--accent-soft);border:1px solid var(--border);border-radius:10px;color:var(--text-2);font-size:0.92rem}`] })
export class AiSectionComponent { groups = AI_GROUPS; }
