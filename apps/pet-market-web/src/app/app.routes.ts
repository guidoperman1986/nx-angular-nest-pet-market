import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        pathMatch: 'full',
        path: 'products',
        loadComponent: () => import('./products/products.component.js').then(c => c.ProductsComponent)
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
