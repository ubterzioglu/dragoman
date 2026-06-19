import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { ReservationRow } from "@/hooks/useReservations";

type ReservationStatus = "new" | "contacted" | "confirmed" | "done" | "cancelled";

interface Reservation extends ReservationRow {
  status: ReservationStatus;
}

const STATUS_LABELS: Record<ReservationStatus, string> = {
  new: "Yeni",
  contacted: "İletişime Geçildi",
  confirmed: "Onaylandı",
  done: "Tamamlandı",
  cancelled: "İptal",
};

const STATUS_COLORS: Record<ReservationStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  done: "bg-teal/10 text-teal",
  cancelled: "bg-red-100 text-red-600",
};

const STATUSES = Object.keys(STATUS_LABELS) as ReservationStatus[];

function isValidStatus(s: string): s is ReservationStatus {
  return (STATUSES as string[]).includes(s);
}

interface ReservationCardProps {
  reservation: Reservation;
  onStatusChange: (id: string, status: ReservationStatus) => void;
  updating: boolean;
}

function ReservationCard({ reservation: r, onStatusChange, updating }: ReservationCardProps) {
  return (
    <div className="rounded-2xl border border-teal/10 bg-white p-6 shadow-[0_4px_16px_rgba(1,68,57,0.07)]">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="font-bold text-teal-deep">{r.name}</div>
          <div className="text-sm text-teal/60">{r.email || "—"}</div>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_COLORS[r.status]}`}>
          {STATUS_LABELS[r.status]}
        </span>
      </div>

      <div className="mb-4 grid gap-1.5 text-sm text-teal/70">
        <div>
          <span className="font-semibold text-teal-deep">Telefon:</span> {r.phone}
        </div>
        {r.tourSlug && (
          <div>
            <span className="font-semibold text-teal-deep">Tur:</span> {r.tourSlug}
          </div>
        )}
        {r.date && (
          <div>
            <span className="font-semibold text-teal-deep">Tarih:</span> {r.date}
          </div>
        )}
        {r.partySize && (
          <div>
            <span className="font-semibold text-teal-deep">Kişi sayısı:</span> {r.partySize}
          </div>
        )}
        {r.message && (
          <div>
            <span className="font-semibold text-teal-deep">Mesaj:</span> {r.message}
          </div>
        )}
        <div className="text-xs text-teal/40">{new Date(r.created_at).toLocaleString("tr-TR")}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            disabled={updating || r.status === s}
            onClick={() => onStatusChange(r.id, s)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-40 ${
              r.status === s ? "bg-teal text-white" : "border border-teal/20 text-teal hover:bg-foam"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReservationsPanel() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("reservation_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setReservations(
        (data as Reservation[]).map((r) => ({
          ...r,
          status: isValidStatus(r.status) ? r.status : "new",
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchReservations();
  }, [fetchReservations]);

  const handleStatusChange = async (id: string, status: ReservationStatus) => {
    if (!supabase) return;
    setUpdatingId(id);
    const { error } = await supabase.from("reservation_requests").update({ status }).eq("id", id);
    if (!error) {
      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="rounded-xl border border-teal/10 bg-white px-5 py-3 shadow-sm">
          <div className="text-2xl font-extrabold text-teal-deep">{reservations.length}</div>
          <div className="text-xs text-teal/60">Toplam talep</div>
        </div>
        {STATUSES.map((s) => (
          <div key={s} className="rounded-xl border border-teal/10 bg-white px-5 py-3 shadow-sm">
            <div className="text-2xl font-extrabold text-teal-deep">
              {reservations.filter((r) => r.status === s).length}
            </div>
            <div className="text-xs text-teal/60">{STATUS_LABELS[s]}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-teal-deep">Rezervasyon Talepleri</h3>
        <button
          onClick={() => void fetchReservations()}
          disabled={loading}
          className="rounded-full border border-teal/20 px-4 py-1.5 text-sm font-semibold text-teal transition-colors hover:bg-foam disabled:opacity-50"
        >
          {loading ? "Yükleniyor..." : "Yenile"}
        </button>
      </div>

      {loading && <p className="py-12 text-center text-teal/50">Yükleniyor...</p>}
      {!loading && reservations.length === 0 && (
        <p className="py-12 text-center text-teal/50">Henüz rezervasyon talebi yok.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reservations.map((r) => (
          <ReservationCard
            key={r.id}
            reservation={r}
            onStatusChange={(id, status) => void handleStatusChange(id, status)}
            updating={updatingId === r.id}
          />
        ))}
      </div>
    </div>
  );
}
