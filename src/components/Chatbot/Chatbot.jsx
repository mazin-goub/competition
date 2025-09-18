import { useEffect, useState, useContext } from "react";
import api from "../utils/axiosInstance"; // نفس اللي عامل بيه login
import { userContext } from "../../context/UserContext";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([
    { text: "مرحبًا! كيف يمكنني مساعدتك اليوم؟", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState("");

  let { userTokenAccess } = useContext(userContext);
  async function getTicket(){
    try {
        let x = window.prompt('ادخل اسمك');
        const { data } = await api.get(
          `/ai/getNewTicket/?name=${x}`, 
          {
            headers: {
              Authorization: `Bearer ${userTokenAccess}`,
            },
          }
        );
        setTicket(data.ticket); 
        console.log("🎟️ New Ticket:", data.ticket);
      } catch (error) {
        console.error("Error getting ticket:", error);
      }
  }

  useEffect(() => {
    if (userTokenAccess) getTicket();
  }, [userTokenAccess]);

async function handleSendMessage() {
    if (!inputValue.trim() || !ticket) return;

    setMessages((prev) => [...prev, { text: inputValue, isBot: false }]);
    const userMessage = inputValue;
    setInputValue("");

    try {
      console.log("📤 Sending:", {
        ticketCode: ticket.code,
        message: userMessage,
      });

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

      console.log("🤖 API Response:", data);

      setMessages((prev) => [
        ...prev,
        { text: data.reply || "لم يتم استلام رد.", isBot: true },
      ]);
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
      setMessages((prev) => [
        ...prev,
        { text: "حصل خطأ أثناء إرسال الرسالة.", isBot: true },
      ]);
    }
  };

  return (
    <section className="min-h-screen font-cairo py-8 px-4 flex flex-col bg-green-50">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
        عشبة شفاء بوت
      </h1>

      {/* الرسائل */}
      <div className="flex-1 overflow-y-auto mb-4 px-2 md:px-8">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl shadow-lg max-w-xs md:max-w-md lg:max-w-lg ${
                msg.isBot
                  ? "bg-emerald-900 text-white ml-auto text-right"
                  : "bg-white/90 mr-auto text-right"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>

      {/* صندوق الإدخال */}
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
    </section>
  );
}
