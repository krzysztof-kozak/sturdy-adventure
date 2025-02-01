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
  slug: z.string(),
});

const ListOfArticlesSchema = z.array(ArticlePreviewSchema);

export { ArticlePreviewSchema, ListOfArticlesSchema };
