import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from '@prisma/client';

const CART_LOCALSTORAGE_KEY = 'pet-market';

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
    withState(() => {
        if ('localStorage' in globalThis) {
            return {
                ...initialState,
                items: JSON.parse(localStorage.getItem(CART_LOCALSTORAGE_KEY) ?? '[]') as CartItem[]
            }
        }


        return initialState;
    }),
    withComputed((store) => ({
        totalItems: computed(() =>
            store.items().reduce((acc, item) => {
                return acc + item.quantity;
            }, 0)
        ),
        totalAmount: computed(() =>
            store.items().reduce((acc, item) => {
                return acc + item.quantity * item.price;
            }, 0)
        ),
    })),
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

            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(store.items()))
        },

        updateQuantity(productId: string, quantity: number) {
            const updatedItems = store.items().map((cartItem) => {
                if (cartItem.id === productId) {
                    return {
                        ...cartItem,
                        quantity
                    }
                }
                return cartItem;
            });

            patchState(store, {
                items: updatedItems,
                totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
            });

            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(store.items()))
        },

        removeFromCart(productId: string) {
            const updatedItems = store.items().filter(item => item.id !== productId);
            patchState(store, {
                items: updatedItems,
                totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
            });

            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(store.items()))
        },

        clearCart() {
            patchState(store, { items: [], totalItems: 0 })
            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(store.items()))
        }

    })))