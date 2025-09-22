import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../utils/axiosInstance";

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
      {herbs.length === 0 ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-10 text-center font-[var(--font-cairo)]">
            🌿 مكتبة الأعشاب
          </h1>

          <div className="overflow-x-auto shadow-2xl rounded-3xl border border-green-200">
            <table className="table-auto w-full border-collapse text-right bg-white">
              <thead className="bg-gradient-to-r from-green-700 to-green-500 text-white">
                <tr>
                  <th className="px-6 py-4 font-[var(--font-cairo)] font-bold text-sm md:text-base">
                    #
                  </th>
                  <th className="px-6 py-4 font-[var(--font-cairo)] font-bold text-sm md:text-base">
                    اسم العشبة
                  </th>
                  <th className="px-6 py-4 font-[var(--font-cairo)] font-bold text-sm md:text-base">
                    الوصف
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {herbs.map((herb, index) => (
                  <tr
                    key={herb.id}
                    className="border-b last:border-0 hover:bg-green-50/80 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-green-900">
                      {herb.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700 max-w-xs md:max-w-md truncate">
                      {herb.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/herbDetails/${herb.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base px-4 py-2 rounded-full shadow-md transition-all duration-200"
                      >
                        عرض المزيد
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
