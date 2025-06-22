import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
