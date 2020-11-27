import { createSelector } from 'reselect'

export const calculateTotal = ($0, $1) => $0 + $1;
const getItems = state => state.cart.items
const getDeliveryCost = state => state.cart.delivery === 'standard'  ? 0.00 : 20.00 
export const selectDeliveryCost = createSelector([getDeliveryCost], (cost) => cost)
export const selectCartTotal = createSelector([getItems, selectDeliveryCost], (items, deliveryCost) => items.map(item => item.price * item.quantity).reduce(calculateTotal, 0) + deliveryCost) 