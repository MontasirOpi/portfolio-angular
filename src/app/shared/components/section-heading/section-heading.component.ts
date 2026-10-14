import { Component, Input } from '@angular/core';
@Component({ selector: 'app-section-heading', standalone: true, template: `<div class="head"><p class="eyebrow">{{eyebrow}}</p><h2 class="display">{{title}}</h2>@if(subtitle){<p class="lede">{{subtitle}}</p>}</div>`, styles: [`.head{max-width:72ch;margin-bottom:2.5rem} h2{margin:0.5rem 0 0.75rem} .lede{margin:0}`] })
export class SectionHeadingComponent { @Input() eyebrow=''; @Input() title=''; @Input() subtitle=''; }
