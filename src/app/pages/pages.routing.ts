import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { PagesComponent } from "./pages.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { ProgressComponent } from "./progress/progress.component"
import { Graficas1Component } from "./graficas/graficas1.component"
import { AccountSettingsComponent } from "./account-settings/account-settings.component"
import { PromesasComponent } from "./promesas/promesas.component"
import { RxjsComponent } from "./rxjs/rxjs.component"
import { AuthGuard } from "../guards/auth.guard"

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent, canActivate: [ AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'} },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas1'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de cuenta'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: []
})
export class PagesRoutingModule { }