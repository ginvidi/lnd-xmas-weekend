/* Contenuto dell'itinerario. Tenuto separato dal rendering: le funzioni
   in js/render/ leggono solo da qui.

   Ogni giorno ha una lista `items`. Un item è:
   - un blocco semplice { time, icon, title, desc }
   - una scelta { type: 'choice', title, options: [{ label, summary, recommended?, blocks }] } */
window.CONTENT = {
  meta: {
    title: 'Londra · Weekend di Natale',
  },
  hero: {
    badge: '❄ 6–8 Dicembre',
    title: 'Un weekend di Natale a <em>Londra</em>',
    subtitle:
      'Tre giorni tra musei, luci e mercatini, pensati per i bambini. Per sabato e domenica ci sono più opzioni tra cui scegliere.',
    meta: [
      { icon: '📅', label: 'Quando', value: 'Sab 6 – Lun 8 dic' },
      { icon: '🧒', label: 'Con', value: 'bambini di 8 anni' },
      { icon: '🏫', label: 'Lunedì', value: 'dopo la scuola (15:30)' },
    ],
  },
  itinerary: {
    title: 'Itinerario',
    intro: 'Dove ci sono più opzioni, tocca le schede per confrontarle.',
    days: [
      {
        number: '01',
        label: 'Sabato',
        theme: 'Musei, Harrods + luci',
        date: '6 Dicembre',
        items: [
          {
            type: 'choice',
            title: 'Mattina: quale museo?',
            options: [
              {
                label: 'Opzione 1 · Natural History Museum',
                recommended: true,
                summary: 'Dinosauri e balena la mattina, poi il pomeriggio lo Science Museum, che è proprio accanto. Ingresso gratuito, meglio prenotare online.',
                blocks: [
                  {
                    time: '10:00',
                    icon: '🦕',
                    title: 'Natural History Museum',
                    desc: 'Apre alle 10: arrivate presto, la coda si allunga in fretta. Si parte dalla balena in Hintze Hall e dalla galleria dei dinosauri, con il T. rex che si muove.',
                  },
                ],
              },
              {
                label: 'Opzione 2 · Science Museum',
                summary: 'Se fate lo Science Museum la mattina, il pomeriggio scegliete la passeggiata nel parco.',
                blocks: [
                  {
                    time: '10:00',
                    icon: '🚀',
                    title: 'Science Museum e Pokémon Space Trail',
                    desc: 'Razzi, la capsula Apollo 10 e il Pokémon Space Trail, con il foglio gratis nella Energy Hall. I dettagli sono nell’opzione del pomeriggio.',
                  },
                ],
              },
            ],
          },
          {
            time: 'Pranzo',
            icon: '🍛',
            title: 'Dishoom South Kensington',
            desc: 'In alternativa South Kensington Kitchen. Con calma, senza correre.',
          },
          {
            type: 'choice',
            title: 'Pomeriggio: museo o parco?',
            options: [
              {
                label: 'Opzione 1 · Science Museum',
                recommended: true,
                summary: 'Con il Pokémon Space Trail, gratis fino al 3 gennaio. Ingresso gratuito ma va prenotato online. Aperto fino alle 18.',
                blocks: [
                  {
                    time: '13:30',
                    icon: '🚀',
                    title: 'Science Museum',
                    desc: 'Razzi e satelliti nella galleria Exploring Space, la capsula Apollo 10, i grandi motori a vapore e i giochi scientifici da toccare.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '⚡',
                    title: 'Pokémon Space Trail',
                    desc: 'Si prende il foglio del percorso gratis nella Energy Hall, al piano terra, poi si cercano le tappe in 9 sale: missioni spaziali dell’ESA e i Pokémon legati allo spazio. Il negozio Pokémon x ESA ha biglietti a orario a parte (gratis, finiscono presto): prenotateli insieme all’ingresso.',
                  },
                  {
                    time: '16:30',
                    icon: '🚌',
                    title: 'Bus 74 fino a Harrods',
                    desc: 'Da South Kensington Station, fermata «Harrods» su Brompton Road (5 minuti). Oppure 15 minuti a piedi lungo Brompton Road.',
                  },
                ],
              },
              {
                label: 'Opzione 2 · Passeggiata a Hyde Park',
                summary: 'Niente musei: si arriva a Harrods a piedi attraversando il parco. Partire subito dopo pranzo, il sole tramonta verso le 15:50.',
                blocks: [
                  {
                    time: '14:00',
                    icon: '🏛️',
                    title: 'Royal Albert Hall e Albert Memorial',
                    desc: 'Su per Exhibition Road, circa 10 minuti a piedi. Il memoriale dorato è perfetto per una foto.',
                  },
                  {
                    time: '14:30',
                    icon: '🧚',
                    title: 'Kensington Gardens',
                    desc: 'Statua di Peter Pan sul Long Water. Se c’è energia, Diana Memorial Playground con la nave dei pirati (gratis, 10–15 minuti più in là).',
                  },
                  {
                    time: '15:30',
                    icon: '🦢',
                    title: 'Lungo il Serpentine',
                    desc: 'Cigni e anatre sul lago, poi si esce dal lato di Knightsbridge: da lì Harrods è a 5–10 minuti a piedi.',
                  },
                ],
              },
            ],
          },
          {
            time: '17:00',
            icon: '🛍️',
            title: 'Harrods e Knightsbridge',
            desc: 'Facciata illuminata, vetrine di Natale e Christmas World al piano -1. Poi un salto da Harvey Nichols, all’angolo con Sloane Street.',
          },
          {
            time: '18:15',
            icon: '🚌',
            title: 'Bus 9 verso Trafalgar Square, passando per le luci',
            desc: 'Si prende alla fermata «Knightsbridge Station» sulla strada Knightsbridge, davanti a Harvey Nichols, in direzione Aldwych: da Harrods 3–4 minuti a piedi. Salite al piano di sopra, posti davanti. Passa da Hyde Park Corner, lungo Piccadilly (Ritz, Burlington Arcade, Fortnum & Mason illuminato) e da Piccadilly Circus con gli angeli di Regent Street sullo sfondo. Scendete a Trafalgar Square, circa 25–30 minuti. Se la fermata viene saltata, si scende a Charing Cross, a 2 minuti. Se non passa il 9: bus 14 dalla fermata «Harrods» fino a Piccadilly Circus, oppure la Piccadilly line da Knightsbridge a Leicester Square, diretta (10 minuti, ma senza luci).',
          },
          {
            time: 'Sera',
            icon: '🎄',
            title: 'Mercatino di Trafalgar Square e Leicester Square',
            desc: 'Il grande albero regalato da Oslo, i canti di Natale e il mercatino davanti alla National Gallery (fino alle 22). Poi 5 minuti a piedi fino a Leicester Square: luci, altro mercatino e pista di pattinaggio. Cena in zona.',
          },
        ],
      },
      {
        number: '02',
        label: 'Domenica',
        theme: 'Tre opzioni',
        date: '7 Dicembre',
        items: [
          {
            type: 'choice',
            title: 'Come la facciamo?',
            options: [
              {
                label: 'Opzione 1 · Greenwich',
                recommended: true,
                summary: 'La più “gita”: circa 30–40 minuti dal centro con la DLR fino a Cutty Sark, e ritorno in battello sul Tamigi.',
                blocks: [
                  {
                    time: 'Mattina',
                    icon: '⚓',
                    title: 'Cutty Sark, Greenwich Market e Royal Observatory',
                    desc: 'Il Meridiano zero piace molto agli 8enni.',
                  },
                  {
                    time: 'Pranzo',
                    icon: '🍴',
                    title: 'Greenwich Market',
                    desc: 'Tante bancarelle di cibo tra cui scegliere, e quelle di Natale. Il mercato chiude alle 17:30.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '🌳',
                    title: 'Greenwich Park',
                    desc: 'Passeggiata su per la collina, con la vista su Canary Wharf e sulla città.',
                  },
                  {
                    time: 'Tramonto',
                    icon: '⛴️',
                    title: 'Battello sul Tamigi',
                    desc: 'Uber Boat dal Greenwich Pier fino a London Eye/Westminster, passando sotto il Tower Bridge mentre la città si accende. Si paga contactless come sul bus.',
                  },
                  {
                    time: 'Sera',
                    icon: '🎄',
                    title: 'Southbank e cena',
                    desc: 'Si scende accanto al Southbank Centre Winter Market (domenica fino alle 17, verificate). Cena da Wahaca Southbank.',
                  },
                ],
              },
              {
                label: 'Opzione 2 · In battello sul Tamigi',
                summary: 'Tutta sull’acqua: battello fino a Battersea Power Station (o solo fino a Westminster), poi Southbank oppure Covent Garden.',
                blocks: [
                  {
                    time: 'Mattina',
                    icon: '⛴️',
                    title: 'Uber Boat fino a Battersea Power Station',
                    desc: 'Si sale a un molo del centro (Tower, London Bridge City, Bankside o London Eye) e si va verso ovest, sotto i ponti di Westminster. Si paga contactless. Non tutte le corse fermano a Battersea la domenica: controllate sull’app Uber Boat. Se non c’è la corsa, si scende a Westminster.',
                  },
                  {
                    time: 'Pranzo',
                    icon: '🏭',
                    title: 'Battersea Power Station',
                    desc: 'La vecchia centrale elettrica diventata un centro con negozi e ristoranti. A Natale: lampadari art déco nella Turbine Hall, bastoncini di zucchero giganti lungo Electric Boulevard e un albero di 12 metri. Lift 109 sale dentro una ciminiera fino alla vista su Londra (a pagamento, da prenotare).',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '⛴️',
                    title: 'Battello di ritorno fino al London Eye',
                    desc: 'Si scende a London Eye/Westminster Pier, con il Big Ben davanti.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '🎄',
                    title: 'Southbank Centre Winter Market',
                    desc: 'Domenica 12:00–17:00, lungo il fiume con vista su Big Ben e London Eye.',
                  },
                  {
                    time: 'Sera',
                    icon: '🌟',
                    title: 'Oppure Covent Garden',
                    desc: 'In alternativa a Southbank, o dopo: 15 minuti a piedi attraversando Waterloo Bridge. Albero gigante, decorazioni enormi e artisti di strada nella piazza. Cena in zona.',
                  },
                ],
              },
              {
                label: 'Opzione 3 · St Pancras + Southbank',
                summary: 'Binario 9¾ e l’albero di St Pancras la mattina, il fiume il pomeriggio.',
                blocks: [
                  {
                    time: 'Mattina',
                    icon: '🧙',
                    title: 'King’s Cross e il Binario 9¾',
                    desc: 'La foto con il carrello che entra nel muro (c’è la coda, meglio presto) e il negozio di Harry Potter accanto.',
                  },
                  {
                    time: 'Tarda mattina',
                    icon: '🎄',
                    title: 'St Pancras International',
                    desc: 'Il grande albero di Natale sotto la tettoia della stazione, la statua degli innamorati e i treni Eurostar.',
                  },
                  {
                    time: 'Pranzo',
                    icon: '🍴',
                    title: 'Granary Square e Coal Drops Yard',
                    desc: 'Mercatino di Natale, fontane e tanti posti dove mangiare, a 5–10 minuti a piedi.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '🚌',
                    title: 'Bus 59 fino a Waterloo',
                    desc: 'Dal piano di sopra, circa 30 minuti, attraverso Bloomsbury e sul Waterloo Bridge. Oppure la metro.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '🎡',
                    title: 'Southbank Centre Winter Market',
                    desc: 'Domenica 12:00–17:00, con vista su Big Ben e London Eye.',
                  },
                  {
                    time: 'Sera',
                    icon: '🌃',
                    title: 'Luci sul Tamigi e cena',
                    desc: 'Cena a Gabriel’s Wharf oppure da Wahaca Southbank.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        number: '03',
        label: 'Lunedì',
        theme: 'Dopo la scuola, in centro',
        date: '8 Dicembre',
        items: [
          {
            time: '10:00',
            icon: '🎨',
            title: 'Tate Modern (un bambino e un genitore)',
            desc: 'Apre alle 10, ingresso gratuito. La Turbine Hall e il Terrace con vista su Londra piacciono ai bambini.',
          },
          {
            time: '11:30',
            icon: '🌉',
            title: 'Millennium Bridge',
            desc: 'Proprio davanti alla Tate. Si cammina sul ponte con St Paul’s in fondo: la foto più bella della giornata.',
          },
          {
            time: 'Pranzo',
            icon: '🧺',
            title: 'Borough Market',
            desc: 'Circa 15 minuti a piedi lungo il fiume, passando dal Globe e dalla Golden Hinde. Il lunedì non tutte le bancarelle sono aperte: verificate gli orari.',
          },
          {
            time: '16:00',
            icon: '⛪',
            title: 'St Paul’s al tramonto',
            desc: 'Dopo la scuola, tutti insieme. L’ultimo ingresso alle visite è di solito alle 16:00, quindi meglio goderla da fuori mentre si fa buio. Se la volete vedere dentro, la Choral Evensong delle 17:00 è gratuita.',
          },
          {
            time: '16:45',
            icon: '🚌',
            title: 'Verso il centro',
            desc: 'In bus, oppure con la Central line da St Paul’s a Oxford Circus, senza cambi.',
          },
          {
            time: '17:15',
            icon: '✨',
            title: 'Luci di Natale e giro a piedi',
            desc: 'Oxford Street → Regent Street → Hamleys (188–196 Regent Street) → Carnaby Street. Con il buio le luci rendono molto di più e di lunedì c’è molta meno gente che nel weekend.',
          },
          {
            time: 'Cena',
            icon: '🍝',
            title: 'Zona Carnaby',
            desc: 'Bill’s o Wagamama. Per il dolce, Kaspa’s.',
          },
        ],
      },
    ],
  },
  highlights: {
    title: 'Cose da non perdere',
    items: [
      {
        icon: '🎁',
        title: 'Harrods Christmas World',
        desc: 'Al piano -1, tra decorazioni, giocattoli e vetrine natalizie.',
      },
      {
        icon: '🎡',
        title: 'Winter Wonderland',
        desc: 'Giostre, pista di pattinaggio e cibo di strada a Hyde Park.',
      },
      {
        icon: '✨',
        title: 'Luci del West End',
        desc: 'Regent Street, Carnaby e Piccadilly fino a Leicester Square.',
      },
      {
        icon: '🌉',
        title: 'Millennium Bridge',
        desc: 'Con St Paul’s davanti: la foto più bella del weekend.',
      },
      {
        icon: '🧺',
        title: 'Borough Market',
        desc: 'Mercato coperto con street food e assaggi, ottimo per il pranzo.',
      },
      {
        icon: '🧸',
        title: 'Hamleys',
        desc: 'Il negozio di giocattoli più famoso di Londra, in Regent Street.',
      },
    ],
  },
  info: {
    title: 'Informazioni utili',
    columns: [
      {
        icon: '🚇',
        title: 'Spostamenti',
        items: [
          'Sab: bus 74 da South Kensington a Harrods, poi bus 9 da Knightsbridge Station a Trafalgar Square (piano di sopra, per le luci)',
          'Lunedì: Central line da St Paul’s a Oxford Circus, diretta',
          'Lunedì: tra Tate Modern, Millennium Bridge e Borough Market si va a piedi',
          'Greenwich è a 30–40 minuti dal centro con la DLR, ritorno in battello',
          'Battelli Uber Boat: si paga contactless, orari e fermate sull’app',
        ],
      },
      {
        icon: '📌',
        title: 'Da ricordare',
        items: [
          'St Paul’s: ultimo ingresso alle visite di solito alle 16:00 (lun–sab)',
          'Winter Wonderland: il sabato sera è molto affollato, meglio di giorno',
          'Pista di pattinaggio a Winter Wonderland: prenotare i biglietti in anticipo',
          'Prenotare l’ingresso ai musei e i biglietti del negozio Pokémon x ESA; controllare gli orari di Borough Market',
        ],
      },
      {
        icon: '🍽️',
        title: 'Dove mangiare',
        items: [
          'Sab: Dishoom o South Kensington Kitchen, cena intorno a Trafalgar o Leicester Square',
          'Dom: Greenwich Market, Battersea Power Station o Coal Drops Yard; cena a Southbank o Covent Garden',
          'Lun: Borough Market a pranzo, la sera Bill’s o Wagamama a Carnaby, dolce da Kaspa’s',
        ],
      },
    ],
  },
  footer: {
    lines: [
      '❄ Fatto con cura per il weekend di Natale a Londra.',
      'Itinerario di massima: orari e prenotazioni da verificare.',
    ],
  },
};
