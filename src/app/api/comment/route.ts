import { type NextRequest, NextResponse } from 'next/server';

import { 
  addDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  Timestamp,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type WithFieldValue,
  type SnapshotOptions,
  type Firestore
} from 'firebase/firestore';

import { db } from '@/db/firebaseConfig';

interface Comment {
	comment: string;
	date: Timestamp;
	newsId: string;
	rating: number;
	userName: string;
}

const commentConverter: FirestoreDataConverter<Comment> = {
  toFirestore: (comment: WithFieldValue<Comment>) => {
    return {
      comment: comment.comment,
      date: comment.date,
      newsId: comment.newsId,
      rating: comment.rating,
      userName: comment.userName,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions
  ): Comment => {
    const data = snapshot.data(options ?? {});
    if (!data?.comment || !data?.date || !data?.newsId || !data?.rating || !data?.userName) {
      throw new Error('Invalid comment data');
    }
    return {
      comment: String(data.comment),
      date: data.date as Timestamp,
      newsId: String(data.newsId),
      rating: Number(data.rating),
      userName: String(data.userName),
    };
  },
};

export const revalidate = 60;

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const newsId = searchParams.get('newsId');
	if (!newsId) {
		return NextResponse.json({ error: 'newsId is required' }, { status: 400 });
	}

	const commentsRef = collection(db as Firestore, 'comments').withConverter(commentConverter);
	const commentsQuery = query(
		commentsRef,
		where('newsId', '==', newsId)
	);
	const snapshot = await getDocs(commentsQuery);
	const comments = snapshot.docs.map((doc) => {
		const data = doc.data();
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
		const commentsRef = collection(db as Firestore, 'comments').withConverter(commentConverter);
		await addDoc(commentsRef, newComment);
		return NextResponse.json(newComment, { status: 201 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return NextResponse.json(
			{ error: `Failed to submit comment: ${errorMessage}` },
			{ status: 500 }
		);
	}
}
