import json

# Comprehensive list of Bangladesh Districts and Thanas (Upazilas + Metropolitan Thanas)
# Sourced from administrative records and delivery network data
locations = {
    "Dhaka": [
        "Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar", "Adabor", "Badda", "Banani", "Bangshal", "Bimanbandar", 
        "Cantonment", "Chak Bazar", "Dakshinkhan", "Daruussalam", "Demra", "Dhanmondi", "Gendaria", "Gulshan", "Hazaribagh", 
        "Jatrabari", "Kadamtali", "Kafrul", "Kalabagan", "Kamrangirchar", "Khilgaon", "Khilkhet", "Kotwali", "Lalbagh", 
        "Mirpur", "Mohammadpur", "Motijheel", "Mugda", "New Market", "Pallabi", "Paltan", "Panthapath", "Ramna", "Rampura", 
        "Rupnagar", "Sabujbagh", "Shah Ali", "Shahbagh", "Sher-e-Bangla Nagar", "Shyampur", "Sutrapur", "Tejgaon", 
        "Tejgaon Industrial Area", "Turag", "Uttar Khan", "Uttara", "Vatara", "Wari"
    ],
    "Chattogram": [
        "Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Karnaphuli", "Lohagara", "Mirsharai", 
        "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda", "Akbar Shah", "Bakalia", "Bayazid Bostami", 
        "Chandgaon", "Chattogram Port", "Double Mooring", "EPZ", "Halishahar", "Khulshi", "Kotwali", "Pahartali", "Panchlaish", 
        "Patenga", "Sadarghat"
    ],
    "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
    "Bandarban": ["Ali Kadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
    "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"],
    "Barishal": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barishal Sadar", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
    "Bhola": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
    "Bogura": ["Adamdighi", "Bogura Sadar", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"],
    "Brahmanbaria": ["Akhaura", "Ashuganj", "Bancharampur", "Bijoynagar", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
    "Chandpur": ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakkhin", "Matlab Uttar", "Shahrasti"],
    "Chuadanga": ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
    "Cumilla": ["Barura", "Brahmanpara", "Burichong", "Chandina", "Chauddagram", "Cumilla Adarsha Sadar", "Cumilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Lalmai", "Meghna", "Monohorgonj", "Muradnagar", "Nangalkot", "Titas"],
    "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhiya", "Eidgaon"],
    "Dinajpur": ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur", "Phulbari"],
    "Faridpur": ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
    "Feni": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Fulgazi", "Parshuram", "Sonagazi"],
    "Gaibandha": ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
    "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi"],
    "Gopalganj": ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
    "Habiganj": ["Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj", "Sayestaganj"],
    "Jamalpur": ["Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
    "Jashore": ["Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Jashore Sadar", "Manirampur", "Sharsha"],
    "Jhalokati": ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
    "Jhenaidah": ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
    "Joypurhat": ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
    "Khagrachhari": ["Dighinala", "Guimara", "Khagrachhari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
    "Khulna": ["Batiaghata", "Dacope", "Dighalia", "Dumuria", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada", "Daulatpur", "Khalishpur", "Khan Jahan Ali", "Sonadanga"],
    "Kishoreganj": ["Astagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
    "Kurigram": ["Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Raomari", "Ulipur"],
    "Kushtia": ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
    "Lakshmipur": ["Kamalnagar", "Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
    "Lalmonirhat": ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
    "Madaripur": ["Dashar", "Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
    "Magura": ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
    "Manikganj": ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shivalaya", "Singair"],
    "Maulvibazar": ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Maulvibazar Sadar", "Rajnagar", "Sreemangal"],
    "Meherpur": ["Gangni", "Meherpur Sadar", "Mujibnagar"],
    "Munshiganj": ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
    "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Mymensingh Sadar", "Muktagachha", "Nandail", "Phulpur", "Tarakanda", "Trishal"],
    "Naogaon": ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
    "Narail": ["Kalia", "Lohagara", "Narail Sadar"],
    "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon", "Siddirgonj"],
    "Narsingdi": ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
    "Natore": ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Natore Sadar", "Singra", "Naldanga"],
    "Nawabganj": ["Bholahat", "Nawabganj Sadar", "Gomastapur", "Nachole", "Shibganj"],
    "Netrokona": ["Atpara", "Barhatta", "Durgapur", "Kalmakanda", "Kendua", "Khaliajuri", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"],
    "Nilphamari": ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
    "Noakhali": ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Sonaimuri", "Subarnachar"],
    "Pabna": ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"],
    "Panchagarh": ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
    "Patuakhali": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
    "Pirojpur": ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Indurkani"],
    "Rajbari": ["Baliakandi", "Goalanda", "Pangsha", "Rajbari Sadar", "Kalukhali"],
    "Rajshahi": ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Rajshahi Sadar", "Tanore"],
    "Rangamati": ["Baghaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Kawkhali", "Langadu", "Nannerchar", "Rajasthali", "Rangamati Sadar"],
    "Rangpur": ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"],
    "Satkhira": ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"],
    "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zajira"],
    "Sherpur": ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"],
    "Sirajgonj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullapara"],
    "Sunamganj": ["Bishwamvarpur", "Chhatak", "Shantiganj", "Derai", "Dharmapasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Sunamganj Sadar", "Tahirpur", "Madhyanagar"],
    "Sylhet": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Dakshin Surma", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Sylhet Sadar", "Zakiganj", "Osmani Nagar"],
    "Tangail": ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],
    "Thakurgaon": ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"]
}

district_names = sorted(locations.keys())
for dist in locations:
    locations[dist] = sorted(locations[dist])

ts_content = f'export const DISTRICTS = {json.dumps(district_names, indent=2)};\n\nexport const THANAS: Record<string, string[]> = {json.dumps(locations, indent=2)};\n'

with open('src/lib/locationData.ts', 'w') as f:
    f.write(ts_content)

print(f"Successfully updated locationData.ts with {len(district_names)} districts and their thanas.")
