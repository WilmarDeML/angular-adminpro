import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme: HTMLLinkElement = document.querySelector('#theme') as HTMLLinkElement
  private theme: string = localStorage.getItem('theme') ?? 'purple-dark'
  private links: HTMLCollectionOf<Element> = document.getElementsByClassName('selector')

  constructor() {
    this.linkTheme.href = `./assets/css/colors/${this.theme}.css`
  }

  changeTheme(newTheme: string) {
    this.theme = newTheme;
    this.linkTheme.href = `./assets/css/colors/${this.theme}.css`
    localStorage.setItem('theme', this.theme)
    this.checkCurrentTheme()
  }

  checkCurrentTheme() {
    Array.from(this.links).forEach(element => {
      element.getAttribute('name') !== this.theme
        ? element.classList.remove('working')
        : element.classList.add('working')
    });
  }
}
