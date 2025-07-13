import { NextRequest, NextResponse } from 'next/server';

import { transporter } from '@/lib/mailer';

const codes = new Map<string, string>();

export async function POST(req: NextRequest) {
	const { email } = await req.json();
	if (!email || typeof email !== 'string') {
		return NextResponse.json({ error: 'Email is required' }, { status: 400 });
	}
	const code = Math.floor(100000 + Math.random() * 900000).toString();
	codes.set(email, code);

	try {
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Tu código de verificación',
			text: `Tu código de verificación es: ${code}`,
			html: `<p>Tu código de verificación es: <b>${code}</b></p>`,
		});
	} catch (_err) {
		return NextResponse.json(
			{ error: 'No se pudo enviar el correo' },
			{ status: 500 }
		);
	}

	return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
	const { email, code } = await req.json();
	if (
		!email ||
		typeof email !== 'string' ||
		!code ||
		typeof code !== 'string'
	) {
		return NextResponse.json(
			{ error: 'Email and code are required' },
			{ status: 400 }
		);
	}
	const valid = codes.get(email) === code;
	if (valid) {
		codes.delete(email);
		return NextResponse.json({ ok: true });
	}
	return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
}
