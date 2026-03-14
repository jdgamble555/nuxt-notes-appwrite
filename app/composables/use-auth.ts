import { AppwriteException } from "appwrite"

export const useAuth = () => {

    const { $account, $ID } = useNuxtApp()

    const { getUser } = useUser()

    const authError = ref<string | null>(null)

    const authForm = ref({
        email: "",
        password: "",
        name: ""
    })

    const login = async (email: string, password: string) => {
        try {
            await $account.createEmailPasswordSession({
                email,
                password
            })

            await getUser()

        } catch (error) {
            if (error instanceof AppwriteException) {
                authError.value = error.message
            }
            if (error instanceof Error) {
                authError.value = error.message
            }
            throw error
        }
    }

    const register = async (email: string, password: string, name?: string) => {
        try {
            await $account.create({
                userId: $ID.unique(),
                email,
                password,
                name
            })

            await login(email, password)

        } catch (error) {
            if (error instanceof AppwriteException) {
                authError.value = error.message
            }
            if (error instanceof Error) {
                authError.value = error.message
            }
            throw error
        }

    }

    const logout = async () => {
        try {
            await $account.deleteSession({
                sessionId: "current"
            })

            await getUser()

            return {
                error: null
            }
        } catch (error) {
            if (error instanceof AppwriteException) {
                authError.value = error.message
            }
            if (error instanceof Error) {
                authError.value = error.message
            }
            throw error
        }
    }

    return {
        register,
        login,
        logout,
        authError,
        authForm
    }
}
