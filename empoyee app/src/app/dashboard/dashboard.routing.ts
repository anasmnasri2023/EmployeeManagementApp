import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ActivityTimelineComponent } from './dashboard-components/activity-timeline/activity-timeline.component';

export const DashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent
},
{
  path: 'prof',
  component: ActivityTimelineComponent
}];
