import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],       // Array to hold items in the cart
    totalAmount: 0,  // Total cost of items in the cart
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload; // The item to add
            const existingItem = state.items.find(item => item.id === newItem.id); // Check if item already exists by ID

            if (existingItem) {
                // If the item is already in the cart, increase the quantity
                existingItem.quantity += 1;
            } else {
                // If the item is not in the cart, add it with quantity 1
                state.items.push({ ...newItem, quantity: 1 });
            }

            // Update total amount by adding the cost of the new item
            state.totalAmount += parseFloat(newItem.cost.replace('$', ''));
        },
        removeFromCart: (state, action) => {
            const id = action.payload; // The id of the item to remove
            const existingItem = state.items.find(item => item.id === id); // Find the item in the cart

            if (existingItem) {
                // Update total amount by subtracting the cost of the item
                state.totalAmount -= parseFloat(existingItem.cost.replace('$', '')) * existingItem.quantity;
                // Remove the item from the cart
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        clearCart: (state) => {
            // Reset the cart state
            state.items = [];
            state.totalAmount = 0;
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload; // Destructure id and quantity from payload
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                // Update the total amount first
                state.totalAmount -= parseFloat(existingItem.cost.replace('$', '')) * existingItem.quantity;
                // Update quantity
                existingItem.quantity = quantity;
                // Update total amount after changing the quantity
                state.totalAmount += parseFloat(existingItem.cost.replace('$', '')) * existingItem.quantity;
            }
        },
    },
});

// Exporting actions for use in components
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

// Exporting the reducer to be used in the Redux store
export default cartSlice.reducer;
