import { useCallback, useState } from 'react'

// Trả về [thông báo, hàm sao chép]. Nếu trình duyệt từ chối clipboard, báo để người dùng tự chọn và sao chép.
export function useCopy() {
  const [msg, setMsg] = useState('')

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setMsg('Đã sao chép')
      setTimeout(() => setMsg(''), 2000)
    } catch {
      setMsg('Chưa tự sao chép được, hãy chọn và sao chép thủ công.')
    }
  }, [])

  return [msg, copy]
}
