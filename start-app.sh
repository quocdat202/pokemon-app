#!/bin/bash

# Script để chạy cả backend và frontend cùng lúc

echo "🚀 Đang khởi động Pokemon App..."

# Chạy backend ở background
echo "📡 Khởi động Backend (NestJS)..."
cd backend
npm run start:dev &
BACKEND_PID=$!

# Đợi backend khởi động (5 giây)
sleep 5

# Chạy frontend ở background  
echo "⚛️  Khởi động Frontend (React)..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "✅ Đã khởi động thành công!"
echo "🌐 Backend: http://localhost:3000"
echo "🖥️  Frontend: http://localhost:3001"
echo ""
echo "Nhấn Ctrl+C để dừng cả hai services..."

# Hàm để dọn dẹp khi script kết thúc
cleanup() {
  echo ""
  echo "🛑 Đang dừng services..."
  kill $BACKEND_PID 2>/dev/null
  kill $FRONTEND_PID 2>/dev/null
  echo "👋 Đã dừng tất cả services!"
  exit 0
}

# Bắt tín hiệu Ctrl+C
trap cleanup SIGINT

# Chờ cho đến khi user nhấn Ctrl+C
wait
