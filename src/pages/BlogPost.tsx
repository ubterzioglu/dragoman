import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { Seo } from "@/components/seo/Seo";
import { Section } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { fetchPublishedBlogPostBySlug, type BlogPostRow } from "@/hooks/useAdminContent";

export default function BlogPost() {
  const { t } = useLang();
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchPublishedBlogPostBySlug(slug ?? "")
      .then((row) => {
        if (alive) setPost(row);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) return <p className="py-20 text-center text-teal/50">{t("common.loading")}</p>;
  if (!post) return <Navigate to="../" replace />;

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt ?? post.title}
        {...(post.cover_image_url ? { image: post.cover_image_url } : {})}
      />
      <Section>
        <article className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold text-teal-deep">{post.title}</h1>
          {post.cover_image_url && (
            <img src={post.cover_image_url} alt={post.title} className="mb-8 w-full rounded-2xl object-cover" />
          )}
          <div
            className="prose prose-teal max-w-none"
            // Content is sanitized on write (admin) and again here on render.
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content_html) }}
          />
        </article>
      </Section>
    </>
  );
}
