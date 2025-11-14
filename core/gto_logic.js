// core/gto_logic.js

// Enhanced GTO data structure that considers player actions
const GTO_RANGES = {
    // Preflop scenarios with different action contexts
    'PREFLOP': {
        // First to act scenarios
        'OPEN': {
            'UTG': { 
                'AA': { action: 'Raise', amount: '3BB' }, 'KK': { action: 'Raise', amount: '3BB' }, 
                'QQ': { action: 'Raise', amount: '3BB' }, 'JJ': { action: 'Raise', amount: '3BB' },
                'TT': { action: 'Raise', amount: '3BB' }, '99': { action: 'Raise', amount: '3BB' },
                'AQs': { action: 'Raise', amount: '3BB' }, 'AKs': { action: 'Raise', amount: '3BB' },
                'AKo': { action: 'Raise', amount: '3BB' }, 'AJs': { action: 'Raise', amount: '3BB' },
                'KQs': { action: 'Raise', amount: '3BB' }, 'QJs': { action: 'Raise', amount: '3BB' },
                'JTs': { action: 'Raise', amount: '3BB' }, 'T9s': { action: 'Raise', amount: '3BB' },
            },
            'HJ': { 
                'AA': { action: 'Raise', amount: '3BB' }, 'KK': { action: 'Raise', amount: '3BB' }, 
                'QQ': { action: 'Raise', amount: '3BB' }, 'JJ': { action: 'Raise', amount: '3BB' },
                'TT': { action: 'Raise', amount: '3BB' }, '99': { action: 'Raise', amount: '3BB' },
                '88': { action: 'Raise', amount: '3BB' }, 'AQs': { action: 'Raise', amount: '3BB' },
                'AKs': { action: 'Raise', amount: '3BB' }, 'AKo': { action: 'Raise', amount: '3BB' },
                'AJs': { action: 'Raise', amount: '3BB' }, 'ATs': { action: 'Raise', amount: '3BB' },
                'KQs': { action: 'Raise', amount: '3BB' }, 'KJs': { action: 'Raise', amount: '3BB' },
                'QJs': { action: 'Raise', amount: '3BB' }, 'QTs': { action: 'Raise', amount: '3BB' },
                'JTs': { action: 'Raise', amount: '3BB' }, 'T9s': { action: 'Raise', amount: '3BB' },
                '98s': { action: 'Raise', amount: '3BB' }, 'AJo': { action: 'Raise', amount: '3BB' },
                'KQo': { action: 'Raise', amount: '3BB' },
            },
            'CO': { 
                'AA': { action: 'Raise', amount: '3BB' }, 'KK': { action: 'Raise', amount: '3BB' }, 
                'QQ': { action: 'Raise', amount: '3BB' }, 'JJ': { action: 'Raise', amount: '3BB' },
                'TT': { action: 'Raise', amount: '3BB' }, '99': { action: 'Raise', amount: '3BB' },
                '88': { action: 'Raise', amount: '3BB' }, '77': { action: 'Raise', amount: '3BB' },
                'AQs': { action: 'Raise', amount: '3BB' }, 'AKs': { action: 'Raise', amount: '3BB' },
                'AKo': { action: 'Raise', amount: '3BB' }, 'AJs': { action: 'Raise', amount: '3BB' },
                'ATs': { action: 'Raise', amount: '3BB' }, 'A9s': { action: 'Raise', amount: '3BB' },
                'KQs': { action: 'Raise', amount: '3BB' }, 'KJs': { action: 'Raise', amount: '3BB' },
                'KTs': { action: 'Raise', amount: '3BB' }, 'QJs': { action: 'Raise', amount: '3BB' },
                'QTs': { action: 'Raise', amount: '3BB' }, 'JTs': { action: 'Raise', amount: '3BB' },
                'T9s': { action: 'Raise', amount: '3BB' }, '98s': { action: 'Raise', amount: '3BB' },
                '87s': { action: 'Raise', amount: '3BB' }, 'AJo': { action: 'Raise', amount: '3BB' },
                'ATo': { action: 'Raise', amount: '3BB' }, 'KQo': { action: 'Raise', amount: '3BB' },
                'KJo': { action: 'Raise', amount: '3BB' }, 'QJo': { action: 'Raise', amount: '3BB' },
            },
            'BTN': { 
                'AA': { action: 'Raise', amount: '2.5BB' }, 'KK': { action: 'Raise', amount: '2.5BB' }, 
                'QQ': { action: 'Raise', amount: '2.5BB' }, 'JJ': { action: 'Raise', amount: '2.5BB' },
                'TT': { action: 'Raise', amount: '2.5BB' }, '99': { action: 'Raise', amount: '2.5BB' },
                '88': { action: 'Raise', amount: '2.5BB' }, '77': { action: 'Raise', amount: '2.5BB' },
                '66': { action: 'Raise', amount: '2.5BB' }, '55': { action: 'Raise', amount: '2.5BB' },
                '44': { action: 'Raise', amount: '2.5BB' }, '33': { action: 'Raise', amount: '2.5BB' },
                '22': { action: 'Raise', amount: '2.5BB' }, 'AQs': { action: 'Raise', amount: '2.5BB' },
                'AKs': { action: 'Raise', amount: '2.5BB' }, 'AKo': { action: 'Raise', amount: '2.5BB' },
                'AJs': { action: 'Raise', amount: '2.5BB' }, 'ATs': { action: 'Raise', amount: '2.5BB' },
                'A9s': { action: 'Raise', amount: '2.5BB' }, 'A8s': { action: 'Raise', amount: '2.5BB' },
                'A7s': { action: 'Raise', amount: '2.5BB' }, 'A5s': { action: 'Raise', amount: '2.5BB' },
                'A4s': { action: 'Raise', amount: '2.5BB' }, 'A3s': { action: 'Raise', amount: '2.5BB' },
                'A2s': { action: 'Raise', amount: '2.5BB' }, 'KQs': { action: 'Raise', amount: '2.5BB' },
                'KJs': { action: 'Raise', amount: '2.5BB' }, 'KTs': { action: 'Raise', amount: '2.5BB' },
                'K9s': { action: 'Raise', amount: '2.5BB' }, 'QJs': { action: 'Raise', amount: '2.5BB' },
                'QTs': { action: 'Raise', amount: '2.5BB' }, 'Q9s': { action: 'Raise', amount: '2.5BB' },
                'JTs': { action: 'Raise', amount: '2.5BB' }, 'J9s': { action: 'Raise', amount: '2.5BB' },
                'T9s': { action: 'Raise', amount: '2.5BB' }, '98s': { action: 'Raise', amount: '2.5BB' },
                '87s': { action: 'Raise', amount: '2.5BB' }, '76s': { action: 'Raise', amount: '2.5BB' },
                '65s': { action: 'Raise', amount: '2.5BB' }, '54s': { action: 'Raise', amount: '2.5BB' },
                'AJo': { action: 'Raise', amount: '2.5BB' }, 'ATo': { action: 'Raise', amount: '2.5BB' },
                'KQo': { action: 'Raise', amount: '2.5BB' }, 'KJo': { action: 'Raise', amount: '2.5BB' },
                'KTo': { action: 'Raise', amount: '2.5BB' }, 'QJo': { action: 'Raise', amount: '2.5BB' },
                'QTo': { action: 'Raise', amount: '2.5BB' }, 'JTo': { action: 'Raise', amount: '2.5BB' },
            },
            'SB': { 
                'AA': { action: 'Raise', amount: '3BB' }, 'KK': { action: 'Raise', amount: '3BB' }, 
                'QQ': { action: 'Raise', amount: '3BB' }, 'JJ': { action: 'Raise', amount: '3BB' },
                'TT': { action: 'Raise', amount: '3BB' }, '99': { action: 'Raise', amount: '3BB' },
                '88': { action: 'Raise', amount: '3BB' }, '77': { action: 'Raise', amount: '3BB' },
                '66': { action: 'Raise', amount: '3BB' }, '55': { action: 'Raise', amount: '3BB' },
                '44': { action: 'Raise', amount: '3BB' }, '33': { action: 'Raise', amount: '3BB' },
                '22': { action: 'Raise', amount: '3BB' }, 'AQs': { action: 'Raise', amount: '3BB' },
                'AKs': { action: 'Raise', amount: '3BB' }, 'AKo': { action: 'Raise', amount: '3BB' },
                'AJs': { action: 'Raise', amount: '3BB' }, 'ATs': { action: 'Raise', amount: '3BB' },
                'A9s': { action: 'Raise', amount: '3BB' }, 'A8s': { action: 'Raise', amount: '3BB' },
                'A7s': { action: 'Raise', amount: '3BB' }, 'A6s': { action: 'Raise', amount: '3BB' },
                'A5s': { action: 'Raise', amount: '3BB' }, 'A4s': { action: 'Raise', amount: '3BB' },
                'A3s': { action: 'Raise', amount: '3BB' }, 'A2s': { action: 'Raise', amount: '3BB' },
                'KQs': { action: 'Raise', amount: '3BB' }, 'KJs': { action: 'Raise', amount: '3BB' },
                'KTs': { action: 'Raise', amount: '3BB' }, 'K9s': { action: 'Raise', amount: '3BB' },
                'QJs': { action: 'Raise', amount: '3BB' }, 'QTs': { action: 'Raise', amount: '3BB' },
                'Q9s': { action: 'Raise', amount: '3BB' }, 'JTs': { action: 'Raise', amount: '3BB' },
                'J9s': { action: 'Raise', amount: '3BB' }, 'T9s': { action: 'Raise', amount: '3BB' },
                '98s': { action: 'Raise', amount: '3BB' }, '87s': { action: 'Raise', amount: '3BB' },
                '76s': { action: 'Raise', amount: '3BB' }, '65s': { action: 'Raise', amount: '3BB' },
                '54s': { action: 'Raise', amount: '3BB' }, '43s': { action: 'Raise', amount: '3BB' },
                'AJo': { action: 'Raise', amount: '3BB' }, 'ATo': { action: 'Raise', amount: '3BB' },
                'KQo': { action: 'Raise', amount: '3BB' }, 'KJo': { action: 'Raise', amount: '3BB' },
                'KTo': { action: 'Raise', amount: '3BB' }, 'QJo': { action: 'Raise', amount: '3BB' },
                'QTo': { action: 'Raise', amount: '3BB' }, 'JTo': { action: 'Raise', amount: '3BB' },
                'T9o': { action: 'Raise', amount: '3BB' }, '98o': { action: 'Raise', amount: '3BB' },
            },
        },
        
        // Facing a single raise
        'FACE_RAISE': {
            'VS_UTG': {
                'BB': {
                    'AA': { action: 'Raise', amount: '12BB' }, 'KK': { action: 'Raise', amount: '12BB' }, 
                    'QQ': { action: 'Raise', amount: '12BB' }, 'JJ': { action: 'Raise', amount: '12BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    'AQs': { action: 'Call', amount: '3BB' }, 'AKs': { action: 'Call', amount: '3BB' },
                    'AKo': { action: 'Call', amount: '3BB' }, 'AJs': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'QJs': { action: 'Call', amount: '3BB' },
                    'JTs': { action: 'Call', amount: '3BB' }, 'T9s': { action: 'Call', amount: '3BB' },
                },
                'SB': {
                    'AA': { action: 'Raise', amount: '12BB' }, 'KK': { action: 'Raise', amount: '12BB' }, 
                    'QQ': { action: 'Raise', amount: '12BB' }, 'JJ': { action: 'Raise', amount: '12BB' },
                    'TT': { action: 'Call', amount: '2.5BB' }, '99': { action: 'Call', amount: '2.5BB' },
                    'AQs': { action: 'Call', amount: '2.5BB' }, 'AKs': { action: 'Call', amount: '2.5BB' },
                    'AKo': { action: 'Call', amount: '2.5BB' }, 'AJs': { action: 'Call', amount: '2.5BB' },
                    'KQs': { action: 'Call', amount: '2.5BB' }, 'QJs': { action: 'Call', amount: '2.5BB' },
                    'JTs': { action: 'Call', amount: '2.5BB' }, 'T9s': { action: 'Call', amount: '2.5BB' },
                },
                'BTN': {
                    'AA': { action: 'Raise', amount: '10BB' }, 'KK': { action: 'Raise', amount: '10BB' }, 
                    'QQ': { action: 'Raise', amount: '10BB' }, 'JJ': { action: 'Raise', amount: '10BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    '88': { action: 'Call', amount: '3BB' }, 'AQs': { action: 'Call', amount: '3BB' },
                    'AKs': { action: 'Call', amount: '3BB' }, 'AKo': { action: 'Call', amount: '3BB' },
                    'AJs': { action: 'Call', amount: '3BB' }, 'ATs': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'KJs': { action: 'Call', amount: '3BB' },
                    'QJs': { action: 'Call', amount: '3BB' }, 'JTs': { action: 'Call', amount: '3BB' },
                    'T9s': { action: 'Call', amount: '3BB' }, '98s': { action: 'Call', amount: '3BB' },
                    'AJo': { action: 'Call', amount: '3BB' }, 'KQo': { action: 'Call', amount: '3BB' },
                },
                'CO': {
                    'AA': { action: 'Raise', amount: '10BB' }, 'KK': { action: 'Raise', amount: '10BB' }, 
                    'QQ': { action: 'Raise', amount: '10BB' }, 'JJ': { action: 'Raise', amount: '10BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    '88': { action: 'Call', amount: '3BB' }, '77': { action: 'Call', amount: '3BB' },
                    'AQs': { action: 'Call', amount: '3BB' }, 'AKs': { action: 'Call', amount: '3BB' },
                    'AKo': { action: 'Call', amount: '3BB' }, 'AJs': { action: 'Call', amount: '3BB' },
                    'ATs': { action: 'Call', amount: '3BB' }, 'A9s': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'KJs': { action: 'Call', amount: '3BB' },
                    'KTs': { action: 'Call', amount: '3BB' }, 'QJs': { action: 'Call', amount: '3BB' },
                    'QTs': { action: 'Call', amount: '3BB' }, 'JTs': { action: 'Call', amount: '3BB' },
                    'T9s': { action: 'Call', amount: '3BB' }, '98s': { action: 'Call', amount: '3BB' },
                    '87s': { action: 'Call', amount: '3BB' }, 'AJo': { action: 'Call', amount: '3BB' },
                    'ATo': { action: 'Call', amount: '3BB' }, 'KQo': { action: 'Call', amount: '3BB' },
                    'KJo': { action: 'Call', amount: '3BB' }, 'QJo': { action: 'Call', amount: '3BB' },
                },
                'HJ': {
                    'AA': { action: 'Raise', amount: '10BB' }, 'KK': { action: 'Raise', amount: '10BB' }, 
                    'QQ': { action: 'Raise', amount: '10BB' }, 'JJ': { action: 'Raise', amount: '10BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    '88': { action: 'Call', amount: '3BB' }, '77': { action: 'Call', amount: '3BB' },
                    '66': { action: 'Call', amount: '3BB' }, 'AQs': { action: 'Call', amount: '3BB' },
                    'AKs': { action: 'Call', amount: '3BB' }, 'AKo': { action: 'Call', amount: '3BB' },
                    'AJs': { action: 'Call', amount: '3BB' }, 'ATs': { action: 'Call', amount: '3BB' },
                    'A9s': { action: 'Call', amount: '3BB' }, 'A8s': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'KJs': { action: 'Call', amount: '3BB' },
                    'KTs': { action: 'Call', amount: '3BB' }, 'QJs': { action: 'Call', amount: '3BB' },
                    'QTs': { action: 'Call', amount: '3BB' }, 'JTs': { action: 'Call', amount: '3BB' },
                    'T9s': { action: 'Call', amount: '3BB' }, '98s': { action: 'Call', amount: '3BB' },
                    '87s': { action: 'Call', amount: '3BB' }, '76s': { action: 'Call', amount: '3BB' },
                    'AJo': { action: 'Call', amount: '3BB' }, 'ATo': { action: 'Call', amount: '3BB' },
                    'KQo': { action: 'Call', amount: '3BB' }, 'KJo': { action: 'Call', amount: '3BB' },
                    'QJo': { action: 'Call', amount: '3BB' },
                },
            },
            'VS_HJ': {
                'BB': {
                    'AA': { action: 'Raise', amount: '12BB' }, 'KK': { action: 'Raise', amount: '12BB' }, 
                    'QQ': { action: 'Raise', amount: '12BB' }, 'JJ': { action: 'Raise', amount: '12BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    'AQs': { action: 'Call', amount: '3BB' }, 'AKs': { action: 'Call', amount: '3BB' },
                    'AKo': { action: 'Call', amount: '3BB' }, 'AJs': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'QJs': { action: 'Call', amount: '3BB' },
                    'JTs': { action: 'Call', amount: '3BB' }, 'T9s': { action: 'Call', amount: '3BB' },
                },
                'SB': {
                    'AA': { action: 'Raise', amount: '12BB' }, 'KK': { action: 'Raise', amount: '12BB' }, 
                    'QQ': { action: 'Raise', amount: '12BB' }, 'JJ': { action: 'Raise', amount: '12BB' },
                    'TT': { action: 'Call', amount: '2.5BB' }, '99': { action: 'Call', amount: '2.5BB' },
                    'AQs': { action: 'Call', amount: '2.5BB' }, 'AKs': { action: 'Call', amount: '2.5BB' },
                    'AKo': { action: 'Call', amount: '2.5BB' }, 'AJs': { action: 'Call', amount: '2.5BB' },
                    'KQs': { action: 'Call', amount: '2.5BB' }, 'QJs': { action: 'Call', amount: '2.5BB' },
                    'JTs': { action: 'Call', amount: '2.5BB' }, 'T9s': { action: 'Call', amount: '2.5BB' },
                },
                'BTN': {
                    'AA': { action: 'Raise', amount: '10BB' }, 'KK': { action: 'Raise', amount: '10BB' }, 
                    'QQ': { action: 'Raise', amount: '10BB' }, 'JJ': { action: 'Raise', amount: '10BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    '88': { action: 'Call', amount: '3BB' }, 'AQs': { action: 'Call', amount: '3BB' },
                    'AKs': { action: 'Call', amount: '3BB' }, 'AKo': { action: 'Call', amount: '3BB' },
                    'AJs': { action: 'Call', amount: '3BB' }, 'ATs': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'KJs': { action: 'Call', amount: '3BB' },
                    'QJs': { action: 'Call', amount: '3BB' }, 'JTs': { action: 'Call', amount: '3BB' },
                    'T9s': { action: 'Call', amount: '3BB' }, '98s': { action: 'Call', amount: '3BB' },
                    'AJo': { action: 'Call', amount: '3BB' }, 'KQo': { action: 'Call', amount: '3BB' },
                },
                'CO': {
                    'AA': { action: 'Raise', amount: '10BB' }, 'KK': { action: 'Raise', amount: '10BB' }, 
                    'QQ': { action: 'Raise', amount: '10BB' }, 'JJ': { action: 'Raise', amount: '10BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    '88': { action: 'Call', amount: '3BB' }, '77': { action: 'Call', amount: '3BB' },
                    'AQs': { action: 'Call', amount: '3BB' }, 'AKs': { action: 'Call', amount: '3BB' },
                    'AKo': { action: 'Call', amount: '3BB' }, 'AJs': { action: 'Call', amount: '3BB' },
                    'ATs': { action: 'Call', amount: '3BB' }, 'A9s': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'KJs': { action: 'Call', amount: '3BB' },
                    'KTs': { action: 'Call', amount: '3BB' }, 'QJs': { action: 'Call', amount: '3BB' },
                    'QTs': { action: 'Call', amount: '3BB' }, 'JTs': { action: 'Call', amount: '3BB' },
                    'T9s': { action: 'Call', amount: '3BB' }, '98s': { action: 'Call', amount: '3BB' },
                    '87s': { action: 'Call', amount: '3BB' }, 'AJo': { action: 'Call', amount: '3BB' },
                    'ATo': { action: 'Call', amount: '3BB' }, 'KQo': { action: 'Call', amount: '3BB' },
                    'KJo': { action: 'Call', amount: '3BB' }, 'QJo': { action: 'Call', amount: '3BB' },
                },
            },
            'VS_CO': {
                'BB': {
                    'AA': { action: 'Raise', amount: '12BB' }, 'KK': { action: 'Raise', amount: '12BB' }, 
                    'QQ': { action: 'Raise', amount: '12BB' }, 'JJ': { action: 'Raise', amount: '12BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    '88': { action: 'Call', amount: '3BB' }, 'AQs': { action: 'Call', amount: '3BB' },
                    'AKs': { action: 'Call', amount: '3BB' }, 'AKo': { action: 'Call', amount: '3BB' },
                    'AJs': { action: 'Call', amount: '3BB' }, 'ATs': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'QJs': { action: 'Call', amount: '3BB' },
                    'JTs': { action: 'Call', amount: '3BB' }, 'T9s': { action: 'Call', amount: '3BB' },
                },
                'SB': {
                    'AA': { action: 'Raise', amount: '12BB' }, 'KK': { action: 'Raise', amount: '12BB' }, 
                    'QQ': { action: 'Raise', amount: '12BB' }, 'JJ': { action: 'Raise', amount: '12BB' },
                    'TT': { action: 'Call', amount: '2.5BB' }, '99': { action: 'Call', amount: '2.5BB' },
                    '88': { action: 'Call', amount: '2.5BB' }, 'AQs': { action: 'Call', amount: '2.5BB' },
                    'AKs': { action: 'Call', amount: '2.5BB' }, 'AKo': { action: 'Call', amount: '2.5BB' },
                    'AJs': { action: 'Call', amount: '2.5BB' }, 'ATs': { action: 'Call', amount: '2.5BB' },
                    'KQs': { action: 'Call', amount: '2.5BB' }, 'QJs': { action: 'Call', amount: '2.5BB' },
                    'JTs': { action: 'Call', amount: '2.5BB' }, 'T9s': { action: 'Call', amount: '2.5BB' },
                },
                'BTN': {
                    'AA': { action: 'Raise', amount: '10BB' }, 'KK': { action: 'Raise', amount: '10BB' }, 
                    'QQ': { action: 'Raise', amount: '10BB' }, 'JJ': { action: 'Raise', amount: '10BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    '88': { action: 'Call', amount: '3BB' }, '77': { action: 'Call', amount: '3BB' },
                    'AQs': { action: 'Call', amount: '3BB' }, 'AKs': { action: 'Call', amount: '3BB' },
                    'AKo': { action: 'Call', amount: '3BB' }, 'AJs': { action: 'Call', amount: '3BB' },
                    'ATs': { action: 'Call', amount: '3BB' }, 'A9s': { action: 'Call', amount: '3BB' },
                    'KQs': { action: 'Call', amount: '3BB' }, 'KJs': { action: 'Call', amount: '3BB' },
                    'QJs': { action: 'Call', amount: '3BB' }, 'JTs': { action: 'Call', amount: '3BB' },
                    'T9s': { action: 'Call', amount: '3BB' }, '98s': { action: 'Call', amount: '3BB' },
                    'AJo': { action: 'Call', amount: '3BB' }, 'KQo': { action: 'Call', amount: '3BB' },
                },
            },
            'VS_BTN': {
                'BB': {
                    'AA': { action: 'Raise', amount: '12BB' }, 'KK': { action: 'Raise', amount: '12BB' }, 
                    'QQ': { action: 'Raise', amount: '12BB' }, 'JJ': { action: 'Raise', amount: '12BB' },
                    'TT': { action: 'Call', amount: '3BB' }, '99': { action: 'Call', amount: '3BB' },
                    '88': { action: 'Call', amount: '3BB' }, '77': { action: 'Call', amount: '3BB' },
                    'AQs': { action: 'Call', amount: '3BB' }, 'AKs': { action: 'Call', amount: '3BB' },
                    'AKo': { action: 'Call', amount: '3BB' }, 'AJs': { action: 'Call', amount: '3BB' },
                    'ATs': { action: 'Call', amount: '3BB' }, 'KQs': { action: 'Call', amount: '3BB' },
                    'QJs': { action: 'Call', amount: '3BB' }, 'JTs': { action: 'Call', amount: '3BB' },
                    'T9s': { action: 'Call', amount: '3BB' }, '98s': { action: 'Call', amount: '3BB' },
                    'AJo': { action: 'Call', amount: '3BB' }, 'KQo': { action: 'Call', amount: '3BB' },
                },
                'SB': {
                    'AA': { action: 'Raise', amount: '12BB' }, 'KK': { action: 'Raise', amount: '12BB' }, 
                    'QQ': { action: 'Raise', amount: '12BB' }, 'JJ': { action: 'Raise', amount: '12BB' },
                    'TT': { action: 'Call', amount: '2.5BB' }, '99': { action: 'Call', amount: '2.5BB' },
                    '88': { action: 'Call', amount: '2.5BB' }, '77': { action: 'Call', amount: '2.5BB' },
                    'AQs': { action: 'Call', amount: '2.5BB' }, 'AKs': { action: 'Call', amount: '2.5BB' },
                    'AKo': { action: 'Call', amount: '2.5BB' }, 'AJs': { action: 'Call', amount: '2.5BB' },
                    'ATs': { action: 'Call', amount: '2.5BB' }, 'KQs': { action: 'Call', amount: '2.5BB' },
                    'QJs': { action: 'Call', amount: '2.5BB' }, 'JTs': { action: 'Call', amount: '2.5BB' },
                    'T9s': { action: 'Call', amount: '2.5BB' }, '98s': { action: 'Call', amount: '2.5BB' },
                    'AJo': { action: 'Call', amount: '2.5BB' }, 'KQo': { action: 'Call', amount: '2.5BB' },
                },
            },
        },
        
        // Facing a 3-bet after raising
        'FACE_3BET': {
            'VS_POSITION': {
                'IP': {
                    'AA': { action: 'Raise', amount: '25BB' }, 'KK': { action: 'Raise', amount: '25BB' }, 
                    'QQ': { action: 'Call', amount: '9BB' }, 'JJ': { action: 'Call', amount: '9BB' },
                    'TT': { action: 'Fold', amount: 'N/A' }, '99': { action: 'Fold', amount: 'N/A' },
                    'AQs': { action: 'Call', amount: '9BB' }, 'AKs': { action: 'Call', amount: '9BB' },
                    'AKo': { action: 'Call', amount: '9BB' }, 'AJs': { action: 'Fold', amount: 'N/A' },
                    'KQs': { action: 'Fold', amount: 'N/A' },
                },
                'OOP': {
                    'AA': { action: 'Raise', amount: '25BB' }, 'KK': { action: 'Raise', amount: '25BB' }, 
                    'QQ': { action: 'Call', amount: '9BB' }, 'JJ': { action: 'Call', amount: '9BB' },
                    'TT': { action: 'Fold', amount: 'N/A' }, '99': { action: 'Fold', amount: 'N/A' },
                    'AQs': { action: 'Call', amount: '9BB' }, 'AKs': { action: 'Call', amount: '9BB' },
                    'AKo': { action: 'Call', amount: '9BB' }, 'AJs': { action: 'Fold', amount: 'N/A' },
                    'KQs': { action: 'Fold', amount: 'N/A' },
                }
            }
        },
        
        // Facing a 4-bet after 3-betting
        'FACE_4BET': {
            'VS_POSITION': {
                'IP': {
                    'AA': { action: 'Raise', amount: 'All-in' }, 'KK': { action: 'Raise', amount: 'All-in' }, 
                    'QQ': { action: 'Fold', amount: 'N/A' }, 'JJ': { action: 'Fold', amount: 'N/A' },
                    'AKs': { action: 'Call', amount: '22BB' }, 'AKo': { action: 'Fold', amount: 'N/A' },
                },
                'OOP': {
                    'AA': { action: 'Raise', amount: 'All-in' }, 'KK': { action: 'Raise', amount: 'All-in' }, 
                    'QQ': { action: 'Fold', amount: 'N/A' }, 'JJ': { action: 'Fold', amount: 'N/A' },
                    'AKs': { action: 'Call', amount: '22BB' }, 'AKo': { action: 'Fold', amount: 'N/A' },
                }
            }
        }
    }
};

/**
 * Provides a GTO-based suggestion for a given hand, position, and game situation.
 * Enhanced to consider the actions of other players.
 * 
 * @param {string} position - Player's position (e.g., 'UTG').
 * @param {string} hand - The two-card starting hand (e.g., 'QQ', 'AKs').
 * @param {object} gameState - The current game state including:
 *   - {string} actionType - Type of action (OPEN, FACE_RAISE, FACE_3BET, etc.)
 *   - {string} raiserPosition - Position of the raiser (if applicable)
 *   - {number} numRaises - Number of raises before you
 *   - {string} ipOop - 'IP' (in position) or 'OOP' (out of position)
 * @returns {object} - The suggested action and amount.
 */
function getGtoSuggestion(position, hand, gameState) {
    // Standardize input for reliable key lookups
    const upperHand = hand.toUpperCase().replace(' ', '').replace('O', 'o').replace('S', 's');
    const upperPosition = position.toUpperCase();
    const { actionType, raiserPosition, numRaises, ipOop } = gameState;
    
    // Determine the appropriate scenario based on game state
    let scenario = GTO_RANGES.PREFLOP;
    let actionCategory;
    let vsPosition;
    
    switch (actionType) {
        case 'OPEN':
            actionCategory = 'OPEN';
            break;
        case 'FACE_RAISE':
            actionCategory = 'FACE_RAISE';
            vsPosition = `VS_${raiserPosition.toUpperCase()}`;
            break;
        case 'FACE_3BET':
            actionCategory = 'FACE_3BET';
            vsPosition = 'VS_POSITION';
            break;
        case 'FACE_4BET':
            actionCategory = 'FACE_4BET';
            vsPosition = 'VS_POSITION';
            break;
        default:
            return { 
                action: 'Fold', 
                amount: 'N/A', 
                message: `Unknown action type: ${actionType}` 
            };
    }
    
    // Get the appropriate range
    let range;
    if (actionCategory === 'OPEN') {
        range = scenario[actionCategory][upperPosition];
    } else if (actionCategory === 'FACE_RAISE') {
        range = scenario[actionCategory][vsPosition][upperPosition];
    } else {
        range = scenario[actionCategory][vsPosition][ipOop.toUpperCase()];
    }
    
    // Look up the specific hand in the range
    const suggestion = range && range[upperHand];
    
    if (suggestion) {
        return suggestion;
    }
    
    // Default fallback: if hand is not found in the range, it's a fold
    return { 
        action: 'Fold', 
        amount: 'N/A', 
        message: `Hand '${upperHand}' is not in the optimal range for this situation.` 
    };
}

module.exports = { getGtoSuggestion };