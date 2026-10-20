// Tên người nhận được mã hóa base64url (UTF-8) để giữ nguyên dấu tiếng Việt
// và an toàn khi đặt trong địa chỉ: chỉ gồm A-Z a-z 0-9 - _

export function encodeName(name) {
  const bytes = new TextEncoder().encode(name)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeName(token) {
  if (!token) return ''
  try {
    let s = token.replace(/-/g, '+').replace(/_/g, '/')
    while (s.length % 4) s += '='
    const bin = atob(s)
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
    const name = new TextDecoder('utf-8', { fatal: true }).decode(bytes).trim()
    return name.length > 0 && name.length <= 80 ? name : ''
  } catch {
    return ''
  }
}
