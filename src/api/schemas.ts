import { z } from "zod";

const BaseAuthorSchema = z.object({
  username: z.string(),
  image: z.string(),
});

const ArticlePreviewSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: BaseAuthorSchema,
  createdAt: z.coerce.date(),
  favoritesCount: z.number(),
  favorited: z.boolean(),
  slug: z.string(),
});

const ListOfArticlesSchema = z.array(ArticlePreviewSchema);

const ArticleSchema = z.object({
  title: z.string(),
  body: z.string(),
  createdAt: z.coerce.date(),
  author: BaseAuthorSchema,
  favoritesCount: z.number(),
  favorited: z.boolean(),
  slug: z.string(),
});

const ProfileSchema = z.object({
  username: z.string(),
  bio: z.string(),
  image: z.string(),
});

const UserLoginRequestSchema = z.object({
  user: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const UserLoginResponseSchema = z.object({
  data: z.object({ user: z.object({ token: z.string() }) }),
});

const SlugQueryParamSchema = z.string();
const UsernameQueryParamSchema = z.string();

export {
  ArticlePreviewSchema,
  ListOfArticlesSchema,
  ArticleSchema,
  ProfileSchema,
  UserLoginRequestSchema,
  UserLoginResponseSchema,
  SlugQueryParamSchema,
  UsernameQueryParamSchema,
};
