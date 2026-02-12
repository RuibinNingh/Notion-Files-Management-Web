// 初始化 Lucide 图标
lucide.createIcons();

// 1. 打字机效果
const text = "Notion 终极文件管理方案: WPF + Python 驱动";
let i = 0;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// 2. GSAP 入场动画
gsap.registerPlugin(ScrollTrigger);

window.onload = () => {
    gsap.to("#hero-title", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        onComplete: typeWriter
    });

    // 滚动叙事：卡片跃入
    gsap.utils.toArray(".glass-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none none"
            },
            opacity: 0,
            scale: 0.9,
            y: 50,
            duration: 1,
            ease: "expo.out"
        });
    });

    // 获取 Version 信息
    fetch('./version.json')
        .then(res => res.json())
        .then(data => {
            document.getElementById('version-display').innerText = JSON.stringify(data, null, 2);
        });
};

// 3. 3D 鼠标悬停交互
const preview = document.getElementById('main-preview');
const container = document.querySelector('.perspective-container');

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    gsap.to(preview, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out"
    });
});

container.addEventListener('mouseleave', () => {
    gsap.to(preview, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
    });
});