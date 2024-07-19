import { Guest, Room, AllocatedRoom } from '@/app/types/common';

const getDefaultRoomAllocation = (guest: Guest, rooms: Room[]) => {
  const totalAdult = guest.adult;
  const totalChild = guest.child;
  const roomsData = rooms.map((item, index) => ({
    ...item,
    id: index,
  }));

  // 如果都沒有大人回傳沒分配的狀況
  if (guest.adult === 0) {
    return roomsData.map((room) => ({
      id: room.id,
      adult: 0,
      child: 0,
      price: 0,
    }));
  }

  let minTotalPrice = Infinity;
  let bestAllocation: AllocatedRoom[] = [];

  const getMinPriceAllocation = (
    currentAllocation: AllocatedRoom[],
    remainingAdult: number,
    remainingChild: number,
    currentIndex: number,
  ) => {
    // 確定把人數分完，計算總金額
    let totalPrice;
    if (currentIndex >= roomsData.length) {
      if (remainingAdult === 0 && remainingChild === 0) {
        totalPrice =
          currentAllocation.length === 0
            ? 0
            : currentAllocation.reduce((total, { adult, child, id }) => {
                const { roomPrice, adultPrice, childPrice } = roomsData[id];
                const needPayRoomPrice = adult && roomPrice;
                return total + needPayRoomPrice + adultPrice * adult + childPrice * child;
              }, 0);
        if (totalPrice < minTotalPrice) {
          minTotalPrice = totalPrice;
          bestAllocation = [...currentAllocation];
        }
      }
      return;
    }

    const currentAllocationRoom = roomsData[currentIndex];
    const { capacity, id } = currentAllocationRoom;
    for (let adult = Math.min(remainingAdult, capacity); adult >= 1; adult--) {
      for (let child = Math.min(remainingChild, capacity - adult); child >= 0; child--) {
        const updatedAllocation = [...currentAllocation];
        updatedAllocation.push({ adult, child, id });
        // 遞迴分配房間
        getMinPriceAllocation(updatedAllocation, remainingAdult - adult, remainingChild - child, currentIndex + 1);
      }
    }

    getMinPriceAllocation(
      [...currentAllocation, { adult: 0, child: 0, id: currentIndex }],
      remainingAdult,
      remainingChild,
      currentIndex + 1,
    );
  };

  // 起始點從尚未分配的[]開始
  getMinPriceAllocation(bestAllocation, totalAdult, totalChild, 0);

  // 整理最後要return的格式
  return bestAllocation.map((item) => {
    const { adult, child, id } = item;
    const { roomPrice, adultPrice, childPrice } = roomsData[id];
    return {
      ...item,
      adult,
      child,
      id,
      price: adult && roomPrice + adultPrice * adult + childPrice * child,
    };
  });
};

export default getDefaultRoomAllocation;
