import type { Models } from "appwrite"

type User = Models.User<Models.Preferences>

export const useUser = () => {

    const { $account } = useNuxtApp()

    const user = useState<{
        data: User | null,
        loading: boolean
    }>('user', () => ({
        data: null,
        loading: true
    }))

    const getUser = async () => {
        try {
            user.value.loading = true
            user.value.data = await $account.get()
        } catch (error) {
            user.value.data = null
        } finally {
            user.value.loading = false
        }
        return user
    }

    return {
        user,
        getUser
    }
}