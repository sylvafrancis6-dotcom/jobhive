import { useState } from "react";

const SAMPLE_JOBS = [
  { job_id: "1", job_title: "Senior Python Developer", employer_name: "Stripe", job_employment_type: "FULLTIME", job_city: "Remote", job_country: "US", job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 3600000).toISOString(), job_apply_link: "https://linkedin.com", job_source: "LinkedIn", job_min_salary: 120000, job_max_salary: 160000, job_salary_currency: "USD", job_description: "We are looking for a Senior Python Developer to join our infrastructure team. You will architect and build scalable backend systems using FastAPI, PostgreSQL, and AWS.", job_highlights: { Qualifications: ["5+ years Python experience", "FastAPI or Django REST Framework", "PostgreSQL & Redis", "AWS / Docker / Kubernetes"], Responsibilities: ["Design and build REST APIs", "Optimise database performance", "Lead code reviews", "Mentor junior engineers"] } },
  { job_id: "2", job_title: "Full Stack Engineer", employer_name: "Notion", job_employment_type: "FULLTIME", job_city: "Remote", job_country: "US", job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 7200000).toISOString(), job_apply_link: "https://indeed.com", job_source: "Indeed", job_min_salary: 100000, job_max_salary: 140000, job_salary_currency: "USD", job_description: "Join Notion as a Full Stack Engineer. Build beautiful, performant product features used by millions using React, Node.js, and PostgreSQL.", job_highlights: { Qualifications: ["React & Next.js", "Node.js / Express", "PostgreSQL", "TypeScript"], Responsibilities: ["Build new product features", "Improve frontend performance", "Write comprehensive tests"] } },
  { job_id: "3", job_title: "AI / ML Engineer", employer_name: "Anthropic", job_employment_type: "FULLTIME", job_city: "Remote", job_country: "US", job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 86400000).toISOString(), job_apply_link: "https://glassdoor.com", job_source: "Glassdoor", job_min_salary: 150000, job_max_salary: 220000, job_salary_currency: "USD", job_description: "Anthropic is hiring an AI/ML Engineer to build LLM-powered applications, RAG pipelines, and AI workflows using Python, LangChain, and vector databases.", job_highlights: { Qualifications: ["Python", "LangChain", "OpenAI / Claude API", "Pinecone or pgvector"], Responsibilities: ["Build RAG pipelines", "LLM integration", "Model evaluation", "AI research"] } },
  { job_id: "4", job_title: "Backend Engineer", employer_name: "Monzo", job_employment_type: "FULLTIME", job_city: "Remote", job_country: "UK", job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 172800000).toISOString(), job_apply_link: "https://ziprecruiter.com", job_source: "ZipRecruiter", job_min_salary: 75000, job_max_salary: 110000, job_salary_currency: "GBP", job_description: "Monzo is looking for a Backend Engineer to join our payments team building reliable, secure financial infrastructure.", job_highlights: { Qualifications: ["Go or Python", "PostgreSQL", "Docker & Kubernetes"], Responsibilities: ["Build payment APIs", "Database optimisation", "Security implementation"] } },
  { job_id: "5", job_title: "React Frontend Developer", employer_name: "Linear", job_employment_type: "FULLTIME", job_city: "Remote", job_country: "US", job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 259200000).toISOString(), job_apply_link: "https://monster.com", job_source: "Monster", job_min_salary: 90000, job_max_salary: 130000, job_salary_currency: "USD", job_description: "Linear is hiring a React developer to build pixel-perfect, blazing-fast UI experiences for our project management tool.", job_highlights: { Qualifications: ["React & TypeScript", "Next.js", "Tailwind CSS"], Responsibilities: ["Build UI components", "Implement product designs", "Performance optimisation"] } },
  { job_id: "6", job_title: "DevOps / Platform Engineer", employer_name: "Vercel", job_employment_type: "FULLTIME", job_city: "Remote", job_country: "US", job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 345600000).toISOString(), job_apply_link: "https://linkedin.com", job_source: "LinkedIn", job_min_salary: 110000, job_max_salary: 160000, job_salary_currency: "USD", job_description: "Vercel is looking for a Platform Engineer to scale our global edge infrastructure using Kubernetes, CI/CD, and AWS.", job_highlights: { Qualifications: ["Kubernetes & Helm", "AWS / GCP", "Terraform"], Responsibilities: ["Manage cloud infrastructure", "Build deployment pipelines", "Incident response"] } },
];

