// ==UserScript==
// @name       ShanbayAutoReader
// @namespace  ShanbayAutoReader
// @version    0.4.5
// @description ShanbayAutoReader
// @match      http://shanbay.com/bdc/learnings/library/*
// @match      http://www.shanbay.com/bdc/learnings/library/*
// @copyright  2015 chg-hou
// ==/UserScript==
PAUSE_FLAG = 0;
page_header = document.getElementsByClassName('nav nav-pills')[0];

new_play_button = '<button id="playbutton" type="button" onclick=\'if(PAUSE_FLAG>0){PAUSE_FLAG=0;}else{PAUSE_FLAG=1; }\'>Play/Pause</button>'
//document.getElementById("playbutton").textContent

switch_button = "<div>\
<input type='checkbox' id='switch2' name='switch2' class='switch' checked='checked' onclick=\'if(PAUSE_FLAG>0){PAUSE_FLAG=0;}else{PAUSE_FLAG=1; }\' />\
<label for='switch2'>Auto play</label>\
</div>"

switch_css = "input.switch:empty\
{\
margin-left: -999px;\
}\
\
input.switch:empty ~ label\
{\
position: relative;\
float: left;\
line-height: 1.6em;\
text-indent: 4em;\
margin: 0.2em 0;\
cursor: pointer;\
-webkit-user-select: none;\
-moz-user-select: none;\
-ms-user-select: none;\
user-select: none;\
}\
\
input.switch:empty ~ label:before, \
input.switch:empty ~ label:after\
{\
position: absolute;\
display: block;\
top: 0;\
bottom: 0;\
left: 0;\
content: ' ';\
width: 3.6em;\
background-color: #c33;\
border-radius: 0.3em;\
box-shadow: inset 0 0.2em 0 rgba(0,0,0,0.3);\
-webkit-transition: all 100ms ease-in;\
transition: all 100ms ease-in;\
}\
\
input.switch:empty ~ label:after\
{\
width: 1.4em;\
top: 0.1em;\
bottom: 0.1em;\
margin-left: 0.1em;\
background-color: #fff;\
border-radius: 0.15em;\
box-shadow: inset 0 -0.2em 0 rgba(0,0,0,0.2);\
}\
\
input.switch:checked ~ label:before\
{\
background-color: #393;\
}\
\
input.switch:checked ~ label:after\
{\
margin-left: 2.1em;\
}"

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle(switch_css);

page_header.outerHTML = page_header.outerHTML +  switch_button;
//page_header.outerHTML = page_header.outerHTML + new_play_button + switch_button;

function play_en_audio()
{
    setTimeout(play_cn_audio, 3000);
    /*words = document.querySelectorAll('div.learning');
	word = words[0];*/
    word_info = word.getElementsByClassName('wordinfo')[0];
    word_info.querySelector('i.icon-volume-off').click();
    audio_url_1 = word_info.getAttribute('audio_0');
    word_str = word.getElementsByClassName('word')[0].textContent;
    definition = word.getElementsByClassName('definition')[0].textContent;
    //chinese_audio = definition.match(/([\u4e00-\u9fa5]+,,)+[\u4e00-\u9fa5]+/g);
    // chinese_audio = definition.match(/([\u4e00-\u9fa5]+\.\.\.)+[\u4e00-\u9fa5]+/g);
    //chinese_audio = definition.match(/[\u4e00-\u9fa5\.]{2,}/g);
    chinese_audio = definition.match(/[\u4e00-\u9fa5\.、)]{2,}/g);
    if(  chinese_audio == null){chinese_audio = definition.match(/[\u4e00-\u9fa5]+/g)[0];}
    else{chinese_audio=chinese_audio[0];}
    //audio_url_2 = 'http://translate.google.com/translate_tts?tl=zh&q='+encodeURIComponent(chinese_audio);
    /* 
    soundManager.createSound({
        id: word_str,
        url: audio_url_1
    }).play();
    */
}
function play_cn_audio()
{
    /*soundManager.createSound({
      id: word_str+'_CN_',
      url: audio_url_2
    }).play();*/
    var ssu = new SpeechSynthesisUtterance();
    ssu.text = chinese_audio;
    ssu.lang= 'zh-CN';
    speechSynthesis.speak(ssu)
}
function speak_words()
{    
    if (PAUSE_FLAG>0)
    {
        setTimeout(speak_words , 1000);
        //document.getElementById("playbutton").textContent="Play";
        return;}
    else
    {
        setTimeout(speak_words , 6000);
        //document.getElementById("playbutton").textContent="Pause";
    }

    span_pronunciations = document.querySelectorAll('span.pronunciation');
    [].forEach.call(span_pronunciations, function(span_pronunciations){
        span_pronunciations.setAttribute('onclick',"jQuery(this).parent().parent().remove()");
    });

    span_words = document.querySelectorAll('span.word');
    [].forEach.call(span_words, function(span_word){
        span_word.setAttribute('onclick1',"jQuery(this).dblclick();");
    });

    words = document.querySelectorAll('div.learning');
    temp_i = 100*Math.random();
    for(i=0;i<temp_i;i=i+1 )
    {    Math.random();
    }
    words_counter = Math.floor(Math.random() * words.length);
    word = words[words_counter];
    
    word_str = word.getElementsByClassName('word')[0].textContent;
    pronunciation = word.getElementsByClassName('pronunciation')[0].textContent;
    definition = word.getElementsByClassName('definition')[0].textContent;
    
    document.title = word_str + definition ;//+ pronunciation + definition;
    
    word_parent = word.parentNode;
    word_parent.removeChild(word);
    word_parent.insertBefore(word,word_parent.children[0]);

    play_en_audio();

}

setTimeout(speak_words , 2000);
