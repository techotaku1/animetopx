import { NextRequest, NextResponse } from 'next/server';

import {
	arrayUnion,
	doc,
	getDoc,
	increment,
	updateDoc,
} from 'firebase/firestore';

import { db } from '@/db/firebaseConfig';

interface LikeRequestBody {
	commentId?: unknown;
	userEmail?: unknown;
}

export async function PATCH(req: NextRequest) {
	try {
		const body: LikeRequestBody = await req.json();
		const commentId = typeof body.commentId === 'string' ? body.commentId : '';
		const userEmail = typeof body.userEmail === 'string' ? body.userEmail : '';
		if (!commentId || !userEmail) {
			return NextResponse.json(
				{ error: 'commentId and userEmail are required' },
				{ status: 400 }
			);
		}

		const commentRef = doc(db, 'comments', commentId);
		const commentSnap = await getDoc(commentRef);

		if (!commentSnap.exists()) {
			return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
		}

		const data = commentSnap.data();
		const likedBy: string[] = Array.isArray(data.likedBy) ? data.likedBy : [];

		if (likedBy.includes(userEmail)) {
			return NextResponse.json(
				{ error: 'You have already liked this comment' },
				{ status: 409 }
			);
		}

		await updateDoc(commentRef, {
			likes: increment(1),
			likedBy: arrayUnion(userEmail),
		});

		const updatedSnap = await getDoc(commentRef);
		return NextResponse.json(
			{ id: commentId, ...updatedSnap.data() },
			{ status: 200 }
		);
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		return NextResponse.json(
			{ error: `Failed to like comment: ${errorMessage}` },
			{ status: 500 }
		);
	}
}
