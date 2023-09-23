import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { PagesComponent } from "./pages.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { ProgressComponent } from "./progress/progress.component"
import { Graficas1Component } from "./graficas/graficas1.component"

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component }
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