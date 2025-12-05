import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | { id: string; name: string; email: string },
        token: null as null | string,
    }),
    actions: {
        setUser(userData: { id: string; name: string; email: string }, token: string) {
            this.user = userData
            this.token = token
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('token', token)
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
        loadFromStorage() {
            const user = localStorage.getItem('user')
            const token = localStorage.getItem('token')
            if (user && token) {
                this.user = JSON.parse(user)
                this.token = token
            }
        }
    }
})
