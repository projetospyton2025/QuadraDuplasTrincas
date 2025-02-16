import random
from typing import List, Dict
from itertools import combinations

class GeradorJogos:
    def __init__(self):
        self.grupos = {
            1: {'quadra': [(1, 11, 21, 31)]},
            2: {
                'trinca': [(2, 12, 22)],
                'duplas': list(combinations([2, 12, 22], 2))
            },
            3: {
                'trinca': [(3, 13, 23)],
                'duplas': list(combinations([3, 13, 23], 2))
            },
            4: {
                'trinca': [(4, 14, 24)],
                'duplas': list(combinations([4, 14, 24], 2))
            },
            5: {
                'trinca': [(5, 15, 25)],
                'duplas': list(combinations([5, 15, 25], 2))
            },
            6: {
                'trinca': [(6, 16, 26)],
                'duplas': list(combinations([6, 16, 26], 2))
            },
            7: {
                'trinca': [(7, 17, 27)],
                'duplas': list(combinations([7, 17, 27], 2))
            },
            8: {
                'trinca': [(8, 18, 28)],
                'duplas': list(combinations([8, 18, 28], 2))
            },
            9: {
                'trinca': [(9, 19, 29)],
                'duplas': list(combinations([9, 19, 29], 2))
            },
            10: {
                'trinca': [(10, 20, 30)],
                'duplas': list(combinations([10, 20, 30], 2))
            }
        }

    def _combinar_numeros(self, numeros_base: List[int], quantidade_faltante: int) -> List[int]:
        """Completa o jogo com números aleatórios até 7 dezenas."""
        numeros_disponiveis = list(set(range(1, 31)) - set(numeros_base))
        numeros_complementares = random.sample(numeros_disponiveis, quantidade_faltante)
        return sorted(numeros_base + numeros_complementares)

    def gerar_jogos(self, quantidade: int, grupos_selecionados: List[Dict], tipo_jogo: str = 'aleatorio') -> List[List[int]]:
        """Gera jogos baseados nos grupos e tipos selecionados."""
        jogos = []
        
        for _ in range(quantidade):
            numeros_base = []
            
            # Se grupos foram especificamente selecionados
            if grupos_selecionados:
                for grupo in grupos_selecionados:
                    grupo_num = grupo['grupo']
                    tipo = grupo['tipo']
                    
                    if tipo == 'quadra' and grupo_num == 1:
                        numeros_base.extend(self.grupos[1]['quadra'][0])
                    elif tipo == 'trinca':
                        numeros_base.extend(self.grupos[grupo_num]['trinca'][0])
                    elif tipo == 'dupla':
                        dupla = random.choice(self.grupos[grupo_num]['duplas'])
                        numeros_base.extend(dupla)
            
            # Se não há seleção específica ou precisa completar
            while len(numeros_base) < 7:
                grupo_disponivel = random.choice(list(self.grupos.keys()))
                if grupo_disponivel == 1:
                    if len(numeros_base) <= 3:  # Só adiciona quadra se houver espaço
                        numeros_base.extend(self.grupos[1]['quadra'][0])
                else:
                    if tipo_jogo == 'trinca' and len(numeros_base) <= 4:
                        numeros_base.extend(self.grupos[grupo_disponivel]['trinca'][0])
                    else:
                        dupla = random.choice(self.grupos[grupo_disponivel]['duplas'])
                        if len(set(numeros_base + list(dupla))) <= 7:
                            numeros_base.extend(dupla)
                
                numeros_base = list(set(numeros_base))  # Remove duplicatas
                
                if len(numeros_base) > 7:  # Se passar de 7, remove alguns números
                    numeros_base = random.sample(numeros_base, 7)
            
            jogos.append(sorted(numeros_base))
        
        return jogos