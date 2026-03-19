import os
import requests
import time
from flask import Flask
import threading

app = Flask(__name__)
TOKEN = "8688079171:AAFJJNcqaemNsny7XNd3d1v5xS8lrxn9kpA"

@app.route('/')
def home():
    return "Bot işləyir!"

def bot():
    last = 0
    URL = f"https://api.telegram.org/bot{TOKEN}"
    while True:
        try:
            r = requests.get(f"{URL}/getUpdates", params={"offset": last, "timeout": 30})
            for u in r.json().get("result", []):
                last = u["update_id"] + 1
                chat = u["message"]["chat"]["id"]
                text = u["message"].get("text", "")
                if text == "/start":
                    requests.post(f"{URL}/sendMessage", json={"chat_id": chat, "text": "Salam! Render-də işləyirəm!"})
                elif text == "/kupon":
                    requests.post(f"{URL}/sendMessage", json={"chat_id": chat, "text": "🎰 Kupon: Efes @1.85, Qarabağ @1.90, Djokovic @1.75"})
                else:
                    requests.post(f"{URL}/sendMessage", json={"chat_id": chat, "text": f"Sən yazdın: {text}"})
            time.sleep(1)
        except:
            time.sleep(5)

threading.Thread(target=bot).start()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
