'use client';

import React, { useState } from 'react';

import { type NextPage } from 'next';

import Image from 'next/image';

import { users } from '@/db/schema';

import { db } from '@/lib/db';

import '@/styles/global.css';
import Link from 'next/link';

import { drizzle } from 'drizzle-orm'; // ❌ Import externo después de internos (import/order)
import fs from 'fs'; // ❌ Import de Node.js después de internos (import/order)

interface User {
	id: number;
	name: string;
}

// ❌ Uso incorrecto de una variable sin usar
const unusedVariable = 'Esto no debería estar aquí';

// ❌ Debería usar type-imports en lugar de imports normales

const Page: NextPage = () => {
	// ❌ No se recomienda asignar a una variable el resultado de una promesa sin manejar (no-floating-promises)
	const data = db.select().from(users).execute();

	// ❌ Uso incorrecto de <img> en lugar de <Image> de Next.js
	return (
		<div>
			<h1>Hola mundo</h1>

			{/* ❌ Uso de <img> en lugar de next/image */}
			<img src="/logo.png" alt="Logo" width="200" height="100" />

			{/* ✅ Uso correcto de next/image */}
			<Image src="/logo.png" alt="Logo Next.js" width={200} height={100} />

			{/* ❌ Uso incorrecto de <a> para navegación interna en lugar de <Link> */}
			<a href="/about">Ir a About</a>

			{/* ✅ Uso correcto de <Link> */}
			<Link href="/about">Ir a About</Link>

			{/* ❌ Intento de hacer un DELETE sin WHERE (violación de drizzle/enforce-delete-with-where) */}
			<button onClick={() => db.delete(users).execute()}>
				Eliminar usuarios
			</button>
		</div>
	);
};

export default Page;