const SOURCE_META = {
  LinkedIn:     { color: "#0A66C2", bg: "#EBF4FF", icon: "IN" },
  Indeed:       { color: "#2164F3", bg: "#EEF2FF", icon: "ID" },
  Glassdoor:    { color: "#0CAA41", bg: "#EDFBF3", icon: "GD" },
  ZipRecruiter: { color: "#7C3AED", bg: "#F5F0FF", icon: "ZR" },
  Monster:      { color: "#6B21A8", bg: "#FAF0FF", icon: "MN" },
};

const TYPE_META = {
  FULLTIME:   { label: "Full-time", color: "#0D9488", bg: "#F0FDFA" },
  PARTTIME:   { label: "Part-time", color: "#D97706", bg: "#FFFBEB" },
  CONTRACTOR: { label: "Contract",  color: "#7C3AED", bg: "#F5F0FF" },
};

const timeAgo = (d) => {
  const s = (Date.now() - new Date(d)) / 1000;
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  if (s < 172800) return "Yesterday";
  return Math.floor(s / 86400) + "d ago";
};

const fmtSalary = (min, max, curr) => {
  if (!min && !max) return null;
  const sym = curr === "GBP" ? "£" : curr === "EUR" ? "€" : "$";
  const f = (n) => (n >= 1000 ? sym + (n / 1000).toFixed(0) + "k" : sym + n);
  if (min && max) return f(min) + " – " + f(max);
  return min ? "From " + f(min) : "Up to " + f(max);
};

const SourceChip = ({ source }) => {
  const m = SOURCE_META[source] || { color: "#667eea", bg: "#EEF0FF", icon: "??" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: m.bg, color: m.color, fontSize: "11px", fontWeight: "700", padding: "3px 9px", borderRadius: "6px", border: "1px solid " + m.color + "22" }}>
      <span style={{ width: "14px", height: "14px", borderRadius: "3px", background: m.color, color: "#fff", fontSize: "7px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center" }}>{m.icon}</span>
      {source}
    </span>
  );
};

const TypeChip = ({ type }) => {
  const m = TYPE_META[type] || { label: type, color: "#555", bg: "#f5f5f5" };
  return <span style={{ background: m.bg, color: m.color, fontSize: "11px", fontWeight: "600", padding: "3px 9px", borderRadius: "6px" }}>{m.label}</span>;
};

