// ------------------------------------------------------------
// AI Analytics & Insights — /analytics
// Simple charts made only with HTML + CSS (no chart library).
// All numbers here are SAMPLE DATA for the design.
// ------------------------------------------------------------
import { Fragment } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Icon from '../components/Icon';
import { getArtwork, imageUrl } from '../data/artworks';
import { categories } from '../data/siteData';
import './Dashboard.css';
import './Analytics.css';

const popularCategories = [
  { name: 'Landscape', percent: 31 },
  { name: 'Figurative', percent: 22 },
  { name: 'Nature', percent: 18 },
  { name: 'Abstract', percent: 13 },
  { name: 'Religious', percent: 9 },
  { name: 'Flower', percent: 7 },
];

const trendingStyles = [
  { name: 'Impressionism', change: '+18%' },
  { name: 'Expressionism', change: '+9%' },
  { name: 'Hudson River School', change: '+6%' },
  { name: 'Early Renaissance', change: '+4%' },
];

// Activity per day and time (0 = none, 1 = a lot) for the heat map.
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const times = ['Morning', 'Afternoon', 'Evening', 'Night'];
const activity = [
  [0.1, 0.2, 0.4, 0.2],
  [0.1, 0.3, 0.5, 0.3],
  [0.2, 0.2, 0.6, 0.4],
  [0.1, 0.4, 0.7, 0.3],
  [0.2, 0.3, 0.5, 0.6],
  [0.5, 0.7, 0.4, 0.8],
  [0.6, 0.8, 0.5, 0.9],
];

function Analytics() {
  return (
    <DashboardLayout>
      <div className="welcome">
        <div>
          <h1>Insights</h1>
          <p className="muted">How you and the ArtMind community explore art. Sample data for design purposes.</p>
        </div>
      </div>

      <div className="kpis">
        {[
          ['146', 'Paintings viewed', '+22% vs. last month'],
          ['24', 'Saved to favorites', '8 from AI picks'],
          ['Impressionism', 'Top style', '38% of viewing time'],
          ['Landscape', 'Most explored', 'Up from Nature'],
        ].map(([value, label, note]) => (
          <div key={label} className="kpi">
            <span className="mono muted">{label}</span>
            <strong>{value}</strong>
            <span className="muted small">{note}</span>
          </div>
        ))}
      </div>

      <div className="charts">
        <section className="chart-card">
          <h4>Popular painting categories</h4>
          <p className="muted small">Community views, last 30 days</p>
          {popularCategories.map((item, index) => (
            <div key={item.name} className="hbar">
              <span className="hbar-name">{item.name}</span>
              <div className="hbar-track">
                <span className={index === 0 ? 'top' : ''} style={{ width: item.percent * 3 + '%' }} />
              </div>
              <span className="mono">{item.percent}%</span>
            </div>
          ))}
        </section>

        <section className="chart-card">
          <h4>Trending artistic styles</h4>
          <p className="muted small">Change in searches this week</p>
          {trendingStyles.map((style) => (
            <div key={style.name} className="trend-row">
              <span>{style.name}</span>
              <span className="trend-change">
                <Icon name="arrowUpRight" size={14} /> {style.change}
              </span>
            </div>
          ))}
        </section>
      </div>

      <div className="charts">
        <section className="chart-card">
          <h4>Your interest patterns</h4>
          <p className="muted small">When you explore art</p>
          <div className="heatmap">
            <span />
            {times.map((time) => (
              <span key={time} className="heatmap-label">
                {time}
              </span>
            ))}
            {days.map((day, row) => (
              <Fragment key={day}>
                <span className="heatmap-label">
                  {day}
                </span>
                {activity[row].map((value, col) => (
                  <span key={day + col} className="heatmap-cell" style={{ opacity: 0.15 + value * 0.85 }} />
                ))}
              </Fragment>
            ))}
          </div>
          <p className="muted small">You explore most on weekend evenings.</p>
        </section>

        <section className="chart-card chart-dark">
          <span className="ai-tag">
            <Icon name="sparkle" size={12} className="spark" /> Personalised insights
          </span>
          {[
            'Your saves cluster around soft greens and violets — similar to late Monet and the Tonalists.',
            'You often view religious works but rarely save them. Want a gentler start, like Hitchcock’s “The Annunciation”?',
            'Most landscapes you save are wide. We’ll favour wide formats in recommendations.',
          ].map((text) => (
            <p key={text} className="insight">
              <Icon name="sparkle" size={14} /> {text}
            </p>
          ))}
        </section>
      </div>

      <section>
        <div className="section-header">
          <h3>Most explored categories this month</h3>
        </div>
        <div className="grid-4">
          {categories.slice(0, 4).map((cat) => (
            <div key={cat.name}>
              <img className="explored-img" src={imageUrl(getArtwork(cat.coverId).imageId, 400)} alt="" />
              <h4>{cat.name}</h4>
              <p className="mono muted">{cat.count} artworks</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Analytics;
