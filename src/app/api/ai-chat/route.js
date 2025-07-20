import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

export async function POST(req) {
  const { message } = await req.json();
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant for trading and investing.' },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });
    return NextResponse.json({ text: completion.data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ text: 'Sorry, I could not process your request right now.' }, { status: 500 });
  }
} 