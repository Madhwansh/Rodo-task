type Point = string;

interface Trip {
  pickups: Point[];
  drops: Point[];
  warehouse?: Point;
}

function isValidTrips(
  shipmentPickups: Point[],
  shipmentDrops: Point[],
  trips: Trip[]
): boolean {
  const unpickedUp = new Set(shipmentPickups);
  const undelivered = new Set(shipmentDrops);

  for (const trip of trips) {
    // Check if pickup points are valid
    if (!trip.pickups.every((point) => unpickedUp.has(point))) {
      return false;
    }
    trip.pickups.forEach((point) => unpickedUp.delete(point));

    // Check if drop points are valid (excluding warehouse)
    const validDrops = trip.drops.filter(
      (point) => !trip.warehouse || point !== trip.warehouse
    );
    if (!validDrops.every((point) => undelivered.has(point))) {
      return false;
    }
    validDrops.forEach((point) => undelivered.delete(point));
  }

  // Check if all pickups and drops are handled
  return unpickedUp.size === 0 && undelivered.size === 0;
}
