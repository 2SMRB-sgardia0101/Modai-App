#!/usr/bin/env bash
set -e

cleanup() {
  echo "\nDeteniendo frontend y backend..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
  wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT

echo "Iniciando backend en http://localhost:5000"
npm run dev:server &
BACKEND_PID=$!

echo "Iniciando frontend en http://localhost:5173"
npm run dev &
FRONTEND_PID=$!

wait "$BACKEND_PID" "$FRONTEND_PID"
