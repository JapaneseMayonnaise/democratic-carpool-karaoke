const sharedVar = require('../../config/sharedVariables');

// randomly re-order trackIdArrays to give some variety
const randomArray = () => {

  const randomNum_user1 = Math.floor(Math.random() * 4);
  const randomNum_user2 = Math.floor(Math.random() * 4);
  
  switch(randomNum_user1) {
    case 0:
      sharedVar.finalArray_user1 = sharedVar.trackIdArray_User1;
    break;
    case 1:
       sharedVar.finalArray_user1 = [...sharedVar.trackIdArray_User1].sort(); 
      break;
    case 2:
       sharedVar.finalArray_user1 = [...sharedVar.trackIdArray_User1].reverse();
      break;
    default: sharedVar.finalArray_user1 = sharedVar.trackIdArray_User1;
  }

  switch(randomNum_user2) {
    case 0:
      sharedVar.finalArray_user2 = sharedVar.trackIdArray_User2;
    break;
    case 1:
       sharedVar.finalArray_user2 = [...sharedVar.trackIdArray_User2].sort(); 
      break;
    case 2:
       sharedVar.finalArray_user2 = [...sharedVar.trackIdArray_User2].reverse();
      break;
    default: sharedVar.finalArray_user2 = sharedVar.trackIdArray_User2;
  }

}

module.exports = {
  randomArray:randomArray
}

