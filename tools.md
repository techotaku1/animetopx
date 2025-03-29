# Herramientas y Comandos

## GITHUB RECONECTARSE A OTROS REPOSITORIOS

- `git remote remove origin` // Desconectarte del repo actual
- `git remote add origin https://github.com/techotaku1/animetopx.git` // Conectarte a este repo
- `git remote add origin https://github.com/artiefy/artiefy.git` // Conectarte a este repo
- `git remote -v` // Verificar a que repo estas conectado

---

Uptash o Neon usan Serveless

Un servicio serverless como Upstash o Neon es una plataforma que proporciona bases de datos y otros servicios sin que el usuario tenga que gestionar servidores. En lugar de aprovisionar y mantener instancias manualmente, estos servicios escalan automáticamente y cobran solo por el uso real.

¿Qué significa "serverless"?

"Serverless" no significa que no haya servidores, sino que el proveedor se encarga de la infraestructura. Esto trae beneficios como:
✅ Escalabilidad automática: Crece o disminuye según la demanda.
✅ Pago por uso: No hay costos fijos por servidores inactivos.
✅ Sin gestión de infraestructura: No tienes que preocuparte por actualizaciones o mantenimiento

---

TAILWINDCSS V4.0

Si deseas aplicar estilos a un rango específico de pantalla, Tailwind CSS 4 permite usar max-breakpoints:

```html
<!-- Aplicar flex solo entre md y xl -->
<div class="md:max-xl:flex">
<!-- ... -->
</div>
```

📌 Ejemplo de variantes max-\*:

max-sm @media (width < 40rem) { ... }
max-md @media (width < 48rem) { ... }
max-lg @media (width < 64rem) { ... }
max-xl @media (width < 80rem) { ... }
max-2xl @media (width < 96rem) { ... }

---

## Volver a un commit anterior

- `git reset --hard <commit-hash>`

---

Para mejorar el rendimiento de tu proyecto y limpiar archivos innecesarios, puedes seguir estos pasos:

chmod +x clean.sh //Dale permisos de ejecución (solo la primera vez)
./clean.sh //Ejecutar el archivo de limpieza automatica

- `rm -rf node_modules package-lock.json .next`
- `npm cache clean --force`
- `rm -rf .turbo`
- `rm -rf next-env.d.ts`
- `rm -rf tsconfig.tsbuildinfo`
- `rm -rf .tsbuildinfo`
- `rm -rf .eslintcache`

---

Algunas opciones del CLI de npm para optimizar o reaprar tus librerias

- `npm dedupe` //Reducir la duplicación en el árbol de paquetes
- `npm doctor` //Comprueba el estado de tu entorno npm
- `npm prune` //Eliminar paquetes extraños
- `npm ci` //# Para CI/CD y despliegues
- `npm cache verify` //
- `npm install -g npm@11.2.0` //actualizar ultima version del npm

---

### **Comandos Generales de TypeScript y ESlint**

1. `Eslint: Restart ESlint Server`: Reinicia el servidor de ESlint.
2. `TypeScript: Select TypeScript Version`: Cambia la versión de TypeScript que utiliza el proyecto.
3. `TypeScript: Restart TS Server`: Reinicia el servidor de TypeScript
4. `npm install -g eslint`: Intalar globalmente Eslint
5. `npm install -g typescript`: Intalar globalmente typescript
6. `npm install typescript --save-dev`: Instala TypeScript localmente en el proyecto como una dependencia de desarrollo.
7. `npx tsc`: Ejecuta el compilador TypeScript localmente.
8. `tsc`: Ejecuta el compilador TypeScript globalmente.
9. `npm install next@latest react@latest react-dom@latest`: Actualizar Next
10. `npm install --save-dev eslint @eslint/eslintrc @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-simple-import-sort eslint-config-next @types/next @types/react` : Dependencias para que funcione el archivo eslint.config.mjs
11. `npx eslint --debug .` : Debugear Eslint para cuando no quiera detectar errores

