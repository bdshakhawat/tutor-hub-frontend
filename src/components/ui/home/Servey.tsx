"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Survey = () => {
  const [counterOn, setCounterOn] = useState(false);
  const { ref, inView } = useInView();

  // Reset the counterOn state when the component mounts
  useEffect(() => {
    setCounterOn(false);
  }, []);

  // Use a useEffect to update the state
  useEffect(() => {
    if (inView && !counterOn) {
      setCounterOn(true);
    }
  }, [inView, counterOn]);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-10 md:py-20 pb-10 pt-20">
      <div className="text-center">
        <h1 className="text-4xl text-cBlack font-semibold">
          <CountUp
            start={counterOn ? 0 : undefined}
            end={4.2}
            duration={7}
            // onEnd={() => console.log("Ended! 👏")}
            // onStart={() => console.log("Started! 💨")}
            delay={0}
            separator=" "
            decimals={1}
            decimal="."
            prefix=""
            suffix=""
          />
        </h1>
        <p className="text-xl text-gray-700 font-semibold">Reviews</p>
      </div>
      <div className="lg:border-l-2 border-cOrange text-center">
        <h1 className="text-4xl text-cBlack font-semibold">
          <CountUp
            start={counterOn ? 0 : undefined}
            end={4500}
            duration={7}
            // onEnd={() => console.log("Ended! 👏")}
            // onStart={() => console.log("Started! 💨")}
            delay={0}
            separator=" "
            decimals={0}
            decimal="."
            prefix=""
            suffix="+"
          />
        </h1>
        <p className="text-xl text-gray-700 font-semibold">Students</p>
      </div>
      <div className="lg:border-l-2 border-cOrange text-center">
        <h1 className="text-4xl text-cBlack font-semibold">
          <CountUp
            start={counterOn ? 0 : undefined}
            end={200}
            duration={7}
            // onEnd={() => console.log("Ended! 👏")}
            // onStart={() => console.log("Started! 💨")}
            delay={0}
            separator=" "
            decimals={0}
            decimal=","
            prefix=""
            suffix="+"
          />
        </h1>
        <p className="text-xl text-gray-700 font-semibold">Teachers</p>
      </div>
      <div className="lg:border-l-2 border-cOrange text-center">
        <h1 className="text-4xl text-cBlack font-semibold">
          <CountUp
            start={counterOn ? 0 : undefined}
            end={50}
            duration={7}
            // onEnd={() => console.log("Ended! 👏")}
            // onStart={() => console.log("Started! 💨")}
            delay={0}
            separator=" "
            decimals={0}
            decimal=","
            prefix=""
            suffix="+"
          />
        </h1>
        <p className="text-xl text-gray-700 font-semibold">Courses</p>
      </div>
    </div>
  );
};

export default Survey;
