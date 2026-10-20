import { useEffect, useState } from 'react'
import LinkTool from './LinkTool'
import { decodeName } from './token'

// Link khách:       /thiep-moi.html?to=<ten-ma-hoa>  (hoặc /?to=... sẽ chuyển sang thiệp)
// Công cụ tạo link: /?tao-link
function readLocation() {
  const params = new URLSearchParams(window.location.search)
  return {
    tool: params.has('tao-link'),
    name: decodeName(params.get('to') || ''),
    search: window.location.search,
  }
}

export default function App() {
  const [loc, setLoc] = useState(readLocation)

  useEffect(() => {
    const onChange = () => setLoc(readLocation())
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  // Khách mời → thiệp cuộn giấy trắng–vàng (thiep-moi.html)
  useEffect(() => {
    if (loc.tool) return
    const target = `/thiep-moi.html${loc.search || ''}`
    if (window.location.pathname.endsWith('thiep-moi.html')) return
    window.location.replace(target)
  }, [loc.tool, loc.search])

  useEffect(() => {
    document.title = loc.tool
      ? 'Tạo link thư mời'
      : loc.name
        ? `Thư mời dành cho ${loc.name}`
        : 'Thư mời tốt nghiệp 2026'
  }, [loc.tool, loc.name])

  if (loc.tool) {
    return (
      <main className="wrap">
        <LinkTool />
      </main>
    )
  }

  return (
    <main className="wrap" style={{ textAlign: 'center', padding: '2rem', color: '#e8d48b' }}>
      <p style={{ fontFamily: 'serif', letterSpacing: '0.2em' }}>Đang mở thiệp mời…</p>
    </main>
  )
}
