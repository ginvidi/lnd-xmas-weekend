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
      'Tre giorni tra musei, luci e mercatini, pensati per i bambini. Per domenica e per lunedì mattina ci sono più opzioni tra cui scegliere.',
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
        theme: 'Musei, parco + Harrods',
        date: '6 Dicembre',
        items: [
          {
            time: '10:00',
            icon: '🦕',
            title: 'Natural History Museum',
            desc: 'Si parte dai dinosauri e dalla balena in Hintze Hall.',
          },
          {
            time: 'Pranzo',
            icon: '🍛',
            title: 'Dishoom South Kensington',
            desc: 'In alternativa South Kensington Kitchen. Con calma, senza correre.',
          },
          {
            type: 'choice',
            title: 'Dopo pranzo: museo o parco?',
            options: [
              {
                label: 'Opzione 1 · Passeggiata a Hyde Park',
                recommended: true,
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
                    desc: 'Cigni e anatre sul lago, poi si esce dal lato di Knightsbridge.',
                  },
                  {
                    time: 'Tramonto',
                    icon: '🛍️',
                    title: 'Harrods e Knightsbridge',
                    desc: 'Dal parco 5–10 minuti a piedi. Christmas World al piano -1, Harvey Nichols e Sloane Street, con le luci già accese.',
                  },
                ],
              },
              {
                label: 'Opzione 2 · Science Museum',
                summary: 'Se piove o fa troppo freddo: si resta al chiuso.',
                blocks: [
                  {
                    time: '14:00',
                    icon: '🚀',
                    title: 'Science Museum',
                    desc: 'A due passi dal Natural History Museum, dopo pranzo e con più calma.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '🚌',
                    title: 'Bus 74 fino a Knightsbridge',
                    desc: 'Si prende a South Kensington Station. Poi giro a piedi: Harrods con il Christmas World al piano -1, Harvey Nichols e Sloane Street.',
                  },
                ],
              },
            ],
          },
          {
            time: 'Sera',
            icon: '🎄',
            title: 'Mercatini di Natale',
            desc: 'Giro tra bancarelle, vin brulé e cibo di strada. Il mercatino preciso è ancora da scegliere.',
          },
        ],
      },
      {
        number: '02',
        label: 'Domenica',
        theme: 'Tre opzioni',
        date: '7 Dicembre',
        note: {
          icon: '⚠️',
          text: 'St Paul’s la domenica è chiusa alle visite turistiche: si entra solo per le funzioni. Si vede bene da fuori, ma non si sale in cupola. Verificate gli orari sul sito.',
        },
        items: [
          {
            type: 'choice',
            title: 'Come la facciamo?',
            options: [
              {
                label: 'Opzione 1 · Tate Modern + Southbank',
                recommended: true,
                summary: 'La più comoda: pochi spostamenti, ideale prima del lunedì.',
                blocks: [
                  {
                    time: 'Mattina',
                    icon: '🎨',
                    title: 'Tate Modern',
                    desc: 'Ingresso gratuito. La Turbine Hall e il Terrace con vista su Londra piacciono ai bambini.',
                  },
                  {
                    time: 'Tarda mattina',
                    icon: '🌉',
                    title: 'Millennium Bridge a piedi',
                    desc: 'Con St Paul’s davanti a voi: la foto più bella della giornata.',
                  },
                  {
                    time: 'Pranzo',
                    icon: '🧺',
                    title: 'Borough Market',
                    desc: 'Street food e assaggi lungo la passeggiata sul Tamigi. La domenica gli orari sono ridotti: verificateli prima.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '🎄',
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
              {
                label: 'Opzione 2 · Greenwich',
                summary: 'La più “gita”: serve più tempo, circa 30–40 minuti dal centro.',
                blocks: [
                  {
                    time: 'Mattina',
                    icon: '⚓',
                    title: 'Cutty Sark, Greenwich Market e Royal Observatory',
                    desc: 'Il Meridiano zero piace molto agli 8enni.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '🌳',
                    title: 'Greenwich Park',
                    desc: 'Passeggiata nel parco con la vista sulla città.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '⛴️',
                    title: 'Battello sul Tamigi',
                    desc: 'Fino a Westminster o Tower Pier. Se i bambini reggono, è un ottimo modo di vedere Londra illuminata.',
                  },
                  {
                    time: 'Sera',
                    icon: '🍴',
                    title: 'Cena al Greenwich Market',
                    desc: 'Tante bancarelle tra cui scegliere.',
                  },
                ],
              },
              {
                label: 'Opzione 3 · St Paul’s + Tate',
                summary: 'Un mix: St Paul’s da fuori, Tate Modern e mercato.',
                blocks: [
                  {
                    time: 'Mattina',
                    icon: '⛪',
                    title: 'St Paul’s da fuori e Millennium Bridge',
                    desc: 'Solo vista esterna: la cattedrale è chiusa ai turisti.',
                  },
                  {
                    time: 'Tarda mattina',
                    icon: '🎨',
                    title: 'Tate Modern',
                    desc: 'Ingresso gratuito.',
                  },
                  {
                    time: 'Pranzo',
                    icon: '🧺',
                    title: 'Borough Market',
                    desc: 'In alternativa, qualcosa in zona.',
                  },
                  {
                    time: 'Pomeriggio',
                    icon: '🎄',
                    title: 'Southbank Winter Market',
                    desc: 'Vista su Big Ben e London Eye.',
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
            type: 'choice',
            title: 'Mattina (un bambino e un genitore)',
            options: [
              {
                label: 'Winter Wonderland',
                summary: 'Appena apre di lunedì mattina c’è poca gente.',
                blocks: [
                  {
                    time: 'Mattina',
                    icon: '🎡',
                    title: 'Hyde Park Winter Wonderland',
                    desc: 'Si arriva all’apertura per evitare la folla.',
                  },
                ],
              },
              {
                label: 'Tower Bridge + Borough Market',
                summary: 'Più tranquillo e sempre interessante.',
                blocks: [
                  {
                    time: 'Mattina',
                    icon: '🌉',
                    title: 'Tower Bridge Exhibition',
                    desc: 'Si cammina sulle passerelle in alto, con il pavimento di vetro.',
                  },
                  {
                    time: 'Pranzo',
                    icon: '🧺',
                    title: 'Borough Market',
                    desc: 'Poco distante da Tower Bridge, a piedi lungo il fiume.',
                  },
                ],
              },
            ],
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
          'Bus 74 da South Kensington Station a Knightsbridge',
          'Lunedì: Central line da St Paul’s a Oxford Circus, diretta',
          'Tra Tate Modern e St Paul’s si va a piedi sul Millennium Bridge',
          'Greenwich è a 30–40 minuti dal centro, ritorno possibile in battello',
        ],
      },
      {
        icon: '📌',
        title: 'Da ricordare',
        items: [
          'St Paul’s chiusa ai turisti la domenica',
          'St Paul’s: ultimo ingresso alle visite di solito alle 16:00 (lun–sab)',
          'Winter Wonderland: meglio il lunedì mattina, il sabato sera è molto affollato',
          'Pista di pattinaggio a Winter Wonderland: prenotare i biglietti in anticipo',
          'Controllare orari e prenotazioni di musei, Tower Bridge Exhibition e Borough Market',
        ],
      },
      {
        icon: '🍽️',
        title: 'Dove mangiare',
        items: [
          'Sab: Dishoom o South Kensington Kitchen',
          'Dom: Borough Market, Gabriel’s Wharf o Wahaca Southbank',
          'Lun: Bill’s o Wagamama a Carnaby, dolce da Kaspa’s',
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
