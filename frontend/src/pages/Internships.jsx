import { useEffect, useState } from "react";
import SlantCards from "../components/Card/SlantCards";
import InternshipDetails from "../components/InternshipDetails/InternshipDetails";
import axios from "axios";
import { PuffLoader } from "react-spinners";

const statuses = ["Few hours ago", "Just now"];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Internships = () => {
  const [cardDataArray, setCardDataArray] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchInternships = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:8000/getInternships"
          "https://internspot-backend.vercel.app/getInternships"
        );
        const data = response.data;
        setLoading(false);

        const dataWithStatus = data.map((internship) => ({
          ...internship,
          status: getRandomElement(statuses),
        }));

        setCardDataArray(dataWithStatus);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching internships:", error);
      }
    };

    fetchInternships();
  }, []);

  const handleCardClick = (cardData) => {
    setSelectedCardData(cardData);
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCardData(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="internshipWrapper bg-gray-100/40">
      <div className="bg-gradient-to-r from-cyan-200 to-blue-200 mb-5 text-center text-4xl font-extrabold py-10 sm:p-10 p-4 text-white tracking-tight">
        Find your internships
      </div>
      <div className="internshipContainer md:container md:mx-auto flex flex-col items-center justify-center">
        {loading ? (
          <PuffLoader size={50} />
        ) : (
          <>
            {cardDataArray.map((cardData, index) => (
              <SlantCards
                key={index}
                {...cardData}
                onClick={() => handleCardClick(cardData)}
              />
            ))}
          </>
        )}
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
