import React from 'react';
import generateYearList from './yearList.js'
import '../../../node_modules/bulma/css/bulma.css'
import style from  './SelectGeneration.module.css';

const list = generateYearList();

const SelectGeneration = ({labelText, selectName, setValue}) => 

<div 
   className={`field ${style.generationPickerSpacing} ${style.formBackground} ${style.formSpacing}`}
>
   <label 
      className={`label ${style.labelSize} ${style.labelColour}`}
   >
      {labelText}
   </label>
   <div className="control is-expanded" onChange={setValue} >
      <div className="select is-danger is-medium is-fullwidth">
         <select name={selectName}>
            <option value=''>Select...</option>
            <option value=''>Duh you guess</option>
               { 
                  list.map((eachDecade) => eachDecade.yearBorn.map((eachYear) => 
                     <option 
                        value={eachDecade.decade} 
                        key={eachYear}
                     >
                        {eachYear}
                     </option>
                  ))
               }
         </select>
      </div>
   </div>
</div>

export default SelectGeneration;