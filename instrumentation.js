import connect from '@/lib/db'

export async function register() {
    await connect()    
}

// Mocking
// server.listen()
// await server.start()