import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Search, Zap, AlignLeft, 
  Clock, CheckSquare, UserPlus, Star, PenTool,
  Image, Video, Music, Code
} from 'lucide-react';
import '../styles/landing.css';

const Landing = () => {
  const cards = [
    {
      icon: <FileText size={24} color="#3b82f6" />,
      iconBg: '#eff6ff',
      title: 'Html Tone Analyzer',
      description: 'Leges saepius fau tione goeinet exclivec o fnorilas oute gmdc coalcanet.',
    },
    {
      icon: <Search size={24} color="#10b981" />,
      iconBg: '#ecfdf5',
      title: 'Seo Analyzer Optimizer',
      description: 'Eoroceneat moaere alnme actiones slccline corlioelite gdsione sondsrears.',
    },
    {
      icon: <Zap size={24} color="#8b5cf6" />,
      iconBg: '#f5f3ff',
      title: 'Content Optimizer',
      description: 'Boes tege toes in edeat angpete drese oit urlosint osi fouacing cosavendt.',
    },
    {
      icon: <AlignLeft size={24} color="#f59e0b" />,
      iconBg: '#fffbeb',
      title: 'Word Counter',
      description: 'Leaes beanis clus slaedge ohrnies tonignetfeone taloles couts uufis policon',
    },
    {
      icon: <Clock size={24} color="#ef4444" />,
      iconBg: '#fef2f2',
      title: 'Read Time Calculator',
      description: 'Lesree toobe tonns ihotcont onoher ginolondetiner hlem andnss sscoa hisetttec.',
    },
    {
      icon: <CheckSquare size={24} color="#14b8a6" />,
      iconBg: '#f0fdfa',
      title: 'Grammar Checker',
      description: 'Loficeis coliciw tauin t stcots gniis ociict.icta nm tiurat gnais oncluot.',
    },
    {
      icon: <UserPlus size={24} color="#ec4899" />,
      iconBg: '#fdf2f8',
      title: 'Audience Analyzer',
      description: 'Esobessocnst clis oleacte onotiutor tiori uilicadricturt andobit ealo loeolceolod.',
    },
    {
      icon: <Star size={24} color="#8b5cf6" />,
      iconBg: '#f5f3ff',
      title: 'Keyword Extractor',
      description: 'Loccet loonies t che riutaest oclüicte toibrtiridolisriclote prisoneoch yolbirehioud.',
    },
    {
      icon: <Image size={24} color="#06b6d4" />,
      iconBg: '#ecfeff',
      title: 'Image Optimizer',
      description: 'Eocones econolies deeliu.tem ent rmiusojoor tidr eoituslot guides cuikt potticoeet.',
    },
    {
      icon: <Video size={24} color="#10b981" />,
      iconBg: '#ecfdf5',
      title: 'Video Compressor',
      description: 'Iinear irotarmos eaoteon peir aoolingon dclloonie aust gifts oidcaheect.',
    },
    {
      icon: <Music size={24} color="#f43f5e" />,
      iconBg: '#fff1f2',
      title: 'Audio Enhancer',
      description: 'oalceoa foectieere biotrion piatleec onolioaobidec giatstrets md iulids tueton.',
    },
    {
      icon: <Code size={24} color="#ef4444" />,
      iconBg: '#fef2f2',
      title: 'Code Formatter',
      description: 'oataeoocereno tefot.odocity onexon emaolrise oesitedeur croroctieng cler nolcsh.',
    }
  ];

  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Navbar */}
        <nav className="landing-navbar">
          <div className="navbar-logo">Logo</div>
          <div className="navbar-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#support">Support</a>
          </div>
          <div className="navbar-actions">
            <Link to="/signup" className="btn-signup">Sign up</Link>
          </div>
        </nav>

        {/* Grid */}
        <div className="features-grid">
          {cards.map((card, index) => (
            <div className="feature-card" key={index}>
              <div className="card-header">
                <div className="icon-wrapper" style={{ backgroundColor: card.iconBg }}>
                  {card.icon}
                </div>
                <div className="action-icon">
                  <PenTool size={14} />
                </div>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button className="btn-learn-more">Learn more</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
