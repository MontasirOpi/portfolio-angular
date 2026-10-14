import { Component } from '@angular/core';
import { WORKFLOW } from '../../../../data/portfolio.data';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
@Component({ selector: 'app-workflow', standalone: true, imports: [SectionHeadingComponent], template: `
<section class="section" id="workflow"><div class="container">
<app-section-heading eyebrow="Workflow" title="How I approach development" subtitle="Practical engineering, not generic claims."></app-section-heading>
<ol class="steps">@for(w of steps; track w.step){<li><span class="num">{{w.step}}</span><h3>{{w.title}}</h3><p>{{w.text}}</p></li>}</ol>
</div></section>`,
styles: [`.steps{list-style:none;margin:0;padding:0;display:grid;gap:1rem} @media(min-width:700px){.steps{grid-template-columns:1fr 1fr}} @media(min-width:1100px){.steps{grid-template-columns:1fr 1fr 1fr 1fr}} .steps li{border:1px solid var(--border);background:var(--surface);border-radius:12px;padding:1.25rem} .steps li:nth-child(7){grid-column:span 1} .num{font-family:var(--font-mono);color:var(--accent);font-weight:600;font-size:0.85rem} h3{margin:0.5rem 0 0.5rem;font-family:var(--font-display);font-size:1.02rem} p{margin:0;color:var(--text-2);font-size:0.93rem}`] })
export class WorkflowComponent { steps = WORKFLOW; }
