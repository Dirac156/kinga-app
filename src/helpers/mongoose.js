import { States } from "./global.js";

export async function deleteOldDocument(model, time){
  
    // search for documents that are created from 3 days or more, using $lt operator

    if ( States.variables.dbConnection ) {
        const _ = await model.deleteMany({"expiresAt": {$lt: time }});
        console.log(_);
    }

   // recall the function after 1 days, you can change the frequence
   setTimeout(async function() {
       const date = new Date();
       await deleteOldDocument(model, date);
   }, 1000 * 60);    
}

