
import { createSelector } from 'reselect'


const getUsers = (state) => {
    return state.usersPage.users;
}

export const getUsersCreateSelector = createSelector(getUsers, (users) => {
    return users.filter( u => true );
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getBtnFollow = (state) => {
    return state.usersPage.btnFollow;
}






const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent
 
const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)
 
const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)
 
export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)
 
let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}
 
console.log(subtotalSelector(exampleState))
console.log(taxSelector(exampleState))      
console.log(totalSelector(exampleState))  

// 2.15
// 0.172
// { total: 2.322 }






