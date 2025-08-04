import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

// Définition du type pour un article dans le panier
export interface CartItem {
	id: string; // Utiliser le nom comme ID unique pour cet exemple
	name: string;
	price: number;
	img: string;
	quantity: number;
}

// Récupérer le panier depuis le localStorage s'il existe
const initialValue: CartItem[] = browser ? JSON.parse(window.localStorage.getItem('cart') || '[]') : [];

// Créer le store writable
export const cart = writable<CartItem[]>(initialValue);

// Chaque fois que le store change, on le sauvegarde dans le localStorage
cart.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('cart', JSON.stringify(value));
	}
});

// --- Fonctions pour manipuler le panier ---

export function addToCart(product: { name: string; price: string; img: string }) {
    const items = get(cart);
    const itemIndex = items.findIndex(i => i.id === product.name);

    // Convertir le prix en nombre (ex: "9.50€" -> 9.50)
    const priceAsNumber = parseFloat(product.price.replace('€', '').replace(',', '.'));

    if (itemIndex !== -1) {
        // L'article existe déjà, on incrémente la quantité
        items[itemIndex].quantity++;
    } else {
        // L'article n'existe pas, on l'ajoute
        items.push({ 
            id: product.name, 
            name: product.name, 
            price: priceAsNumber,
            img: product.img,
            quantity: 1 
        });
    }
    cart.set(items);
}

export function removeFromCart(productId: string) {
    cart.update(items => items.filter(i => i.id !== productId));
}

export function incrementItem(productId: string) {
    cart.update(items => {
        const item = items.find(i => i.id === productId);
        if (item) {
            item.quantity++;
        }
        return items;
    });
}

export function decrementItem(productId: string) {
    cart.update(items => {
        const itemIndex = items.findIndex(i => i.id === productId);
        if (itemIndex !== -1) {
            if (items[itemIndex].quantity > 1) {
                items[itemIndex].quantity--;
            } else {
                // Si la quantité est 1, on retire l'article
                items.splice(itemIndex, 1);
            }
        }
        return items;
    });
}