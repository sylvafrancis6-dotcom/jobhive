import { useState } from “react”;

const SAMPLE_JOBS = [
{ job_id: “1”, job_title: “Senior Python Developer”, employer_name: “Stripe”, job_employment_type: “FULLTIME”, job_city: “Remote”, job_country: “US”, job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 3600000).toISOString(), job_apply_link: “https://linkedin.com”, job_source: “LinkedIn”, job_min_salary: 120000, job_max_salary: 160000, job_salary_currency: “USD”, job_description: “We are looking for a Senior Python Developer to join our infrastructure team. You will architect and build scalable backend systems using FastAPI, PostgreSQL, and AWS. You’ll work closely with product and design teams to ship high-quality features.”, job_highlights: { Qualifications: [“5+ years Python experience”, “FastAPI or Django REST Framework”, “PostgreSQL & Redis”, “AWS / Docker / Kubernetes”, “Strong communication skills”], Responsibilities: [“Design and build REST APIs”, “Optimise database performance”, “Lead code reviews”, “Mentor junior engineers”, “Collaborate with cross-functional teams”] } },
{ job_id: “2”, job_title: “Full Stack Engineer”, employer_name: “Notion”, job_employment_type: “FULLTIME”, job_city: “Remote”, job_country: “US”, job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 7200000).toISOString(), job_apply_link: “https://indeed.com”, job_source: “Indeed”, job_min_salary: 100000, job_max_salary: 140000, job_salary_currency: “USD”, job_description: “Join Notion’s engineering team as a Full Stack Engineer. You’ll build beautiful, performant product features used by millions of people worldwide using React, Node.js, and PostgreSQL.”, job_highlights: { Qualifications: [“React & Next.js”, “Node.js / Express”, “PostgreSQL”, “TypeScript”, “CI/CD experience”], Responsibilities: [“Build new product features”, “Improve frontend performance”, “Write comprehensive tests”, “API design and integration”] } },
{ job_id: “3”, job_title: “AI / ML Engineer”, employer_name: “Anthropic”, job_employment_type: “FULLTIME”, job_city: “Remote”, job_country: “US”, job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 86400000).toISOString(), job_apply_link: “https://glassdoor.com”, job_source: “Glassdoor”, job_min_salary: 150000, job_max_salary: 220000, job_salary_currency: “USD”, job_description: “Anthropic is hiring an AI/ML Engineer to build production LLM-powered applications, RAG pipelines, and AI workflows. You’ll work on some of the world’s most advanced AI systems.”, job_highlights: { Qualifications: [“Python proficiency”, “LangChain / LlamaIndex”, “OpenAI / Claude API”, “Pinecone or pgvector”, “ML fundamentals”], Responsibilities: [“Build RAG pipelines”, “LLM integration & fine-tuning”, “Model evaluation”, “AI research & prototyping”] } },
{ job_id: “4”, job_title: “Backend Engineer”, employer_name: “Monzo”, job_employment_type: “FULLTIME”, job_city: “Remote”, job_country: “UK”, job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 172800000).toISOString(), job_apply_link: “https://ziprecruiter.com”, job_source: “ZipRecruiter”, job_min_salary: 75000, job_max_salary: 110000, job_salary_currency: “GBP”, job_description: “Monzo is looking for a Backend Engineer to join our payments team. You’ll build reliable, secure financial infrastructure processing millions of transactions daily.”, job_highlights: { Qualifications: [“Go or Python”, “PostgreSQL”, “Docker & Kubernetes”, “Security best practices”, “Financial systems experience”], Responsibilities: [“Build payment APIs”, “Database optimisation”, “Security implementation”, “On-call rotation”] } },
{ job_id: “5”, job_title: “React Frontend Developer”, employer_name: “Linear”, job_employment_type: “FULLTIME”, job_city: “Remote”, job_country: “US”, job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 259200000).toISOString(), job_apply_link: “https://monster.com”, job_source: “Monster”, job_min_salary: 90000, job_max_salary: 130000, job_salary_currency: “USD”, job_description: “Linear is hiring a React developer to help build the next generation of project management tooling. You’ll craft pixel-perfect, blazing-fast UI experiences.”, job_highlights: { Qualifications: [“React & TypeScript”, “Next.js”, “CSS / Tailwind”, “Performance optimisation”, “Eye for design”], Responsibilities: [“Build UI components”, “Implement product designs”, “Improve app performance”, “Cross-browser compatibility”] } },
{ job_id: “6”, job_title: “DevOps / Platform Engineer”, employer_name: “Vercel”, job_employment_type: “FULLTIME”, job_city: “Remote”, job_country: “US”, job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 345600000).toISOString(), job_apply_link: “https://linkedin.com”, job_source: “LinkedIn”, job_min_salary: 110000, job_max_salary: 160000, job_salary_currency: “USD”, job_description: “Vercel is looking for a Platform Engineer to scale our global edge infrastructure. You’ll work on Kubernetes, CI/CD, and cloud infrastructure serving billions of requests.”, job_highlights: { Qualifications: [“Kubernetes & Helm”, “AWS / GCP / Azure”, “Terraform”, “CI/CD pipelines”, “Linux & networking”], Responsibilities: [“Manage cloud infrastructure”, “Build deployment pipelines”, “Incident response”, “Capacity planning”] } },
{ job_id: “7”, job_title: “Software Engineer — Remote”, employer_name: “GitHub”, job_employment_type: “FULLTIME”, job_city: “Remote”, job_country: “US”, job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 432000000).toISOString(), job_apply_link: “https://indeed.com”, job_source: “Indeed”, job_min_salary: 130000, job_max_salary: 180000, job_salary_currency: “USD”, job_description: “GitHub is hiring Software Engineers to work on core product features used by 100M+ developers. You’ll ship impactful features across our web app, APIs, and developer tooling.”, job_highlights: { Qualifications: [“Ruby or Python”, “React”, “PostgreSQL”, “REST & GraphQL APIs”, “Open source mindset”], Responsibilities: [“Ship product features”, “API development”, “Collaborate globally”, “Write docs & tests”] } },
{ job_id: “8”, job_title: “Contract Python Developer”, employer_name: “Freelance Platform”, job_employment_type: “CONTRACTOR”, job_city: “Remote”, job_country: “US”, job_is_remote: true, job_posted_at_datetime_utc: new Date(Date.now() - 518400000).toISOString(), job_apply_link: “https://ziprecruiter.com”, job_source: “ZipRecruiter”, job_min_salary: 60, job_max_salary: 100, job_salary_currency: “USD_HR”, job_description: “Short-term contract opportunity for an experienced Python developer to build automation scripts and data pipelines for a fast-growing startup.”, job_highlights: { Qualifications: [“Python 3.10+”, “pandas / NumPy”, “REST API consumption”, “Git”], Responsibilities: [“Build data pipelines”, “Automate workflows”, “API integrations”, “Deliver clean documentation”] } },
];

const SOURCE_META = {
LinkedIn:    { color: “#0A66C2”, bg: “#EBF4FF”, icon: “in” },
Indeed:      { color: “#2164F3”, bg: “#EEF2FF”, icon: “id” },
Glassdoor:   { color: “#0CAA41”, bg: “#EDFBF3”, icon: “gd” },
ZipRecruiter:{ color: “#7C3AED”, bg: “#F5F0FF”, icon: “zr” },
Monster:     { color: “#6B21A8”, bg: “#FAF0FF”, icon: “mn” },
};

const TYPE_META = {
FULLTIME:   { label: “Full‑time”,  color: “#0D9488”, bg: “#F0FDFA” },
PARTTIME:   { label: “Part‑time”,  color: “#D97706”, bg: “#FFFBEB” },
CONTRACTOR: { label: “Contract”,   color: “#7C3AED”, bg: “#F5F0FF” },
};

const timeAgo = (d) => {
const s = (Date.now() - new Date(d)) / 1000;
if (s < 3600) return `${Math.floor(s/60)}m ago`;
if (s < 86400) return `${Math.floor(s/3600)}h ago`;
if (s < 172800) return “Yesterday”;
return `${Math.floor(s/86400)}d ago`;
};

const fmtSalary = (min, max, curr) => {
if (!min && !max) return null;
if (curr === “USD_HR”) return `$${min}–$${max}/hr`;
const sym = curr === “GBP” ? “£” : curr === “EUR” ? “€” : “$”;
const f = n => n >= 1000 ? `${sym}${(n/1000).toFixed(0)}k` : `${sym}${n}`;
if (min && max) return `${f(min)} – ${f(max)}`;
return min ? `From ${f(min)}` : `Up to ${f(max)}`;
};

// ── Small reusable chips ──────────────────────────────────────
const SourceChip = ({ source }) => {
const m = SOURCE_META[source] || { color: “#667eea”, bg: “#EEF0FF”, icon: “?” };
return (
<span style={{ display:“inline-flex”, alignItems:“center”, gap:“5px”, background: m.bg, color: m.color, fontSize:“11px”, fontWeight:“700”, padding:“3px 9px”, borderRadius:“6px”, border:`1px solid ${m.color}22` }}>
<span style={{ width:“14px”, height:“14px”, borderRadius:“3px”, background: m.color, color:”#fff”, fontSize:“7px”, fontWeight:“900”, display:“flex”, alignItems:“center”, justifyContent:“center”, flexShrink:0 }}>{m.icon.toUpperCase()}</span>
{source}
</span>
);
};

const TypeChip = ({ type }) => {
const m = TYPE_META[type] || { label: type, color:”#555”, bg:”#f5f5f5” };
return <span style={{ background: m.bg, color: m.color, fontSize:“11px”, fontWeight:“600”, padding:“3px 9px”, borderRadius:“6px” }}>{m.label}</span>;
};

// ── Job Card ──────────────────────────────────────────────────
function JobCard({ job, onClick, saved, onSave }) {
const sal = fmtSalary(job.job_min_salary, job.job_max_salary, job.job_salary_currency);
const initials = job.employer_name.split(” “).slice(0,2).map(w=>w[0]).join(””).toUpperCase();
const hue = (job.employer_name.charCodeAt(0) * 17) % 360;

return (
<div onClick={() => onClick(job)}
style={{ background:”#fff”, border:“1px solid #E8EBF4”, borderRadius:“16px”, padding:“22px 24px”, cursor:“pointer”, transition:“box-shadow 0.18s, border-color 0.18s, transform 0.18s” }}
onMouseEnter={e => { e.currentTarget.style.boxShadow=“0 8px 32px rgba(79,70,229,0.12)”; e.currentTarget.style.borderColor=”#c7d2fe”; e.currentTarget.style.transform=“translateY(-2px)”; }}
onMouseLeave={e => { e.currentTarget.style.boxShadow=“none”; e.currentTarget.style.borderColor=”#E8EBF4”; e.currentTarget.style.transform=“translateY(0)”; }}>

```
  <div style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
    {/* Logo */}
    <div style={{ width:"46px", height:"46px", borderRadius:"12px", background:`hsl(${hue},60%,94%)`, border:`1px solid hsl(${hue},40%,86%)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"800", fontSize:"14px", color:`hsl(${hue},50%,35%)`, flexShrink:0, letterSpacing:"0.5px" }}>{initials}</div>

    {/* Info */}
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px" }}>
        <div style={{ minWidth:0 }}>
          <div style={{ fontWeight:"700", fontSize:"15px", color:"#111827", marginBottom:"2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{job.job_title}</div>
          <div style={{ fontSize:"13px", color:"#6366F1", fontWeight:"600", marginBottom:"10px" }}>{job.employer_name}</div>
        </div>
        <button onClick={e => { e.stopPropagation(); onSave(job.job_id); }}
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:"18px", padding:"2px", flexShrink:0, opacity: saved ? 1 : 0.35, transition:"opacity 0.15s, transform 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="scale(1.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity= saved?"1":"0.35"; e.currentTarget.style.transform="scale(1)"; }}>
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"12px" }}>
        <SourceChip source={job.job_source} />
        <TypeChip type={job.job_employment_type} />
        {job.job_is_remote && <span style={{ background:"#F0FDF4", color:"#16A34A", fontSize:"11px", fontWeight:"600", padding:"3px 9px", borderRadius:"6px" }}>Remote</span>}
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", gap:"16px", alignItems:"center" }}>
          <span style={{ fontSize:"12px", color:"#9CA3AF", display:"flex", alignItems:"center", gap:"4px" }}>
            <span style={{ fontSize:"11px" }}>📍</span> {job.job_city}, {job.job_country}
          </span>
          {sal && <span style={{ fontSize:"13px", fontWeight:"700", color:"#059669" }}>{sal}</span>}
        </div>
        <span style={{ fontSize:"11px", color:"#D1D5DB", fontWeight:"500" }}>{timeAgo(job.job_posted_at_datetime_utc)}</span>
      </div>
    </div>
  </div>
</div>
```

);
}

// ── Detail Drawer ─────────────────────────────────────────────
function Drawer({ job, onClose }) {
if (!job) return null;
const sal = fmtSalary(job.job_min_salary, job.job_max_salary, job.job_salary_currency);
const sm = SOURCE_META[job.job_source] || { color:”#6366F1”, bg:”#EEF2FF” };
const initials = job.employer_name.split(” “).slice(0,2).map(w=>w[0]).join(””).toUpperCase();
const hue = (job.employer_name.charCodeAt(0) * 17) % 360;

return (
<div style={{ position:“fixed”, inset:0, zIndex:50, display:“flex” }} onClick={onClose}>
{/* Backdrop */}
<div style={{ flex:1, background:“rgba(17,24,39,0.5)”, backdropFilter:“blur(4px)” }} />
{/* Panel */}
<div style={{ width:“100%”, maxWidth:“520px”, background:”#fff”, display:“flex”, flexDirection:“column”, boxShadow:”-20px 0 60px rgba(0,0,0,0.15)”, animation:“slideIn 0.25s ease” }} onClick={e => e.stopPropagation()}>
<style>{`@keyframes slideIn { from { transform:translateX(40px); opacity:0; } to { transform:translateX(0); opacity:1; } }`}</style>

```
    {/* Panel header */}
    <div style={{ padding:"28px 28px 24px", borderBottom:"1px solid #F3F4F6" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"18px" }}>
        <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:`hsl(${hue},60%,94%)`, border:`1px solid hsl(${hue},40%,86%)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"800", fontSize:"16px", color:`hsl(${hue},50%,35%)` }}>{initials}</div>
        <button onClick={onClose} style={{ background:"#F9FAFB", border:"1px solid #E5E7EB", borderRadius:"10px", color:"#6B7280", cursor:"pointer", padding:"8px 14px", fontSize:"13px", fontFamily:"inherit", fontWeight:"600" }}>✕ Close</button>
      </div>
      <h2 style={{ fontSize:"20px", fontWeight:"800", color:"#111827", marginBottom:"4px", lineHeight:"1.3" }}>{job.job_title}</h2>
      <div style={{ fontSize:"14px", color:"#6366F1", fontWeight:"600", marginBottom:"14px" }}>{job.employer_name}</div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"16px" }}>
        <SourceChip source={job.job_source} />
        <TypeChip type={job.job_employment_type} />
        {job.job_is_remote && <span style={{ background:"#F0FDF4", color:"#16A34A", fontSize:"11px", fontWeight:"600", padding:"3px 9px", borderRadius:"6px" }}>Remote</span>}
      </div>

      <div style={{ display:"flex", gap:"20px", flexWrap:"wrap" }}>
        <span style={{ fontSize:"13px", color:"#6B7280", display:"flex", alignItems:"center", gap:"5px" }}>📍 {job.job_city}, {job.job_country}</span>
        {sal && <span style={{ fontSize:"14px", fontWeight:"700", color:"#059669" }}>💰 {sal}</span>}
        <span style={{ fontSize:"12px", color:"#9CA3AF" }}>🕐 {timeAgo(job.job_posted_at_datetime_utc)}</span>
      </div>
    </div>

    {/* Scrollable body */}
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      {job.job_highlights?.Qualifications && (
        <div style={{ marginBottom:"24px" }}>
          <div style={{ fontSize:"11px", fontWeight:"800", letterSpacing:"1.5px", color:"#6366F1", textTransform:"uppercase", marginBottom:"12px" }}>Requirements</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {job.job_highlights.Qualifications.map((q,i) => (
              <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#6366F1", marginTop:"6px", flexShrink:0 }} />
                <span style={{ fontSize:"13px", color:"#374151", lineHeight:"1.5" }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {job.job_highlights?.Responsibilities && (
        <div style={{ marginBottom:"24px" }}>
          <div style={{ fontSize:"11px", fontWeight:"800", letterSpacing:"1.5px", color:"#DC2626", textTransform:"uppercase", marginBottom:"12px" }}>Responsibilities</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {job.job_highlights.Responsibilities.map((r,i) => (
              <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#DC2626", marginTop:"6px", flexShrink:0 }} />
                <span style={{ fontSize:"13px", color:"#374151", lineHeight:"1.5" }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div style={{ fontSize:"11px", fontWeight:"800", letterSpacing:"1.5px", color:"#6B7280", textTransform:"uppercase", marginBottom:"12px" }}>About the Role</div>
        <p style={{ fontSize:"13px", color:"#4B5563", lineHeight:"1.8" }}>{job.job_description}</p>
      </div>
    </div>

    {/* Apply CTA */}
    <div style={{ padding:"20px 28px", borderTop:"1px solid #F3F4F6", background:"#FAFAFA" }}>
      <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer"
        style={{ display:"block", textAlign:"center", padding:"14px", background: sm.color, color:"#fff", borderRadius:"12px", fontWeight:"700", fontSize:"14px", textDecoration:"none", letterSpacing:"0.3px" }}>
        Apply on {job.job_source} →
      </a>
      <p style={{ textAlign:"center", fontSize:"11px", color:"#9CA3AF", marginTop:"8px" }}>Opens {job.job_source} in a new tab</p>
    </div>
  </div>
</div>
```

);
}

// ── Main App ──────────────────────────────────────────────────
const FILTERS = [“All”, “Full‑time”, “Part‑time”, “Contract”, “Remote”];
const SORTS   = [“Newest First”, “Salary: High → Low”, “Salary: Low → High”];

export default function App() {
const [jobs, setJobs]   = useState(SAMPLE_JOBS);
const [search, setSearch] = useState(“software engineer”);
const [filter, setFilter] = useState(“All”);
const [sort, setSort]   = useState(“Newest First”);
const [saved, setSaved] = useState([]);
const [selected, setSelected] = useState(null);
const [tab, setTab]     = useState(“browse”);
const [apiKey] = useState(“41b0ac9310msh5ac8ae0a16df2dep142b8djsn40ceb6754a85”);
const [loading, setLoading] = useState(false);
const [isLive, setIsLive] = useState(false);
const [error, setError] = useState(null);

const searchLive = async (query) => {
setLoading(true);
setError(null);
try {
const res = await fetch(
`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query || search)}&num_pages=2&date_posted=all&remote_jobs_only=false`,
{ headers: { “x-rapidapi-host”: “jsearch.p.rapidapi.com”, “x-rapidapi-key”: apiKey } }
);
const data = await res.json();
if (data.data && data.data.length > 0) {
setJobs(data.data.map(j => ({ …j, job_source: j.job_publisher || “Indeed” })));
setIsLive(true);
} else {
setError(“No results found. Try a different search.”);
}
} catch (e) {
setError(“Connection error. Showing demo data.”);
}
setLoading(false);
};

const toggleSave = id => setSaved(s => s.includes(id) ? s.filter(x=>x!==id) : […s,id]);

const displayed = jobs
.filter(j => tab === “saved” ? saved.includes(j.job_id) : true)
.filter(j => {
const q = search.toLowerCase();
return !q || j.job_title.toLowerCase().includes(q) || j.employer_name.toLowerCase().includes(q) || j.job_description.toLowerCase().includes(q);
})
.filter(j => {
if (filter === “All”) return true;
if (filter === “Remote”) return j.job_is_remote;
if (filter === “Full‑time”) return j.job_employment_type === “FULLTIME”;
if (filter === “Part‑time”) return j.job_employment_type === “PARTTIME”;
if (filter === “Contract”) return j.job_employment_type === “CONTRACTOR”;
return true;
})
.sort((a, b) => {
if (sort === “Salary: High → Low”) return (b.job_max_salary||0)-(a.job_max_salary||0);
if (sort === “Salary: Low → High”) return (a.job_min_salary||0)-(b.job_min_salary||0);
return new Date(b.job_posted_at_datetime_utc) - new Date(a.job_posted_at_datetime_utc);
});

const totalRemote = jobs.filter(j=>j.job_is_remote).length;
const newToday = jobs.filter(j=>Date.now()-new Date(j.job_posted_at_datetime_utc)<86400000).length;

return (
<div style={{ minHeight:“100vh”, background:”#F8F9FC”, fontFamily:”‘Inter’, system-ui, sans-serif”, color:”#111827” }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); * { box-sizing:border-box; margin:0; padding:0; } ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-thumb { background:#e0e0e0; border-radius:4px; } ::placeholder { color:#9CA3AF; } input:focus, select:focus { outline:none; border-color:#6366F1 !important; box-shadow:0 0 0 3px rgba(99,102,241,0.12) !important; }`}</style>

```
  {/* ── Top Nav ── */}
  <nav style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"0 32px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:40 }}>
    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
      <div style={{ width:"32px", height:"32px", borderRadius:"9px", background:"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px" }}>🎯</div>
      <span style={{ fontWeight:"800", fontSize:"17px", color:"#111827", letterSpacing:"-0.3px" }}>JobHive</span>
      <span style={{ background:"#EEF2FF", color:"#6366F1", fontSize:"10px", fontWeight:"700", padding:"2px 8px", borderRadius:"20px", letterSpacing:"0.5px" }}>BETA</span>
    </div>
    <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
      {Object.entries(SOURCE_META).map(([name, m]) => (
        <span key={name} style={{ display:"inline-flex", alignItems:"center", gap:"4px", fontSize:"11px", color: m.color, fontWeight:"600" }}>
          <span style={{ width:"8px", height:"8px", borderRadius:"50%", background: m.color, display:"inline-block" }} />{name}
        </span>
      ))}
    </div>
  </nav>

  {/* ── Hero ── */}
  <div style={{ background:"linear-gradient(135deg,#1E1B4B 0%,#312E81 50%,#1E1B4B 100%)", padding:"48px 32px 40px", color:"#fff" }}>
    <div style={{ maxWidth:"760px", margin:"0 auto", textAlign:"center" }}>
      <h1 style={{ fontSize:"32px", fontWeight:"800", letterSpacing:"-1px", marginBottom:"8px", lineHeight:"1.2" }}>
        Find your next remote role —<br />
        <span style={{ background:"linear-gradient(135deg,#A5B4FC,#818CF8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          all job boards in one place
        </span>
      </h1>
      <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"14px", marginBottom:"28px" }}>LinkedIn · Indeed · Glassdoor · ZipRecruiter · Monster — searched simultaneously</p>

      {/* Search */}
      <div style={{ display:"flex", gap:"10px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"16px", padding:"10px" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&searchLive(search)} placeholder="Search job title, company, or skill..."
          style={{ flex:1, padding:"11px 16px", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.1)", color:"#fff", fontSize:"14px", fontFamily:"inherit" }} />
        <button onClick={() => searchLive(search)} style={{ padding:"11px 24px", background:"#6366F1", border:"none", borderRadius:"10px", color:"#fff", fontWeight:"700", fontSize:"13px", cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", boxShadow:"0 4px 14px rgba(99,102,241,0.4)", transition:"background 0.15s" }}
          onMouseEnter={e=>e.currentTarget.style.background="#4F46E5"}
          onMouseLeave={e=>e.currentTarget.style.background="#6366F1"}>
          {loading ? "⏳" : "🔍 Search"}
        </button>
      </div>

      <div style={{ marginTop:"10px", fontSize:"11px", color:"rgba(255,255,255,0.5)", textAlign:"center" }}>
        {isLive ? "🟢 Live — real jobs from LinkedIn, Indeed, Glassdoor & more" : loading ? "⏳ Searching all job boards..." : "Press Search to load live jobs"}
        {error && <span style={{ color:"#FCA5A5", marginLeft:"8px" }}>{error}</span>}
      </div>

      {/* Stats */}
      <div style={{ display:"flex", justifyContent:"center", gap:"32px", marginTop:"28px" }}>
        {[["💼", jobs.length, "Jobs available"], ["🌍", totalRemote, "Remote only"], ["⚡", newToday, "Posted today"], ["❤️", saved.length, "Saved"]].map(([icon,val,label]) => (
          <div key={label} style={{ textAlign:"center" }}>
            <div style={{ fontSize:"22px", fontWeight:"800", color:"#fff" }}>{icon} {val}</div>
            <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.45)", marginTop:"2px" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ── Content ── */}
  <div style={{ maxWidth:"840px", margin:"0 auto", padding:"28px 16px" }}>

    {/* Tab + Filter Row */}
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
      <div style={{ display:"flex", background:"#fff", border:"1px solid #E5E7EB", borderRadius:"12px", padding:"4px", gap:"2px" }}>
        {[["browse","All Jobs"], ["saved",`Saved (${saved.length})`]].map(([t,label]) => (
          <button key={t} onClick={()=>setTab(t)} style={{ padding:"7px 18px", borderRadius:"9px", border:"none", cursor:"pointer", fontWeight:"600", fontSize:"13px", fontFamily:"inherit", transition:"all 0.15s", background: tab===t ? "#6366F1" : "transparent", color: tab===t ? "#fff" : "#6B7280" }}>{label}</button>
        ))}
      </div>
      <select value={sort} onChange={e=>setSort(e.target.value)} style={{ padding:"8px 14px", borderRadius:"10px", border:"1px solid #E5E7EB", background:"#fff", fontSize:"13px", fontFamily:"inherit", color:"#374151", cursor:"pointer" }}>
        {SORTS.map(s=><option key={s}>{s}</option>)}
      </select>
    </div>

    {/* Filter Pills */}
    <div style={{ display:"flex", gap:"6px", marginBottom:"20px", overflowX:"auto", paddingBottom:"4px" }}>
      {FILTERS.map(f => (
        <button key={f} onClick={()=>setFilter(f)} style={{ padding:"6px 16px", borderRadius:"20px", border:`1.5px solid ${filter===f?"#6366F1":"#E5E7EB"}`, background: filter===f ? "#EEF2FF" : "#fff", color: filter===f ? "#6366F1" : "#6B7280", fontSize:"12px", fontWeight:"600", cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", transition:"all 0.15s" }}>
          {f}
        </button>
      ))}
    </div>

    {/* Results label */}
    <div style={{ fontSize:"13px", color:"#9CA3AF", marginBottom:"16px", fontWeight:"500" }}>
      {loading ? "⏳ Searching LinkedIn, Indeed, Glassdoor..." : `${displayed.length} result${displayed.length!==1?"s":""} ${search && !isLive ? "" : isLive ? `for "${search}"` : ""}`}
      {!isLive && !loading && <span style={{ marginLeft:"8px", background:"#FEF3C7", color:"#D97706", fontSize:"11px", fontWeight:"700", padding:"2px 8px", borderRadius:"6px" }}>Demo · Press Search for live jobs</span>}
    </div>

    {/* Job List */}
    {displayed.length === 0 ? (
      <div style={{ textAlign:"center", padding:"64px 20px", background:"#fff", borderRadius:"20px", border:"1px solid #E5E7EB" }}>
        <div style={{ fontSize:"40px", marginBottom:"12px" }}>🔍</div>
        <div style={{ fontWeight:"600", fontSize:"16px", color:"#374151" }}>No jobs found</div>
        <div style={{ fontSize:"13px", color:"#9CA3AF", marginTop:"6px" }}>Try adjusting your search or filters</div>
      </div>
    ) : (
      <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        {displayed.map(job => (
          <JobCard key={job.job_id} job={job} onClick={setSelected} saved={saved.includes(job.job_id)} onSave={toggleSave} />
        ))}
      </div>
    )}

    <div style={{ textAlign:"center", padding:"40px 0 20px", fontSize:"12px", color:"#D1D5DB" }}>
      JobHive · Built by Sylvester Francis · Powered by JSearch API
    </div>
  </div>

  {selected && <Drawer job={selected} onClose={()=>setSelected(null)} />}
</div>
```

);
}
