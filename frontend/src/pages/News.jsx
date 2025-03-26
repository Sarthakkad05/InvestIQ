import React, { useEffect, useState } from 'react';
import Navbar from '../components/home/TopBar';


const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8000/finance-news');
        const data = await response.json();
        const filteredNews = data?.news?.filter(article => article.image) || [];
        setNews(filteredNews.slice(0, 6));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="bg-[#09090b] h-screen text-white text-center text-xl p-10">Loading finance news...</div>;

  return (
    <div>
      <Navbar/>
    <div className="bg-[#09090b] text-white min-h-screen p-10">
      <div className='flex justify-center items-center'>
      <h1 className="text-3xl font-bold mb-8">Latest News & Reports</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <a 
            key={index} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 rounded-lg shadow-md hover:shadow-xl transition bg-[#121214] block border border-[#2e2e32] hover:bg-[#2a2e38]"
          >
            <div className="relative w-full h-48 bg-[#121214] rounded-md flex items-center justify-center">
              {article.image ? (
                <img src={article.image} alt="news" className="w-full h-full object-cover rounded-md" />
              ) : (
                <div className="w-full h-full bg-[#2e2e32] flex items-center justify-center">
                  <span className="text-gray-500 text-xl">No Image</span>
                </div>
              )}
            </div>
            <h2 className="text-lg font-bold mt-2 leading-tight text-white line-clamp-2">{article.headline}</h2>
            <span className="text-blue-400 font-semibold mt-2 block">Read More</span>
          </a>
        ))}
      </div>
      <div className="text-right mt-4">
        <button className="text-white bg-[#1f2937] hover:bg-[#2a2e38] font-semibold py-2 px-4 rounded-lg border border-[#2e2e32]">View All</button>
      </div>
    </div>
    </div>
  );
};

export default News;
