import { createStore } from 'vuex';

export default createStore({
    state: {
        userId: null,
        basket: [],
        basketTotal: 0,
    },
    getters: {
        getUserId: (state) => state.userId,
        getBasket: (state) => state.basket,
        getBasketTotal: (state) => state.basketTotal,
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setBasket(state, basket) {
            state.basket = basket;
        },
        setBasketTotal(state, total) {
            state.basketTotal = total;
        },
        addToBasket(state, newItem) {
            const existingItemIndex = state.basket.findIndex(
                (basketItem) => basketItem.id === newItem.id
            );

            if (existingItemIndex !== -1) {
                // Item already exists, update it with new values
                state.basket[existingItemIndex] = newItem;
            } else {
                state.basket.push(newItem);
            }
        },
        calculateTotal(state) {
            let total = 0;
            state.basket.forEach((item) => {
                total += parseFloat(item.price) * item.quantity;
            });
            state.basketTotal = total.toFixed(2);
        },
        emptyBasket(state) {
            state.basket = [];
            state.basketTotal = 0;
        },
        resetState(state) {
            state.userId = null;
            state.basket = [];
            state.basketTotal = 0;
        },
    },
    actions: {
        updateUserId({ commit }, userId) {
            commit('setUserId', userId);
        },
        addItemToBasket({ commit, dispatch, state }, item) {
            const existingItems = state.basket.filter(
                (basketItem) => basketItem.id === item.id
            );
            const newBasket = state.basket.filter(
                (basketItem) => basketItem.id !== item.id
            );

            newBasket.push(item);
            commit('setBasket', newBasket);
            commit('calculateTotal');
        },
        removeItemFromBasket({ commit, state }, itemId) {
            const itemIndex = state.basket.findIndex(
                (basketItem) => basketItem.id === itemId
            );

            if (itemIndex !== -1) {
                state.basket.splice(itemIndex, 1);
                commit('calculateTotal');
            }
        },
        emptyBasket({ commit }) {
            commit('emptyBasket');
        },
        updateItemQuantity({ commit }, { itemId, quantity }) {
            commit('setBasket', state.basket.map((item) => {
                if (item.id === itemId) {
                    return {...item, quantity };
                }
                return item;
            }));
            commit('calculateTotal');
        },
        resetState({ commit }) {
            commit('resetState');
        },
    },
    modules: {},
});