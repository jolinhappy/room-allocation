import { ChangeEvent, useEffect, useState } from 'react';
import CustomInputNumber from '../components/CustomInputNumber';
import Banner from '../components/Banner';

const AllocateRoomPage = ({ a }) => {
  const [value, setValue] = useState(0);
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };
  const b = 'e';
  const handleOnBlur = (event: any) => {
    console.log('onBlur', event.target);
  };
  const guest = { adult: 4, child: 2 };
  const rooms = [
    { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 1 },
  ];
  const { adult, child } = guest;
  const defaultRoomAllocation = [
    { room: 1, adult: 2, child: 0 },
    { room: 2, adult: 2, child: 0 },
    { room: 3, adult: 2, child: 0 },
  ];
  useEffect(() => {
    if (a) {
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <section className="w-[500px] h-[600px]">
        <h2 className="text-[20px] font-bold mb-6 text-black">
          住客人數：{adult} 位大人，{child} 位小孩 / {rooms.length} 房
        </h2>
        <Banner describe="尚未分配人數：4 位大人，2 位小孩" />
        {defaultRoomAllocation.map((item, index) => (
          <div
            className={`mt-6 ${index < defaultRoomAllocation.length - 1 ? 'border border-solid border-t-0 border-x-0 border-black-100' : ''}`}
          >
            <h5 className="text-[20px] mb-8 text-black">房間：{item.adult + item.child} 人</h5>
            <div className="flex justify-between items-start h-[80px]">
              <div>
                <p className="text-black mb-2">大人</p>
                <p className="text-black-200">年齡 20+</p>
              </div>
              <CustomInputNumber
                step={2}
                name="input"
                value={value}
                min={2}
                max={10}
                onChange={(value) => handleValueChange(value)}
                onBlur={(value) => handleOnBlur(value)}
              />
            </div>
            <div className="flex justify-between items-start  h-[80px]">
              <p className="text-black">小孩</p>
              <CustomInputNumber
                step={2}
                name="input"
                value={value}
                min={2}
                max={10}
                onChange={(value) => handleValueChange(value)}
                onBlur={(value) => handleOnBlur(value)}
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default AllocateRoomPage;
