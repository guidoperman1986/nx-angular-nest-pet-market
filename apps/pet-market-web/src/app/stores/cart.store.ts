import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Product } from '@prisma/client';

type CartItem = Product & { quantity: number };

type CartState = {
    items: CartItem[],
    totalItems: number;
}

const initialState: CartState = {
    items: [],
    totalItems: 0
}

export const CartStore = signalStore({
    providedIn: 'root'
},
    withState(() => initialState),
    withMethods((store) => ({
        addToCart(product: Product, quantity = 1) {
            const currentItems = store.items();
            const existingItem = currentItems.find(cartItem => cartItem.id === product.id);

            if (existingItem) {
                const updatedItems = store.items().map((cartItem) => {
                    if (cartItem.id === existingItem.id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + quantity
                        }
                    }
                    return cartItem;
                });

                patchState(store, { 
                    items: updatedItems, 
                    totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0) 
                });
            } else {
                patchState(store, {
                    items: [
                        ...store.items(),
                        {
                            ...product,
                            quantity
                        }
                    ],
                    totalItems: store.totalItems() + quantity
                })
            }
        }

    })))