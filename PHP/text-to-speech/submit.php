<?php

//Submit action: get speech from Google Api and save it in audio.mp3 file
convertAndDisplayAudio();

function convertAndDisplayAudio()
{
    if (isset($_POST['text'])) {
        $text = $_POST['text'];
        $text = htmlspecialchars($text);
        $text = rawurlencode($text);
        $audio = file_get_contents('https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&q=' . $text . '&tl=en');
        file_put_contents('audio.mp3', $audio);
        echo "<audio controls autoplay><source src='audio.mp3' type='audio/mpeg'/></audio>";
    }
}
