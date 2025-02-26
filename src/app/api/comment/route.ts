import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
	Timestamp,
} from 'firebase/firestore';
import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/firebaseConfig';

interface Comment {
	comment: string;
	date: Timestamp;
	newsId: string;
	rating: number;
	userName: string;
}

export const revalidate = 60;

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const newsId = searchParams.get('newsId');
	if (!newsId) {
		return NextResponse.json({ error: 'newsId is required' }, { status: 400 });
	}

	const commentsQuery = query(
		collection(db, 'comments'),
		where('newsId', '==', newsId)
	);
	const snapshot = await getDocs(commentsQuery);
	const comments = snapshot.docs.map((doc) => {
		const data = doc.data() as Comment;
		return {
			id: doc.id,
			...data,
			date: data.date.toDate(),
		};
	});
	return NextResponse.json(comments, { status: 200 });
}

export async function POST(req: NextRequest) {
	try {
		const { comment, newsId, rating, userName } = (await req.json()) as Comment;
		if (!comment || !newsId || !rating || !userName) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 }
			);
		}

		const newComment: Comment = {
			comment,
			date: Timestamp.fromDate(new Date()),
			newsId: String(newsId),
			rating,
			userName,
		};
		await addDoc(collection(db, 'comments'), newComment);
		return NextResponse.json(newComment, { status: 201 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return NextResponse.json(
			{ error: `Failed to submit comment: ${errorMessage}` },
			{ status: 500 }
		);
	}
}
