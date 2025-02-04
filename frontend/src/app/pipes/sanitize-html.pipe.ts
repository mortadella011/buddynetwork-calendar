import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHtml',
    standalone: false
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  
  transform(value: string, ...args: unknown[]): unknown {
    return this.sanitizer.sanitize(SecurityContext.HTML,value);
  }

}
