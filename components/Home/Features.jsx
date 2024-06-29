import React from "react";

function Features() {
  return (
    <section className=" flex flex-col items-center pt-20 gap-20">
      <h2 className=" text-[2.3rem] font-semibold">Why Use QueryHub?</h2>
      <div className=" grid grid-cols-4 gap-10 ">
        <div className=" w-[320px] h-[400px] ">
          <h3 className=" text-[26px] font-semibold text-center">
            Anonymous Questions
          </h3>
          <p>
            Allow attendees to ask questions without revealing their identity.
          </p>
        </div>
        <div className=" w-[320px] h-[400px] text-center">
          <h3 className=" text-[26px] font-semibold">Real-Time Updates</h3>
          <p>Questions are updated in real-time for hosts.</p>
        </div>
        <div className=" w-[320px] h-[400px] text-center">
          <h3 className=" text-[26px] font-semibold">Easy to Use</h3>
          <p>Simple and intuitive interface for both attendees and hosts.</p>
        </div>
        <div className=" w-[320px] h-[400px] text-center">
          <h3 className=" text-[26px] font-semibold">Secure</h3>
          <p>Your data is safe with end-to-end encryption.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
