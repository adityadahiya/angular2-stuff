import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { AuthGuard } from './guard/auth.guard';
import { CoursesComponent } from './courses/courses.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { Level1Component } from './modelling/level1/level1.component';
import { Level2Component } from './modelling/level2/level2.component';
import { Level1QuesComponent } from './modelling/level1-ques/level1-ques.component';
import { Level2QuesComponent } from './modelling/level2-ques/level2-ques.component';
import { ModellingComponent } from './modelling/modelling.component';
import { CompleteComponent } from './modelling/complete/complete.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [{
    path: 'auth',
    component: AuthComponent,
    resolve: [AuthGuard],
    children: [{
      path: 'welcome',
      component: WelcomeComponent,
      data:{
      	'title': 'Welcome'
      }
    },{
      path: 'login',
      component: LoginComponent,
      data:{
      	'title': 'Login'
      }
    },
    {
      path: 'signup',
      component: SignupComponent,
      data:{
        'title': 'Signup'
      }
    }]
  },
  {
    path: '',
    redirectTo: 'auth/welcome',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CoursesComponent,
    data:{
      'title': 'Courses'
    }
  },
   {
    path: 'guidelines',
    component: GuidelinesComponent,
    data:{
      'title': 'Guidelines'
    }
  },
  {
    path: 'modelling',
    component: ModellingComponent,
    children:[
      {
        path: 'level1',
        component: Level1Component,
        data:{
          'title': 'Level 1'
        }
      },  
      {
        path: 'level2',
        component: Level2Component,
        data:{
          'title': 'Level 2'
        }
      },
      {
        path: 'quiz1',
        component: Level1QuesComponent,
        data:{
          'title': 'Level 1 Quiz'
        }
      },
      {
        path: 'quiz2',
        component: Level2QuesComponent,
        data:{
          'title': 'Level 2 Quiz'
        }
      },
      {
        path: 'redirecting',
        component: RedirectComponent,
        data:{
          'title': 'Redirecting...'
        }
      },
      {
        path: 'complete',
        component: CompleteComponent,
        data:{
          'title': 'Complete'
        }
      }
    ]
  }
];

let a = [];
a.push(1);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
