import React, { useState } from 'react';
import { FaExternalLinkAlt, FaRegCalendarAlt, FaRegCopy } from 'react-icons/fa';
import dayjs from 'dayjs';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const [copied, setCopied] = useState(false);

  const backendBase = import.meta.env.VITE_REACT_BACKEND_URL?.replace(/\/$/, "");
  const finalShortUrl = `${backendBase}/${shortUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalShortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); 
    });
  };

  return (
    <div className="bg-slate-100 shadow-md border border-dotted border-slate-400 px-6 py-4 rounded-md transition duration-150">
      <div className="flex flex-col gap-2">

        {/* Short URL with copy and link icons */}
        <div className="flex items-center gap-3 text-blue-600 font-medium text-lg">
          <a href={finalShortUrl} target="_blank" rel="noreferrer" className="hover:underline">
            {finalShortUrl}
          </a>
          <FaExternalLinkAlt title="Open in new tab" className="cursor-pointer text-sm" />
          <FaRegCopy
            title="Copy to clipboard"
            onClick={handleCopy}
            className="cursor-pointer text-sm hover:text-blue-800 transition"
          />
          {copied && <span className="text-xs text-green-600 font-medium">Copied!</span>}
        </div>

        {/* Original URL */}
        <p className="text-slate-700 text-sm truncate" title={originalUrl}>
          Original URL: <span className="text-slate-500 italic">{originalUrl}</span>
        </p>

        {/* Click count & created date */}
        <div className="flex flex-wrap justify-between text-sm text-slate-600 pt-1">
          <span>Clicks: <strong>{clickCount}</strong></span>
          <span className="flex items-center gap-1">
            <FaRegCalendarAlt />
            {dayjs(createdDate).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShortenItem;
