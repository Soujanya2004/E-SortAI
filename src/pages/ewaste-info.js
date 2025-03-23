// pages/api/ewaste-info.js
export default async function handler(req, res) {
    const { waste, question } = req.query;
  
    if (!waste || !question) {
      return res.status(400).json({ error: "Missing waste or question" });
    }
  
    try {
      // Example: Mock response data
      let info = {};
  
      if (waste === "Plastic Bottle") {
        info = {
          message: "Plastic bottles should be recycled. You can drop them off at your local recycling center.",
        };
      } else {
        info = {
          message: "Information for this waste type is not available.",
        };
      }
  
      // Handle questions about disposal or recycling
      if (question.toLowerCase().includes("dispose")) {
        info.details = "To dispose of plastic bottles properly, check your local recycling guidelines.";
      }
  
      return res.status(200).json(info);
    } catch (error) {
      console.error("Error processing e-waste info:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
