export function htmlMailer(code: string): string {

    return `
    <html lang='es'>
  <head>
    <meta charset='UTF-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Verificación de Código</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #101828;
        background-color: #FFFFFF;
      }
      .header {
        background-color: #4f14a0;
        height: 100px;
        text-align: center;
      }
      .header a {
        display: inline-block;
        height: 100%;
      }
      .header img {
        max-width: 100px;
        height: auto;
        vertical-align: middle;
      }
      .content {
        background-color: #FFFFFF;
        padding-top: 50px;
        padding-bottom: 50px;
        text-align: center;
      }
      .box {
        background-color: white;
        padding: 30px;
        width: 80%;
        max-width: 500px;
        margin: 20px auto; /* Añadido margen superior e inferior */
        border: 1px solid #F2F4F7;
        border-radius: 12px;
      }
      .verification-code {
        display: inline-block;
        margin: 0 auto auto auto;
      }
      .verification-code div {
        width: 40px;
        height: 40px;
        border: 1px solid #4f14a0;
        margin: 5px 2px;
        text-align: center;
        vertical-align: middle;
        font-size: 24px;
        line-height: 40px;
        border-radius: 12px;
        display: inline-block; /* Change to inline-block */
      }
      .footer {
        text-align: center;
        color: #667085;
        padding-top: 30px;
      }
      .footer a {
        color: #667085;
        font-weight: bold;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class='header'>
      <a href='https://www.tuapp.com'>
        <img
          src='https://i.ibb.co/Mg571G2/Group.png'
          alt='Logo'
        />
      </a>
    </div>
    <div class='content'>
      <div class='box'>
        <h1 style='margin: 0px; padding-bottom: 25px; color: #4f14a0; text-align: center;'>
          Código de Verificación
        </h1>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Por favor, introduce el siguiente código de verificación en la aplicación para continuar con el proceso:</p>

        <div class='verification-code'>
          <div>${code[0]}</div>
          <div>${code[1]}</div>
          <div>${code[2]}</div>
          <div>${code[3]}</div>
        </div>

        <p>Si no has solicitado esto, por favor ignora este correo. De lo contrario, utiliza el código para restablecer tu contraseña.</p>

        <p>Saludos,</p>
        <p>-El equipo de <span style="color:#4f14a0">Alpha Team</span></p>
      </div>

    </div>
  </body>
</html>
    `
}