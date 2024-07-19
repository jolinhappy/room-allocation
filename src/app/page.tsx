'use client';
import { useEffect, useState } from 'react';
import RoomAllocation from '@/app/components/RoomAllocation';
import getDefaultRoomAllocation from '@/app/utils/getDefaultRoomAllocation';
import { AllocatedRoom } from './types/common';

// mockData
const guest = { adult: 6, child: 6 };
const rooms = [
  { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
  { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
];

const Home = () => {
  const [roomAllocation, setRoomAllocation] = useState<AllocatedRoom[]>([]);
  const handleOnBlur = (event: any) => {
    console.log('onBlur: value ===', event.target.value);
    console.log('onBlur: name ===', event.target.name);
  };

  const handleRoomAllocation = (room: AllocatedRoom) => {
    const updatedRoomAllocation = roomAllocation
      ?.map((item) => (item.id === room.id ? { ...room } : { ...item }))
      .map((item) => ({
        ...item,
        price: item.adult
          ? item.adult * rooms[item.id].adultPrice + item.child * rooms[item.id].childPrice + rooms[item.id].roomPrice
          : 0,
      }));
    if (updatedRoomAllocation) {
      setRoomAllocation(updatedRoomAllocation);
    }
    console.log('result', updatedRoomAllocation);
  };

  useEffect(() => {
    const defaultRoomAllocation = getDefaultRoomAllocation(guest, rooms);
    if (defaultRoomAllocation && roomAllocation.length === 0) {
      setRoomAllocation(defaultRoomAllocation);
    }
  }, [guest]);
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      {roomAllocation && roomAllocation.length > 0 && (
        <RoomAllocation
          guest={guest}
          rooms={rooms}
          onChange={handleRoomAllocation}
          onBlur={handleOnBlur}
          value={roomAllocation}
        />
      )}
    </main>
  );
};

export default Home;
