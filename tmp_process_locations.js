const https = require('https');
const fs = require('fs');

async function getJSON(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => { resolve(JSON.parse(data)); });
            res.on('error', (err) => { reject(err); });
        });
    });
}

async function processLocations() {
    try {
        console.log("Fetching location data from official sources...");
        // Sources: Techno-Stupid / places-in-bangladesh
        const districts = await getJSON('https://raw.githubusercontent.com/techno-stupid/places-in-bangladesh/master/districts.json');
        const upazilas = await getJSON('https://raw.githubusercontent.com/techno-stupid/places-in-bangladesh/master/upazilas.json');
        
        console.log(`Retrieved ${districts.length} districts and ${upazilas.length} upazilas.`);

        // Group upazilas by district_id
        const upMap = {};
        upazilas.forEach(u => {
            const dId = String(u.district_id);
            if (!upMap[dId]) upMap[dId] = [];
            if (!upMap[dId].includes(u.name)) upMap[dId].push(u.name);
        });

        const districtNames = districts.map(d => d.name).sort();
        const thanasByDistrict = {};

        districts.forEach(d => {
            const dName = d.name;
            const upazilasInDist = (upMap[String(d.id)] || []).sort();
            thanasByDistrict[dName] = upazilasInDist;
        });

        // Supplement missing metropolitan thanas (Critical for e-commerce delivery)
        const commonMetroThanas = {
            "Dhaka": ["Gulshan", "Dhanmondi", "Uttara", "Banani", "Mirpur", "Mohammadpur", "Badda", "Tejgaon", "Khilgaon", "Shahbagh", "Paltan", "Motijheel", "Basundhara", "Baridhara", "Cantonment"],
            "Chattogram": ["Agrabad", "Nasirabad", "Panchlaish", "Double Mooring", "Halishahar", "Chandgaon", "Khulshi"]
        };

        for (const [dist, thanas] of Object.entries(commonMetroThanas)) {
            if (thanasByDistrict[dist]) {
                thanas.forEach(t => {
                    if (!thanasByDistrict[dist].includes(t)) {
                        thanasByDistrict[dist].push(t);
                    }
                });
                thanasByDistrict[dist].sort();
            }
        }

        // Generate the file content
        const fileContent = `"use client";\n\n// Complete mapping of all 64 districts and their administrative/metro thanas\nexport const DISTRICTS = ${JSON.stringify(districtNames, null, 2)};\n\nexport const THANAS: Record<string, string[]> = ${JSON.stringify(thanasByDistrict, null, 2)};\n`;

        fs.writeFileSync('src/lib/locationData.ts', fileContent);
        console.log("Successfully updated src/lib/locationData.ts");

    } catch (error) {
        console.error("Critical Failure:", error.message);
        process.exit(1);
    }
}

processLocations();
