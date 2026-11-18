"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BedDouble, Building2, Check, ChevronDown,
  Heart, House, MapPin, Menu, Search, ShieldCheck, SlidersHorizontal,
  Sparkles, Star, Users, Wallet, X
} from "lucide-react";

type Category = "All stays" | "PG / Co-living" | "Apartments" | "Independent houses";
type Property = {
  id: number; title: string; location: string; area: string; price: number;
  type: Exclude<Category, "All stays">; beds: string; furnishing: string;
  rating: number; image: string; badge?: string; amenities: string[];
};

const properties: Property[] = [
  { id: 1, title: "Bright & airy co-living residence", location: "Madhapur, Hyderabad", area: "Madhapur", price: 8500, type: "PG / Co-living", beds: "Single / sharing", furnishing: "Fully furnished", rating: 4.8, badge: "Popular choice", image: "photo-1555854877-bab0e564b8d5", amenities: ["Wi-Fi", "Meals", "Housekeeping"] },
  { id: 2, title: "Contemporary 2 BHK apartment", location: "Kondapur, Hyderabad", area: "Kondapur", price: 24000, type: "Apartments", beds: "2 bedrooms", furnishing: "Semi-furnished", rating: 4.9, badge: "New listing", image: "photo-1600607687939-ce8a6c25118c", amenities: ["Parking", "Lift", "Security"] },
  { id: 3, title: "Calm private room for professionals", location: "Gachibowli, Hyderabad", area: "Gachibowli", price: 10500, type: "PG / Co-living", beds: "Private room", furnishing: "Fully furnished", rating: 4.7, image: "photo-1611892440504-42a792e24d32", amenities: ["Wi-Fi", "Laundry", "Power backup"] },
  { id: 4, title: "Modern family home with balcony", location: "Manikonda, Hyderabad", area: "Manikonda", price: 32000, type: "Independent houses", beds: "3 bedrooms", furnishing: "Unfurnished", rating: 4.9, image: "photo-1600047509807-ba8f99d2cdde", amenities: ["Balcony", "Parking", "Garden"] },
  { id: 5, title: "Minimal 1 BHK near the metro", location: "Kukatpally, Hyderabad", area: "Kukatpally", price: 16000, type: "Apartments", beds: "1 bedroom", furnishing: "Semi-furnished", rating: 4.6, image: "photo-1600210492486-724fe5c67fb0", amenities: ["Lift", "Security", "Water"] },
  { id: 6, title: "Comfortable shared living space", location: "Ameerpet, Hyderabad", area: "Ameerpet", price: 7000, type: "PG / Co-living", beds: "Twin sharing", furnishing: "Fully furnished", rating: 4.7, image: "photo-1522708323590-d24dbb6b0267", amenities: ["Wi-Fi", "Meals", "Laundry"] }
];

const categories: { label: Category; icon: typeof House; detail: string }[] = [
  { label: "All stays", icon: Sparkles, detail: "Explore everything" },
  { label: "PG / Co-living", icon: BedDouble, detail: "Easy, flexible living" },
  { label: "Apartments", icon: Building2, detail: "Your own place" },
  { label: "Independent houses", icon: House, detail: "Room to make yours" }
];

const money = (value: number) => "₹" + value.toLocaleString("en-IN");

