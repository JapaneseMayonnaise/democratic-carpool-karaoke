const sharedVar = require('../../config/sharedVariables');

/**
*  Mix 2 trackIdArrays. 
*  Every 2 songs extracted from each trackIdArray.
*/
const mix2Arrays = () => {

  console.log('@mix2aarays before sharedVar.mixedArray', sharedVar.mixedArray);
  console.log('@mix2aarays before sharedVar.trackIdArray_User1', sharedVar.trackIdArray_User1);
  console.log('@mix2aarays before sharedVar.trackIdArray_User2', sharedVar.trackIdArray_User2);

    let whereToInsert = 2;
    for(let i = 0; i < sharedVar.trackIdArray_User1.length; i++)
    {
      sharedVar.trackIdArray_User2.splice(whereToInsert, 0, sharedVar.trackIdArray_User1[i], sharedVar.trackIdArray_User1[i + 1]);
      whereToInsert = whereToInsert + 4;
      i++;
    }

    sharedVar.mixedArray = sharedVar.trackIdArray_User2;

    console.log('@mix2aarays after sharedVar.mixedArray', sharedVar.mixedArray);
    console.log('@mix2aarays after sharedVar.trackIdArray_User1', sharedVar.trackIdArray_User1);
    console.log('@mix2aarays after  sharedVar.trackIdArray_User2', sharedVar.trackIdArray_User2);
    
}

module.exports = {
   mix2Arrays:mix2Arrays
}