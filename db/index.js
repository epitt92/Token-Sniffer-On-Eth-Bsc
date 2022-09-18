require('dotenv').config()

// Production
// module.exports = process.env.MONGODB_CONNECTION_STRING || "mongodb+srv://tokenAdmin:tokenPASS2022@cluster0.y3hfx1m.mongodb.net/norug";

// Development
module.exports = process.env.MONGODB_CONNECTION_STRING || "mongodb+srv://tokenAdmin:tokenPASS2022@cluster0.y3hfx1m.mongodb.net/test";

// Local
// module.exports = process.env.MONGODB_CONNECTION_STRING || "mongodb+srv://yaroslav68:yaro2001@cluster0.ndshvvw.mongodb.net/tester";

