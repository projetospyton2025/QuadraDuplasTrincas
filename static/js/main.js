// document.addEventListener('DOMContentLoaded', function() {
//     // Elementos do DOM
//     const btnGerar = document.getElementById('gerar');
//     const btnLimpar = document.getElementById('limpar');
//     const quantidadeInput = document.getElementById('quantidade');
//     const resultadosSection = document.querySelector('.resultados');
//     const jogosLista = document.querySelector('.jogos-lista');

//     // Configuração dos grupos
//     const grupos = {
//         1: { quadra: [1, 11, 21, 31] },
//         2: { trinca: [2, 12, 22], duplas: [[2, 12], [2, 22], [12, 22]] },
//         3: { trinca: [3, 13, 23], duplas: [[3, 13], [3, 23], [13, 23]] },
//         4: { trinca: [4, 14, 24], duplas: [[4, 14], [4, 24], [14, 24]] },
//         5: { trinca: [5, 15, 25], duplas: [[5, 15], [5, 25], [15, 25]] },
//         6: { trinca: [6, 16, 26], duplas: [[6, 16], [6, 26], [16, 26]] },
//         7: { trinca: [7, 17, 27], duplas: [[7, 17], [7, 27], [17, 27]] },
//         8: { trinca: [8, 18, 28], duplas: [[8, 18], [8, 28], [18, 28]] },
//         9: { trinca: [9, 19, 29], duplas: [[9, 19], [9, 29], [19, 29]] },
//         10: { trinca: [10, 20, 30], duplas: [[10, 20], [10, 30], [20, 30]] }
//     };

//     function obterSelecoes() {
//         const selecoes = [];
//         for (let i = 1; i <= 10; i++) {
//             const quadra = document.getElementById(`quadra-${i}`);
//             const trinca = document.getElementById(`trinca-${i}`);
//             const dupla = document.getElementById(`dupla-${i}`);
            
//             if (quadra && quadra.checked) {
//                 selecoes.push({ grupo: i, tipo: 'quadra' });
//             }
//             if (trinca && trinca.checked) {
//                 selecoes.push({ grupo: i, tipo: 'trinca' });
//             }
//             if (dupla && dupla.checked) {
//                 selecoes.push({ grupo: i, tipo: 'dupla' });
//             }
//         }
//         return selecoes;
//     }

//     function gerarJogo(selecoes) {
//         let numeros = new Set();
        
//         // Primeiro, adiciona os números das seleções específicas
//         for (const selecao of selecoes) {
//             const grupo = grupos[selecao.grupo];
//             if (selecao.tipo === 'trinca' && grupo.trinca) {
//                 grupo.trinca.forEach(n => numeros.add(n));
//             } else if (selecao.tipo === 'dupla' && grupo.duplas) {
//                 // Escolhe uma dupla aleatória do grupo
//                 const duplaAleatoria = grupo.duplas[Math.floor(Math.random() * grupo.duplas.length)];
//                 duplaAleatoria.forEach(n => numeros.add(n));
//             }
//         }
    
//         // Completa até 7 números com números aleatórios de 1 a 31
//         while (numeros.size < 7) {
//             // Gera um número aleatório de 1 a 31
//             const numeroAleatorio = Math.floor(Math.random() * 31) + 1;
//             // Só adiciona se não estiver já no conjunto
//             numeros.add(numeroAleatorio);
//         }
    
//         // Converte para array e ordena
//         return Array.from(numeros).sort((a, b) => a - b);
//     }

//     function exibirJogos(jogos) {
//         jogosLista.innerHTML = '';
//         jogos.forEach((jogo, index) => {
//             const jogoDiv = document.createElement('div');
//             jogoDiv.className = 'jogo-item';
//             jogoDiv.innerHTML = `
//                 <span class="jogo-numero">${index + 1}.</span>
//                 ${jogo.map(n => `<span class="dezena">${n.toString().padStart(2, '0')}</span>`).join(' ')}
//             `;
//             jogosLista.appendChild(jogoDiv);
//         });
//         resultadosSection.style.display = 'block';
//     }

