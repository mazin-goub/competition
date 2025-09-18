// import { useContext, useEffect } from "react";
// import api from "../utils/axiosInstance"
// import Charts from "./Charts"
// import { userContext } from "../../context/UserContext";
// import { useState } from "react";
// import toast from "react-hot-toast";
// // import EditProfileInfo from "./EditProfileInfo";
// import { Link } from "react-router-dom";
// export default function Dashboard() {
//   let { userTokenAccess } = useContext(userContext);
//   const [userInfo, setUserInfo] = useState(null)
//   async function userInformation() {
//     try{

//       let {data} = await api.get(`/auth/account/userProfile/`
//         ,{
//           headers: {
//                 Authorization: `Bearer ${userTokenAccess}`,
//           },
//         }
//       );
//       setUserInfo(data.user)
//     }catch(err){
//       toast.error('خطأ')
//     }
//   }
//   useEffect(()=>{userInformation()},[])
//   return (
//     <>
//     {userInfo && <section className='pt-4 md:pt-15 font-cairo min-h-screen'>
//         <div className="flex flex-col lg:flex-row">
//           {/* Header - becomes full width on mobile, 1/6 on desktop */}
//           <header className="w-full lg:w-1/6 lg:h-5/6 bg-emerald-950 text-white p-4 m-2 lg:m-4 rounded-lg shadow-lg">
//             <h1 className="text-xl font-bold">الحساب</h1>
//             <nav className="mt-4 space-y-2">
//               <a href="#" className="block hover:text-gray-300">الاسم / {userInfo?.name?.first}</a>
//               <a href="#" className="block hover:text-gray-300">العمر / {userInfo?.age}</a>
//               <a href="#" className="block hover:text-gray-300">الجنس / {userInfo?.gender}</a>
//               <a href="#" className="block hover:text-gray-300">الامراض المزمنة / {userInfo?.diseases}</a>
//             </nav>
//           </header>
//           <Link to={"/editProfile"} state={{ userInfo }}>
//   تعديل الحساب
// </Link>

//           <main className="w-full lg:w-5/6 p-2 md:p-4 lg:p-6">

//             <section className="mb-6">
//               <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">نظرة عامة</h1>
//               <div className="cards w-full flex flex-col sm:flex-row flex-wrap justify-start">

//                 <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
//                   <h2 className="text-xl md:text-2xl font-bold mb-2">عدد المواعيد</h2>
//                   <p className="text-2xl md:text-3xl">3</p>
//                 </div>

//                 <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
//                   <h2 className="text-xl md:text-2xl font-bold mb-2">عدد التثارير</h2>
//                   <p className="text-2xl md:text-3xl">5</p>
//                 </div>

//                 <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
//                   <h2 className="text-xl md:text-2xl font-bold mb-2">عدد الوصفات</h2>
//                   <p className="text-2xl md:text-3xl">2</p>
//                 </div>

//               </div>
//             </section>

//             <section className="mb-6">
//               <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">الإحصائيات</h1>
//               <div className="charts overflow-x-auto">
//                 <Charts></Charts>
//               </div>
//             </section>

//             <section className="mb-6">
//               <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">مواعيد</h1>
//               <div className="cards w-full flex flex-col sm:flex-row flex-wrap justify-start">

//                 <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
//                   <h2 className="text-xl md:text-2xl font-bold mb-2">موعد مع د. أحمد</h2>
//                   <p className="mb-1">التاريخ: 2023-10-15</p>
//                   <p className="mb-1">الوقت: 10:00 صباحًا</p>
//                   <p className="mb-1">المكان: مستشفى المدينة</p>
//                 </div>

//                 <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
//                   <h2 className="text-xl md:text-2xl font-bold mb-2">موعد مع د. سارة</h2>
//                   <p className="mb-1">التاريخ: 2023-11-20</p>
//                   <p className="mb-1">الوقت: 02:00 مساءً</p>
//                   <p className="mb-1">المكان: عيادة الشفاء</p>
//                 </div>

