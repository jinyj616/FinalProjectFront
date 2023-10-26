import React from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 가져오기
import '../css/ArticleList.css'; // CSS 파일 경로에 따라 수정

const ArticleList = ({ articles }) => {
  const chunkedArticles = [];
  for (let i = 0; i < 3; i++) {
    chunkedArticles.push([]);
  }

  articles.content.forEach((article, index) => {
    const chunkIndex = index % 3;
    chunkedArticles[chunkIndex].push(article);
  });

  return (
      <div className="cards-wrapper">
        {chunkedArticles.map((row, rowIndex) => (
            <div key={rowIndex} className="card-row">
              {row.map((article, articleIndex) => (
                  <Link to={`/articles/${article.id}`} key={article.id} className="card-link">
                    <div className="card"
                         style={{
                           backgroundImage: `url(${article.image_url})`, // 배경 이미지 설정
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                           backgroundRepeat: 'no-repeat'
                         }}
                    >
                      <div className="card-content">
                        <h1>{article.title}</h1>
                        <p>{article.content}</p> {/* 기사 요약을 표시하는 속성을 사용하도록 수정 */}
                        <div className="date">{article.news_time}</div> {/* 기사 날짜를 표시하는 속성을 사용하도록 수정 */}
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
        ))}
      </div>
  );
};

export default ArticleList;
