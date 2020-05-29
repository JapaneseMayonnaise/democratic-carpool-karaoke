 /** 
  * Create clonedArray, which is an array of objects that looks like below
  * [
      {
         decade: '1900',
         yearBorn: [
            '1900', '1901',
            '1902', '1903',
            '1904', '1905',
            '1906', '1907',
            '1908', '1909'
         ]
      },
      {
         decade: '1910',
         yearBorn: [
            '1910', '1911',
            '1912', '1913',
            '1914', '1915',
            '1916', '1917',
            '1918', '1919'
         ]
      },
  * 
  * from 1900 to 2020.
  * 
  * decadeArray looks like 
  *   [ {decade: '1900'}, 
  *     {decade: '1910'},
  *      ... 
  *     {decade: '2020'}
  *    ]
  * 
  */

const generateYearList = () => {
   const num = [9, 8, 7, 6, 5, 4, 3, 2, 1];
   const anotherNum = [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
   
   const decadeArray = anotherNum.map(eachNum => ({ decade: (1900 + eachNum).toString()}));

   const clonedArray = decadeArray.map(element => {
      if(element.decade !== '2020'){
         const yearBorn = num.map(eachNum => (parseInt(element.decade) + eachNum).toString())
         return {...element, yearBorn};
      } else {
         return {...element, yearBorn: ['2020']};
      }  
   });

   return clonedArray;
}

export default generateYearList;