//                 <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
//                   <h2 className="text-xl md:text-2xl font-bold mb-2">موعد مع د. ليلى</h2>
//                   <p className="mb-1">التاريخ: 2023-12-05</p>
//                   <p className="mb-1">الوقت: 11:30 صباحًا</p>
//                   <p className="mb-1">المكان: مركز الرعاية الصحية</p>
//                 </div>

//               </div>
//             </section>

//             <section className="mb-6">
//               <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">التقارير</h1>
//               <div className="cards w-full flex flex-col sm:flex-row flex-wrap justify-start">

//                 <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
//                   <h2 className="text-xl md:text-2xl font-bold mb-2">فحص دم شامل</h2>
//                   <a href="#" className="text-blue-300 hover:underline">الاعراض</a><br />
//                   <a href="#" className="text-blue-300 hover:underline">عرض النتائج</a><br />
//                   <p>التوصيات/ كذا كذا</p>
//                   <a href="#" className="text-blue-300 hover:underline">تحميل التقرير</a><br />
//                 </div>

//                 <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
//                   <h2 className="text-xl md:text-2xl font-bold mb-2">فحص ضغط الدم</h2>
//                   <a href="#" className="text-blue-300 hover:underline">الاعراض</a><br />
//                   <a href="#" className="text-blue-300 hover:underline">عرض النتائج</a><br />
//                   <p>التوصيات/ كذا كذا</p>
//                   <a href="#" className="text-blue-300 hover:underline">تحميل التقرير</a><br />
//                 </div>

//               </div>
//             </section>

//           </main>
//         </div>
//       </section> }
      

//     </>
//   )
// }
import { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import Charts from "./Charts";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Dashboard() {
  let { userTokenAccess } = useContext(userContext);
  const [userInfo, setUserInfo] = useState(null);

  async function getUserInfo() {
    try {
      let { data } = await api.get(
        `https://apis.healing-herb.midoghanam.site/auth/account/userProfile/`,
        {
          headers: {
            Authorization: `Bearer ${userTokenAccess}`,
          },
        }
      );
      setUserInfo(data.user);
    } catch (err) {
      toast.error("خطأ في تحميل البيانات");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      {userInfo && (
        <section className="pt-4 md:pt-15 font-cairo min-h-screen">
          <div className="flex flex-col lg:flex-row">
            {/* القائمة الجانبية */}
            <header className="w-full lg:w-1/6 lg:h-5/6 bg-emerald-950 text-white p-4 m-2 lg:m-4 rounded-lg shadow-lg">
              <h1 className="text-xl font-bold">الملف الشخصي</h1>
              <nav className="mt-4 space-y-2">
                <p className="block">الاسم: {userInfo?.name?.first} {userInfo?.name?.last}</p>
                <p className="block">العمر: {userInfo?.age}</p>
                <p className="block">الجنس: {userInfo?.gender}</p>
                <p className="block">الأمراض المزمنة: {userInfo?.diseases}</p>
                <p className="block">الحساسية: {userInfo?.allergies}</p>
                <p className="block">الأدوية: {userInfo?.medications}</p>
              </nav>

              <Link
                to="/editProfile"
                className="mt-4 inline-block bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
              >
                تعديل البيانات
              </Link>
            </header>

            {/* المحتوى الرئيسي */}
            <main className="w-full lg:w-5/6 p-2 md:p-4 lg:p-6">
              <section className="mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">
                  نظرة عامة
                </h1>
                <div className="cards w-full flex flex-col sm:flex-row flex-wrap justify-start">
                  <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      عدد المواعيد
                    </h2>
                    <p className="text-2xl md:text-3xl">3</p>
                  </div>

                  <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      عدد التقارير
                    </h2>
                    <p className="text-2xl md:text-3xl">5</p>
                  </div>

                  <div className="card bg-emerald-900 text-white p-4 m-2 md:m-4 rounded-lg shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-85 mb-4">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      عدد الوصفات
                    </h2>
                    <p className="text-2xl md:text-3xl">2</p>
                  </div>
                </div>
              </section>

              <section className="mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">
                  الإحصائيات
                </h1>
                <div className="charts overflow-x-auto">
                  <Charts />
                </div>
              </section>
            </main>
          </div>
        </section>
      )}
    </>
  );
}
