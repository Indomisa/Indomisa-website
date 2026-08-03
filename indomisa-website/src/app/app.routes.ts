import { Routes } from '@angular/router';
import { ServicesComponent } from './pages/services/services.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { SoftwareDevelopmentComponent, } from './pages/software-development/software-development.component';
import { BusinessAnalysisComponent } from './pages/business-analysis/business-analysis.component';
import { WebDevelopmentComponent } from './pages/web-development/web-development.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/terms/terms.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'services',
    component: ServicesComponent
  },

  {
    path: 'contact',
    component: ContactComponent
  },

  {
    path: 'faq',
    component: FaqPageComponent
  },

  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },

  {
    path: 'terms',
    component: TermsComponent
  },

  {
    path: 'services/software-development',
    component: SoftwareDevelopmentComponent
  }, {
    path: 'services/business-analysis',
    component: BusinessAnalysisComponent
  }, {
    path: 'services/web-development',
    component: WebDevelopmentComponent
  },

  {
    path: '**',
    redirectTo: ''
  }

];