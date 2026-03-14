import { AppwriteException } from "appwrite"

type Note = {
    note: string,
    id: string
}

export const useNotes = () => {

    const notes = useState<{
        data: Note[],
        loading: boolean
    }>('notes', () => ({
        data: [],
        loading: false
    }))

    const newNote = ref('')

    const noteError = ref<string | null>(null)

    const { user } = useUser()

    const {
        $tables,
        $ID,
        $databaseId,
        $Permission,
        $Role,
        $Query
    } = useNuxtApp()

    const getNotes = async () => {

        if (!user.value.data) {
            throw new Error('User not authenticated')
        }

        const userId = user.value.data.$id

        try {
            notes.value.loading = true
            const { rows } = await $tables.listRows({
                databaseId: $databaseId,
                tableId: 'notes',
                queries: [
                    $Query.equal('author', userId)
                ]
            })

            notes.value.data = rows.map(row => ({
                note: row.note,
                id: row.$id
            }))
        } catch (error) {
            if (error instanceof AppwriteException) {
                noteError.value = error.message
            }
            if (error instanceof Error) {
                noteError.value = error.message
            }
            throw error
        } finally {
            notes.value.loading = false
        }
    }

    const addNote = async () => {

        const note = newNote.value.trim()

        const userData = user.value?.data

        if (!userData) {
            throw new Error('User not authenticated')
        }

        const userId = userData.$id

        // optimistically add note

        const rowId = $ID.unique()

        notes.value.data.push({
            note,
            id: rowId
        })

        newNote.value = ''

        try {
            await $tables.createRow({
                databaseId: $databaseId,
                tableId: 'notes',
                rowId,
                data: {
                    note,
                    author: userId
                },
                permissions: [
                    $Permission.read($Role.user(userId)),
                    $Permission.update($Role.user(userId)),
                    $Permission.delete($Role.user(userId))
                ]
            })

        } catch (error) {

            // remove optimistically added note
            notes.value.data = notes.value.data.filter(n => n.note !== note)

            newNote.value = note

            if (error instanceof AppwriteException) {
                noteError.value = error.message
            }
            if (error instanceof Error) {
                noteError.value = error.message
            }
            throw error
        }
    }

    const removeNote = async (id: string) => {

        // optimistically remove note
        const index = notes.value.data.findIndex(n => n.id === id)

        if (index === -1) {
            noteError.value = 'Note not found'
            return
        }

        const note = notes.value.data[index]!

        notes.value.data.splice(index, 1)

        try {
            await $tables.deleteRow({
                databaseId: $databaseId,
                tableId: 'notes',
                rowId: id
            })
        } catch (error: unknown) {
            // re-add optimistically removed note
            notes.value.data.splice(index, 0, note)
            if (error instanceof AppwriteException) {
                noteError.value = error.message
            }
            if (error instanceof Error) {
                noteError.value = error.message
            }
            throw error
        }
    }

    const resetNotes = () => {
        notes.value = {
            data: [],
            loading: false
        }
    }

    return {
        addNote,
        removeNote,
        notes,
        noteError,
        getNotes,
        resetNotes,
        newNote
    }
}

