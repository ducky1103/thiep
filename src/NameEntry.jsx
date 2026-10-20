import { useState } from 'react'

export default function NameEntry({ onSubmit }) {
  const [value, setValue] = useState('')
  const [shook, setShook] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      setShook(true)
      setTimeout(() => setShook(false), 500)
      return
    }
    onSubmit(trimmed)
  }

  return (
    <div className="entry-wrap">
      <div className="entry-card">
        <div className="entry-icon" aria-hidden="true">
          <img className="entry-icon" src="img/graduation-mortarboard-svgrepo-com.svg" alt=""/>
        </div>
        <h1 className="entry-title">Thư Mời Tốt Nghiệp</h1>
        <p className="entry-sub">
          Nhập tên của bạn để xem thư mời dành riêng cho bạn
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className={`entry-field ${shook ? 'shake' : ''}`}>
            <label htmlFor="guest-name" className="entry-label">
              Họ và tên
            </label>
            <input
              id="guest-name"
              type="text"
              className="entry-input"
              placeholder="Ví dụ: Nguyễn Văn An"
              value={value}
              onChange={e => setValue(e.target.value)}
              autoFocus
              autoComplete="name"
            />
          </div>
          <button type="submit" className="entry-btn">
            Xem thư mời →
          </button>
        </form>
      </div>
    </div>
  )
}
