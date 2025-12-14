# NUMER_PROJECT

https://numer-project-alpha.vercel.app

เว็บแอปพลิเคชันสำหรับคำนวณระเบียบวิธีเชิงตัวเลข (Numerical Methods) พัฒนาด้วย React (Vite) สำหรับ Frontend และ Node.js (Express) + MongoDB สำหรับ Backend

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## สถานะฟีเจอร์ (Feature Status)

โปรเจกต์นี้ใช้ API Endpoint หลัก (`/api/bisection`) ร่วมกันสำหรับ Method ในกลุ่ม Root of Equations เพื่อจัดการข้อมูลโจทย์ (Problem Examples)

### Root of Equation
- [x] **Bisection Method** (เสร็จแล้ว - ใช้ API `/api/bisection`)
- [x] **Graphical Method** (เสร็จแล้ว - ใช้ API `/api/bisection`)
- [x] **False Position Method** (เสร็จแล้ว - ใช้ API `/api/bisection`)
- [x] **One-point Iteration Method** (เสร็จแล้ว - ใช้ API `/api/bisection`)
- [x] **Newton-Raphson Method** (เสร็จแล้ว - ใช้ API `/api/bisection`)
- [x] **Secant Method** (เสร็จแล้ว - ใช้ API `/api/bisection`)

### Linear Algebra
- [ ] **Cramer's Rule** (ยังไม่เสร็จ )
- [ ] **Gauss Elimination** (ยังไม่เสร็จ)
- [ ] **Gauss-Jordan Elimination** (ยังไม่เสร็จ)

### Interpolation
- [ ] **Newton's Divided-Differences** (ยังไม่เสร็จ)
- [ ] **Lagrange Interpolation** (ยังไม่เสร็จ)

### System
- [ ] **Authentication/Register** (ยังไม่เสร็จ)
- [ ] **Swagger API Docs** (ยังไม่เสร็จ)

---

## การติดตั้งและรันโปรเจกต์ (Installation & Run)

### 1. Backend (Server)
เข้าไปที่โฟลเดอร์ server และทำการติดตั้ง package
```bash
cd server
npm install
รัน ServerBashnpm start
# หรือ
nodemon server.js
Server จะรันที่ Port: 80002. Frontend (Client)เข้าไปที่โฟลเดอร์ numer-react-vite-projectBashcd numer-react-vite-project
npm install
รันหน้าเว็บBashnpm run dev
Frontend จะรันผ่าน Vite ที่ http://localhost:5173API ReferenceMethodEndpointMethodDescriptionRoot of Equations/api/bisectionGETดึงข้อมูลโจทย์ตัวอย่าง (ใช้ร่วมกันทุก Method ในกลุ่ม Root)Root of Equations/api/bisectionPOSTบันทึกข้อมูลโจทย์ใหม่
