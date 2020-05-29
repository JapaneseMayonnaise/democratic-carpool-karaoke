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
  *   [{decade: '1900'}, {decade: '1910'},... {decade: '2020'}]
  * 
  */

const generateYearList = () => {
   const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
   const anotherNum = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
   
   const decadeArray = anotherNum.map(eachNum => ({ decade: (1900 + eachNum).toString()}));
   const clonedArray = decadeArray.map(element => {
      const yearBorn = num.map(eachNum => (parseInt(element.decade) + eachNum).toString())
      return {...element, yearBorn};
   });

   return clonedArray;
}

export default generateYearList;