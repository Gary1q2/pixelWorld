export const config = {
    port: 6969, // Backend port
    totalPixels: 10000, // Total number of pixels

    // MySQL configuration
    mysql: {
        host: "localhost",
        user: "root", 
        password: "pokerisfun12",
        database: "pixel_world",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
}