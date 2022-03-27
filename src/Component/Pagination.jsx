import axios from "axios";
import React, { useState, useEffect } from "react";
import _ from "lodash"

const Pagination = () => {
  const [state, setState] = useState([]);
  const [paginated, setPaginated] = useState([])
  const [currentpage, setCurrentPage] = useState(1);
  const [grid, setGrid] = useState(false)
  const [list, setList] = useState(true)

  const pageSize = 6;
  const pageCount = state? Math.ceil(state.length / pageSize) : 0
  const pages = _.range(1, pageCount + 1)
  
  const pagination = (pageNo) => {
      setCurrentPage(pageNo)
      const startIndex = (pageNo -1)* pageSize;
      const paginatedPost = _(state).slice(startIndex).take(pageSize).value()
      setPaginated(paginatedPost)
  }
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
          setState(res.data)
          setPaginated(_(res.data).slice(0).take(pageSize).value())
        });
  }, []);

  const listView = () => {
   setList(true)
   setGrid(false)
  }

  const gridView = () => {
   setList(false)
   setGrid(true)
  }
  return (
    <div className="container">
        <div className="button_holder my-4">
            <div>
                <button className="btn btn-dark mt-5" onClick={() => {listView()} }>List View</button>
            
            <button className="btn btn-dark mx-5 mt-5"  onClick={() => {gridView()}}>Grid View</button>
            </div>
        </div>
      <div className="row p-2">
        {grid === true || list === false ?
        paginated.map((ele, i) => {
          return (
            <div className="col-md-3  col-sm-3 col-sm-3 col-xs-12 card m-4" key={i} id='col'>
              <div className="card-body" id='card'>
                <h5 className="card-title">{ele.id}. {ele.title}</h5>
                <p className="card-text">{ele.body}</p>
              </div>
            </div>
          );
        }): paginated.map((ele, i) => {
          return (
            <div className="card m-3" key={i} id='col'>
              <div className="card-body">
                <h5 className="card-title">{ele.id}. {ele.title}</h5>
                <p className="card-text">{ele.body}</p>
              </div>
            </div>
          );
        })
        }
         <div className="m-2">
         <nav className="d-flex justify-content-center">
         <ul className="pagination">
         {
          pages.map((page) => {
            
              return <li className={
                  page === currentpage ? "page-item active" : "page-item"
              }>
                  <p className="page-link"
                  onClick={() => pagination(page)}>{page}</p>
              </li>
          })
         }
         </ul>
     </nav>
         </div>
      </div>
    
      
    </div>
  );
};

export default Pagination;
