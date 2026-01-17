import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getHistory } from "../api/api";
import {
  History as HistoryIcon,
  Clock,
  Loader2,
  Calendar,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
} from "lucide-react";

const emotionIcons = {
  happy: <Smile className="w-5 h-5 text-yellow-400" />,
  sad: <Frown className="w-5 h-5 text-blue-400" />,
  neutral: <Meh className="w-5 h-5 text-gray-400" />,
  angry: <Angry className="w-5 h-5 text-red-400" />,
  surprise: <Laugh className="w-5 h-5 text-purple-400" />,
  disgust: <Frown className="w-5 h-5 text-green-400" />,
  fear: <Frown className="w-5 h-5 text-orange-400" />,
};

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistory();
      console.log("History data received:", res.data);
      setData(res.data || []);
    } catch (err) {
      console.error("History error:", err);
      console.error("Error details:", err.response?.data);
      if (err.response?.status === 401) {
        // Utilisateur non connecté
        alert("Veuillez vous connecter pour voir votre historique");
        setData([]);
      } else {
        alert("Erreur lors du chargement de l'historique");
        setData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date inconnue";
    try {
      return new Date(date).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return date;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HistoryIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Historique</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            {data.length} analyse{data.length > 1 ? 's' : ''} trouvée{data.length > 1 ? 's' : ''}
          </div>
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Chargement..." : "Actualiser"}
          </button>
        </div>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin w-6 h-6 text-primary" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Clock className="w-10 h-10 mx-auto mb-3" />
            Aucune analyse
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-white/10 text-gray-400 text-sm">
              <tr>
                <th className="pb-3 text-left">Émotion</th>
                <th className="pb-3 text-left">Confiance</th>
                <th className="pb-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="py-3 flex items-center gap-2">
                    {emotionIcons[item.emotion] || <Smile className="w-5 h-5 text-gray-400" />}
                    <span className="capitalize">{item.emotion}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{typeof item.confidence === 'number' ? item.confidence.toFixed(2) : item.confidence}%</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, Math.max(0, parseFloat(item.confidence) || 0))}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-gray-400">
                    {formatDate(item.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