function JobCard({ job, onClick, saved, onSave }) {
  const sal = fmtSalary(job.job_min_salary, job.job_max_salary, job.job_salary_currency);
  const initials = job.employer_name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const hue = (job.employer_name.charCodeAt(0) * 17) % 360;
  return (
    <div onClick={() => onClick(job)} style={{ background: "#fff", border: "1px solid #E8EBF4", borderRadius: "16px", padding: "22px 24px", cursor: "pointer", transition: "all 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(79,70,229,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "hsl(" + hue + ",60%,94%)", border: "1px solid hsl(" + hue + ",40%,86%)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px", color: "hsl(" + hue + ",50%,35%)", flexShrink: 0 }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: "700", fontSize: "15px", color: "#111827", marginBottom: "2px" }}>{job.job_title}</div>
              <div style={{ fontSize: "13px", color: "#6366F1", fontWeight: "600", marginBottom: "10px" }}>{job.employer_name}</div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onSave(job.job_id); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: saved ? "#ef4444" : "#d1d5db" }}>
              {saved ? "♥" : "♡"}
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
            <SourceChip source={job.job_source} />
            <TypeChip type={job.job_employment_type} />
            {job.job_is_remote && <span style={{ background: "#F0FDF4", color: "#16A34A", fontSize: "11px", fontWeight: "600", padding: "3px 9px", borderRadius: "6px" }}>Remote</span>}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "16px" }}>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>📍 {job.job_city}, {job.job_country}</span>
              {sal && <span style={{ fontSize: "13px", fontWeight: "700", color: "#059669" }}>{sal}</span>}
            </div>
            <span style={{ fontSize: "11px", color: "#D1D5DB" }}>{timeAgo(job.job_posted_at_datetime_utc)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Drawer({ job, onClose }) {
  if (!job) return null;
  const sal = fmtSalary(job.job_min_salary, job.job_max_salary, job.job_salary_currency);
  const sm = SOURCE_META[job.job_source] || { color: "#6366F1", bg: "#EEF2FF" };
  const initials = job.employer_name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const hue = (job.employer_name.charCodeAt(0) * 17) % 360;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }} onClick={onClose}>
      <div style={{ flex: 1, background: "rgba(17,24,39,0.5)", backdropFilter: "blur(4px)" }} />
      <div style={{ width: "100%", maxWidth: "520px", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-20px 0 60px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "28px 28px 24px", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "hsl(" + hue + ",60%,94%)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px", color: "hsl(" + hue + ",50%,35%)" }}>{initials}</div>
            <button onClick={onClose} style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "10px", color: "#6B7280", cursor: "pointer", padding: "8px 14px", fontSize: "13px", fontFamily: "inherit", fontWeight: "600" }}>Close</button>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#111827", marginBottom: "4px" }}>{job.job_title}</h2>
          <div style={{ fontSize: "14px", color: "#6366F1", fontWeight: "600", marginBottom: "14px" }}>{job.employer_name}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            <SourceChip source={job.job_source} />
            <TypeChip type={job.job_employment_type} />
            {job.job_is_remote && <span style={{ background: "#F0FDF4", color: "#16A34A", fontSize: "11px", fontWeight: "600", padding: "3px 9px", borderRadius: "6px" }}>Remote</span>}
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "13px", color: "#6B7280" }}>📍 {job.job_city}, {job.job_country}</span>
            {sal && <span style={{ fontSize: "14px", fontWeight: "700", color: "#059669" }}>💰 {sal}</span>}
            <span style={{ fontSize: "12px", color: "#9CA3AF" }}>🕐 {timeAgo(job.job_posted_at_datetime_utc)}</span>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {job.job_highlights && job.job_highlights.Qualifications && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "1.5px", color: "#6366F1", textTransform: "uppercase", marginBottom: "12px" }}>Requirements</div>
              {job.job_highlights.Qualifications.map((q, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366F1", marginTop: "6px", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: "#374151" }}>{q}</span>
                </div>
              ))}
            </div>
          )}
          {job.job_highlights && job.job_highlights.Responsibilities && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "1.5px", color: "#DC2626", textTransform: "uppercase", marginBottom: "12px" }}>Responsibilities</div>
              {job.job_highlights.Responsibilities.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#DC2626", marginTop: "6px", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: "#374151" }}>{r}</span>
                </div>
              ))}
            </div>
          )}
          <div>
            <div style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "1.5px", color: "#6B7280", textTransform: "uppercase", marginBottom: "12px" }}>About the Role</div>
            <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: "1.8" }}>{job.job_description}</p>
          </div>
        </div>
        <div style={{ padding: "20px 28px", borderTop: "1px solid #F3F4F6" }}>
          <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "14px", background: sm.color, color: "#fff", borderRadius: "12px", fontWeight: "700", fontSize: "14px", textDecoration: "none" }}>
            Apply on {job.job_source} →
          </a>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#9CA3AF", marginTop: "8px" }}>Opens {job.job_source} in a new tab</p>
        </div>
      </div>
    </div>
  );
}

const FILTERS = ["All", "Full-time", "Part-time", "Contract", "Remote"];
const SORTS = ["Newest First", "Salary: High to Low", "Salary: Low to High"];

