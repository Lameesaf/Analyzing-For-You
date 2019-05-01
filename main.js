$(document).ready(function() {
    $('#stahp').hide()
    $('#convert-button').hide();
    $('.restart').hide()
    $('.speech').hide()
    $('.analyze-container').hide()



    let recorder = RecordRTC(MediaStream || HTMLElement, {});
    var text = ' fuck off  ';

    function speechToText() {
        $.ajax({

            url: "https://gateway-wdc.watsonplatform.net/speech-to-text/api/v1/recognize",
            method: "POST",
            data: $('#choose-button').prop('files')[0],
            processData: false,
            headers: {
                "Content-Type": "audio/webm",
            },
            success: function(result) {
                console.log(result.results[0].alternatives[0].transcript)
                $('.speech').show()
                $('.restart').show()
                $('#converted-speech').val(result.results[0].alternatives[0].transcript)
                $('#convert-button').hide();
                $('.audio').hide();
                $('#stahp').hide()
            },
            error: function() {
                console.log,
                    $('.speech').show()
                $('#converted-speech').text('There some error in the file')
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa('apikey:T5S_NZTysSFt8OYEkVGKAe0mnZ0ru0D2bEx8T1AJ8god'))
            }

        })
    }
    $('#analyze-button').on('click', function() {
        $('.analyze').empty();
        console.log($('#converted-speech').val());
        text = $('#converted-speech').val()
        toneAnalyzer()
    })

    function toneAnalyzer() {
        var url = "https://gateway-wdc.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=" + text

        $.ajax({
            url: url,
            method: "GET",
            success: function(result) {
                console.log(result.document_tone)
                $('.analyze-container').show()
                result.document_tone.tones.forEach(emotion => {
                    $('.analyze').append($('<p/>').attr('id', 'analyze').text(emotion.tone_name))
                });

            },
            error: function() {
                console.log
                $('.analyze-container').show()
                $('#analyze').text("there nothing clear to detrmine the feelings")

            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa('apikey:UppglsL0bxX_hVoqW9wuOYXAr6ZIj54yLpqMZKBidA0s'))
            }
        })
    }

    $('#choose-button').on('click', function() {
        $('#convert-button').show();
        $('#toneanalyzer').hide()


    })

    $('#start').on('click', function() {
        $('#stahp').show()
        $('#toneanalyzer').hide()
        navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true },
            video: false,
            audio: true
        }).then(async function(stream) {
            let recorder = RecordRTC(stream, {
                type: 'audio'
            });
            recorder.startRecording();

            $('#stahp').on('click', function() {
                recorder.stopRecording(function() {
                    let blob = recorder.getBlob();
                    invokeSaveAsDialog(blob);

                });

            })


        });
    })
    $('#newfile').on('click', function() {
        $('.audio').show();
        $('#toneanalyzer').show()
    })
    $('#toneanalyzer').on('click', function() {
        $('.speech').show()
    })

    $('#convert-button').on('click', function() {
        speechToText()

    })




})