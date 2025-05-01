"use client";
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function BookingCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="booking-calendar" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}
