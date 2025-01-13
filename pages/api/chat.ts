import { GoogleGenerativeAI } from '@google/generative-ai';
import { initialMessage } from '@/lib/data';
import type { NextApiRequest, NextApiResponse } from 'next';

// Remove edge runtime config since we're using Pages API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const messages = [initialMessage, ...req.body.messages];
		const modelName = 'gemini-pro';

		if (!process.env.GOOGLE_API_KEY) {
			throw new Error('GOOGLE_API_KEY is not configured');
		}

		const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
		const model = genAI.getGenerativeModel({ model: modelName });

		const promptWithParts = {
			contents: messages
				.filter((message) => message.role === 'user' || message.role === 'assistant')
				.map((message) => ({
					role: message.role === 'user' ? 'user' : 'assistant',
					parts: [{ text: message.content }],
				})),
		};

		const result = await model.generateContent(promptWithParts);
		const response = await result.response;
		const text = response.text();

		return res.status(200).json({ content: text });
	} catch (error) {
		console.error('Error in chat route:', error);
		return res.status(500).json({
			error: 'Failed to process chat request',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}
