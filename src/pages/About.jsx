
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Icon from '../components/Icon';
import { getArtwork } from '../data/artworks';
import { team } from '../data/siteData';
import './About.css';
import Paul from "../assets/Paul.jpg";
import Timi from "../assets/Timi.jpeg";
import Treasure from "../assets/Treasure.jpeg";
import James from "../assets/James.jpeg";
import Loius from "../assets/Loius.jpeg";
import Isreal from "../assets/Isreal.jpeg";

const teamPhotos = [Paul, Timi, Treasure, James, Loius, Isreal];

const problems = [
  ['Static presentation', 'Endless grids with no context or story.'],
  ['Poor personalisation', 'Everyone sees the same paintings, in the same order.'],
  ['Limited search', 'Keyword boxes that can’t understand “calm blue seascapes”.'],
  ['Hard to discover', 'No way to explore by style, palette or mood.'],
];

const solutions = [
  ['AI recommendations', 'Suggestions that learn from what you view and save.'],
  ['Natural-language search', 'Describe what you want, in your own words.'],
  ['Image recognition', 'Upload a photo to identify style, colours and category.'],
  ['An art assistant', 'Ask about artists, techniques and movements — anytime.'],
];

const topics = ['The collection', 'AI features', 'Partnerships', 'Press', 'Something else'];


function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}


