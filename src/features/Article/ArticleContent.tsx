import type { ArticleSchema } from "api/schemas";
import { renderMarkdown } from "utility/renderMarkdown";
import type { z } from "zod";

type ArticleContentProps = Pick<z.infer<typeof ArticleSchema>, "body">;

function ArticleContent({ body }: ArticleContentProps) {
  return (
    <div className="row article-content">
      <div className="col-md-12" dangerouslySetInnerHTML={renderMarkdown(body)}></div>
    </div>
  );
}

export { ArticleContent };
