import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { SEG } from "@/lib/routes";
import { fetchPublishedBlogPosts, type BlogPostRow } from "@/hooks/useAdminContent";

export default function Blog() {
  const { t, localePath } = useLang();
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchPublishedBlogPosts()
      .then((rows) => {
        if (alive) setPosts(rows);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Seo title={t("blog.title")} description={t("blog.subtitle")} />
      <Section>
        <SectionHeading title={t("blog.title")} subtitle={t("blog.subtitle")} />

        {loading && <p className="py-12 text-center text-teal/50">{t("common.loading")}</p>}

        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={localePath(`${SEG.blog}/${post.slug}`)}
                className="flex flex-col overflow-hidden rounded-2xl border border-teal/10 bg-white shadow-[0_10px_30px_rgba(1,68,57,0.08)] transition-transform hover:-translate-y-1"
              >
                {post.cover_image_url && (
                  <img src={post.cover_image_url} alt={post.title} className="h-44 w-full object-cover" loading="lazy" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-base font-bold text-teal-deep">{post.title}</h3>
                  {post.excerpt && <p className="flex-1 text-sm text-teal/70">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="py-12 text-center text-teal/50">{t("blog.empty")}</p>
        )}
      </Section>
    </>
  );
}
