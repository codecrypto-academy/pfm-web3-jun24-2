This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Probar front con smart contracts en foundry

1. Iniciamos la red anvil para que sea accesible desde todas las ip's con este comando:
```bash
    anvil --host 0.0.0.0
```
2. Desplegamos los contratos en la red de anvil con make:

```bash
cd foundry
make deploy-anvil
```
## Probar front con smart contracts en foundry en TSC
0: contract BloodTracker 0x87B6e65B89a32b800a79A34C2fA25131430504D3
1: contract BloodDonation 0x4BA7aA9FD03AA150691bD83d3e879E0C5F3553B1
2: contract BloodDerivative 0xB9838B504037fFDa6C79EeC9fB62753A58ae9fe4

3. Desplegamos el front:

```bash
# root repo directory
npm run dev
```
Podremos interactuar con el front, es recomendable conectar una wallet y probar a registrar direcciones.

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
