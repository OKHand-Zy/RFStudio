import React from 'react';

const DownloadButton = ({ CodeSpaceCode }) => {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([CodeSpaceCode], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "robot_script.robot";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <button 
      onClick={handleDownload}
      className="px-5 py-2.5 my-2.5 bg-green-500 text-white border-none rounded hover:bg-green-800 cursor-pointer"
    >
      下載Robot檔案
    </button>
  );
};

export default DownloadButton;
