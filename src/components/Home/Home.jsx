import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="font-sans text-[var(--color-black)] bg-[var(--color-secondary)] ">

      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-[var(--color-secondary)] py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          عشبة شفاء 🌿
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          منصة ويب ذكية تساعد المصريين على علاج الأعراض الشائعة باستخدام الأعشاب المحلية
          وربطها بالعادات الغذائية المصرية.
        </p>
        <Link
          to={"dashboard"}
          className="my-10 inline-block bg-[var(--color-primary-light)] text-white px-6 py-3 rounded-lg shadow hover:bg-[var(--color-primary)] transition"
        >
          ابدأ الآن
        </Link>
      </section>

      {/* Chatbot Floating Button */}
      <Link
        to="/chatbot"
        className="fixed bottom-10 right-10 flex items-center justify-center rounded-full bg-green-600 p-4 shadow-lg hover:bg-green-700 transition"
      >
        <i className="fa-solid fa-robot text-white text-3xl"></i>
      </Link>

      {/* عن الفكرة */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
          عن الفكرة
        </h2>
        <p className="text-lg leading-relaxed text-[var(--color-gray)]">
          المنصة بتوفر للمستخدم إمكانية إدخال الأعراض باللهجة المصرية لتحليلها
          واقتراح وصفات عشبية مناسبة. كمان فيها لوحة تحكم شخصية لمتابعة البيانات
          الطبية، مكتبة أعشاب تفاعلية، وقسم "وصفات الأجداد" اللي بيجمع الوصفات الشعبية
          بعد مراجعتها، بالإضافة إلى "قصص تراثية" عن الأعشاب.
        </p>
      </section>

      {/* المميزات */}
      <section className="py-12 px-6 bg-[var(--color-white)]">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] text-center mb-8">
          المميزات الرئيسية
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 rounded-2xl shadow bg-[var(--color-secondary-dark)]">
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
              مكتبة الأعشاب 🌱
            </h3>
            <p className="text-[var(--color-gray)]">
              موسوعة تفاعلية تشمل فوائد وأضرار وطريقة تحضير الأعشاب.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow bg-[var(--color-secondary-dark)]">
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
              لوحة التحكم 📊
            </h3>
            <p className="text-[var(--color-gray)]">
              متابعة بيانات المريض (العمر، الوزن، الأمراض المزمنة) والتحاليل الطبية
              بمساعدة تحليل ذكي.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow bg-[var(--color-secondary-dark)]">
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
              وصفات الأجداد 👵
            </h3>
            <p className="text-[var(--color-gray)]">
              خلطات شعبية متوارثة يتم مراجعتها وإتاحتها للمستخدمين.
            </p>
          </div>
        </div>
      </section>

      {/* الفئة المستهدفة */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
          الفئة المستهدفة
        </h2>
        <ul className="list-disc pr-6 text-[var(--color-gray)] space-y-2">
          <li>مرضى السكري والضغط اللي محتاجين متابعة يومية.</li>
          <li>المصريون اللي بيستخدموا الطب العشبي (حوالي 60% من السكان).</li>
          <li>الأمهات الجدد الباحثات عن حلول طبيعية.</li>
          <li>سكان القرى اللي بيعتمدوا على الأعشاب لضعف الخدمات الصحية.</li>
          <li>الشباب المهتمون بالتراث والطب البديل.</li>
        </ul>
      </section>

      {/* كيف تعمل المنصة */}
      <section className="py-16 px-6 bg-[var(--color-white)]">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] text-center mb-10">
          كيف تعمل المنصة؟
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 rounded-xl bg-[var(--color-secondary-dark)] shadow">
            <i className="fa-solid fa-user text-3xl text-[var(--color-primary)] mb-4"></i>
            <h3 className="font-semibold mb-2">تسجيل البيانات</h3>
            <p className="text-[var(--color-gray)]">
              أنشئ حساب بسيط وأدخل بياناتك (العمر، الوزن، الأمراض المزمنة).
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--color-secondary-dark)] shadow">
            <i className="fa-solid fa-stethoscope text-3xl text-[var(--color-primary)] mb-4"></i>
            <h3 className="font-semibold mb-2">إدخال الأعراض</h3>
            <p className="text-[var(--color-gray)]">
              اكتب أو سجّل صوتيًا الأعراض، والمنصة تقترح لك وصفات عشبية مناسبة.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--color-secondary-dark)] shadow">
            <i className="fa-solid fa-leaf text-3xl text-[var(--color-primary)] mb-4"></i>
            <h3 className="font-semibold mb-2">الحصول على النصائح</h3>
            <p className="text-[var(--color-gray)]">
              استلم نصائح عشبية مخصصة وتذكيرات لمتابعة صحتك باستمرار.
            </p>
          </div>
        </div>
      </section>

      {/* إحصائيات */}
      <section className="py-16 px-6 bg-[var(--color-primary-light)] text-[var(--color-secondary)]">
        <h2 className="text-2xl font-bold text-center mb-10">إحصائيات داعمة</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <p className="text-4xl font-bold">60%</p>
            <p>من المصريين جربوا الأعشاب الطبية</p>
          </div>
          <div>
            <p className="text-4xl font-bold">22%</p>
            <p>من البالغين مصابون بالسكري</p>
          </div>
          <div>
            <p className="text-4xl font-bold">65%</p>
            <p>يستخدمون الأعشاب بجانب الأدوية</p>
          </div>
          <div>
            <p className="text-4xl font-bold">50,000</p>
            <p>مستخدم متوقع في أول سنة</p>
          </div>
        </div>
      </section>

      {/* تواصل معنا */}
      <section className="py-16 px-6 bg-[var(--color-secondary-dark)] text-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">تواصل معنا</h2>
        <p className="text-[var(--color-gray)] mb-6">
          لو عندك استفسار أو اقتراح لتحسين المنصة، تقدر تتواصل معانا بسهولة.
        </p>
        <a
          href="mailto:moatasemosama18@gmail.com"
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg shadow hover:bg-[var(--color-primary-light)] transition"
        >
          أرسل رسالة
        </a>
      </section>

      <footer className="bg-[var(--color-black)] text-[var(--color-secondary)] py-6 text-center text-sm">
        © 2025 عشبة شفاء - جميع الحقوق محفوظة
      </footer>
    </div>
  );
}
