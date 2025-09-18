import React, { useState, useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendarAlt, FaClock, FaEdit, FaTrash, FaBell, FaPlus, FaTimes, FaSave } from 'react-icons/fa';

export default function Schedules() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notifiedEvents, setNotifiedEvents] = useState(new Set());

  // API base URL - استبدل مع عنوان الخادم الفعلي
  const API_BASE_URL = 'http://your-api-ip-address:port';

  // جلب جميع الأحداث عند تحميل المكون
  useEffect(() => {
    fetchEvents();
    
    // التحقق من الإشعارات كل دقيقة
    const notificationInterval = setInterval(checkNotifications, 60000);
    
    return () => clearInterval(notificationInterval);
  }, []);

  // جلب جميع الأحداث من API
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        toast.error('فشل في جلب المواعيد');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('حدث خطأ أثناء جلب المواعيد');
      
      // بيانات تجريبية للعرض عند فشل الاتصال
      const mockEvents = [
        {
          id: 1,
          title: 'اجتماع فريق العمل',
          description: 'مناقشة المشروع الجديد',
          datetime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          title: 'موعد مع العميل',
          description: 'عرض النموذج الأولي',
          datetime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setEvents(mockEvents);
    } finally {
      setIsLoading(false);
    }
  };

  // إنشاء حدث جديد
  const createEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const eventDateTime = new Date(`${formData.date}T${formData.time}`);
      const eventData = {
        title: formData.title,
        description: formData.description,
        datetime: eventDateTime.toISOString()
      };

      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        toast.success('تم إضافة الموعد بنجاح');
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
        });
        setShowForm(false);
        fetchEvents(); // تحديث القائمة
      } else {
        toast.error('فشل في إضافة الموعد');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('حدث خطأ أثناء إضافة الموعد');
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث حدث موجود
  const updateEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const eventDateTime = new Date(`${formData.date}T${formData.time}`);
      const eventData = {
        title: formData.title,
        description: formData.description,
        datetime: eventDateTime.toISOString()
      };

      const response = await fetch(`${API_BASE_URL}/events/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        toast.success('تم تعديل الموعد بنجاح');
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
        });
        setEditMode(false);
        setEditingId(null);
        setShowForm(false);
        fetchEvents(); // تحديث القائمة
      } else {
        toast.error('فشل في تعديل الموعد');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('حدث خطأ أثناء تعديل الموعد');
    } finally {
      setIsLoading(false);
    }
  };

  // حذف حدث
  const deleteEvent = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('تم حذف الموعد بنجاح');
          fetchEvents(); // تحديث القائمة
        } else {
          toast.error('فشل في حذف الموعد');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('حدث خطأ أثناء حذف الموعد');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // تهيئة النموذج للتعديل
  const setupEditForm = (event) => {
    const eventDate = new Date(event.datetime);
    const formattedDate = eventDate.toISOString().split('T')[0];
    const formattedTime = eventDate.toTimeString().slice(0, 5);
    
    setFormData({
      title: event.title,
      description: event.description || '',
      date: formattedDate,
      time: formattedTime,
    });
    setEditMode(true);
    setEditingId(event.id);
    setShowForm(true);
  };

  // التحقق من الإشعارات
  const checkNotifications = useCallback(() => {
    const now = new Date();
    const newNotifiedEvents = new Set(notifiedEvents);
    
    events.forEach(event => {
      const eventDate = new Date(event.datetime);
      const timeDiff = eventDate.getTime() - now.getTime();
      const minutesDiff = timeDiff / (1000 * 60);
      
      if (minutesDiff <= 30 && minutesDiff > 0 && !notifiedEvents.has(event.id)) {
        toast.info(`موعدك "${event.title}" بعد ${Math.round(minutesDiff)} دقيقة`);
        newNotifiedEvents.add(event.id);
      }
    });
    
    setNotifiedEvents(newNotifiedEvents);
  }, [events, notifiedEvents]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
    });
    setEditMode(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-4 md:mb-0">
            <FaCalendarAlt className="inline-block mr-2" />
            إدارة المواعيد
          </h1>
          
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <FaPlus className="ml-2" />
              إضافة موعد جديد
            </button>
          )}
        </div>
        
        {/* نموذج إضافة/تعديل الموعد */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {editMode ? 'تعديل الموعد' : 'إضافة موعد جديد'}
              </h2>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <form onSubmit={editMode ? updateEvent : createEvent}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الموعد</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    placeholder="أدخل عنوان الموعد"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الوقت</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف (اختياري)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="3"
                  placeholder="أضف وصفًا للموعد إذا لزم الأمر"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center"
                >
                  {isLoading ? (
                    <>جاري التحميل...</>
                  ) : (
                    <>
                      {editMode ? 'تعديل الموعد' : 'إضافة الموعد'}
                      {editMode ? <FaSave className="ml-2" /> : <FaPlus className="ml-2" />}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* قائمة المواعيد */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-emerald-600">قائمة المواعيد</h2>
            <div className="flex items-center text-sm text-emerald-600">
              <FaBell className="ml-1" />
              <span>سيصلك إشعار قبل كل موعد بنصف ساعة</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">لا توجد مواعيد مضافة</p>
              <p className="text-gray-400 mt-2">انقر على زر "إضافة موعد جديد" لبدء الإضافة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => {
                const eventDate = new Date(event.datetime);
                const now = new Date();
                const timeDiff = eventDate.getTime() - now.getTime();
                const minutesDiff = timeDiff / (1000 * 60);
                const hoursDiff = timeDiff / (1000 * 60 * 60);
                const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
                
                let timeStatus = '';
                let statusColor = '';
                
                if (minutesDiff <= 30 && minutesDiff > 0) {
                  timeStatus = `بعد ${Math.round(minutesDiff)} دقيقة`;
                  statusColor = 'bg-yellow-100 text-yellow-800';
                } else if (hoursDiff <= 24 && hoursDiff > 0) {
                  timeStatus = `بعد ${Math.round(hoursDiff)} ساعة`;
                  statusColor = 'bg-blue-100 text-blue-800';
                } else if (daysDiff > 1) {
                  timeStatus = `بعد ${Math.floor(daysDiff)} أيام`;
                  statusColor = 'bg-green-100 text-green-800';
                } else if (timeDiff <= 0) {
                  timeStatus = 'منتهي';
                  statusColor = 'bg-gray-100 text-gray-800';
                }
                
                return (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg text-indigo-800">{event.title}</h3>
                      {timeStatus && (
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
                          {timeStatus}
                        </span>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className="text-gray-600 mb-4">{event.description}</p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FaCalendarAlt className="ml-2" />
                      <span>{eventDate.toLocaleDateString('ar-SA')}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FaClock className="ml-2" />
                      <span>{eventDate.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setupEditForm(event)}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center"
                      >
                        <FaEdit className="ml-1" />
                        تعديل
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                      >
                        <FaTrash className="ml-1" />
                        حذف
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}