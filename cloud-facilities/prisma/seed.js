const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.trips.deleteMany();
  await prisma.accommodation.deleteMany();

  const SDTrip = await prisma.trips.create({
    data: {
      activity: "SKYDIVE",
      trip_start_date: "2023-10-10",
      trip_end_date: "2023-10-14",
      trip_availability: 10,
      trip_itinerary: ["Day 1: Eat", "Day 2: Sleep", "Day 3: Skydive"],
      trip_inclusions: ["Rental Equipment", "great vibes", "Air pass"],
      city: "San Diego",
    },
  });
  const JPNTrip = await prisma.trips.create({
    data: {
      activity: "SKYDIVE",
      trip_start_date: "2023-12-11",
      trip_end_date: "2023-12-15",
      trip_availability: 20,
      trip_itinerary: ["Day 1: Eat", "Day 2: Sleep", "Day 3: Skydive"],
      trip_inclusions: ["Rental Equipment", "great vibes", "Air pass"],
      city: "Tokyo",
    },
  });
  const NZTrip = await prisma.trips.create({
    data: {
      activity: "SKYDIVE",
      trip_start_date: "2024-12-11",
      trip_end_date: "2024-12-15",
      trip_availability: 5,
      trip_itinerary: ["Day 1: Eat", "Day 2: Sleep", "Day 3: Skydive"],
      trip_inclusions: ["Rental Equipment", "great vibes", "Air pass"],
      city: "Queenstown",
    },
  });

  const NZTripAccom = await prisma.accommodation.create({
    data: {
      trip_accommo: "lakehouse",
      accommo_highlights: ["lake", "house", "lakehouse"],
      accommo_pics: [
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Lounge2-1-600x400.jpg",
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Dinner1-1-600x400.jpg",
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Breakfast2-1-600x400.jpg",
      ],
      trip_id: NZTrip.trip_id,
    },
  });
  const SDTripAccom = await prisma.accommodation.create({
    data: {
      trip_accommo: "Hilton Hotel",
      accommo_highlights: ["King Bed", "High Floor", "Mountain View"],
      accommo_pics: [
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Lounge2-1-600x400.jpg",
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Dinner1-1-600x400.jpg",
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Breakfast2-1-600x400.jpg",
      ],
      trip_id: SDTrip.trip_id,
    },
  });
  const JPNTripAccom = await prisma.accommodation.create({
    data: {
      trip_accommo: "Ryokan",
      accommo_highlights: ["Tatami", "Peaceful", "Zen Garden"],
      accommo_pics: [
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Lounge2-1-600x400.jpg",
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Dinner1-1-600x400.jpg",
        "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Breakfast2-1-600x400.jpg",
      ],
      trip_id: JPNTrip.trip_id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
