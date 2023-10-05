import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervaloSubscripcion: Subscription

  constructor() {

    this.intervaloSubscripcion = this.retornaIntervalo().subscribe({
      next: console.log,
      error: console.warn,
      complete: () => console.info('Obs terminado')
    })

    this.retornaObservable().pipe(
      retry(1)
    ).subscribe({
      next(valor) { console.log(`Subs: ${valor}`) },
      error(error) { console.warn(`Error: ${error}`) },
      complete() { console.info('Obs terminado') }
    })
  }

  ngOnDestroy(): void {
    this.intervaloSubscripcion.unsubscribe()
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      // take(4),
      map( valor => valor + 1),
      filter( valor => valor % 2 === 0),
    )
  }

  retornaObservable(): Observable<number> {
    let i = -1
    return new Observable<number>( observer => {
      const intervalo = setInterval(() => {
        ++i
        observer.next(i)

        if (i === 4) {
          clearInterval(intervalo)
          observer.complete()
        }

        if (i === 2) {
          observer.error('i llegó a 2')
        }
      }, 100)
    })
  }
}
