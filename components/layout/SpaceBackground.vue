<template>
  <div class="relative w-full h-full overflow-hidden bg-black">
    <!-- Canvas for particles -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />

    <img
      :src="icon"
      class="absolute -bottom-[15vh] sm:-bottom-[35vh] lg:-right-36 lg:-bottom-[35%] select-none pointer-events-none brand-element brightness-75 lg:w-[70vw] lg:h-[70vw]"
      :style="{
        transform: `translateY(${brandOffset}px) rotate(${brandRotation}deg)`,
      }"
    />

    <!-- Gradient overlays for depth -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none"
    />
    <div
      class="absolute inset-0 bg-gradient-to-tr from-[#FF4D1D]/10 via-[#FF4D1D]/3 to-transparent pointer-events-none"
    />

    <!-- Noise texture overlay -->
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none noise-overlay"
    />

    <!-- Content slot -->
    <div class="relative z-10 w-full h-full">
      <slot />
    </div>
  </div>
</template>

<script setup>
import icon from "~/assets/images/icon-space-background.webp";

const canvasRef = ref(null);
let animationFrame = null;
let particles = [];
let scrollY = 0;
let targetScrollY = 0;

// Brand element reactive values
const brandOffset = ref(0);
const brandRotation = ref(-12);
const brandOpacity = ref(0.18);
let targetBrandOffset = 0;
let targetBrandRotation = -12;

const config = {
  particleCount: 100,
  starCount: 50,
  baseSpeed: 0.15,
  scrollInfluence: 0.15,
};

class Particle {
  constructor(canvas, type = "dust") {
    this.canvas = canvas;
    this.type = type;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;

    if (this.type === "star") {
      this.size = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.9 + 0.3;
      this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.6 ? "orange" : "white";
      this.speedX = (Math.random() - 0.5) * 0.08;
      this.speedY = (Math.random() - 0.5) * 0.08;
    } else {
      this.size = Math.random() * 2.5 + 0.5;
      this.opacity = Math.random() * 0.2 + 0.08;
      this.speedX = (Math.random() - 0.5) * config.baseSpeed;
      this.speedY = (Math.random() - 0.5) * config.baseSpeed;
      this.color = Math.random() > 0.65 ? "orange" : "gray";
    }

    this.baseX = this.x;
    this.baseY = this.y;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = (Math.random() - 0.5) * 0.002;
    this.radius = Math.random() * 30 + 10;
  }

  update(scrollOffset, time) {
    // Floating motion
    this.angle += this.angleSpeed;
    const floatX = Math.cos(this.angle) * this.radius * 0.3;
    const floatY = Math.sin(this.angle) * this.radius * 0.3;

    // Base movement
    this.baseX += this.speedX;
    this.baseY += this.speedY;

    // Scroll influence - parallax effect
    const parallaxFactor = this.type === "star" ? 0.5 : 1.2;
    const scrollInfluence =
      scrollOffset *
      config.scrollInfluence *
      parallaxFactor *
      (this.size * 0.5);

    this.x = this.baseX + floatX;
    this.y = this.baseY + floatY + scrollInfluence;

    // Twinkle effect for stars
    if (this.type === "star") {
      this.twinklePhase += this.twinkleSpeed;
      this.currentOpacity =
        this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
    }

    // Wrap around edges
    if (this.baseX < -10) this.baseX = this.canvas.width + 10;
    if (this.baseX > this.canvas.width + 10) this.baseX = -10;
    if (this.baseY < -10) this.baseY = this.canvas.height + 10;
    if (this.baseY > this.canvas.height + 10) this.baseY = -10;
  }

  draw(ctx, time) {
    ctx.save();

    if (this.type === "star") {
      const opacity = this.currentOpacity || this.opacity;
      if (this.color === "orange") {
        ctx.fillStyle = `rgba(255, 77, 29, ${opacity})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      }

      // Draw star with glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Subtle glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle =
        this.color === "orange"
          ? `rgba(255, 77, 29, ${opacity * 0.15})`
          : `rgba(255, 255, 255, ${opacity * 0.1})`;
      ctx.fill();
    } else {
      // Dust particles
      if (this.color === "orange") {
        ctx.fillStyle = `rgba(255, 77, 29, ${this.opacity})`;
      } else {
        ctx.fillStyle = `rgba(120, 120, 120, ${this.opacity})`;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  };

  resize();
  window.addEventListener("resize", resize);

  // Create particles
  particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle(canvas, "dust"));
  }
  for (let i = 0; i < config.starCount; i++) {
    particles.push(new Particle(canvas, "star"));
  }

  let time = 0;

  const animate = () => {
    time++;

    // Smooth scroll interpolation
    scrollY += (targetScrollY - scrollY) * 0.1;

    // Smooth brand element interpolation
    brandOffset.value += (targetBrandOffset - brandOffset.value) * 0.08;
    brandRotation.value += (targetBrandRotation - brandRotation.value) * 0.06;

    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update(scrollY, time);
      particle.draw(ctx, time);
    });

    animationFrame = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    window.removeEventListener("resize", resize);
  };
};

const handleScroll = () => {
  if (typeof window !== "undefined") {
    targetScrollY = window.scrollY;

    // Brand element parallax - moves up and rotates slightly on scroll
    targetBrandOffset = -window.scrollY * 0.3;
    targetBrandRotation = -12 + window.scrollY * 0.02;
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    const cleanup = initCanvas();
    window.addEventListener("scroll", handleScroll, { passive: true });

    onUnmounted(() => {
      if (cleanup) cleanup();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    });
  }
});
</script>

<style scoped>
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

.brand-element {
  transition: transform 0.1s ease-out;
  will-change: transform, opacity;
}

.brand-text {
  background: linear-gradient(
    135deg,
    rgba(255, 77, 29, 1) 0%,
    rgba(255, 77, 29, 0.6) 30%,
    rgba(120, 120, 120, 0.8) 60%,
    rgba(80, 80, 80, 0.5) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow:
    0 0 100px rgba(255, 77, 29, 0.4),
    0 0 150px rgba(255, 77, 29, 0.2);
}
</style>
