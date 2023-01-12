//import 'module-alias/register';
import createApp from "./app"

( async () => {
  //Server is Listening
  const app = await createApp();
  app.listen(app.get('port') ,()=> {
    console.log(`
    ----------------------------------
    Beemera Server Initializing on port ${process.env.PORT || '4001'}...
    ----------------------------------
    `)
})
})();
