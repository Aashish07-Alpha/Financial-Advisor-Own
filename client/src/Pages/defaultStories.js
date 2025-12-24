import women1 from "./women1.webp";
import women2 from "./women2.jpg";
import man1 from "./man1.jpg";
import man2 from "./man2.jpg";

const defaultStories = [
  {
    id: "default-1",
    title: "Success sweet like Honey",
    author: "Avishkar Ghodke",
    region: "Gujarat",
    sector: "farming",
    challenge: "loan-application",
    thumbnail: man2,
    views: 1234,
    likes: 456,
    date: "March 15, 2025",
    summary: "How I transformed my 1-acre farm into a successful beekeeping business",
    fullStory: "Avishkar faced financial difficulties but found innovative ways to sustain beekeeping. By optimizing hive placements and improving honey extraction, he achieved remarkable success.",
    keyLessons: [
      "Optimizing hive placement for higher yield",
      "Identifying and preventing common bee diseases",
      "Innovative techniques for honey extraction",
    ],
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/zMZ6IBCQCm8?si=XqjOE1n3z8Fo5QVK",
  },
  {
    id: "default-2",
    title: "Dairy Dream",
    author: "Simran Kaur",
    region: "Punjab",
    sector: "dairy",
    challenge: "savings",
    thumbnail: women2,
    views: 890,
    likes: 210,
    date: "April 2, 2025",
    summary: "Simran built a thriving dairy business by saving and reinvesting profits.",
    fullStory: "Simran started with two cows and a dream. Through careful savings and community support, she expanded her dairy and now supplies milk to the whole village.",
    keyLessons: [
      "Importance of savings for business growth",
      "Community support is vital",
      "Quality over quantity in dairy",
    ],
    hasVideo: false,
  },
  {
    id: "default-3",
    title: "Digital Leap",
    author: "Ramesh Singh",
    region: "Rajasthan",
    sector: "small-business",
    challenge: "digital-adoption",
    thumbnail: man1,
    views: 540,
    likes: 120,
    date: "May 10, 2025",
    summary: "Ramesh took his handicraft business online and doubled his sales.",
    fullStory: "Ramesh learned to use digital payments and social media marketing, which helped him reach new customers and grow his business.",
    keyLessons: [
      "Adopting digital tools increases reach",
      "Learning never stops",
      "Online presence is crucial",
    ],
    hasVideo: false,
  },
];

export default defaultStories;