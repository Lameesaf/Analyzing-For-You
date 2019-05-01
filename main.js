$(document).ready(function() { 

    let recorder = RecordRTC(MediaStream || HTMLElement, {});
    var text = ' several tornadoes touch down as a line of severe thunderstorms swept through Colorado on Sunday  ';

    function speechToText() {
        $.ajax({

            url: "https://gateway-wdc.watsonplatform.net/speech-to-text/api/v1/recognize",
            method: "POST",
            data: ($('#choose-button').prop('files')[0] || recorder.getBlob()),
            processData: false,
            headers: {
                "Content-Type": "audio/webm",
            },
            success: function(result) {
                console.log(result.results[0].alternatives[0].transcript)
                text = result.results[0].alternatives[0].transcript;
                // text = 'fuck off'
                toneAnalyzer();
            },
            error: console.log,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa('apikey:T5S_NZTysSFt8OYEkVGKAe0mnZ0ru0D2bEx8T1AJ8god'))
            }

        })
    }

    function toneAnalyzer() {
        var url = "https://gateway-wdc.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=" + text

        $.ajax({
            url: url,
            method: "GET",
            success: function(result) {
                console.log(result.document_tone.tones[0].tone_name)
                    // console.log(result)
            },
            error: console.log,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa('apikey:UppglsL0bxX_hVoqW9wuOYXAr6ZIj54yLpqMZKBidA0s'))
            }
        })
    }

    $('#newfile').on('click', function() {


        navigator.mediaDevices.getUserMedia({
          audio: {echoCancellation:true},
            video: false,
            audio: true
        }).then(async function(stream) {
            let recorder = RecordRTC(stream, {
                type: 'audio'
            });
            recorder.startRecording();

            // const sleep = m => new Promise(r => setTimeout(r, m));
            // await sleep(10000);
            $('#stahp').on('click', function() {
                // sleep(0)
                recorder.stopRecording(function() {
                    let blob = recorder.getBlob();
                    invokeSaveAsDialog(blob);

                });
                console.log(recorder.getBlob())
                    // speechToText();
            })


        });
    })



    $('#convert-button').on('click', function() {
        // speechToText($('<input>').files[0])
        speechToText()
    })




})