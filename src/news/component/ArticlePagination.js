import React, { useState } from 'react';
import '../css/pagination.css'
const ArticlePagination = ({ currentPage, totalPages, onPageChange }) => {
  const displayPages = 5;

  const startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
  const endPage = Math.min(totalPages, startPage + displayPages - 1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
          <button
              key={i}
              className={i === currentPage ? 'active' : ''}
              onClick={() => onPageChange(i)}
          >
            {i}
          </button>
      );
    }
    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
      <div>
        <div className="pagination-container">
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              ◀
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              ▶
            </button>
          </div>
        </div>
      </div>
  );
};

export default ArticlePagination;
