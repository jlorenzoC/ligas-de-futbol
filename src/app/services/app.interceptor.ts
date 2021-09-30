import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const peticionModificada = this.getPeticionModificada(request);
    return next.handle(peticionModificada);
  }

  private getPeticionModificada(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    return request.clone({
      url: environment.api + request.url,
    });
  }
}
