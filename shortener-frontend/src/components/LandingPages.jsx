import React, { useContext } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { ContextApi } from "../contextApi/ContextApi";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Shorten with Ease",
    desc: "PrivURL offers a seamless interface to shorten links instantly and share them effortlessly across platforms.",
  },
  {
    title: "Real-Time Analytics",
    desc: "Gain deep insights with real-time click tracking to monitor link performance and optimize your strategy.",
  },
  {
    title: "User-Centric Dashboard",
    desc: "Manage, edit, and track all your shortened links from a single, intuitive dashboard.",
  },
  {
    title: "Secure & Reliable",
    desc: "Built with robust backend architecture, your links are protected and perform reliably at scale.",
  },
  {
    title: "Expiration Control",
    desc: "Set custom expiration for your links to maintain control over availability and privacy.",
  },
  {
    title: "Always Accessible",
    desc: "Your shortened URLs remain responsive and reachable, delivering a smooth experience to users.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(ContextApi);
  const desc =
    "Generate short, memorable links with ease using PrivURL’s intuitive interface. Share URLs effortlessly across platforms. Optimize your sharing strategy with PrivURL — track clicks and manage your links seamlessly to enhance your online presence.";

  const handleNavigate = (path) => {
    if (token) {
      navigate(path);
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 lg:px-14">
      <div className="flex flex-col lg:flex-row justify-between items-center pt-20 lg:py-5 lg:gap-12 gap-10">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-slate-800 font-extrabold text-3xl md:text-5xl font-roboto leading-snug"
          >
            PrivURL – Reliable Link Management Backed by Deep Analytics
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-sm md:text-base my-6"
          >
            {desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 flex-wrap"
          >
            <button
              onClick={() => handleNavigate('/dashboard')}
              className="w-44 text-white font-medium py-2 rounded-lg transition hover:opacity-90 bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Manage Links
            </button>
            <button
              onClick={() => handleNavigate('/dashboard')}
              className="w-44 font-medium py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
            >
              Create Short Link
            </button>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/img2.png"
            alt="PrivURL Preview"
            className="w-[90%] sm:w-[400px] object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      <div className="text-center py-12 sm:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-slate-800 font-semibold font-roboto text-2xl sm:text-3xl max-w-4xl mx-auto"
        >
          Simplify link sharing, monitor real-time click metrics, and elevate your content strategy — all in one place.
        </motion.p>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-2xl md:text-3xl font-bold text-slate-800 mt-16 mb-6"
      >
        Why Choose PrivURL?
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {features.map((item, idx) => (
          <Card key={idx} title={item.title} desc={item.desc} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
