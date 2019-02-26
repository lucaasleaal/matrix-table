function makechar() {
  var text = "";
  var possible = "材料フランスパンビスナガバゲットまたはミルクパン無塩バター大さじマヨネーズ大さじニンニク殻付きクローブパセリのみじん切りまたはバジルのみじん切り海老とパルメザンチーズのグリル味にエキストラバージンオリーブオイル準備モードスライスを分離せずにパンをストリップにカットしますそれを予約しなさい滑らかになるまでバターマヨネーズにんにくをブレンダーまたはプロセッサで叩きます選択したハーブを追加して簡単に叩きますにんにくの混合物をすべてのパンにふりかけたくさんのチーズとパルメザンを入れて黄金色になるまで180℃で焼く前菜としてやバーベキューに同行するために役立つ";

  return possible.charAt(Math.floor(Math.random() * possible.length));
}

celulas = 30;

base = '<table>';

conteudo = [];

for (var j = celulas - 1; j >= 0; j--) {
	base += '<tr>';
	conteudo[j] = [];
	for (var i = celulas - 1; i >= 0; i--) {
		base += '<td></td>';
		if (j==0){
			if (Math.random() >= 0.5){
				conteudo[j][i] = '<span class="first">'+makechar()+'</span>';
			}else{
				conteudo[j][i] = '';
			}
		}else{
			conteudo[j][i] = '';
		}
	}
	base += '</tr>';
}
base += '</table>';
document.getElementById("space").innerHTML = (base);

tdsr = document.querySelectorAll('td');

function adiciona(){ /*randomly starts new lines*/
	for (var j = celulas - 1; j >= 0; j--) {
		for (var i = celulas - 1; i >= 0; i--) {
			if (conteudo[0][j].length<2  && Math.random() >= 0.9&& Math.random() >= 0.9&& Math.random() >= 0.9){
				conteudo[0][j] = '<span class="first">'+makechar()+'</span>';
				tdsr[ (celulas*(j)) + i  ].innerHTML = (conteudo[j][i]);
			}
		}
	}
}

function atualiza(){ /*calculate and update the table*/
	for (var j = celulas - 1; j >= 0; j--) {
		for (var i = celulas - 1; i >= 0; i--) {
			if (typeof conteudo[j-1]!=="undefined" && conteudo[j-1][i].length>1){ /*there is a brother above*/
				if (typeof conteudo[j+1]!=="undefined" && conteudo[j+1][i].length>1){/*there is something below too*/
					if (conteudo[j+1][i].indexOf('first')>0){ /*it is a first one*/
						conteudo[j][i] = '<span class="second">'+makechar()+'</span>';
					}else if (conteudo[j+1][i].indexOf('second')>0){ /*it is a second one*/
						conteudo[j][i] = '<span class="third">'+makechar()+'</span>';
					}else{ /*it is a third/normal one*/
						conteudo[j][i] = '<span class="">'+makechar()+'</span>';
					}
				}else{/*there is nothing below*/
					if (j == celulas - 1){ /*this is the last row*/
						conteudo[j][i] = conteudo[j-1][i];
					}else{
						conteudo[j][i] = '<span class="first">'+makechar()+'</span>';
					}
				}
			}else if(j==0 && conteudo[j+1][i].length>1 && Math.random() >= 0.1){
				/*randomly feed the line (here you can "control" the size)*/
				conteudo[j][i] = '<span class="">'+makechar()+'</span>';
			}else{/*clear the line*/
				conteudo[j][i] = ' ';
			}

			// finally set the value
			tdsr[ (celulas*(j)) + i  ].innerHTML = (conteudo[j][i]);

		}
	}
}

setInterval(function(){
	atualiza();
},100);

setInterval(function(){
	adiciona();
},90);