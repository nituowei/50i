# app.py
from flask import Flask, render_template, request, jsonify
import json


# 创建 Flask 应用实例
app = Flask(__name__)

# 加载五十音数据
with open('hiragana.json', 'r', encoding='utf-8') as f:
    hiragana_data = json.load(f)
print(hiragana_data)
@app.route('/')
def index():
    # 渲染主页
    return render_template('index.html')

@app.route('/get_hiragana_data')
def get_hiragana_data():
    # 提供五十音数据的API
    return jsonify(hiragana_data)

@app.route('/review')
def review():
    # 渲染复习页面
    return render_template('review.html')

@app.route('/get_romanization')
def get_romanization():
    kana = request.args.get('kana')
    romanization = hiragana_data.get(kana, '')  # 直接使用字典键来获取罗马音值
    return jsonify({'romanization': romanization})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
