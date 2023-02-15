import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmnBorderCard]",
})
export class BorderCardDirective {
  constructor(private el: ElementRef) { 
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  private initialColor = '#f5f5f5';
  private defaultColor = '#009688';
  private defaultHeight = 200;

  @Input('pkmnBorderCard') borderColor: string | undefined;
  // borderColor is an allias  if we do it without allias :
  // @Input() pkmnBorderCard: string | undefined;
  // pkmnBoarderCard is less appropriate, less understandable compared to
  // what it represents

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('#f5f5f5');
  }
  
  private setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  private setBorder(color: string) {
    let border = `solid 4px ${color}`
    this.el.nativeElement.style.border = border;
  }

}
