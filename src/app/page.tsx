import React from "react";
import SearchBar from "./SearchBar";
import Title from "./Title";
import MenuBar from "./MenuBar";
import Card from "./Card";
import cardsData from "../app/cardsData";
import Link from "next/link";

const HomePage: React.FC = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="bg-background p-6 min-h-screen">
      <SearchBar />
      <div className="pt-4">
        <Title content="Welcome Gabe" date={today} />
        <MenuBar />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              timeline={card.timeline}
              status={card.status}
              message={card.message}
            />
          ))}
        </div>
      </div>
      <div className="w-32">
        <Link
          href="/all-dossiers"
          className="text-blue-500 hover:underline mt-3 block"
        >
          All Dossiers
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
