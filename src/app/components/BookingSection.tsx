import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm, Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/dist/style.css";
import { Clock, DollarSign, MapPin, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingFormData {
  date: Date | undefined;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
];

export function BookingSection() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormData>();

  const selectedTime = watch('time');
  const selectedDate = watch('date');

  const onSubmitBooking = async (data: BookingFormData) => {
  const formData = new FormData();

  formData.append("form-name", "booking");
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("time", data.time);
  formData.append("message", data.message || "");
  formData.append(
    "date",
    data.date ? data.date.toISOString() : ""
  );

  try {
    await fetch("/", {
      method: "POST",
      body: formData,
    });

    // ✅ only show success AFTER Netlify receives it
    setShowSuccessModal(true);
    reset();

  } catch (error) {
    console.error("Form submission error:", error);
    alert("Something went wrong. Please try again.");
  }
};

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const encode = (data: Record<string, any>) => {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(data[key] ?? "")
    )
    .join("&");
};

  return (
    <>
      <section
        id='booking' 
        className="min-h-screen py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-[#F5F1ED] dark:bg-[#0E0E0E] transition-colors duration-700"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1
              className="mb-6 tracking-tight text-[#0E0E0E] dark:text-white"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              }}
            >
              Book Your Session
            </h1>
            <p className="text-[#8A8A8A] dark:text-[#BDBDBD] text-lg max-w-2xl mx-auto">
              Choose your preferred date and time, and I'll get back to you within 24 hours to confirm.
            </p>
          </div>

          {/* Session Details Card */}
          <div className="mb-16 p-8 bg-white dark:bg-[#1A1A1A] rounded-3xl shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F5F1ED] dark:bg-[#0E0E0E] flex items-center justify-center mb-4">
                  <Clock size={24} strokeWidth={1.5} className="text-[#0E0E0E] dark:text-white" />
                </div>
                <p className="text-xs uppercase tracking-wider text-[#8A8A8A] mb-2">Duration</p>
                <p className="text-[#0E0E0E] dark:text-white font-semibold text-lg">1 Hour Session</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F5F1ED] dark:bg-[#0E0E0E] flex items-center justify-center mb-4">
                  <DollarSign size={24} strokeWidth={1.5} className="text-[#0E0E0E] dark:text-white" />
                </div>
                <p className="text-xs uppercase tracking-wider text-[#8A8A8A] mb-2">Session Fee</p>
                <p className="text-[#0E0E0E] dark:text-white font-semibold text-lg">$75.00</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F5F1ED] dark:bg-[#0E0E0E] flex items-center justify-center mb-4">
                  <MapPin size={24} strokeWidth={1.5} className="text-[#0E0E0E] dark:text-white" />
                </div>
                <p className="text-xs uppercase tracking-wider text-[#8A8A8A] mb-2">Location</p>
                <p className="text-[#0E0E0E] dark:text-white font-semibold text-lg">Waycross, GA</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form
  name="booking"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  onSubmit={handleSubmit(onSubmitBooking)}
  className="max-w-6xl mx-auto"
>

  <input type="hidden" name="form-name" value="booking" />
  <input type="hidden" name="bot-field" />
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Left Column - Date & Time Selection */}
              <div className="space-y-10">
                <input
                    type="hidden"
                    name="date"
                    value={watch("date") ? watch("date").toISOString() : ""}
                  />
                {/* Calendar Section */}
                <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-[#0E0E0E] dark:text-white mb-6 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Select Date
                  </h3>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: 'Please select a date' }}
                    render={({ field }) => (
                      <div className="booking-calendar-wrapper">
                        <DayPicker
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={{ before: new Date() }}
                            className="booking-calendar w-full"
                          />
                      </div>
                    )}
                  />
                  {errors.date && (
                    <p className="mt-4 text-sm text-red-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {errors.date.message}
                    </p>
                  )}
                </div>

                {/* Time Slots Section */}
                <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-[#0E0E0E] dark:text-white mb-6 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Select Time
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((slot) => (
                      <label
                        key={slot}
                        className="relative cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="time"
                          value={slot}
                          {...register('time', { required: 'Please select a time slot' })}
                          className="sr-only peer"
                        />
                        <div
                          className={`
                            flex items-center justify-center px-6 py-4 rounded-2xl border-2 
                            transition-all duration-300 font-medium
                            ${
                              selectedTime === slot
                                ? 'bg-[#0E0E0E] dark:bg-white text-white dark:text-[#0E0E0E] border-[#0E0E0E] dark:border-white shadow-lg scale-105'
                                : 'bg-[#F5F1ED] dark:bg-[#0E0E0E] text-[#0E0E0E] dark:text-white border-[#E5E1DC] dark:border-[#2A2A2A] hover:border-[#0E0E0E] dark:hover:border-white hover:shadow-md'
                            }
                          `}
                        >
                          <Clock size={16} strokeWidth={2} className="mr-2" />
                          <span>{slot}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="mt-4 text-sm text-red-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Contact Information */}
              <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-8 shadow-lg space-y-6">
                <h3 className="text-xl font-semibold text-[#0E0E0E] dark:text-white mb-8 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Your Information
                </h3>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm uppercase tracking-wider text-[#8A8A8A] mb-3 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-5 py-4 bg-[#F5F1ED] dark:bg-[#0E0E0E] border-2 border-[#E5E1DC] dark:border-[#2A2A2A] rounded-2xl text-[#0E0E0E] dark:text-white placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#0E0E0E] dark:focus:border-white transition-all duration-300"
                    placeholder="Elena Martinez"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm uppercase tracking-wider text-[#8A8A8A] mb-3 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    className="w-full px-5 py-4 bg-[#F5F1ED] dark:bg-[#0E0E0E] border-2 border-[#E5E1DC] dark:border-[#2A2A2A] rounded-2xl text-[#0E0E0E] dark:text-white placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#0E0E0E] dark:focus:border-white transition-all duration-300"
                    placeholder="elena@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm uppercase tracking-wider text-[#8A8A8A] mb-3 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9\s\-\(\)]+$/,
                        message: 'Please enter a valid phone number',
                      },
                    })}
                    className="w-full px-5 py-4 bg-[#F5F1ED] dark:bg-[#0E0E0E] border-2 border-[#E5E1DC] dark:border-[#2A2A2A] rounded-2xl text-[#0E0E0E] dark:text-white placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#0E0E0E] dark:focus:border-white transition-all duration-300"
                    placeholder="912-555-0123"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm uppercase tracking-wider text-[#8A8A8A] mb-3 font-medium">
                    Tell me about your vision *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    {...register('message', { required: 'Please share your vision for the shoot' })}
                    className="w-full px-5 py-4 bg-[#F5F1ED] dark:bg-[#0E0E0E] border-2 border-[#E5E1DC] dark:border-[#2A2A2A] rounded-2xl text-[#0E0E0E] dark:text-white placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#0E0E0E] dark:focus:border-white transition-all duration-300 resize-none"
                    placeholder="I'd love to know more about what you're looking for..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative px-12 py-5 bg-[#0E0E0E] dark:bg-white text-white dark:text-[#0E0E0E] rounded-full hover:shadow-2xl transition-all duration-500 uppercase tracking-widest text-sm font-bold overflow-hidden"
              >
                <span className="relative z-10">Request Booking</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] to-[#0E0E0E] dark:from-[#E5E5E5] dark:to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                onClick={handleCloseModal}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="fixed inset-0 z-50 flex items-center justify-center p-6"
              >
                <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl shadow-2xl max-w-lg w-full p-10 relative">
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F5F1ED] dark:bg-[#0E0E0E] text-[#8A8A8A] hover:text-[#0E0E0E] dark:hover:text-white transition-all duration-300 flex items-center justify-center"
                    aria-label="Close modal"
                  >
                    <X size={20} strokeWidth={2} />
                  </button>

                  {/* Success Animation */}
                  <motion.div 
                    className="flex justify-center mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                        <Check size={48} strokeWidth={3} className="text-white" />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-green-400"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  {/* Success Message */}
                  <h3
                    className="text-center mb-4 text-[#0E0E0E] dark:text-white"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    }}
                  >
                    Session Booked!
                  </h3>

                  <p className="text-center text-[#8A8A8A] dark:text-[#BDBDBD] mb-8 leading-relaxed text-lg">
                    Thank you for your booking request. I'll review your details and get back to you within <strong className="text-[#0E0E0E] dark:text-white">24 hours</strong> to confirm your session.
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={handleCloseModal}
                    className="w-full px-8 py-4 bg-[#0E0E0E] dark:bg-white text-white dark:text-[#0E0E0E] rounded-full hover:shadow-xl transition-all duration-300 uppercase tracking-wider text-sm font-bold"
                  >
                    Perfect, Thank You!
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Custom Styles */}
      <style>{`
        /* Calendar Wrapper Styles */
        .booking-calendar-wrapper {
          width: 100%;
        }

        .booking-calendar {
          width: 100%;
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        
        /* Month Caption */
        .booking-calendar .rdp-month_caption {
          color: #0E0E0E;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 1.5rem;
          font-family: 'Playfair Display', serif;
        }

        .dark .booking-calendar .rdp-month_caption {
          color: white;
        }

        /* Navigation Buttons */
        .booking-calendar .rdp-nav {
          gap: 0.5rem;
        }

        .booking-calendar .rdp-nav button {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          color: #0E0E0E;
          transition: all 0.3s;
          background: #F5F1ED;
        }

        .dark .booking-calendar .rdp-nav button {
          color: white;
          background: #0E0E0E;
        }

        .booking-calendar .rdp-nav button:hover:not(:disabled) {
          background-color: #D6C6B8;
        }

        .dark .booking-calendar .rdp-nav button:hover:not(:disabled) {
          background-color: #3A3A3A;
        }

        .booking-calendar .rdp-nav button:disabled {
          opacity: 0.3;
        }

        /* Weekday Headers */
        .booking-calendar .rdp-weekday {
          color: #8A8A8A;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.75rem 0;
        }

        

        .booking-calendar .rdp-day_button {
  width: 100%;
  aspect-ratio: 1 / 1;   /* keeps square */
  min-height: 42px;
  border-radius: 10px;
  font-size: clamp(12px, 1.2vw, 15px);
  font-weight: 500;
  transition: all 0.25s ease;
  color: #0E0E0E;
  border: 1px solid transparent;
}

        .dark .booking-calendar .rdp-day_button {
          color: white;
        }

        /* Hover State */
        .booking-calendar .rdp-day_button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: #F5F1ED !important;
          border-color: #D6C6B8;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .dark .booking-calendar .rdp-day_button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: #2A2A2A !important;
          border-color: #3A3A3A;
        }

        /* Selected Day */
        .booking-calendar .rdp-day_selected .rdp-day_button {
  background-color: #0E0E0E !important;
  color: #ffffff !important;
  border-radius: 6px !important;
  border: none !important;
  box-shadow: none !important;
}

        .dark .booking-calendar .rdp-day_selected .rdp-day_button {
          background-color: white !important;
          color: #0E0E0E !important;
          border-color: white;
        }

        /* Today */
        .booking-calendar .rdp-day_today:not(.rdp-day_selected) .rdp-day_button {
          background-color: rgba(14, 14, 14, 0.05);
          font-weight: 600;
        }

        .dark .booking-calendar .rdp-day_today:not(.rdp-day_selected) .rdp-day_button {
          background-color: rgba(255, 255, 255, 0.05);
        }

        /* Disabled Days */
        .booking-calendar .rdp-day_button:disabled {
          opacity: 0.25;
          cursor: not-allowed;
          background-color: transparent !important;
        }

        /* Outside Month */
        .booking-calendar .rdp-day_outside {
          opacity: 0.3;
        }

        /* Table Layout */
        .booking-calendar .rdp-month {
          width: 100%;
        }

        .booking-calendar .rdp-month table {
          width: 100%;
          border-spacing: 4px;
        }

        .booking-calendar .rdp-weekdays {
          margin-bottom: 0.5rem;
        }

        .booking-calendar .rdp-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0.5rem;
}

        .booking-calendar .rdp-day_button {
          border-radius: 6px !important;
          font-weight: 500;
        }

        /* 🔥 Make DayPicker actually stretch */
.booking-calendar .rdp-root {
  width: 100%;
}

.booking-calendar .rdp-months {
  width: 100%;
  display: flex;
}

.booking-calendar .rdp-month {
  width: 100% !important;
  max-width: 100% !important;
  flex: 1;
}
      `}</style>
    </>
  );
}

export default BookingSection;