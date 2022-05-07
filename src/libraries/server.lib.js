

export async function closeServer(server, err, message) {
    try {
        console.log(message, err);
        console.log("closing server")
        await server.close();
    } catch(err) {

    }
}