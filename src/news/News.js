import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from './component/ArticleList';
import ArticlePagination from './component/ArticlePagination';
import ArticleDetail from './component/ArticleDetail';
import axios from 'axios';

function News() {
  const [articles, setArticles] = useState({ content: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page) => {
    axios
        .get(`/api/articles?page=${page}&size=9`)
        .then((response) => {
          setArticles(response.data);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => console.log(error));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (

      <div className="App">
        <Routes>
          <Route
              path="/"
              element={
                <>
                  <ArticleList articles={articles} />
                  <ArticlePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                  />
                </>
              }
          />
          <Route path="articles/:id" element={<ArticleDetail />} />
        </Routes>
      </div>

  );
}

export default News;