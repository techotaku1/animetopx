'use server';

import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore';

import { db } from '@/db/firebaseConfig';

export async function deleteCommentAction(
	commentId: string,
	userEmail: string
): Promise<{ ok: boolean; error?: string }> {
	try {
		const commentsRef = collection(db, 'comments');
		const commentRef = doc(commentsRef, commentId);
		const commentSnap = await getDoc(commentRef);
		if (!commentSnap.exists()) {
			return { ok: false, error: 'Comment not found' };
		}
		const data = commentSnap.data();
		if (typeof data.userName !== 'string' || data.userName !== userEmail) {
			return {
				ok: false,
				error: 'No autorizado para eliminar este comentario',
			};
		}
		await deleteDoc(commentRef);
		return { ok: true };
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : String(error),
		};
	}
}