export default function HomePage() {
  const [category, setCategory] = useState<Category>("All stays");
  const [location, setLocation] = useState("Hyderabad");
  const [budget, setBudget] = useState("Any budget");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => properties.filter((p) => {
    const matchesCategory = category === "All stays" || p.type === category;
    const term = query.trim().toLowerCase();
    const matchesSearch = !term || [p.title, p.location, p.area, p.type].join(" ").toLowerCase().includes(term);
    const matchesBudget = budget === "Any budget" || (budget === "Under ₹10,000" ? p.price < 10000 : budget === "₹10,000–₹20,000" ? p.price >= 10000 && p.price <= 20000 : p.price > 20000);
    const matchesLocation = !location.trim() || location.toLowerCase() === "hyderabad" || p.location.toLowerCase().includes(location.toLowerCase());
    return matchesCategory && matchesSearch && matchesBudget && matchesLocation;
  }), [category, query, budget, location]);

  const visibleProperties = showAll ? filtered : filtered.slice(0, 6);
  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main>
      <div className="announcement"><Sparkles size={14} /> A better way to find your next place <span>Discover RENTZY <ArrowRight size={13} /></span></div>
      <header className="site-header">
        <a className="brand" href="#" aria-label="RENTZY home">rentzy<span>.</span></a>
        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <a className="active" href="#explore" onClick={() => setMobileMenu(false)}>Explore stays</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>How it works</a>
          <a href="#owners" onClick={() => setMobileMenu(false)}>For property owners</a>
        </nav>
        <div className="header-actions">
          <a className="owner-link" href="#owners">List your property <ArrowUpRight size={15} /></a>
          <button className="login-button" onClick={() => alert("Sign in and account features will be connected in the backend phase.")}>Sign in</button>
          <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow light"><span /> FIND A PLACE THAT FEELS RIGHT</div>
          <h1>Your next chapter<br />starts <em>at home.</em></h1>
          <p>From friendly PGs to your own front door. Find a space that fits your life, your plans and your budget.</p>
          <a href="#explore" className="hero-link">Explore places <ArrowRight size={17} /></a>
        </div>
        <div className="hero-note"><span className="note-icon"><ShieldCheck size={19} /></span><span><b>A little more peace of mind</b><small>Clear details. Better choices. Your next move.</small></span></div>
        <div className="hero-count"><b>01</b><span> / 04</span><div /></div>
      </section>

      <section className="search-wrap" aria-label="Find a property">
        <div className="search-panel">
          <label className="search-field location-field"><span className="field-icon"><MapPin size={18} /></span><span className="field-copy"><small>WHERE</small><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or neighbourhood" /></span></label>
          <div className="search-divider" />
          <label className="search-field"><span className="field-icon"><House size={18} /></span><span className="field-copy"><small>PROPERTY TYPE</small><select value={category} onChange={(e) => setCategory(e.target.value as Category)}>{categories.map((c) => <option key={c.label}>{c.label}</option>)}</select></span><ChevronDown className="select-chevron" size={16} /></label>
          <div className="search-divider" />
          <label className="search-field"><span className="field-icon"><Wallet size={18} /></span><span className="field-copy"><small>MONTHLY BUDGET</small><select value={budget} onChange={(e) => setBudget(e.target.value)}><option>Any budget</option><option>Under ₹10,000</option><option>₹10,000–₹20,000</option><option>Above ₹20,000</option></select></span><ChevronDown className="select-chevron" size={16} /></label>
          <button className="search-button" onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}><Search size={18} /><span>Find a place</span></button>
        </div>
        <div className="search-hint"><span><Check size={13} /> No pressure, just possibilities.</span><span>Currently exploring <b>Hyderabad, India</b></span></div>
      </section>

      <section className="section category-section" id="explore">
        <div className="section-heading"><div><div className="eyebrow"><span /> YOUR KIND OF PLACE</div><h2>Find your <em>fit.</em></h2><p>Different lives need different spaces. Start with what feels right.</p></div><a href="#listings" className="text-link">Browse all stays <ArrowRight size={16} /></a></div>
        <div className="category-grid">
          {categories.map(({ label, icon: Icon, detail }, index) => <button key={label} className={category === label ? "category-card selected" : "category-card"} onClick={() => { setCategory(label); document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span className="category-icon"><Icon size={22} strokeWidth={1.7} /></span><span className="category-number">0{index + 1}</span><b>{label}</b><small>{detail}</small><span className="category-arrow"><ArrowUpRight size={17} /></span>
          </button>)}
        </div>
      </section>

      <section className="listings-section" id="listings">
        <div className="section">
          <div className="section-heading listing-heading"><div><div className="eyebrow"><span /> HANDPICKED FOR YOU</div><h2>Places worth <em>seeing.</em></h2><p>A few lovely places to get your search started.</p></div><div className="listing-controls"><label className="quick-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search area or keyword" /></label><button className="filter-button" onClick={() => { setCategory("All stays"); setBudget("Any budget"); setQuery(""); setLocation("Hyderabad"); }}><SlidersHorizontal size={16} /> Reset</button></div></div>
          <div className="active-filters"><span>{filtered.length} places to explore</span><span className="filter-chip"><MapPin size={12} /> {location || "All locations"}</span>{category !== "All stays" && <button className="filter-chip" onClick={() => setCategory("All stays")}>{category} <X size={12} /></button>}</div>
          {visibleProperties.length > 0 ? <div className="property-grid">{visibleProperties.map((p) => <article className="property-card" key={p.id}>
            <div className="property-image" style={{ backgroundImage: `url(https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=900&q=85)` }}>
              {p.badge && <span className="property-badge">{p.badge}</span>}
              <button className={saved.includes(p.id) ? "save-button saved" : "save-button"} aria-label={saved.includes(p.id) ? "Remove from saved" : "Save property"} onClick={() => toggleSaved(p.id)}><Heart size={18} fill={saved.includes(p.id) ? "currentColor" : "none"} /></button>
              <span className="image-type">{p.type}</span>
            </div>
            <div className="property-info"><div className="property-location"><MapPin size={13} /> {p.location}<span className="rating"><Star size={13} fill="currentColor" /> {p.rating}</span></div><h3>{p.title}</h3><div className="property-meta"><span><BedDouble size={14} /> {p.beds}</span><span>{p.furnishing}</span></div><div className="amenities">{p.amenities.map((a) => <span key={a}>{a}</span>)}</div><div className="property-bottom"><div><b>{money(p.price)}</b><small> / month</small></div><button onClick={() => alert("Property details and enquiry flow will be connected in the backend phase.")}>View details <ArrowUpRight size={15} /></button></div></div>
          </article>)}</div> : <div className="empty-state"><Search size={28} /><h3>No places found just yet</h3><p>Try another area, property type or budget.</p><button onClick={() => { setCategory("All stays"); setBudget("Any budget"); setQuery(""); setLocation("Hyderabad"); }}>Clear filters</button></div>}
          {filtered.length > 6 && <div className="center-action"><button className="outline-button" onClick={() => setShowAll(!showAll)}>{showAll ? "Show fewer" : "See all places"} <ArrowRight size={16} /></button></div>}
          <p className="demo-note">Preview listings for design demonstration. Availability, prices and owner details will be verified when the live listing system is connected.</p>
        </div>
      </section>

      <section className="trust-section" id="how-it-works"><div className="section trust-inner"><div className="trust-copy"><div className="eyebrow light"><span /> THE RENTZY DIFFERENCE</div><h2>Moving should feel<br />like a <em>fresh start.</em></h2><p>Finding a place is a big decision. We're shaping a simpler way to explore options, understand the details and connect with property owners.</p><a href="#explore" className="light-link">Find your next place <ArrowRight size={16} /></a></div><div className="trust-points"><div className="trust-point"><span><ShieldCheck /></span><div><b>Details that matter</b><p>Clear property information to help you compare with confidence.</p></div></div><div className="trust-point"><span><Search /></span><div><b>Search made simpler</b><p>Explore by neighbourhood, property type and monthly budget.</p></div></div><div className="trust-point"><span><Users /></span><div><b>For owners and renters</b><p>A shared space to discover homes and showcase properties.</p></div></div></div></div></section>

      <section className="owner-section" id="owners"><div className="owner-banner"><div><div className="eyebrow"><span /> HAVE A SPACE TO SHARE?</div><h2>Good spaces deserve<br />good <em>people.</em></h2><p>Put your PG, apartment or house in front of people looking for a place to call home.</p></div><a href="mailto:hello@rentzy.in?subject=List%20my%20property%20on%20RENTZY" className="owner-cta">List your property <ArrowUpRight size={18} /></a><div className="owner-decoration"><House size={150} strokeWidth={0.65} /></div></div></section>

      <footer className="footer"><div className="footer-top"><div><a className="brand footer-brand" href="#">rentzy<span>.</span></a><p>Find your space. Feel at home.</p></div><div className="footer-links"><a href="#explore">Explore stays</a><a href="#how-it-works">How it works</a><a href="#owners">List a property</a><a href="mailto:hello@rentzy.in">Contact</a></div><a className="back-top" href="#">Back to top ↑</a></div><div className="footer-bottom"><span>© 2026 RENTZY. Made for finding your place.</span><span>PGs · Apartments · Houses</span></div></footer>
    </main>
  );
}