function About() {
  // ---- Contact form state ----
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [topic, setTopic] = useState('AI features');
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  // Update one field of the form when the user types.
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Simple checks before "sending".
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.email.includes('@')) newErrors.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) newErrors.message = 'Please write at least 10 characters.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSent(true); // In a real app we would send the form to a server here.
    }
  }

  return (
    <PageLayout>
      {/* ---------- HERO ---------- */}
      <section className="container about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">About ArtMind</p>
          <h1 className="display">
            Where great art <span className="accent">meets intelligence.</span>
          </h1>
          <p className="lead">
            ArtMind AI turns a traditional online painting gallery into a personal, intelligent discovery experience — so
            anyone can find, understand and fall in love with fine art.
          </p>
          <div className="about-hero-buttons">
            <Link to="/explore" className="btn btn-dark">
              Explore the collection <Icon name="arrowRight" size={14} />
            </Link>
            <a href="#approach" className="link-arrow">
              Our approach <Icon name="arrowRight" size={14} />
            </a>
          </div>
        </div>
        <div className="about-hero-images">
          <img className="about-img-main" src={getArtwork('la-grande-jatte-oil-sketch').image} alt="Seurat, Oil Sketch for A Sunday on La Grande Jatte" />
          <img className="about-img-small" src={getArtwork('two-sisters-on-the-terrace').image} alt="Renoir, Two Sisters (On the Terrace)" />
        </div>
      </section>

      
      <div className="container">
        <div className="stats">
          <div>
            <strong>12,400</strong>
            <span>Paintings catalogued</span>
          </div>
          <div>
            <strong>2,100</strong>
            <span>Artists</span>
          </div>
          <div>
            <strong>6</strong>
            <span>Categories</span>
          </div>
          <div>
            <strong>24</strong>
            <span>Artistic styles</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Public-domain imagery</span>
          </div>
        </div>
      </div>

      {/* ---------- MISSION ---------- */}
      <section className="section mission">
        <div className="container">
          <p className="eyebrow mission-eyebrow">Our mission</p>
          <blockquote>“Great paintings should be easy to find — and even easier to understand.”</blockquote>
          <p className="muted">Every feature in ArtMind starts from that idea: less searching, more looking.</p>
        </div>
      </section>

      {/* ---------- PROBLEM & APPROACH ---------- */}
      <section className="section section-surface" id="approach">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Why we built it</p>
              <h2>
                Static galleries,
                <br />
                <span className="accent">meet smart discovery.</span>
              </h2>
            </div>
            <p>Most painting websites are digital catalogues: beautiful, but silent. We set out to make the gallery listen.</p>
          </div>
          <div className="grid-2">
            <div className="approach-card">
              <h4 className="approach-title">The problem</h4>
              {problems.map(([title, text]) => (
                <div className="approach-row" key={title}>
                  <span className="approach-icon">
                    <Icon name="close" size={13} />
                  </span>
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="approach-card approach-card-dark">
              <h4 className="approach-title">The ArtMind approach</h4>
              {solutions.map(([title, text]) => (
                <div className="approach-row" key={title}>
                  <span className="approach-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BEHIND THE PROJECT (team) ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Behind the project</p>
              <h2>
                Six people,
                <br />
                <span className="accent">one eProject.</span>
              </h2>
            </div>
            <div className="team-intro">
              <p>
                ArtMind AI was created by a team of six as an Aptech eProject on AI-integrated web development — designed in
                Figma and built as a React single-page app.
              </p>
              {/* Small project figures (as in the Figma design) */}
              <div className="team-figures">
                <div>
                  <strong>45</strong>
                  <span>Screens designed</span>
                </div>
                <div>
                  <strong>23</strong>
                  <span>Reusable components</span>
                </div>
                <div>
                  <strong>6</strong>
                  <span>Prototype flows</span>
                </div>
              </div>
            </div>
          </div>

          <div className="team-grid">
            {team.map((person, index) => (
              <div className="team-card" key={person.name || index}>
                <div className="team-photo">
                  {/* Initials sit behind the photo and show if the photo can't load */}
                  <span className="team-initials">{initials(person.name)}</span>
                  <img
                    src={teamPhotos[index]}
                    alt={person.name}
                    onError={(event) => (event.currentTarget.style.display = 'none')}
                  />

                  {/* Shown when you hover over the card */}
                  <div className="team-links">
                    <p>Connect</p>
                    <div>
                      <a href={person.github} target="_blank" rel="noreferrer" aria-label={`${person.name} on GitHub`}>
                        <span className="team-link-icon">
                          <Icon name="github" size={22} />
                        </span>
                      </a>
                      <a href={person.linkedin} target="_blank" rel="noreferrer" aria-label={`${person.name} on LinkedIn`}>
                        <span className="team-link-icon">
                          <Icon name="linkedin" size={20} />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-info">
                  <h3>{person.name}</h3>
                  <p className="muted small">{person.role}</p>
                  <p className="mono muted">{person.skills}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CREDITS ---------- */}
      <div className="container credits">
        <div className="credits-strip">
          {['water-lily-pond', 'the-adoration-of-the-magi', 'improvisation-no-30', 'bouquet-in-earthenware-vase', 'distant-view-of-niagara-falls', 'the-childs-bath'].map((id) => (
            <img key={id} src={getArtwork(id).image} alt={getArtwork(id).title} loading="lazy" />
          ))}
        </div>
        <p className="mono muted">
          Artwork images courtesy of the Art Institute of Chicago open-access collection (CC0). Titles, artists and dates
          are from the museum’s records.
        </p>
      </div>

      {/* ---------- CONTACT ---------- */}
      <section className="section">
        <div className="container contact">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2>
              Questions, ideas
              <br />
              <span className="accent">or collaborations?</span>
            </h2>
            <p className="muted contact-text">
              Write to us about the collection, the AI features, or partnering with ArtMind. We usually reply within two
              working days.
            </p>
            <ul className="contact-details">
              <li>
                <Icon name="mail" size={18} /> <span>Email</span> hello@artmind.ai
              </li>
              <li>
                <Icon name="phone" size={18} /> <span>Phone</span> +234 800 278 6463
              </li>
              <li>
                <Icon name="pin" size={18} /> <span>Studio</span> Lagos, Nigeria · remote worldwide
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {sent ? (
              <div className="contact-success">
                <Icon name="check" size={28} />
                <h3>Thank you, {form.name}!</h3>
                <p className="muted">Your message about “{topic}” has been sent. We’ll reply to {form.email} soon.</p>
              </div>
            ) : (
              <>
                <div className="grid-2">
                  <label className="field">
                    Full name
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </label>
                  <label className="field">
                    Email address
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </label>
                </div>
                <div className="field">
                  Topic
                  <div className="topic-chips">
                    {topics.map((item) => (
                      <button type="button" key={item} className={topic === item ? 'chip active' : 'chip'} onClick={() => setTopic(item)}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="field">
                  Message
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us a little about what you have in mind…" />
                  {errors.message && <span className="error">{errors.message}</span>}
                </label>
                <div className="contact-submit">
                  <span className="muted small">We’ll never share your details.</span>
                  <button type="submit" className="btn btn-dark">
                    Send message <Icon name="arrowRight" size={14} />
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </PageLayout>
  );
}

export default About;
