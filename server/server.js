import { app } from "./app.js";
app.listen(process.env.PORT, () => {
   console.log(`server running on PORT ${process.env.PORT}`)
})