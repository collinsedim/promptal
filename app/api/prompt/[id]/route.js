import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

// GET request
export const GET = async (req, { params }) => {
  try {
    await connectTODB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("No prompts found!", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(`Couldn't fetch prompts`, {
      status: 500,
    });
  }
};

// Update or PATCH request
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectTODB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Unable to find prompt", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Unable to update prompt", { status: 500 });
  }
};

// DELETE request
export const DELETE = async (req, { params }) => {
  try {
    await connectTODB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted!", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt. please retry!", {
      status: 500,
    });
  }
};
