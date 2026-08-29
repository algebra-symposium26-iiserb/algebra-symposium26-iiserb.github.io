import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  BookOpen,
  Mail,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Users,
  Search
} from 'lucide-react';

// Reads the current page id from the URL hash (e.g. "#/schedule" -> "schedule").
function getTabFromHash() {
  const hash = window.location.hash || '';
  const cleaned = hash.replace(/^#\/?/, '');
  return cleaned === '' ? 'home' : cleaned;
}

export default function App() {
  const [activeTab, setActiveTabState] = useState(getTabFromHash());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Keep activeTab in sync if the user uses browser back/forward.
  useEffect(() => {
    const onHashChange = () => setActiveTabState(getTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Every time the page changes, scroll to the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const setActiveTab = useCallback((id) => {
    const path = id === 'home' ? '#/' : `#/${id}`;
    if (window.location.hash !== path) {
      window.location.hash = path;
    }
    setActiveTabState(id);
    window.scrollTo(0, 0);
  }, []);

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'abstracts', label: 'Abstracts' },
    { id: 'contact', label: 'Contact' },
  ];

  const scheduleData = [
    {
      date: 'Day 1 — September 17, 2026',
      events: [
        { time: '09:00 – 09:30', title: 'Inauguration & Welcome Address', speaker: 'TBA', venue: 'Auditorium Hall A' },
        { time: '09:30 – 10:30', title: 'Keynote Talk 1: Modern Perspectives in Commutative Algebra', speaker: 'TBA', venue: 'Auditorium Hall A' },
        { time: '10:30 – 11:00', title: 'High Tea & Networking', speaker: '', venue: 'Foyer' },
        { time: '11:00 – 12:00', title: 'Invited Lecture: Homological Methods & Derived Categories', speaker: 'TBA', venue: 'Auditorium Hall A' },
        { time: '12:00 – 13:00', title: 'Contributed Research Talks (Session I)', speaker: 'TBA', venue: 'Seminar Hall 1 & 2' },
        { time: '13:00 – 14:30', title: 'Lunch Break', speaker: '', venue: 'Dining Hall' },
        { time: '14:30 – 15:30', title: 'Plenary Lecture: Geometric Invariant Theory & Moduli', speaker: 'TBA', venue: 'Auditorium Hall A' },
        { time: '15:30 – 17:00', title: 'Poster Session & Discussion', speaker: '', venue: 'Math Concourse' },
      ],
    },
    {
      date: 'Day 2 — September 18, 2026',
      events: [
        { time: '09:30 – 10:30', title: 'Plenary Lecture: TBA', speaker: 'TBA', venue: 'Auditorium Hall A' },
        { time: '10:30 – 11:00', title: 'Morning Tea', speaker: '', venue: 'Foyer' },
        { time: '11:00 – 12:30', title: 'Contributed Research Talks (Session II)', speaker: 'TBA', venue: 'Seminar Hall 1 & 2' },
        { time: '12:30 – 14:00', title: 'Lunch Break', speaker: '', venue: 'Dining Hall' },
        { time: '14:00 – 15:00', title: 'Special Session on Category Theory & Applications', speaker: 'TBA', venue: 'Auditorium Hall A' },
        { time: '15:00 – 16:00', title: 'Concluding Remarks & Valedictory Session', speaker: 'TBA', venue: 'Auditorium Hall A' },
      ],
    },
  ];

  const abstractsData = [];

  const filteredAbstracts = abstractsData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: '#FAF9F6',
        color: '#2B2B2E',
        fontFamily: "'Source Serif 4', 'Georgia', serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Sans+3:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        html {
          scroll-behavior: smooth;
        }

        * {
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .fade-in-1 { animation-delay: 0.05s; }
        .fade-in-2 { animation-delay: 0.15s; }
        .fade-in-3 { animation-delay: 0.25s; }
        .fade-in-4 { animation-delay: 0.35s; }

        .stagger-card {
          animation: fadeSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .link-hover {
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), color 0.28s ease;
          display: inline-block;
        }
        .link-hover:hover {
          transform: translateY(-2px);
          color: #B23A48 !important;
        }
        .nav-link {
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), color 0.28s ease, background-color 0.28s ease;
        }
        .nav-link:hover {
          transform: translateY(-1px);
          color: #B23A48 !important;
        }
        .soft-card {
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.32s ease, border-color 0.32s ease;
        }
        .soft-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -12px rgba(43, 58, 90, 0.18);
          border-color: #C9C4B4 !important;
        }
        .cta-button {
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease, background-color 0.28s ease;
        }
        .cta-button:hover {
          transform: translateY(-2px) scale(1.015);
          box-shadow: 0 10px 24px -10px rgba(30, 42, 68, 0.35);
        }
        .sans {
          font-family: 'Source Sans 3', 'Helvetica Neue', sans-serif;
        }
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

      {/* Navigation Bar */}
      <header
        className="sticky top-0 z-50 sans"
        style={{
          background: 'rgba(250, 249, 246, 0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #DCD8CC',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <div
                className="h-9 w-9 rounded-md flex items-center justify-center"
                style={{ background: '#2A3A5C' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="5" cy="5" r="2.1" fill="#FAF9F6" />
                  <circle cx="19" cy="5" r="2.1" fill="#FAF9F6" />
                  <circle cx="5" cy="19" r="2.1" fill="#FAF9F6" />
                  <circle cx="19" cy="19" r="2.1" fill="#FAF9F6" />
                  <path d="M7 5H17" stroke="#FAF9F6" strokeWidth="1.4" markerEnd="url(#arrow)" />
                  <path d="M5 7V17" stroke="#FAF9F6" strokeWidth="1.4" markerEnd="url(#arrow)" />
                  <path d="M19 7V17" stroke="#FAF9F6" strokeWidth="1.4" markerEnd="url(#arrow)" />
                  <path d="M7 19H17" stroke="#FAF9F6" strokeWidth="1.4" markerEnd="url(#arrow)" />
                  <defs>
                    <marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2" orient="auto">
                      <path d="M0,0 L4,2 L0,4 Z" fill="#FAF9F6" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <div>
                <span className="text-lg font-semibold tracking-tight" style={{ color: '#2B2B2E' }}>
                  Algebra Symposium 2026
                </span>
                <span className="block text-xs mono" style={{ color: '#8A8577' }}>IISER Bhopal</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="nav-link px-4 py-2 rounded-md text-sm font-medium"
                  style={{
                    color: activeTab === item.id ? '#2A3A5C' : '#5C5A52',
                    background: activeTab === item.id ? '#EFEBE0' : 'transparent',
                    border: activeTab === item.id ? '1px solid #D8D2C0' : '1px solid transparent',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md focus:outline-none"
                style={{ color: '#5C5A52' }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            className="md:hidden px-4 pt-2 pb-4 space-y-1"
            style={{ background: '#FAF9F6', borderBottom: '1px solid #DCD8CC' }}
          >
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className="nav-link block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                style={{
                  color: activeTab === item.id ? '#2A3A5C' : '#5C5A52',
                  background: activeTab === item.id ? '#EFEBE0' : 'transparent',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* ==================== HOME / LANDING PAGE ==================== */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section
              className="relative overflow-hidden py-24 md:py-32"
              style={{ borderBottom: '1px solid #DCD8CC' }}
            >
              <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div
                  className="fade-in fade-in-1 inline-flex items-center space-x-2 px-3 py-1 rounded-full sans text-xs sm:text-sm font-medium mb-6"
                  style={{ border: '1px solid #C7BFA6', background: '#F1EDE0', color: '#6B5F3E' }}
                >
                  <span className="mono">§</span>
                  <span>Annual National Mathematics Conference</span>
                </div>

                <h1 className="fade-in fade-in-2 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ color: '#2B2B2E' }}>
                  Algebra Symposium <br />
                  <span style={{ color: '#2A3A5C' }}>IISER Bhopal 2026</span>
                </h1>

                <p className="fade-in fade-in-3 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed" style={{ color: '#5C5A52' }}>
                  Bringing together researchers, academicians, and students from across the country to discuss cutting-edge frontiers in Commutative Algebra, Algebraic Geometry, Representation Theory, and Homological Methods.
                </p>

                {/* Event Highlights Badges */}
                <div className="fade-in fade-in-4 flex flex-wrap items-center justify-center gap-4 text-sm font-medium mb-10 sans">
                  <div
                    className="soft-card flex items-center space-x-2 px-4 py-2 rounded-lg"
                    style={{ background: '#FFFFFF', border: '1px solid #DCD8CC', color: '#3F3D38' }}
                  >
                    <Calendar size={18} style={{ color: '#2A3A5C' }} />
                    <span>September 17–18, 2026</span>
                  </div>
                  <div
                    className="soft-card flex items-center space-x-2 px-4 py-2 rounded-lg"
                    style={{ background: '#FFFFFF', border: '1px solid #DCD8CC', color: '#3F3D38' }}
                  >
                    <MapPin size={18} style={{ color: '#8C5A5A' }} />
                    <span>IISER Bhopal, Madhya Pradesh, India</span>
                  </div>
                </div>

                <div className="fade-in fade-in-4 flex flex-col sm:flex-row justify-center items-center gap-4 sans">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="cta-button w-full sm:w-auto px-7 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                    style={{ background: '#2A3A5C', color: '#FAF9F6' }}
                  >
                    <span>View Schedule</span>
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => setActiveTab('abstracts')}
                    className="cta-button w-full sm:w-auto px-7 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                    style={{ background: '#FFFFFF', color: '#3F3D38', border: '1px solid #C9C4B4' }}
                  >
                    <BookOpen size={18} />
                    <span>Talk Abstracts</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Focus Themes */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-center" style={{ color: '#2B2B2E' }}>
                Thematic Areas
              </h2>
              <p className="text-center mb-12 max-w-xl mx-auto sans" style={{ color: '#6B6A5F' }}>
                Key focus branches explored across plenary talks, invited sessions, and contributed research papers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Commutative Algebra', desc: 'Syzygies, free resolutions, local cohomology, Cohen-Macaulay rings, and combinatorial methods.' },
                  { title: 'Algebraic Geometry', desc: 'Moduli spaces, projective varieties, intersection theory, and derived algebraic geometry.' },
                  { title: 'Representation Theory', desc: 'Lie algebras, quantum groups, quiver representations, and modular representation theory.' },
                  { title: 'Homological & Category Theory', desc: 'Derived categories, triangulated categories, model categories, and operads.' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="soft-card stagger-card p-6 rounded-lg"
                    style={{ background: '#FFFFFF', border: '1px solid #DCD8CC', animationDelay: `${0.1 + idx * 0.08}s` }}
                  >
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center font-bold mb-4 mono"
                      style={{ background: '#EFEBE0', color: '#2A3A5C' }}
                    >
                      §{idx + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#2B2B2E' }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed sans" style={{ color: '#6B6A5F' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== ABOUT US ==================== */}
        {activeTab === 'about' && (
          <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2B2B2E' }}>About the Symposium</h1>
            <p className="font-medium mb-8 sans" style={{ color: '#2A3A5C' }}>Department of Mathematics, IISER Bhopal</p>

            <div className="space-y-6 leading-relaxed" style={{ color: '#3F3D38' }}>
              <div className="p-6 sm:p-8 rounded-lg" style={{ background: '#FFFFFF', border: '1px solid #DCD8CC' }}>
                <h2 className="text-xl font-semibold mb-3" style={{ color: '#2B2B2E' }}>Overview & Vision</h2>
                <p className="mb-4">
                  The <strong>Algebra Symposium 2026</strong> is organized by the Department of Mathematics at the Indian Institute of Science Education and Research (IISER) Bhopal. Scheduled from <strong>September 17 to September 18, 2026</strong>, the symposium aims to create a dynamic collaborative environment for researchers, faculty members, postdocs, and students specializing in pure algebra and related geometric and topological disciplines.
                </p>
                <p>
                  The two-day conference features pedagogical keynote addresses, specialized research presentations, and poster sessions to facilitate academic exchange and foster potential inter-institutional collaborations.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-lg" style={{ background: '#FFFFFF', border: '1px solid #DCD8CC' }}>
                <h2 className="text-xl font-semibold mb-3" style={{ color: '#2B2B2E' }}>About IISER Bhopal</h2>
                <p>
                  Established in 2008 by the Ministry of Education, Government of India, IISER Bhopal is dedicated to fostering the highest quality of scientific research and education. The Department of Mathematics at IISER Bhopal actively engages in research spanning diverse pure and applied disciplines, including Algebra, Number Theory, Geometry, Topology, and Analysis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 sans">
                <div className="p-5 rounded-lg" style={{ background: '#F5F3EC', border: '1px solid #DCD8CC' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#2B2B2E' }}>Venue</h3>
                  <p className="text-sm" style={{ color: '#6B6A5F' }}>
                    Main Auditorium & Lecture Hall Complex,<br />
                    IISER Bhopal Campus, Bhauri,<br />
                    Bhopal 462066, Madhya Pradesh, India
                  </p>
                </div>
                <div className="p-5 rounded-lg" style={{ background: '#F5F3EC', border: '1px solid #DCD8CC' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#2B2B2E' }}>Dates</h3>
                  <p className="text-sm" style={{ color: '#6B6A5F' }}>
                    Thursday, September 17, 2026<br />
                    Friday, September 18, 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCHEDULE ==================== */}
        {activeTab === 'schedule' && (
          <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#2B2B2E' }}>Symposium Schedule</h1>
              <p className="sans" style={{ color: '#6B6A5F' }}>Schedule of technical talks, keynotes, and poster sessions (September 17–18, 2026).</p>
            </div>

            <div className="space-y-12">
              {scheduleData.map((day, idx) => (
                <div key={idx} className="stagger-card rounded-lg overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCD8CC', animationDelay: `${idx * 0.1}s` }}>
                  <div className="px-6 py-4" style={{ background: '#EFEBE0', borderBottom: '1px solid #DCD8CC' }}>
                    <h2 className="text-xl font-semibold" style={{ color: '#2A3A5C' }}>{day.date}</h2>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#E7E3D6' }}>
                    {day.events.map((event, eventIdx) => (
                      <div
                        key={eventIdx}
                        className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        style={{ borderBottom: '1px solid #EDEAE0' }}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className="flex items-center space-x-1.5 text-xs font-semibold mono px-2.5 py-1 rounded-md whitespace-nowrap"
                            style={{ color: '#2A3A5C', background: '#EFEBE0', border: '1px solid #D8D2C0' }}
                          >
                            <Clock size={13} />
                            <span>{event.time}</span>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold" style={{ color: '#2B2B2E' }}>{event.title}</h3>
                            {event.speaker && (
                              <p className="text-sm mt-0.5 sans" style={{ color: '#8A8577' }}>{event.speaker}</p>
                            )}
                          </div>
                        </div>
                        <div
                          className="text-xs mono px-3 py-1 rounded-full self-start sm:self-center"
                          style={{ background: '#F5F3EC', color: '#6B6A5F', border: '1px solid #E7E3D6' }}
                        >
                          {event.venue}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== ABSTRACTS ==================== */}
        {activeTab === 'abstracts' && (
          <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#2B2B2E' }}>Talk Abstracts</h1>
                <p className="sans" style={{ color: '#6B6A5F' }}>Discover titles and summaries for plenary and invited talks.</p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72 sans">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: '#8A8577' }} />
                <input
                  type="text"
                  placeholder="Search abstracts or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none transition-colors"
                  style={{ background: '#FFFFFF', border: '1px solid #DCD8CC', color: '#2B2B2E' }}
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredAbstracts.length > 0 ? (
                filteredAbstracts.map((item, idx) => (
                  <div key={item.id} className="soft-card stagger-card p-6 rounded-lg" style={{ background: '#FFFFFF', border: '1px solid #DCD8CC', animationDelay: `${idx * 0.07}s` }}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sans">
                      <span
                        className="text-xs font-medium mono px-2.5 py-0.5 rounded"
                        style={{ color: '#2A3A5C', background: '#EFEBE0', border: '1px solid #D8D2C0' }}
                      >
                        {item.topic}
                      </span>
                      <span className="text-xs font-medium" style={{ color: '#8A8577' }}>{item.institution}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-1" style={{ color: '#2B2B2E' }}>{item.title}</h2>
                    <p className="text-sm font-semibold mb-3 sans" style={{ color: '#5C5A52' }}>{item.speaker}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B6A5F' }}>{item.abstract}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 rounded-lg sans" style={{ background: '#F5F3EC', border: '1px solid #DCD8CC' }}>
                  <p style={{ color: '#8A8577' }}>No abstracts match your query.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== CONTACT ==================== */}
        {activeTab === 'contact' && (
          <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#2B2B2E' }}>Contact & Venue</h1>
            <p className="mb-10 sans" style={{ color: '#6B6A5F' }}>Get in touch with the symposium organizing committee.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sans">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="soft-card p-6 rounded-lg" style={{ background: '#FFFFFF', border: '1px solid #DCD8CC' }}>
                  <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2" style={{ color: '#2B2B2E' }}>
                    <Mail size={20} style={{ color: '#2A3A5C' }} />
                    <span>Correspondence</span>
                  </h2>
                  <div className="space-y-3 text-sm" style={{ color: '#3F3D38' }}>
                    <p>
                      <strong>Department Website:</strong>{' '}
                      <a
                        href="https://maths.iiserb.ac.in"
                        target="_blank"
                        rel="noreferrer"
                        className="link-hover inline-flex items-center space-x-1"
                        style={{ color: '#2A3A5C' }}
                      >
                        <span>maths.iiserb.ac.in</span>
                        <ExternalLink size={12} />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="soft-card p-6 rounded-lg" style={{ background: '#FFFFFF', border: '1px solid #DCD8CC' }}>
                  <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2" style={{ color: '#2B2B2E' }}>
                    <Users size={20} style={{ color: '#2A3A5C' }} />
                    <span>Organizing Committee</span>
                  </h2>
                  <ul className="space-y-2 text-sm" style={{ color: '#3F3D38' }}>
                    <li>• Department of Mathematics, IISER Bhopal</li>
                    <li>• Faculty Coordinators & Organizing Team</li>
                    <li>• Student Volunteers & Support Staff</li>
                  </ul>
                </div>
              </div>

              {/* Location & Travel */}
              <div className="soft-card p-6 rounded-lg flex flex-col justify-between" style={{ background: '#FFFFFF', border: '1px solid #DCD8CC' }}>
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2" style={{ color: '#2B2B2E' }}>
                    <MapPin size={20} style={{ color: '#8C5A5A' }} />
                    <span>Getting to Campus</span>
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#3F3D38' }}>
                    <strong>Address:</strong><br />
                    Indian Institute of Science Education and Research Bhopal<br />
                    Bhopal Bypass Road, Bhauri,<br />
                    Bhopal 462066, Madhya Pradesh, India
                  </p>
                  <div className="space-y-2 text-xs" style={{ color: '#6B6A5F' }}>
                    <p>• <strong>By Air:</strong> Raja Bhoj Airport (BHO) is ~10 km from campus.</p>
                    <p>• <strong>By Train:</strong> Bhopal Junction (BPL) & Rani Kamlapati (RKMP) stations have regular connections.</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 text-xs mono" style={{ borderTop: '1px solid #E7E3D6', color: '#8A8577' }}>
                  GPS Coordinates: 23.286845° N, 77.275766° E
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="sans" style={{ borderTop: '1px solid #DCD8CC', background: '#F5F3EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: '#8A8577' }}>
          <div>
            © 2026 Algebra Symposium | Department of Mathematics, IISER Bhopal.
          </div>
          <div className="flex items-center space-x-4">
            <span>September 17–18, 2026</span>
            <span>•</span>
            <span>IISER Bhopal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