export default function App() {
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  const [search, setSearch] = useState("software engineer");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest First");
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("browse");
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "41b0ac9310msh5ac8ae0a16df2dep142b8djsn40ceb6754a85";

  const searchLive = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://jsearch.p.rapidapi.com/search?query=" + encodeURIComponent(search) + "&num_pages=2",
        { headers: { "x-rapidapi-host": "jsearch.p.rapidapi.com", "x-rapidapi-key": API_KEY } }
      );
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setJobs(data.data.map((j) => ({ ...j, job_source: j.job_publisher || "Indeed" })));
        setIsLive(true);
      } else {
        setError("No results found.");
      }
    } catch (e) {
      setError("Connection error. Showing demo data.");
    }
    setLoading(false);
  };

  const toggleSave = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const displayed = jobs
    .filter((j) => (tab === "saved" ? saved.includes(j.job_id) : true))
    .filter((j) => {
      const q = search.toLowerCase();
      return !isLive ? true : !q || j.job_title.toLowerCase().includes(q) || j.employer_name.toLowerCase().includes(q);
    })
    .filter((j) => {
      if (filter === "All") return true;
      if (filter === "Remote") return j.job_is_remote;
      if (filter === "Full-time") return j.job_employment_type === "FULLTIME";
      if (filter === "Part-time") return j.job_employment_type === "PARTTIME";
      if (filter === "Contract") return j.job_employment_type === "CONTRACTOR";
      return true;
    })
    .sort((a, b) => {
      if (sort === "Salary: High to Low") return (b.job_max_salary || 0) - (a.job_max_salary || 0);
      if (sort === "Salary: Low to High") return (a.job_min_salary || 0) - (b.job_min_salary || 0);
      return new Date(b.job_posted_at_datetime_utc) - new Date(a.job_posted_at_datetime_utc);
    });

  const totalRemote = jobs.filter((j) => j.job_is_remote).length;
  const newToday = jobs.filter((j) => Date.now() - new Date(j.job_posted_at_datetime_utc) < 86400000).length;

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC", fontFamily: "Inter, system-ui, sans-serif", color: "#111827" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }`}</style>

      <nav style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🎯</div>
          <span style={{ fontWeight: "800", fontSize: "17px", color: "#111827" }}>JobHive</span>
          <span style={{ background: "#EEF2FF", color: "#6366F1", fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px" }}>BETA</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {Object.entries(SOURCE_META).map(([name, m]) => (
            <span key={name} style={{ fontSize: "11px", color: m.color, fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: m.color, display: "inline-block" }} />{name}
            </span>
          ))}
        </div>
      </nav>

      <div style={{ background: "linear-gradient(135deg,#1E1B4B,#312E81,#1E1B4B)", padding: "48px 24px 40px", color: "#fff" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "30px", fontWeight: "800", marginBottom: "8px", lineHeight: "1.2" }}>
            Find your next remote role —{" "}
            <span style={{ background: "linear-gradient(135deg,#A5B4FC,#818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>all job boards in one place</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", marginBottom: "28px" }}>LinkedIn · Indeed · Glassdoor · ZipRecruiter · Monster</p>

          <div style={{ display: "flex", gap: "10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "16px", padding: "10px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchLive()}
              placeholder="Search job title, company, or skill..."
              style={{ flex: 1, padding: "11px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "14px", fontFamily: "inherit", outline: "none" }} />
            <button onClick={searchLive} style={{ padding: "11px 24px", background: "#6366F1", border: "none", borderRadius: "10px", color: "#fff", fontWeight: "700", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
              {loading ? "..." : "Search"}
            </button>
          </div>

          <div style={{ marginTop: "10px", fontSize: "11px", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
            {isLive ? "🟢 Live — real jobs from all boards" : loading ? "⏳ Searching..." : "🟡 Demo mode — press Search for live jobs"}
            {error && <span style={{ color: "#FCA5A5", marginLeft: "8px" }}>{error}</span>}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginTop: "28px" }}>
            {[["💼", jobs.length, "Jobs"], ["🌍", totalRemote, "Remote"], ["⚡", newToday, "Today"], ["❤️", saved.length, "Saved"]].map(([icon, val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff" }}>{icon} {val}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "28px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "4px", gap: "2px" }}>
            {[["browse", "All Jobs"], ["saved", "Saved (" + saved.length + ")"]].map(([t, label]) => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 18px", borderRadius: "9px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "13px", fontFamily: "inherit", background: tab === t ? "#6366F1" : "transparent", color: tab === t ? "#fff" : "#6B7280" }}>{label}</button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: "8px 14px", borderRadius: "10px", border: "1px solid #E5E7EB", background: "#fff", fontSize: "13px", fontFamily: "inherit", color: "#374151", cursor: "pointer", outline: "none" }}>
            {SORTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "20px", overflowX: "auto", paddingBottom: "4px" }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 16px", borderRadius: "20px", border: "1.5px solid " + (filter === f ? "#6366F1" : "#E5E7EB"), background: filter === f ? "#EEF2FF" : "#fff", color: filter === f ? "#6366F1" : "#6B7280", fontSize: "12px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ fontSize: "13px", color: "#9CA3AF", marginBottom: "16px" }}>
          {loading ? "Searching all job boards..." : displayed.length + " result" + (displayed.length !== 1 ? "s" : "")}
          {!isLive && !loading && <span style={{ marginLeft: "8px", background: "#FEF3C7", color: "#D97706", fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px" }}>Demo · Press Search for live jobs</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {displayed.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 20px", background: "#fff", borderRadius: "20px", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
              <div style={{ fontWeight: "600", color: "#374151" }}>No jobs found</div>
            </div>
          ) : (
            displayed.map((job) => <JobCard key={job.job_id} job={job} onClick={setSelected} saved={saved.includes(job.job_id)} onSave={toggleSave} />)
          )}
        </div>

        <div style={{ textAlign: "center", padding: "40px 0 20px", fontSize: "12px", color: "#D1D5DB" }}>
          JobHive · Built by Sylvester Francis · Powered by JSearch API
        </div>
      </div>

      {selected && <Drawer job={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
