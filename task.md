# Abertura INOVI
- Implementar progresso por recursos essenciais, reserva hero compartilhada e primeiro quadro do scroll.
- Preservar animações; não montar conteúdo durante preparação.
- Tratar erro, timeout, retry e movimento reduzido.
- Verificar progresso intermediário, final, falha, desktop/mobile, build e scroll.

## Concluído
- Abertura com logo, progresso real por 28 recursos essenciais (5 em movimento reduzido), 24 quadros hero compartilhados, poster responsivo do scroll e duas fontes.
- Site montado apenas após preparação; transição 800ms e scroll liberado.
- Falhas não contam como sucesso: retry e entrar sem esperar.
- Build passou. Desktop/mobile: falha controlada em 96%, retry, abertura, canvas hero e scroll até 191, sem overflow ou erros JS.
- Teste com último quadro retido confirmou 96%→100% por carregamento real e página não montada antecipadamente. Movimento reduzido testado.
