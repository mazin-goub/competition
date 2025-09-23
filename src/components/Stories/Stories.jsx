import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

export default function StoriesList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await api.get("/herbs/stories/all");
        setStories(res.data);
      } catch (err) {
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  if (loading) return <p className="text-center py-10">جارِ تحميل القصص...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6" style={{marginTop: '-72px'}}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-12 text-center font-cairo">
          🌿 قصص الأعشاب
        </h1>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col overflow-hidden"
              >
                <img
                  src={story.image_url}
                  alt={story.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-emerald-800 mb-3 leading-tight">
                    {story.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                    {story.short_description}
                  </p>
                  
                  <details className="group">
                    <summary className="flex items-center justify-between bg-emerald-100 text-emerald-700 font-semibold py-3 px-4 rounded-xl cursor-pointer hover:bg-emerald-200 transition-all duration-300 list-none">
                      <span>اقرأ القصة كاملة</span>
                      <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {story.story}
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-12 text-center">
            <p className="text-2xl text-gray-500 mb-4">📖 لا توجد قصص حالياً</p>
            <p className="text-gray-600">سيتم إضافة قصص جديدة قريباً</p>
          </div>
        )}
      </div>
    </div>
  );
}
