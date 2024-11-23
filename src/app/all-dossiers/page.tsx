import React from "react";
import Header from "../Header";
import Button from "../Button";
import { SlOptionsVertical } from "react-icons/sl";
import Image from "next/image";
import Member1 from "../assets/member1.png";
import Member2 from "../assets/member2.png";
import Member3 from "../assets/member3.png";

const dossiers = [
  {
    id: 1,
    title: "Gamified fitness tracker",
    date: "Sep 25, 2022, 13:25 PM",
    stakeholders: [],
    status: {
      label: "In-Progress",
      bgColor: "bg-gray-300",
      textColor: "text-[#0D0D0D]",
    },
  },
  {
    id: 2,
    title: "Running Speedometer",
    date: "Sep 25, 2022, 13:25 PM",
    stakeholders: [Member1, Member2, Member3],
    status: {
      label: "In-Review",
      bgColor: "bg-[#EBF2FF]",
      textColor: "text-[#0D0D0D]",
    },
  },
  {
    id: 3,
    title: "Local gym deals page",
    date: "Sep 25, 2022, 13:25 PM",
    stakeholders: [Member1, Member2, Member3],
    status: {
      label: "Reviewed",
      bgColor: "bg-[#75C379]",
      textColor: "text-[#0D0D0D]",
    },
  },
  {
    id: 4,
    title: "Virtual fitness classes",
    date: "Sep 25, 2022, 13:25 PM",
    stakeholders: [Member1, Member2, Member3],
    status: {
      label: "Reviewed",
      bgColor: "bg-[#75C379]",
      textColor: "text-[#0D0D0D]",
    },
  },
];

const reviews = [
  {
    title: "Nutrition Insights",
    date: "Sep 25, 2022, 13:25 PM",
    myReview: "Pending",
    status: "2",
    statusColor: "#EFA619",
    statusTextColor: "white",
    avatars: [],
  },
  {
    title: "Running Speedometer",
    date: "Sep 25, 2022, 13:25 PM",
    myReview: "Members",
    status: "Reviewed",
    statusColor: "#75C379",
    statusTextColor: "#0D0D0D",
    avatars: [Member1, Member2, Member3],
  },
  {
    title: "Local gym deals page",
    date: "Sep 25, 2022, 13:25 PM",
    myReview: "Members",
    status: "Approved",
    statusColor: "#75C379",
    statusTextColor: "#0D0D0D",
    avatars: [Member1, Member2, Member3],
  },
  {
    title: "Workout widget",
    date: "Sep 25, 2022, 13:25 PM",
    myReview: "Members",
    status: "Approved",
    statusColor: "#75C379",
    statusTextColor: "#0D0D0D",
    avatars: [Member1, Member2, Member3],
  },
];

