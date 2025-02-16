from flask import Flask, render_template, request, jsonify, send_file
from models.gerador_jogos import GeradorJogos
import pandas as pd
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gerar_jogos', methods=['POST'])
def gerar_jogos():
    try:
        dados = request.get_json()
        quantidade = dados.get('quantidade', 1)
        grupos_selecionados = dados.get('grupos', [])
        tipo_jogo = dados.get('tipo', 'aleatorio')

        gerador = GeradorJogos()
        jogos = gerador.gerar_jogos(quantidade, grupos_selecionados, tipo_jogo)

        return jsonify({'success': True, 'jogos': jogos})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/download/<formato>')
def download(formato):
    try:
        jogos = request.args.get('jogos', '').split(',')
        jogos = [jogo.split('-') for jogo in jogos]
        
        if formato == 'txt':
            output = io.StringIO()
            for jogo in jogos:
                output.write(' '.join(jogo) + '\n')
            output.seek(0)
            return send_file(
                output,
                mimetype='text/plain',
                as_attachment=True,
                download_name='jogos.txt'
            )
            
        elif formato == 'xlsx':
            df = pd.DataFrame(jogos)
            output = io.BytesIO()
            df.to_excel(output, index=False, header=False)
            output.seek(0)
            return send_file(
                output,
                mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                as_attachment=True,
                download_name='jogos.xlsx'
            )
            
        else:  # html
            return render_template('jogos.html', jogos=jogos)
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)