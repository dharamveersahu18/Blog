import React from 'react'
//we create one reusable component.
function Container({children}){
  return(
    <div className='w-full max-w-7xl mx-auto px-4'> {children}</div>
  );
}

export default Container