import CustomInputNumber from '@/app/components/CustomInputNumber';
import Banner from '@/app/components/Banner';
import { Guest, AllocatedRoom, Room } from '@/app/types/common';
import { ChangeEvent } from 'react';

interface RoomAllocationProps {
  value: AllocatedRoom[];
  guest: Guest;
  rooms: Room[];
  onChange: (event: any) => void;
  onBlur: (event: any) => void;
}

const RoomAllocation = ({ guest, rooms, value, onChange, onBlur }: RoomAllocationProps) => {
  const { adult, child } = guest;

  const handleChangeGuestCount = (event: ChangeEvent<HTMLInputElement>, room: AllocatedRoom) => {
    const updatedRoom = { ...room, [event.target.name]: Number(event.target.value) };
    onChange(updatedRoom);
  };

  const remainingAdult = adult - value.reduce((total, item) => total + item.adult, 0);
  const remainingChild = child - value.reduce((total, item) => total + item.child, 0);

  const bannerVariant = adult > 0 ? 'primary' : 'error';
  const bannerDescribe =
    adult > 0
      ? `尚未分配人數：${remainingAdult} 位大人，${remainingChild} 位小孩`
      : '小孩必須要有成人陪同，無法分配房間人數';

  return (
    <section className="w-[500px] h-[600px]">
      <h2 className="text-[20px] font-bold mb-6 text-black">
        住客人數：{adult} 位大人，{child} 位小孩 / {rooms.length} 房
      </h2>
      <Banner variant={bannerVariant} describe={bannerDescribe} />
      {value.map((room, index) => {
        return (
          <div
            key={room.id}
            className={`mt-6 ${index < value.length - 1 ? 'border border-solid border-t-0 border-x-0 border-black-100' : ''}`}
          >
            <h5 className="text-[20px] mb-8 text-black">房間：{room.adult + room.child} 人</h5>
            <div className="flex justify-between items-start h-[80px]">
              <div>
                <p className="text-black mb-2">大人</p>
                <p className="text-black-200">年齡 20+</p>
              </div>
              <CustomInputNumber
                name="adult"
                value={room.adult}
                min={0}
                max={rooms[room.id].capacity - room.child}
                isPlusButtonDisabled={remainingAdult <= 0 || room.adult + room.child >= rooms[room.id].capacity}
                isMinusButtonDisabled={room.adult <= 0}
                onChange={(event) => handleChangeGuestCount(event, room)}
                onBlur={(valueData) => onBlur(valueData)}
              />
            </div>
            <div className="flex justify-between items-start  h-[80px]">
              <p className="text-black">小孩</p>
              <CustomInputNumber
                name="child"
                value={room.child}
                min={0}
                max={rooms[room.id].capacity - room.adult}
                isPlusButtonDisabled={remainingChild <= 0 || room.adult + room.child >= rooms[room.id].capacity}
                isMinusButtonDisabled={room.child <= 0}
                onChange={(event) => handleChangeGuestCount(event, room)}
                onBlur={(valueData) => onBlur(valueData)}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default RoomAllocation;