---

Tecnologias Que Se Usan:

- Next.js 15, App Router, Clerk, Tailwind CSS, Shadcn/UI, Drizzle ORM, PostgreSQL, Neon, Vercel, TypeScript, AWS S3, Upstash.

---

CORREO SOPORTE:

<artiefysupport@gmail.com>

---

Colores del manual de marca:

```css
#3AF4EF #00BDD8 #01142B #2ecc71

#01142B -background //variable de tailwindcss
#3AF4EF -primary //variable de tailwindcss
#00BDD8 -secondary //variable de tailwindcss

## #00A5C0 //color parecido mas oscuro de -secondary para el hover
```

Lik Del Modo Blur:

blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk2HujHgAEcAIWCbqEhgAAAABJRU5ErkJggg=="

## blurDataURL="data"

Tutorial UPDATE DEPENDENCIES:

1. `npm install -g npm-check-updates` // Instala de manera global la herramienta npm-check-updates
2. `ncu` // Muestra las dependencias que tienen nuevas versiones
3. `ncu -u` // Actualiza el archivo package.json con las últimas versiones de las dependencias
4. `npm install` // Instala las dependencias actualizadas según el archivo package.json

5. `npm outdated` // Muestra una lista de las dependencias que están desactualizadas
6. `npm update` // Actualiza las dependencias a sus versiones más recientes compatibles
7. `npm install nombre-del-paquete@latest` // Instala la última versión de un paquete específico

8. `npm outdated --include=dev` // Muestra las dependencias de desarrollo que están desactualizadas
9. `npm outdated -g --depth=0` // Muestra las dependencias globales que están desactualizadas
10. `npm install -g [nombre-del-paquete]@latest` // Instala la última versión de un paquete global específico

11. `npm install tailwindcss @tailwindcss/postcss postcss` // Instala las últimas versiones de TailwindCSS 4.0
12. `npx @tailwindcss/upgrade@next` // Migrar tailwindcss 3 or 4
13. `npx @clerk/upgrade --from=core-1` // Instala la última versión de Clerk para Next.js 1
14. `npx @clerk/upgrade -g` // Instala la última versión de Clerk para Next.js 2
15. `npm install drizzle-orm@latest` // Instala la última versión de Drizzle ORM
16. `npx @next/codemod@canary upgrade latest` // Ayuda a actualizar tu código para que sea compatible con la última versión de Next.js
17. `npm i next@latest react@latest react-dom@latest eslint-config-next@latest` // Este comando instala las últimas versiones estables de los paquetes core necesarios para Next.js

---

Para La Instalacion Dependencias En Devs

```bash
--save-dev
```

Forzar Dependencias

```bash

--force
--legacy-peer-deps
```

---

Tutorial de Comandos Para El Fomateo Eslint, Prettier y Typescript:

1. `npm run lint`: Ejecuta ESLint para identificar problemas en el código sin corregirlos.|
2. `npm run lint:fix`: Ejecuta ESLint y corrige automáticamente los problemas que pueda solucionar.
3. `npm run format:check`: Verifica si el código está formateado correctamente según Prettier, sin hacer cambios.
4. `npm run format:write`: Formatea automáticamente el código del proyecto usando Prettier.
5. `npm run typecheck`: Ejecuta el verificador de tipos de TypeScript sin generar archivos de salida.
6. `npm run build`: Ejecuta el verificador de despliegue
7. `npm audit fix --force`: Repara algunas fallas del servicio de paquetes de npm

---

Tutorial Para analisar tus dependecias :

1. `npm install -g depcheck`
2. `npm install -g depcheck typescript`
3. `depcheck --ignores="@types/*,next,react,react-dom,typescript,@clerk/nextjs,react-icons" --parsers="*.ts:typescript,*.tsx:typescript"`

---

Limpia la caché de VS Code:

Borra los datos en:
Windows: `C:\Users\TU_USUARIO\AppData\Roaming\Code`

---
