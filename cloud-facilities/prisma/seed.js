const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.tripType.deleteMany();
  await prisma.accommodation.deleteMany();
  await prisma.destinations.deleteMany();
  await prisma.trips.deleteMany();

  await prisma.tripType.createMany({
    data: [{ activity: "SKYDIVE" }, { activity: "SCUBADIVING" }, { activity: "SNOWSLOPES" }],
  });

  await prisma.destinations.createMany({
    data: [
      {
        city: "San Diego",
        country: "USA",
        region: "AMERICAS",
        destination_highlights: ["Skydive San Diego", "Belmont Park", "San Diego Zoo"],
        destination_image: [
          "https://www.skydiveohio.com/wp-content/uploads/G0096598-2-1.jpg",
          "https://www.busytourist.com/wp-content/uploads/2020/06/Belmont-Park.jpg.webp",
          "https://upload.wikimedia.org/wikipedia/commons/4/4c/San_Diego_Zoo_Entrance_.jpg",
        ],
      },
      {
        city: "Queenstown",
        country: "New Zealand",
        region: "OCEANIA",
        destination_highlights: ["NZONE Skydive", "Awesome Scenery", "Food Experience"],
        destination_image: [
          "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_2916,h_1944,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/eltdn5sjc3mnkq2sg3z7/BookNZONESkydive,QueenstownOnline-KlookSingapore.jpg",
          "https://www.newzealand.com/assets/Campaigns/If-You-Seek/Milford_Sound-Fiordland-MH1__aWxvdmVrZWxseQo_CropResizeWzEyMDAsNjMwLDc1LCJqcGciXQ.jpg",
          "https://res.cloudinary.com/simpleview/image/upload/v1614737437/clients/queenstownnz/Dining_Queenstown_Bay_Brand_Imagery_2__df227a58-ce49-464a-8b60-abd30e6d9e40.jpg",
        ],
      },
    ],
  });

  const SDTrip = await prisma.trips.create({
    data: {
      trip_type: {
        connect: {
          activity: "SKYDIVE",
        },
      },
      trip_start_date: "2023-10-10",
      trip_end_date: "2023-10-14",
      trip_availability: 3,
      trip_itinerary: ["Day 1: Eat", "Day 2: Sleep", "Day 3: Skydive"],
      trip_inclusions: ["Rental Equipment", "great vibes", "Air pass"],
      trip_price: 1234.01,
      trip_title: "San Diego Experience",
      destination: {
        connect: {
          city: "San Diego",
        },
      },
      accommodation: {
        create: {
          trip_accommo: "San Diego Hotel",
          accommo_highlights: ["King Bed", "High Floor", "Mountain View"],
          accommo_pics: [
            "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Lounge2-1-600x400.jpg",
            "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Dinner1-1-600x400.jpg",
            "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Breakfast2-1-600x400.jpg",
          ],
        },
      },
    },
  });

  // const JPNTrip = await prisma.trips.create({
  //   data: {
  //     activity: "SKYDIVE",
  //     trip_start_date: "2023-12-11",
  //     trip_end_date: "2023-12-15",
  //     trip_availability: 20,
  //     trip_itinerary: ["Day 1: Eat", "Day 2: Sleep", "Day 3: Skydive"],
  //     trip_inclusions: ["Rental Equipment", "great vibes", "Air pass"],
  //     trip_price: 2345.99,
  //     city: "Tokyo",
  //   },
  // });
  const NZTrip = await prisma.trips.create({
    data: {
      trip_type: {
        connect: {
          activity: "SKYDIVE",
        },
      },
      trip_start_date: "2024-12-11",
      trip_end_date: "2024-12-15",
      trip_availability: 3,
      trip_itinerary: ["Day 1: Eat", "Day 2: Sleep", "Day 3: Skydive"],
      trip_inclusions: ["Rental Equipment", "great vibes", "Air pass"],
      trip_price: 1000,
      trip_title: "NZ Experience",
      destination: {
        connect: {
          city: "Queenstown",
        },
      },
      accommodation: {
        create: {
          trip_accommo: "Queenstown lakehouse",
          accommo_highlights: ["lake", "house", "lakehouse"],
          accommo_pics: [
            "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Lounge2-1-600x400.jpg",
            "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Dinner1-1-600x400.jpg",
            "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Breakfast2-1-600x400.jpg",
          ],
        },
      },
    },
  });

  // const JPNTripAccom = await prisma.accommodation.create({
  //   data: {
  //     trip_accommo: "Ryokan",
  //     accommo_highlights: ["Tatami", "Peaceful", "Zen Garden"],
  //     accommo_pics: [
  //       "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Lounge2-1-600x400.jpg",
  //       "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Dinner1-1-600x400.jpg",
  //       "https://kamana.co.nz/wp-content/uploads/sites/95/2020/03/Breakfast2-1-600x400.jpg",
  //     ],
  //     trip_id: JPNTrip.trip_id,
  //   },
  // });
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
