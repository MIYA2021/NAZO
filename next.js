function submitAnswer() {
    var answer = document.getElementById('answer').value.toLowerCase(); // 回答を小文字に変換する
    var responseSpace = document.getElementById('response');

    // 正解の回答リスト
    var correctAnswers = ["妹", "イモウト", "いもうと", ];

    // 回答が正解のリストに含まれているかどうかを判定
    if (correctAnswers.includes(answer)) {
        responseSpace.textContent = "正解です！";
        showImage(); // 画像を表示する関数を呼び出す
        showNextButton();
    } else {
        responseSpace.textContent = "不正解です。もう一度挑戦してみてください。";
        freezeScreen(); // 画面をフリーズする関数を呼び出す
    }
}
  
  function showImage() {
    var image = document.getElementById('resultImage');
    image.src = "/Users/miya/Documents/GitHub/NAZO/img/q2.jpg"; // 正解画像のパスを設定
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
  
  /*正解し次の問題へ行くボタン類 
  function showNextButton() {
    var nextButton = document.getElementById('nextButton');
    nextButton.style.display = "block"; // 次へのボタンを表示する
  }
*/

  /*今回使用していないが、以下のプログラムはボタンを押すとnext,htmlに飛ぶ仕組みになっている

document.getElementById("nextButton").addEventListener("click", function() {
  window.location.href = "next.html"; // next.htmlにリダイレクト
});
 使用するときは こめとスラッシュを削除                  */


/* 次へ押した後 クリアメッセージ

document.getElementById("nextButton").addEventListener("click", function() {
  var congratulationsMessage = document.getElementById("congratulationsMessage");
  congratulationsMessage.textContent = "テストプレイ!!クリアおめでとう!!"; // メッセージを表示する
});

*/
