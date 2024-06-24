const app = require("./app");

// Loads in environment variables from .env file
require("dotenv").config();
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}\nhttp://localhost:${PORT}`);
});
