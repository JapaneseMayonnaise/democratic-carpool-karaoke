const sharedVar = require('../../config/sharedVariables');

/**
*  Mix 2 trackIdArrays. 
*  Every 2 songs extracted from each trackIdArray.
*/
const mix2Arrays = () => {
    sharedVar.mixedArray = sharedVar.trackIdArray_User1.flatMap((trackId_user1, i) => {
      if(i % 2 === 1) {
            return [trackId_user1, sharedVar.trackIdArray_User2[i-1], sharedVar.trackIdArray_User2[i]]
          } else {
            return trackId_user1;
          }
      }  
    ); 
}

module.exports = {
   mix2Arrays:mix2Arrays
}