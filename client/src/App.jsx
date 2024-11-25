import React, { useState } from 'react';

const App = () => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontType, setFontType] = useState('Arial');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        fontSize,
        fontType,
        bold,
        italic,
        underline,
        username,
      }),
    });
    const data = await response.blob();
    setImageUrl(URL.createObjectURL(data));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-start justify-center p-6">
      <div className="flex w-full max-w-5xl gap-12">
        
        {/* Left Side: Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2">
          <h1 className="text-3xl font-semibold text-teal-300 mb-4">Text to Image Converter</h1>
          
          {/* Username Input */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="p-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
          />

          {/* Font Size Input */}
          <div className="flex items-center gap-2">
            <label className="text-teal-300">Font Size:</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-16 p-1 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          {/* Font Type Selection */}
          <div className="flex items-center gap-2">
            <label className="text-teal-300">Font Type:</label>
            <select
              value={fontType}
              onChange={(e) => setFontType(e.target.value)}
              className="p-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>

          {/* Styling Toggles */}
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={bold}
                onChange={() => setBold(!bold)}
              />
              Bold
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={italic}
                onChange={() => setItalic(!italic)}
              />
              Italic
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={underline}
                onChange={() => setUnderline(!underline)}
              />
              Underline
            </label>
          </div>

          {/* Text Area for Tweet Content */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert"
            className="p-4 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-800 transition duration-200"
          >
            Convert to Image
          </button>
        </form>

        {/* Right Side: Image Preview */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          {imageUrl ? (
            <div>
              <h3 className="text-xl font-medium mb-4">Your Image:</h3>
              <img src={imageUrl} alt="Converted text" className="rounded-md border border-gray-300" />
              <a href={imageUrl} download="text-image.png" className="block mt-4 text-teal-300 underline">
                Download Image
              </a>
            </div>
          ) : (
            <p className="text-gray-500">No image generated yet. Enter text and press "Convert to Image".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
