import Card from "../Card/Card";

const Internships = () => {
  return (
    <section className="internshipWrapper bg-sky-100/25">
      <div className="internshipContainer md:container md:mx-auto flex flex-col justiy-center items-center p-10 px-0">
        <h1 className="text-4xl font-bold mb-5">Trending on Internspot</h1>
        <div className="TrendInternCards flex items-center justify-center flex-wrap">
          <Card
            jobTitle={"Front End Developer"}
            companyName={"Lunacel"}
            location={"Work From Home"}
            stipend={"30,000"}
            duration={"4"}
          />
          <Card
            jobTitle={"Back End Developer"}
            companyName={"Alemeno"}
            location={"Gurgoan, Delhi"}
            stipend={"15,000 - 20,000"}
            duration={"3"}
          />
          <Card
            jobTitle={"Java Developer"}
            companyName={"Nullclass"}
            location={"Work From Home"}
            stipend={"25,000"}
            duration={"3"}
          />
          <Card
            jobTitle={"Computer Vision (Python)"}
            companyName={"Systemic"}
            location={"Work From Home"}
            stipend={"25,000"}
            duration={"3"}
          />
        </div>
      </div>
    </section>
  );
};

export default Internships;
