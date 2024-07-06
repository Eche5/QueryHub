"use client";
import React from "react";

function Features() {
  const name = "Echefula Ndukwe";
  const first = name.split(" ")[0]; // Splitting the string by space and taking the first part
  console.log(first); //
  return (
    <section className=" font-Montserrat flex flex-col items-center pt-20 gap-20 ">
      <h2 className=" xl:text-[2.3rem] text-[1.4rem] font-semibold">
        Why Use QueryHub?
      </h2>
      <div className=" xl:grid grid-cols-4 flex flex-col items-center xl:gap-10 gap-8">
        <div className=" xl:w-[320px] xl:h-[400px] ">
          <h3 className=" xl:text-[26px] font-semibold text-center">
            Anonymous Questions
          </h3>
          <p className=" text-center">
            Allow attendees to ask questions without revealing their identity.
          </p>
        </div>
        <div className=" xl:w-[320px] xl:h-[400px] text-center">
          <h3 className=" xl:text-[26px] font-semibold">Real-Time Updates</h3>
          <p>Questions are updated in real-time for hosts.</p>
        </div>
        <div className=" xl:w-[320px] xl:h-[400px] text-center">
          <h3 className=" xl:text-[26px] font-semibold">Easy to Use</h3>
          <p>Simple and intuitive interface for both attendees and hosts.</p>
        </div>
        <div className=" xl:w-[320px] xl:h-[400px] text-center">
          <h3 className=" xl:text-[26px] font-semibold">Secure</h3>
          <p>Your data is safe with end-to-end encryption.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
