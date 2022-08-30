<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ _('Sťahujeme...') }}</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }
            .full-height {
                height: 100vh;
            }
            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }
            .position-ref {
                position: relative;
            }
            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }
            .content {
                text-align: center;
            }
            .title h1 {
                font-size: 84px;
                font-weight: 400;
                line-height: 100%;
                margin-bottom: 0;
            }
        </style>
        <script src="<?php echo admin_asset('/plugins/jQuery/jQuery-2.1.4.min.js') ?>"></script>
        <script type="text/javascript">
        $.ajax({
            url: '{{ route('ckfinder_downloader') }}',
            type: 'GET',
            success: function(data){
                window.location.reload();
            },
            error: function(data) {
                alert('{{ _('Ľutujeme, no balíček na nahrávanie fotiek sa nepodarilo stiahnuť. Kontaktuje prosím svojho administrátora.') }}');
            }
        });
        </script>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div class="content">
                <div class="title m-b-md">
                    <h1>Sťahujeme CKFinder...</h1>
                    <h3>Počkajte prosím, až sa sťahovanie dokončí, presmerujeme Vás na nahrávanie fotografii.</h3>
                </div>
            </div>
        </div>
    </body>
</html>