import { useEffect, useState, useContext } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet-async";
import { maxHeight } from "@mui/system";


export default function Chatbot() {
  const [isLoading, setIsLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  let { userTokenAccess } = useContext(userContext);

  async function getTicket(name) {
    try {
      const { data } = await api.get(`/ai/getNewTicket/?name=${name}`, {
        headers: {
          Authorization: `Bearer ${userTokenAccess}`,
        },
      });

      setTicket(data.ticket);
      console.log("🎟️ New Ticket:", data.ticket);

      setMessages([{ text: `مرحبًا ${name}! كيف يمكنني مساعدتك اليوم؟`, isBot: true }]);
    } catch (error) {
      console.error("Error getting ticket:", error);
      setMessages([
        { text: "تعذر بدء محادثة جديدة، حاول مرة أخرى.", isBot: true },
      ]);
    }
  }

  useEffect(() => {
    if (userTokenAccess && nameSubmitted && username) {
      getTicket(username);
    }
  }, [userTokenAccess, nameSubmitted, username]);

  async function handleSendMessage() {
    if (!inputValue.trim() || !ticket) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const { data } = await api.post(
        "/ai/chat/",
        {
          ticketCode: ticket.code,
          message: userMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${userTokenAccess}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { text: data.reply || "لم يتم استلام رد.", isBot: true },
      ]);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
      setMessages((prev) => [
        ...prev,
        { text: "حصل خطأ أثناء إرسال الرسالة.", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNameSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    setNameSubmitted(true);
  }

  return (
    <>

      <Helmet>
        <title>شات بوت صحي بالذكاء الاصطناعي | عشبة شفاء</title>
        <meta
          name="description"
          content="تحدث مع شات بوت عشبة شفاء المدعوم بالذكاء الاصطناعي للحصول على استشارات فورية حول الأعشاب الطبية والعلاج الطبيعي."
        />
        <meta
          name="keywords"
          content="عشبة شفاء, شات بوت, ذكاء اصطناعي, استشارات صحية, أعشاب طبية, علاج طبيعي, AI Chatbot"
        />

        <meta property="og:title" content="شات بوت صحي بالذكاء الاصطناعي | عشبة شفاء" />
        <meta
          property="og:description"
          content="جرب شات بوت عشبة شفاء لتحصل على إجابات فورية ونصائح صحية دقيقة بالاعتماد على الذكاء الاصطناعي."
        />
        <meta property="og:type" content="website" />

      </Helmet>
      <section className="min-h-screen font-cairo py-8 px-4 flex flex-col bg-green-50" style={{marginTop: "-60px", maxHeight: "90vh"}}>
        <h1 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
          عشبة شفاء بوت
        </h1>

        {!nameSubmitted ? (
          <form
            onSubmit={handleNameSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg"
            
          >
            <label className="block mb-2 font-semibold text-gray-700">
              من فضلك أدخل اسمك للبدء:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="اكتب اسمك..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              بدء المحادثة
            </button>
          </form>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto mb-4 px-2 md:px-8">
              <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl shadow-lg max-w-xs md:max-w-md lg:max-w-lg ${msg.isBot
                      ? "bg-emerald-900 text-white mr-auto text-right"
                      : "bg-white/90 ml-auto text-right"
                      }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ))}

                {isLoading && (
                  <div className="p-4 rounded-2xl shadow-lg max-w-xs md:max-w-md lg:max-w-lg bg-emerald-900 text-white mr-auto text-right">
                    <i className="fa fa-spinner fa-spin mr-2"></i> جاري التفكير...
                  </div>
                )}
              </div>
            </div>

            <div className="px-2 md:px-8 pb-4 mt-auto">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center bg-white/90 shadow-xl rounded-full px-4 py-2 w-full">
                  <i className="fa-solid fa-robot text-green-700 mr-2"></i>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="اكتب سؤالك هنا..."
                    className="flex-1 bg-transparent outline-none px-2"
                  />
                  <button onClick={handleSendMessage} className="ml-2">
                    <i className="fa-solid fa-paper-plane text-green-700"></i>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
