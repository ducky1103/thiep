import { CONFIG } from './config'
import { useEffect, useState } from 'react'
// import { CONFIG } from './config'
/* ── Decor helpers ── */
function Stars() {
  return (
    <svg className="stars-svg" viewBox="0 0 260 260" aria-hidden="true" fill="none">
      {/* big 4-point stars */}
      <path d="M200 30 l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="#1a1a1a" opacity=".85"/>
      <path d="M230 80 l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#1a1a1a" opacity=".7"/>
      <path d="M185 95 l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#1a1a1a" opacity=".6"/>
      {/* hollow stars */}
      <polygon points="210,58 212,64 218,64 213,68 215,74 210,70 205,74 207,68 202,64 208,64" stroke="#1a1a1a" strokeWidth="1.2" fill="none" opacity=".5"/>
      <polygon points="238,45 239.5,50 244,50 240.5,53 242,58 238,55 234,58 235.5,53 232,50 236.5,50" stroke="#1a1a1a" strokeWidth="1" fill="none" opacity=".4"/>
      {/* small dots */}
      <circle cx="195" cy="50" r="2.5" fill="#1a1a1a" opacity=".5"/>
      <circle cx="245" cy="70" r="2" fill="#1a1a1a" opacity=".4"/>
      <circle cx="222" cy="100" r="1.8" fill="#1a1a1a" opacity=".35"/>
    </svg>
  )
}

function StarsBottom() {
  return (
    <svg className="stars-svg-bot" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      <polygon points="40,20 42,28 50,28 44,33 46,41 40,36 34,41 36,33 30,28 38,28" stroke="#8a1c1c" strokeWidth="1.3" fill="none" opacity=".55"/>
      <polygon points="160,10 161.5,15 166,15 162.5,18 164,23 160,20 156,23 157.5,18 154,15 158.5,15" stroke="#8a1c1c" strokeWidth="1.2" fill="none" opacity=".5"/>
      <circle cx="80" cy="50" r="2.5" fill="#8a1c1c" opacity=".45"/>
      <circle cx="140" cy="30" r="2" fill="#8a1c1c" opacity=".4"/>
      <path d="M100 15 l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#8a1c1c" opacity=".6"/>
    </svg>
  )
}

function WaxSeal() {
  return (
    <svg className="wax-seal" viewBox="0 0 90 90" aria-hidden="true">
      <circle cx="45" cy="45" r="42" fill="#8a1c1c"/>
      <circle cx="45" cy="45" r="38" fill="#a52020" opacity=".6"/>
      {/* flower petals */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i}
          cx="45" cy="25" rx="6" ry="9"
          fill="#7a1818" opacity=".85"
          transform={`rotate(${deg} 45 45)`}
        />
      ))}
      <circle cx="45" cy="45" r="10" fill="#8a1c1c"/>
      <circle cx="45" cy="45" r="7" fill="#c0392b" opacity=".5"/>
    </svg>
  )
}

export default function Invitation({ name }) {
  
 const [guestName, setGuestName] = useState(name || '')
  const [editName, setEditName] = useState(false)
  const [inputName, setInputName] = useState(name || '')

  useEffect(() => {
    const savedName = localStorage.getItem('graduationGuestName')

    if (savedName !== null) {
      setGuestName(savedName)
      setInputName(savedName)
    }
  }, [])

  const handleSaveName = () => {
    const trimmedName = inputName.trim()

    if (!trimmedName) return

    setGuestName(trimmedName)
    localStorage.setItem('graduationGuestName', trimmedName)
    setEditName(false)
  }

  // Parse date parts from config
  const d = new Date(CONFIG.start)
  const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  const dayNum = d.getDate()
  const monthName = d.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
  const year = d.getFullYear()

  return (
    <div className="env-wrap">
      {/* Red envelope back */}
      <div className="envelope-back" aria-hidden="true">
        <div className="envelope-flap" />
      </div>

      {/* Main invitation card */}
      <article className="inv-card">

        {/* Torn paper top edge */}
        <div className="torn-top" aria-hidden="true" />

        <div className="inv-inner">

          {/* ── Header ── */}
          <p className="you-invited">YOU ARE INVITED TO</p>

          <div className="title-block">
            <p className="host-name-script">{CONFIG.host}'s</p>
            <h1 className="grad-title">GRADUATION</h1>
            <p className="ceremony-script">Ceremony</p>
          </div>

          <Stars />

          {/* ── Photos + Info layout ── */}
          <div className="content-grid">

            {/* Left: main photo + vertical text */}
            <div className="photo-col">
              <div className="vertical-text" aria-hidden="true">THE END FOR A NEW BEGINNING</div>
              {/* MAIN PHOTO PLACEHOLDER */}
              <div className="photo-main" title="Thay thế bằng ảnh tốt nghiệp của bạn">
                <span className="photo-hint">📷 Ảnh tốt nghiệp<br/><small>Thay thế bằng hình của bạn</small></span>
              </div>
            </div>

            {/* Right: date/venue + small photo */}
            <div className="info-col">
              <div className="date-badge">
                <span className="date-month">{monthName}</span>
                <div className="date-row">
                  <span className="date-dow">{dayOfWeek}</span>
                  <span className="date-num">{dayNum}</span>
                  <span className="date-time">{CONFIG.timeText.split('–')[0].trim()}</span>
                </div>
                <span className="date-year">{year}</span>
              </div>

              <div className="venue-block">
                <span className="venue-pin">📍</span>
                <div>
                  <p className="venue-name">{CONFIG.locate.toUpperCase()}</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.venue)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venue-addr venue-link"
                  >
                    {CONFIG.venue}
                  </a>
                </div>
              </div>

              {/* SMALL PHOTO PLACEHOLDER */}
              <div className="photo-small" title="Thay thế bằng ảnh nhỏ của bạn">
                <span className="photo-hint small">📷<br/><small>Ảnh phụ</small></span>
              </div>
              <StarsBottom />
            </div>
          </div>

          {/* ── Guest name ── */}
          {name && (
            <div className="guest-name-block">
              <p className="for-label">Kính mời</p>
              <p className="guest-name-script">{name}</p>
            </div>
          )}

          {/* ── Bottom quote ── */}
          <p className="inv-quote">I hope you can be a part of<br/>my beautiful youth</p>
          <div className="heart-row" aria-hidden="true">♥</div>

        </div>

        {/* Torn paper bottom edge */}
        <div className="torn-bottom" aria-hidden="true" />

        {/* Wax seal */}
        <div className="seal-wrap" aria-hidden="true">
          <WaxSeal />
        </div>
      </article>
    </div>
  )
}
