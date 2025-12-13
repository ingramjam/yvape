// California Schools Data
// Sample of major school districts and schools across California

const californiaSchools = [
    // Los Angeles Unified School District
    { name: "Los Angeles High School", district: "Los Angeles Unified", city: "Los Angeles", zip: "90012" },
    { name: "John Marshall High School", district: "Los Angeles Unified", city: "Los Angeles", zip: "90027" },
    { name: "Benjamin Franklin High School", district: "Los Angeles Unified", city: "Los Angeles", zip: "90027" },
    { name: "Dorsey High School", district: "Los Angeles Unified", city: "Los Angeles", zip: "90043" },
    { name: "Crenshaw High School", district: "Los Angeles Unified", city: "Los Angeles", zip: "90008" },
    
    // San Diego Unified School District
    { name: "Lincoln High School", district: "San Diego Unified", city: "San Diego", zip: "92113" },
    { name: "Hoover High School", district: "San Diego Unified", city: "San Diego", zip: "92105" },
    { name: "Madison High School", district: "San Diego Unified", city: "San Diego", zip: "92114" },
    { name: "Morse High School", district: "San Diego Unified", city: "San Diego", zip: "92139" },
    
    // San Francisco Unified School District
    { name: "Galileo Academy of Science & Technology", district: "San Francisco Unified", city: "San Francisco", zip: "94133" },
    { name: "Lincoln High School", district: "San Francisco Unified", city: "San Francisco", zip: "94132" },
    { name: "Washington High School", district: "San Francisco Unified", city: "San Francisco", zip: "94134" },
    { name: "Balboa High School", district: "San Francisco Unified", city: "San Francisco", zip: "94112" },
    
    // Fresno Unified School District
    { name: "Fresno High School", district: "Fresno Unified", city: "Fresno", zip: "93721" },
    { name: "Edison High School", district: "Fresno Unified", city: "Fresno", zip: "93703" },
    { name: "Hoover High School", district: "Fresno Unified", city: "Fresno", zip: "93705" },
    { name: "Roosevelt High School", district: "Fresno Unified", city: "Fresno", zip: "93706" },
    
    // Long Beach Unified School District
    { name: "Long Beach Polytechnic High School", district: "Long Beach Unified", city: "Long Beach", zip: "90805" },
    { name: "Millikan High School", district: "Long Beach Unified", city: "Long Beach", zip: "90815" },
    { name: "Wilson High School", district: "Long Beach Unified", city: "Long Beach", zip: "90804" },
    
    // Sacramento City Unified School District
    { name: "Sacramento High School", district: "Sacramento City Unified", city: "Sacramento", zip: "95811" },
    { name: "C.K. McClatchy High School", district: "Sacramento City Unified", city: "Sacramento", zip: "95819" },
    { name: "Luther Burbank High School", district: "Sacramento City Unified", city: "Sacramento", zip: "95820" },
    { name: "John F. Kennedy High School", district: "Sacramento City Unified", city: "Sacramento", zip: "95822" },
    
    // Oakland Unified School District
    { name: "Oakland High School", district: "Oakland Unified", city: "Oakland", zip: "94621" },
    { name: "Skyline High School", district: "Oakland Unified", city: "Oakland", zip: "94619" },
    { name: "Fremont High School", district: "Oakland Unified", city: "Oakland", zip: "94601" },
    { name: "Castlemont High School", district: "Oakland Unified", city: "Oakland", zip: "94605" },
    
    // San Jose Unified School District
    { name: "Lincoln High School", district: "San Jose Unified", city: "San Jose", zip: "95125" },
    { name: "Independence High School", district: "San Jose Unified", city: "San Jose", zip: "95111" },
    { name: "Willow Glen High School", district: "San Jose Unified", city: "San Jose", zip: "95125" },
    
    // Anaheim Union High School District
    { name: "Anaheim High School", district: "Anaheim Union High", city: "Anaheim", zip: "92805" },
    { name: "Katella High School", district: "Anaheim Union High", city: "Anaheim", zip: "92804" },
    { name: "Western High School", district: "Anaheim Union High", city: "Anaheim", zip: "92801" },
    
    // Santa Ana Unified School District
    { name: "Santa Ana High School", district: "Santa Ana Unified", city: "Santa Ana", zip: "92701" },
    { name: "Valley High School", district: "Santa Ana Unified", city: "Santa Ana", zip: "92707" },
    { name: "Saddleback High School", district: "Santa Ana Unified", city: "Santa Ana", zip: "92704" },
    
    // Additional Major Districts
    { name: "Riverside Polytechnic High School", district: "Riverside Unified", city: "Riverside", zip: "92506" },
    { name: "John W. North High School", district: "Riverside Unified", city: "Riverside", zip: "92509" },
    { name: "Stockton High School", district: "Stockton Unified", city: "Stockton", zip: "95202" },
    { name: "Modesto High School", district: "Modesto City Schools", city: "Modesto", zip: "95350" },
    { name: "Chula Vista High School", district: "Sweetwater Union High", city: "Chula Vista", zip: "91910" },
    { name: "Bakersfield High School", district: "Kern High", city: "Bakersfield", zip: "93305" },
    { name: "Oxnard High School", district: "Oxnard Union High", city: "Oxnard", zip: "93030" },
    { name: "Santa Rosa High School", district: "Santa Rosa City Schools", city: "Santa Rosa", zip: "95404" },
    { name: "Salinas High School", district: "Salinas Union High", city: "Salinas", zip: "93901" },
    { name: "Redwood High School", district: "Visalia Unified", city: "Visalia", zip: "93291" },
    { name: "Fairfield High School", district: "Fairfield-Suisun Unified", city: "Fairfield", zip: "94533" },
    { name: "Fontana High School", district: "Fontana Unified", city: "Fontana", zip: "92335" },
    { name: "Moreno Valley High School", district: "Val Verde Unified", city: "Moreno Valley", zip: "92553" },
    { name: "Roseville High School", district: "Roseville Joint Union High", city: "Roseville", zip: "95678" },
    { name: "Elk Grove High School", district: "Elk Grove Unified", city: "Elk Grove", zip: "95624" },
    { name: "San Bernardino High School", district: "San Bernardino City Unified", city: "San Bernardino", zip: "92410" },
    { name: "Corona High School", district: "Corona-Norco Unified", city: "Corona", zip: "92882" },
    { name: "Hayward High School", district: "Hayward Unified", city: "Hayward", zip: "94541" },
    { name: "Sunnyvale High School", district: "Fremont Union High", city: "Sunnyvale", zip: "94087" },
    { name: "Torrance High School", district: "Torrance Unified", city: "Torrance", zip: "90501" },
    { name: "Escondido High School", district: "Escondido Union High", city: "Escondido", zip: "92025" },
    { name: "Pasadena High School", district: "Pasadena Unified", city: "Pasadena", zip: "91103" },
    { name: "Pomona High School", district: "Pomona Unified", city: "Pomona", zip: "91768" },
    { name: "Downey High School", district: "Downey Unified", city: "Downey", zip: "90241" },
    { name: "West High School", district: "West Contra Costa Unified", city: "Richmond", zip: "94804" },
    { name: "Inglewood High School", district: "Inglewood Unified", city: "Inglewood", zip: "90301" },
    { name: "Berkeley High School", district: "Berkeley Unified", city: "Berkeley", zip: "94704" },
    { name: "Norwalk High School", district: "Norwalk-La Mirada Unified", city: "Norwalk", zip: "90650" },
    { name: "Glendale High School", district: "Glendale Unified", city: "Glendale", zip: "91202" },
    { name: "Burbank High School", district: "Burbank Unified", city: "Burbank", zip: "91506" },
    { name: "Compton High School", district: "Compton Unified", city: "Compton", zip: "90220" },
    { name: "South Gate High School", district: "Los Angeles Unified", city: "South Gate", zip: "90280" },
    { name: "Alhambra High School", district: "Alhambra Unified", city: "Alhambra", zip: "91801" },
    { name: "Westminster High School", district: "Huntington Beach Union High", city: "Westminster", zip: "92683" },
    { name: "Fullerton High School", district: "Fullerton Joint Union High", city: "Fullerton", zip: "92832" },
    { name: "Garden Grove High School", district: "Garden Grove Unified", city: "Garden Grove", zip: "92840" },
];

// Function to search schools
function searchSchools(query) {
    const lowerQuery = query.toLowerCase();
    return californiaSchools.filter(school => 
        school.name.toLowerCase().includes(lowerQuery) ||
        school.district.toLowerCase().includes(lowerQuery) ||
        school.city.toLowerCase().includes(lowerQuery)
    );
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { californiaSchools, searchSchools };
}
