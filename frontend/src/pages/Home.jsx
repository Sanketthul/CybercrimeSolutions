import React, { useState } from "react";
import { Hero } from "../Components/Hero/Hero";
import { Res } from "../Components/Res/Res";
import { GeminiAssistant } from "../Components/Cbot/GeminiAssistant";
import { Cbot } from "../Components/Cbot/Cbot";
import { Links } from "../Components/Useful/Links";
import { Footer } from "../Components/Footer/Footer";

export const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <Hero />
      <Res />
      <GeminiAssistant openChat={() => setIsChatOpen(true)} />

      <Cbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <Links />
      <Footer />
    </div>
  );
};

export default Home;
