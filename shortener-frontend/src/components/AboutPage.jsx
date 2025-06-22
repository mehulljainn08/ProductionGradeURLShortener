import React from "react";
import {
  FaLink,
  FaShareAlt,
  FaChartLine,
  FaLock,
  FaCode
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2">
      <div className="bg-white w-full sm:py-10 py-8">
        <h1 className="sm:text-4xl text-slate-800 text-3xl font-bold italic mb-3">
          About PrivURL
        </h1>
        <p className="text-gray-700 text-sm mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full">
          PrivURL makes URL shortening effortless, allowing you to quickly
          generate, manage, and track your links for efficient sharing and
          insightful analytics.
        </p>

        <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full">
          <div className="flex items-start">
            <FaLink className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Simple URL Shortening
              </h2>
              <p className="text-gray-600">
                Experience the ease of creating short, memorable URLs in just a
                few clicks. Our intuitive interface and quick setup process
                ensure you can start shortening URLs without any hassle.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FaShareAlt className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Powerful Analytics
              </h2>
              <p className="text-gray-600">
                Track every click and monitor your links' performance with
                detailed analytics. Gain insights into user behavior, traffic
                sources, and more to optimize your sharing strategy.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FaLock className="text-purple-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Enhanced Security
              </h2>
              <p className="text-gray-600">
                Rest assured with our robust security measures. All shortened
                URLs are protected with advanced encryption, ensuring your data
                remains safe and secure.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FaChartLine className="text-red-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Fast and Reliable
              </h2>
              <p className="text-gray-600">
                Enjoy lightning-fast redirects and high uptime with our reliable
                infrastructure. Your shortened URLs will always be available and
                responsive, ensuring a seamless experience for your users.
              </p>
            </div>
          </div>

          {/* Meet the Developer Section */}
          <div className="flex items-start pt-8 border-t mt-10">
            <FaCode className="text-orange-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Meet the Developer
              </h2>
              <p className="text-gray-600">
                Hi, I'm Mehul Jain — a Computer Science student at SVNIT with a
                deep passion for building scalable backend systems and modern
                web applications. PrivURL is a project I built to explore
                real-world development with technologies like Spring Boot,
                Redis, Kafka, and React. I'm constantly learning and always open
                to new challenges. Let’s connect and build something awesome!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
