Dưới đây là **kế hoạch chi tiết 1 tuần** để bạn tự làm một **Reverse Proxy project** dùng **Node.js + ExpressJS + TypeScript**, phù hợp quỹ thời gian **1h/ngày ngày thường + 4h cuối tuần**, tổng khoảng **10–12 giờ**, và có **scope vừa đủ để hoàn thành**.

---

# 🎯 **Mục tiêu Project**

- Hiểu reverse proxy là gì và hoạt động như thế nào.
- Tự build một reverse proxy đơn giản bằng Node.js + ExpressJS + TypeScript.
- Hỗ trợ các chức năng cơ bản:

  - Forward request tới backend
  - Logging
  - Basic routing
  - Basic load balancing (round-robin) — optional nếu bạn có thời gian.

- Viết tài liệu + mô tả kiến trúc.
- Deploy demo (local hoặc Docker).

---

# 🗂 **Kiến trúc sơ bộ**

```
Client -> Reverse Proxy (Node/Express) -> Upstream services (service A, service B)
```

---

# 🗓 **Lộ trình 1 tuần (10–12h)**

## **📅 Day 1 — 1h**

### **Hiểu reverse proxy (theory)**

- Reverse proxy là gì?
- Khác gì với forward proxy?
- Các tính năng chính của reverse proxy:

  - Ẩn backend
  - Cân bằng tải
  - Rate limit
  - SSL termination (chưa làm trong scope)

- Đọc qua Nginx reverse proxy để tham khảo.

**Deliverable:**

- Notes lý thuyết Markdown (10–15 dòng).

---

## **📅 Day 2 — 1h**

### **Khởi tạo project**

- Init project:

  ```
  npm init -y
  npm i express http-proxy-middleware
  npm i -D typescript ts-node nodemon @types/express @types/node
  ```

- Setup TS config
- Tạo cấu trúc:

```
src/
  server.ts
  proxy/
    reverseProxy.ts
upstreams/
  serviceA.js
  serviceB.js
```

- Chạy "Hello Proxy"

**Deliverable:**

- Server chạy được với TypeScript.

---

## **📅 Day 3 — 1h**

### **Tạo reverse proxy core**

- Dùng `http-proxy-middleware`
- Viết middleware forward request sang serviceA
- Log basic:

  - method
  - url
  - response time

**Deliverable:**

- Reverse proxy hoạt động: `/api => serviceA`

---

## **📅 Day 4 — 1h**

### **Routing nâng cao (cơ bản)**

- Thêm rule:

  - `/api/users` → serviceA
  - `/api/orders` → serviceB

- Thêm feature:

  - Thay đổi header
  - Thêm ID request (UUID)

**Deliverable:**

- Proxy route hoạt động.

---

## **📅 Day 5 — 1h**

### **Load balancing (Round Robin) — optional**

- Upstream servers:

  ```
  serviceA-1: 3001
  serviceA-2: 3002
  ```

- Viết simple load balancer:

  ```
  let index = 0;
  function pickServer() {
      const server = servers[index];
      index = (index + 1) % servers.length;
      return server;
  }
  ```

**Deliverable:**

- `/api/users` load-balance giữa serviceA-1 và serviceA-2.

---

## **📅 Weekend — 4h**

### **Hoàn thiện + Document + Demo**

#### **1) Viết README**

- Giải thích reverse proxy
- Hướng dẫn chạy
- Kiến trúc
- Code snippet

#### **2) Viết code clean**

- Tách config
- Tách router
- Thêm middleware:

  - Logger
  - Error handler

#### **3) Viết tài liệu kiến trúc**

- Sequence diagram:

  ```
  Client -> Proxy -> Backend
  ```

#### **4) Deploy demo**

- Lựa chọn:

  - Chạy local bằng Docker Compose (recommended)
  - Hoặc chạy với node trực tiếp

**Deliverable:**

- Repo đầy đủ
- Tài liệu chuẩn
- Proxy chạy OK

---

# ✔ **Kết quả sau 1 tuần**

Bạn sẽ có:

- Một reverse proxy chạy thực sự bằng Node.js
- Hiểu rõ cơ chế:

  - forwarding
  - headers
  - routing
  - load balancing

- Tài liệu rõ ràng
- Kinh nghiệm foundational về kiến trúc backend

---

# 🎁 Bonus (nếu còn thời gian)

- Thêm rate limit (express-rate-limit)
- Thêm cache (node-cache)
- Logging với Winston + rotate log
- Metrics monitor (Prometheus + Grafana)
- JWT auth pass-through

---

Nếu bạn muốn, mình có thể viết luôn **template folder**, **code mẫu**, hoặc **Docker Compose** cho toàn project.
