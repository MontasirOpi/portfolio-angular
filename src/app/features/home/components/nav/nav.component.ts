import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { PROFILE, NAV_LINKS } from '../../../../data/portfolio.data';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
@Component({ selector: 'app-nav', standalone: true, imports: [IconComponent], template: `
<header class="nav"><div class="container nav-inner">
<a href="#top" class="brand" aria-label="Back to top"><span class="logo">OPI</span><span class="brand-name">{{profile.name}}</span></a>
<nav class="desktop" aria-label="Primary"><ul>@for(l of links; track l.href){<li><a [href]="l.href">{{l.label}}</a></li>}</ul></nav>
<div class="actions">
<button class="icon-btn" (click)="theme.toggle()" [attr.aria-label]="theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"><app-icon [name]="theme.isDark() ? 'sun' : 'moon'"></app-icon></button>
<a class="btn btn-primary cv" [href]="profile.cvUrl" target="_blank" rel="noopener">View CV</a>
<button class="icon-btn mobile-btn" (click)="toggleMenu()" [attr.aria-expanded]="open()" aria-controls="mobile-menu" aria-label="Toggle menu">@if(open()){<app-icon name="close"></app-icon>}@else{<app-icon name="menu"></app-icon>}</button>
</div></div>
@if(open()){<nav id="mobile-menu" class="mobile" aria-label="Mobile"><ul>@for(l of links; track l.href){<li><a [href]="l.href" (click)="closeMenu()">{{l.label}}</a></li>}<li><a [href]="profile.cvUrl" target="_blank" rel="noopener" (click)="closeMenu()">View CV</a></li></ul></nav>}
</header>`,
styles: [`.nav{position:sticky;top:0;z-index:50;background:color-mix(in srgb, var(--bg) 88%, transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)} .nav-inner{display:flex;align-items:center;justify-content:space-between;gap:1rem;height:64px} .brand{display:flex;align-items:center;gap:0.6rem;text-decoration:none;font-weight:700} .logo{display:grid;place-items:center;width:34px;height:34px;background:var(--text);color:var(--bg);border-radius:6px;font-family:var(--font-display);font-size:0.85rem;letter-spacing:0.08em} .brand-name{font-family:var(--font-display);font-size:0.95rem} @media(max-width:860px){.brand-name{display:none}} .desktop ul{display:flex;gap:1.6rem;list-style:none;margin:0;padding:0} .desktop a{text-decoration:none;color:var(--text-2);font-size:0.92rem;font-weight:500} .desktop a:hover{color:var(--text)} @media(max-width:860px){.desktop{display:none}} .actions{display:flex;gap:0.5rem;align-items:center} .icon-btn{display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--border);background:var(--surface);border-radius:8px;cursor:pointer;color:var(--text)} .mobile-btn{display:none} @media(max-width:860px){.mobile-btn{display:grid} .cv{display:none}} .mobile{border-top:1px solid var(--border);padding:0.75rem 1.25rem 1rem} .mobile ul{list-style:none;margin:0;padding:0;display:grid;gap:0.25rem} .mobile a{display:block;padding:0.7rem 0.25rem;text-decoration:none;font-weight:500}`] })
export class NavComponent { theme = inject(ThemeService); profile = PROFILE; links = NAV_LINKS; open = signal(false); toggleMenu(){ this.open.update(v=>!v); } closeMenu(){ this.open.set(false); } }
