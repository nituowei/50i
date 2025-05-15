//let selectedKana = JSON.parse(localStorage.getItem('selectedKana'));
//let currentIndex = -1;  // 初始索引
//const hiraganaDisplay = document.getElementById('hiraganaDisplay');

function showRandomKana() {
    let selectedKana = JSON.parse(localStorage.getItem('selectedKana'));
    console.log('Selected Kana:', selectedKana); // 查看所选假名

    if (selectedKana && selectedKana.length > 0) {
        const randomIndex = Math.floor(Math.random() * selectedKana.length);
        currentIndex = randomIndex;
        hiraganaDisplay.textContent = selectedKana[randomIndex];
        console.log('Displaying:', selectedKana[randomIndex]); // 查看当前显示的假名
    } else {
        console.log('No Kana selected or empty list'); // 如果没有选择假名或列表为空
    }
}


// 显示并自动关闭罗马音弹窗的函数
function showRomajiPopup(romajiText) {
    var popup = document.getElementById('romajiPopup');
    popup.innerText = romajiText; // 设置罗马音内容
    popup.style.display = 'block'; // 显示弹窗

    // 设置定时器，在1秒后关闭弹窗
    setTimeout(function() {
        popup.style.display = 'none';
    }, 1000); // 1000毫秒 = 1秒
}

document.getElementById('nextBtn').addEventListener('click', showRandomKana);

document.getElementById('romanBtn').addEventListener('click', () => {
    // 显示罗马音
    if (currentIndex >= 0) {
        fetch(`/get_romanization?kana=${selectedKana[currentIndex]}`)
            .then(response => response.json())
            .then(data => {
                showRomajiPopup(data.romanization);  // 使用弹窗函数显示罗马音
            });
    }
});

document.getElementById('backBtn').addEventListener('click', () => {
    // 返回主页
    window.location.href = '/';
});

document.addEventListener('DOMContentLoaded', function() {
    showRandomKana(); // 调用函数以显示随机假名
    // ... 其他事件监听器
});


// 初始显示一个随机音素
showRandomKana();
