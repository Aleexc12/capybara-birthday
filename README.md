# Capybara Birthday

An interactive birthday greeting web app where a capybara guides the user through a small surprise flow: wake-up intro, phone-style hub, memories gallery, and birthday letter.

## Features

- **Phone-frame hub** with app icons for navigating to different sections
- **Mailbox** with an envelope-opening animation revealing a birthday letter
- **Memories gallery** with polaroid-style photos and lightbox zoom
- **Typewriter dialogue + SFX** for a playful, animated intro
- **Kawaii aesthetic** with pastel colors, custom fonts, and smooth transitions

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Getting Started

```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test

# Production build
npm run build
```

## Customize Your Content

You only need these two places:

- `src/PUT-YOUR-CONTENT-HERE/content.ts`
- `src/PUT-YOUR-CONTENT-HERE/memories/`

### 1) Edit texts + captions

- File: `src/PUT-YOUR-CONTENT-HERE/content.ts`
- Recommended:
  - `letterText` (full letter content)
  - `memories` -> `caption` (text under each photo)
- Optional:
  - `firstBubbleText` (first speech bubble)
  - `introLines` (intro conversation)

Tip: use `\n` in `letterText` to add line breaks.

### 2) Add your memory photos

- Folder: `src/PUT-YOUR-CONTENT-HERE/memories/`
- Put your images here.
- Supported formats: `png`, `jpg`, `jpeg`, `webp`, `avif`.
- Important: each `fileName` in `content.ts` must match the real image file name exactly..

Example memory entry:

```ts
{ fileName: "10.jpg", caption: "our beach day" }
```
