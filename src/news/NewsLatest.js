import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/NewsLatest.css'; // CSS 파일을 가져옵니다
import { Link } from 'react-router-dom';

function NewsLatest() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 최신 뉴스 기사 가져오기
    axios.get('/api/articles/latest')
        .then(response => {
          setLatestArticles(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
  }, []);

  return (
      <div className="NewsLatest"> {/* NewsLatest 클래스를 적용합니다 */}
        {loading ? (
            <p>Loading...</p>
        ) : (
            <ul>
              {latestArticles.map(article => (
                  <li key={article.id}>
                    <Link to={`/articles/${article.id}`}>{/* Link를 사용하여 상세 페이지로 이동 */}
                      <h3>{article.title}</h3>
                    </Link>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}

export default NewsLatest;
