function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    const card = document.querySelector('.card');
    const rect = card.getBoundingClientRect();
    const avoidCardX = rect.left + rect.width / 2;
    const avoidCardY = rect.top + rect.height / 2;
    let x, y;
    do {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
    } while (Math.abs(x - avoidCardX) < rect.width / 2 && Math.abs(y - avoidCardY) < rect.height / 2);
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.animationDuration = Math.random() * 3 + 3 + 's';
    star.style.width = Math.random() * 10 + 25 + 'px';
    star.style.height = star.style.width;
    star.style.background = Math.random() > 0.5 ?
        'radial-gradient(circle, #ffd700 20%, #ffeb3b 70%)' :
        'radial-gradient(circle, #ff66b2 20%, #ff99cc 70%)';
    document.body.appendChild(star);
    setTimeout(() => {
        star.remove();
    }, 6000);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const card = document.querySelector('.card');
    const rect = card.getBoundingClientRect();
    const margin = 30;
    let x, y;
    do {
        x = rect.left + Math.random() * rect.width;
        y = rect.top + Math.random() * rect.height;
    } while (
        x > rect.left + margin &&
        x < rect.right - margin &&
        y > rect.top + margin &&
        y < rect.bottom - margin
    );
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.animationDuration = Math.random() * 0.8 + 0.8 + 's';
    document.body.appendChild(sparkle);
    setTimeout(() => {
        sparkle.remove();
    }, 1200);
}

function createButtonTrail() {
    const trail = document.createElement('div');
    trail.classList.add('button-trail');
    const btn = document.getElementById('more-btn');
    const rect = btn.getBoundingClientRect();
    trail.style.left = rect.left + Math.random() * rect.width + 'px';
    trail.style.top = rect.top + Math.random() * rect.height + 'px';
    trail.style.animationDuration = Math.random() * 0.8 + 0.8 + 's';
    document.body.appendChild(trail);
    setTimeout(() => {
        trail.remove();
    }, 800);
}

setInterval(createStar, 200);
setInterval(createSparkle, 150);
setInterval(createButtonTrail, 100);

window.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('#card');
    const texts = document.querySelectorAll('#text-container p');
    const moreBtn = document.getElementById('more-btn');

    card.style.opacity = '0';
    card.style.transform = 'scale(0.7)';
    setTimeout(() => {
        card.style.transition = 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    }, 100);

    let isRevealing = false;
    moreBtn.addEventListener('click', () => {
        if (isRevealing) return;
        isRevealing = true;
        card.classList.add('expanded');
        let index = 0;
        function revealNext() {
            if (index < texts.length) {
                texts[index].classList.remove('hidden');
                texts[index].classList.add('text-reveal');
                index++;
                setTimeout(revealNext, window.innerWidth <= 640 ? 1200 : 1000);
            } else {
                moreBtn.textContent = 'My Dolphin 🐬';
                moreBtn.classList.add('dolphin-btn');
                moreBtn.disabled = true;
                isRevealing = false;
            }
        }
        revealNext();
    });
});