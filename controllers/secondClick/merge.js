const sharedVar = require('../../config/sharedVariables');
const shuffle = require('./shuffle');


const mix2Arrays = () => {

  shuffle.randomArray();

  /**
  *  Mix 2 trackIdArrays. 
  *  Every 2 songs extracted from each trackIdArray.
  */
    sharedVar.mixedArray = sharedVar.finalArray_user1.flatMap((trackId_user1, i) => {
      if(i % 2 === 1) {
            return [trackId_user1, sharedVar.finalArray_user2[i-1], sharedVar.finalArray_user2[i]]
          } else {
            return trackId_user1;
          }
      }  
    ); 

    console.log('sharedVar.mixedArray', sharedVar.mixedArray);
    
}

module.exports = {
   mix2Arrays:mix2Arrays
}