<template>
    <canvas
        ref="canvasRef"
        width="780"
        height="760"
        style="display: block; position: absolute; top: 8rem;"
    ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvasRef = ref(null);
let raf;

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.42;

    let angle = 0;

    const dots = [];
    for (let lat = -80; lat <= 80; lat += 12) {
        for (let lon = -180; lon <= 180; lon += 12) {
        dots.push({
            lat: (lat * Math.PI) / 180,
            lon: (lon * Math.PI) / 180,
        });
        }
    }

    const draw = () => {
        ctx.clearRect(0, 0, W, H);

        dots.forEach(({ lat, lon }) => {
        const l = lon + angle;

        const x = cx + R * Math.cos(lat) * Math.sin(l);
        const y = cy - R * Math.sin(lat);
        const z = Math.cos(lat) * Math.cos(l);

        if (z > 0) {
            ctx.beginPath();
            ctx.arc(x, y, 0.8 + z * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${0.1 + z * 0.5})`;
            ctx.fill();
        }
        });

        angle += 0.004;
        raf = requestAnimationFrame(draw);
    };

    draw();
});

onUnmounted(() => {
    cancelAnimationFrame(raf);
});
</script>