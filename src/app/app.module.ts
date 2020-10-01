import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ContainerComponent} from './container/container.component';
import {RouterModule, Routes} from '@angular/router';
import {DungeonComponent} from './dungeon/dungeon.component';
import {FaqComponent} from './faq/faq.component';
import {NavComponent} from './nav/nav.component';
import {DungeonDetailComponent} from './dungeon-detail/dungeon-detail.component';
import {FooterComponent} from './footer/footer.component';
import {MultiDungeonDetailComponent} from './multi-dungeon-detail/multi-dungeon-detail.component';
import { RaidComponent } from './raid/raid.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dungeon', component: DungeonComponent},
  {path: 'dungeon/:id', component: DungeonDetailComponent},
  {path: 'dungeon/multi/:id', component: MultiDungeonDetailComponent},
  {path: 'raid', component: RaidComponent},
  {path: 'faq', component: FaqComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContainerComponent,
    DungeonComponent,
    FaqComponent,
    NavComponent,
    DungeonDetailComponent,
    FooterComponent,
    MultiDungeonDetailComponent,
    RaidComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
