import React, { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet-async";


export default function Recipe() {
  let { userTokenAccess } = useContext(userContext);
  const [recipes, setRecipes] = useState([]);

  async function getRecipes() {
    let { data } = await api.get(`/community/recipes/`, {
      headers: {
        Authorization: `Bearer ${userTokenAccess}`,
      },
    });
    setRecipes(data.recipes);
  }

  useEffect(() => {
    getRecipes();
  }, []);

  function firstNWords(text, n = 10) {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= n) return text;
    return words.slice(0, n).join(" ") + "…";
  }

  return (
    <>

      <Helmet>
        <title>مجتمع عشبة شفاء | تبادل الخبرات الصحية</title>
        <meta
          name="description"
          content="انضم إلى مجتمع عشبة شفاء وشارك تجاربك الصحية مع الأعشاب والعلاج الطبيعي. تواصل مع الآخرين وتعلم من خبراتهم."
        />
        <meta
          name="keywords"
          content="عشبة شفاء, مجتمع, صحة, طب بديل, أعشاب طبية, تجارب, مناقشات صحية"
        />

        <meta property="og:title" content="مجتمع عشبة شفاء | تبادل الخبرات الصحية" />
        <meta
          property="og:description"
          content="مجتمع صحي لمشاركة التجارب والنصائح حول الأعشاب وفوائدها. انضم الآن وابدأ النقاش."
        />
        <meta property="og:type" content="website" />
      
      </Helmet>

      {recipes.length === 0 ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6 font-cairo" style={{marginTop: '-80px'}}>
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4">
                مجتمعنا
              </h1>
              <p className="text-lg text-gray-600 mb-6">مكان لتبادل الأفكار والمناقشات حول الطب الطبيعي</p>
              {/* <Link
                to={"/createPost"}
                className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold"
              >
                أضف وصفة جديدة 🌿
              </Link> */}
            </header>

            <div className="grid gap-6">
              {recipes.map((rec) => (
                <Link
                  key={rec.id}
                  to={`/community/recipes/${rec.id}`}
                  className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-200 p-6"
                >
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {firstNWords(rec.description, 10)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-medium">{rec.author}</span>
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                      اقرأ المزيد
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

