# Amplience Configuration

Main Amplience configuration is set through an environment variable.

Copy the `.env.example` and rename to be `.env` and populate the environment variables.

| Env var                | Description                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| SESSION_SECRET         | Shopify session secret                                                                                        |
| PUBLIC_STORE_DOMAIN    | Shopify public store domain                                                                                   |
| HUB_NAME               | Dynamic Content hub name                                                                                      |
| HOMEPAGE_DELIVERY_KEY  | Slot key or the homepage, pointing to a navigation root node (`homepage` in the case of Demostore automation) |
| BLOG_POST_DELIVERY_KEY | Delivery key for a sample blog post                                                                           |

Slot key is usually `homepage` in the case of Demostore automation.
