import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, paginate }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className="flex justify-center mt-4">
      <ul className="pagination flex">
        <li className="page-item">
          <button
            onClick={() => paginate(1)}
            disabled={pageNumbers.length === 0}
            className="page-link arrow m-2"
          >
            {'<'}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link number p-2 m-1 border ">
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={() => paginate(pageCount)}
            disabled={pageNumbers.length === 0}
            className="page-link arrow m-2"
          >
            {'>'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
