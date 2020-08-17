import React from 'react'

const Pagination = ({ postPerPage, totalPost, paginate }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <nav>

            <ul className="pagination pag">
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>

        </nav>
    )
}

export default Pagination;
