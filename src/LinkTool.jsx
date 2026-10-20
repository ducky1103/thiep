import { useMemo, useState } from 'react'
import { encodeName } from './token'
import { useCopy } from './useCopy'

const SAMPLE = 'Nguyễn Văn An\nCô Lan\nAnh Hùng và chị Mai'

function LinkRow({ name, url }) {
  const [msg, copy] = useCopy()
  return (
    <li>
      <span className="who">{name}</span>
      <div className="line">
        <input readOnly value={url} aria-label={`Link của ${name}`} onFocus={(e) => e.target.select()} />
        <button type="button" className="ghost" onClick={() => copy(url)}>
          Sao chép
        </button>
        <span className="hint" role="status">{msg}</span>
      </div>
    </li>
  )
}

export default function LinkTool() {
  const [text, setText] = useState(SAMPLE)
  const [base, setBase] = useState(() => {
    const origin = window.location.origin
    // Link khách mở thẳng trang thiệp gatefold
    return `${origin}/thiep-moi.html`
  })
  const [allMsg, copyAll] = useCopy()

  const rows = useMemo(() => {
    let root = base.trim().replace(/[?#].*$/, '')
    if (root.endsWith('/')) root = root.slice(0, -1)
    if (!/thiep-moi\.html$/i.test(root)) {
      root = `${root}/thiep-moi.html`.replace(/([^:]\/)\/+/g, '$1')
    }
    return text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((n) => ({ name: n, url: `${root}?to=${encodeName(n.slice(0, 80))}` }))
  }, [text, base])

  return (
    <section className="ticket tool">
      <h2>Tạo link cho từng người nhận</h2>
      <p>
        Mỗi dòng một người nhận. Có thể ghi cả cách xưng hô, ví dụ “Cô Lan” hoặc “Anh Hùng và chị
        Mai”. Mỗi link mở ra thiệp có đúng tên đó.
      </p>
      <label htmlFor="names">
        Danh sách tên
        <textarea id="names" spellCheck={false} value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <label htmlFor="base">
        Địa chỉ trang thư mời
        <input id="base" type="url" value={base} onChange={(e) => setBase(e.target.value)} />
      </label>
      <p className="hint">
        Khi đã đưa trang lên mạng, hãy thay ô trên bằng địa chỉ thật của trang (không kèm phần sau dấu ?).
      </p>
      <div>
        <button
          type="button"
          onClick={() => copyAll(rows.map((r) => `${r.name}: ${r.url}`).join('\n'))}
        >
          Sao chép tất cả
        </button>{' '}
        <span className="hint" role="status">{allMsg}</span>
      </div>
      <ul className="links">
        {rows.map((r, i) => (
          <LinkRow key={i + r.name} name={r.name} url={r.url} />
        ))}
      </ul>
    </section>
  )
}