//     btnGerar.addEventListener('click', () => {
//         const quantidade = parseInt(quantidadeInput.value) || 1;
//         const selecoes = obterSelecoes();
        
//         if (selecoes.length === 0) {
//             alert('Selecione pelo menos um grupo!');
//             return;
//         }

//         const jogos = [];
//         for (let i = 0; i < quantidade; i++) {
//             const jogo = gerarJogo(selecoes);
//             jogos.push(jogo);
//         }

//         exibirJogos(jogos);
//     });

//     btnLimpar.addEventListener('click', () => {
//         document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
//             checkbox.checked = false;
//         });
//         resultadosSection.style.display = 'none';
//         jogosLista.innerHTML = '';
//     });

//     // Funções para download
//     document.querySelectorAll('.btn-download').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const formato = btn.getAttribute('data-formato');
//             const jogos = Array.from(jogosLista.children).map(jogoDiv => {
//                 return jogoDiv.textContent.split('.')[1].trim();
//             });
            
//             if (formato === 'txt') {
//                 downloadTXT(jogos);
//             } else if (formato === 'xlsx') {
//                 downloadXLSX(jogos);
//             } else if (formato === 'html') {
//                 window.open('/jogos?formato=html&jogos=' + encodeURIComponent(JSON.stringify(jogos)));
//             }
//         });
//     });

//     function downloadTXT(jogos) {
//         const conteudo = jogos.join('\n');
//         const blob = new Blob([conteudo], { type: 'text/plain' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'jogos-dia-de-sorte.txt';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     }

//     function downloadXLSX(jogos) {
//         window.location.href = `/download/xlsx?jogos=${encodeURIComponent(JSON.stringify(jogos))}`;
//     }
// });
// function validarSelecoes(selecoes) {
//     let totalNumeros = 0;
//     let mensagemErro = '';

//     // Calcula o total de números que seriam usados
//     for (const selecao of selecoes) {
//         const grupo = grupos[selecao.grupo];
//         if (selecao.tipo === 'quadra') {
//             totalNumeros += 4; // Quadra tem 4 números
//         } else if (selecao.tipo === 'trinca') {
//             totalNumeros += 3; // Trinca tem 3 números
//         } else if (selecao.tipo === 'dupla') {
//             totalNumeros += 2; // Dupla tem 2 números
//         }

//         if (totalNumeros > 7) {
//             // Identifica qual combinação está causando o problema
//             let combinacoes = selecoes.map(s => {
//                 let tipo = s.tipo.charAt(0).toUpperCase() + s.tipo.slice(1);
//                 return `Grupo ${s.grupo} (${tipo})`;
//             }).join(', ');

//             mensagemErro = `A combinação selecionada ultrapassa 7 dezenas!\n\n` +
//                           `Seleções atuais: ${combinacoes}\n` +
//                           `Total de números: ${totalNumeros}\n\n` +
//                           `Por favor, selecione uma combinação que totalize 7 ou menos números.`;
//             return { valido: false, mensagem: mensagemErro };
//         }
//     }

//     return { valido: true };
// }

// // Atualizar o evento de click do botão gerar
// btnGerar.addEventListener('click', () => {
//     const quantidade = parseInt(quantidadeInput.value) || 1;
//     const selecoes = obterSelecoes();
    
//     if (selecoes.length === 0) {
//         alert('Selecione pelo menos um grupo!');
//         return;
//     }

//     // Validar seleções antes de gerar
//     const validacao = validarSelecoes(selecoes);
//     if (!validacao.valido) {
//         alert(validacao.mensagem);
//         return;
//     }

//     const jogos = [];
//     for (let i = 0; i < quantidade; i++) {
//         const jogo = gerarJogo(selecoes);
//         jogos.push(jogo);
//     }

