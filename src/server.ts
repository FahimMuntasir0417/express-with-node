import config from "./config";
import app from "./app";
import 'dotenv/config';

const port = config.port;
app.listen(port, () => {
  console.log(`Example listening app on port ${port}`);
});
