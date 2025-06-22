import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
  return (
    <div
      className="shadow-lg border border-slate-200 bg-white rounded-xl px-6 py-8 flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
    >
      <h1 className="text-slate-900 text-xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="text-slate-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default Card;

