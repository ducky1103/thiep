# Thư mời tốt nghiệp (React + Vite)

Người nhận mở link riêng là thấy tên mình trên thiệp, không cần nhập gì.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra (thường là http://localhost:5173).

## Cách dùng

- Sửa thông tin buổi lễ trong `src/config.js`.
- Mở `/?tao-link` để nhập danh sách tên và lấy link cho từng người.
- Link của khách có dạng `/?to=<tên mã hóa>`. Tên được mã hóa base64url nên giữ nguyên dấu tiếng Việt.
- Link không có `?to=` sẽ hiện lời chào chung "Bạn thân mến".

## Đưa lên mạng

```bash
npm run build
```

Thư mục `dist/` là một trang tĩnh, có thể tải lên Netlify, Vercel, Cloudflare Pages hoặc GitHub Pages.
Sau khi có địa chỉ thật, mở `/?tao-link`, dán địa chỉ vào ô "Địa chỉ trang thư mời" rồi tạo link gửi khách.

Lưu ý: tên người nhận nằm ngay trong link, nên ai có link nào chỉ thấy tên trong link đó.
