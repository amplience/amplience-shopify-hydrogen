# Getting started

## Configure

Copy the `.env.example` and rename to be `.env` and populate the environment variables.

| Env var             | Description                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| SESSION_SECRET      | Shopify session secret                                                                                        |
| PUBLIC_STORE_DOMAIN | Shopify public store domain                                                                                   |
| HUB_NAME            | Dynamic Content hub name                                                                                      |
| FLEXIBLE_SLOT_KEY   | Slot key or the homepage, pointing to a navigation root node (`homepage` in the case of Demostore automation) |

## Install

```bash
nvm use
npm install
```

## Local development

```bash
npm run dev
```
