import React, { useEffect, useState } from 'react'

function Pagination({perPageShow,onpagination,total}) {

 const [counter,setCounter]=useState(1)  
 const [numberOfButton]=useState(Math.ceil(total/perPageShow))
 //use Effect
 useEffect(()=>{
  const value=perPageShow*counter
//   console.log("start :",value-perPageShow)
//   console.log("end",value);
onpagination(value-perPageShow,value)
 },[counter]) 
 
 // prev and next button 
 const onClickbutton=(type)=>{
     if(type==="prev"){
      if( counter===1){
          setCounter(1)
      }else{
          setCounter(counter-1)
      }
     }
     if(type==="next"){
        if(Math.ceil(total/perPageShow)===counter){
            setCounter(counter)
        }else{
            setCounter(counter+1)
        }
       }
 }
  return (
      <>
<div className='d-flex justify-content-center'>
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="!#"  onClick={()=>onClickbutton("prev")}>Previous</a></li>
    {new Array(numberOfButton).fill("").map((ele,index)=>{
        return (
            <li className={`page-item ${index+1===counter?"active":null}`}><a className="page-link" href="!#" onClick={()=>{setCounter(index+1)}}>{index+1}</a></li>
        )
       
        })
    }
    
     
    <li class="page-item"><a class="page-link" href="!#"  onClick={()=>onClickbutton("next")}>Next</a></li>
  </ul>
</nav>
    </div>


   
      </>
    
  )
}

export default Pagination
