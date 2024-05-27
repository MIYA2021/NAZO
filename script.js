function toggleProfile() {
    var profile = document.getElementById('profile');
    profile.classList.toggle('show');
  }
  
  function generateProfile() {
    // ランダムなIDとパスワードを生成
    const id = generateRandomString(8);
    const password = generateRandomString(12);
  
    // 生成したIDとパスワードを表示
    document.getElementById('id').textContent = id;
    document.getElementById('password').textContent = password;
  
    // ローカルストレージに保存
    localStorage.setItem('profile', JSON.stringify({ id, password }));
  }
  
  // ランダムな文字列を生成する関数
  function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // ページ読み込み時に既存のプロフィールがあれば表示
  window.addEventListener('load', () => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      const { id, password } = JSON.parse(savedProfile);
      document.getElementById('id').textContent = id;
      document.getElementById('password').textContent = password;
    }
  });
  
  function submitAnswer() {
    var answer = document.getElementById('answer').value;
    var responseSpace = document.getElementById('response');
  
    // 回答が正解かどうかを判定
    if (answer === "雷") {
      responseSpace.textContent = "正解です！";
      showImage(); // 画像を表示する関数を呼び出す
    } else {
      responseSpace.textContent = "不正解です。もう一度挑戦してみてください。";
      freezeScreen(); // 画面をフリーズする関数を呼び出す
    }
  }
  
  function showImage() {
    var image = document.getElementById('resultImage');
    image.src = "q1.jpg"; // 正解画像のパスを設定
    image.style.display = "block"; // 画像を表示する
  }
  
  function freezeScreen() {
    // 画面をフリーズする
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // 半透明の黒色の背景
    overlay.style.zIndex = '9999';
    document.body.appendChild(overlay);
  
    // 2秒後にページを再読み込みする
    setTimeout(function() {
      location.reload();
    }, 2000);
  }
  