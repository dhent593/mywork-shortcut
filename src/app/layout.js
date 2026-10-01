import './globals.css'

export const metadata = {
  title: 'MyWork - Personal Workspace',
  description: 'Hacker dashboard workspace',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%2310b981' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM182.4 382.5c-12.4 5.2-26.5-4.1-21.1-16.4L224 236.1 146.7 202c-13.4-5.8-12.8-25.2 1-30.2l208-76.3c11.5-4.2 23.3 5.4 20.3 17.5L341.2 368c-3 12.3-18.4 16.5-27 7.4l-52.6-55.7-79.2 62.8z'/%3E%3C/svg%3E" />
      </head>
      <body className="font-mono bg-zinc-950 text-zinc-300">
        {children}
      </body>
    </html>
  )
}
