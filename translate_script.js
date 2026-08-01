const fs = require('fs');

const file = 'd:/schoollog/royal-rajasthan/constants/places-hindi.ts';
let content = fs.readFileSync(file, 'utf8');

const englishDesc = `description:
            "Amber Fort is a magnificent fortress perched on a hilltop overlooking Maota Lake. Built with red sandstone and marble, it is a stunning blend of Hindu and Mughal architecture with several palaces, halls, and gardens.",`;

const hindiDesc = `description:
            "आमेर का किला माओटा झील के पास एक पहाड़ी पर स्थित एक शानदार किला है। लाल बलुआ पत्थर और संगमरमर से निर्मित, यह महलों, आंगनों और बगीचों के साथ हिंदू और मुगल वास्तुकला का एक अद्भुत मिश्रण है।",`;

content = content.replace(englishDesc, hindiDesc);

fs.writeFileSync(file, content);
console.log("Updated places-hindi.ts description successfully!");
