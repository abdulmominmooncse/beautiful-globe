# 🌕 Interactive 3D Moon Simulation

A **Next.js** + **Three.js** project that simulates a 3D rotating Moon 🌑 with interactive mouse dragging and zooming.  
Randomly generated craters make the Moon feel even more realistic!


## ✨ Features

- 🎯 Smooth auto-rotation of the Moon
- 🖱️ Drag with mouse to rotate manually
- 🔍 Scroll wheel to zoom in and out
- 🪨 Randomly generated Moon craters
- 🌌 Realistic ambient and directional lighting
- 🏗️ Built with `three.js`, `@react-three/fiber`, and **Next.js 14 App Router**
- 🔥 Responsive and optimized for any screen size


## 🛠️ Tech Stack

- **Next.js 14**
- **React 18**
- **TypeScript**
- **three.js** (core 3D rendering)
- **OrbitControls** from `three/examples/jsm/controls/OrbitControls`



## 📚 How It Works

- A **Three.js scene** is initialized inside a custom `<canvas>`.
- A **Moon sphere** (`THREE.SphereGeometry`) is created with a `MeshPhongMaterial`.
- **50 random craters** are generated and positioned across the surface using spherical coordinates.
- **OrbitControls** allow damping for smooth movement.
- Mouse events:
  - **Mouse drag** rotates the Moon manually.
  - **Scroll wheel** zooms the camera in and out.
- **Responsive resizing** adjusts camera and renderer size on window resize.


## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/moon-simulation.git

# 2. Go to the project directory
cd moon-simulation

# 3. Install dependencies
npm install
# or
yarn install

# 4. Run the development server
npm run dev
# or
yarn dev
