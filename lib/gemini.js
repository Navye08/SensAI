import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODELS = [
  "gemini-flash-latest",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
];

export async function generateContentWithFallback(prompt) {
  let lastError = null;

  for (const modelName of MODELS) {
    const model = genAI.getGenerativeModel({ model: modelName });

    // Try up to 3 attempts with a small backoff for each model if it fails with transient errors
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        
        // Verify response contains text
        const response = result.response;
        const text = response.text();
        if (text) {
          return result;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Gemini model ${modelName} failed on attempt ${attempt}:`, err.message);

        // Only retry if it is a transient/overload error (503 Service Unavailable or 429 Too Many Requests)
        const isTransient = 
          err.status === 503 || 
          err.status === 429 || 
          (err.message && (err.message.includes("503") || err.message.includes("429") || err.message.includes("overloaded")));

        if (!isTransient) {
          // Break attempt loop to move to the next model immediately (e.g. if the model name is not supported)
          break;
        }

        // Wait before next attempt (1s, 2s)
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
      }
    }
  }

  throw lastError || new Error("Failed to generate content after trying multiple models and retries");
}
