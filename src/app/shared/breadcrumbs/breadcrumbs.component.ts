import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo: string = ''
  tituloSubscripcion: Subscription

  constructor(private router: Router) {
    this.tituloSubscripcion = this.obtenerArgumentosRuta();
  }

  ngOnDestroy(): void {
    this.tituloSubscripcion.unsubscribe();
  }

  private obtenerArgumentosRuta(): Subscription {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null),
        map(event => event as ActivationEnd),
        map(event => event.snapshot.data)
      ).subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `AdminPro - ${titulo}`;
      });
  }
}
