const axios = require('axios');
axios.get('https://jovero-backend.vercel.app/api/pages/home?lang=ar').then(res => console.log(JSON.stringify(res.data))).catch(e => console.error(e.message));