//     exibirJogos(jogos);
// });

// // Adicionar validação em tempo real ao selecionar grupos
// document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
//     checkbox.addEventListener('change', () => {
//         const selecoes = obterSelecoes();
//         const validacao = validarSelecoes(selecoes);
        
//         if (!validacao.valido) {
//             alert(validacao.mensagem);
//             checkbox.checked = false; // Desmarca a última seleção
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const btnGerar = document.getElementById('gerar');
    const btnLimpar = document.getElementById('limpar');
    const quantidadeInput = document.getElementById('quantidade');
    const resultadosSection = document.querySelector('.resultados');
    const jogosLista = document.querySelector('.jogos-lista');

    // Configuração dos grupos
    const grupos = {
        1: { quadra: [1, 11, 21, 31] },
        2: { trinca: [2, 12, 22], duplas: [[2, 12], [2, 22], [12, 22]] },
        3: { trinca: [3, 13, 23], duplas: [[3, 13], [3, 23], [13, 23]] },
        4: { trinca: [4, 14, 24], duplas: [[4, 14], [4, 24], [14, 24]] },
        5: { trinca: [5, 15, 25], duplas: [[5, 15], [5, 25], [15, 25]] },
        6: { trinca: [6, 16, 26], duplas: [[6, 16], [6, 26], [16, 26]] },
        7: { trinca: [7, 17, 27], duplas: [[7, 17], [7, 27], [17, 27]] },
        8: { trinca: [8, 18, 28], duplas: [[8, 18], [8, 28], [18, 28]] },
        9: { trinca: [9, 19, 29], duplas: [[9, 19], [9, 29], [19, 29]] },
        10: { trinca: [10, 20, 30], duplas: [[10, 20], [10, 30], [20, 30]] }
    };

    // Função para validar as seleções
    function validarSelecoes(selecoes) {
        let totalNumeros = 0;
        let mensagemErro = '';
        let numerosUsados = new Set();

        // Calcula o total de números que seriam usados
        for (const selecao of selecoes) {
            const grupo = grupos[selecao.grupo];
            if (selecao.tipo === 'quadra' && grupo.quadra) {
                grupo.quadra.forEach(n => numerosUsados.add(n));
                totalNumeros += 4;
            } else if (selecao.tipo === 'trinca' && grupo.trinca) {
                grupo.trinca.forEach(n => numerosUsados.add(n));
                totalNumeros += 3;
            } else if (selecao.tipo === 'dupla' && grupo.duplas) {
                const duplaAleatoria = grupo.duplas[0]; // Pega primeira dupla para validação
                duplaAleatoria.forEach(n => numerosUsados.add(n));
                totalNumeros += 2;
            }
        }

        if (totalNumeros > 7) {
            let combinacoes = selecoes.map(s => {
                let tipo = s.tipo.charAt(0).toUpperCase() + s.tipo.slice(1);
                return `Grupo ${s.grupo} (${tipo})`;
            }).join(', ');

            mensagemErro = `A combinação selecionada ultrapassa 7 dezenas!\n\n` +
                          `Seleções atuais: ${combinacoes}\n` +
                          `Total de números: ${totalNumeros}\n\n` +
                          `Por favor, selecione uma combinação que totalize 7 ou menos números.`;
            return { valido: false, mensagem: mensagemErro };
        }

        return { valido: true };
    }

    // Função para obter seleções
    function obterSelecoes() {
        const selecoes = [];
        for (let i = 1; i <= 10; i++) {
            const quadra = document.getElementById(`quadra-${i}`);
            const trinca = document.getElementById(`trinca-${i}`);
            const dupla = document.getElementById(`dupla-${i}`);
            
            if (quadra && quadra.checked) {
                selecoes.push({ grupo: i, tipo: 'quadra' });
            }
            if (trinca && trinca.checked) {
                selecoes.push({ grupo: i, tipo: 'trinca' });
            }
            if (dupla && dupla.checked) {
                selecoes.push({ grupo: i, tipo: 'dupla' });
            }
        }
        return selecoes;
    }

    // Função para gerar um jogo
    function gerarJogo(selecoes) {
        let numeros = new Set();
        
        // Adiciona números das seleções específicas
        for (const selecao of selecoes) {
            const grupo = grupos[selecao.grupo];
            if (selecao.tipo === 'quadra' && grupo.quadra) {
                grupo.quadra.forEach(n => numeros.add(n));
            } else if (selecao.tipo === 'trinca' && grupo.trinca) {
                grupo.trinca.forEach(n => numeros.add(n));
            } else if (selecao.tipo === 'dupla' && grupo.duplas) {
                const duplaAleatoria = grupo.duplas[Math.floor(Math.random() * grupo.duplas.length)];
                duplaAleatoria.forEach(n => numeros.add(n));
            }
        }
    
        // Completa até 7 números com aleatórios
        while (numeros.size < 7) {
            const numeroAleatorio = Math.floor(Math.random() * 31) + 1;
            numeros.add(numeroAleatorio);
        }
    
        return Array.from(numeros).sort((a, b) => a - b);
    }

    // Função para exibir os jogos gerados
    function exibirJogos(jogos) {
        jogosLista.innerHTML = '';
        jogos.forEach((jogo, index) => {
            const jogoDiv = document.createElement('div');
            jogoDiv.className = 'jogo-item';
            jogoDiv.innerHTML = `
                <span class="jogo-numero">${index + 1}.</span>
                ${jogo.map(n => `<span class="dezena">${n.toString().padStart(2, '0')}</span>`).join(' ')}
            `;
            jogosLista.appendChild(jogoDiv);
        });
        resultadosSection.style.display = 'block';
    }

    // Event Listener para gerar jogos
    btnGerar.addEventListener('click', () => {
        const quantidade = parseInt(quantidadeInput.value) || 1;
        const selecoes = obterSelecoes();
        
        if (selecoes.length === 0) {
            alert('Selecione pelo menos um grupo!');
            return;
        }

        const validacao = validarSelecoes(selecoes);
        if (!validacao.valido) {
            alert(validacao.mensagem);
            return;
        }

        const jogos = [];
        for (let i = 0; i < quantidade; i++) {
            const jogo = gerarJogo(selecoes);
            jogos.push(jogo);
        }

        exibirJogos(jogos);
    });

    // Validação em tempo real nas checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selecoes = obterSelecoes();
            const validacao = validarSelecoes(selecoes);
            
            if (!validacao.valido) {
                alert(validacao.mensagem);
                checkbox.checked = false; // Desmarca a última seleção
            }
        });
    });

    // Event Listener para limpar as seleções
    btnLimpar.addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        resultadosSection.style.display = 'none';
        jogosLista.innerHTML = '';
    });

    // [Funções de download permanecem inalteradas]
    // Event Listeners para download
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', () => {
            const formato = btn.getAttribute('data-formato');
            const jogos = Array.from(jogosLista.children).map(jogoDiv => {
                return jogoDiv.textContent.split('.')[1].trim();
            });
            
            if (formato === 'txt') {
                downloadTXT(jogos);
            } else if (formato === 'xlsx') {
                downloadXLSX(jogos);
            } else if (formato === 'html') {
                window.open('/jogos?formato=html&jogos=' + encodeURIComponent(JSON.stringify(jogos)));
            }
        });
    });

    function downloadTXT(jogos) {
        const conteudo = jogos.join('\n');
        const blob = new Blob([conteudo], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jogos.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    function downloadXLSX(jogos) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(jogos.map(jogo => jogo.split(' ')));
        XLSX.utils.book_append_sheet(wb, ws, 'Jogos');
        XLSX.writeFile(wb, 'jogos.xlsx');
    }
});
