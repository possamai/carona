import store from '../store'

export default (to, from, next) => {
    if (store.getters.user) {
        if (to.fullPath === '/signin' || to.fullPath === '/signup' || to.fullPath === '/') {
            next('/hello')
        } 
    } else {
        next()
    }
}