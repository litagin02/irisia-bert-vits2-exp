const scripts = {
  hello: "こんにちは、初めまして。あなたの名前はなんていうの？",
  kokuhaku:
    "私、ずっと前からあなたのことを見てきました。あなたの笑顔、優しさ、強さに、心惹かれていたんです。<br>友達として過ごす中で、あなたのことがだんだんと特別な存在になっていくのがわかりました。<br>えっと、私、あなたのことが好きです！もしよければ、私と付き合ってくれませんか？",
  neko: "吾輩は猫である。名前はまだ無い。<br>どこで生れたかとんと見当がつかぬ。なんでも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。<br>吾輩はここで始めて人間というものを見た。しかもあとで聞くと、それは書生という、人間中で一番獰悪な種族であったそうだ。<br>この書生というのは時々我々を捕まえて煮て食うという話である。<br>（夏目漱石『吾輩は猫である』）",
  sakura:
    "桜の樹の下には屍体が埋まっている！これは信じていいことなんだよ。<br>何故って、桜の花があんなにも見事に咲くなんて信じられないことじゃないか。俺はあの美しさが信じられないので、このにさんにち不安だった。<br>しかしいま、やっとわかるときが来た。桜の樹の下には屍体が埋まっている。これは信じていいことだ。<br>（梶井基次郎『桜の樹の下には』）",
  kanjou:
    "やったー！テストで満点取れたよ！私とっても嬉しいな！<br>どうして私の意見を無視するの？許せない！ムカつく！あんたなんか死ねばいいのに。<br>あはははっ！この漫画めっちゃ笑える、見てよこれ、ふふふ、あはは。<br>あなたがいなくなって、私は一人になっちゃって、泣いちゃいそうなほど悲しい。",
  kanjou2:
    "やりました！テストで満点取れましたよ！私とっても嬉しいです！<br>どうして私の意見を無視するんですか？許せません！ムカつきます！あんたなんか死んでください。<br>あはははっ！この漫画めっちゃ笑えます、見てくださいこれ、ふふふ、あはは。<br>あなたがいなくなって、私は一人になっちゃって、泣いちゃいそうなほど悲しいです。",
  explain:
    "音声合成は、機械学習を活用して、テキストから人の声を再現する技術です。この技術は、言語の構造を解析し、それに基づいて音声を生成します。<br>この分野の最新の研究成果を使うと、より自然で表現豊かな音声の生成が可能である。深層学習の応用により、感情やアクセントを含む声質の微妙な変化も再現することが出来る。",
};

// イベントハンドラに要素のIDを渡す
document.getElementById("steps1").addEventListener("change", function () {
  updateAudioPlayers("steps1");
});
document.getElementById("steps2").addEventListener("change", function () {
  updateAudioPlayers("steps2");
});
document.getElementById("playbackType").addEventListener("change", function () {
  updateAudioPlayers("playbackType");
  const playbackType = this.value;
  const sample2 = document.getElementById("sample2");
  sample2.style.display = playbackType === "compare" ? "block" : "none";
});
document.getElementById("scriptSelect").addEventListener("change", function () {
  updateAudioPlayers("scriptSelect");
});

// オーディオプレイヤーを更新する関数に要素のIDを引数として追加
function updateAudioPlayers(triggerElementId) {
  const script = document.getElementById("scriptSelect").value;
  const steps1 = document.getElementById("steps1").value;
  const steps2 = document.getElementById("steps2").value;

  // オーディオ1を更新する必要があるか判断
  if (triggerElementId === "steps1" || triggerElementId === "scriptSelect") {
    const audioFilePath1 = "audios/irisia-" + steps1 + "k-" + script + ".wav";
    const audioPlayer1 = document.getElementById("audio1");
    audioPlayer1.src = audioFilePath1;
    audioPlayer1.load();
    audioLink1.href = audioFilePath1; // リンクを更新
    audioLink1.textContent = "Current File: " + audioFilePath1; // リンクテキストを更新
  }

  // オーディオ2を更新する必要があるか判断（再生タイプが比較の場合のみ）
  if (
    triggerElementId === "steps2" ||
    triggerElementId === "playbackType" ||
    triggerElementId === "scriptSelect"
  ) {
    if (document.getElementById("playbackType").value === "compare") {
      const audioFilePath2 = "audios/irisia-" + steps2 + "k-" + script + ".wav";
      const audioPlayer2 = document.getElementById("audio2");
      audioPlayer2.src = audioFilePath2;
      audioPlayer2.load();
      audioLink2.href = audioFilePath2; // リンクを更新
      audioLink2.textContent = "Current File: " + audioFilePath2; // リンクテキストを更新
    }
  }
}

window.onload = function () {
  const scriptSelect = document.getElementById("scriptSelect");
  for (const script in scripts) {
    const option = document.createElement("option");
    option.value = script;
    option.textContent = script;
    scriptSelect.appendChild(option);
  }
  const stepOptions = [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34,
  ];
  const steps1Select = document.getElementById("steps1");
  const steps2Select = document.getElementById("steps2");
  stepOptions.forEach((step) => {
    steps1Select.options.add(
      new Option(
        step + "k ステップ（約" + (step * 2.886).toFixed(2) + "エポック）",
        step
      )
    );
    steps2Select.options.add(
      new Option(
        step + "k ステップ（約" + (step * 2.886).toFixed(2) + "エポック）",
        step
      )
    );
  });

  updateScriptContent("hello");
  updateAudioPlayers("steps1");
};

// 再生タイプ変更の処理
document.getElementById("playbackType").addEventListener("change", function () {
  const playbackType = this.value;
  const sample2 = document.getElementById("sample2");
  sample2.style.display = playbackType === "compare" ? "block" : "none";
});

// スクリプト選択時のイベントリスナーを追加
document.getElementById("scriptSelect").addEventListener("change", function () {
  updateScriptContent(this.value);
});

// 原稿内容表示の更新関数
function updateScriptContent(script) {
  // ここで実際の原稿の内容を提供する必要があります
  document.getElementById("selectedScript").innerHTML = scripts[script];
}
