const https = require('https');

function translate(text) {
    return new Promise((resolve, reject) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    let translatedText = '';
                    if (json[0]) {
                        json[0].forEach(part => {
                            if (part[0]) translatedText += part[0];
                        });
                    }
                    resolve(translatedText);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

translate("Hello world, this is a test.").then(console.log).catch(console.error);
