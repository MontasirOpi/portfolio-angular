import { Component } from '@angular/core';
import { NavComponent } from './features/home/components/nav/nav.component';
import { HeroComponent } from './features/home/components/hero/hero.component';
import { AboutComponent } from './features/home/components/about/about.component';
import { SkillsComponent } from './features/home/components/skills/skills.component';
import { AiSectionComponent } from './features/home/components/ai-section/ai-section.component';
import { ProjectsComponent } from './features/home/components/projects/projects.component';
import { ExperienceComponent } from './features/home/components/experience/experience.component';
import { WorkflowComponent } from './features/home/components/workflow/workflow.component';
import { ContactComponent } from './features/home/components/contact/contact.component';
import { FooterComponent } from './features/home/components/footer/footer.component';
@Component({ selector: 'app-root', standalone: true, imports: [NavComponent, HeroComponent, AboutComponent, SkillsComponent, AiSectionComponent, ProjectsComponent, ExperienceComponent, WorkflowComponent, ContactComponent, FooterComponent], templateUrl: './app.html', styleUrl: './app.scss' })
export class App {}
