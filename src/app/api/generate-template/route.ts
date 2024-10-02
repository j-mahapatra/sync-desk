import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userPrompt } = await request.json();

  if (typeof userPrompt !== 'string') {
    return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
  }

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'Reference to:\n{\n   "time": 1550476186479,\n   "blocks": [\n      {\n         "id": "oUq2g_tl8y",\n         "type": "header",\n         "data": {\n            "text": "Editor.js",\n            "level": 2\n         }\n      },\n      {\n         "id": "qYIGsjS5rt",\n         "type": "header",\n         "data": {\n            "text": "Key features",\n            "level": 3\n         }\n      },\n      {\n         "id": "XV87kJS_H1",\n         "type": "list",\n         "data": {\n            "style": "unordered",\n            "items": [\n               "It is a block-styled editor",\n               "It returns clean data output in JSON",\n               "Designed to be extendable and pluggable with a simple API"\n            ]\n         }\n      },\n      {\n         "id": "AOulAjL8XM",\n         "type": "header",\n         "data": {\n            "text": "What does it mean «block-styled editor»",\n            "level": 3\n         }\n      }\n   ],\n   "version": "2.8.1"\n}',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(
    `Generate template for editor.js in JSON for ${userPrompt}`,
  );

  return NextResponse.json(
    { data: JSON.parse(result.response.text()) },
    { status: 200 },
  );
}
