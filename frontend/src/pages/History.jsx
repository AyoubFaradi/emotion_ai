import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getHistory } from "../api/api";
import { History as HistoryIcon, Clock, Loader2, RefreshCw, TrendingUp, Calendar, Smile, Frown, Meh, Laugh, Angry, AlertCircle, BarChart3 } from "lucide-react";

const emotionIcons = {
  happy: <Smile className="h-5 w-5 text-amber-600" />,
  sad: <Frown className="h-5 w-5 text-sky-600" />,
  neutral: <Meh className="h-5 w-5 text-slate-600" />,
  angry: <Angry className="h-5 w-5 text-red-600" />,
  surprise: <Laugh className="h-5 w-5 text-violet-600" />,
  disgust: <Frown className="h-5 w-5 text-emerald-600" />,
  fear: <Frown className="h-5 w-5 text-orange-600" />,
};

const emotionBg = {
  happy: "bg-amber-50 border-amber-200",
  sad: "bg-sky-50 border-sky-200",
  angry: "bg-red-50 border-red-200",
  neutral: "bg-slate-100 border-slate-200",
  surprise: "bg-violet-50 border-violet-200",
  disgust: "bg-emerald-50 border-emerald-200",
  fear: "bg-orange-50 border-orange-200",
};

const barColors = {
  happy: "bg-amber-500",
  sad: "bg-sky-500",
  angry: "bg-red-500",
  neutral: "bg-slate-500",
  surprise: "bg-violet-500",
  disgust: "bg-emerald-500",
  fear: "bg-orange-500",
};

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistory();
      setData(res.data || []);
    } catch (e) {
      if (e.response?.status === 401) alert("Connectez-vous pour voir l'historique");
      else alert("Erreur chargement");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const formatDate = (d) => {
    if (!d) return "—";
    try { return new Date(d).toLocaleString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return d; }
  };

  const avg = data.length ? (data.reduce((s, i) => s + (parseFloat(i.confidence) || 0), 0) / data.length).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f62fe] text-white">
              <HistoryIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Historique</h1>
              <p className="text-slate-600">Vos analyses</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold">{data.length} analyse(s)</span>
            <button
              onClick={fetchHistory}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f62fe] text-white font-semibold hover:bg-[#0043ce] disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Actualiser
            </button>
          </div>
        </div>

        {data.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
              <BarChart3 className="h-8 w-8 text-[#0f62fe] mb-3" />
              <p className="text-2xl font-bold text-slate-900">{data.length}</p>
              <p className="text-sm font-medium text-slate-500">Total</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
              <TrendingUp className="h-8 w-8 text-[#0f62fe] mb-3" />
              <p className="text-2xl font-bold text-[#0f62fe]">{avg}%</p>
              <p className="text-sm font-medium text-slate-500">Confiance moy.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
              <Calendar className="h-8 w-8 text-[#0f62fe] mb-3" />
              <p className="text-lg font-bold text-slate-900">{data[0] ? formatDate(data[0].created_at).split(",")[0] : "—"}</p>
              <p className="text-sm font-medium text-slate-500">Dernière</p>
            </div>
          </div>
        )}

        <Card>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-[#0f62fe] mb-4" />
              <p className="text-slate-600 font-medium">Chargement...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f0fe] text-[#0f62fe] mb-4">
                <AlertCircle className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune analyse</h3>
              <p className="text-slate-600">Vos analyses apparaîtront ici.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-4 text-left text-sm font-semibold text-slate-600">Émotion</th>
                    <th className="pb-4 text-left text-sm font-semibold text-slate-600">Confiance</th>
                    <th className="pb-4 text-left text-sm font-semibold text-slate-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${emotionBg[row.emotion] || "bg-slate-100 border-slate-200"}`}>
                            {emotionIcons[row.emotion] || <Smile className="h-5 w-5 text-slate-500" />}
                          </div>
                          <span className="font-semibold text-slate-900 capitalize">{row.emotion}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#0f62fe] w-14">{typeof row.confidence === "number" ? row.confidence.toFixed(1) : row.confidence}%</span>
                          <div className="flex-1 max-w-[180px] h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full ${barColors[row.emotion] || "bg-[#0f62fe]"} rounded-full`} style={{ width: `${Math.min(100, parseFloat(row.confidence) || 0)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-slate-600 text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {formatDate(row.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
