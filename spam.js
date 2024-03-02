const fetch = require('node-fetch'); //use this | npm install node-fetch@^2.6.6
const ask = require("prompt-sync")();
const fs = require("fs");

function saveing (tocr, chatie) {
    const savedata = `{"token":"${tocr}","chatid":"${chatie}"}`;
    fs.writeFileSync("tele-save.json", savedata);
}

function MenuUtama (msg) {
    console.clear()
    console.log(msg)
    const tokes1 = ask("[1] Token Bot Telegram [https://api.telegram.org/(TOKEN)/] | [2] Pakai tele-save.json (Jika ada) > ");
    var tokes = "";
    if (tokes1 == 1) {
        const tokse = ask("Token Bot Telegram [https://api.telegram.org/(TOKEN)/] > ")
        tokes = tokse;
    } else if (tokes1 == 2) {
        if (!fs.existsSync("./tele-save.json")) {
            return MenuUtama("System tidak menemukan tele-save.json")
        }
        var telesave = require("./tele-save.json");
        tokes = telesave.token;
    } else {
        return MenuUtama("Wrong Answer!");
    }
    const chetit1 = ask("[1] Chat ID | [2] Pakai tele-save.json (Jika Ada) > ");
    var chetit = "";
    if (chetit1 == 1) {
        const cheteid = ask("Chat ID > ")
        chetit = cheteid;
    } else if (chetit1 == 2) {
        if (!fs.existsSync("./tele-save.json")) {
            return MenuUtama("System tidak menemukan tele-save.json")
        }
        var telesave2 = require("./tele-save.json");
        chetit = telesave2.chatid;
    } else {
        return MenuUtama("Wrong Answer!")
    }
    const meseg = ask("[1] Pesan Random | [2] Pesan Custom > ")
    if (isNaN(meseg)) {
        console.log("Hanya Menerima angka!")
        return MenuUtama("Hanya Menerima angka!");
    }
    const SendType = ask("[1] Sekali Kirim Message | [2] Spam Message dengan Jumlah Pilihan > ")
    if (isNaN(SendType)) {
        console.log("Hanya Menerima angka!")
        return MenuUtama("Hanya Menerima angka!");
    }
    if (SendType == 1) {
        if (meseg == 1) {
            spammeg(tokes, chetit, "Halo Sayang")
        } else if (meseg == 2) {
            const meseg1 = ask("Pesan > ")
            spammeg(tokes, chetit, meseg1)
        } else {
            console.log("Wrong Answer!")
            return MenuUtama("Wrong Answer!");
        }
    } else if (SendType == 2) {
        const SpamAmount = ask("Berapa Message yang ingin anda kirim? (99999) > ")
        if (isNaN(SpamAmount)) {
            console.log("Hanya Menerima angka!")
            return MenuUtama("Hanya Menerima angka!");
        }
        if (meseg == 1) {
            spammeg1(tokes, chetit, "Halo Sayang", SpamAmount)
        } else if (meseg == 2) {
            const meseg1 = ask("Pesan > ")
            spammeg1(tokes, chetit, meseg1, SpamAmount)
        } else {
            console.log("Wrong Answer!")
            return MenuUtama("Wrong Answer!");
        }
    } else {
        console.log("Wrong Answer!")
        return MenuUtama("Wrong Answer!");
    }
}


MenuUtama("Welcome Sir...")

var berapa = 0;

function spammeg (token, chatid, message) { 
    const lmaokang = async () => {
        const response = await fetch("https://api.telegram.org/" + token + "/sendMessage?parse_mode=markdown&chat_id=" + chatid + "&text=" + message)
        const parseJs = await response.json();
        if (response.status == 404) {
            console.log("Request Gagal, (Reason) invalid token / ChatID");
            const oksok = ask("Ketik [1] Untuk Mengulangi | [2] Untuk Keluar > ")
            if (isNaN(oksok)) {
                console.log("Hanya Menerima angka!")
                return;
            }
            if (oksok == 1) {
                return MenuUtama("Welcome Sir...");
            } else if (oksok == 2) {
                return;
            }
        } else {
            console.log("Kirim Pesan Berhasil")
            var statsdsd = "";
            if (parseJs.ok == true) {
                statsdsd = "Berhasil";
            } else {
                statsdsd = "Gagal";
            }
            const resultsd = parseJs.result;
            console.log(resultsd.message_id)
            saveing(token, chatid)
        }
    }
    
    lmaokang()
}

function spammeg1 (token, chatid, message, SpamAmount) { 
    const lmaokang1 = async () => {
        const response = await fetch("https://api.telegram.org/" + token + "/sendMessage?parse_mode=markdown&chat_id=" + chatid + "&text=" + message)
        const parseJs = await response.json();
        if (response.status == 404) {
            console.log(token + " us" + chatid)
            console.log("Request Gagal, (Reason) invalid token / ChatID");
        } else {
            var statsdsd = "";
            if (parseJs.ok == true) {
                statsdsd = "Berhasil";
            } else {
                statsdsd = "Gagal";
            }
            const resultsd = parseJs.result;
            console.log("[" + berapa + "] Pesan Terkirim! (Message ID : " + resultsd.message_id +" )")
            saveing(token,chatid)
        }
    }
    setInterval( function () {
        if (berapa >= SpamAmount) {
            console.log("Spam Message Selesai, Total Pesan Terkirim " + SpamAmount);
            const oksok = ask("Ketik [1] Untuk Mengulangi | [2] Untuk Keluar > ")
            if (isNaN(oksok)) {
                console.log("Hanya Menerima angka!")
                return;
            }
            if (oksok == 1) {
                return MenuUtama("Welcome Sir...");
            } else if (oksok == 2) {
                return;
            }
        }
        berapa += 1;
        lmaokang1()
    }, 300); //Ganti ini ke 30-50, Jika ingin membuat Bot kena Rate Limit
}
