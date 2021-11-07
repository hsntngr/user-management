import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Store } from '@ngxs/store';

import { UserRole } from '@store/users/enums/user-role.enum';
import { AuthorizationService } from '@store/auth/services/authorization.service';

@Directive({
  selector: '[appAuthorize]'
})
export class AuthorizeDirective implements OnInit, OnChanges {
  @Input('appAuthorize') roles: UserRole | UserRole[];

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private store: Store,
    private vcRef: ViewContainerRef,
    private authorizationService: AuthorizationService,
    @Optional() private templateRef: TemplateRef<any>,
  ) {
  }

  private runAuthorizationGuard(): void {
    const isAuthorized = this.authorizationService.authorize(this.roles);

    if (this.templateRef && isAuthorized) {
      this.vcRef.clear();
      this.vcRef.createEmbeddedView(this.templateRef);
    } else if (this.templateRef && !isAuthorized) {
      this.vcRef.clear();
    } else if (!isAuthorized && !this.templateRef) {
      this.renderer.removeChild(
        (this.elRef.nativeElement as HTMLElement).parentElement,
        this.elRef.nativeElement,
      );
    }

  }

  ngOnInit(): void {
    if (this.templateRef && this.authorizationService.authorize(this.roles)) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  ngOnChanges({ condition }: SimpleChanges): void {
    if ((condition || { currentValue: null }).currentValue) {
      this.runAuthorizationGuard();
    }
  }
}
