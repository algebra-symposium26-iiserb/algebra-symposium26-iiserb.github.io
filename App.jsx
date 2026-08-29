import React, { useState } from 'react';
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
  Sparkles,
  Users,
  Search
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'abstracts', label: 'Abstracts' },
    { id: 'contact', label: 'Contact' },
  ];

  const scheduleData = [
    {
      date: 'Day 1: September 17, 2026',
      events: [
        { time: '09:00 - 09:30', title: 'Inauguration & Welcome Address', speaker: 'Department of Mathematics', venue: 'Auditorium Hall A' },
        { time: '09:30 - 10:30', title: 'Keynote Talk 1: Modern Perspectives in Commutative Algebra', speaker: 'Invited Keynote Speaker', venue: 'Auditorium Hall A' },
        { time: '10:30 - 11:00', title: 'High Tea & Networking', speaker: '', venue: 'Foyer' },
        { time: '11:00 - 12:00', title: 'Invited Lecture: Homological Methods & Derived Categories', speaker: 'Speaker TBD', venue: 'Auditorium Hall A' },
        { time: '12:00 - 13:00', title: 'Contributed Research Talks (Session I)', speaker: 'Multiple Presenters', venue: 'Seminar Hall 1 & 2' },
        { time: '13:00 - 14:30', title: 'Lunch Break', speaker: '', venue: 'Dining Hall' },
        { time: '14:30 - 15:30', title: 'Plenary Lecture: Geometric Invariant Theory & Moduli', speaker: 'Invited Speaker', venue: 'Auditorium Hall A' },
        { time: '15:30 - 17:00', title: 'Poster Session & Discussion', speaker: '', venue: 'Math Concourse' },
      ],
    },
    {
      date: 'Day 2: September 18, 2026',
      events: [
        { time: '09:30 - 10:30', title: 'Plenary Lecture: Structure Theory of Algebraic Groups', speaker: 'Invited Speaker', venue: 'Auditorium Hall A' },
        { time: '10:30 - 11:00', title: 'Morning Tea', speaker: '', venue: 'Foyer' },
        { time: '11:00 - 12:30', title: 'Contributed Research Talks (Session II)', speaker: 'Multiple Presenters', venue: 'Seminar Hall 1 & 2' },
        { time: '12:30 - 14:00', title: 'Lunch Break', speaker: '', venue: 'Dining Hall' },
        { time: '14:00 - 15:00', title: 'Special Session on Category Theory & Applications', speaker: 'Invited Panelists', venue: 'Auditorium Hall A' },
        { time: '15:00 - 16:00', title: 'Concluding Remarks & Valedictory Session', speaker: 'Organizing Committee', venue: 'Auditorium Hall A' },
      ],
    },
  ];

  const abstractsData = [
    {
      id: 1,
      title: 'Syzygies and Free Resolutions over Commutative Rings',
      speaker: 'Prof. Alex Mercer',
      institution: 'IISc Bangalore',
      topic: 'Commutative Algebra',
      abstract: 'We review classical results on minimal free resolutions and explore recent developments concerning asymptotic behaviors of Betti numbers, Boij-Söderberg theory, and cohomology modules.',
    },
    {
      id: 2,
      title: 'Derived Categories in Algebraic Geometry and Representation Theory',
      speaker: 'Dr. Evelyn Vance',
      institution: 'TIFR Mumbai',
      topic: 'Homological Algebra',
      abstract: 'An exploration into how triangulated and derived categories bridge geometric properties of algebraic varieties with modular representations of finite and reductive groups.',
    },
    {
      id: 3,
      title: 'Invariant Theory and Moduli Spaces of Vector Bundles',
      speaker: 'Prof. R. Sundaram',
      institution: 'CMI Chennai',
      topic: 'Algebraic Geometry',
      abstract: 'This talk presents recent constructions of moduli spaces using geometric invariant theory (GIT) stability criteria, with a focus on higher rank bundles over curves and surfaces.',
    },
    {
      id: 4,
      title: 'Model Categories and Higher Algebraical Structures',
      speaker: 'Dr. Sarah Lin',
      institution: 'IISER Pune',
      topic: 'Homotopical Algebra',
      abstract: 'We discuss Quillen model categories, simplicial structures, and how modern infinity-category frameworks simplify traditional computations in abstract homotopy theory.',
    },
  ];

  const filteredAbstracts = abstractsData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-mono font-bold text-lg text-white shadow-lg shadow-indigo-500/30">
                ⨂
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-violet-300 to-white bg-clip-text text-transparent">
                  Algebra Symposium 2026
                </span>
                <span className="block text-xs text-slate-400 font-mono">IISER Bhopal</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    activeTab === item.id
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === item.id
                    ? 'bg-indigo-600/30 text-indigo-400'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
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
            <section className="relative overflow-hidden py-24 md:py-32 bg-grid-pattern border-b border-slate-800/80">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950 pointer-events-none" />
              
              <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-6">
                  <Sparkles size={14} />
                  <span>Annual National Mathematics Conference</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
                  Algebra Symposium <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                    IISER Bhopal 2026
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
                  Bringing together researchers, academicians, and students from across the country to discuss cutting-edge frontiers in Commutative Algebra, Algebraic Geometry, Representation Theory, and Homological Methods.
                </p>

                {/* Event Highlights Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 font-medium mb-10">
                  <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl">
                    <Calendar className="text-indigo-400" size={18} />
                    <span>September 17–18, 2026</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl">
                    <MapPin className="text-rose-400" size={18} />
                    <span>IISER Bhopal, Madhya Pradesh, India</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
                  >
                    <span>View Schedule</span>
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => setActiveTab('abstracts')}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <BookOpen size={18} />
                    <span>Talk Abstracts</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Focus Themes */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 text-center">
                Thematic Areas
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
                Key focus branches explored across plenary talks, invited sessions, and contributed research papers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Commutative Algebra', desc: 'Syzygies, free resolutions, local cohomology, Cohen-Macaulay rings, and combinatorial methods.' },
                  { title: 'Algebraic Geometry', desc: 'Moduli spaces, projective varieties, intersection theory, and derived algebraic geometry.' },
                  { title: 'Representation Theory', desc: 'Lie algebras, quantum groups, quiver representations, and modular representation theory.' },
                  { title: 'Homological & Category Theory', desc: 'Derived categories, triangulated categories, model categories, and operads.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600/10 text-indigo-400 flex items-center justify-center font-bold mb-4 font-mono">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== ABOUT US ==================== */}
        {activeTab === 'about' && (
          <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">About the Symposium</h1>
            <p className="text-indigo-400 font-medium mb-8">Department of Mathematics, IISER Bhopal</p>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <div className="bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
                <h2 className="text-xl font-semibold text-white mb-3">Overview & Vision</h2>
                <p className="mb-4">
                  The <strong>Algebra Symposium 2026</strong> is organized by the Department of Mathematics at the Indian Institute of Science Education and Research (IISER) Bhopal. Scheduled from <strong>September 17 to September 18, 2026</strong>, the symposium aims to create a dynamic collaborative environment for researchers, faculty members, postdocs, and students specializing in pure algebra and related geometric and topological disciplines.
                </p>
                <p>
                  The two-day conference features pedagogical keynote addresses, specialized research presentations, and poster sessions to facilitate academic exchange and foster potential inter-institutional collaborations.
                </p>
              </div>

              <div className="bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
                <h2 className="text-xl font-semibold text-white mb-3">About IISER Bhopal</h2>
                <p>
                  Established in 2008 by the Ministry of Education, Government of India, IISER Bhopal is dedicated to fostering the highest quality of scientific research and education. The Department of Mathematics at IISER Bhopal actively engages in research spanning diverse pure and applied disciplines, including Algebra, Number Theory, Geometry, Topology, and Analysis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                  <h3 className="text-white font-semibold mb-2">Venue</h3>
                  <p className="text-sm text-slate-400">
                    Main Auditorium & Lecture Hall Complex,<br />
                    IISER Bhopal Campus, Bhauri,<br />
                    Bhopal 462066, Madhya Pradesh, India
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                  <h3 className="text-white font-semibold mb-2">Dates</h3>
                  <p className="text-sm text-slate-400">
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
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Symposium Schedule</h1>
              <p className="text-slate-400">Schedule of technical talks, keynotes, and poster sessions (September 17–18, 2026).</p>
            </div>

            <div className="space-y-12">
              {scheduleData.map((day, idx) => (
                <div key={idx} className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-indigo-950/60 px-6 py-4 border-b border-indigo-900/50">
                    <h2 className="text-xl font-bold text-indigo-200">{day.date}</h2>
                  </div>
                  <div className="divide-y divide-slate-800/80">
                    {day.events.map((event, eventIdx) => (
                      <div key={eventIdx} className="p-5 sm:p-6 hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/60 whitespace-nowrap">
                            <Clock size={13} />
                            <span>{event.time}</span>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-white">{event.title}</h3>
                            {event.speaker && (
                              <p className="text-sm text-slate-400 mt-0.5">{event.speaker}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 font-mono bg-slate-800/80 px-3 py-1 rounded-full self-start sm:self-center">
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
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Talk Abstracts</h1>
                <p className="text-slate-400">Discover titles and summaries for plenary and invited talks.</p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search abstracts or speakers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredAbstracts.length > 0 ? (
                filteredAbstracts.map((item) => (
                  <div key={item.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-medium text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-800/50">
                        {item.topic}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{item.institution}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1">{item.title}</h2>
                    <p className="text-sm font-semibold text-slate-300 mb-3">{item.speaker}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.abstract}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
                  <p className="text-slate-400">No abstracts match your query.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== CONTACT ==================== */}
        {activeTab === 'contact' && (
          <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Contact & Venue</h1>
            <p className="text-slate-400 mb-10">Get in touch with the symposium organizing committee.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Mail className="text-indigo-400" size={20} />
                    <span>Correspondence</span>
                  </h2>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:algebra2026@iiserb.ac.in" className="text-indigo-400 hover:underline">
                        algebra2026@iiserb.ac.in
                      </a>
                    </p>
                    <p>
                      <strong>Department Website:</strong>{' '}
                      <a href="https://maths.iiserb.ac.in" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center space-x-1">
                        <span>maths.iiserb.ac.in</span>
                        <ExternalLink size={12} />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Users className="text-indigo-400" size={20} />
                    <span>Organizing Committee</span>
                  </h2>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Department of Mathematics, IISER Bhopal</li>
                    <li>• Faculty Coordinators & Organizing Team</li>
                    <li>• Student Volunteers & Support Staff</li>
                  </ul>
                </div>
              </div>

              {/* Location & Travel */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <MapPin className="text-rose-400" size={20} />
                    <span>How to Reach IISER Bhopal</span>
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    <strong>Address:</strong><br />
                    Indian Institute of Science Education and Research Bhopal<br />
                    Bhopal Bypass Road, Bhauri,<br />
                    Bhopal 462066, Madhya Pradesh, India
                  </p>
                  <div className="space-y-2 text-xs text-slate-400">
                    <p>• <strong>By Air:</strong> Raja Bhoj Airport (BHO) is ~10 km from campus.</p>
                    <p>• <strong>By Train:</strong> Bhopal Junction (BPL) & Rani Kamlapati (RKMP) stations have regular connections.</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500 font-mono">
                  GPS Coordinates: 23.2842° N, 77.2773° E
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
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
