import { ID, TablesDB } from 'appwrite'
import { Client, Account, Permission, Role, Query } from 'appwrite'

export default defineNuxtPlugin(() => {

    const config = useRuntimeConfig()

    const client = new Client()

    const tables = new TablesDB(client)

    client
        .setEndpoint(config.public.appwriteEndpoint)
        .setProject(config.public.appwriteProjectId)

    const account = new Account(client)

    const databaseId = config.public.appwriteDatabaseId

    return {
        provide: {
            ID,
            Permission,
            Role,
            Query,
            client,
            account,
            tables,
            databaseId
        }
    }
})