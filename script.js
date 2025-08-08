document.getElementById("startBtn").addEventListener("click", () => {
    const text = document.getElementById("userContent").value.trim();
    if (!text) {
        alert("Please paste some content first!");
        return;
    }

    // Show scroll area with content
    document.querySelector(".container").classList.add("hidden");
    document.getElementById("scrollArea").innerHTML = `<p>${text.replace(/\n/g, "</p><p>")}</p>`;
    document.getElementById("scrollArea").classList.remove("hidden");
    document.querySelector(".status").classList.remove("hidden");

    startClapScroll();
});

function startClapScroll() {
    const status = document.querySelector('.status');
    const applause = new Audio('https://upload.wikimedia.org/wikipedia/commons/0/0e/Applause_2.ogg');
    const boo = new Audio('https://upload.wikimedia.org/wikipedia/commons/f/fd/Booing_crowd.ogg');

    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        status.textContent = '❌ Microphone access not supported in this browser';
        return;
    }

    // Check if we're on HTTPS
    if (location.protocol !== 'http:' && location.hostname !== 'localhost') {
        status.textContent = '❌ Microphone access requires HTTPS. Please use a secure connection.';
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const mic = audioCtx.createMediaStreamSource(stream);
        mic.connect(analyser);
        const dataArray = new Uint8Array(analyser.fftSize);

        function getVolume() {
            analyser.getByteTimeDomainData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                let val = (dataArray[i] - 128) / 128;
                sum += val * val;
            }
            return Math.sqrt(sum / dataArray.length);
        }

        function loop() {
            const vol = getVolume();

            if (vol > 0.15) {
                const scrollAmount = vol * 500;
                window.scrollBy({ top: scrollAmount, behavior: 'smooth' });

                if (scrollAmount > 100) {
                    applause.currentTime = 0;
                    applause.play();
                    status.textContent = `👏 Strong clap! (+${Math.round(scrollAmount)}px)`;
                } else {
                    boo.currentTime = 0;
                    boo.play();
                    status.textContent = `😒 Weak clap (+${Math.round(scrollAmount)}px)`;
                }
            }
            requestAnimationFrame(loop);
        }

        loop();
    }).catch(err => {
        console.error('Microphone access error:', err);
        
        if (err.name === 'NotAllowedError') {
            status.textContent = '❌ Microphone access denied. Please allow microphone permissions and refresh the page.';
        } else if (err.name === 'NotFoundError') {
            status.textContent = '❌ No microphone found. Please connect a microphone and try again.';
        } else if (err.name === 'NotSupportedError') {
            status.textContent = '❌ Microphone not supported in this browser.';
        } else {
            status.textContent = '❌ Microphone access error: ' + err.message;
        }
    });
}
