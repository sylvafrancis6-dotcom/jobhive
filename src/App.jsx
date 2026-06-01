import { useState, useMemo } from "react";

const SAMPLE_JOBS = [ /* ... your original SAMPLE_JOBS array ... */ ];

const SOURCE_META = { /* ... your original SOURCE_META ... */ };
const TYPE_META = { /* ... your original TYPE_META ... */ };

const timeAgo = (date) => {
  const s = (Date.now() - new Date(date)) / 1000;
  if (s < 60) return "Just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 172800) return "Yesterday";
  return `${Math.floor(s / 86400)}d ago`;
};

const fmtSalary = (min, max, curr) => {
  if (!min && !max) return null;
  if (curr === "USD_HR") return `$${min}–$${max}/hr`;

  const sym = curr === "GBP" ? "£" : curr === "EUR" ? "€" : "$";
  const f = (n) => (n >= 1000 ? `${sym}${(n / 1000).toFixed(0)}k` : `${sym}${n}`);

  if (min && max) return `${f(min)} – ${f(max)}`;
  return min ? `From ${f(min)}` : `Up to ${f(max)}`;
};

// Reusable Components (unchanged - kept clean)
const SourceChip = ({ source }) => {
  const m = SOURCE_META[source] || { color: "#667eea", bg: "#EEF0FF", icon: "?" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: m.bg, color: m.color, fontSize: "11px", fontWeight: "700", padding: "3px 9px", borderRadius: "6px", border: `1px solid ${m.color}22` }}>
      <span style={{ width: "14px", height: "14px", borderRadius: "3px", background: m.color, color: "#fff", fontSize: "7px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {m.icon.toUpperCase()}
      </span>
      {source}
    </span>
  );
};

const TypeChip = ({ type }) => {
  const m = TYPE_META[type] || { label: type, color: "#555", bg: "#f5f5f5" };
  return <span style={{ background: m.bg, color: m.color, fontSize: "11px", fontWeight: "600", padding: "3px 9px", borderRadius: "6px" }}>{m.label}</span>;
};

// JobCard, Drawer components remain mostly the same (I kept them clean)
function JobCard({ job, onClick, saved, onSave }) {
  const sal = fmtSalary(job.job_min_salary, job.job_max_salary, job.job_salary_currency);
  const initials = job.employer_name?.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase() || "??";
  const hue = (job.employer_name?.charCodeAt(0) || 0) * 17 % 360;

  return (
    <div onClick={() => onClick(job)} style={{ /* your original styles */ }} /* ... rest same ... */>
      {/* Your JobCard content - unchanged for brevity */}
      {/* ... */}
    </div>
  );
}

// Drawer component (same as before, just make sure it's robust)
function Drawer({ job, onClose }) {
  if (!job) return null;
  // ... your original Drawer code (kept as is)
}

// ── Main App ──────────────────────────────────────────────────
const FILTERS = ["All", "Full-time", "Part-time", "Contract", "Remote"];
const SORTS = ["Newest First", "Salary: High → Low", "Salary: Low → High"];

export default function App() {
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  const [search, setSearch] = useState("software engineer");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest First");
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("browse");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);

  // Use environment variable
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY || process.env.REACT_APP_RAPIDAPI_KEY;

  const searchLive = async () => {
    if (!apiKey) {
      setError("API key not configured. Please add VITE_RAPIDAPI_KEY to your environment variables.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(search)}&num_pages=2&date_posted=all&remote_jobs_only=false`,
        {
          headers: {
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
        }
      );

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();

      if (data.data?.length > 0) {
        const normalized = data.data.map(j => ({
          ...j,
          job_id: j.job_id || String(Math.random()),
          job_source: j.job_publisher || "Indeed",
          job_is_remote: j.job_is_remote || false,
          job_city: j.job_city || "Remote",
          job_country: j.job_country || "US",
          job_highlights: j.job_highlights || { Qualifications: [], Responsibilities: [] },
          job_min_salary: j.job_min_salary || null,
          job_max_salary: j.job_max_salary || null,
        }));

        setJobs(normalized);
        setIsLive(true);
      } else {
        setError("No results found.");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to fetch live jobs. Showing demo data.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const displayed = useMemo(() => {
    return jobs
      .filter(j => tab === "saved" ? saved.includes(j.job_id) : true)
      .filter(j => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          j.job_title?.toLowerCase().includes(q) ||
          j.employer_name?.toLowerCase().includes(q) ||
          j.job_description?.toLowerCase().includes(q)
        );
      })
      .filter(j => {
        if (filter === "All") return true;
        if (filter === "Remote") return j.job_is_remote;
        if (filter === "Full-time") return j.job_employment_type === "FULLTIME";
        if (filter === "Part-time") return j.job_employment_type === "PARTTIME";
        if (filter === "Contract") return j.job_employment_type === "CONTRACTOR";
        return true;
      })
      .sort((a, b) => {
        if (sort === "Salary: High → Low") return (b.job_max_salary || 0) - (a.job_max_salary || 0);
        if (sort === "Salary: Low → High") return (a.job_min_salary || 0) - (b.job_min_salary || 0);
        return new Date(b.job_posted_at_datetime_utc) - new Date(a.job_posted_at_datetime_utc);
      });
  }, [jobs, search, filter, sort, tab, saved]);

  const totalRemote = jobs.filter(j => j.job_is_remote).length;
  const newToday = jobs.filter(j => Date.now() - new Date(j.job_posted_at_datetime_utc) < 86400000).length;

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Rest of your JSX remains the same - just replace the search button onClick and input onKeyDown: */}

      <button onClick={searchLive} /* ... */>
        {loading ? "Searching..." : "🔍 Search Live"}
      </button>

      {/* ... rest of your UI ... */}

      {selected && <Drawer job={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}