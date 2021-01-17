
import React, {useState} from 'react';
import us from './Pagination.module.css';

const Pagination = (props) => {
 
    let pagesCount = Math.ceil (props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionSize = 10;

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={us.paginator}>

            {portionNumber > 1 && <button className={us.btn} onClick={ () => { setPortionNumber(portionNumber - 1) } } >PREV</button> }

            <div className={us.number}>
                {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map( (p) => {
                    return <span  onClick={ (e) => { props.onPageChanged(p); } }  key={p.toString()} >
                            <a  className={ props.currentPage === p && us.bold }  href='#'>{p}</a>
                        </span>
                })}
            </div>

            {portionCount > portionNumber && <button className={us.btn} onClick={ () => { setPortionNumber(portionNumber + 1) } } >NEXT</button> }

        </div>
    )
}

export default Pagination