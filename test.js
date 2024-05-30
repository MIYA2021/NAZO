const animationDuration = 24000;
const updateInterval = 400;
let startTimeMap = new Map();
let intervalMap = new Map();

function createLetters(text, rad, offset, frontColor, direction, id) {
    const radius = rad;
    let letters = text.split('');
    if(direction !== 'backwards') { letters = letters.reverse(); }
    let dir = ( direction === 'backwards') ? -1 : 1;

    const container = document.createElement('div');
    container.classList.add('text-container');
    container.classList.add(id);
    document.body.appendChild(container);

    startTimeMap.set(id, Date.now());

    letters.forEach((letter, index) => {
        const angle = (360 / letters.length) * (dir) * index - 8;
        const radian = angle * (Math.PI / 180);
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);

        const letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.classList.add(id);
        letterElement.textContent = letter;
        letterElement.setAttribute("data-text", letter);

        letterElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotateX(90deg) rotateY(${angle + 90}deg) rotateZ(180deg) translateY(${offset}px)`;

        container.appendChild(letterElement);
    });

    if (!intervalMap.has(id)) {
        const intervalId = setInterval(() => {
            requestAnimationFrame(() => {
                updateLetters(container, letters.length, 0.54, 1, frontColor, dir, id);
            });
        }, updateInterval);
        intervalMap.set(id, intervalId);
    }
}
    
function updateLetters(container, totalLetters, op1, op2, colorFront, dir, id) {
    const startTime = startTimeMap.get(id);
    const elapsedTime = Date.now() - startTime;
    const rotation = (elapsedTime % animationDuration) / animationDuration * 360;
    const activeAngleRange = 180;

    const letters = container.querySelectorAll(`.${id}`); 
    letters.forEach((letter, index) => {
        const letterAngle = 270 + (360 / totalLetters * index);
        const angleDifference = Math.abs(rotation - letterAngle) % 360;

        let isActive = angleDifference < activeAngleRange / 2 || angleDifference > 360 - activeAngleRange / 2;
        let activeDirection = dir === 1 ? !isActive : isActive;

        letter.style.opacity = activeDirection ? op1 : op2;
        letter.style.color = activeDirection ? '' : colorFront;
    });
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function clearTextContainers() {
    document.querySelectorAll('.text-container').forEach(container => {
        container.remove();
    });
}

function clearIntervals() {
    intervalMap.forEach(intervalId => clearInterval(intervalId));
    intervalMap.clear();
}

function updateText(newText) {
    clearTextContainers();
    startTimeMap.clear();
    clearIntervals();

    if (isMobileDevice()) {
        createLetters(` ⟩ ${newText} ⟩ ${newText}`, 124, 0, 'white' , 'forwards', 'set1');
    } else {
        createLetters(` ⟩ ${newText} ⟩ ${newText}`, 124, 0, 'white' , 'forwards','set1');
        createLetters(` ⟨ ${newText} ⟨ ${newText} ⟨ ${newText}`, 200, 0, 'white', 'backwards','set2');
    }
}

// updateText 関数を呼び出して特定のテキストを表示する
updateText('ようこそ謎へ　画面をタップしてください');

document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body');
    
    // タップされたときの処理を設定する
    body.addEventListener('touchstart', function() {
        // 別のHTMLページに移動する
        window.location.href = 'top.html';
    });
});
