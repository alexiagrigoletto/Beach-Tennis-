# Beach Tennis Live — iPhone
Versão sem pasta public. Envie todos os arquivos diretamente para a raiz do GitHub.

Após publicar no Render:
- /control.html = painel de controle
- /overlay.html = Web Widget do PRISM


## v1.1
O painel de controle agora mostra o placar atual (Set 1, Set 2, MTB, pontos e saque) em tempo real.

## v1.2
Painel otimizado para operação ao vivo:
- placar grande para cada dupla;
- botão + PONTO diretamente abaixo da dupla correspondente;
- destaque visual da dupla sacadora;
- Set 1, Set 2, MTB e pontos sempre visíveis;
- Desfazer, troca de saque e seleção de set agrupados.

## v1.3
Rodapé de patrocinadores: durante a rotação aparece somente o logotipo do patrocinador, sem nome em texto.

## v1.4
Os patrocinadores agora aparecem somente pelo logotipo em um box compacto no canto inferior direito da transmissão. O banner de informações do torneio continua reservado ao rodapé.

## v1.5 — layout broadcast limpo
- removida totalmente a faixa preta de largura total;
- informações do evento em uma cápsula compacta no canto inferior esquerdo;
- patrocinador no canto inferior direito, sem caixa ou fundo;
- rotação automática somente entre os logotipos;
- placar mais compacto e com coluna PTS destacada.

## v1.6
- placar reduzido aproximadamente 24%;
- cápsula inferior e patrocinador também menores;
- clima automático pelo nome da cidade usando Open-Meteo;
- temperatura, condição e vento atualizados automaticamente a cada 10 minutos.

## v1.7 — localização automática
- overlay solicita a localização do aparelho;
- latitude/longitude passam automaticamente para o clima;
- cidade detectada aparece na cápsula;
- temperatura e vento atualizam a cada 10 minutos;
- se a localização for bloqueada, usa a cidade manual do painel como reserva.
IMPORTANTE: o navegador/PRISM precisa conceder permissão de localização ao Web Widget.
