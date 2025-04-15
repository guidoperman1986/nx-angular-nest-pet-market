import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        pathMatch: 'full',
        path: 'products',
        loadComponent: () => import('./products/products.component.js').then(c => c.ProductsComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component.js').then(c => c.CartComponent)
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
