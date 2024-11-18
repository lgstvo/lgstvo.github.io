const char = (i) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: i }, () => chars[Math.floor(Math.random() * chars.length)]).join(' ').toUpperCase();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shuffle = async (line, nameLength, container) => {
    for (let x = 0; x < Math.random() * 4; x++) {
        container.textContent = char(nameLength);
        await sleep(100);
    }
    container.innerHTML = line;
};

const printBanner = async (name = "Luis Gustavo", version = "1.0.0", pos = "Cybersecurity Analyst", employer = "Pacific Sec") => {
    const bannerDiv = document.getElementById("banner");
    const bannerInfoDiv = document.getElementById("banner_info");
    const positionDiv = document.getElementById("pos");
    const versionDiv = document.getElementById("version");
    const contactDiv = document.getElementById("contact");
    const descriptionDiv = document.getElementById("description");
    const replayButton = document.getElementById("replayButton");

    descriptionDiv.style.display = "none";
    contactDiv.style.display = "none";
    bannerInfoDiv.style.display = "none";
    replayButton.style.display = "none";
    

    const linePadding = 2
    const nameLength = name.length + linePadding*2;
    const spacedName = name.toUpperCase().split("").join(" ");

    const formattedName = `${char(linePadding)} <span class="banner_name">${spacedName}</span> ${char(linePadding)}`;

    const lines = [
        char(nameLength),
        char(nameLength),
        formattedName,
        char(nameLength),
        char(nameLength)
    ];

    bannerDiv.innerHTML = "";

    for (const line of lines) {
        const lineDiv = document.createElement("div");
        lineDiv.innerHTML = line;
        lineDiv.classList.add("banner_text");
        bannerDiv.appendChild(lineDiv);
        await shuffle(line, nameLength, lineDiv);
    }

    positionDiv.classList.add("banner_text");
    versionDiv.classList.add("banner_text");

    positionDiv.innerHTML = `${pos} @ <a href="https://site.pacificsec.com/", target="_blank">${employer}</a>`;
    versionDiv.textContent = `Version: ${version}`;

    bannerInfoDiv.style.display = "block";
    replayButton.style.display = "block";

    await sleep(500);
    contactDiv.style.display = "block";
    await sleep(500);
    descriptionDiv.style.display = "block";
};

printBanner();

document.getElementById("replayButton").addEventListener("click", () => {
    printBanner();
});
