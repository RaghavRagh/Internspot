import { useEffect, useState } from "react";
import SlantCards from "../components/Card/SlantCards";
import InternshipDetails from "../components/InternshipDetails";

const jobName = [
  "Java Development",
  "Web Development",
  "Data Science",
  "Graphic Design",
  "Flutter Development",
  "Reactjs Development",
  "Backend Developement",
  "AI/ML Engineer",
  "Artificial Intelligence (AI)",
  "Machine Learning",
  "Prompt Testing (AI/ML)",
];
const companyNames = [
  "Monkhub",
  "TechCorp",
  "Innovate",
  "Designify",
  "Nullclass",
  "Conversely",
  "Ridobiko",
  "TwinITO",
];
const locations = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Gurgoan",
  "Noida",
  "Work from home",
];
const stipends = [
  "5,000",
  "10,000",
  "15,000",
  "20,000",
  "1,000",
  "6,000",
  "25,0000",
];
const durations = ["3", "6", "9", "12", "1", "2"];
const statuses = ["Few hours ago", "Just now"];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomCardData = () => ({
  jobName: getRandomElement(jobName),
  companyName: getRandomElement(companyNames),
  location: getRandomElement(locations),
  stipend: getRandomElement(stipends),
  duration: getRandomElement(durations),
  status: getRandomElement(statuses),
});

const Internships = () => {
  const [cardDataArray, setCardDataArray] = useState([]);

  useEffect(() => {
    const noOfCards = 20;
    const generatedCardData = Array.from(
      { length: noOfCards },
      generateRandomCardData
    );
    setCardDataArray(generatedCardData);
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);

  const handleCardClick = (cardData) => {
    setSelectedCardData(cardData);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCardData(null);
  };

  return (
    <div className="internshipWrapper">
      <div className="bg-gradient-to-r from-cyan-200 to-blue-200 mb-5 text-center text-4xl font-extrabold p-10 text-white">
        Find your internships
      </div>
      <div className="internshipContainer md:container md:mx-auto flex flex-col items-center justify-center">
        {cardDataArray.map((cardData, index) => (
          <SlantCards
            key={index}
            {...cardData}
            onClick={() => handleCardClick(cardData)}
          />
        ))}
      </div>
      <InternshipDetails
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        data={selectedCardData}
      />
    </div>
  );
};

export default Internships;
