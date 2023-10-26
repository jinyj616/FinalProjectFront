import React, { useState } from 'react';

export default function Pagination({ currentPage, pageSize, totalItems, onPageChange }) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const maxPages = 5; // 보여질 최대 페이지 수

    // 페이지 목록을 생성
    const generatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
            if (pageNumbers.length === maxPages) {
                break;
            }
        }
        return pageNumbers;
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    style = {{fontWeight: pageNumber === currentPage ? 'bold' : 'normal'}}
                >
                    {pageNumber}
                </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}
