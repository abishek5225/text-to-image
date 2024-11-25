const express = require("express");
const { createCanvas } = require("canvas");
const cors = require("cors");

const app = express();
const port = 5000;

// Allow requests from frontend
app.use(cors());
app.use(express.json());

app.post("/api/convert", async (req, res) => {
  const {
    text,
    fontSize = 28, // Increased font size for readability on mobile
    fontType = "Arial",
    bold = false,
    italic = false,
    underline = false,
    username = " ", // Default if no username is provided
  } = req.body;

  const width = 600;
  const height = 600;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Set background color to black
  context.fillStyle = "#0f766e";
  context.fillRect(0, 0, width, height);

  // Draw a white rounded rectangle for the tweet background
  const padding = 20;
  const contentWidth = width - padding * 2;
  const contentHeight = height - padding * 2;

  // Username and Twitter handle
  context.fillStyle = "#E0E0E0"; // White text color
  context.font =
    " 18px 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"; // Larger font for username
  context.fillText(username, padding + 10, padding + 10);

  // Apply dynamic font options for the tweet text
  const fontWeight = bold ? "bold" : "normal";
  const fontStyle = italic ? "italic" : "normal";
  context.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontType}`;
  context.fillStyle = "#E0E0E0"; // White text color
  context.textAlign = "left";
  context.textBaseline = "top";

  // Add text shadow for readability
  context.shadowColor = "rgba(0, 0, 0, 0.5)";
  

  // Draw each line of the tweet text
  const lineHeight = fontSize * 1.5;
  const lines = text.split("\n");
  const textYStart = padding + 40; // Start below the username
  lines.forEach((line, index) => {
    const yPosition = textYStart + index * lineHeight;
    context.fillText(line, padding + 20, yPosition);

    // Apply underline if selected
    if (underline) {
      const textWidth = context.measureText(line).width;
      context.fillRect(padding + 20, yPosition + fontSize + 2, textWidth, 2); // Small offset for underline
    }
  });

  // Convert canvas to PNG buffer and send it as a response
  const buffer = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
