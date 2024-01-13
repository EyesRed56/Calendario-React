import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {

  const {OpenDateModal} = useUiStore();
  const {events, setActiveEvent} = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    OpenDateModal();
  }

  const onSelectClick = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastview', event);
    setLastView(event)
  }

  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectClick}
        onView={onViewChanged}
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}
