import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import { Helmet } from "react-helmet-async";


export default function Library() {
  const [herbs, setHerbs] = useState([]);

  async function getHerbs() {
    try {
      let { data } = await api.get(
        "/herbs/all/",
      );
      setHerbs(data);
    } catch (error) {
      console.error("Error fetching herbs:", error);
      toast.error("فشل في جلب البيانات");
    }
  }

  useEffect(() => {
    getHerbs();
  }, []);

  return (
    <>


      <Helmet>
        <title>المكتبة الصحية | عشبة شفاء</title>
        <meta
          name="description"
          content="استكشف مكتبة عشبة شفاء الغنية بالمقالات والأبحاث حول الأعشاب الطبية، الطب البديل، ونصائح الصحة الطبيعية."
        />
        <meta
          name="keywords"
          content="عشبة شفاء, مكتبة, مقالات, أعشاب طبية, صحة, طب بديل, علاج طبيعي, موارد صحية"
        />

        <meta property="og:title" content="المكتبة الصحية | عشبة شفاء" />
        <meta
          property="og:description"
          content="مقالات وأبحاث وموارد موثوقة حول الأعشاب والعلاج الطبيعي داخل مكتبة عشبة شفاء."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {herbs.length === 0 ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6 " style={{ marginTop: '-80px' }}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-12 text-center font-cairo">
              🌿 مكتبة الأعشاب
            </h1>

            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
              <table className="w-full border-collapse text-right">
                <thead className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
                  <tr>
                    <th className="px-8 py-6 font-cairo font-bold text-lg">
                      #
                    </th>
                    <th className="px-8 py-6 font-cairo font-bold text-lg">
                      اسم العشبة
                    </th>
                    <th className="px-8 py-6 font-cairo font-bold text-lg">
                      الوصف
                    </th>
                    <th className="px-8 py-6 font-cairo font-bold text-lg">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {herbs.map((herb, index) => (
                    <tr
                      key={herb.id}
                      className="border-b border-emerald-100 last:border-0 hover:bg-emerald-50/50 transition-all duration-300"
                    >
                      <td className="px-8 py-6 text-gray-600 text-lg font-medium">{index + 1}</td>
                      <td className="px-8 py-6 font-semibold text-emerald-800 text-lg">
                        {herb.name}
                      </td>
                      <td className="px-8 py-6 text-gray-700 max-w-md">
                        <div className="line-clamp-2 text-lg leading-relaxed">
                          {herb.description}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <Link
                          to={`/herbDetails/${herb.id}`}
                          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                        >
                          عرض التفاصيل
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
