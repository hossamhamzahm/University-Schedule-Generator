import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(__dirname, '..', '.env')})

const app: express.Application = express();


app.get('*', (req: express.Request, res: express.Response) => {
    res.status(200).send("OK")
})


const port = process.env.PORT || 3030;
app.listen(port, () => console.log("Listening on port", port))