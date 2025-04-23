'use client'

import CourseBanner from '@/components/ui/Banner';
import EventCard from '@/components/ui/EventCard';
import React from 'react'

const EventsPage = () => {
  return (
    <div>
      <CourseBanner title="Events" />

      <div className='mt-5 flex flex-col gap-5 px-5'>
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}

export default EventsPage