const AllDossiers: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-white">
      <Header />
      <div className="flex items-end w-full justify-end mt-2">
        <Button label="+ Add New" />
      </div>

      <div className="py-4">
        <h2 className="text-xl font-semibold mb-6 text-[#051F61]">
          My Dossiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dossiers.map((dossier) => (
            <div key={dossier.id} className="p-8 rounded-lg shadow-custom-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold">{dossier.title}</h3>
                  <span className="text-sm font-normal text-[#667085] ml-4">
                    {dossier.date}
                  </span>
                </div>
                <button className="text-gray-500">
                  <SlOptionsVertical />
                </button>
              </div>
              <div className="flex justify-between items-start mt-2">
                <div>
                  <h4 className="text-[#667085] ">Stakeholders</h4>
                  {dossier.stakeholders.length > 0 && (
                    <div className="flex mt-2">
                      {dossier.stakeholders.map((stakeholder, index) => (
                        <Image
                          key={index}
                          src={stakeholder}
                          alt="User avatar"
                          className={`w-[20px] h-[20px] rounded-full ${
                            index !== 0 ? "-ml-1" : ""
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-[#667085] text-start">Status</h4>
                  <button
                    className={`${dossier.status.bgColor} ${dossier.status.textColor} text-sm py-1 px-4 rounded mt-2`}
                  >
                    {dossier.status.label}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-8 mb-6 text-[#051F61]">
            For Review
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-8 rounded-lg shadow-custom-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold">{review.title}</h3>
                    <span className="text-sm font-normal text-[#667085] ml-4">
                      {review.date}
                    </span>
                  </div>
                  <button className="text-gray-500">
                    <SlOptionsVertical />
                  </button>
                </div>
                <div className="flex justify-between items-start mt-2">
                  <div>
                    <h4 className="text-[#667085] ">My Review</h4>
                    {review.myReview === "Pending" ? (
                      <button className="bg-gray-300 text-sm py-1 px-4 rounded mt-2">
                        {review.myReview}
                      </button>
                    ) : (
                      <div className="flex mt-2">
                        {review.avatars.map((avatar, avatarIndex) => (
                          <Image
                            key={avatarIndex}
                            src={avatar}
                            alt="User avatar"
                            className={`w-[20px] h-[20px] rounded-full ${
                              avatarIndex > 0 ? "-ml-1" : ""
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[#667085] text-start">Status</h4>
                    <button
                      className="text-sm py-1 px-4 rounded mt-2 min-w-[100px]"
                      style={{
                        backgroundColor: review.statusColor,
                        color: review.statusTextColor,
                      }}
                    >
                      {review.status}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-8 mb-6 text-[#051F61]">
            Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-8 rounded-lg shadow-custom-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold">{review.title}</h3>
                    <span className="text-sm font-normal text-[#667085] ml-4">
                      {review.date}
                    </span>
                  </div>
                  <button className="text-gray-500">
                    <SlOptionsVertical />
                  </button>
                </div>
                <div className="flex justify-between items-start mt-2">
                  <div>
                    <h4 className="text-[#667085] ">My Review</h4>
                    {review.myReview === "Pending" ? (
                      <button className="bg-gray-300 text-sm py-1 px-4 rounded mt-2">
                        {review.myReview}
                      </button>
                    ) : (
                      <div className="flex mt-2">
                        {review.avatars.map((avatar, avatarIndex) => (
                          <Image
                            key={avatarIndex}
                            src={avatar}
                            alt="User avatar"
                            className={`w-[20px] h-[20px] rounded-full ${
                              avatarIndex > 0 ? "-ml-1" : ""
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[#667085] text-start">Status</h4>
                    <button
                      className="text-sm py-1 px-4 rounded mt-2 min-w-[100px]"
                      style={{
                        backgroundColor: review.statusColor,
                        color: review.statusTextColor,
                      }}
                    >
                      {review.status}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-6 text-[#051F61]">
         Approved
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dossiers.map((dossier) => (
            <div key={dossier.id} className="p-8 rounded-lg shadow-custom-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold">{dossier.title}</h3>
                  <span className="text-sm font-normal text-[#667085] ml-4">
                    {dossier.date}
                  </span>
                </div>
                <button className="text-gray-500">
                  <SlOptionsVertical />
                </button>
              </div>
              <div className="flex justify-between items-start mt-2">
                <div>
                  <h4 className="text-[#667085] ">Stakeholders</h4>
                  {dossier.stakeholders.length > 0 && (
                    <div className="flex mt-2">
                      {dossier.stakeholders.map((stakeholder, index) => (
                        <Image
                          key={index}
                          src={stakeholder}
                          alt="User avatar"
                          className={`w-[20px] h-[20px] rounded-full ${
                            index !== 0 ? "-ml-1" : ""
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-[#667085] text-start">Status</h4>
                  <button
                    className={`${dossier.status.bgColor} ${dossier.status.textColor} text-sm py-1 px-4 rounded mt-2`}
                  >
                    {dossier.status.label}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default AllDossiers;
