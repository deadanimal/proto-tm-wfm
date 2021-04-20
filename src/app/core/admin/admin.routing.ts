import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { ManagementTeamComponent } from './management-team/management-team.component';
import { ManagementTaskComponent } from './management-task/management-task.component';
import { ManagementSlaComponent } from './management-sla/management-sla.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            /*{
                path: 'management',
                children: [
                    {
                        path: 'audit-trails',
                        component: ManagementAuditComponent
                    },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    },
                    
                ]
            },*/
            {
                path: 'team',
                component: ManagementTeamComponent
            },
            {
                path: 'task',
                component: ManagementTaskComponent
            },
            {
                path: 'sla',
                component: ManagementSlaComponent
            }
            /*{
                path: 'report',
                component: ReportComponent
            }*/
        ]
    }
]