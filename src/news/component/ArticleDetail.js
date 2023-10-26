import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios
        .get(`/api/articles/${id}`)
        .then((response) => {
          setArticle(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [id]);

  return (
      <div className="article-detail-container">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-info">
          <p className="article-date">{article.news_time}</p>
          <div className="image-container">
            <img src={article.image_url} />
          </div>
          <p className="article-content">{article.news_content}</p>
          <p className="article-press">기사 제공: {article.press}</p>
        </div>
      </div>
  );
};

export default ArticleDetail;
