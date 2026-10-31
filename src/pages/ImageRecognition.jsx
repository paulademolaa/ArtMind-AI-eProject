import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import { getArtwork } from '../data/artworks';
import { analyseImage } from '../utils/fakeAI';
import './ImageRecognition.css';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 10 * 1024 * 1024; // 10 MB

function ImageRecognition() {
  const [step, setStep] = useState('upload');
  const [file, setFile] = useState(null); // { name, size, url }
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(chosenFile) {
    if (!chosenFile) return;
    if (!allowedTypes.includes(chosenFile.type)) {
      setErrorMessage(`“${chosenFile.name}” isn’t a JPG, PNG or WEBP image. Nothing was uploaded.`);
      setStep('error');
      return;
    }
    if (chosenFile.size > maxSize) {
      setErrorMessage('This image is larger than 10 MB. Please choose a smaller one.');
      setStep('error');
      return;
    }
    setFile({
      name: chosenFile.name,
      size: (chosenFile.size / 1024 / 1024).toFixed(1) + ' MB',
      url: URL.createObjectURL(chosenFile), // a temporary address so we can show the picture
    });
    setStep('ready');
  }

  function useSample() {
    const sample = getArtwork('cliff-walk-at-pourville');
    setFile({ name: 'cliff-walk.jpg', size: '3.7 MB', url: sample.image });
    setStep('ready');
  }

  async function analyse() {
    setStep('processing');
    const data = await analyseImage(); // waits ~3 seconds
    setResult(data);
    setStep('results');
  }

  function startAgain() {
    setFile(null);
    setResult(null);
    setStep('upload');
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    handleFile(event.dataTransfer.files[0]);
  }

  const stepNames = ['Upload', 'Analyse', 'Results'];
  const activeIndex = step === 'processing' ? 1 : step === 'results' ? 2 : 0;

  return (
    <PageLayout>
      <div className="recognition-progress">
        <div className="container recognition-progress-inner">
          {stepNames.map((name, index) => (
            <div key={name} className="progress-step">
              <span className={index < activeIndex ? 'progress-dot done' : index === activeIndex ? (step === 'error' ? 'progress-dot error' : 'progress-dot active') : 'progress-dot'}>
                {index < activeIndex ? <Icon name="check" size={12} /> : step === 'error' && index === 0 ? '!' : index + 1}
              </span>
              <span className="progress-name">{name}</span>
              {index < 2 && <span className="progress-line" />}
            </div>
          ))}
          <span className="privacy mono muted">
            <Icon name="lock" size={13} /> Private · deleted after 24 h
          </span>
        </div>
      </div>

      <section className="container recognition">
        <div className="recognition-left">
          <div className="stage">
            {(step === 'upload' || step === 'error') && (
              <label
                className={dragging ? 'drop-zone dragging' : step === 'error' ? 'drop-zone error' : 'drop-zone'}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <span className="drop-icon">
                  <Icon name={step === 'error' ? 'alert' : 'upload'} size={26} />
                </span>
                <h3>{step === 'error' ? 'Upload failed' : dragging ? 'Release to upload' : 'Drop a painting here'}</h3>
                <p className="mono muted">JPG, PNG or WEBP · up to 10 MB</p>
                <span className="btn btn-dark">
                  {step === 'error' ? 'Choose another file' : 'Browse files'} <Icon name="arrowRight" size={14} />
                </span>
                <input type="file" accept="image/*" hidden onChange={(event) => handleFile(event.target.files[0])} />
              </label>
            )}

            {(step === 'ready' || step === 'processing' || step === 'results') && file && (
              <div className={step === 'processing' ? 'preview scanning' : 'preview'}>
                <img src={file.url} alt="Your uploaded painting" />
                <span className="preview-label">
                  {step === 'ready' && 'Ready to analyse'}
                  {step === 'processing' && 'Analysing colours and brushwork…'}
                  {step === 'results' && '✓ Painting detected'}
                </span>
                {step === 'processing' && <span className="scan-line" />}
              </div>
            )}
          </div>

          {step === 'upload' && (
            <div className="samples">
              <span className="muted small">No painting to hand?</span>
              <button className="link-arrow" onClick={useSample}>
                Try a sample <Icon name="arrowRight" size={14} />
              </button>
            </div>
          )}
          {file && step !== 'upload' && step !== 'error' && (
            <div className="file-row">
              <span className="mono muted">
                {file.name} · {file.size}
              </span>
              {step !== 'processing' && (
                <button className="link-arrow" onClick={startAgain}>
                  <Icon name="refresh" size={14} /> Replace
                </button>
              )}
            </div>
          )}
        </div>

        <div className="recognition-right">
          {step === 'upload' && (
            <>
              <p className="eyebrow">AI image recognition</p>
              <h1>
                Identify any <span className="accent">painting.</span>
              </h1>
              <p className="lead">Upload a photo of a painting. ArtMind detects its style, colours and category, then finds the closest match in the collection.</p>
              <ul className="check-list">
                <li>
                  <Icon name="layers" size={16} /> Style &amp; category with confidence scores
                </li>
                <li>
                  <Icon name="palette" size={16} /> Five dominant colours
                </li>
                <li>
                  <Icon name="search" size={16} /> The closest match in our collection
                </li>
                <li>
                  <Icon name="eye" size={16} /> Similar paintings to explore
                </li>
              </ul>
              <div className="tips">
                <p className="mono muted">For the best results</p>
                <p>— Photograph the whole canvas, straight on</p>
                <p>— Use even light, avoid glare</p>
                <p>— Crop out the frame and wall if you can</p>
              </div>
            </>
          )}

          {step === 'ready' && (
            <>
              <p className="eyebrow">Photo checked</p>
              <h1>
                Looks <span className="accent">good.</span>
              </h1>
              <p className="lead">Your photo is clear enough for a confident result.</p>
              <ul className="check-list done">
                <li>
                  <Icon name="check" size={16} /> Image loaded
                </li>
                <li>
                  <Icon name="check" size={16} /> Supported format
                </li>
                <li>
                  <Icon name="check" size={16} /> Under 10 MB
                </li>
              </ul>
              <button className="btn btn-dark" onClick={analyse}>
                <Icon name="sparkle" size={14} /> Analyze artwork
              </button>
              <p className="mono muted small-gap">Takes about 3 seconds</p>
            </>
          )}

          {step === 'processing' && (
            <>
              <p className="eyebrow">Analysing</p>
              <h1>
                Reading the <span className="accent">brushwork…</span>
              </h1>
              <ul className="check-list">
                <li className="is-done">
                  <Icon name="check" size={16} /> Image quality check
                </li>
                <li className="is-done">
                  <Icon name="check" size={16} /> Detecting artistic style
                </li>
                <li className="is-active">
                  <Icon name="palette" size={16} /> Extracting dominant colours
                </li>
                <li className="is-todo">
                  <Icon name="layers" size={16} /> Classifying category
                </li>
                <li className="is-todo">
                  <Icon name="search" size={16} /> Finding the closest match
                </li>
              </ul>
              <div className="ai-progress-bar">
                <span />
              </div>
            </>
          )}

          {step === 'error' && (
            <>
              <p className="eyebrow eyebrow-ink">Upload failed</p>
              <h1>
                We couldn’t <span className="accent">read that file.</span>
              </h1>
              <div className="error-box">
                <Icon name="alert" size={18} /> {errorMessage}
              </div>
              <ul className="check-list">
                <li>
                  <Icon name="image" size={16} /> Export the photo as JPG or PNG
                </li>
                <li>
                  <Icon name="upload" size={16} /> Keep it under 10 MB
                </li>
              </ul>
              <button className="link-arrow" onClick={useSample}>
                Try a sample painting <Icon name="arrowRight" size={14} />
              </button>
            </>
          )}

          {step === 'results' && result && (
            <>
              <div className="results-top">
                <p className="eyebrow">Analysis complete</p>
                <span className="ai-badge">
                  <Icon name="sparkle" size={12} /> AI prediction · not guaranteed
                </span>
              </div>
              <h1>
                Most likely <span className="accent">{result.style.name}.</span>
              </h1>
              <div className="predictions">
                {[
                  ['Style', result.style],
                  ['Category', result.category],
                  ['Medium · estimated', result.medium],
                  ['Era', result.era],
                ].map(([label, item]) => (
                  <div className="prediction" key={label}>
                    <span className="mono muted">{label}</span>
                    <strong>{item.name}</strong>
                    <div className="confidence">
                      <div className="confidence-bar">
                        <span style={{ width: item.confidence + '%' }} />
                      </div>
                      <small className="muted">Also: {item.alternative}</small>
                    </div>
                    <span className="mono">{item.confidence}%</span>
                  </div>
                ))}
              </div>

              <p className="mono muted">Dominant colours</p>
              <div className="colour-swatches">
                {result.colours.map((colour) => (
                  <div key={colour.hex}>
                    <span style={{ background: colour.hex }} />
                    <p className="small">{colour.name}</p>
                    <p className="mono muted">
                      {colour.hex} · {colour.percent}%
                    </p>
                  </div>
                ))}
              </div>
              <div className="result-actions">
                <button className="btn btn-dark" onClick={startAgain}>
                  New analysis <Icon name="refresh" size={14} />
                </button>
                <Link to="/ai/assistant?q=What%20is%20impressionism" className="btn btn-outline">
                  <Icon name="sparkle" size={14} /> Ask the assistant
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {step === 'results' && result && (
        <>
          <section className="section section-surface">
            <div className="container closest-match">
              <img src={getArtwork(result.closestMatchId).image} alt="Closest match" />
              <div>
                <p className="eyebrow">Closest match in the collection</p>
                <h2 className="accent-ink">{getArtwork(result.closestMatchId).title}</h2>
                <p className="mono muted">
                  {getArtwork(result.closestMatchId).artist} · {getArtwork(result.closestMatchId).date} · {getArtwork(result.closestMatchId).medium}
                </p>
                <p className="muted">97% visual match. Same viewpoint, palette and composition — your photo is very likely of this painting or a reproduction of it.</p>
                <Link to={`/artwork/${result.closestMatchId}`} className="btn btn-dark">
                  View artwork <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2>More like your photo</h2>
              </div>
              <div className="grid-4">
                {result.similarIds.map((id, index) => (
                  <ArtworkCard key={id} artwork={getArtwork(id)} tag={['Same artist', 'Sea & sky', 'Coastal view', 'Same era'][index]} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  );
}

export default ImageRecognition;
