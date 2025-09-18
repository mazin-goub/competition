import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Library() {
  const [herbs, setHerbs] = useState([]);

  async function getHerbs() {
    try {
      let { data } = await axios.get(
        "https://apis.healing-herb.midoghanam.site/herbs/all/",
        {
          headers: { "ngrok-skip-browser-warning": true },
        }
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
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold text-green-800 mb-6 text-center font-[var(--font-cairo)]">
            مكتبة الأعشاب
          </h1>

          <div className="overflow-x-auto shadow-lg rounded-2xl">
            <table className="table-auto w-full border-collapse text-right bg-white">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-3 font-[var(--font-cairo)] font-bold">رقم العشبة</th>
                  <th className="px-4 py-3 font-[var(--font-cairo)] font-bold">اسم العشبة</th>
                  <th className="px-4 py-3 font-[var(--font-cairo)] font-bold">تفاصيل العشبة</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {herbs.map((herb , index) => (
                  <tr
                    key={herb.id}
                    className="border-b hover:bg-green-50 transition "
                  >
                    <td className="px-4 py-3">{index+1}</td>
                    <td className="px-4 py-3 font-semibold text-green-900">
                        {herb.name}
                      
                    </td>
                    <td className="px-4 py-3 text-gray-700">{herb.description}</td>
                    <td className="cursor-pointer "> <Link to={`/herbDetails/${herb.id}`} className="bg-[var(--color-primary-light)] px-2 rounded-2xl hover:underline w-25">عرض المزيد</Link></td>
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