"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import React from "react";

import {Button} from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <svg
          className="h-40 w-40 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </div>
      <h1 className="mb-4 text-4xl font-bold">404 - Página no encontrada</h1>
      <p className="mb-8 text-xl">
        Lo sentimos, la página que estás buscando no existe o no está disponible en este momento.
      </p>
      <div className="space-x-4">
        <Button variant="outline" onClick={() => router.back()}>
          Volver atrás
        </Button>
        <Button asChild>
          <Link href="/">Ir al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
