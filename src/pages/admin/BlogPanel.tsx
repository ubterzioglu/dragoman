import { useState, useEffect, useCallback, useRef } from "react";
import Quill from "quill";
import DOMPurify from "dompurify";
import "quill/dist/quill.snow.css";
import {
  fetchBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  uploadBlogImage,
  slugify,
  type BlogPostRow,
} from "@/hooks/useAdminContent";

export default function BlogPanel() {
  const [items, setItems] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Form state
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [published, setPublished] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const editorHost = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  // Quill init (once)
  useEffect(() => {
    if (quillRef.current || !editorHost.current) return;
    const q = new Quill(editorHost.current, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            [{ header: [2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "link", "image"],
            ["clean"],
          ],
          handlers: {
            image: () => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = async () => {
                const file = input.files?.[0];
                if (!file) return;
                try {
                  const url = await uploadBlogImage(file);
                  const range = q.getSelection(true);
                  q.insertEmbed(range.index, "image", url, "user");
                  q.setSelection(range.index + 1, 0);
                } catch (e) {
                  alert("Görsel yüklenemedi: " + (e instanceof Error ? e.message : e));
                }
              };
              input.click();
            },
          },
        },
      },
    });
    quillRef.current = q;
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await fetchBlogPosts());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const resetForm = () => {
    setEditId(undefined);
    setTitle("");
    setSlug("");
    setSlugTouched(false);
    setExcerpt("");
    setPublished(false);
    setCoverFile(null);
    setCoverUrl(null);
    if (quillRef.current) quillRef.current.root.innerHTML = "";
  };

  const handleEdit = (p: BlogPostRow) => {
    setEditId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setSlugTouched(true);
    setExcerpt(p.excerpt ?? "");
    setPublished(p.published);
    setCoverFile(null);
    setCoverUrl(p.cover_image_url);
    if (quillRef.current) quillRef.current.root.innerHTML = p.content_html || "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTitle = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const q = quillRef.current;
    if (!title.trim()) return setError("Başlık gerekli.");
    if (!q || q.getText().trim().length === 0) return setError("İçerik boş olamaz.");

    setSubmitting(true);
    try {
      let finalCover = coverUrl;
      if (coverFile) finalCover = await uploadBlogImage(coverFile);
      const contentHtml = DOMPurify.sanitize(q.root.innerHTML);
      await saveBlogPost(
        {
          slug: slug.trim() || slugify(title),
          title: title.trim(),
          content_html: contentHtml,
          cover_image_url: finalCover,
          excerpt: excerpt.trim() || null,
          published,
        },
        editId,
      );
      resetForm();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kaydedilemedi");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yazıyı sil?")) return;
    setBusyId(id);
    try {
      await deleteBlogPost(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Silinemedi");
    } finally {
      setBusyId(null);
    }
  };

  const coverPreview = coverFile ? URL.createObjectURL(coverFile) : coverUrl;

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-2xl border border-teal/10 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-bold text-teal-deep">{editId ? "Yazıyı Düzenle" : "Yeni Yazı"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-teal-deep">Başlık</label>
            <input
              value={title}
              onChange={(e) => handleTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-teal/15 px-4 py-2.5 outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-teal-deep">
              Slug (URL) — başlıktan otomatik
            </label>
            <input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              className="w-full rounded-xl border border-teal/15 px-4 py-2.5 outline-none focus:border-orange"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-teal-deep">
              Özet (liste/SEO)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-teal/15 px-4 py-2.5 outline-none focus:border-orange"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-teal-deep">Kapak Görseli</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
            {coverPreview && (
              <img src={coverPreview} alt="kapak" className="mt-2 max-w-56 rounded-xl" />
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-teal-deep">İçerik</label>
            <div ref={editorHost} className="min-h-52 bg-white" />
          </div>
          <label className="flex items-center gap-2 text-sm text-teal-deep">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Yayınla (işaretsiz = taslak)
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-orange px-6 py-2.5 font-semibold text-white transition-colors hover:bg-orange-soft disabled:opacity-50"
            >
              {submitting ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-teal/20 px-6 py-2.5 font-semibold text-teal hover:bg-foam"
            >
              Temizle / Yeni
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-teal-deep">{items.length} yazı</h3>
        <button
          onClick={() => void load()}
          disabled={loading}
          className="rounded-full border border-teal/20 px-4 py-1.5 text-sm font-semibold text-teal hover:bg-foam disabled:opacity-50"
        >
          {loading ? "Yükleniyor..." : "Yenile"}
        </button>
      </div>

      {!loading && items.length === 0 && (
        <p className="py-12 text-center text-teal/50">Henüz yazı yok.</p>
      )}

      <div className="space-y-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-teal/10 bg-white p-4 shadow-sm"
          >
            {p.cover_image_url && (
              <img src={p.cover_image_url} alt="" className="h-14 w-20 rounded-lg object-cover" />
            )}
            <div className="min-w-44 flex-1">
              <div className="font-bold text-teal-deep">{p.title}</div>
              <div className="text-xs text-teal/50">
                /{p.slug} · {new Date(p.created_at).toLocaleDateString("tr-TR")}
              </div>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                p.published ? "bg-teal/15 text-teal" : "bg-orange/15 text-orange"
              }`}
            >
              {p.published ? "Yayında" : "Taslak"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="rounded-full border border-teal/20 px-3 py-1 text-xs font-semibold text-teal hover:bg-foam"
              >
                Düzenle
              </button>
              <button
                disabled={busyId === p.id}
                onClick={() => void handleDelete(p.id)}
                className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
