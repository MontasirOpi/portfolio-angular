import { Component, computed, signal } from '@angular/core';
import { PROJECTS, Project } from '../../../../data/portfolio.data';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
@Component({ selector: 'app-projects', standalone: true, imports: [SectionHeadingComponent, IconComponent], template: `
<section class="section" id="projects"><div class="container">
<app-section-heading eyebrow="Featured projects" title="Real work, real links" subtitle="12 projects from my portfolio. Production travel apps link to their store listings. Open-source work links to GitHub and pub.dev. No invented metrics."></app-section-heading>
<div class="filters" role="group" aria-label="Filter projects by category">
@for(f of filters; track f){<button [class.active]="filter()===f" (click)="filter.set(f)" [attr.aria-pressed]="filter()===f">{{f}}</button>}
</div>
<p class="count" aria-live="polite">Showing {{filtered().length}} of {{all.length}} projects</p>
<div class="list">
@for(p of filtered(); track p.slug; let idx = $index){
<article class="proj" [class.featured]="idx<3">
<div class="visual">@if(p.image){<img [src]="p.image" [alt]="p.imageAlt || p.name" loading="lazy" width="640" height="400">}@else if(p.networkImage){<img [src]="p.networkImage" [alt]="p.imageAlt || p.name" loading="lazy" width="640" height="400">}@else{<div class="placeholder" aria-hidden="true"><span>{{initials(p.name)}}</span><small>{{p.category}}</small></div>}</div>
<div class="body"><div class="top"><span class="cat">{{p.category}}</span>@if(p.role){<span class="role">{{p.role}}</span>}</div><h3>{{p.name}}</h3><p>{{p.description}}</p><ul class="features">@for(f of p.features; track f){<li>{{f}}</li>}</ul><div class="chips">@for(t of p.technologies; track t){<span class="chip">{{t}}</span>}</div><div class="links">
@if(p.github){<a [href]="p.github" target="_blank" rel="noopener"><app-icon name="github"></app-icon> GitHub</a>}
@if(p.liveDemo){<a [href]="p.liveDemo" target="_blank" rel="noopener"><app-icon name="external"></app-icon> Live Demo</a>}
@if(p.pubDev){<a [href]="p.pubDev" target="_blank" rel="noopener"><app-icon name="external"></app-icon> Pub.dev</a>}
@if(p.playStore){<a [href]="p.playStore" target="_blank" rel="noopener"><app-icon name="external"></app-icon> Play Store</a>}
@if(p.appStore){<a [href]="p.appStore" target="_blank" rel="noopener"><app-icon name="external"></app-icon> App Store</a>}
</div></div>
</article>}
</div>
</div></section>`,
styles: [`.filters{display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem} .filters button{padding:0.55rem 1rem;border:1px solid var(--border);background:var(--surface);border-radius:999px;cursor:pointer;font-weight:600} .filters button.active{background:var(--text);color:var(--bg);border-color:var(--text)} .count{color:var(--text-3);font-size:0.9rem;margin:0 0 1.5rem} .list{display:grid;gap:1.25rem} .proj{display:grid;gap:0;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--surface)} @media(min-width:860px){.proj{grid-template-columns:0.9fr 1.1fr} .proj.featured{grid-template-columns:1fr 1fr}} .visual{background:var(--surface-2);min-height:220px;display:grid;place-items:center;overflow:hidden} .visual img{width:100%;height:100%;object-fit:cover;display:block;aspect-ratio:8/5} .placeholder{display:grid;place-items:center;text-align:center;gap:0.25rem;color:var(--text-2)} .placeholder span{font-family:var(--font-display);font-size:2rem;font-weight:700;color:var(--text)} .body{padding:1.5rem} @media(min-width:860px){.body{padding:2rem}} .top{display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;margin-bottom:0.7rem} .cat{font-family:var(--font-mono);font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);font-weight:600} .role{font-size:0.82rem;color:var(--text-3)} h3{margin:0 0 0.6rem;font-family:var(--font-display);font-size:1.35rem} .body>p{color:var(--text-2);margin:0 0 1rem} .features{margin:0 0 1.1rem;padding-left:1.15rem;color:var(--text-2)} .features li{margin-bottom:0.35rem} .chips{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.15rem} .links{display:flex;flex-wrap:wrap;gap:1rem} .links a{display:inline-flex;gap:0.4rem;align-items:center;font-weight:600;text-decoration:none;font-size:0.9rem} .links a:hover{text-decoration:underline}`] })
export class ProjectsComponent {
  all = PROJECTS; filters = ['All','Mobile','Package','Web'] as const; filter = signal<'All'|'Mobile'|'Package'|'Web'>('All');
  filtered = computed(() => { const f = this.filter(); return f==='All' ? this.all : this.all.filter(p=>p.category===f); });
  initials(name: string): string { return name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase(); }
}
