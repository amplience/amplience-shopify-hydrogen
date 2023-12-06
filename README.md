# amplience-shopify-hydrogen

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

- [Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
- [Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

## Configure

Copy the `.env.example` and rename to be `.env` and populate the environment variables.

| Env var             | Description                 |
| ------------------- | --------------------------- |
| SESSION_SECRET      | Shopify session secret      |
| PUBLIC_STORE_DOMAIN | Shopify public store domain |
| HUB_NAME            | Dynamic Content hub name    |

## Install

```bash
nvm use
npm install
```

## Local development

```bash
npm run dev
```
