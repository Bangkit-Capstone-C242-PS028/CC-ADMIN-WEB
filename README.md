# DermaScan Admin Dashboard

A web application for managing and verifying doctor registrations.

## Features

- **Doctor Verification Dashboard**
  - View pending doctor registrations
  - Filter doctors by document status
  - Approve doctors with document verification
  - Paginated list view
  - Real-time updates after approval

- **Authentication**
  - Secure admin login
  - Protected routes
  - Firebase Authentication

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MySQL with Drizzle ORM
- **Authentication**: Firebase Auth
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18 or later
- Google Cloud CLI installed and configured
- Firebase project set up

## Environment Variables

Create a `.env.local` file based on `.env.local.sample`:

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

## Deploying to Cloud Run

### 1. Clone the Repository
```bash
git clone https://github.com/Bangkit-Capstone-C242-PS028/CC-ADMIN-WEB
cd CC-ADMIN-WEB
```

### 2. Create Dockerfile
Create a `Dockerfile` based on `Dockerfile.sample` because Cloud Build can't access Cloud Run environment variables when building the image (environment variables that need to be accessed during `npm run build`).

### 3. Deploy to Cloud Run

```bash
gcloud run deploy --source .
```

This command will:
1. Build your container image
2. Push it to Google Container Registry
3. Deploy it to Cloud Run

### Environment Variables in Cloud Run

After deployment, set your environment variables in Cloud Run:

1. Go to Google Cloud Console
2. Navigate to Cloud Run
3. Select your service
4. Click "Edit & Deploy New Revision"
5. Add your environment variables under "Variables & Secrets"

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
