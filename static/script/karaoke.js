var aud = document.getElementById('audio-karaoke');
var karaoke = document.getElementById('karaoke');
var nIndex = 0;
var startTime, endTime = 0;
var karaText, karaTextHighlight;

var audInterval;

var words = [
  ['Đêm nghe hạt mưa rơi', 23.516146, 25.81885], // 0
  ['Lòng chợt nhớ em vô cùng', 26, 30.344052], // 1
  ['Chuyện tình ngày ấy không sao quên được', 32.214654, 37.483969], // 2
  ['Giờ hai ta ở hai nơi', 40.39815, 42.47749], // 3
  ['Lòng người có nghĩ đến bao giờ?', 43, 49], // 4
  ['Lúc trước anh ra đi là có lý do.', 49, 55], // 5
  ['Nếu biết trước tương lai anh đã chẳng yêu em,', 57, 61], // 6
  ['Nhưng con tim anh đây thật không sao quên được em người ơi.', 61, 65], // 7
  ['Nước mắt đã rơi vì nhớ em mong em trong từng đêm vắng,', 65, 69], // 8
  ['Mong cho em luôn được hạnh phúc nơi phương trời xa.', 70, 74], // 9
  ['Gọi tên em trong đêm,', 74, 77], // 10
  ['Trái tim này xót xa.', 77, 78], // 11
  ['Người yêu ơi hãy quên những năm tháng êm đềm hôm nào.', 79, 82], // 12
  ['Gọi tên em trong đêm để mình anh chịu nỗi đắng cay,', 83, 87], // 13
  ['Một thế giới khác mang anh đi, chẳng thể nào có em.', 88, 93], // 14
  ['Gọi tên em trong đêm,', 94, 96], // 15
  ['Sẽ chẳng thể có nhau.', 96, 98], // 16
  ['Tình duyên ta thế thôi, chắc có lẽ đã được an bài.', 98, 102], // 17
  ['Gọi tên em trong đêm để mình anh chịu nỗi đớn đau,', 102, 106], // 18
  ['Một thế giới khác mang anh đi, chia đôi tình chúng ta.', 107, 113], // 19
  ['Cách xa hai phương trời!', 113, 118], // 20
];

aud.addEventListener('play', function() {
  audInterval = setInterval(function() {
    if ((aud.currentTime - startTime) >= 0) {
      var duration = endTime - startTime;
      if (endTime - aud.currentTime > 0) {
        var ratio = ((100 / duration) * (endTime - aud.currentTime)) - 100;
        karaTextHighlight.style.width = ratio * -1 + '%';
      } else {
        nIndex++;
        nextWord(nIndex);
      }
    }
  }, 1000 / 60);
});

aud.addEventListener('pause', function() {
  clearInterval(audInterval);
});

aud.addEventListener('seeked', function() {
  nIndex = findWordIndex();
  if (!words[nIndex]) {
    return;
  }

  nextWord(nIndex);
});

var nextWord = function(index) {
  if (!words[nIndex]) {
    return;
  }

  var word = words[index];
  console.log("index: ", index);
  console.log("word: ", word);

  karaText.textContent = word[0];
  karaTextHighlight.textContent = word[0];
  karaTextHighlight.style.width = '0%';

  startTime = word[1];
  endTime = word[2];

}

var findWordIndex = function() {
  if (aud.currentTime === 0) {
    return 0;
  }
  for (var i = 0; i < words.length; i++) {
    if (aud.currentTime >= words[i][1] && aud.currentTime <= words[i][2]) {
      return i;
    } else if (words[i][1] >= aud.currentTime) {
      return i;
    }
  }
  return words.length;
}

var init = function() {
  var word = words[0];

  karaText = document.createTextNode(word[0]);

  var karaTextLine = document.createElement('div');
  karaTextLine.classList.add('kara-text');

  karaTextHighlight = document.createElement('div');
  karaTextHighlight.classList.add('kara-text-highlight');
  karaTextHighlight.textContent = word[0];
  karaTextHighlight.style.width = '0%';

  karaTextLine.appendChild(karaText);
  console.log("karaText: ", karaText)
  karaTextLine.appendChild(karaTextHighlight);
  console.log("karaTextHighlight: ", karaTextHighlight)

  karaoke.appendChild(karaTextLine);
  console.log("karaTextLine: ", karaTextLine)

  startTime = word[1];
  endTime = word[2];
}

init();

// tell the embed parent frame the height of the content
if (window.parent && window.parent.parent){
window.parent.parent.postMessage(["resultsFrame", {
  height: document.body.getBoundingClientRect().height,
  slug: "k7z2086g"
}], "*")
}

// always overwrite window.name, in case users try to set it manually
window.name = "result"