const ws = new WebSocket("wss://your-dosbox-x-server.com:8080");

// Загрузка модов
function uploadMods() {
    const files = document.getElementById("modFile").files;
    const mods = [];

    for (let file of files) {
        if (file.name.endsWith(".wad") || file.name.endsWith(".pk3")) {
            mods.push(file.name);
            // (Здесь можно добавить загрузку на сервер через FormData)
        }
    }

    // Отправка команды DOSBox-X
    ws.send(JSON.stringify({
        action: "run_doom",
        game: currentGame, // 'doom1' или 'doom2'
        mods: mods // ['ACE.WAD', 'GZDOOM.PK3']
    }));
}

// Получение стрима от сервера
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "stream") {
        document.getElementById("gameStream").innerHTML = 
            `<img src="data:image/jpeg;base64,${data.frame}" alt="DOOM Stream">`;
    }
};
