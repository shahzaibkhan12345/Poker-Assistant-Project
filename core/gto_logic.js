// core/gto_logic.js

// Enhanced GTO data structure that considers player actions
const GTO_RANGES = {
    // Preflop scenarios with different action contexts
    'PREFLOP': {
        // First to act scenarios
        'OPEN': {
            'UTG': { 
                'AA': { action: 'RAISE', amount: '3BB' }, 'KK': { action: 'RAISE', amount: '3BB' }, 
                'QQ': { action: 'RAISE', amount: '3BB' }, 'JJ': { action: 'RAISE', amount: '3BB' },
                'TT': { action: 'RAISE', amount: '3BB' }, '99': { action: 'RAISE', amount: '3BB' },
                'AQs': { action: 'RAISE', amount: '3BB' }, 'AKs': { action: 'RAISE', amount: '3BB' },
                'AKo': { action: 'RAISE', amount: '3BB' }, 'AJs': { action: 'RAISE', amount: '3BB' },
                'KQs': { action: 'RAISE', amount: '3BB' }, 'QJs': { action: 'RAISE', amount: '3BB' },
                'JTs': { action: 'RAISE', amount: '3BB' }, 'T9s': { action: 'RAISE', amount: '3BB' },
            },
            'HJ': { 
                'AA': { action: 'RAISE', amount: '3BB' }, 'KK': { action: 'RAISE', amount: '3BB' }, 
                'QQ': { action: 'RAISE', amount: '3BB' }, 'JJ': { action: 'RAISE', amount: '3BB' },
                'TT': { action: 'RAISE', amount: '3BB' }, '99': { action: 'RAISE', amount: '3BB' },
                '88': { action: 'RAISE', amount: '3BB' }, 'AQs': { action: 'RAISE', amount: '3BB' },
                'AKs': { action: 'RAISE', amount: '3BB' }, 'AKo': { action: 'RAISE', amount: '3BB' },
                'AJs': { action: 'RAISE', amount: '3BB' }, 'ATs': { action: 'RAISE', amount: '3BB' },
                'KQs': { action: 'RAISE', amount: '3BB' }, 'KJs': { action: 'RAISE', amount: '3BB' },
                'QJs': { action: 'RAISE', amount: '3BB' }, 'QTs': { action: 'RAISE', amount: '3BB' },
                'JTs': { action: 'RAISE', amount: '3BB' }, 'T9s': { action: 'RAISE', amount: '3BB' },
                '98s': { action: 'RAISE', amount: '3BB' }, 'AJo': { action: 'RAISE', amount: '3BB' },
                'KQo': { action: 'RAISE', amount: '3BB' },
            },
            'CO': { 
                'AA': { action: 'RAISE', amount: '3BB' }, 'KK': { action: 'RAISE', amount: '3BB' }, 
                'QQ': { action: 'RAISE', amount: '3BB' }, 'JJ': { action: 'RAISE', amount: '3BB' },
                'TT': { action: 'RAISE', amount: '3BB' }, '99': { action: 'RAISE', amount: '3BB' },
                '88': { action: 'RAISE', amount: '3BB' }, '77': { action: 'RAISE', amount: '3BB' },
                'AQs': { action: 'RAISE', amount: '3BB' }, 'AKs': { action: 'RAISE', amount: '3BB' },
                'AKo': { action: 'RAISE', amount: '3BB' }, 'AJs': { action: 'RAISE', amount: '3BB' },
                'ATs': { action: 'RAISE', amount: '3BB' }, 'A9s': { action: 'RAISE', amount: '3BB' },
                'KQs': { action: 'RAISE', amount: '3BB' }, 'KJs': { action: 'RAISE', amount: '3BB' },
                'KTs': { action: 'RAISE', amount: '3BB' }, 'QJs': { action: 'RAISE', amount: '3BB' },
                'QTs': { action: 'RAISE', amount: '3BB' }, 'JTs': { action: 'RAISE', amount: '3BB' },
                'T9s': { action: 'RAISE', amount: '3BB' }, '98s': { action: 'RAISE', amount: '3BB' },
                '87s': { action: 'RAISE', amount: '3BB' }, 'AJo': { action: 'RAISE', amount: '3BB' },
                'ATo': { action: 'RAISE', amount: '3BB' }, 'KQo': { action: 'RAISE', amount: '3BB' },
                'KJo': { action: 'RAISE', amount: '3BB' }, 'QJo': { action: 'RAISE', amount: '3BB' },
            },
            'BTN': { 
                'AA': { action: 'RAISE', amount: '2.5BB' }, 'KK': { action: 'RAISE', amount: '2.5BB' }, 
                'QQ': { action: 'RAISE', amount: '2.5BB' }, 'JJ': { action: 'RAISE', amount: '2.5BB' },
                'TT': { action: 'RAISE', amount: '2.5BB' }, '99': { action: 'RAISE', amount: '2.5BB' },
                '88': { action: 'RAISE', amount: '2.5BB' }, '77': { action: 'RAISE', amount: '2.5BB' },
                '66': { action: 'RAISE', amount: '2.5BB' }, '55': { action: 'RAISE', amount: '2.5BB' },
                '44': { action: 'RAISE', amount: '2.5BB' }, '33': { action: 'RAISE', amount: '2.5BB' },
                '22': { action: 'RAISE', amount: '2.5BB' }, 'AQs': { action: 'RAISE', amount: '2.5BB' },
                'AKs': { action: 'RAISE', amount: '2.5BB' }, 'AKo': { action: 'RAISE', amount: '2.5BB' },
                'AJs': { action: 'RAISE', amount: '2.5BB' }, 'ATs': { action: 'RAISE', amount: '2.5BB' },
                'A9s': { action: 'RAISE', amount: '2.5BB' }, 'A8s': { action: 'RAISE', amount: '2.5BB' },
                'A7s': { action: 'RAISE', amount: '2.5BB' }, 'A5s': { action: 'RAISE', amount: '2.5BB' },
                'A4s': { action: 'RAISE', amount: '2.5BB' }, 'A3s': { action: 'RAISE', amount: '2.5BB' },
                'A2s': { action: 'RAISE', amount: '2.5BB' }, 'KQs': { action: 'RAISE', amount: '2.5BB' },
                'KJs': { action: 'RAISE', amount: '2.5BB' }, 'KTs': { action: 'RAISE', amount: '2.5BB' },
                'K9s': { action: 'RAISE', amount: '2.5BB' }, 'QJs': { action: 'RAISE', amount: '2.5BB' },
                'QTs': { action: 'RAISE', amount: '2.5BB' }, 'Q9s': { action: 'RAISE', amount: '2.5BB' },
                'JTs': { action: 'RAISE', amount: '2.5BB' }, 'J9s': { action: 'RAISE', amount: '2.5BB' },
                'T9s': { action: 'RAISE', amount: '2.5BB' }, '98s': { action: 'RAISE', amount: '2.5BB' },
                '87s': { action: 'RAISE', amount: '2.5BB' }, '76s': { action: 'RAISE', amount: '2.5BB' },
                '65s': { action: 'RAISE', amount: '2.5BB' }, '54s': { action: 'RAISE', amount: '2.5BB' },
                'AJo': { action: 'RAISE', amount: '2.5BB' }, 'ATo': { action: 'RAISE', amount: '2.5BB' },
                'KQo': { action: 'RAISE', amount: '2.5BB' }, 'KJo': { action: 'RAISE', amount: '2.5BB' },
                'KTo': { action: 'RAISE', amount: '2.5BB' }, 'QJo': { action: 'RAISE', amount: '2.5BB' },
                'QTo': { action: 'RAISE', amount: '2.5BB' }, 'JTo': { action: 'RAISE', amount: '2.5BB' },
            },
            'SB': { 
                'AA': { action: 'RAISE', amount: '3BB' }, 'KK': { action: 'RAISE', amount: '3BB' }, 
                'QQ': { action: 'RAISE', amount: '3BB' }, 'JJ': { action: 'RAISE', amount: '3BB' },
                'TT': { action: 'RAISE', amount: '3BB' }, '99': { action: 'RAISE', amount: '3BB' },
                '88': { action: 'RAISE', amount: '3BB' }, '77': { action: 'RAISE', amount: '3BB' },
                '66': { action: 'RAISE', amount: '3BB' }, '55': { action: 'RAISE', amount: '3BB' },
                '44': { action: 'RAISE', amount: '3BB' }, '33': { action: 'RAISE', amount: '3BB' },
                '22': { action: 'RAISE', amount: '3BB' }, 'AQs': { action: 'RAISE', amount: '3BB' },
                'AKs': { action: 'RAISE', amount: '3BB' }, 'AKo': { action: 'RAISE', amount: '3BB' },
                'AJs': { action: 'RAISE', amount: '3BB' }, 'ATs': { action: 'RAISE', amount: '3BB' },
                'A9s': { action: 'RAISE', amount: '3BB' }, 'A8s': { action: 'RAISE', amount: '3BB' },
                'A7s': { action: 'RAISE', amount: '3BB' }, 'A6s': { action: 'RAISE', amount: '3BB' },
                'A5s': { action: 'RAISE', amount: '3BB' }, 'A4s': { action: 'RAISE', amount: '3BB' },
                'A3s': { action: 'RAISE', amount: '3BB' }, 'A2s': { action: 'RAISE', amount: '3BB' },
                'KQs': { action: 'RAISE', amount: '3BB' }, 'KJs': { action: 'RAISE', amount: '3BB' },
                'KTs': { action: 'RAISE', amount: '3BB' }, 'K9s': { action: 'RAISE', amount: '3BB' },
                'QJs': { action: 'RAISE', amount: '3BB' }, 'QTs': { action: 'RAISE', amount: '3BB' },
                'Q9s': { action: 'RAISE', amount: '3BB' }, 'JTs': { action: 'RAISE', amount: '3BB' },
                'J9s': { action: 'RAISE', amount: '3BB' }, 'T9s': { action: 'RAISE', amount: '3BB' },
                '98s': { action: 'RAISE', amount: '3BB' }, '87s': { action: 'RAISE', amount: '3BB' },
                '76s': { action: 'RAISE', amount: '3BB' }, '65s': { action: 'RAISE', amount: '3BB' },
                '54s': { action: 'RAISE', amount: '3BB' }, '43s': { action: 'RAISE', amount: '3BB' },
                'AJo': { action: 'RAISE', amount: '3BB' }, 'ATo': { action: 'RAISE', amount: '3BB' },
                'KQo': { action: 'RAISE', amount: '3BB' }, 'KJo': { action: 'RAISE', amount: '3BB' },
                'KTo': { action: 'RAISE', amount: '3BB' }, 'QJo': { action: 'RAISE', amount: '3BB' },
                'QTo': { action: 'RAISE', amount: '3BB' }, 'JTo': { action: 'RAISE', amount: '3BB' },
                'T9o': { action: 'RAISE', amount: '3BB' }, '98o': { action: 'RAISE', amount: '3BB' },
            },
        },
        
        // Facing a single raise
        'FACE_RAISE': {
            'VS_UTG': {
                'BB': {
                    'AA': { action: 'RAISE', amount: '12BB' }, 'KK': { action: 'RAISE', amount: '12BB' }, 
                    'QQ': { action: 'RAISE', amount: '12BB' }, 'JJ': { action: 'RAISE', amount: '12BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    'AQs': { action: 'CALL', amount: '3BB' }, 'AKs': { action: 'CALL', amount: '3BB' },
                    'AKo': { action: 'CALL', amount: '3BB' }, 'AJs': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'QJs': { action: 'CALL', amount: '3BB' },
                    'JTs': { action: 'CALL', amount: '3BB' }, 'T9s': { action: 'CALL', amount: '3BB' },
                },
                'SB': {
                    'AA': { action: 'RAISE', amount: '12BB' }, 'KK': { action: 'RAISE', amount: '12BB' }, 
                    'QQ': { action: 'RAISE', amount: '12BB' }, 'JJ': { action: 'RAISE', amount: '12BB' },
                    'TT': { action: 'CALL', amount: '2.5BB' }, '99': { action: 'CALL', amount: '2.5BB' },
                    'AQs': { action: 'CALL', amount: '2.5BB' }, 'AKs': { action: 'CALL', amount: '2.5BB' },
                    'AKo': { action: 'CALL', amount: '2.5BB' }, 'AJs': { action: 'CALL', amount: '2.5BB' },
                    'KQs': { action: 'CALL', amount: '2.5BB' }, 'QJs': { action: 'CALL', amount: '2.5BB' },
                    'JTs': { action: 'CALL', amount: '2.5BB' }, 'T9s': { action: 'CALL', amount: '2.5BB' },
                },
                'BTN': {
                    'AA': { action: 'RAISE', amount: '10BB' }, 'KK': { action: 'RAISE', amount: '10BB' }, 
                    'QQ': { action: 'RAISE', amount: '10BB' }, 'JJ': { action: 'RAISE', amount: '10BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    '88': { action: 'CALL', amount: '3BB' }, 'AQs': { action: 'CALL', amount: '3BB' },
                    'AKs': { action: 'CALL', amount: '3BB' }, 'AKo': { action: 'CALL', amount: '3BB' },
                    'AJs': { action: 'CALL', amount: '3BB' }, 'ATs': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'KJs': { action: 'CALL', amount: '3BB' },
                    'QJs': { action: 'CALL', amount: '3BB' }, 'JTs': { action: 'CALL', amount: '3BB' },
                    'T9s': { action: 'CALL', amount: '3BB' }, '98s': { action: 'CALL', amount: '3BB' },
                    'AJo': { action: 'CALL', amount: '3BB' }, 'KQo': { action: 'CALL', amount: '3BB' },
                },
                'CO': {
                    'AA': { action: 'RAISE', amount: '10BB' }, 'KK': { action: 'RAISE', amount: '10BB' }, 
                    'QQ': { action: 'RAISE', amount: '10BB' }, 'JJ': { action: 'RAISE', amount: '10BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    '88': { action: 'CALL', amount: '3BB' }, '77': { action: 'CALL', amount: '3BB' },
                    'AQs': { action: 'CALL', amount: '3BB' }, 'AKs': { action: 'CALL', amount: '3BB' },
                    'AKo': { action: 'CALL', amount: '3BB' }, 'AJs': { action: 'CALL', amount: '3BB' },
                    'ATs': { action: 'CALL', amount: '3BB' }, 'A9s': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'KJs': { action: 'CALL', amount: '3BB' },
                    'KTs': { action: 'CALL', amount: '3BB' }, 'QJs': { action: 'CALL', amount: '3BB' },
                    'QTs': { action: 'CALL', amount: '3BB' }, 'JTs': { action: 'CALL', amount: '3BB' },
                    'T9s': { action: 'CALL', amount: '3BB' }, '98s': { action: 'CALL', amount: '3BB' },
                    '87s': { action: 'CALL', amount: '3BB' }, 'AJo': { action: 'CALL', amount: '3BB' },
                    'ATo': { action: 'CALL', amount: '3BB' }, 'KQo': { action: 'CALL', amount: '3BB' },
                    'KJo': { action: 'CALL', amount: '3BB' }, 'QJo': { action: 'CALL', amount: '3BB' },
                },
                'HJ': {
                    'AA': { action: 'RAISE', amount: '10BB' }, 'KK': { action: 'RAISE', amount: '10BB' }, 
                    'QQ': { action: 'RAISE', amount: '10BB' }, 'JJ': { action: 'RAISE', amount: '10BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    '88': { action: 'CALL', amount: '3BB' }, '77': { action: 'CALL', amount: '3BB' },
                    '66': { action: 'CALL', amount: '3BB' }, 'AQs': { action: 'CALL', amount: '3BB' },
                    'AKs': { action: 'CALL', amount: '3BB' }, 'AKo': { action: 'CALL', amount: '3BB' },
                    'AJs': { action: 'CALL', amount: '3BB' }, 'ATs': { action: 'CALL', amount: '3BB' },
                    'A9s': { action: 'CALL', amount: '3BB' }, 'A8s': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'KJs': { action: 'CALL', amount: '3BB' },
                    'KTs': { action: 'CALL', amount: '3BB' }, 'QJs': { action: 'CALL', amount: '3BB' },
                    'QTs': { action: 'CALL', amount: '3BB' }, 'JTs': { action: 'CALL', amount: '3BB' },
                    'T9s': { action: 'CALL', amount: '3BB' }, '98s': { action: 'CALL', amount: '3BB' },
                    '87s': { action: 'CALL', amount: '3BB' }, '76s': { action: 'CALL', amount: '3BB' },
                    'AJo': { action: 'CALL', amount: '3BB' }, 'ATo': { action: 'CALL', amount: '3BB' },
                    'KQo': { action: 'CALL', amount: '3BB' }, 'KJo': { action: 'CALL', amount: '3BB' },
                    'QJo': { action: 'CALL', amount: '3BB' },
                },
            },
            'VS_HJ': {
                'BB': {
                    'AA': { action: 'RAISE', amount: '12BB' }, 'KK': { action: 'RAISE', amount: '12BB' }, 
                    'QQ': { action: 'RAISE', amount: '12BB' }, 'JJ': { action: 'RAISE', amount: '12BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    'AQs': { action: 'CALL', amount: '3BB' }, 'AKs': { action: 'CALL', amount: '3BB' },
                    'AKo': { action: 'CALL', amount: '3BB' }, 'AJs': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'QJs': { action: 'CALL', amount: '3BB' },
                    'JTs': { action: 'CALL', amount: '3BB' }, 'T9s': { action: 'CALL', amount: '3BB' },
                },
                'SB': {
                    'AA': { action: 'RAISE', amount: '12BB' }, 'KK': { action: 'RAISE', amount: '12BB' }, 
                    'QQ': { action: 'RAISE', amount: '12BB' }, 'JJ': { action: 'RAISE', amount: '12BB' },
                    'TT': { action: 'CALL', amount: '2.5BB' }, '99': { action: 'CALL', amount: '2.5BB' },
                    'AQs': { action: 'CALL', amount: '2.5BB' }, 'AKs': { action: 'CALL', amount: '2.5BB' },
                    'AKo': { action: 'CALL', amount: '2.5BB' }, 'AJs': { action: 'CALL', amount: '2.5BB' },
                    'KQs': { action: 'CALL', amount: '2.5BB' }, 'QJs': { action: 'CALL', amount: '2.5BB' },
                    'JTs': { action: 'CALL', amount: '2.5BB' }, 'T9s': { action: 'CALL', amount: '2.5BB' },
                },
                'BTN': {
                    'AA': { action: 'RAISE', amount: '10BB' }, 'KK': { action: 'RAISE', amount: '10BB' }, 
                    'QQ': { action: 'RAISE', amount: '10BB' }, 'JJ': { action: 'RAISE', amount: '10BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    '88': { action: 'CALL', amount: '3BB' }, 'AQs': { action: 'CALL', amount: '3BB' },
                    'AKs': { action: 'CALL', amount: '3BB' }, 'AKo': { action: 'CALL', amount: '3BB' },
                    'AJs': { action: 'CALL', amount: '3BB' }, 'ATs': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'KJs': { action: 'CALL', amount: '3BB' },
                    'QJs': { action: 'CALL', amount: '3BB' }, 'JTs': { action: 'CALL', amount: '3BB' },
                    'T9s': { action: 'CALL', amount: '3BB' }, '98s': { action: 'CALL', amount: '3BB' },
                    'AJo': { action: 'CALL', amount: '3BB' }, 'KQo': { action: 'CALL', amount: '3BB' },
                },
                'CO': {
                    'AA': { action: 'RAISE', amount: '10BB' }, 'KK': { action: 'RAISE', amount: '10BB' }, 
                    'QQ': { action: 'RAISE', amount: '10BB' }, 'JJ': { action: 'RAISE', amount: '10BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    '88': { action: 'CALL', amount: '3BB' }, '77': { action: 'CALL', amount: '3BB' },
                    'AQs': { action: 'CALL', amount: '3BB' }, 'AKs': { action: 'CALL', amount: '3BB' },
                    'AKo': { action: 'CALL', amount: '3BB' }, 'AJs': { action: 'CALL', amount: '3BB' },
                    'ATs': { action: 'CALL', amount: '3BB' }, 'A9s': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'KJs': { action: 'CALL', amount: '3BB' },
                    'KTs': { action: 'CALL', amount: '3BB' }, 'QJs': { action: 'CALL', amount: '3BB' },
                    'QTs': { action: 'CALL', amount: '3BB' }, 'JTs': { action: 'CALL', amount: '3BB' },
                    'T9s': { action: 'CALL', amount: '3BB' }, '98s': { action: 'CALL', amount: '3BB' },
                    '87s': { action: 'CALL', amount: '3BB' }, 'AJo': { action: 'CALL', amount: '3BB' },
                    'ATo': { action: 'CALL', amount: '3BB' }, 'KQo': { action: 'CALL', amount: '3BB' },
                    'KJo': { action: 'CALL', amount: '3BB' }, 'QJo': { action: 'CALL', amount: '3BB' },
                },
            },
            'VS_CO': {
                'BB': {
                    'AA': { action: 'RAISE', amount: '12BB' }, 'KK': { action: 'RAISE', amount: '12BB' }, 
                    'QQ': { action: 'RAISE', amount: '12BB' }, 'JJ': { action: 'RAISE', amount: '12BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    '88': { action: 'CALL', amount: '3BB' }, 'AQs': { action: 'CALL', amount: '3BB' },
                    'AKs': { action: 'CALL', amount: '3BB' }, 'AKo': { action: 'CALL', amount: '3BB' },
                    'AJs': { action: 'CALL', amount: '3BB' }, 'ATs': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'QJs': { action: 'CALL', amount: '3BB' },
                    'JTs': { action: 'CALL', amount: '3BB' }, 'T9s': { action: 'CALL', amount: '3BB' },
                },
                'SB': {
                    'AA': { action: 'RAISE', amount: '12BB' }, 'KK': { action: 'RAISE', amount: '12BB' }, 
                    'QQ': { action: 'RAISE', amount: '12BB' }, 'JJ': { action: 'RAISE', amount: '12BB' },
                    'TT': { action: 'CALL', amount: '2.5BB' }, '99': { action: 'CALL', amount: '2.5BB' },
                    '88': { action: 'CALL', amount: '2.5BB' }, 'AQs': { action: 'CALL', amount: '2.5BB' },
                    'AKs': { action: 'CALL', amount: '2.5BB' }, 'AKo': { action: 'CALL', amount: '2.5BB' },
                    'AJs': { action: 'CALL', amount: '2.5BB' }, 'ATs': { action: 'CALL', amount: '2.5BB' },
                    'KQs': { action: 'CALL', amount: '2.5BB' }, 'QJs': { action: 'CALL', amount: '2.5BB' },
                    'JTs': { action: 'CALL', amount: '2.5BB' }, 'T9s': { action: 'CALL', amount: '2.5BB' },
                },
                'BTN': {
                    'AA': { action: 'RAISE', amount: '10BB' }, 'KK': { action: 'RAISE', amount: '10BB' }, 
                    'QQ': { action: 'RAISE', amount: '10BB' }, 'JJ': { action: 'RAISE', amount: '10BB' },
                    'TT': { action: 'CALL', amount: '3BB' }, '99': { action: 'CALL', amount: '3BB' },
                    '88': { action: 'CALL', amount: '3BB' }, '77': { action: 'CALL', amount: '3BB' },
                    'AQs': { action: 'CALL', amount: '3BB' }, 'AKs': { action: 'CALL', amount: '3BB' },
                    'AKo': { action: 'CALL', amount: '3BB' }, 'AJs': { action: 'CALL', amount: '3BB' },
                    'ATs': { action: 'CALL', amount: '3BB' }, 'A9s': { action: 'CALL', amount: '3BB' },
                    'KQs': { action: 'CALL', amount: '3BB' }, 'KJs': { action: 'CALL', amount: '3BB' },
                    'QJs': { action: 'CALL', amount: '3BB' }, 'JTs': { action: 'CALL', amount: '3BB' },
                    'T9s': { action: 'CALL', amount: '3BB' }, '98s': { action: 'CALL', amount: '3BB' },
                    'AJo': { action: 'CALL', amount: '3BB' }, 'KQo': { action: 'CALL', amount: '3BB' },
                },
            },
        },
        
        // Facing a 3-bet after raising
        'FACE_3BET': {
            'VS_POSITION': {
                'IP': {
                    'AA': { action: 'RAISE', amount: '25BB' }, 'KK': { action: 'RAISE', amount: '25BB' }, 
                    'QQ': { action: 'CALL', amount: '9BB' }, 'JJ': { action: 'CALL', amount: '9BB' },
                    'TT': { action: 'FOLD', amount: 'N/A' }, '99': { action: 'FOLD', amount: 'N/A' },
                    'AQs': { action: 'CALL', amount: '9BB' }, 'AKs': { action: 'CALL', amount: '9BB' },
                    'AKo': { action: 'CALL', amount: '9BB' }, 'AJs': { action: 'FOLD', amount: 'N/A' },
                    'KQs': { action: 'FOLD', amount: 'N/A' },
                },
                'OOP': {
                    'AA': { action: 'RAISE', amount: '25BB' }, 'KK': { action: 'RAISE', amount: '25BB' }, 
                    'QQ': { action: 'CALL', amount: '9BB' }, 'JJ': { action: 'CALL', amount: '9BB' },
                    'TT': { action: 'FOLD', amount: 'N/A' }, '99': { action: 'FOLD', amount: 'N/A' },
                    'AQs': { action: 'CALL', amount: '9BB' }, 'AKs': { action: 'CALL', amount: '9BB' },
                    'AKo': { action: 'CALL', amount: '9BB' }, 'AJs': { action: 'FOLD', amount: 'N/A' },
                    'KQs': { action: 'FOLD', amount: 'N/A' },
                }
            }
        },
        
        // Facing a 4-bet after 3-betting
        'FACE_4BET': {
            'VS_POSITION': {
                'IP': {
                    'AA': { action: 'RAISE', amount: 'All-in' }, 'KK': { action: 'RAISE', amount: 'All-in' }, 
                    'QQ': { action: 'FOLD', amount: 'N/A' }, 'JJ': { action: 'FOLD', amount: 'N/A' },
                    'AKs': { action: 'CALL', amount: '22BB' }, 'AKo': { action: 'FOLD', amount: 'N/A' },
                },
                'OOP': {
                    'AA': { action: 'RAISE', amount: 'All-in' }, 'KK': { action: 'RAISE', amount: 'All-in' }, 
                    'QQ': { action: 'FOLD', amount: 'N/A' }, 'JJ': { action: 'FOLD', amount: 'N/A' },
                    'AKs': { action: 'CALL', amount: '22BB' }, 'AKo': { action: 'FOLD', amount: 'N/A' },
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
    const upperPosition = position.toUpperCase();
    const upperHand = hand.toUpperCase();
    
    // Normalize hand: AKs stays AKs, AKo stays AKo, AK becomes AKo
    let normalizedHand = upperHand;
    const isPocketPair = normalizedHand.length === 2 && normalizedHand[0] === normalizedHand[1];
    
    if (isPocketPair) {
        // Keep pocket pairs as-is: QQ, KK, AA, etc. (no suffix needed)
        // Do nothing
    } else if (!normalizedHand.match(/[SO]$/)) {
        // Non-pair hands without suffix: default to 'o' (offsuit)
        normalizedHand += 'o';
    } else if (normalizedHand.match(/[SO]$/i)) {
        // Already has 's' or 'o', ensure lowercase suffix
        normalizedHand = normalizedHand.slice(0, -1) + normalizedHand.slice(-1).toLowerCase();
    }
    
    const { actionType, raiserPosition, ipOop } = gameState;
    
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
                action: 'FOLD',
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
    const suggestion = range && range[normalizedHand];
    
    if (suggestion) {
        return suggestion;
    }
    
    // Default fallback: if hand is not found in the range, it's a fold
    return { 
        action: 'FOLD',
        amount: 'N/A',
        message: `Hand '${normalizedHand}' is not in the optimal range for this situation.` 
    };
}

module.exports = { getGtoSuggestion };
