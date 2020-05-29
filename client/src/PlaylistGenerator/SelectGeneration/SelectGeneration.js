import React from 'react';
import '../../../node_modules/bulma/css/bulma.css'
import style from  './SelectGeneration.module.css';

const SelectGeneration = ({labelText, selectName, setValue}) => 

<div className={`field ${style.generationPickerSpacing} ${style.formBackground} ${style.formSpacing}`}>
   <label className={`label ${style.labelSize} ${style.labelColour} `}>
      {labelText}
   </label>
   <div className="control is-expanded" onChange={setValue} >
      <div className="select is-danger is-medium is-fullwidth">
         <select name={selectName}>
            <option value=''>Choose...</option>
            <option value=''>Don't even ask</option>
            <option value='1930'>Before 1930s</option>
            <option value='1940'>1940s</option>
            <option value='1950'>1950s</option>
            <option value='1960'>1960s</option>
            <option value='1970'>1970s</option>
            <option value='1980'>1980s</option>
            <option value='1990'>1990s</option>
            <option value='2000'>2000s</option>
            <option value='2010'>After 2010s</option>

         </select>
      </div>
   </div>
</div>


export default SelectGeneration;
