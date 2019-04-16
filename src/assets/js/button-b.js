'use strict';

{
  // 必要な要素を変数化
  const $button = $('#button-b');
  const $counter = $('#button-b-counter');

  // カウンターの初期値をinput要素から取得
  let count = parseInt($counter.val());

  // ボタン押下時に対応したinputのカウントを1ずつ足していく
  $button.on('click', () => {
    count++;
    $counter.val(count);
  });
}