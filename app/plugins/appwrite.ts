import { ID } from 'appwrite'
import { Client, Account, Realtime } from 'appwrite'

export default defineNuxtPlugin(() => {

    const config = useRuntimeConfig()

    const client = new Client()

    const realtime = new Realtime(client);

    client
        .setEndpoint(config.public.appwriteEndpoint)
        .setProject(config.public.appwriteProjectId)

    const account = new Account(client)

    return {
        provide: {
            ID,
            client,
            account,
            realtime
        }
    }
})